import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const updates = await getCollection('updates', ({ data }) => !data.draft);

  return rss({
    title: 'InnerOpen Engineering Updates',
    description: 'Latest releases, milestones, and announcements from InnerOpen projects',
    site: context.site!,
    items: updates
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((update) => ({
        title: update.data.title,
        description: update.data.description,
        link: `/updates/${update.id}/`,
        pubDate: update.data.date,
        categories: [update.data.workArea, update.data.type],
      })),
    customData: '<language>en-us</language>',
  });
}
