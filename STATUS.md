# Compass Progress Update

**Last Updated: March 25, 2026**

## Current Status

**The initial Charter draft is complete. The Charter amendment and voting platform is live at [charter.henkaku.center](https://charter.henkaku.center). The Compass website and registry are live with 210 entities across 14 of 16 entity types and 717 relations.**

---

## What's In Place

### Charter

The Charter articulates shared values, principles, and governance commitments across Henkaku Center, SDS, and Chiba Tech. It lives at [charter.henkaku.center](https://charter.henkaku.center) in 9 sections covering foundational orientations, values, research and educational practice, registry infrastructure, institutional relationships, governance, and evolution. The initial draft is complete — no placeholders remain. The mechanism for future amendments via faculty submissions and voting is being developed at the same site.

### Archetypes

Structural templates for sixteen registry entry types: People, Projects, Initiatives, Institutions, Courses, Curricula, Events, Theses, Posts, Places, Domains, Publications, Vectors, and Deltas. These templates define what information each type carries and how entries cross-reference each other. Templates are served from the Registry API at `GET /compass/entity-types` — the single source of truth for entity schemas.

### Registry

Fourteen of sixteen entity types are populated with real data (210 entities, 717 relations):

| Type | Count | Description |
|------|-------|-------------|
| People | 66 | With portrait photos, affiliations, domain links, and project links |
| Domains | 66 | Knowledge and research areas mapping the intellectual landscape |
| Courses | 28 | All Master's and PhD courses including Henkaku electives |
| Initiatives | 11 | Ongoing programs like AI in Education, Connected Learning & Neurodiversity, Probabilistic Computing |
| Deltas | 10 | Observable changes — concrete evidence of ecosystem movement |
| Institutions | 9 | Chiba Tech, Henkaku Center, SDS, plus partners (JPCCA, ALife Institute, AISI) |
| Projects | 6 | Compass, Charter, SDS Launch, Student Portal, Degree Milestones |
| Places | 5 | Physical locations including Henkaku Center, Tsudanuma Campus |
| Vectors | 4 | Directional transformations worth pursuing |
| Events | 3 | Including Connected Learning in Focus: Celebrating Neurodiversity (2023) |
| Curricula | 2 | SDS Master's and PhD programs with milestones, requirements, and Gantt timelines |

Three types remain as placeholders: **Theses**, **Posts**, and **Publications**.

### Curricula

The SDS Master's (30 credits) and PhD (17 credits) programs are stored as curriculum entities with full milestone content (timelines, committee requirements, thesis/dissertation processes, impact requirements). Courses are linked via `requires` (mandatory) and `accepts` (elective) relations rather than static markdown tables.

### Website

The viewer at [compass.henkaku.center](https://compass.henkaku.center) includes:

- **Landing page** organized into DNA (Charter, Archetypes) and Emergent (registry, curricula, network) layers, with an animated compass icon and orientation rotator
- **Sidebar navigation** across all pages showing the full site map
- **Registry pages** for all entity types with search/filter bar and Card/List view toggle (persisted across sessions)
- **Network visualization** — an interactive 3D graph showing relationships between all registry entries, color-coded by type
- **Curricula pages** — list and detail views with dynamic course tables from relations and Mermaid Gantt timeline charts
- **History page** showing the project's commit history pulled live from GitHub
- **References page** linking to foundational source documents
- **Login and inline editing** via Registry auth (email/password), with structured forms for editing or creating registry entries
- **Feedback page** for submitting bug reports and feature requests
- **Markdown rendering** with Mermaid.js support and inline link rendering in summary/notes fields

### Partner Institutions

Three external partners are now linked to the ecosystem:

- **JPCCA** (Japan Probabilistic Computing Association) — hosts the Probabilistic Computing initiative
- **ALife Institute** (Artificial Life Institute, Kyoto) — hosts the Artificial Life initiative
- **AISI** (Japan AI Safety Institute) — hosts the AI Safety Workshop initiative

### Agentic Development

Compass is developed using LLM coding agents under human direction. This is deliberate practice that informs how contribution workflows are designed, spanning three dimensions: development with agents, agent-assisted contribution, and planned agentic interfaces for contributors without direct repository access.

---

## What Still Needs Work

1. **Remaining Registry Types** — Theses, Posts, and Publications are defined in the Archetypes but not yet populated
2. **Agentic Contribution Interfaces** — Tools (chat bots, Slack integrations) for contributors without direct repository access
