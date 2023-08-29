import { writeFileSync } from 'fs';

import { config, distDir } from './config';
import { About } from './pages/about';
import { NotFound } from './pages/errors';
import { Home } from './pages/home';
import { generateSiteMap } from './pages/sitemap';
import { render } from './utils';

async function run(): Promise<void> {
  const pages = [
    { body: render(config, NotFound), file: '404.html', name: '404', path: '/404' },
    { body: render(config, Home), file: 'index.html', name: 'home', path: '/' },
    { body: render(config, About), file: 'about.html', name: 'about', path: '/about' },
  ];
  console.info(`${pages.length} pages to iterate.`);

  pages.map(page => {
    writeFileSync(distDir(page.file), page.body);
    console.info(`'${page.name}' page generated.`);
  });

  const sitemap = await generateSiteMap(config, pages);
  writeFileSync(distDir('sitemap.xml'), sitemap);
  console.info('sitemap.xml file generated.');
}

run()
  .catch(console.error);
