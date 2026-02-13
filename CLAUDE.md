# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Repository Overview

**Compass** makes shared values and ongoing work visible and easy to contribute to — coordination infrastructure for the Henkaku Center, Graduate School of Design & Science (SDS), and Chiba Institute of Technology.

Unlike traditional static institutional documents, Compass is designed to evolve through transparent, peer-reviewed contributions with version control as the system of record.

## Document Architecture: DNA / Emergent

Compass documents are organized into two layers, inspired by a biological analogy: foundational documents are the "DNA" (structural code), while instantiated content is "emergent" (expressed from those templates).

**DNA** — Foundational documents that define principles, governance, and structural templates:
- **Charter** — Values, governance, and operational commitments (9 sections). Lives in its own repository at [charter.henkaku.center](https://charter.henkaku.center) (source: `https://charter.henkaku.center/content/CHARTER.md`)
- `docs/ARCHETYPES.md` — Structural templates for eight registry entry types

**Emergent** — Living content instantiated from the foundational templates:
- `docs/CURRICULUM.md` — SDS Master's and PhD curriculum
- `data/` — Registry entries as JSON files (people, projects, initiatives, institutions, courses, events) plus `relations.json`
- *(future)* Theses and posts registry entries

**Supporting:**
- `README.md` — Purpose, structure, institutional context
- `STATUS.md` — Progress updates for non-technical stakeholders
- `index.html` — Static web viewer with hash routing and marked.js rendering
- `compass-data.js` — Unified data layer (entity store, relation management, graph building) loaded by `index.html`
- `reference/` — Historical versions and source documents
- `CLAUDE.md` — This file
- `CNAME` — GitHub Pages custom domain (`compass.henkaku.center`)

## Repository Structure

```
compass/
├── data/
│   ├── courses.json       (25 courses)
│   ├── events.json        (1 event)
│   ├── initiatives.json   (10 initiatives)
│   ├── institutions.json  (8 institutions)
│   ├── people.json        (62 people)
│   ├── portraits/         (profile photos for people entries)
│   ├── projects.json      (3 projects)
│   └── relations.json     (231 relations between entities)
├── docs/
│   ├── ARCHETYPES.md
│   └── CURRICULUM.md
├── reference/
│   ├── 20260203_Teaching AI and Teaching with AI.pdf
│   ├── 20251114_SDS_Open House_Brochure_fin.pdf
│   ├── 20251009_Ira_PBL_Example.pdf
│   ├── 20250710_Research_Project_Schema.pdf
│   ├── 20240705_Curriculum_Whiteboard.pdf
│   ├── 20240613_SDS_DNA_CheatSheet.png
│   ├── 20240612_GSDS Retreat.pdf
│   ├── 20220329_Research_Report-compressed.pdf
│   ├── 20171231_Neri Oxman Krebs Cycle of Creativity.jpeg
│   └── (additional images and subdirectories)
├── scripts/
│   └── migrate.js         (entity + relations migration tool)
├── compass-data.js
├── compass-icon.png
├── network.png
├── README.md
├── STATUS.md
├── CLAUDE.md
├── index.html
└── CNAME
```

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

Eight entry types:
- **Institutions** — Organizations in the ecosystem with mandates, capabilities, and relationships
- **People** — Roles, expertise, affiliations, project involvement. `role_categories` supports multiple roles.
- **Projects** — Bounded units of transformation with completion criteria
- **Initiatives** — Ongoing programs evaluated on continuing justification
- **Courses** — Recurring educational units with learning objectives and Charter alignment
- **Theses** — Bounded academic works with advisors, committees, and defense milestones
- **Events** — Time-bound gatherings that connect people and advance work
- **Posts** — Written contributions (reflections, updates, announcements, commentary) from participants

**Essential questions** guide each entry type (4 prompts each — see `docs/ARCHETYPES.md`).

**Unified entity + relations architecture**: Entity JSON files contain only intrinsic attributes. All cross-references (affiliations, contributors, instructors, prerequisites, etc.) are stored in `data/relations.json` as `{source, target, type, meta?}` triples. `compass-data.js` provides the runtime data layer that loads entities and relations, manages CRUD, and builds the network graph. `scripts/migrate.js` can re-extract relations from legacy embedded fields.

**Privacy**: The registry is a coordination tool, not a public directory. Person records should be professionally relevant, participant-controlled, and appropriately scoped.

## Working with This Repository

### Editing Philosophy

**Charter** (external — [charter.henkaku.center](https://charter.henkaku.center)):
- The Charter lives in its own repository. Compass links to it but does not host it.
- To read the Charter markdown source, fetch `https://charter.henkaku.center/content/CHARTER.md`
- Changes to the Charter are made in the Charter repository, not here.

**Archetypes** (`docs/ARCHETYPES.md`):
- Must remain aligned with Charter Section V requirements
- Entry types interoperate via cross-references
- Changes should preserve backward compatibility or provide migration paths
- Charter Mapping column helps verify alignment

**Web viewer** (`index.html` + `compass-data.js`):
- Single-page app with hash routing. Routes: `#home`, `#archetypes`, `#curriculum`, `#people`, `#projects`, `#initiatives`, `#institutions`, `#courses`, `#events`, `#network`, `#references`, `#history`, `#status`, `#about`, `#feedback`. Charter links navigate to external site `charter.henkaku.center`.
- Top nav bar shows minimal links (Feedback, GitHub, Login). Full site navigation is in a sidebar organized into DNA, Emergent, and Info groups (with Theses and Posts as placeholders)
- Client-side markdown rendering with marked.js (no build process)
- `compass-data.js` provides the unified data layer: entity store, relation management, generic graph building, and relation rendering
- `#history` page fetches commit history from the GitHub API at runtime (no backing `.md` file, unlike other routes)
- `#feedback` page lets logged-in users submit bug reports and feature requests via GitHub API
- Landing page organized into three labeled groups: DNA, Emergent, and Info, with animated card entrances
- Compass icon has a magnetic-settle animation tied to the orientation rotator
- Login via GitHub personal access token (stored in sessionStorage) enables inline editing of registry entries and feedback submission
- Cache-busting with timestamp query parameters
- 3D network graph visualization uses 3d-force-graph (CDN) with Three.js and d3-force-3d

**Registry data** (`data/` directory):
- One JSON file per entity type, each containing an array of objects with intrinsic attributes only
- `data/relations.json` stores all cross-references as `{source, target, type, meta?}` triples
- Field names match `docs/ARCHETYPES.md` schemas; IDs follow patterns like `person_winder_ira`, `proj_compass`, `course_dna`, `event_2025_symposium`
- Contains real data: 62 people (with portraits), 10 initiatives, 8 institutions, 3 projects, 25 courses, 1 event, 231 relations
- `data/portraits/` contains profile photos referenced by people entries

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
