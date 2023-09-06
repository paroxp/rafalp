import { writeFileSync } from 'fs';

import { ReactElement } from 'react';

import { config, distDir } from './config';
import { About } from './pages/about';
import { NotFound } from './pages/errors';
import { Home } from './pages/home';
import { generateSiteMap } from './pages/sitemap';
import { render } from './utils';

interface Page {
  readonly body: string;
  readonly extension?: string;
  readonly filename?: string;
  readonly name: string;
  readonly path: string;
}

function fromReact(body: () => ReactElement, path: string): string {
  return render(config, body, { path });
}

function iterateFiles(filenames: readonly string[], page: Page): readonly string[] {
  const filename = page.filename || `${page.name}${page.extension || '.html'}`;

  writeFileSync(distDir(filename), page.body);

  return [...filenames, filename];
}

async function generator(): Promise<void> {
  const pages: readonly Page[] = [
    { body: fromReact(Home, '/'), filename: 'index.html', name: 'home', path: '/' },
    { body: fromReact(NotFound, '/404'), name: '404', path: '/404' },
    { body: fromReact(About, '/about'), name: 'about', path: '/about' },
  ];

  const sitemap = {
    body: await generateSiteMap(config, pages),
    filename: 'sitemap.xml',
    name: 'sitemap',
    path: '/sitemap.xml',
  };

  const queue = [ ...pages, sitemap ];
  console.info(`${queue.length} pages to iterate.`);

  const filenames = queue.reduce(iterateFiles, []);
  filenames.map(filename => console.info(`'${filename}' page generated.`));
}

generator()
  .catch(console.error);
