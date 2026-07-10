---
title: EN-001 — Platforms Open Enough to Evolve
description: Internal platforms should be open enough to evolve without becoming uncontrolled.
date: 2026-07-01
workArea: platform-engineering
tags: [platform-engineering, principles, architecture]
status: published
---

Internal platforms should be open enough to evolve without becoming uncontrolled.

A platform that's too locked down can't adapt to changing needs. A platform that's too open becomes chaos. The goal is to provide clear paths for common work while leaving room for justified exceptions.

Good platforms have:

- **Golden paths** - Well-supported patterns that cover 80% of use cases
- **Documented escape hatches** - Clear ways to handle the other 20%
- **Feedback loops** - Mechanisms to surface when the golden path doesn't fit
- **Evolution without breakage** - Versioning and migration strategies

The platform should enable velocity without requiring permission for every decision, while preventing fragmentation that makes the system unmaintainable.
