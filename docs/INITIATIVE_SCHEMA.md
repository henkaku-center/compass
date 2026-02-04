# Introduction

The Henkaku Initiative Schema is a structured framework for documenting ongoing programs across the Henkaku community. This schema implements the requirements established in Section III.2 of the Charter (Registry and Coordination Infrastructure).

The Charter distinguishes between **projects** and **initiatives**:

- **Projects** are bounded units of transformation—finite, mission-driven endeavors with clear completion criteria
- **Initiatives** are ongoing programs without predetermined endpoints, evaluated on continuing justification rather than completion

This schema is designed for initiatives. Examples include research programs, standing working groups, recurring events, coordination functions, and cross-cutting efforts that persist as long as they serve their purpose.

Unlike projects, initiatives do not answer "What would make this complete?" Instead, they answer:

1. *What ongoing purpose does this initiative serve?*
2. *What activities and outputs does it enable or produce?*
3. *How will we know if it's still serving its purpose?*
4. *What projects has it spawned or does it contain?*

These questions ground each initiative in ongoing justification, making clear why the initiative should continue and how its value is assessed over time.

Initiatives often contain or spawn multiple projects. A research initiative might generate several bounded projects over its lifetime; a coordination initiative might establish processes that enable project work. When initiatives spawn projects, those projects should be documented using the [Project Schema](PROJECT_SCHEMA.md).

The schema embraces the Charter's principle of **"measurability with forgiveness"**—recognizing that ongoing programs, especially those addressing systemic or cultural concerns, may resist clean measurement while still being evaluable through qualitative assessment, stakeholder feedback, and narrative evidence.

# Schema

## Basic Information

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `id` — **Initiative ID** | Unique internal identifier for the initiative (e.g., `init_2025_aiethics`) | *Enables tracking and cross-referencing* |
| `title` — **Initiative Title** | Clear and specific name of the initiative; avoid generic or trendy terms | *Part of making work visible* |
| `summary` — **Initiative Summary** | A short paragraph (1–2 sentences) describing the initiative's purpose and scope | *Supports discoverability* |

---

## Purpose and Justification

*Charter requirement: Initiatives "require ongoing justification and are evaluated on whether they continue to serve their purpose"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `purpose` — **Ongoing Purpose** | What enduring need, function, or opportunity does this initiative address? Why should it exist on an ongoing basis rather than as a bounded project? Answers essential prompt #1. | **Ongoing Justification** (purpose) |
| `value_proposition` — **Value Proposition** | What value does this initiative provide to the ecosystem? Who benefits and how? | **Ongoing Justification** (value) |
| `origin` — **Origin and History** | *(optional)* How and why was this initiative established? What prompted its creation? | *Contextual understanding* |

---

## Activities and Outputs

*What the initiative does on an ongoing basis*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `activities` — **Core Activities** | What does this initiative do on a regular or recurring basis? (e.g., "hosts monthly seminars", "maintains documentation", "coordinates cross-team communication") Answers essential prompt #2. | **Scope** (activities) |
| `outputs` — **Typical Outputs** | What does this initiative regularly produce? (e.g., "research papers", "event series", "coordination reports", "infrastructure maintenance") | **Scope** (outputs) |
| `scope_boundaries` — **Scope Boundaries** | What is explicitly within and outside this initiative's purview? What related activities are intentionally left to other initiatives or projects? | **Scope** (boundaries) |

---

## Evaluation and Review

*How the initiative's ongoing value is assessed*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `health_indicators` — **Health Indicators** | How will we know if the initiative is still serving its purpose? What signals indicate the initiative is healthy and valuable? (e.g., "participation levels", "projects spawned", "stakeholder satisfaction", "problems addressed") Answers essential prompt #3. | **Ongoing Justification** (evaluation) |
| `review_cycle` — **Review Cycle** | How often is this initiative formally reviewed for continued relevance? (e.g., "annually", "every 6 months") | **Ongoing Justification** (review) |
| `last_review` — **Last Review** | Date of most recent formal review (format: `YYYY-MM-DD`) | **Ongoing Justification** (review) |
| `sunset_conditions` — **Sunset Conditions** | *(optional)* Under what circumstances should this initiative be concluded or transformed? What would indicate it's no longer needed? | **Ongoing Justification** (conclusion) |

---

## Projects and Relationships

*Charter requirement: "Initiatives often contain or spawn multiple projects"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `spawned_projects` — **Spawned Projects** | List of projects this initiative has generated. Each entry includes:<br>• `project_id`: Reference to project in registry<br>• `title`: Project title<br>• `status`: Current project status<br>• `relationship`: How initiative relates to project (e.g., "incubated", "funded", "coordinated") Answers essential prompt #4. | **Projects** (spawned) |
| `contained_projects` — **Contained Projects** | List of active projects operating within this initiative's scope. Same fields as spawned_projects. | **Projects** (contained) |
| `related_initiatives` — **Related Initiatives** | Other initiatives this one coordinates with, supports, or depends on | **Dependencies** (initiatives) |

