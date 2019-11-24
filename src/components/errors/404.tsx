import React from 'react';

import { Footer, Header } from '../layout';

export function NotFound() {
  return (
    <body>
      <Header page="home" />
      <main className="not-found">
        <h1>Oops...</h1>

        <p>Looks like you're lost...</p>
      </main>
      <Footer />
    </body>
  );
}
