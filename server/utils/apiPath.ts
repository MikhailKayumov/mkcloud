import config from 'config';

export function apiPath(path = ''): string {
  if (!path) return config.get<string>('baseAPIPath');

  path = path.startsWith('/') ? path.slice(1) : path;
  return `${config.get<string>('baseAPIPath')}/${path}`;
}
