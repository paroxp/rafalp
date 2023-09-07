import { copyFileSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

import html from 'html-minifier';
import scss from 'node-sass';
import { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { TranspileOptions, transpileModule } from 'typescript';

import * as tsconfig from '../tsconfig.json';

import { Config, config } from './config';
import { About } from './pages/about';
import { NotFound } from './pages/errors';
import { Home } from './pages/home';
import { generateSiteMap } from './pages/sitemap';
import { htmlDocument } from './pages/layout';

namespace File {
  export interface Copyable {
    readonly destination: string;
    readonly source: string;
  }

  export interface Writeable {
    readonly content: string;
    readonly filename: string;
  }
}

interface Page {
  readonly body: () => ReactElement;
  readonly extension?: string;
  readonly filename?: string;
  readonly name: string;
  readonly path: string;
  readonly scripts?: string;
  readonly skipSitemap?: boolean;
  readonly styles?: string;
}

function compileHTML(page: () => ReactElement, cfg: Config): string {
  const content = page();

  return html.minify(htmlDocument(cfg, renderToString(content)), {
    collapseWhitespace: true,
    minifyJS: true,
    removeComments: true,
  });
}

function compileSCSS(filename: string): string {
  const source = readFileSync(path.join(__dirname, filename), 'utf8');

  return scss.renderSync({
    data: source,
    outputStyle: 'compressed',
    includePaths: [
      'src/scss',
      'node_modules/susy/sass',
    ],
  }).css.toString('utf-8');
}

function compileTypeScript(filename: string): string {
  const source = readFileSync(path.join(__dirname, filename), 'utf8');

  return transpileModule(source, tsconfig as unknown as TranspileOptions).outputText
}

function discoverFilesToCopy(filepath: string): readonly File.Copyable[] {
  return readdirSync(path.join(__dirname, filepath)).map((filename: string) =>
    ({ destination: dist(filename), source: path.join(__dirname, filepath, filename) }));
}

function dist(...parts: readonly string[]): string {
  return path.join(__dirname, '..', 'dist', ...parts);
}

function iterativelyCompileHTML(files: readonly File.Writeable[], page: Page): readonly File.Writeable[] {
  const filename = page.filename || `${page.name}${page.extension || '.html'}`;
  const { path, scripts } = page;
  const styles = page.styles || 'html{background-color:red}';
  const content = compileHTML(page.body, { ...config, path, scripts, styles });

  return [...files, { content, filename }];
}

async function generator(): Promise<void> {
  const pages: readonly Page[] = [
    { body: Home, filename: 'index.html', name: 'home', path: '/', styles: compileSCSS('./scss/home.scss') },
    { body: NotFound, name: '404', path: '/404', skipSitemap: true, styles: compileSCSS('./scss/error.scss') },
    { body: About, name: 'about', path: '/about', scripts: compileTypeScript('./js/about.ts'), styles: compileSCSS('./scss/about.scss') },
  ];

  const sitemap = await generateSiteMap(config, pages.filter(page => !page.skipSitemap));

  const files: readonly File.Writeable[] = [
    ...pages.reduce(iterativelyCompileHTML, []),
    { content: sitemap, filename: 'sitemap.xml' },
  ];
  console.info(`${files.length} files to write.`, '\n');

  files.map(file => {
    writeFileSync(dist(file.filename), file.content);
    console.info(`'${file.filename}' file generated.`);
  });

  const copyList = [
    { destination: dist('C4CE726F8465B7FC.txt'), source: path.join(__dirname, 'static', 'C4CE726F8465B7FC.txt') },
    { destination: dist('robots.txt'), source: path.join(__dirname, 'static', 'robots.txt') },

    ...discoverFilesToCopy('./img/favicon/'),
  ];

  console.info('\n', `${copyList.length} files to copy.`, '\n');

  copyList.map(file => {
    copyFileSync(file.source, file.destination);
    console.info(`'${file.source}' file copied.`);
  });
}

generator()
  .catch(console.error);
