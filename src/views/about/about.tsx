import fs from 'fs';

import moment from 'moment';
import React, { ReactElement, ReactNode } from 'react';

import { Footer, Header, Link } from '../layout';

type ExperienceProperties = {
  readonly title: string;
  readonly start: moment.Moment;
  readonly finish?: moment.Moment;
  readonly organisation: string;
  readonly organisationURL: string;
  readonly nonPrintable?: boolean;
  readonly children: readonly ReactNode[];
}

type SkillProperties = {
  readonly children?: ReactNode;
  readonly minimal?: boolean;
  readonly name: string;
  readonly score?: number;
}

function Experience(props: ExperienceProperties): ReactElement {
  const termStart = props.start.format('MMM Do YYYY');
  const termEnd = !props.finish ? 'Present' : props.finish.format('MMM Do YYYY');
  const title = `${termStart} - ${termEnd}`;

  return <details data-details={props.nonPrintable ? 'no-print' : ''} open>
    <summary>
      <time dateTime={props.start.format('YYYY-MM-DD')} title={title}>
        {props.start.year()} - {!props.finish ? 'present' : props.finish.year()}
      </time>: {}
      {props.title} at <a href={props.organisationURL} target="_blank" rel="external nofollow noopener noreferrer">
        {props.organisation}
      </a> <span aria-hidden>( {props.organisationURL} )</span>
    </summary>

    <ul>
      {...props.children}
    </ul>

  </details>;
}

function Skill(props: SkillProperties): ReactElement {
  if (props.minimal) {
    return <div title={props.name} className="minimal">
      <label>{props.name}</label>
    </div>;
  }

  return <div title={props.name}>
    <label>{props.name}</label>
      <progress value={props.score} max="100"></progress>
      <details open>
          <summary>{props.name}</summary>
          {props.children}
      </details>
  </div>;
}

