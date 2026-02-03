# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Repository Overview

This repository contains the **Charter** (formerly "Antidisciplinary Charter"), a version-controlled living document that articulates foundational values, governance principles, and operational practices for the Henkaku Center, Graduate School of Design & Science (SDS), and Chiba Institute of Technology.

Unlike traditional static charters (PDFs or archived documents), this Charter is designed to evolve through transparent, peer-reviewed contributions with version control as the system of record.

## Repository Structure

```
charter/
├── docs/                      # Primary Charter documents
│   ├── CHARTER.md             # Main Charter template with specifications
│   └── PROJECT_SCHEMA.md      # Structured project definition template
├── reference/                 # Historical versions and reference materials
│   ├── 20260123_charter.md    # SDS founding precepts (v0.2.0, Dec 2025)
│   ├── 20260120_Charter_v1.pdf
│   └── 251114_SDS_Open House_Brochure_fin.pdf
├── README.md                  # Public-facing overview and context
├── CLAUDE.md                  # This file - AI assistant guidance
├── index.html                 # Static web viewer for browsing documents
└── CNAME                      # Custom domain configuration
```

## Core Concepts

### Living Document Architecture

The Charter exists in multiple forms and representations:

**Primary Documents:**
- `docs/CHARTER.md` - The Charter template with HTML comments specifying what content belongs in each section
- `docs/PROJECT_SCHEMA.md` - Structured schema implementing Charter requirements for project definition

**Supporting Materials:**
- `README.md` - Public documentation explaining purpose, governance model, and institutional context
- `index.html` - Static web viewer using marked.js to render markdown (serves README, Charter, and Project Schema)
- `reference/20260123_charter.md` - Historical SDS founding precepts (v0.2.0 from December 2025)

**Key principle**: The Charter is a living document. Version control tracks how institutional principles evolve, making "institutional drift" visible and auditable.

### Institutional Context

Three closely coupled entities organized under the Henkaku Compass Initiative:

