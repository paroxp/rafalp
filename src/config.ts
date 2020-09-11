export interface IConfig {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly subtitle?: string;
  readonly url: string;
}

export const config: IConfig = {
  description: 'DevOps, Developer, Site Reliability Engineer, all kinds of wizardry.',
  keywords: [
    'javascript', 'typescript', 'go', 'kubernetes', 'fullstack', 'software', 'engineer', 'web', 'developer', 'devops',
    'php', 'ruby', 'python', 'html', 'scss', 'css', 'cloudfoundry', 'london', 'cv', 'resume',
  ],
  name: 'Rafal Proszowski',
  title: 'Software Engineer',
  url: 'https://www.rafalp.com/',
};