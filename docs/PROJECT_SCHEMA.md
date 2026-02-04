# Introduction

The Henkaku Project Schema is a structured framework developed to define, evaluate, and visualize research efforts across the Henkaku community. This schema implements the requirements established in Section III.2 of the Charter (Registry and Coordination Infrastructure).

Unlike traditional academic systems organized around disciplines, Henkaku prioritizes projects—**finite, bounded, mission-driven endeavors** with clear goals, collaborators, outputs, and measures of success. This schema formalizes that orientation by requiring every project to begin with answers to four essential prompts:

1. *What specific situation or moment is this project addressing?*
2. *What will this project build, measure, or change?*
3. *How will you know when the project has succeeded?*
4. *What would make this project complete?*

These questions ground each project in real-world relevance and bounded scope, helping distinguish projects from open-ended disciplinary explorations.

**Note on Initiatives**: The Charter distinguishes between *projects* (bounded, with completion criteria) and *initiatives* (ongoing programs without predetermined endpoints). This schema is designed for projects. Initiatives—such as research programs, standing working groups, and cross-cutting coordination functions—should be documented using the [Initiative Schema](INITIATIVE_SCHEMA.md). Initiatives may spawn or contain multiple projects, each of which should be documented using this schema.

The schema captures a project's key dimensions—problem statements, goals, outputs, contributors, funding sources, success criteria, dependencies, and related disciplines—within a consistent and interoperable format. This structure enables not only clear communication and peer review but also the generation of interactive network visualizations that reveal how people, ideas, and resources flow through the Henkaku ecosystem.

The schema embraces the Charter's principle of **"measurability with forgiveness"**—recognizing that systemic, cultural, and long-term transformations may resist quantification while still being evaluable through qualitative assessment, stakeholder feedback, and narrative evidence.

Ultimately, the schema and its accompanying tools support a living knowledge infrastructure—one that helps Henkaku researchers design projects that are impactful, interconnected, and ethically aligned from the very beginning.

# Schema

## Basic Information

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `id` — **Project ID** | Unique internal identifier for the project (e.g., `proj_2025_trustsignals`) | *Enables tracking and cross-referencing* |
| `title` — **Project Title** | Clear and specific name of the project; avoid generic or trendy terms | *Part of making work visible* |
| `summary` — **Project Summary** | A short paragraph (1–2 sentences) describing the project's aim and context | *Supports discoverability* |

---

## Intent and Problem Context

*Charter requirement: "What specific situation, breakdown, or opportunity this project addresses, what transformation is being pursued, and why"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `problem_statement` — **Problem Statement** | A specific real-world moment, breakdown, or question that motivates the project. Answers essential prompt #1: "What specific situation or moment is this project addressing?" | **Intent** (part 1) |
| `project_goals` — **Project Goals** | A list of what the project intends to *build, measure, or change*. Use verbs like "prototype", "evaluate", "reframe", etc. Answers essential prompt #2: "What will this project build, measure, or change?" | **Intent** (part 2) + **Scope** (part 1) |

---

## Scope and Outputs

*Charter requirement: "Boundaries of the project—what it includes and excludes, what it will build or measure or change, and what outputs it will produce"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `proposed_outputs` — **Proposed Outputs** | Concrete deliverables (e.g., a prototype, dataset, report, workshop, intervention) | **Scope** (outputs) |
| `scope_boundaries` — **Scope Boundaries** | What is explicitly included and excluded from this project. What will the project NOT attempt to do? What related questions are intentionally out of scope? | **Scope** (boundaries) |

---

## Measurability and Completion

*Charter requirement: "How impact or progress will be assessed (whether qualitatively or quantitatively), and what specific evidence would indicate success or failure"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `success_criteria` — **Success Criteria** | Specific outcomes that define whether the project was successful. This may include quantitative metrics (e.g., "used by 3 teams"), qualitative assessments (e.g., "positive stakeholder feedback"), or narrative evidence (e.g., "changed how participants frame the problem"). Answers essential prompt #3: "How will you know when the project has succeeded?" | **Measurability** |
| `completion_criterion` — **Completion Criterion** | What would make this project complete (not just successful, but done)? Answers essential prompt #4: "What would make this project complete?" | **Measurability and Completion** |
| `measurement_approach` — **Measurement Approach** | *(optional)* Brief note on assessment method (quantitative, qualitative, mixed, narrative). Acknowledges Charter's "measurability with forgiveness" principle. | **Measurability with Forgiveness** |

