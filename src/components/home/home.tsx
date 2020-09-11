import fs from 'fs';

import React, { ReactElement } from 'react';

import { Footer, Header } from '../layout';

export function Home(): ReactElement {
  const beard = fs.readFileSync(`${__dirname}/beard.svg`, 'utf8');

  return <body>
    <Header page="home" />
    <main className="home">
      <div dangerouslySetInnerHTML={{ __html: beard }}></div>

      <p>
        Howdy! My name is Rafal and I am a friendly and hairy developer, based in London, UK. Currently, I'm serving
        my duty at <a href="https://gds.blog.gov.uk/">Government Digital Service</a>. I am also trying to keep up
        with the cool stuff by attending amazing local meet ups!
      </p>
    </main>
    <Footer />
  </body>;
}