export function About(): ReactElement {
  const aboutJS = fs.readFileSync(`${__dirname}/../../../dist/public/js/about.js`, 'utf8');

  return <body>
    <Header page="about" />
    <main className="about">
      <section>
        <h3>Professional summary</h3>

        <p>
          I'm an experienced developer / SRE with just over 7 years of professional
          experience, committed to maintaining cutting edge technical skills and
          up-to-date industry knowledge. I'm eager to learn and always after new exciting
          opportunities and challenges.
        </p>
      </section>

      <aside>
        <figure>
          <img src="/img/avatar.png" alt="Rafal Proszowski" />
          <figcaption>
            <h3>Rafal Proszowski</h3>
            Twitter: <a
              href="https://twitter.com/paroxp"
              target="_blank"
              rel="external nofollow noopener noreferrer"
              title="Follow me on Twitter">
              @paroxp
            </a>
          </figcaption>
        </figure>

        <h3>Skills</h3>

        <Skill name="Agile" minimal={true} />
        <Skill name="Go" score={65}>
          It has became my language of choice, for most of new projects
          I am picking up. It has a lot of benefits, and the ease of use along with
          vast speed, made me fall in love with it. I feel confident with it, as I am
          using it widely in my everyday job.
        </Skill>
        <Skill name="Kubernetes" minimal={true} />
        <Skill name="Docker" minimal={true} />
        <Skill name="Git" minimal={true} />
        <Skill name="Node.js and JavaScript" score={75}>
          Strong preference towards <Link href="https://www.typescriptlang.org/">TypeScript</Link>, {}
          <Link href="https://reactjs.org/">React</Link>, <Link href="https://koajs.com/">Koa</Link> and {}
          <Link href="https://expressjs.com/">Express</Link>. I'm a fan of Progressive Enhancement and believe there is
          time and place for frontend JavaScript, but would prefer everything backend rendered.
        </Skill>
        <Skill name="TypeScript" minimal={true} />
        <Skill name="React" minimal={true} />
        <Skill name="AWS" minimal={true} />
        <Skill name="Terraform" minimal={true} />
        <Skill name="Continuous Integration and Delivery" minimal={true} />
        <Skill name="ES6" minimal={true} />
        <Skill name="Express.js" minimal={true} />
        <Skill name="JSON" minimal={true} />
        <Skill name="JWT" minimal={true} />
        <Skill name="Angular" minimal={true} />
        <Skill name="Ionic" minimal={true} />
        <Skill name="PHP" score={75}>
          Had a lot of exposure to many frameworks, such as <Link href="https://laravel.com/">Laravel</Link> &amp; {}
          <Link href="https://lumen.laravel.com/">Lumen</Link>, <Link href="https://cakephp.org/">CakePHP</Link> and
          little bits of others, I am able to put together some amazing applications. I go around with Composer and
          PSRs, however I didn't get a chance to play with the new PHP 7 stuff yet.
        </Skill>
        <Skill name="Ruby" minimal={true} />
        <Skill name="Python" minimal={true} />
        <Skill name="HTML" minimal={true} />
        <Skill name="CSS" minimal={true} />
        <Skill name="REST APIs" minimal={true} />
        <Skill name="OIDC" minimal={true} />
        <Skill name="OAuth2" minimal={true} />
        <Skill name="Web Applications" minimal={true} />
        <Skill name="YAML" minimal={true} />
        <Skill name="CloudFoundry" minimal={true} />
        <Skill name="Concourse" minimal={true} />
        <Skill name="Travis" minimal={true} />
        <Skill name="NGINX" minimal={true} />
        <Skill name="Shell" minimal={true} />
        <Skill name="Ansible" minimal={true} />
        <Skill name="Puppet" minimal={true} />
        <Skill name="Vagrant" minimal={true} />
        <Skill name="DevOps" minimal={true} />
        <Skill name="WebOps" minimal={true} />
        <Skill name="Unit and Integration Testing" minimal={true} />
        <Skill name="MySQL" minimal={true} />
        <Skill name="SQL" minimal={true} />
        <Skill name="Linux" minimal={true} />
        <Skill name="Webpack" minimal={true} />
        <Skill name="Gulp" minimal={true} />
        <Skill name="Foundation" minimal={true} />
        <Skill name="Bootstrap" minimal={true} />
        <Skill name="Platform monitoring" minimal={true} />
        <Skill name="Kibana" minimal={true} />
        <Skill name="Prometheus" minimal={true} />
        <Skill name="DataDog" minimal={true} />
        <Skill name="Redis" minimal={true} />
        <Skill name="Memcached" minimal={true} />
        <Skill name="Mailgun" minimal={true} />
        <Skill name="Database Design" minimal={true} />
        <Skill name="Excellent problem-solving" minimal={true} />

        <p>
          Everyone has a different understanding of these scales. Don't take them seriously...
          If you'd like to know more, ask! I'll be more than happy to explore the topic with you.
        </p>
      </aside>

      <section>
        <h3>Experience</h3>

        <Experience
          start={moment('2016-08-08')}
          title="Tech Lead and Senior Developer"
          organisation="Government Digital Service"
          organisationURL="https://gds.blog.gov.uk">
          <li>
            Planned, Prioritised and Built various components for tenants of GOV.UK PaaS and Build &amp; Run teams
          </li>
          <li>
            Developed GOV.UK PaaS and Build &amp; Run processes with the use of Terraform, AWS, Concourse,
            Kubernetes, CloudFoundry, Bosh, YAML, Go, Shell Scripts, Postgres
          </li>
          <li>
            Developed web applications for GOV.UK PaaS tenants with the use of Node.js, TypeScript, Sinatra, JS,
            Webpack
          </li>
          <li>
            Worked with Secure Continuous Delivery system using Git and GPG encryption to ensure integrity of
            developer commits prior to deployment
          </li>
          <li>Troubleshoot complex network and systems issues</li>
          <li>Actively patched various CVE's</li>
          <li>Did heavy pair programming in order to spread the knowledge</li>
          <li>Presented and demonstrated at show and tells / knowledge shares</li>
          <li>Been heavily involved in team progression and well being</li>
          <li>Worked in an Agile - Kanban environment</li>
          <li>Worked with stages of Planing, Doing, Reviewing and Approving of each task</li>
          <li>Used ticketing system Pivotal Tracker for project management</li>
        </Experience>

        <Experience
          start={moment('2015-11-30')}
          finish={moment('2016-08-05')}
          title="Frontend Developer"
          organisation="FLIP Sports"
          organisationURL="http://flipsports.com">
          <li>Worked on a rewards system with the use of Angular, Ionic, JWT, OIDC, Python, AWS, Postgres</li>
          <li>Delivered services in a form of REST APIs, Web Applications, Metric collectors</li>
          <li>Mainly focussed on the Frontend aspect of the projects</li>
          <li>Helped out with certain python micro services</li>
          <li>Helped out with PHP projects</li>
          <li>Used ticketing system JIRA for project management</li>
        </Experience>

        <Experience
          start={moment('2013-06-17')}
          finish={moment('2015-11-27')}
          title="Developer"
          organisation="HurstDEV"
          organisationURL="https://hurstdev.co.uk">
          <li>Worked with variety of clients on different needs, solutions and technologies</li>
          <li>Been able to choose a stack for each project to satisfy needs</li>
          <li>
            Worked with PHP, MySQL, Laravel, CakePHP, jQuery, Node.js, Gulp, Grunt, Ansible, Vagrant, NGINX,
            Ubuntu Server, Puppet, Shell Scripts
          </li>
          <li>Delivered services in a form of REST APIs, eCommerce Stores, CMS, Web Applications, Chat</li>
          <li>Helped out junior members of the team in progression</li>
          <li>Helped out in recruitment process</li>
          <li>Solved interesting problems to satisfy clients needs</li>
          <li>Been on call for certain clients</li>
          <li>Used ticketing systems Codebase and JIRA for project management</li>
        </Experience>

        <Experience
          start={moment('2012-09-17')}
          finish={moment('2013-06-14')}
          title="Junior Web Developer"
          organisation="Surreal Creative"
          organisationURL="http://whysurreal.com">
          <li>Worked with variety of clients on different needs, solutions and technologies</li>
          <li>Worked with PHP, MySQL, CodeIgniter, Laravel, JavaScript, jQuery, Vagrant, Puppet, Chef</li>
          <li>Solved interesting problems to satisfy client needs</li>
          <li>Used ticketing system Pivotal Tracker, Codebase and Bootcamp for project management</li>
        </Experience>

        <Experience
          start={moment('2010-09-13')}
          finish={moment('2013-06-14')}
          title="Extended Diploma in IT"
          organisation="Newcastle College"
          organisationURL="https://www.ncl-coll.ac.uk"
          nonPrintable={true}>
          <li>
            Worked on Exciting modules:
            <ul>
              <li>Unit 1: Communication and Employability Skills for IT</li>
              <li>Unit 2: Computer Systems</li>
              <li>Unit 3: Information Systems</li>
              <li>Unit 4: Impact of the Use of IT on Business Systems</li>
              <li>Unit 5: Managing Networks</li>
              <li>Unit 6: Software Design and Development</li>
              <li>Unit 7: Organisational Systems Security</li>
              <li>Unit 8: e-Commerce</li>
              <li>Unit 9: Computer Networks</li>
              <li>Unit 10: Communication Technologies</li>
              <li>Unit 11: Systems Analysis and Design</li>
              <li>Unit 12: IT Technical Support</li>
              <li>Unit 13: IT Systems Troubleshooting and Repair</li>
            </ul>
          </li>
          <li>
            Did few projects in PHP on the side in exchange for games
            <ul>
              <li>Local Game Shop website</li>
              <li>A tool to generate websites for my class colleagues to pass their modules</li>
            </ul>
          </li>
          <li>Completed with an impressive result of Triple Distinction (D*DD)</li>
        </Experience>

        <h3>Hobbies &amp; Interests</h3>

        <p>
          IT, Technology, Software Development, Gaming, Open Source, Sci-Fi, Fantasy,
          comic books.
        </p>

        <p>Golang; Frontend NE -  conferences and monthly based meet ups.</p>
      </section>
    </main>
    <Footer />

    <script dangerouslySetInnerHTML={{ __html: aboutJS }}></script>
  </body>;
}
