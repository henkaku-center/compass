# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Repository Overview

This repository contains **Compass**—coordination infrastructure that makes institutional work visible and easy to contribute to. It includes the Charter (a version-controlled living document), Registry, Curriculum documentation, and supporting tools for the Henkaku Center, Graduate School of Design & Science (SDS), and Chiba Institute of Technology.

Unlike traditional static institutional documents (PDFs or archived documents), Compass is designed to evolve through transparent, peer-reviewed contributions with version control as the system of record. Visibility and ease of contribution are core design goals: participants should be able to see what is happening across the ecosystem and propose changes through accessible pathways.

## Repository Structure

```
compass/
├── docs/                      # Primary documents
│   ├── CHARTER.md             # Main Charter document
│   ├── REGISTRY.md            # Registry for people, projects, initiatives, courses, theses, events
│   └── CURRICULUM.md          # SDS Master's and PhD curriculum
├── reference/                 # Historical versions and reference materials
│   ├── 20260203_Teaching AI and Teaching with AI.pdf
│   ├── 20260120_Charter_v0.pdf
│   ├── 20251114_SDS_Open House_Brochure_fin.pdf
│   ├── 20250710_Research_Project_Schema.pdf
│   ├── 20240613_SDS_DNA_CheatSheet.png
│   └── 20220329_Research_Report-compressed.pdf
├── README.md                  # Public-facing overview and context
├── STATUS.md                  # Progress updates
├── CLAUDE.md                  # This file - AI assistant guidance
├── index.html                 # Static web viewer for browsing documents
└── CNAME                      # Custom domain configuration
```

## Core Concepts

### Living Document Architecture

Compass comprises multiple documents and tools:

**Primary Documents:**
- `docs/CHARTER.md` - The main Charter document articulating values, governance, and operational commitments
- `docs/REGISTRY.md` - Unified schema for people, projects, and initiatives registry
- `docs/CURRICULUM.md` - SDS Master's and PhD curriculum documentation

**Supporting Materials:**
- `README.md` - Public documentation explaining purpose, governance model, and institutional context
- `STATUS.md` - Progress updates on Compass development
- `index.html` - Static web viewer using marked.js (serves Home, Status, Charter, Curriculum, Registry, and References)
- `reference/` - Historical versions and source documents

**Key principle**: Compass documents are living documents. Version control tracks how institutional principles evolve, making "institutional drift" visible and auditable.

### Institutional Context

Three closely coupled entities organized under the Compass Initiative:

