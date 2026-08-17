import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { canonicalUrl } from '../utils/seo';

export const GET: APIRoute = () => {
  const urls = ['/', ...projects.map((project) => `/projects/${project.slug}/`)].map((path) => `<url><loc>${canonicalUrl(path)}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
