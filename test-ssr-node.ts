import { render } from './src/entry-server.tsx';
import fs from 'fs';

(async () => {
    const defaultData = JSON.parse(fs.readFileSync('./public/data/routing.json', 'utf-8'));
    const { html, helmet, helmetContext } = await render('/', defaultData);
    console.log("Helmet context keys:", Object.keys(helmetContext || {}));
    if (helmetContext && helmetContext.helmet) {
      console.log("Helmet.title exists!");
    } else {
      console.log("Helmet not in context");
    }
})();
