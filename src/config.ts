import winston from 'winston';

export type Config = {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly subtitle?: string;
  readonly url: string;
}

export const config: Config = {
  description: 'DevOps, Developer, Site Reliability Engineer, all kinds of wizardry.',
  keywords: [
    'javascript', 'typescript', 'go', 'kubernetes', 'fullstack', 'software', 'engineer', 'web', 'developer', 'devops',
    'php', 'ruby', 'python', 'html', 'scss', 'css', 'cloudfoundry', 'london', 'cv', 'resume',
  ],
  name: 'Rafal Proszowski',
  title: 'Software Engineer',
  url: 'https://www.rafalp.com/',
};

export const logger = winston.createLogger({
  defaultMeta: { service: config.url },
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  transports: [ new winston.transports.Console() ],
});
