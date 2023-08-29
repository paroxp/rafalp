import path from 'path';

export type Config = {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly subtitle?: string;
  readonly url: string;
  readonly path?: string;
}

export const config: Config = {
  description: 'Technologist, DevOps, Developer, Site Reliability Engineer, all kinds of wizardry.',
  keywords: [
    'javascript', 'typescript', 'go', 'kubernetes', 'fullstack', 'software', 'engineer', 'web', 'developer', 'devops',
    'php', 'ruby', 'python', 'html', 'scss', 'css', 'cloudfoundry', 'london', 'cv', 'resume', 'aws',
  ],
  name: 'Rafal Proszowski',
  title: 'Software Engineer',
  url: 'https://www.rafalp.com/',
};

export const distDir = (...parts: readonly string[]): string => path.join(__dirname, '..', 'dist', ...parts);
export const srcDir = (...parts: readonly string[]): string => path.join(__dirname, ...parts);
