# InnerOpen Engineering

The engineering site for InnerOpen — a home for project updates, technical notes, and open infrastructure work.

Built with Astro, using content collections for type-safe content management, and deployed to GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Site Structure

- **Work Areas** - Broad technical categories (Marvin CMS, OpenShift, Kubernetes, Platform Engineering, Automation & AI)
- **Projects** - Specific repositories and tools
- **Updates** - Release announcements, milestones, project updates
- **Notes** - Short-form technical writing

## Content Management

Content is managed through Astro content collections in `src/content/`:

- `work-areas/` - Work area pages
- `projects/` - Project pages
- `updates/` - Release and announcement posts
- `notes/` - Engineering notes

All content is written in Markdown with frontmatter validated by Zod schemas.

## Publishing Updates

InnerOpen repositories can publish updates to this site via a reusable GitHub Actions workflow.

**Setup required**: Create an organization-level secret `INNEROPEN_IO_TOKEN` with write access to this repository. See [PUBLISHING.md](./PUBLISHING.md) for complete instructions.

Quick example:

```yaml
jobs:
  publish-release:
    uses: InnerOpen/inneropen.io/.github/workflows/project-update.yml@main
    with:
      project: marvin
      work-area: marvin-cms
      version: ${{ github.event.release.tag_name }}
      headline: "Marvin ${{ github.event.release.tag_name }} Released"
      summary: ${{ github.event.release.body }}
    secrets: inherit  # Uses org-level INNEROPEN_IO_TOKEN
```

## Feeds

Machine-readable feeds are available:

- `/rss.xml` - RSS feed of updates
- `/updates.json` - JSON Feed format
- `/projects.json` - Project list with metadata

## GitHub Pages

Deployed automatically via GitHub Actions on push to `main`. Custom domain: `inneropen.io`
