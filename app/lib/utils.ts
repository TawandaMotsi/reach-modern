export const basePath = process.env.NODE_ENV === 'production' ? '/reach-modern' : '';

export function getImagePath(path: string): string {
  return `${basePath}${path}`;
}
