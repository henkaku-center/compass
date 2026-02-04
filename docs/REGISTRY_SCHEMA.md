# Registry Schema

This document defines the structured framework for the shared registry mandated by Section III.2 of the Charter (Registry and Coordination Infrastructure).

## Overview

The Charter mandates a **shared registry** that tracks three types of entries:

- **People**: Participants in the ecosystem—their roles, expertise, affiliations, and involvement
- **Projects**: Bounded units of transformation with clear completion criteria
- **Initiatives**: Ongoing programs without predetermined endpoints

The registry serves as coordination infrastructure, making work and people visible and enabling participants to identify connections, gaps, potential collaborators, and network structure across the ecosystem.

### Design Principles

**Shared, not fragmented**: The registry must be shared across all Charter-covered organizations. Separate tracking systems undermine coordination.

**Interoperating schemas**: The three entry types reference each other:
- People link to projects and initiatives they're involved in
- Projects reference people as owners/contributors
- Initiatives reference people as leads/participants and track spawned/contained projects

**Measurability with forgiveness**: The Charter recognizes that systemic, cultural, and long-term impacts may resist clean measurement while still being evaluable through qualitative assessment, stakeholder feedback, and narrative evidence.

### Essential Questions

Each entry type is grounded by essential questions:

**People**:
1. Who is this person and what is their role?
2. What expertise and interests do they bring?
3. What are they currently working on?
4. How can others reach and collaborate with them?

**Projects**:
1. What specific situation or moment is this project addressing?
2. What will this project build, measure, or change?
3. How will you know when the project has succeeded?
4. What would make this project complete?

**Initiatives**:
1. What ongoing purpose does this initiative serve?
2. What activities and outputs does it enable or produce?
3. How will we know if it's still serving its purpose?
4. What projects has it spawned or does it contain?

---

# Part I: People

People appear in the registry not as isolated entries but as nodes in a network—connected to projects they lead or contribute to, initiatives they participate in, and other people they collaborate with.

## Basic Information

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `id` — **Person ID** | Unique internal identifier (e.g., `person_tanaka_yuki`) | *Enables tracking and cross-referencing* |
| `name` — **Full Name** | Person's full name as they prefer to be identified | *Identity* |
| `preferred_name` — **Preferred Name** | *(optional)* Nickname or preferred form of address | *Identity* |
| `pronouns` — **Pronouns** | *(optional)* Preferred pronouns | *Identity* |

---

## Role and Affiliation

*Charter requirement (Section V.1): "at any given moment, for any given activity, individuals should be able to identify which role they occupy"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `role_category` — **Role Category** | Primary role as defined in Charter Section V.1. Must be one of:<br>• `director`<br>• `faculty`<br>• `principal_researcher`<br>• `researcher`<br>• `staff`<br>• `visiting_researcher`<br>• `affiliate`<br>• `student` | **Roles and Positions** |
| `title` — **Title** | *(optional)* Formal title or position (e.g., "Associate Professor", "Research Assistant") | **Roles and Positions** |
| `affiliations` — **Institutional Affiliations** | List of institutional affiliations. Each entry includes:<br>• `institution`: Institution name<br>• `department`: *(optional)* Department or unit<br>• `role`: Role within that institution<br>• `primary`: Whether this is the primary affiliation (true/false) | **Roles and Positions** (affiliations) |
| `start_date` — **Start Date** | When the person joined the ecosystem (format: `YYYY-MM-DD`) | *Temporal context* |
| `end_date` — **End Date** | *(optional)* When the person left or will leave the ecosystem | *Temporal context* |

---

## Expertise and Interests

*Supports Charter's coordination function: enabling others to identify potential collaborators*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `expertise` — **Areas of Expertise** | List of domains, skills, or methods the person has demonstrated competence in. Use specific, searchable terms (e.g., "machine learning", "qualitative research", "interaction design") | *Finding potential collaborators* |
| `interests` — **Research/Work Interests** | List of topics, questions, or domains the person is interested in exploring—whether or not they have current expertise | *Finding potential collaborators* |
| `background` — **Background Summary** | *(optional)* Brief narrative (2-3 sentences) describing the person's background, trajectory, or perspective | *Contextual understanding* |

