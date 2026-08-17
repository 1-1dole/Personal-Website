import { defineCollection } from 'astro:content';
import { projectSchema } from './data/projects';

const projects = defineCollection({
  type: 'data',
  schema: projectSchema,
});

export const collections = { projects };
