import React, { ReactElement, ReactNode } from 'react';

import { Footer, Header } from '../layout';

type ErrorPageProperties = {
  readonly children: ReactNode;
  readonly id?: string;
  readonly title: string;
};

export function ErrorPage(props: ErrorPageProperties): ReactElement {
  return <>
    <Header page="error" />
    <main id={props.id}>
      <h1>{props.title}</h1>

      {props.children}
    </main>
    <Footer />
  </>;
}
