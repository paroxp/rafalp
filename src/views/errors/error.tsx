import React, { ReactElement, ReactNode } from 'react';

import { Footer, Header } from '../layout';

type ErrorPageProperties = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly title: string;
};

export function ErrorPage(props: ErrorPageProperties): ReactElement {
  return <body>
    <Header page="error" />
    <main className={props.className}>
      <h1>{props.title}</h1>

      {props.children}
    </main>
    <Footer />
  </body>;
}
