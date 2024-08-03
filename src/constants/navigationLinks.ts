export interface INavigationLink {
  name: string;
  path: string;
}

export const navigationLinks: INavigationLink[] = [
  { name: 'welcome', path: '/' },
  { name: 'new', path: '/' },
  { name: 'threads', path: '/' },
  { name: 'past', path: '/' },
  { name: 'comments', path: '/' },
  { name: 'ask', path: '/' },
  { name: 'show', path: '/' },
  { name: 'jobs', path: '/' },
  { name: 'submit', path: '/' },
  { name: 'error', path: '/error' },
];
