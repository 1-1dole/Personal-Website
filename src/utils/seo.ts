import { siteOrigin } from '../data/site';

export function canonicalUrl(path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteOrigin}${normalized === '/' ? '/' : normalized.endsWith('/') ? normalized : `${normalized}/`}`;
}

export function assetUrl(path: string): string {
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${siteOrigin}/${normalized}`;
}

export function socialImageUrl(canonicalPath = '/', image?: string): string | undefined {
  if (image) return image.startsWith('http') ? image : assetUrl(image);
  return canonicalPath === '/' ? assetUrl('og.png') : undefined;
}

export function projectJsonLd(project: { title: string; shortSummary: string; slug: string; technologies: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.shortSummary,
    url: canonicalUrl(`/projects/${project.slug}/`),
    author: { '@type': 'Person', name: 'Anson Lin', url: siteOrigin },
    keywords: project.technologies.join(', '),
  };
}

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Anson Lin',
  jobTitle: 'Graduate Software Engineer',
  url: siteOrigin,
  email: 'mailto:ansonlin09@gmail.com',
  sameAs: ['https://github.com/1-1dole', 'https://www.linkedin.com/in/anson-lin-b1b4ba354/'],
};
