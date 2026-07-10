---
title: Marvin CLI
slug: marvin-cli
family: marvin-cms
description: Command-line interface for Marvin CMS operations. Manage workspaces, schemas, content, and deployments from the terminal.
summary: CLI for Marvin operations
repository: https://github.com/InnerOpen/marvin-cli
package: marvin-cli
maturity: experimental
status: active
featured: false
---

The Marvin CLI provides command-line access to Marvin CMS functionality.

## Features

- **Workspace management** - Create, list, and configure workspaces
- **Schema operations** - Define and update content schemas
- **Content management** - CRUD operations on content entries
- **Deployment** - Deploy and manage Marvin instances
- **Migration tools** - Data migration and transformation utilities
- **Development server** - Local development environment

## Installation

```bash
pip install marvin-cli
```

## Usage

```bash
marvin workspace create my-site
marvin schema apply content-types.json
marvin content list posts
```

## Status

The CLI is experimental and under active development. Command structure may change as we refine the interface.
