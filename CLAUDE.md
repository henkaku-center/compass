# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Repository Overview

**Compass** makes shared values and ongoing work visible and easy to contribute to — coordination infrastructure for the Henkaku Center, Graduate School of Design & Science (SDS), and Chiba Institute of Technology.

Unlike traditional static institutional documents, Compass is designed to evolve through transparent, peer-reviewed contributions with version control as the system of record.

## Document Architecture: DNA / Emergent

Compass documents are organized into two layers, inspired by a biological analogy: foundational documents are the "DNA" (structural code), while instantiated content is "emergent" (expressed from those templates).

**DNA** — Foundational documents that define principles, governance, and structural templates:
- **Charter** — Values, governance, and operational commitments (9 sections). Lives in its own repository at [charter.henkaku.center](https://charter.henkaku.center) (source: `https://charter.henkaku.center/content/CHARTER.md`)
- **Archetypes** — Structural templates for sixteen registry entry types (served from Registry at `/api/v1/compass/files/docs/ARCHETYPES.md`)

**Emergent** — Living content instantiated from the foundational templates:
- **Curriculum** — SDS Master's and PhD curriculum (served from Registry at `/api/v1/compass/files/docs/CURRICULUM.md`)
- **Registry data** — Entities and relations stored in the Registry database, accessed via API
- *(future)* Theses and posts registry entries

**Supporting:**
- `README.md` — Purpose, structure, institutional context
- `STATUS.md` — Progress updates for non-technical stakeholders
- `index.html` — Static web viewer with hash routing and marked.js rendering
- `compass-data.js` — Unified data layer (entity store, relation management, graph building) loaded by `index.html`
- `CLAUDE.md` — This file
- `CNAME` — GitHub Pages custom domain (`compass.henkaku.center`)

All data (entities, relations, portraits, docs, reference files) lives in the Registry. This repo is the app shell only.

## Repository Structure

```
compass/
├── index.html            (HTML shell only — 126 lines, no inline CSS or JS)
├── compass.css           (all styles — extracted from index.html)
├── api-client.js         (Registry API client with JWT auth)
├── compass-data.js       (data layer: entity store, relations, graph)
├── compass-markdown.js   (Mermaid + Marked config, diagram renderer)
├── compass-config.js     (routes, siteMap — entity metadata fetched from API)
├── compass-ui.js         (DOM refs, nav, modal, sidebar, TOC, scroll, utilities)
├── compass-auth.js       (API client init, login/logout, session, store loader)
├── compass-entity.js     (entity cards, list pages, detail pages, edit modal, CRUD)
├── compass-network.js    (3D force-directed graph visualization)
├── compass-pages.js      (landing, charter, archetypes, references, history, feedback, contact, contribute)
├── compass-app.js        (router: loadFromHash, SSE subscription, bootstrap)
├── compass-icon.png
├── network.png
├── scripts/
│   └── migrate.js        (entity + relations migration tool)
├── README.md
├── STATUS.md
├── CLAUDE.md
└── CNAME
```

### JavaScript Module Structure

The app JavaScript is split into 7 files loaded in dependency order (no build step, no ES modules — plain `<script>` tags in global scope):

1. **compass-markdown.js** — Mermaid initialization + Marked renderer config + `renderMermaidDiagrams()`
2. **compass-config.js** — Pure data: routes, sidebar map (entity type metadata fetched from API at runtime)
3. **compass-ui.js** — Shared UI: DOM refs, mobile nav, modal system, sidebar builder, TOC/scroll, utilities
4. **compass-auth.js** — Auth: ApiClient instance, login/logout, session restore, entity type + store loader
5. **compass-entity.js** — Entities: card rendering, list pages, detail views (per-type), edit modal with relation editor
6. **compass-network.js** — Network: 3D force graph with type filters, node selection, hover animation
7. **compass-pages.js** — Pages: landing, charter, archetypes, references, history, feedback, contact, contribute
8. **compass-app.js** — Router: `loadFromHash()` dispatch, SSE subscription, bootstrap

All data is served from the Registry API (`registry.henkaku.center`):
- Entities & relations via `/api/v1/compass/entities` and `/api/v1/compass/relations`
- Portraits via `/api/v1/compass/entities/{id}/files/{filename}`
- Docs (ARCHETYPES.md, CURRICULUM.md) via `/api/v1/compass/files/docs/{filename}`
- Reference files via `/api/v1/compass/files/reference/{filename}`

## Institutional Context

Three closely coupled entities under the Compass Initiative:

1. **Chiba Institute of Technology (Chiba Tech)** — Host institution, Japan's oldest private technology institute (founded 1942)
2. **Graduate School of Design & Science (SDS)** — Academic arm launching April 2026, antidisciplinary project-based learning
3. **Henkaku Center for Radical Transformation** — Research center providing shared infrastructure across education, research, and policy

The **Compass Initiative** explores radical coordination technology — tools, frameworks, and practices that help groups align, make decisions, and evolve together without rigid hierarchy.

**Antidisciplinary** means coordination at the paradigm level — working across disciplines by focusing on shared purpose and systems, not domain-specific authority. Distinct from interdisciplinary (combining existing disciplines).

## Agentic Workflows

AI agents are integrated components of contribution infrastructure across three dimensions:

1. **Development** — This repository is developed using LLM coding agents under human direction
2. **Contribution** — Contributors use coding agents when proposing amendments, reviews, and revisions
3. **Interfaces** — Intermediate agents (bots) will let contributors interact via Slack or web interfaces without direct repository access

**Guardrails:**
- Authority, accountability, and final decision-making remain explicitly human
- AI systems do not possess moral, legal, or institutional agency
- Commits must be authored by human decision-makers, not attributed to AI assistance

## Charter Structure

The Charter is hosted externally at [charter.henkaku.center](https://charter.henkaku.center) (markdown source: `https://charter.henkaku.center/content/CHARTER.md`). It has 9 sections:

- **Preamble** — Scope, intent, applicability
- **I. Foundational Orientations** — 12 directional principles (resilience over strength, systems over objects, etc.)
- **II. Values and Commitments** — 10 subsections: antidisciplinarity, transformation, human-AI collaboration, complexity, intellectual integrity, experimentation, neurodiversity, cultural identity, openness, coordination
- **III. Research Practice** — Project-centered inquiry
- **IV. Educational Practice** — Project-centered learning, learning through making, AI pedagogy
- **V. Registry and Coordination Infrastructure** — Shared platform for people, projects, initiatives, courses, theses, events, and institutions
- **VI. Institutional Relationships** — Roles, Chiba Tech, Henkaku/SDS, external partners
- **VII. Governance and Stewardship** — Charter evolution, decision-making, conflict resolution
- **VIII. Evolution and Adaptation** — Versioning, portability, reuse conditions
- **IX. Closing Provisions** — Authority, interpretation, ratification

All sections contain full text. The draft is ready for review by ratifying members.

## Archetypes

The Charter (Section V) mandates a shared registry. The **Archetypes** document defines the structural templates for registry entries. The Charter provides the mandate; the Archetypes define the forms.

Sixteen entry types:
- **Institutions** — Organizations in the ecosystem with mandates, capabilities, and relationships
- **People** — Roles, domain affinities, affiliations, project involvement. `role_categories` supports multiple roles.
- **Projects** — Bounded units of transformation with completion criteria
- **Initiatives** — Ongoing programs evaluated on continuing justification
- **Courses** — Recurring educational units with learning objectives and Charter alignment
- **Theses** — Bounded academic works with advisors, committees, and defense milestones
- **Events** — Time-bound gatherings that connect people and advance work
- **Posts** — Written contributions (reflections, updates, announcements, commentary) from participants
- **Places** — Physical locations where ecosystem activities happen (campuses, coworking spaces, venues)
- **Domains** — Knowledge and research areas that map the intellectual landscape
- **Publications** — Peer-reviewed academic works — journal articles, conference papers, book chapters, and reports
- **Vectors** (`vec_` prefix) — Directional transformations with from/toward, domains, and status
- **Deltas** (`delta_` prefix) — Observable changes with from/toward, observed_date, domains, and status
- **Curricula** (`curriculum_` prefix) — Structured programs of study with requires/accepts relations to courses
- **Theses** (`thesis_` prefix) — Bounded academic works with advisors, committees, and defense milestones
- **Posts** (`post_` prefix) — Written contributions from participants — reflections, updates, announcements

**Essential questions** guide each entry type (4 prompts each — see ARCHETYPES.md served from Registry).

**Unified entity + relations architecture**: Entities contain only intrinsic attributes. All cross-references (affiliations, contributors, instructors, prerequisites, etc.) are stored as `{source, target, type, meta?}` relation triples in the Registry database. `compass-data.js` provides the runtime data layer that loads entities and relations from the API, manages CRUD, and builds the network graph.

**Privacy & visibility**: The registry is a coordination tool, not a public directory. Person records should be professionally relevant, participant-controlled, and appropriately scoped. Entities have a `visibility` field (`public`/`internal`/`restricted`) — the API filters results by user auth. The frontend includes `visibility` in flattened entities and shows badges on detail pages for non-public entities. The SSE connection passes `?token=` for authenticated event filtering.

## Working with This Repository

### Editing Philosophy

**Charter** (external — [charter.henkaku.center](https://charter.henkaku.center)):
- The Charter lives in its own repository. Compass links to it but does not host it.
- To read the Charter markdown source, fetch `https://charter.henkaku.center/content/CHARTER.md`
- Changes to the Charter are made in the Charter repository, not here.

**Archetypes** (served from Registry at `/api/v1/compass/files/docs/ARCHETYPES.md`):
- Must remain aligned with Charter Section V requirements
- Entry types interoperate via cross-references
- Changes should preserve backward compatibility or provide migration paths
- Charter Mapping column helps verify alignment

**Web viewer** (`index.html` + 9 JS files):
- Single-page app with hash routing (`compass-app.js`). Routes: `#home`, `#charter`, `#archetypes`, `#curriculum`, `#people`, `#projects`, `#initiatives`, `#institutions`, `#courses`, `#events`, `#domains`, `#places`, `#publications`, `#vectors`, `#deltas`, `#curricula`, `#network`, `#references`, `#history`, `#about`, `#feedback`, `#contribute`, `#contact` (`#curriculum` redirects to `#curricula`)
- `#charter` fetches and renders Charter markdown from `charter.henkaku.center/content/CHARTER.md` inline (with a banner linking to the definitive source and showing the current version dynamically)
- Top nav bar shows minimal links (Feedback, Contribute, Login). Left sidebar: Contribute with AI at top, then DNA, Entities, and Info groups (with Theses and Posts as placeholders)
- Right-hand document TOC sidebar with scroll-spy for Charter, Archetypes, and About pages
- Client-side markdown rendering with marked.js (no build process); external links open in new tab via custom renderer
- `compass-data.js` provides the unified data layer: entity store, relation management, generic graph building, and relation rendering
- `compass-config.js` centralizes all route definitions, entity type metadata (`registryMeta`), network colors, and edit form templates
- `compass-entity.js` handles entity cards, list pages, detail views (with per-type rendering), and the edit modal with relation editor
- `#references` page renders download/preview links pointing to Registry (`/api/v1/compass/files/reference/`)
- `#history` page fetches commit history from the GitHub API at runtime (no backing `.md` file, unlike other routes) — the only remaining GitHub API dependency
- `#feedback` page lets logged-in users submit bug reports and feature requests with file/image attachments (10 MB max per file) via the Registry API (`/api/v1/feedback`)
- `#contribute` page explains how to use AI assistants (Claude Code, ChatGPT, Cursor, etc.) to interact with Compass via the API. ONBOARDING.md download requires login (auth-protected on the Registry). Page content is always visible; only the download button is gated
- `#contact` page shows contact email (compass@henkaku.center), organization links, and source code repos
- Landing page organized into labeled groups: DNA, Entities, and Other Information, with a Contribute with AI CTA banner and animated card entrances
- Compass icon has a magnetic-settle animation tied to the orientation rotator; nav icon aligns with left sidebar content
- Login via Registry auth (email/password → JWT tokens via `ApiClient`) enables inline editing of registry entries and feedback submission. User accounts are linked to compass person entities via `compass_entity_id`
- Cache-busting with timestamp query parameters
- 3D network graph visualization uses 3d-force-graph (CDN) with Three.js and d3-force-3d
- Entity category pages include a search/filter bar for keyword filtering
- Person names are randomized (Fisher-Yates shuffle) in relation groups and the people list; non-person entities are alphabetized. An inline note "(names presented in random order)" links to [Rae & Rouse 2017](https://doi.org/10.1257/aer.20161492)
- Teaching relations (`taught_by`, `supported_by`, `has_guest_lecturer`) are listed first in course detail views
- `getRelated()` deduplicates relations to prevent duplicate entries from rendering
- Card/List view toggle on entity list pages (view preference persisted in `localStorage`)
- Sidebar and landing page show entity counts per type; empty types are grayed out but still clickable
- Mermaid.js integration for rendering Gantt charts in markdown content (used in curricula detail views)
- Summary, purpose, and notes fields render markdown links via `marked.parseInline()`
- Entity domains use `has_affinity_for` relations to domain entities (string-based `domains` arrays have been removed from all templates)

**Registry data** (served from Registry API):
- Entities and relations accessed via `/api/v1/compass/entities` and `/api/v1/compass/relations`
- Field names match Archetypes schemas; IDs follow patterns like `person_joiito`, `proj_compass`, `course_dna`, `event_2025_symposium`, `domain_complex_systems`, `place_henkaku_center`
- Contains real data: 210 entities across 14 types (66 people, 66 domains, 28 courses, 11 initiatives, 10 deltas, 9 institutions, 6 projects, 5 places, 4 vectors, 3 events, 2 curricula) and 717 relations
- Portraits served via `/api/v1/compass/entities/{id}/files/{filename}`
- Use `backup-registry.sh` (in `../registry/scripts/`) to download a full backup including compass data

### Version Control

- Use conventional commit prefixes: `feat:`, `fix:`, `refactor:`, `docs:`
- Commits must be authored by the human decision-maker
- Do NOT include "Claude" or AI assistant references in commit messages or co-authorship
- Write commit messages explaining the "why" not just the "what"
- Never include "Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>" in commits

### Common Tasks

**Renaming files**: Use `git mv`, then grep all `.md` files and `index.html` for old name — references hide everywhere.

**Renumbering Charter sections**: Cross-references are numerous across all files. Use grep to catch all section number refs.

**Harmonizing Charter and Archetypes**: Charter provides principles and requirements; Archetypes implements them as structural templates. Neither trumps the other — resolve incoherence by adjusting both.

**Updating STATUS.md**: Written for non-technical stakeholders. Plain language, no jargon. Focus on what things do, not how they work technically.

### Key Design Principles

1. **Transparency** — Version control makes all changes visible and traceable
2. **Human Authority** — AI assists but never assumes authority or moral agency
3. **Designed Coordination** — Coordination is a first-order object of inquiry, not assumed
4. **Cultural Context** — Japanese cultural context integrated into practice, not abstracted away
5. **Productive Coupling** — Coordination across institutional boundaries, not dissolution of boundaries
6. **Measurability with Forgiveness** — Qualitative assessment is legitimate; unmeasurable does not mean unevaluable
7. **Bounded Transformation** — Projects are finite with clear completion criteria, distinct from initiatives (ongoing)
