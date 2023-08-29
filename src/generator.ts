import { writeFileSync } from 'fs';

import { config, distDir } from './config';
import { About } from './pages/about';
import { NotFound } from './pages/errors';
import { Home } from './pages/home';
import { generateSiteMap } from './pages/sitemap';
import { render } from './utils';

async function generator(): Promise<void> {
  const pages = [
    { body: Home, file: 'index.html', name: 'home', path: '/' },
    { body: NotFound, file: '404.html', name: '404', path: '/404' },
    { body: About, file: 'about.html', name: 'about', path: '/about' },
  ];
  console.info(`${pages.length} pages to iterate.`);

  pages.map(page => {
    const { path } = page;
    writeFileSync(distDir(page.file), render(config, page.body, { path }));
    console.info(`'${page.file}' page generated.`);
  });

  const sitemap = await generateSiteMap(config, pages);
  writeFileSync(distDir('sitemap.xml'), sitemap);
  console.info('sitemap.xml file generated.');
}

generator()
  .catch(console.error);
