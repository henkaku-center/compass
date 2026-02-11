# Compass Progress Update

**Last Updated: February 11, 2026**

## Current Status

**The Charter draft is complete and ready for review by the Director and founding faculty.**

## What We've Built

### Charter

The Charter articulates the values, principles, and governance commitments shared across Henkaku Center, SDS, and Chiba Tech. It now lives in its own repository at [charter.henkaku.center](https://charter.henkaku.center). It is organized into 9 sections:

- **Preamble** — Scope and applicability
- **I. Foundational Orientations** — 12 directional principles (resilience over strength, systems over objects, etc.)
- **II. Values and Commitments** — Antidisciplinarity, human-AI collaboration, intellectual integrity, cultural identity, and more
- **III. Research Practice** — Project-centered inquiry
- **IV. Educational Practice** — Project-centered learning, learning through making, AI pedagogy
- **V. Registry and Coordination Infrastructure** — Shared platform for tracking people, projects, initiatives, courses, theses, events, and institutions
- **VI. Institutional Relationships** — Roles, Chiba Tech, Henkaku/SDS, external partners
- **VII. Governance** — Charter stewardship, decision-making, conflict resolution
- **VIII. Evolution** — Living document nature, portability
- **IX. Closing Provisions** — Authority, interpretation, ratification

All sections contain full text — no placeholders remain.

### Archetypes

The Archetypes document defines structural templates for seven types of registry entries:

- **People** — Roles, expertise, affiliations, and project involvement
- **Projects** — Bounded endeavors with completion criteria
- **Initiatives** — Ongoing programs evaluated on continuing justification
- **Courses** — Educational units with learning objectives and Charter alignment
- **Theses** — Student research with advisors, committees, and defense milestones
- **Events** — Gatherings that connect people and advance work
- **Institutions** — Organizations with mandates, capabilities, and ecosystem relationships

These templates cross-reference each other, so a person links to their projects, a thesis links to its advisor, and a course links to the Charter principles it embodies.

### Curriculum

Documented SDS Master's (30 credits) and PhD (17 credits) programs, mapped to Charter principles.

### Website

Built a viewer at [compass.henkaku.center](https://compass.henkaku.center) with navigation, table of contents, collapsible sections, a references page, a history page, and a landing page organized into two layers:

- **DNA** — Foundational documents ([Charter](https://charter.henkaku.center), Archetypes)
- **Emergent** — Living content that grows from the DNA (Curriculum, People, Projects, Initiatives, Institutions, Network visualization, with placeholders for Courses, Theses, and Events)

The landing page features an animated compass icon and a rotator that cycles through the 12 Foundational Orientations. A dedicated History page shows the project's commit history pulled live from GitHub in a three-column table: contributor, type, and memo.

### Registry and Network Visualization

Populated four registry types with real data: 3 institutions, 62 people (with portrait photos), 2 projects, and 2 initiatives. Each entry follows the structural templates defined in the Archetypes document, with cross-references between entries (for example, people link to their projects, projects link to their parent initiatives, and institutions link to the people and programs they host).

The website has browsable list pages for each of these four types, with expandable tiles that show full details on click. A **Network** page shows an interactive 3D relational map of all entries — a force-directed graph with color-coded nodes for each type and lines representing their connections. You can click on any node to see details, filter by type, and pan/zoom to explore.

Three registry types (Courses, Theses, Events) remain as placeholders for future population.

### Login and Editing

Logged-in users can edit registry entries directly on the website. The login uses a GitHub personal access token, and edits are committed straight to the repository through the GitHub API. Each registry card shows an edit button when logged in, opening a structured form with dropdowns for fields like status and role categories. Users can also create new entries from the registry list pages.

### Feedback

A dedicated Feedback page lets logged-in users submit bug reports and feature requests. Submissions are stored in the repository and visible to everyone. Logged-in users can also update the status of existing feedback entries. This provides a lightweight way to collect input without requiring contributors to use GitHub directly.

### Agentic Development

Compass is developed using LLM coding agents — AI tools that draft, edit, and coordinate document changes under human direction. This is a deliberate practice that informs how contribution workflows are designed.

The agentic approach spans three dimensions: development with agents, agent-assisted contribution by participants, and planned agentic interfaces (such as chat bots) that will let contributors propose changes without needing direct repository access.

## What Still Needs Work

1. **Charter Review and Ratification** — The draft needs review by the Director and founding faculty before ratification

2. **Amendment System** — A process for proposing and reviewing changes after ratification

3. **Remaining Registry Types** — Courses, Theses, and Events entry types are defined in the Archetypes but not yet populated with data

4. **Agentic Contribution Interfaces** — Tools (such as chat bots or Slack integrations) that let contributors propose changes without needing direct access to the repository

## Questions to Discuss

1. **Review process** — How should ratifying members review and comment on the draft?

2. **Amendment workflow** — How should people propose changes after ratification?

3. **Timeline** — When do we aim to ratify?

4. **Agentic contribution pathways** — What interfaces (Slack bots, web forms, coding agents) should contributors use to propose changes?

---

## Reference: Original Planning (January 2026)

From our January meeting:
- Finalize consensus mechanism
- Finalize charter content (second draft)
- Finalize design specifications for the platform
- Identify supporting tools

Note: "finalize" meant having a first pass ready. The platform is designed for ongoing revision.
