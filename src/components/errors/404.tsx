import React, { ReactElement } from 'react';

import { ErrorPage } from './error';

export function NotFound(): ReactElement {
  return <ErrorPage className="not-found" title="Page not found">
    <p>Looks like you're lost...</p>

    <p>Please use the header navigation in order to get onto the <a href="/">home</a> page.</p>
  </ErrorPage>;
}
