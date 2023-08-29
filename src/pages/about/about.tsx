import fs from 'fs';

import moment from 'moment';
import React, { ReactElement, ReactNode } from 'react';

import { distDir } from '../../config';
import { Footer, Header } from '../layout';

type BaseExperienceProperties = {
  readonly title: string;
  readonly start: moment.Moment;
  readonly finish?: moment.Moment;
  readonly nonPrintable?: boolean;
  readonly children: ReactNode;
};

type ExperienceProperties = BaseExperienceProperties & {
  readonly hasEmbeddedExperience?: boolean;
  readonly organisation: string;
  readonly organisationURL?: string;
}

function Experience(props: ExperienceProperties): ReactElement {
  const termStart = props.start.format('MMM Do YYYY');
  const termEnd = !props.finish ? 'present' : props.finish.format('MMM Do YYYY');
  const title = `${termStart} - ${termEnd}`;

  const closedImg = fs.readFileSync(distDir('img', 'arrows', 'right.svg'), 'utf8');
  const openImg = fs.readFileSync(distDir('img', 'arrows', 'down.svg'), 'utf8');

  return <details data-details={props.nonPrintable ? 'no-print' : ''} open>
    <summary>
      <span className="icon closed" dangerouslySetInnerHTML={{ __html: closedImg }} />
      <span className="icon open" dangerouslySetInnerHTML={{ __html: openImg }} />
      <div>
        <time dateTime={props.start.format('YYYY-MM-DD')} title={title}>
          {props.start.year()} - {!props.finish ? 'present' : props.finish.year()}
        </time>
        <span className={props.hasEmbeddedExperience ? 'no-print' : ''}>: {}
          <strong>
            {props.title}
          </strong> at
        </span> <a href={props.organisationURL} target="_blank" rel="external nofollow noopener noreferrer">
          {props.organisation}
        </a> {props.organisationURL
          ? <span className="link" aria-hidden>( {props.organisationURL} )</span>
          : <></>}
      </div>
    </summary>

    {props.children}

  </details>;
}

function EmbeddedExperience(props: BaseExperienceProperties): ReactElement {
  const termStart = props.start.format('MMM Do YYYY');
  const termEnd = !props.finish ? 'present' : props.finish.format('MMM Do YYYY');
  const title = `${termStart} - ${termEnd}`;

  return <div className="embedded">
    <time dateTime={props.start.format('YYYY-MM-DD')} title={title}>
      {props.start.format('MMMM YYYY')} - {!props.finish ? 'present' : props.finish.format('MMMM YYYY')}
    </time>: {}
    <strong>{props.title}</strong>

    {props.children}
  </div>;
}

