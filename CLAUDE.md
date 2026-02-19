# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Repository Overview

**Compass** makes shared values and ongoing work visible and easy to contribute to — coordination infrastructure for the Henkaku Center, Graduate School of Design & Science (SDS), and Chiba Institute of Technology.

Unlike traditional static institutional documents, Compass is designed to evolve through transparent, peer-reviewed contributions with version control as the system of record.

## Document Architecture: DNA / Emergent

Compass documents are organized into two layers, inspired by a biological analogy: foundational documents are the "DNA" (structural code), while instantiated content is "emergent" (expressed from those templates).

**DNA** — Foundational documents that define principles, governance, and structural templates:
- **Charter** — Values, governance, and operational commitments (9 sections). Lives in its own repository at [charter.henkaku.center](https://charter.henkaku.center) (source: `https://charter.henkaku.center/content/CHARTER.md`)
- **Archetypes** — Structural templates for ten registry entry types (served from Registry at `/api/v1/compass/files/docs/ARCHETYPES.md`)

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
├── api-client.js       (Registry API client with JWT auth)
├── compass-data.js     (data layer: entity store, relations, graph)
├── compass-icon.png
├── network.png
├── index.html          (single-page app shell)
├── scripts/
│   └── migrate.js      (entity + relations migration tool)
├── README.md
├── STATUS.md
├── CLAUDE.md
└── CNAME
```

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

Ten entry types:
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

**Essential questions** guide each entry type (4 prompts each — see ARCHETYPES.md served from Registry).

**Unified entity + relations architecture**: Entities contain only intrinsic attributes. All cross-references (affiliations, contributors, instructors, prerequisites, etc.) are stored as `{source, target, type, meta?}` relation triples in the Registry database. `compass-data.js` provides the runtime data layer that loads entities and relations from the API, manages CRUD, and builds the network graph.

**Privacy**: The registry is a coordination tool, not a public directory. Person records should be professionally relevant, participant-controlled, and appropriately scoped.

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

**Web viewer** (`index.html` + `compass-data.js`):
- Single-page app with hash routing. Routes: `#home`, `#charter`, `#archetypes`, `#curriculum`, `#people`, `#projects`, `#initiatives`, `#institutions`, `#courses`, `#events`, `#domains`, `#places`, `#network`, `#references`, `#history`, `#status`, `#about`, `#feedback`
- `#charter` fetches and renders Charter markdown from `charter.henkaku.center/content/CHARTER.md` inline (with a banner linking to the definitive source and showing the current version dynamically)
- Top nav bar shows minimal links (Feedback, GitHub, Login). Full site navigation is in a left sidebar organized into DNA, Emergent, and Info groups (with Theses and Posts as placeholders)
- Right-hand document TOC sidebar with scroll-spy for Charter, Archetypes, About, and Status pages
- Client-side markdown rendering with marked.js (no build process); external links open in new tab via custom renderer
- `compass-data.js` provides the unified data layer: entity store, relation management, generic graph building, and relation rendering
- Curriculum tables use page-scoped CSS (`table-layout: fixed`, 55%/10%/35% column widths for Course/Credits/Instructor); other pages use auto layout
- `#references` page renders download/preview links pointing to Registry (`/api/v1/compass/files/reference/`)
- `#history` page fetches commit history from the GitHub API at runtime (no backing `.md` file, unlike other routes) — the only remaining GitHub API dependency
- `#feedback` page lets logged-in users submit bug reports and feature requests with file/image attachments (10 MB max per file) via the Registry API (`/api/v1/feedback`)
- Landing page organized into three labeled groups: DNA, Emergent, and Info, with animated card entrances
- Compass icon has a magnetic-settle animation tied to the orientation rotator; nav icon aligns with left sidebar content
- Login via Registry auth (email/password → JWT tokens via `ApiClient`) enables inline editing of registry entries and feedback submission. User accounts are linked to compass person entities via `compass_entity_id`
- Cache-busting with timestamp query parameters
- 3D network graph visualization uses 3d-force-graph (CDN) with Three.js and d3-force-3d

**Registry data** (served from Registry API):
- Entities and relations accessed via `/api/v1/compass/entities` and `/api/v1/compass/relations`
- Field names match Archetypes schemas; IDs follow patterns like `person_joiito`, `proj_compass`, `course_dna`, `event_2025_symposium`, `domain_complex_systems`, `place_henkaku_center`
- Contains real data: 62 people (with portraits), 10 initiatives, 9 institutions, 3 projects, 27 courses, 1 event, 50 domains, 4 places, 460 relations
- Portraits served via `/api/v1/compass/entities/{id}/files/{filename}`
- Use `export-compass.sh` (in `charter/registry/scripts/`) to download a local copy

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
