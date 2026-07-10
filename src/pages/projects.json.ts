import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const projects = await getCollection('projects', ({ data }) =>
    data.status === 'active'
  );

  const feed = {
    version: '1.0',
    projects: projects.map((project) => ({
      slug: project.data.slug,
      title: project.data.title,
      family: project.data.family,
      description: project.data.description,
      summary: project.data.summary,
      repository: project.data.repository,
      documentation: project.data.documentation,
      package: project.data.package,
      current_version: project.data.currentVersion,
      maturity: project.data.maturity,
      status: project.data.status,
      last_release: project.data.lastRelease?.toISOString(),
      url: `${context.site}work/${project.data.family}/${project.data.slug}/`,
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