---

## Timeline

*Unlike projects, initiatives do not have predetermined end dates*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `timeline.established` — **Established Date** | When the initiative was formally established (format: `YYYY-MM-DD`) | **Temporal Context** |
| `timeline.next_review` — **Next Review** | When the initiative will next be formally reviewed | **Ongoing Justification** (review) |
| `timeline.key_dates` — **Key Dates** | *(optional)* Recurring events or important dates (e.g., "Annual symposium: October", "Quarterly reports: end of each quarter") | **Temporal Context** |

---

## Status

*Initiative lifecycle states differ from project states*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `status` — **Initiative Status** | Current lifecycle state. Must be one of: <br>• `proposed` - Initiative is defined but not yet established<br>• `active` - Initiative is currently operating<br>• `paused` - Initiative temporarily suspended<br>• `under_review` - Initiative undergoing formal evaluation<br>• `concluding` - Initiative winding down deliberately<br>• `concluded` - Initiative formally ended | **Status** |

---

## Team

*Charter requirement: "Who has authority, accountability, and contribution roles"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `lead` — **Initiative Lead** | The person responsible for the initiative's ongoing health, coordination, and accountability | **Participants** (authority/accountability) |
| `stewards` — **Initiative Stewards** | *(optional)* Others who share responsibility for initiative governance and direction | **Participants** (shared authority) |
| `participants` — **Regular Participants** | People who regularly contribute to the initiative. Each participant includes:<br>• `id`: Unique identifier<br>• `name`: Full name<br>• `role`: Role within initiative<br>• `since`: When they joined | **Participants** (contribution roles) |

---

## Resources

*Charter requirement: "Funding sources, resource allocation, and budgeted areas" (where applicable)*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `funding.sources` — **Funding Sources** | List of ongoing or recurring funding. Each source includes:<br>• `name`: Name of the funder<br>• `type`: Type (e.g., "Grant", "Institutional", "Internal")<br>• `recurring`: Whether funding recurs (true/false)<br>• `amount_annual`: (optional) Annual funding amount | **Resources** (sources) |
| `funding.budget_areas` — **Budget Areas** | How funds are typically allocated. Each entry includes:<br>• `category`: (e.g., "Personnel", "Events", "Infrastructure")<br>• `description`: (optional) Notes on purpose<br>• `amount_annual`: (optional) Typical annual amount | **Resources** (allocation) |

---

## Context

*Supports Charter's "Overlap and Coherence Analysis" requirements*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `domains` — **Related Domains** | Tags that help map this initiative to SDS or Henkaku areas (e.g., "Human Cooperation", "AI Ethics", "Community Building"). Enables identifying overlapping scope across initiatives. | *Enables overlap/coherence analysis* |

---

## Other

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `notes` — **Notes** | Freeform space for context, history, open questions, or connections to other work | *Flexibility for additional context* |

---

# Alignment with Charter Principles

This schema implements Section III.2 of the Charter by:

1. **Making work visible**: Structured format enables browsing and discovery of ongoing programs
2. **Ongoing justification**: Required fields ensure initiatives articulate why they should continue
3. **Measurability with forgiveness**: Health indicators support both quantitative and qualitative assessment
4. **Accountability**: Lead, stewards, and participant fields establish clear responsibility
5. **Project relationships**: Explicit tracking of spawned/contained projects shows how initiatives enable bounded work
6. **Coordination infrastructure**: Related initiatives, domains, and scope boundaries enable overlap/coherence analysis
7. **Review cycles**: Built-in review expectations ensure initiatives don't persist beyond their usefulness

The schema may evolve through Charter governance processes (Section VI), with changes preserving backward compatibility or providing migration paths for existing entries.

---

# Relationship to Project Schema

| | **Projects** | **Initiatives** |
| --- | --- | --- |
| **Nature** | Bounded, finite | Ongoing, open-ended |
| **End condition** | Completion criteria | Deliberate conclusion or transformation |
| **Evaluation** | Did it achieve outcomes? | Is it still serving its purpose? |
| **Time horizon** | Defined start and end | Established date, no predetermined end |
| **Contains** | Tasks, milestones | Projects, activities |
| **Schema** | [PROJECT_SCHEMA.md](PROJECT_SCHEMA.md) | This document |

When an initiative spawns a project, document the project using the Project Schema and link it back to the initiative using the `spawned_projects` or `contained_projects` fields.