1. **Chiba Institute of Technology (Chiba Tech)** - Host institution providing legal standing and infrastructure (founded 1942 as Kōa Institute of Technology, Japan's oldest private technology institute)

2. **Graduate School of Design & Science (SDS)** - Academic arm launching April 2026, focused on antidisciplinary project-based learning

3. **Henkaku Center for Radical Transformation** - Research center providing shared infrastructure, experimental programs, and connective tissue across education, research, and policy

The **Compass Initiative** explores radical coordination technology—tools, frameworks, and practices that help groups align, make decisions, and evolve together without rigid hierarchy.

### Antidisciplinary vs. Interdisciplinary

The Charter emphasizes "antidisciplinary" work—coordination at the paradigm level rather than disciplinary integration. This means working across disciplines by focusing on shared purpose and systems rather than domain-specific authority.

Interdisciplinary work combines existing disciplines (e.g., bioengineering). Antidisciplinary work transcends disciplinary boundaries to address problems at the paradigm level—the assumptions, frameworks, and structures that shape how disciplines themselves operate.

### Agentic Workflows and Human Authority

AI agents are treated as **integrated components of contribution infrastructure** across three dimensions:

**Development** — This repository is itself developed using LLM coding agents. Agents draft content, edit documents, and coordinate changes under human direction. This is a deliberate practice, not a workaround—the project serves as a proving ground for agent-assisted governance workflows.

**Contribution** — Contributors are expected to use coding agents when proposing amendments, reviews, and revisions. Agent-assisted pull requests and agent-drafted content are normal parts of the workflow, provided a human author reviews and approves the result.

**Interfaces** — Intermediate agentic entities (bots) will be developed to let contributors interact with Compass through channels like Slack or web interfaces, without requiring direct repository access. These bots translate contributor intent into structured proposals (e.g., pull requests) while preserving auditability.

In all three dimensions, the following guardrails apply:

- **Authority, accountability, and final decision-making remain explicitly human**
- AI systems do not possess moral, legal, or institutional agency
- Human agency may be amplified through AI but never transferred or abdicated
- Ambiguity of responsibility in human-machine systems is considered a design failure
- Commits must be authored by human decision-makers, not attributed to AI assistance

## Charter Structure

The Charter (`docs/CHARTER.md`) is organized with the following structure:

### Current Sections (as of February 2026)

**Preamble** - Scope, intent, and applicability

**I. Foundational Orientations** - The 12 defining coordinates (resilience over strength, systems over objects, etc.) that position the institution in conceptual space. These represent directional choices along contested axes, not absolute rules.

**II. Values and Commitments** - Ten subsections covering:
1. Antidisciplinarity
2. Radical Transformation
3. Human and Artificial Intelligence (symbiosis, accountability, collaboration design)
4. Complexity and Magic (resisting reduction, valuing the unmeasurable)
5. Intellectual Integrity (antidisciplinary-specific: humility, attribution, calibrated claims)
6. Experimentation and Risk
7. Neurodiversity and Inclusion
8. Cultural Identity and Global Orientation (Japanese traditions, global/local integration)
9. Openness with Discernment
10. Coordination as a Design Problem

**III. Research Practice** - Project-Centered Inquiry

**IV. Educational Practice** - Three subsections:
1. Project-Centered Learning
2. Learning Through Making and Doing
3. Use of Computational and Agentic Systems

**V. Registry and Coordination Infrastructure** - Shared platform for people, projects, initiatives, courses, theses, and events

**VI. Institutional Relationships** - Governance between Chiba Tech, Henkaku Center, SDS, and external partners

**VII. Governance and Stewardship** - Charter evolution, decision-making, conflict resolution

**VIII. Evolution and Adaptation** - Versioning, portability, reuse conditions

**IX. Closing Provisions** - Authority, interpretation, ratification

**Appendices** - Optional sections to be added over time

### Charter Content Status

As of February 2026, all Charter sections contain full text. HTML comment placeholders that previously served as specifications have been removed. The Charter draft is ready for review by ratifying members.

**When editing**: Maintain consistency with the Charter's existing tone, structure, and principles. New sections or significant changes should go through the amendment process once ratification is complete.

## Registry

### Section V: Registry and Coordination Infrastructure

This Charter provision mandates that organizations establish a **shared registry**—a common platform for defining, submitting, and browsing people, projects, initiatives, courses, theses, and events across the ecosystem.

The registry tracks six types of entries:
- **People**: Participants with their roles, expertise, affiliations, and involvement
- **Projects**: Bounded units of transformation (finite, mission-driven, with clear completion criteria)
- **Initiatives**: Ongoing programs (open-ended, without predetermined endpoints, evaluated on ongoing justification)
- **Courses**: Recurring educational units with syllabi, learning objectives, credit values, and Charter principle alignment
- **Theses**: Bounded academic works with advisors, committees, defense milestones, and contribution to knowledge
- **Events**: Time-bound gatherings (seminars, workshops, conferences) that connect people and advance projects or initiatives

Key requirements:
- Structured templates with required fields for each entry type
- **"Measurability with forgiveness"** - recognizes systemic/cultural impacts may resist quantification but must still be evaluable
- Platform support for identifying overlap, distinctiveness, incoherence, potential collaborators, and network structure
- Shared across all Charter-covered institutions—not fragmented into separate systems

### REGISTRY.md

`docs/REGISTRY.md` is a unified schema document implementing the Charter's registry requirements. It defines structured templates for registry entry types.

**Essential questions for each entry type**:

*People*:
1. Who is this person and what is their role?
2. What expertise and interests do they bring?
3. What are they currently working on?
4. How can others reach and collaborate with them?

*Projects*:
1. What specific situation or moment is this project addressing?
2. What will this project build, measure, or change?
3. How will you know when the project has succeeded?
4. What would make this project complete?

*Initiatives*:
1. What ongoing purpose does this initiative serve?
2. What activities and outputs does it enable or produce?
3. How will we know if it's still serving its purpose?
4. What projects has it spawned or does it contain?

*Courses*:
1. What capabilities does this course develop?
2. How does it connect to Charter principles?
3. Who teaches it and what projects does it support?
4. How is student learning assessed?

*Theses*:
1. What question does this thesis address?
2. Who advises it and what is the expected contribution?
3. How does it relate to ongoing projects or initiatives?
4. What are the milestones and defense requirements?

*Events*:
1. What is the purpose of this gathering?
2. Who is organizing it and who should attend?
3. What initiative, project, or course does it serve?
4. What outcomes or follow-up actions are expected?

**Interoperating schemas**: Entry types reference each other—people link to their projects/initiatives/courses, projects reference their team members and parent initiatives, initiatives track spawned projects and participants, courses link to instructors and Charter principles, theses link to advisors and related projects, events link to organizers and related initiatives/projects.

**Privacy considerations**: The registry is a coordination tool, not a public directory. Person records should be professionally relevant, participant-controlled, and appropriately scoped.

## Working with This Repository

### Editing Philosophy

**Charter documents** (`docs/CHARTER.md`):
- The Charter is now complete with full text in all sections (no placeholder comments remain)
- Avoid making changes you haven't read - always read files before suggesting modifications
- Maintain consistency with Charter principles (bounded projects, measurability with forgiveness, human authority, symbiotic AI collaboration, etc.)
- Changes after ratification should go through the amendment process

**Registry** (`docs/REGISTRY.md`):
- Must remain aligned with Charter Section V requirements
- Contains schemas for people, projects, initiatives, courses, theses, and events in one document
- Entry types interoperate via cross-references (person IDs in projects, project IDs in initiatives, etc.)
- Changes should preserve backward compatibility or provide migration paths
- Charter Mapping column helps verify alignment
- Privacy considerations apply to person records

**Web viewer** (`index.html`):
- Renders markdown using marked.js (CDN)
- Extracts HTML comments and displays them with light styling
- Cache-busting ensures fresh content on every load
- Navigation links: README, Status, Charter, Curriculum, Registry

### Version Control Practices

**General principles:**
- All changes tracked through Git with clear, descriptive commit messages
- Version history serves as institutional memory documenting principle evolution
- Before pushing, ensure remote changes are pulled and reconciled
- Use conventional commit prefixes: `feat:`, `fix:`, `refactor:`, `docs:`

**Git authorship (CRITICAL):**
- Commits must be authored by the human decision-maker
- Do NOT include "Claude" or AI assistant references in commit messages or co-authorship
- Human accountability requires clear human authorship in version control
- This aligns with the Charter's principle: authority and accountability remain with humans

**When committing Charter changes:**
1. Read the file first to understand current state
2. Make targeted, purposeful edits
3. Write commit messages explaining the "why" not just the "what"
4. Ensure commit messages reflect institutional decision-making, not AI assistance

### File Organization

**docs/** - Active, authoritative Charter documents that define current principles and requirements

**reference/** - Historical versions, PDFs, and reference materials (not source code—renamed from `src/` to avoid confusion)

**Root level** - Infrastructure (README, CLAUDE.md, index.html) and configuration (CNAME)

### Web Rendering

The `index.html` file provides a static web viewer:
- Client-side markdown rendering with marked.js (no build process)
- HTML comments extracted and styled (light gray background, italic, with 📝 prefix)
- Cache-busting with timestamp query parameters prevents stale content
- Open `index.html` directly in a browser or run local server: `python3 -m http.server 8000`

Navigation provides access to five documents:
- README (default view)
- Status (STATUS.md)
- Charter (docs/CHARTER.md)
- Curriculum (docs/CURRICULUM.md)
- Registry (docs/REGISTRY.md)

### Historical Context

`reference/20260123_charter.md` contains earlier founding precepts from the School of Design & Science (v0.2.0, December 2025).

**Key principles from historical charter:**
- Resilience over strength
- Systems over objects
- Disobedience over compliance
- Pull over push
- Compasses over maps
- Emergence over authority
- Risk over safety
- Practice over theory
- Learning over education
- Sustainability over growth
- Public over individuals
- Modular over monolithic

These 12 principles now appear in the current Charter as **Section I: Foundational Orientations**.

The historical document also introduced:
- Three process principles (*Muda*, *Mura*, *Muri* from Toyota Production System)
- Four domains of creative exploration (Science, Engineering, Design, Art as entangled cycle)
- Antidisciplinary culture as method for paradigm-level intervention

These concepts inform but are distinct from the current Charter's structure.

## Key Design Principles

### 1. Transparency
Version control makes all changes visible and traceable. Institutional evolution is documented, not hidden.

### 2. Human Authority
All decisions and accountability remain with humans. AI assists but never assumes authority or moral agency.

### 3. Designed Coordination
Institutions, processes, and incentives must be explicitly designed. Coordination is a first-order object of inquiry, not assumed.

### 4. Cultural Context
Japanese cultural context serves as both constraint and resource. It's not abstracted away but integrated into practice.

### 5. Productive Coupling
Institutional boundaries are preserved while enabling collaboration. The aim is coordination across boundaries, not dissolution of boundaries.

### 6. Measurability with Forgiveness
Not all impacts can be quantified. Qualitative assessment, stakeholder feedback, and narrative evaluation are legitimate. Unmeasurable does not mean unevaluable.

### 7. Bounded Transformation
Projects are finite, mission-driven endeavors with clear completion criteria. They differ from open-ended research programs or permanent organizational functions.

## Common Tasks

### Reading Charter sections
Always read before editing. Use Read tool, not bash commands like `cat`.

### Updating Charter content
1. Read the relevant section
2. Identify HTML comment specifications
3. Make changes consistent with Charter principles
4. Preserve template structure unless explicitly changing architecture
5. Commit with clear message explaining institutional reasoning

### Adding new provisions
1. Determine appropriate section based on Charter structure
2. Draft content aligned with Charter tone and principles
3. Consider relationship to existing provisions (e.g., does REGISTRY.md need updating?)
4. Update documentation (README.md, this file) if structure changes

### Harmonizing documents
When Charter and REGISTRY.md need alignment:
- Charter provides high-level principles and requirements
- REGISTRY.md implements these as concrete templates for people, projects, and initiatives
- Neither document "trumps" the other—resolve incoherence by adjusting both
- Preserve information unless there's actual conflict

### Organizational changes
When moving/renaming files:
1. Use `git mv` to preserve history
2. Update all references in documentation (README.md, CLAUDE.md, index.html)
3. Commit with clear explanation of why the change improves organization

### Maintaining STATUS.md

**Purpose**: STATUS.md provides progress updates for non-technical stakeholders. Keep it current as work progresses.

**When to update**:
- After completing significant work (new sections, major features, structural changes)
- When project status changes materially
- When completing items from "What Still Needs Work"
- At least before major meetings or reviews

**How to update**:

1. **Update the date** at the top: "Last Updated: [Month Day, Year]"

2. **Move completed items**: When work is finished, move descriptions from "What Still Needs Work" to "What We've Accomplished"

3. **Add new accomplishments**: When new features or documents are added, describe them in accessible language under appropriate headings

4. **Update "What Still Needs Work"**: Adjust descriptions to reflect current state (e.g., "Data structure designed but not implemented" → "Implementation in progress")

5. **Keep questions current**: Update "Questions to Discuss" section to reflect actual open decisions

**Writing style**:
- Use plain language - avoid technical jargon (git, repos, CLI, etc.)
- Focus on what things do, not how they work technically
- Think: "What would a non-technical board member need to know?"
- Be specific but accessible (e.g., "Created a template for defining projects" not "Implemented PROJECT_SCHEMA.md")

**Structure to maintain**:
- What We've Accomplished (past tense, grouped by category)
- What Still Needs Work (present/future tense, clear gaps)
- Questions to Discuss (numbered, actionable questions)
- Reference section (can update if planning context changes)

**Example update flow**:
```
Before:
  What Still Needs Work:
  - Project registry platform not built

After completing work:
  What We've Accomplished:
  - Project Registry Platform
    - Built web interface for submitting projects
    - Added search and filtering capabilities

  What Still Needs Work:
  - (Remove this item or update to reflect remaining work)
```

**Commit STATUS.md updates** with clear messages like:
- "docs: update STATUS.md - completed project registry platform"
- "docs: update STATUS.md for February review meeting"

## Repository Evolution

This repository continues to evolve. Recent changes include:

- Renamed overall project from "Charter" to "Compass" (the Charter is now a component document within the Compass coordination infrastructure)
- Simplification of Charter document title (from "Antidisciplinary Charter" to "Charter")
- Consolidation of sections (former Sections II and III merged into Section II)
- Addition of Registry provision (Section V) with project/initiative/course/thesis/event distinction
- Creation of unified REGISTRY.md for people, projects, and initiatives
- Section II restructuring: 9 subsections covering values and commitments
- Addition of "Intellectual Integrity" section for antidisciplinary-specific obligations
- Addition of "Global Institution, Japanese Roots" content with key Japanese concepts
- Revision of "Human and AI" section to emphasize symbiosis and collaboration
- Organization of documents into `docs/` folder
- Renaming `src/` to `reference/` for clarity
- Web viewer enhancements (HTML comment rendering, cache-busting)
- Renamed "Henkaku Compass Initiative" to "Compass Initiative"
- Standardized terminology: "institutions" for Charter-covered entities
- Added source annotations to Charter linking to reference documents
- Expanded reference library with source materials (sorted chronologically)
- Site branding: favicon, clickable logo, footer links, SEO improvements

Future evolution should maintain backward compatibility where possible and document breaking changes clearly in commit messages.