---

## Current Involvement

*Charter requirement: "Active projects and initiatives the person is participating in, with their role in each"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `projects` — **Project Involvement** | List of projects the person is involved in. Each entry includes:<br>• `project_id`: Reference to project in registry<br>• `title`: Project title<br>• `role`: Role in this project (e.g., "owner", "contributor", "advisor")<br>• `percent_effort`: *(optional)* Time commitment (0–100%) | **Current Involvement** (projects) |
| `initiatives` — **Initiative Involvement** | List of initiatives the person participates in. Each entry includes:<br>• `initiative_id`: Reference to initiative in registry<br>• `title`: Initiative title<br>• `role`: Role in this initiative (e.g., "lead", "steward", "participant") | **Current Involvement** (initiatives) |

---

## Contact and Availability

*Charter requirement: "How to reach the person and their general availability for collaboration"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `email` — **Email** | Primary email address for professional contact | **Contact** |
| `location` — **Location** | *(optional)* Primary work location | **Contact** |
| `availability` — **Collaboration Availability** | General availability for new collaborations. One of:<br>• `available` - Actively seeking collaborations<br>• `limited` - Open to the right opportunity but capacity constrained<br>• `unavailable` - Not taking on new collaborations currently | **Availability** |
| `office_hours` — **Office Hours** | *(optional)* Regular times when the person is available for meetings or drop-ins | **Availability** |
| `preferred_contact` — **Preferred Contact Method** | *(optional)* How the person prefers to be contacted (e.g., "email", "Slack", "schedule via calendar link") | **Contact** |

---

## Person Status

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `status` — **Status** | Current status in the ecosystem. Must be one of:<br>• `active` - Currently participating<br>• `on_leave` - Temporarily away<br>• `emeritus` - Former active member with ongoing connection<br>• `alumni` - Former participant | **Status** |

---

## Links and Profiles

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `links` — **External Links** | *(optional)* List of external profiles or websites. Each entry includes:<br>• `type`: Type of link (e.g., "website", "orcid", "github", "linkedin")<br>• `url`: URL | *Discoverability* |

---

## Person Notes

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `notes` — **Notes** | *(optional)* Freeform space for additional context | *Flexibility* |

---

## Privacy Considerations

The registry is a coordination tool, not a public directory. Access to person records should be limited to participants in Charter-covered programs. Information included should be:

- **Professionally relevant**: Focused on enabling coordination, not personal details
- **Participant-controlled**: People should be able to update their own records and control visibility of optional fields
- **Appropriately scoped**: Available to those who need it for coordination, not publicly exposed

The principle of **openness with discernment** (Charter Section II.7) applies: transparency within the ecosystem supports coordination, but personal information requires appropriate protection.

---

# Part II: Projects

Projects are **bounded units of transformation**—finite, mission-driven endeavors with clear goals, collaborators, outputs, and measures of success. Every project must articulate not only what it aims to achieve, but also what would make it complete.

Projects are distinguished from initiatives by their finite nature. Projects end; initiatives persist until deliberately concluded.

## Basic Information

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `id` — **Project ID** | Unique internal identifier (e.g., `proj_2025_trustsignals`) | *Enables tracking and cross-referencing* |
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

## Project Timeline

*Charter requirement: "When the project begins, when it is expected to complete, and key milestones along the way"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `timeline.start_date` — **Start Date** | When the project begins (format: `YYYY-MM-DD`) | **Temporal Bounds** |
| `timeline.end_date` — **End Date** | When the project is expected to finish | **Temporal Bounds** |
| `timeline.milestones` — **Milestones** | Key internal deadlines or events (e.g., "Prototype v1", "Midterm review", "Final evaluation") | **Temporal Bounds** (milestones) |

---

## Project Status

*Charter requirement: "Current state (proposed, active, paused, completed, archived)"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `status` — **Project Status** | Current lifecycle state. Must be one of: <br>• `proposed` - Project is defined but not yet started<br>• `active` - Project is currently underway<br>• `paused` - Project temporarily suspended<br>• `completed` - Project has met completion criterion<br>• `archived` - Project formally closed and archived | **Status** |

