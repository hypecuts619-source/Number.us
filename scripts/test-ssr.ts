import { render } from '../src/entry-server.tsx';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
    const routingData = JSON.parse(fs.readFileSync(path.resolve('./public/data/routing.json'), 'utf8'));
    const { html, helmet } = await render('/021000021', routingData);
    console.log("Helmet elements:");
    console.log("Title:", helmet?.title?.toString());
    console.log("Meta:", helmet?.meta?.toString());
    console.log("Link:", helmet?.link?.toString());
})();
