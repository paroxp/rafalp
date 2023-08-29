import fs from 'fs';

import React, { ReactElement } from 'react';

import { srcDir } from '../../config';
import { Footer, Header, Link } from '../layout';

export function Home(): ReactElement {
  const beard = fs.readFileSync(srcDir('img', 'beard.svg'), 'utf8');

  return <body>
    <Header page="home" />
    <main id="home">
      <div dangerouslySetInnerHTML={{ __html: beard }}></div>

      <p>
        Howdy! My name is Rafal and I am a friendly and hairy developer, based in Newcastle, UK. Currently, I'm serving
        my duty at <Link href="https://gds.blog.gov.uk/">Government Digital Service</Link>. I am also trying to keep up
        with the cool stuff by attending amazing local meet ups!
      </p>
    </main>
    <Footer />
  </body>;
}
