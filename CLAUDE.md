# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository contains the **Antidisciplinary Charter**, a version-controlled living document that articulates foundational values, governance principles, and operational practices for the Henkaku Center, Graduate School of Design & Science (SDS), and Chiba Institute of Technology.

Unlike traditional static charters (PDFs or archived documents), this Charter is designed to evolve through transparent, peer-reviewed contributions with version control as the system of record.

## Core Concepts

### Living Document Architecture

The Charter exists in multiple forms:
- `docs/CHARTER.md` - The primary template structure with HTML comments indicating what content should go in each section
- `src/20260123_charter.md` - A historical version containing SDS founding precepts (v0.2.0 from December 2025)
- `README.md` - Public-facing documentation explaining purpose, governance model, and institutional context
- `index.html` - Static web viewer that uses marked.js to render markdown documents

**Key principle**: The Charter is a living document maintained under version control. Changes are tracked through Git history to make institutional evolution visible and auditable.

### Institutional Context

Three closely coupled entities:
1. **Chiba Institute of Technology (Chiba Tech)** - Host institution providing legal standing and infrastructure (founded 1942 as Kōa Institute of Technology)
2. **Graduate School of Design & Science (SDS)** - Academic arm launching April 2026, focused on antidisciplinary project-based learning
3. **Henkaku Center for Radical Transformation** - Research center providing shared infrastructure and experimental programs

These are organized under the **Henkaku Compass Initiative**, which explores radical coordination technology and new governance models.

### Antidisciplinary vs. Interdisciplinary

The Charter emphasizes "antidisciplinary" work - coordination at the paradigm level rather than disciplinary integration. This means working across disciplines by focusing on shared purpose and systems rather than domain-specific authority.

### Agentic Workflows

AI agents are treated as **integrated components of contribution infrastructure** for drafting, analysis, and review. However:
- Authority, accountability, and final decision-making remain explicitly human
- AI systems do not possess moral, legal, or institutional agency
- Human agency may be amplified but never transferred or abdicated
- Ambiguity of responsibility in human-machine systems is a design failure

## Document Structure

The Charter (`docs/CHARTER.md`) is organized as a template with 8 major sections:

1. **Founding Principles** - The 12 defining coordinates (resilience over strength, systems over objects, etc.) that position the institution in conceptual space—one specific point among 4,096 possible permutations (2^12). These represent directional choices along contested axes rather than absolute rules.
2. **Foundational Orientation** - Antidisciplinarity, radical transformation, and human/AI interaction principles
3. **Values and Commitments** - Intellectual integrity, experimentation, cultural respect, openness, human primacy, coordination design
4. **Research and Educational Practice** - Project-centered inquiry, learning through making, use of computational systems
5. **Institutional Relationships** - Governance between Chiba Tech, Henkaku Center, SDS, and external partners
6. **Governance and Stewardship** - Charter evolution, decision-making, conflict resolution
7. **Evolution and Adaptation** - Versioning, portability, reuse conditions
8. **Closing Provisions** - Authority, interpretation, ratification

Each subsection contains HTML comments (`<!-- -->`) describing what content should be developed there. These comments serve as specification and guidance for future content.

## Working with This Repository

### Editing Philosophy

When working with the Charter:
- Treat HTML comments as specification documents - they define intent and scope for each section
- Preserve the template structure unless explicitly changing the Charter's architecture
- Maintain clear distinction between:
  - Template structure (section headings, organizational framework)
  - Content specification (HTML comments)
  - Actual content (filled-in text)

### Version Control Practices

- All changes should be tracked through Git with clear commit messages
- Version history serves as institutional memory - it documents how principles evolved
- The Charter is designed to make "institutional drift" visible through version control
- Before pushing to remote, make sure that any changes to remote have already been pulled, merged and reconciled.

**Git Authorship**:
- Commits should be authored by the human decision-maker, not attributed to AI assistance
- Do not include "Claude" or AI assistant references in commit messages or co-authorship
- Human accountability requires clear human authorship in version control history
- This aligns with the Charter's principle that authority and accountability remain with humans, even when AI assists with drafting or analysis

### Web Rendering

The `index.html` file provides a static web viewer:
- Uses marked.js (via CDN) for client-side markdown rendering
- Navigation switches between README.md and docs/CHARTER.md
- No build process required - open index.html directly in a browser

### Historical Context

`src/20260123_charter.md` contains earlier founding precepts from the School of Design & Science. Key principles from that document:
- Resilience over strength
- Systems over objects
- Practice over theory
- Emergence over authority
- Risk over safety

These principles inform but are distinct from the current Antidisciplinary Charter structure.

## Key Design Principles

1. **Transparency**: Version control makes changes visible and traceable
2. **Human Authority**: All decisions and accountability remain with humans, even when AI assists
3. **Designed Coordination**: Institutions, processes, and incentives must be explicitly designed rather than assumed
4. **Cultural Context**: Japanese cultural context serves as both constraint and resource, not something to be abstracted away
5. **Productive Coupling**: Institutional boundaries are preserved while enabling collaboration across them