---

## Project Team

*Charter requirement: "Who has authority, accountability, and contribution roles"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `owner` — **Project Owner** | The person responsible for leading the project, ensuring delivery on the success criteria, and bearing primary accountability. References a person entry in the registry. | **Participants** (authority/accountability) |
| `contributors` — **Project Contributors** | A list of people helping with the project. Each contributor includes:<br>• `person_id`: Reference to person in registry<br>• `role`: Role (e.g., "Research Assistant", "Technical Advisor")<br>• `percent_effort`: Time commitment (0–100%) | **Participants** (contribution roles) |

---

## Project Dependencies

*Charter requirement: "What this project requires from other efforts, and what other efforts depend on this project"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `dependencies.requires` — **Required Dependencies** | List of other projects, resources, or outputs this project needs to succeed. Each dependency includes:<br>• `project_id` or `resource_name`: What is needed<br>• `description`: Why it's needed<br>• `criticality`: (low/medium/high) How essential is it | **Dependencies** (requirements) |
| `dependencies.enables` — **Enabled Projects** | List of other projects or initiatives that depend on this project's outputs. Each entry includes:<br>• `project_id` or `initiative_id`: What depends on this<br>• `description`: How this project enables it | **Dependencies** (what this enables) |
| `parent_initiative` — **Parent Initiative** | *(optional)* Reference to initiative that spawned or contains this project | **Dependencies** (initiative relationship) |

---

## Project Funding

*Charter requirement: "Funding sources, resource allocation, and budgeted areas" (where applicable)*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `funding.sources` — **Funding Sources** | List of where funding is coming from. Each source includes:<br>• `name`: Name of the funder<br>• `type`: Type (e.g., "Grant", "Gift", "Internal")<br>• `amount`: (optional) Total funding amount<br>• `restricted`: Whether it must be used in a specific way | **Resources** (sources) |
| `funding.budgeted_areas` — **Budgeted Areas** | How funds are planned to be used. Each entry includes:<br>• `category`: (e.g., "Personnel", "Travel", "Equipment")<br>• `description`: (optional) Notes on purpose<br>• `amount`: (optional) Budgeted amount | **Resources** (allocation) |

---

## Project Context

*Supports Charter's "Overlap and Coherence Analysis" requirements*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `domains` — **Related Domains** | Tags that help map this project to research or practice areas. These tags enable identifying overlapping scope and distinctiveness across projects. | *Enables overlap/coherence analysis* |

---

## Project Notes

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `notes` — **Notes** | Freeform space for assumptions, risks, open questions, or connections to prior work | *Flexibility for additional context* |

---

# Part III: Initiatives

Initiatives are **ongoing programs** without predetermined endpoints, evaluated on continuing justification rather than completion. Examples include research programs, standing working groups, recurring events, coordination functions, and cross-cutting efforts that persist as long as they serve their purpose.

Unlike projects, initiatives do not answer "What would make this complete?" Instead, they answer "Is this still serving its purpose?"

Initiatives often contain or spawn multiple projects. A research initiative might generate several bounded projects over its lifetime; a coordination initiative might establish processes that enable project work.

## Basic Information

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `id` — **Initiative ID** | Unique internal identifier (e.g., `init_2025_aiethics`) | *Enables tracking and cross-referencing* |
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
| `spawned_projects` — **Spawned Projects** | List of projects this initiative has generated. Each entry includes:<br>• `project_id`: Reference to project in registry<br>• `relationship`: How initiative relates to project (e.g., "incubated", "funded", "coordinated") Answers essential prompt #4. | **Projects** (spawned) |
| `contained_projects` — **Contained Projects** | List of active projects operating within this initiative's scope. Same fields as spawned_projects. | **Projects** (contained) |
| `related_initiatives` — **Related Initiatives** | Other initiatives this one coordinates with, supports, or depends on | **Dependencies** (initiatives) |

---

## Initiative Timeline

