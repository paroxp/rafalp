import { minify } from 'html-minifier';
import { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';

import { Config } from '../config';
import { htmlDocument } from '../pages/layout';

export function render(cfg: Config, page: () => ReactElement, overrides?: object): string {
  const content = page();

  return minify(htmlDocument({ ...cfg, ...overrides }, renderToString(content)), {
    collapseWhitespace: true,
    minifyJS: true,
    removeComments: true,
  });
}
