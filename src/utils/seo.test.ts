import { describe, expect, it } from 'vitest';
import { assetUrl, canonicalUrl, personJsonLd, projectJsonLd, socialImageUrl } from './seo';

describe('SEO metadata', () => {
  it('builds canonical URLs under the GitHub Pages project base', () => {
    expect(canonicalUrl('/')).toBe('https://1-1dole.github.io/Personal-Website/');
    expect(canonicalUrl('/projects/human-nutrition-unit/')).toBe('https://1-1dole.github.io/Personal-Website/projects/human-nutrition-unit/');
  });
  it('keeps structured data tied to the project record', () => {
    const result = projectJsonLd({ title: 'Memory Map', shortSummary: 'A map.', slug: 'memory-map', technologies: ['Leaflet.js'] });
    expect(result.name).toBe('Memory Map');
    expect(result.url).toContain('/projects/memory-map/');
  });
  it('uses the homepage card only where no route-specific image exists', () => {
    expect(socialImageUrl('/')).toBe(assetUrl('og.png'));
    expect(socialImageUrl('/projects/human-nutrition-unit/', 'images/hnu-homepage.png')).toBe(assetUrl('images/hnu-homepage.png'));
    expect(socialImageUrl('/projects/recipe-application/')).toBeUndefined();
  });
  it('exposes a recruiter-readable Person identity', () => {
    expect(personJsonLd['@type']).toBe('Person');
    expect(personJsonLd.sameAs).toContain('https://github.com/1-1dole');
    expect(personJsonLd.sameAs).toContain('https://www.linkedin.com/in/anson-lin-b1b4ba354/');
  });
});
