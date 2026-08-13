---
name: doc-formatter
description: >
  Format and optimize markdown documentation files in this project to follow the established
  structured pattern. Use this skill whenever the user asks to "format a doc", "optimize a doc",
  "rewrite a doc to follow the pattern", "create a new doc", or mentions "fixed doc pattern"
  / "doc固定模式" / "文档格式化". Also trigger when the user writes or edits any .md file
  under docs/ and the result doesn't follow the standard structure — proactively suggest
  reformatting. Covers both creating new docs from scratch and restructuring existing ones.
---

# Doc Formatter — 项目文档固定模式

This project (kaadon.github.io) uses a consistent documentation structure across all markdown files under `docs/`. When creating or reformatting a doc, always follow the pattern below.

## The Pattern

Every doc follows this skeleton — no exceptions:

```markdown
# {Title} {Type}文档

> **{Name}** 是{one-sentence description}.

---

## 目录

- [1. Section One](#anchor1)
- [2. Section Two](#anchor2)
- [3. Section Three](#anchor3)

---

## 1. Section One {#anchor1}

{content}

---

## 2. Section Two {#anchor2}

{content}

---

## 3. Section Three {#anchor3}

| 项目 | 建议 |
|------|------|
| **Item** | Recommendation |
```

### Skeleton Notes

- **Title**: `# {Name} {Type}文档` — Type is 部署/使用/配置/构建 etc. Never use `<center>` tags (old pattern).
- **Blockquote**: One-sentence `>` intro with bold tool name. Keep under 2 lines.
- **TOC**: `## 目录` with `- [N. Title](#anchor)` links. Anchors are short English slugs: `compose`, `startup`, `production`, `tips`.
- **Sections**: `## N. Title {#anchor}`, separated by `---` between every top-level `##`.
- **Subsections**: `### N.M Title`, no deeper than `###`.
- **Code blocks**: Always specify the language tag (`bash`, `yaml`, `sql`, `nginx`, `conf`, `python`, `go`, `php`, `json`, `ini`, `text`). Add inline comments for non-obvious config. Mark placeholders clearly: `"your_password"`, `<host>`, `[your_username]`.
- **Tables**: Use for structured reference (ports, addresses, config, tips). Bold the first column when it's a category label: `| **账号安全** | ... |`.
- **Last section**: Typically a tips / production recommendations table covering security, data persistence, version pinning, resource limits, monitoring.

## Document Types

### Docker Compose 部署文档
1. Compose 配置 (`#compose`)
2. 启动与验证 (`#startup`) — include a runnable startup-to-verify command sequence and an address/port table
3. [Optional middle sections: 鉴权配置, Nginx 反向代理, 环境变量, 连接示例, etc.]
4. 生产优化建议 (`#production`)

### 工具使用文档
1. Core functionality sections (命令, 快捷键, etc.)
2. Topic-grouped sections
3. 实用技巧 (`#tips`)

### 配置文档
1. Installation / Setup
2. Configuration details
3. Common operations
4. Tips / Troubleshooting

## Process

1. Read the existing doc (or understand the topic if creating from scratch)
2. Identify the document type and group content into logical numbered sections
3. Apply the skeleton from above
4. Preserve all original technical content — don't drop commands, configs, or explanations
5. Add missing elements the pattern expects (e.g., a tips section if there isn't one)
