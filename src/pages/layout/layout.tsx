import fs from 'fs';
import path from 'path';

import moment from 'moment';
import React, { ReactElement, ReactNode } from 'react';

import { Config, distDir } from '../../config';

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
  const image = fs.readFileSync(distDir('img', 'social', `${props.icon}.svg`), 'utf8');

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
  const styles = fs.readFileSync(distDir('css', 'app.css'), 'utf8');
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

      <link rel="canonical" href="${path.join(config.url, config.path || '')}">
      <link rel="apple-touch-icon" sizes="57x57" href="/img/favicon/apple-touch-icon-57x57.png">
      <link rel="apple-touch-icon" sizes="60x60" href="/img/favicon/apple-touch-icon-60x60.png">
      <link rel="apple-touch-icon" sizes="72x72" href="/img/favicon/apple-touch-icon-72x72.png">
      <link rel="apple-touch-icon" sizes="76x76" href="/img/favicon/apple-touch-icon-76x76.png">
      <link rel="apple-touch-icon" sizes="114x114" href="/img/favicon/apple-touch-icon-114x114.png">
      <link rel="apple-touch-icon" sizes="120x120" href="/img/favicon/apple-touch-icon-120x120.png">
      <link rel="apple-touch-icon" sizes="144x144" href="/img/favicon/apple-touch-icon-144x144.png">
      <link rel="apple-touch-icon" sizes="152x152" href="/img/favicon/apple-touch-icon-152x152.png">
      <link rel="apple-touch-icon" sizes="180x180" href="/img/favicon/apple-touch-icon-180x180.png">
      <link rel="icon" type="image/png" href="/img/favicon/favicon-32x32.png" sizes="32x32">
      <link rel="icon" type="image/png" href="/img/favicon/favicon-194x194.png" sizes="194x194">
      <link rel="icon" type="image/png" href="/img/favicon/favicon-96x96.png" sizes="96x96">
      <link rel="icon" type="image/png" href="/img/favicon/android-chrome-192x192.png" sizes="192x192">
      <link rel="icon" type="image/png" href="/img/favicon/favicon-16x16.png" sizes="16x16">
      <link rel="manifest" href="/img/favicon/manifest.json">
      <link rel="mask-icon" href="/img/favicon/safari-pinned-tab.svg">
      <meta name="msapplication-TileColor" content="#ffffff">
      <meta name="msapplication-TileImage" content="/img/favicon/mstile-144x144.png">
      <meta name="theme-color" content="#ffffff">

      <style>${styles}</style>
    </head>

    ${body}
  </html>`;
}
