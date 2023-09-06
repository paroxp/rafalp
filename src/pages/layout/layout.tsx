import fs from 'fs';
import path from 'path';

import moment from 'moment';
import React, { ReactElement, ReactNode } from 'react';

import { buildDir, Config } from '../../config';
import { social } from '../../img';

type HeaderProperties = {
  readonly page?: string;
}

type LinkProperties = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly href: string;
  readonly internal?: boolean;
}

type SocialLinkProperties = {
  readonly icon: string;
  readonly title: string;
  readonly url: string;
}

export function Link(props: LinkProperties): ReactElement {
  return <a
    className={props.className}
    href={props.href}
    target={!props.internal ? '_blank' : undefined}
    rel={!props.internal ? 'external nofollow noopener noreferrer' : undefined}>
      {props.children}
    </a>;
}

function SocialLink(props: SocialLinkProperties): ReactElement {
  const image = social[props.icon];

  return <li>
    <a
      href={props.url}
      target="_blank"
      rel="external nofollow noopener noreferrer me"
      title={props.title}
      className={props.icon}>
      <span className={['icon', props.icon].join(' ')} dangerouslySetInnerHTML={{ __html: image }}></span>
      <span className="visually-hidden">{props.title}</span>
    </a>
  </li>;
}

export function Header(props: HeaderProperties): ReactElement {
  return <header className={props.page}>
    <div>
      <h1>Rafal Proszowski</h1>
      <h2>Site Reliability Engineer</h2>
    </div>

    <nav>
      <ul>
        <li>
          <a href="/" className={props.page === 'home' ? 'active' : ''}>Home</a>
        </li>
        <li>
          <a href="/about" className={props.page === 'about' ? 'active' : ''}>About</a>
        </li>
      </ul>
    </nav>
  </header>;
}

export function Footer(): ReactElement {
  const currentYear = moment().year();

  return <footer>
    <ul className="icons">
      <SocialLink icon="github" title="Check me out on GitHub" url="https://github.com/paroxp" />
      <SocialLink icon="mastodon" title="Follow me on Mastodon" url="https://fosstodon.org/@paroxp" />
      <SocialLink
        icon="linkedin"
        title="Connect with me on LinkedIn"
        url="https://www.linkedin.com/in/rafal-proszowski-78816744/" />
    </ul>
    <div className="copyright">
      <small>
        Copyright 2014 - {currentYear}
      </small>
    </div>
  </footer>;
}

export function htmlDocument(config: Config, body: string): string {
  const styles = fs.readFileSync(buildDir('css', 'app.css'), 'utf8');
  const title = `${config.name} - ${config.title}`;
  const pageTitle = `${config.subtitle ? `${config.subtitle} - ` : ''}${title}`;

  return `<!doctype html>
  <html lang="en">
    <head>
      <title>${pageTitle}</title>
      <meta content="${pageTitle}" property="og:title">

      <meta charset="utf-8">
      <meta name="theme-color" content="#3D9970"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
      <meta name="description" content="${config.description}"  property="og:description">
      <meta name="keywords" content="${config.keywords.join(',')}">
      <meta name="author" content="${config.name}">
      <meta name="copyright" content="Copyright 2014 - ${moment().year()}">

      <link rel="canonical" href="${new URL(config.path || '', config.url).href}">

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
      <link rel="manifest" href="/site.webmanifest">
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#308559">
      <meta name="msapplication-TileColor" content="#308559">
      <meta name="theme-color" content="#308559">

      <style>${styles}</style>
    </head>

    ${body}
  </html>`;
}
