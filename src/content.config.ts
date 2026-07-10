import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const workAreas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work-areas' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    summary: z.string(),
    status: z.enum(['active', 'maintenance', 'archived']).default('active'),
    order: z.number().default(100),
    featured: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    family: z.string(), // References work area slug
    description: z.string(),
    summary: z.string(),
    repository: z.string().url().optional(),
    documentation: z.string().url().optional(),
    package: z.string().optional(), // npm package name or registry URL
    currentVersion: z.string().optional(),
    maturity: z.enum([
      'concept',
      'experimental',
      'alpha',
      'beta',
      'stable',
      'maintenance',
      'archived'
    ]).default('experimental'),
    status: z.enum(['active', 'paused', 'archived']).default('active'),
    lastRelease: z.date().optional(),
    featured: z.boolean().default(false),
  }),
});

const updates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/updates' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    project: z.string(), // References project slug
    workArea: z.string(), // References work area slug
    version: z.string().optional(),
    type: z.enum([
      'release',
      'milestone',
      'announcement',
      'project-update',
      'deprecation'
    ]),
    maturity: z.enum([
      'concept',
      'experimental',
      'alpha',
      'beta',
      'stable',
      'maintenance',
      'archived'
    ]).optional(),
    repository: z.string().url().optional(),
    releaseUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    workArea: z.string().optional(), // References work area slug
    project: z.string().optional(), // References project slug
    tags: z.array(z.string()).default([]),
    status: z.enum(['draft', 'published', 'archived']).default('published'),
  }),
});

export const collections = {
  'work-areas': workAreas,
  'projects': projects,
  'updates': updates,
  'notes': notes,
};
