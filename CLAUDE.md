# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Repository Overview

**Compass** makes shared values and ongoing work visible and easy to contribute to — coordination infrastructure for the Henkaku Center, Graduate School of Design & Science (SDS), and Chiba Institute of Technology.

Unlike traditional static institutional documents, Compass is designed to evolve through transparent, peer-reviewed contributions with version control as the system of record.

## Document Architecture: DNA / Emergent

Compass documents are organized into two layers, inspired by a biological analogy: foundational documents are the "DNA" (structural code), while instantiated content is "emergent" (expressed from those templates).

**DNA** — Foundational documents that define principles, governance, and structural templates:
- `docs/CHARTER.md` — Values, governance, and operational commitments (9 sections)
- `docs/ARCHETYPES.md` — Structural templates for seven registry entry types

**Emergent** — Living content instantiated from the foundational templates:
- `docs/CURRICULUM.md` — SDS Master's and PhD curriculum
- *(future)* Populated registry entries: actual people, projects, initiatives, courses, theses, events, and institutions

**Supporting:**
- `README.md` — Purpose, structure, institutional context
- `STATUS.md` — Progress updates for non-technical stakeholders
- `index.html` — Static web viewer with hash routing and marked.js rendering
- `reference/` — Historical versions and source documents
- `CLAUDE.md` — This file
- `CNAME` — GitHub Pages custom domain (`compass.henkaku.center`)

## Repository Structure

```
compass/
├── docs/
│   ├── CHARTER.md
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
│   └── 20171231_Neri Oxman Krebs Cycle of Creativity.jpeg
├── compass-icon.png
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

The Charter (`docs/CHARTER.md`) has 9 sections:

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

Seven entry types:
- **Institutions** — Organizations in the ecosystem with mandates, capabilities, and relationships
- **People** — Roles, expertise, affiliations, project involvement. `role_categories` supports multiple roles.
- **Projects** — Bounded units of transformation with completion criteria
- **Initiatives** — Ongoing programs evaluated on continuing justification
- **Courses** — Recurring educational units with learning objectives and Charter alignment
- **Theses** — Bounded academic works with advisors, committees, and defense milestones
- **Events** — Time-bound gatherings that connect people and advance work

**Essential questions** guide each entry type (4 prompts each — see `docs/ARCHETYPES.md`).

**Interoperating schemas**: Entry types cross-reference each other — people link to projects, projects reference contributors, initiatives track spawned projects, courses link to instructors, theses link to advisors, events link to organizers, institutions link to people and projects they host.

**Privacy**: The registry is a coordination tool, not a public directory. Person records should be professionally relevant, participant-controlled, and appropriately scoped.

## Working with This Repository

### Editing Philosophy

**Charter** (`docs/CHARTER.md`):
- Always read before editing
- Maintain consistency with existing tone, structure, and principles
- Changes after ratification should go through the amendment process

**Archetypes** (`docs/ARCHETYPES.md`):
- Must remain aligned with Charter Section V requirements
- Entry types interoperate via cross-references
- Changes should preserve backward compatibility or provide migration paths
- Charter Mapping column helps verify alignment

**Web viewer** (`index.html`):
- Single-page app with hash routing (`#home`, `#charter`, `#archetypes`, `#curriculum`, `#references`, `#history`, `#status`, `#about`)
- Client-side markdown rendering with marked.js (no build process)
- `#history` page fetches commit history from the GitHub API at runtime (no backing `.md` file, unlike other routes)
- Landing page organized into DNA / Emergent / unlabeled meta groups with animated card entrances
- Compass icon has a magnetic-settle animation tied to the orientation rotator
- Cache-busting with timestamp query parameters

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
