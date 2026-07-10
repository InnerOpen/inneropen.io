import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const updates = await getCollection('updates', ({ data }) => !data.draft);

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'InnerOpen Engineering Updates',
    home_page_url: context.site,
    feed_url: `${context.site}updates.json`,
    description: 'Latest releases, milestones, and announcements',
    items: updates
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((update) => ({
        id: update.id,
        url: `${context.site}updates/${update.id}/`,
        title: update.data.title,
        content_text: update.data.description,
        date_published: update.data.date.toISOString(),
        tags: [update.data.workArea, update.data.project, update.data.type],
        _meta: {
          project: update.data.project,
          work_area: update.data.workArea,
          version: update.data.version,
          maturity: update.data.maturity,
          repository: update.data.repository,
          release_url: update.data.releaseUrl,
        },
      })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