export function About(): ReactElement {
  const aboutJS = fs.readFileSync(distDir('js', 'about.js'), 'utf8');

  return <body>
    <Header page="about" />
    <main id="about">
      <section id="summary">
        <h3>Professional summary</h3>

        <p>
          I'm a highly experienced Site Reliability Engineer with extensive experience of providing technical leadership
          across teams and projects, committed to maintaining cutting edge technical skills and up-to-date industry
          knowledge. I'm eager to learn and always after new exciting opportunities and challenges.
        </p>
      </section>

      <section id="skills">
        <h3>Skills</h3>

        <ul data-skills>
          <li>Agile</li>

          {/* Languages */}
          <li>Go</li>
          <li>Node.js and JavaScript</li>
          <li>TypeScript</li>
          <li>ES6</li>
          <li>PHP</li>
          <li>Ruby</li>
          <li>Python</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>JSON</li>
          <li>YAML</li>
          <li>SQL</li>

          {/* Infrastructure */}
          <li>AWS</li>
          <li>Kubernetes</li>
          <li>Lambda</li>
          <li>Docker</li>
          <li>CloudFoundry</li>
          <li>API Gateway</li>

          {/* Tools */}
          <li>Linux</li>
          <li>Git</li>
          <li>Terraform</li>
          <li>Concourse</li>
          <li>CloudFormation</li>
          <li>Prometheus</li>
          <li>NGINX</li>
          <li>Kibana</li>
          <li>DataDog</li>
          <li>Webpack</li>
          <li>Gulp</li>
          <li>Mailgun</li>
          <li>Shell</li>
          <li>Travis</li>
          <li>Ansible</li>
          <li>Puppet</li>
          <li>Vagrant</li>

          {/* Methods */}
          <li>JWT</li>
          <li>OIDC</li>
          <li>OAuth2</li>
          <li>DevOps</li>
          <li>Web Applications</li>
          <li>REST APIs</li>

          {/* Backing services */}
          <li>Postgres</li>
          <li>Redis</li>
          <li>MySQL</li>
          <li>DynamoDB</li>
          <li>Memcached</li>

          {/* Frameworks */}
          <li>Koa.js</li>
          <li>React</li>
          <li>Express.js</li>
          <li>Angular</li>
          <li>Ionic</li>
          <li>Foundation</li>
          <li>Bootstrap</li>

          {/* Competencies */}
          <li>Continuous Integration and Delivery</li>
          <li>Infrastructure as Code</li>
          <li>Platform monitoring</li>
          <li>Technical Leadership</li>
          <li>Unit and Integration Testing</li>
          <li>Mentoring</li>
          <li>Excellent problem-solving</li>
          <li>Database Design</li>
        </ul>
      </section>

      <section id="timeline">
        <h3>Experience</h3>

        <Experience
          start={moment('2016-08-08')}
          title="Lead SRE"
          hasEmbeddedExperience={true}
          organisation="Government Digital Service"
          organisationURL="https://gds.blog.gov.uk">
          <EmbeddedExperience
            start={moment('2022-03-23')}
            title="Lead SRE">
            <ul>
              <li>
                Lead the Site Reliability Engineering capabilities across multiple teams, managed workload, provided
                guidance and mentorship to junior team members
              </li>
              <li>
                Collaborated with cross-functional teams including software development, IT operations, and security
                teams to improve reliability, scalability, and security of infrastructure and the surrounding processes
              </li>
              <li>
                Developed and implemented proactive monitoring and alerting systems to ensure that issues are caught
                before they become critical
              </li>
              <li>
                Worked with development teams to ensure that software releases are properly tested, validated and
                deployed in production environments
              </li>
              <li>
                Developed and maintained documentation for infrastructure and processes related to Site Reliability
                Engineering
              </li>
              <li>
                Participated in incident response and post-mortem analysis to identify the root cause of problems and
                implement preventative measures to avoid similar incidents in the future
              </li>
              <li>
                Ensured compliance with industry standards and best practices related to Site Reliability Engineering
                and serverless systems
              </li>
              <li>
                Evaluated and implemented new technologies and tools that can help improve system performance and
                reliability
              </li>
              <li>
                Worked and Communicated with senior management and stakeholders regarding the strategy, progress and
                status of Site Reliability Engineering initiatives providing guidance at various levels
              </li>
              <li>
                Contributed and assisted in building the support model for the programme, setting out the strategy for
                running critical service sustainably and reliably
              </li>
            </ul>
          </EmbeddedExperience>

          <EmbeddedExperience
            start={moment('2016-08-08')}
            finish={moment('2022-03-22')}
            title="Senior SRE">
            <ul>
              <li>
                As Tech Lead of the GOV.UK PaaS team, provided technical leadership of a large scale government wide
                cloud hosting platform
              </li>
              <li>
                Planned, prioritised and built various components for tenants of GOV.UK PaaS (home to 200+
                organisations, 2.5k applications and 2k backing services) including admin portal, billing statements and
                calculator, IPSec encryption for traffic between cells and routers, performance dashboards and alerts
              </li>
              <li>
                Architected and led the design and development of various components for the Kubernetes platform
                including service operator, signed docker images, deployment and smoke testing pipelines
              </li>
              <li>
                Worked with Senior Management, Product Managers, User Researchers, UI and Content Designers to
                understand user needs and design, plan and prioritise multiple streams of work to improve the platform
              </li>
              <li>
                Provided expert advice to PaaS tenants across government and the wider public sector to help them get
                the most out of the platform and to establish best practice patterns and approaches. Feeding learnings
                from this support back into the team to help identify unmet needs
              </li>
              <li>
                Developed GOV.UK PaaS and Build &amp; Run processes with the use of Terraform, AWS, Concourse,
                Kubernetes, CloudFoundry, Bosh, YAML, Go, Shell Scripts, Postgres
              </li>
              <li>
                Developed web applications for GOV.UK PaaS tenants with the use of Go, Node.js, TypeScript, Sinatra, JS,
                Webpack
              </li>
              <li>
                Worked with Secure Continuous Delivery system using Git and GPG encryption to ensure integrity of
                developer commits prior to deployment
              </li>
              <li>
                Line managed and mentored colleagues through career progression, more demanding tasks and new
                responsibilities
              </li>
              <li>Troubleshoot complex network and systems issues through being on support or a incident lead</li>
              <li>Actively patched various CVE's, performed security audits, triaged risks and pen-test findings</li>
              <li>
                In-depth pair programming to build shared knowledge, onboard colleagues to complex systems and share
                the burden of more demanding tasks
              </li>
              <li>
                Presented and demonstrated at show and tells, knowledge shares, meet-ups, conferences and online panels
                and podcasts
              </li>
              <li>
                Driving progression, well being, and best working practices for the team
              </li>
              <li>Worked in an Agile - Kanban environment</li>
              <li>
                Used and managed ticketing system Pivotal Tracker for project management which involved creating epics
                and stories
              </li>
            </ul>
          </EmbeddedExperience>
        </Experience>

        <Experience
          start={moment('2015-11-30')}
          finish={moment('2016-08-05')}
          title="Frontend Developer"
          organisation="FLIP Sports"
          organisationURL="http://flipsports.com">
          <ul>
            <li>Worked on a rewards system with the use of Angular, Ionic, JWT, OIDC, Python, AWS, Postgres</li>
            <li>Delivered services in a form of REST APIs, Web Applications, Metric collectors</li>
            <li>Mainly focussed on the Frontend aspect of the projects</li>
            <li>Helped out with certain python micro services</li>
            <li>Helped out with PHP projects</li>
            <li>Used ticketing system JIRA for project management</li>
          </ul>
        </Experience>

        <Experience
          start={moment('2013-06-17')}
          finish={moment('2015-11-27')}
          title="Developer"
          organisation="HurstDEV">
          <ul>
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
          </ul>
        </Experience>

        <Experience
          start={moment('2012-09-17')}
          finish={moment('2013-06-14')}
          title="Junior Web Developer"
          organisation="Surreal Creative"
          organisationURL="https://whysurreal.com">
          <ul>
            <li>Worked with variety of clients on different needs, solutions and technologies</li>
            <li>Worked with PHP, MySQL, CodeIgniter, Laravel, JavaScript, jQuery, Vagrant, Puppet, Chef</li>
            <li>Solved interesting problems to satisfy client needs</li>
            <li>Used ticketing system Pivotal Tracker, Codebase and Bootcamp for project management</li>
          </ul>
        </Experience>

        <Experience
          start={moment('2009-09-14')}
          finish={moment('2012-06-14')}
          title="Extended Diploma in IT"
          organisation="Newcastle College"
          organisationURL="https://www.ncl-coll.ac.uk"
          nonPrintable={true}>
            <ul>
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
          </ul>
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
