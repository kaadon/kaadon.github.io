# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A VitePress-based personal knowledge base site ("Kaadon's Notes") containing DevOps docs, code snippets, tool configurations, and Docker deployment guides. All content is in Chinese.

## Commands

```bash
pnpm docs:dev      # Start dev server (HTTPS via @kaadon.com/developer local_ssl)
pnpm docs:build    # Build static site
pnpm docs:preview  # Preview production build
```

Node version: 20 (see `.nvmrc`). Package manager: pnpm.

## Architecture

### Content → Navigation Pipeline

The site auto-generates nav and sidebar from `link.yaml` files — no manual VitePress sidebar config.

1. Each `docs/` subdirectory has a `link.yaml` mapping filenames/subdirs to display names
2. `config.js:loadConfig()` recursively reads all `link.yaml` files into a nav tree
3. `config.js:getSidebar()` transforms that tree into VitePress sidebar format
4. `.vitepress/config.mts` imports and passes both to VitePress

**When adding a new doc**: create the `.md` file, then add its entry to the `link.yaml` in the same directory. Use `isShow: false` to hide from nav. Subdirectories use `path: true`.

```yaml
# link.yaml entry for a file
"screen.md":
    text: "Screen 使用文档"

# link.yaml entry for a subdirectory
compose:
    text: 线上部署示例
    path: true
```

### Content Organization

- `docs/DockerLibrary/compose/` — Docker Compose deployment docs (MySQL, ClickHouse, NATS, Gitea, MinIO, etc.)
- `docs/CommonToolConfiguration/` — Tool configs (git, mysql, nginx, node, php, shell)
- `docs/CommonCodeFragment/` — Reusable code snippets (HTML, JavaScript)
- `docs/tools/` — Dev tool usage guides (Screen, WebStorm, etc.)
- `docs/other/` — Misc (SSL, CDN, Linux, Mac, virus cleanup)

### Doc Formatting

All docs under `docs/` follow a fixed structure — see the `doc-formatter` skill in `.claude/skills/` for the full pattern. Key elements: title with type suffix, blockquote intro, TOC with anchors, numbered `##` sections with `{#anchor}`, `---` separators, and a tips/production table as the last section.
