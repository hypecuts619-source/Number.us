import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import compression from 'compression';

const __dirname = process.cwd();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Self-healing check for routing.json integrity
  const publicDataPath = path.resolve(__dirname, 'public/data/routing.json');
  let dataValid = false;
  try {
    if (fs.existsSync(publicDataPath)) {
      const content = fs.readFileSync(publicDataPath, 'utf8');
      JSON.parse(content);
      // Ensure the file has substantial content, not truncated
      if (content.length > 2000000) {
        dataValid = true;
      }
    }
  } catch (e) {
    console.warn("Routing data file exists but is corrupted or truncated. Recovering...");
  }

  if (!dataValid) {
    try {
      console.log("Integrity test failed or routing data is missing. Initiating self-healing recovery...");
      const { execSync } = await import('child_process');
      execSync('npx tsx scripts/update-data.ts', { stdio: 'inherit' });
      console.log("Self-healing: routing data successfully regenerated!");
    } catch (err: any) {
      console.error("Self-healing: Failed to run automatic recovery of routing data:", err);
    }
  }

  app.use(compression());
  app.use(express.json());

  // Redirect trailing slashes to prevent Google duplicate content indexing issues
  app.use((req, res, next) => {
    if (req.path.length > 1 && req.path.endsWith('/')) {
      const query = req.url.slice(req.path.length);
      const safePath = req.path.replace(/\/+$/, '');
      return res.redirect(301, safePath + query);
    }
    next();
  });

  let vite: any;
  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist/client'), { index: false }));
  }

  // Ensure routing data exists before handling requests in prod
  let cachedRoutingData: any = [];
  try {
    const dataPath = process.env.NODE_ENV !== "production" 
      ? path.resolve(__dirname, 'public/data/routing.json')
      : path.resolve(__dirname, 'dist/client/data/routing.json');
    if (fs.existsSync(dataPath)) {
      cachedRoutingData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    } else {
      // Fallback to checking the other potential path
      const backupPath = process.env.NODE_ENV !== "production"
        ? path.resolve(__dirname, 'dist/client/data/routing.json')
        : path.resolve(__dirname, 'public/data/routing.json');
      if (fs.existsSync(backupPath)) {
        cachedRoutingData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
      }
    }
  } catch(e) {
    console.error("Failed to load routing data primary path. Attempting fallback...", e);
    try {
      const backupPath = path.resolve(__dirname, 'public/data/routing.json');
      if (fs.existsSync(backupPath)) {
        cachedRoutingData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
      }
    } catch (err) {
      console.error("Critical: Failed to load routing data from fallback path:", err);
    }
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    
    // Ignore static asset paths
    if (url.match(/\.(js|css|ico|png|jpg|svg|json|xml|txt)$/)) {
        return next();
    }

    try {
      let template: string;
      let render: any;

      if (process.env.NODE_ENV !== "production") {
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8');
        const entryServerPath = path.resolve(__dirname, 'dist/server/entry-server.js');
        const entryServer = await import("file://" + entryServerPath);
        render = entryServer.render;
      }

      const { html, helmet } = render(url, cachedRoutingData);

      const helmetHead = helmet ? `
        ${helmet.title?.toString() || ''}
        ${helmet.meta?.toString() || ''}
        ${helmet.link?.toString() || ''}
        ${helmet.script?.toString() || ''}
      ` : '';

      // Set status based on helmet output
      const status = helmetHead.includes('prerender-status-code" content="404"') || html.includes('prerender-status-code') ? 404 : 200;

      // Remove the hardcoded title so Helmet title works properly
      template = template.replace(/<title>.*?<\/title>/i, '');
      
      // inject the app-rendered HTML into the template.
      const htmlWithHead = template.replace(`<!-- SSR_HEAD -->`, helmetHead);
      // Bake the global server-side pre-compiled state object directly into the HTML
      // This guarantees Googlebot receives fully populated semantic text on the first byte, without CSR timeouts.
      const injectedStr = `<script>window.__ROUTING_DATA__ = ${JSON.stringify(cachedRoutingData)}</script>`;
      const htmlWithData = htmlWithHead.replace(`<!-- SSR_DATA -->`, injectedStr);
      const finalHtml = htmlWithData.replace(`<!-- SSR_OUT -->`, html);

      res.status(status).set({ 'Content-Type': 'text/html' }).end(finalHtml);
    } catch (e: any) {
      if (vite) {
        vite.ssrFixStacktrace(e);
      }
      console.error(e.stack);
      res.status(500).end(e.stack || "Internal Server Error");
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
