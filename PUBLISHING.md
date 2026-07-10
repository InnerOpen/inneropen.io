# Publishing Updates to InnerOpen.io

This guide explains how InnerOpen project repositories can publish updates to the engineering site.

## Overview

External repositories can publish updates by calling a reusable GitHub Actions workflow. Updates are submitted as pull requests for human review before publication.

## Setup

### Option 1: Organization-Level Secret (Recommended for Same-Org Repos)

Since all InnerOpen projects are in the same GitHub organization, you can set up **one** org-level secret that all repos inherit:

1. Create a fine-grained PAT:
   - **Resource owner:** InnerOpen (organization)
   - **Repository access:** Only select repositories → `inneropen.io`
   - **Permissions:**
     - Contents: Read & Write
     - Pull Requests: Read & Write

2. Add as an **organization secret**:
   - Go to: GitHub.com → InnerOpen → Settings → Secrets and variables → Actions
   - Click "New organization secret"
   - **Name:** `INNEROPEN_IO_TOKEN`
   - **Repository access:** All repositories (or select specific repos)

3. Calling repos can use `secrets: inherit` (see examples below)

### Option 2: GitHub App (Recommended for Production)

1. Create a GitHub App for the InnerOpen organization:
   - **Name:** "InnerOpen Updates Publisher"
   - **Permissions:**
     - Contents: Read & Write
     - Pull Requests: Read & Write
   - **Install only on:** `inneropen.io` repository

2. Generate a private key and store credentials as organization secrets:
   - `INNEROPEN_APP_ID`
   - `INNEROPEN_APP_KEY`

## Usage

### Basic Release Publishing

Create `.github/workflows/publish-release.yml` in your project repository:

```yaml
name: Publish Release to inneropen.io

on:
  release:
    types: [published]

jobs:
  publish-to-io:
    uses: InnerOpen/inneropen.io/.github/workflows/project-update.yml@main
    with:
      project: marvin
      work-area: marvin-cms
      version: ${{ github.event.release.tag_name }}
      headline: "Marvin ${{ github.event.release.tag_name }} Released"
      summary: ${{ github.event.release.body }}
      type: release
      maturity: alpha
      repository: ${{ github.event.repository.html_url }}
      release-url: ${{ github.event.release.html_url }}
    secrets:
      GITHUB_TOKEN: ${{ secrets.INNEROPEN_IO_TOKEN }}
```

### Manual Publishing

For milestone announcements or non-release updates:

```yaml
name: Publish Update

on:
  workflow_dispatch:
    inputs:
      headline:
        description: 'Update headline'
        required: true
      summary:
        description: 'Update summary'
        required: true
      type:
        description: 'Update type'
        required: true
        type: choice
        options:
          - milestone
          - announcement
          - project-update

jobs:
  publish:
    uses: InnerOpen/inneropen.io/.github/workflows/project-update.yml@main
    with:
      project: marvin
      work-area: marvin-cms
      headline: ${{ inputs.headline }}
      summary: ${{ inputs.summary }}
      type: ${{ inputs.type }}
      maturity: alpha
      repository: ${{ github.event.repository.html_url }}
    secrets:
      GITHUB_TOKEN: ${{ secrets.INNEROPEN_IO_TOKEN }}
```

## Workflow Inputs

### Required Inputs

- **`project`** - Project slug (e.g., `marvin`, `marvin-sdk`)
- **`work-area`** - Work area slug (e.g., `marvin-cms`, `openshift`)
- **`headline`** - Update title
- **`summary`** - Brief description of the update

### Optional Inputs

- **`version`** - Version number (e.g., `0.1.0`, `v1.2.3`)
- **`type`** - Update type: `release`, `milestone`, `announcement`, `project-update`, `deprecation` (default: `release`)
- **`maturity`** - Project maturity: `concept`, `experimental`, `alpha`, `beta`, `stable`, `maintenance`, `archived` (default: `experimental`)
- **`repository`** - Repository URL
- **`release-url`** - Release or announcement URL
- **`skip-duplicate-check`** - Skip duplicate detection (default: `false`)

## Update Types

- **`release`** - Software release with version number
- **`milestone`** - Significant feature or project milestone
- **`announcement`** - General announcement or news
- **`project-update`** - Progress update or status change
- **`deprecation`** - Deprecation notice

## Maturity Levels

- **`concept`** - Idea or design phase
- **`experimental`** - Early prototype
- **`alpha`** - Internal testing
- **`beta`** - External preview
- **`stable`** - Production-ready
- **`maintenance`** - Stable but minimal updates
- **`archived`** - No longer maintained

## Behavior

### Duplicate Detection

By default, the workflow checks for existing updates with the same project and version. If found, it exits without creating a PR.

To force publishing a duplicate (e.g., for corrections), set `skip-duplicate-check: true`.

### Pull Request Workflow

1. Workflow generates a markdown file in `src/content/updates/`
2. Creates a branch named `update/{project}-{version}`
3. Opens a pull request with labels `automated` and `update`
4. Human reviewer edits the content if needed
5. Merge to publish

## Examples

### Marvin Core Release

```yaml
with:
  project: marvin
  work-area: marvin-cms
  version: 0.2.0
  headline: "Marvin 0.2.0 - Forms become first-class"
  summary: "Marvin now supports schema-driven forms and event-based integrations."
  type: release
  maturity: alpha
  repository: https://github.com/InnerOpen/marvin
  release-url: https://github.com/InnerOpen/marvin/releases/tag/v0.2.0
```

### Milestone Announcement

```yaml
with:
  project: marvin-sdk
  work-area: marvin-cms
  headline: "Marvin SDK reaches 100 downloads"
  summary: "The Python SDK has reached 100 PyPI downloads, with early adopters providing valuable feedback."
  type: milestone
  maturity: experimental
```

### OpenShift Migration Update

```yaml
with:
  project: openstack-migration
  work-area: openshift
  headline: "Completed Phase 1 capacity assessment"
  summary: "Analyzed workload requirements for 200 OpenStack VMs, identified migration candidates."
  type: project-update
```

## Troubleshooting

### Authentication Errors

If the workflow fails with permission errors:

1. Verify the PAT or GitHub App has correct permissions
2. Check that the secret name matches in your workflow
3. Ensure the secret is accessible to your repository

### Duplicate Not Detected

The duplicate check searches for:
```bash
project: {project}
version: {version}
```

If updates aren't being caught:
- Verify the frontmatter format matches exactly
- Check that the version format is consistent (with or without `v` prefix)

### Content Not Appearing

After merging the PR:
1. Check that the GitHub Pages deployment succeeded
2. Verify the update has `draft: false` in frontmatter
3. Wait 1-2 minutes for the site to rebuild

## Support

For issues with the publishing workflow:
- Open an issue in [InnerOpen/inneropen.io](https://github.com/InnerOpen/inneropen.io)
- Tag with `workflow` label
