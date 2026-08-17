import { describe, expect, test } from 'vitest';
import { featuredProjects, projectCategories, projectSchema, projects } from './projects';

const requiredFields = [
  'slug', 'title', 'shortSummary', 'longSummary', 'role', 'teamContext',
  'technologies', 'categories', 'featured', 'links', 'highlights',
  'architecture', 'testing', 'deployment', 'lessons',
] as const;

describe('project catalogue', () => {
  test('has unique slugs and exactly three featured case studies', () => {
    expect(projects.map((project) => project.slug).sort()).toEqual([
      'human-nutrition-unit', 'memory-map', 'recipe-application', 'road-sign-detection',
    ]);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    expect(featuredProjects.map((project) => project.slug)).toEqual([
      'human-nutrition-unit', 'recipe-application', 'road-sign-detection',
    ]);
  });

  test('provides every required project field', () => {
    for (const project of projects) {
      for (const field of requiredFields) expect(project[field]).toBeDefined();
      expect(projectSchema.safeParse(project).success).toBe(true);
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.highlights.length).toBeGreaterThan(0);
    }
  });

  test('uses known categories and valid HTTPS links', () => {
    const known = new Set(projectCategories);
    for (const project of projects) {
      expect(project.categories.every((category) => known.has(category))).toBe(true);
      for (const link of project.links) expect(link.href).toMatch(/^https:\/\//);
    }
  });

  test('keeps only verified links for HNU and Memory Map', () => {
    expect(projects.find(({ slug }) => slug === 'human-nutrition-unit')?.links).toEqual([
      { label: 'Live site', href: 'https://hnu.onrender.com/' },
    ]);
    expect(projects.find(({ slug }) => slug === 'memory-map')?.links).toEqual([
      { label: 'Repository', href: 'https://github.com/aolin12138/Cloud9-WDCC-SESA-Hackason-2025' },
    ]);
  });

  test('does not publish Recipe or Road Sign links', () => {
    expect(projects.find(({ slug }) => slug === 'recipe-application')?.links).toEqual([]);
    expect(projects.find(({ slug }) => slug === 'road-sign-detection')?.links).toEqual([]);
  });

  test('keeps Memory Map as a supporting project with its verified repository label', () => {
    const memoryMap = projects.find(({ slug }) => slug === 'memory-map');
    expect(memoryMap?.featured).toBe(false);
    expect(memoryMap?.links[0]).toEqual({ label: 'Repository', href: 'https://github.com/aolin12138/Cloud9-WDCC-SESA-Hackason-2025' });
  });
});