1. **Chiba Institute of Technology (Chiba Tech)** - Host institution providing legal standing and infrastructure (founded 1942 as Kōa Institute of Technology, Japan's oldest private technology institute)

2. **Graduate School of Design & Science (SDS)** - Academic arm launching April 2026, focused on antidisciplinary project-based learning

3. **Henkaku Center for Radical Transformation** - Research center providing shared infrastructure, experimental programs, and connective tissue across education, research, and policy

The **Henkaku Compass Initiative** explores radical coordination technology—tools, frameworks, and practices that help groups align, make decisions, and evolve together without rigid hierarchy.

### Antidisciplinary vs. Interdisciplinary

The Charter emphasizes "antidisciplinary" work—coordination at the paradigm level rather than disciplinary integration. This means working across disciplines by focusing on shared purpose and systems rather than domain-specific authority.

Interdisciplinary work combines existing disciplines (e.g., bioengineering). Antidisciplinary work transcends disciplinary boundaries to address problems at the paradigm level—the assumptions, frameworks, and structures that shape how disciplines themselves operate.

### Agentic Workflows and Human Authority

AI agents are treated as **integrated components of contribution infrastructure** for drafting, analysis, and review. However:

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

**II. Values and Commitments** - Nine subsections covering:
1. Antidisciplinarity
2. Radical Transformation
3. Human and Artificial Intelligence
4. Intellectual Integrity
5. Experimentation and Risk
6. Cultural and Contextual Respect
7. Openness with Discernment
8. Human Primacy and Responsibility
9. Coordination as a Design Problem

**III. Research and Educational Practice** - Four subsections:
1. Project-Centered Inquiry
2. Learning Through Making and Doing
3. Use of Computational and Agentic Systems
4. **Project Registry and Coordination Infrastructure** - Mandates shared platform for project definition

**IV. Institutional Relationships** - Governance between Chiba Tech, Henkaku Center, SDS, and external partners

**V. Governance and Stewardship** - Charter evolution, decision-making, conflict resolution

**VI. Evolution and Adaptation** - Versioning, portability, reuse conditions

**VII. Closing Provisions** - Authority, interpretation, ratification

**Appendices** - Optional sections to be added over time

### HTML Comments as Specifications

Most sections contain HTML comments (`<!-- -->`) that describe what content should be developed there. These comments:
- Define the intent and scope of each section
- Serve as specifications for future content development
- Are rendered lightly on the website (light gray, italic, with notepad emoji prefix)

**When editing**: Treat HTML comments as specification documents that guide what belongs in each section.

## Project Schema and Registry

### Section III.4: Project Registry and Coordination Infrastructure

This Charter provision mandates that organizations establish a **project registry**—a shared platform for defining, submitting, and browsing active projects.

Key requirements:
- Projects as **bounded units of transformation** (finite, mission-driven, with clear completion criteria)
- Structured template with required fields: Intent, Scope, Temporal Bounds, Measurability & Completion, Participants, Dependencies, Status, Resources
- **"Measurability with forgiveness"** - recognizes systemic/cultural impacts may resist quantification but must still be evaluable
- Platform support for identifying overlap, distinctiveness, and incoherence between projects

### PROJECT_SCHEMA.md

`docs/PROJECT_SCHEMA.md` implements the Charter's project registry requirements as a structured template.

**Core framework**: Four essential prompts that ground every project:
1. What specific situation or moment is this project addressing?
2. What will this project build, measure, or change?
3. How will you know when the project has succeeded?
4. What would make this project complete?

**Schema structure**: Detailed fields for basic information, intent/problem context, scope/outputs, measurability/completion, timeline, status, team, dependencies, funding, disciplines, and notes.

**Charter alignment**: Every schema field includes "Charter Mapping" showing how it implements specific Charter requirements.

The schema positions PROJECT_SCHEMA.md as a natural, well-supported implementation of Charter principles rather than an arbitrary technical specification.

## Working with This Repository

### Editing Philosophy

**Charter documents** (`docs/CHARTER.md`):
- HTML comments define intent and scope—preserve them unless changing the Charter's architecture
- Distinguish between: template structure (sections/headings), content specifications (HTML comments), and actual content (filled-in text)
- Avoid making changes you haven't read - always read files before suggesting modifications
- Maintain consistency with Charter principles (bounded projects, measurability with forgiveness, human authority, etc.)

**Project Schema** (`docs/PROJECT_SCHEMA.md`):
- Must remain aligned with Charter Section III.4 requirements
- Changes should preserve backward compatibility or provide migration paths
- Charter Mapping column helps verify alignment

**Web viewer** (`index.html`):
- Renders markdown using marked.js (CDN)
- Extracts HTML comments and displays them with light styling
- Cache-busting ensures fresh content on every load
- Navigation links: README, Charter, Project Schema

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

Navigation provides access to three documents:
- README (default view)
- Charter (docs/CHARTER.md)
- Project Schema (docs/PROJECT_SCHEMA.md)

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
3. Consider relationship to existing provisions (e.g., does PROJECT_SCHEMA.md need updating?)
4. Update documentation (README.md, this file) if structure changes

### Harmonizing documents
When Charter and PROJECT_SCHEMA.md need alignment:
- Charter provides high-level principles and requirements
- PROJECT_SCHEMA.md implements these as concrete templates
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

- Simplification of Charter title (from "Antidisciplinary Charter" to "Charter")
- Consolidation of sections (former Sections II and III merged into Section II)
- Addition of Project Registry provision (Section III.4)
- Creation of PROJECT_SCHEMA.md implementing registry requirements
- Organization of documents into `docs/` folder
- Renaming `src/` to `reference/` for clarity
- Web viewer enhancements (HTML comment rendering, cache-busting)

Future evolution should maintain backward compatibility where possible and document breaking changes clearly in commit messages.