*Unlike projects, initiatives do not have predetermined end dates*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `timeline.established` — **Established Date** | When the initiative was formally established (format: `YYYY-MM-DD`) | **Temporal Context** |
| `timeline.next_review` — **Next Review** | When the initiative will next be formally reviewed | **Ongoing Justification** (review) |
| `timeline.key_dates` — **Key Dates** | *(optional)* Recurring events or important dates (e.g., "Annual symposium: October", "Quarterly reports: end of each quarter") | **Temporal Context** |

---

## Initiative Status

*Initiative lifecycle states differ from project states*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `status` — **Initiative Status** | Current lifecycle state. Must be one of: <br>• `proposed` - Initiative is defined but not yet established<br>• `active` - Initiative is currently operating<br>• `paused` - Initiative temporarily suspended<br>• `under_review` - Initiative undergoing formal evaluation<br>• `concluding` - Initiative winding down deliberately<br>• `concluded` - Initiative formally ended | **Status** |

---

## Initiative Team

*Charter requirement: "Who has authority, accountability, and contribution roles"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `lead` — **Initiative Lead** | The person responsible for the initiative's ongoing health, coordination, and accountability. References a person entry in the registry. | **Participants** (authority/accountability) |
| `stewards` — **Initiative Stewards** | *(optional)* Others who share responsibility for initiative governance and direction | **Participants** (shared authority) |
| `participants` — **Regular Participants** | People who regularly contribute to the initiative. Each participant includes:<br>• `person_id`: Reference to person in registry<br>• `role`: Role within initiative<br>• `since`: When they joined | **Participants** (contribution roles) |

---

## Initiative Resources

*Charter requirement: "Funding sources, resource allocation, and budgeted areas" (where applicable)*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `funding.sources` — **Funding Sources** | List of ongoing or recurring funding. Each source includes:<br>• `name`: Name of the funder<br>• `type`: Type (e.g., "Grant", "Institutional", "Internal")<br>• `recurring`: Whether funding recurs (true/false)<br>• `amount_annual`: (optional) Annual funding amount | **Resources** (sources) |
| `funding.budget_areas` — **Budget Areas** | How funds are typically allocated. Each entry includes:<br>• `category`: (e.g., "Personnel", "Events", "Infrastructure")<br>• `description`: (optional) Notes on purpose<br>• `amount_annual`: (optional) Typical annual amount | **Resources** (allocation) |

---

## Initiative Context

*Supports Charter's "Overlap and Coherence Analysis" requirements*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `domains` — **Related Domains** | Tags that help map this initiative to research or practice areas. Enables identifying overlapping scope across initiatives. | *Enables overlap/coherence analysis* |

---

## Initiative Notes

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `notes` — **Notes** | Freeform space for context, history, open questions, or connections to other work | *Flexibility for additional context* |

---

# Comparison: Projects vs. Initiatives

| | **Projects** | **Initiatives** |
| --- | --- | --- |
| **Nature** | Bounded, finite | Ongoing, open-ended |
| **End condition** | Completion criteria | Deliberate conclusion or transformation |
| **Evaluation** | Did it achieve outcomes? | Is it still serving its purpose? |
| **Time horizon** | Defined start and end | Established date, no predetermined end |
| **Contains** | Tasks, milestones | Projects, activities |
| **Key question** | "What would make this complete?" | "Should this continue?" |

---

# Alignment with Charter Principles

This schema implements Section III.2 of the Charter by:

1. **Making work and people visible**: Structured format enables browsing, discovery, and coordination
2. **Shared registry**: Single schema for all Charter-covered organizations prevents fragmentation
3. **Role clarity**: Person records establish clear positioning per Section V.1
4. **Bounded projects**: Required fields enforce finite, mission-driven scope with completion criteria
5. **Ongoing justification**: Initiative fields ensure programs articulate why they should continue
6. **Measurability with forgiveness**: Success criteria and health indicators support both quantitative and qualitative assessment
7. **Accountability**: Owner, lead, and contributor fields establish clear responsibility
8. **Network visibility**: Cross-references between people, projects, and initiatives show how the ecosystem connects
9. **Coordination infrastructure**: Dependencies, domains, and scope boundaries enable overlap/coherence analysis

The schema may evolve through Charter governance processes (Section VI), with changes preserving backward compatibility or providing migration paths for existing entries.
