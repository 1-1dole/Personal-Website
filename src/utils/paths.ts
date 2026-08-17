const baseUrl = import.meta.env.BASE_URL || '/';

export function withBase(path: string): string {
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const relative = path.startsWith('/') ? path.slice(1) : path;
  if (!relative) return `${base}/`;
  return `${base}/${relative}`;
}
