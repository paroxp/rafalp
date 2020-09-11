import React, { ReactElement } from 'react';

import { ErrorPage } from './error';

export function GenericError(): ReactElement {
  return <ErrorPage className="not-found" title="Page not found">
    <p>Looks like something went wrong on our side...</p>

    <p>Sorry about that! Feel free to give me a shout via social media.</p>
  </ErrorPage>;
}
