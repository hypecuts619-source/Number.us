import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

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
    }
  } catch(e) {
    console.error("Failed to load routing data:", e);
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

      // inject the app-rendered HTML into the template.
      const htmlWithHead = template.replace(`<!-- SSR_HEAD -->`, helmetHead);
      // We don't inject window data directly as JSON since it is 5.5MB and would choke GoogleBot.
      // Hydration will have a mismatch but React will catch it and re-render.
      const htmlWithData = htmlWithHead.replace(`<!-- SSR_DATA -->`, ``);
      const finalHtml = htmlWithData.replace(`<!-- SSR_OUT -->`, html);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
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
