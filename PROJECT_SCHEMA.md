# Introduction

The Henkaku Project Schema is a structured framework developed to define, evaluate, and visualize research efforts across the Henkaku community. Unlike traditional academic systems organized around disciplines, Henkaku prioritizes projects—finite, mission-driven endeavors with clear goals, collaborators, outputs, and measures of success. This schema formalizes that orientation by requiring every project to begin with answers to four essential prompts:

1. *What specific situation or moment is this project addressing?*
2. *What will this project build, measure, or change?*
3. *How will you know when the project has succeeded?*
4. *What would make this project complete?*

These questions ground each project in real-world relevance and bounded scope, helping distinguish projects from open-ended disciplinary explorations.

The schema captures a project’s key dimensions—problem statements, goals, outputs, contributors, funding sources, success criteria, and related disciplines—within a consistent and interoperable format. This structure enables not only clear communication and peer review but also the generation of interactive network visualizations that reveal how people, ideas, and resources flow through the Henkaku ecosystem. These tools are both administrative and philosophical: they make research planning and governance more transparent, while embodying Henkaku’s foundational commitment to cooperation, antidisciplinarity, and systems thinking.

Ultimately, the schema and its accompanying tools support a living knowledge infrastructure—one that helps Henkaku researchers design projects that are impactful, interconnected, and ethically aligned from the very beginning.

# Schema

## Basic Information

| **Field** | **Description** |
| --- | --- |
| `id` — **Project ID** | Unique internal identifier for the project (e.g., `proj_2025_trustsignals`) |
| `title` — **Project Title** | Clear and specific name of the project; avoid generic or trendy terms |
| `summary` — **Project Summary** | A short paragraph (1–2 sentences) describing the project’s aim and context |
| `problem_statement` — **Problem Statement** | A specific real-world moment, breakdown, or question that motivates the project |

---

## Scope and Goals

| **Field** | **Description** |
| --- | --- |
| `project_goals` — **Project Goals** | A list of what the project intends to *build, measure, or change*. Use verbs like "prototype", "evaluate", "reframe", etc. |
| `proposed_outputs` — **Proposed Outputs** | Concrete deliverables (e.g., a prototype, dataset, report, workshop) |
| `success_criteria` — **Success Criteria** | Specific outcomes that define whether the project was successful (e.g., “used by 3 teams”, “positive stakeholder feedback”) |

---

## Timeline

| **Field** | **Description** |
| --- | --- |
| `timeline.start_date` — **Start Date** | When the project begins (format: `YYYY-MM-DD`) |
| `timeline.end_date` — **End Date** | When the project is expected to finish |
| `timeline.milestones` — **Milestones** | Key internal deadlines or events (e.g., “Prototype v1”, “Midterm review”, “Final evaluation”) |

---

## Context

| **Field** | **Description** |
| --- | --- |
| `disciplines` — **Related Disciplines** | Tags that help map this project to SDS or Henkaku research areas (e.g., “Human Cooperation”, “Simulation Systems”) |

---

## Team

| **Field** | **Description** |
| --- | --- |
| `owner` — **Project Owner** | The person responsible for leading the project and ensuring delivery on the success criteria |
| `contributors` — **Project Contributors** | A list of people helping with the project. Each contributor includes:
• `id`: Unique identifier
• `name`: Full name
• `role`: Role (e.g., “Research Assistant”)
• `percent_effort`: Time commitment (0–100%) |

---

## Funding

| **Field** | **Description** |
| --- | --- |
| `funding.sources` — **Funding Sources** | List of where funding is coming from. Each source includes:
• `name`: Name of the funder
• `type`: Type (e.g., “Grant”, “Gift”, “Internal”)
• `amount`: (optional) Total funding amount
• `restricted`: Whether it must be used in a specific way |
| `funding.budgeted_areas` — **Budgeted Areas** | How funds are planned to be used. Each entry includes:
• `category`: (e.g., “Personnel”, “Travel”)
• `description`: (optional) Notes on purpose
• `amount`: (optional) Budgeted amount |

---

## Other

| **Field** | **Description** |
| --- | --- |
| `notes` — **Notes** | Freeform space for assumptions, risks, open questions, or prior work connections |