---

## Timeline

*Charter requirement: "When the project begins, when it is expected to complete, and key milestones along the way"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `timeline.start_date` — **Start Date** | When the project begins (format: `YYYY-MM-DD`) | **Temporal Bounds** |
| `timeline.end_date` — **End Date** | When the project is expected to finish | **Temporal Bounds** |
| `timeline.milestones` — **Milestones** | Key internal deadlines or events (e.g., "Prototype v1", "Midterm review", "Final evaluation") | **Temporal Bounds** (milestones) |

---

## Status

*Charter requirement: "Current state (proposed, active, paused, completed, archived)"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `status` — **Project Status** | Current lifecycle state. Must be one of: <br>• `proposed` - Project is defined but not yet started<br>• `active` - Project is currently underway<br>• `paused` - Project temporarily suspended<br>• `completed` - Project has met completion criterion<br>• `archived` - Project formally closed and archived | **Status** |

---

## Team

*Charter requirement: "Who has authority, accountability, and contribution roles"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `owner` — **Project Owner** | The person responsible for leading the project, ensuring delivery on the success criteria, and bearing primary accountability | **Participants** (authority/accountability) |
| `contributors` — **Project Contributors** | A list of people helping with the project. Each contributor includes:<br>• `id`: Unique identifier<br>• `name`: Full name<br>• `role`: Role (e.g., "Research Assistant", "Technical Advisor")<br>• `percent_effort`: Time commitment (0–100%) | **Participants** (contribution roles) |

---

## Dependencies

*Charter requirement: "What this project requires from other efforts, and what other efforts depend on this project"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `dependencies.requires` — **Required Dependencies** | List of other projects, resources, or outputs this project needs to succeed. Each dependency includes:<br>• `project_id` or `resource_name`: What is needed<br>• `description`: Why it's needed<br>• `criticality`: (low/medium/high) How essential is it | **Dependencies** (requirements) |
| `dependencies.enables` — **Enabled Projects** | List of other projects or initiatives that depend on this project's outputs. Each entry includes:<br>• `project_id`: What project depends on this<br>• `description`: How this project enables it | **Dependencies** (what this enables) |

---

## Funding

*Charter requirement: "Funding sources, resource allocation, and budgeted areas" (where applicable)*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `funding.sources` — **Funding Sources** | List of where funding is coming from. Each source includes:<br>• `name`: Name of the funder<br>• `type`: Type (e.g., "Grant", "Gift", "Internal")<br>• `amount`: (optional) Total funding amount<br>• `restricted`: Whether it must be used in a specific way | **Resources** (sources) |
| `funding.budgeted_areas` — **Budgeted Areas** | How funds are planned to be used. Each entry includes:<br>• `category`: (e.g., "Personnel", "Travel", "Equipment")<br>• `description`: (optional) Notes on purpose<br>• `amount`: (optional) Budgeted amount | **Resources** (allocation) |

---

## Context

*Supports Charter's "Overlap and Coherence Analysis" requirements*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `disciplines` — **Related Disciplines** | Tags that help map this project to SDS or Henkaku research areas (e.g., "Human Cooperation", "Simulation Systems"). These tags enable identifying overlapping scope and distinctiveness across projects. | *Enables overlap/coherence analysis* |

---

## Other

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `notes` — **Notes** | Freeform space for assumptions, risks, open questions, or connections to prior work | *Flexibility for additional context* |

---

# Alignment with Charter Principles

This schema implements Section III.2 of the Charter by:

1. **Making work visible**: Structured format enables browsing and discovery
2. **Bounded projects**: Required fields enforce finite, mission-driven scope
3. **Measurability with forgiveness**: Success criteria support both quantitative and qualitative assessment
4. **Accountability**: Owner and contributor fields establish clear responsibility
5. **Coordination infrastructure**: Dependencies, status, and discipline tags enable overlap/coherence analysis
6. **Resource transparency**: Funding fields support accountability where applicable

The schema may evolve through Charter governance processes (Section V), with changes preserving backward compatibility or providing migration paths for existing entries.
