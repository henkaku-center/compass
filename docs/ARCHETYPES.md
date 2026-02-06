# Archetypes

This document defines the structural archetypes—the templates and schemas—for entries in the shared registry mandated by Section V of the Charter (Registry and Coordination Infrastructure).

## Overview

The Charter mandates a **shared registry** that tracks six types of entries:

- **People**: Participants in the ecosystem—their roles, expertise, affiliations, and involvement
- **Projects**: Bounded units of transformation with clear completion criteria
- **Initiatives**: Ongoing programs without predetermined endpoints
- **Courses**: Recurring educational units with syllabi, learning objectives, and credit values
- **Theses**: Bounded academic works with advisors, committees, and defense milestones
- **Events**: Time-bound gatherings—seminars, workshops, conferences, and other convening occasions

The registry serves as coordination infrastructure, making work and people visible and enabling participants to identify connections, gaps, potential collaborators, and network structure across the ecosystem.

### Design Principles

**Shared, not fragmented**: The registry must be shared across all Charter-covered institutions. Separate tracking systems undermine coordination.

**Interoperating schemas**: Entry types reference each other:
- People link to projects, initiatives, courses, theses, and events they're involved in
- Projects reference people as owners/contributors
- Initiatives reference people as leads/participants and track spawned/contained projects
- Courses link to instructors, Charter principles, and related projects
- Theses link to advisors, committees, and related projects or initiatives
- Events link to organizers, related initiatives/projects, and participants

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

**Courses**:
1. What capabilities does this course develop?
2. How does it connect to Charter principles?
3. Who teaches it and what projects does it support?
4. How is student learning assessed?

**Theses**:
1. What question does this thesis address?
2. Who advises it and what is the expected contribution?
3. How does it relate to ongoing projects or initiatives?
4. What are the milestones and defense requirements?

**Events**:
1. What is the purpose of this gathering?
2. Who is organizing it and who should attend?
3. What initiative, project, or course does it serve?
4. What outcomes or follow-up actions are expected?

---

## Part I: People

People appear in the registry not as isolated entries but as nodes in a network—connected to projects they lead or contribute to, initiatives they participate in, and other people they collaborate with.

### Basic Information

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `id` — **Person ID** | Unique internal identifier (e.g., `person_tanaka_yuki`) | *Enables tracking and cross-referencing* |
| `name` — **Full Name** | Person's full name as they prefer to be identified | *Identity* |
| `preferred_name` — **Preferred Name** | *(optional)* Nickname or preferred form of address | *Identity* |
| `pronouns` — **Pronouns** | *(optional)* Preferred pronouns | *Identity* |

---

### Role and Affiliation

*Charter requirement (Section VI.1): "at any given moment, for any given activity, individuals should be able to identify which role they occupy"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `role_categories` — **Role Categories** | List of roles as defined in Charter Section VI.1. Categories are not mutually exclusive—individuals may hold multiple roles. Each entry must be one of:<br>• `director`<br>• `faculty`<br>• `principal_researcher`<br>• `researcher`<br>• `staff`<br>• `visiting_researcher`<br>• `affiliate`<br>• `student` | **Roles and Positions** |
| `title` — **Title** | *(optional)* Formal title or position (e.g., "Associate Professor", "Research Assistant") | **Roles and Positions** |
| `affiliations` — **Institutional Affiliations** | List of institutional affiliations. Each entry includes:<br>• `institution`: Institution name<br>• `department`: *(optional)* Department or unit<br>• `role`: Role within that institution<br>• `primary`: Whether this is the primary affiliation (true/false) | **Roles and Positions** (affiliations) |
| `start_date` — **Start Date** | When the person joined the ecosystem (format: `YYYY-MM-DD`) | *Temporal context* |
| `end_date` — **End Date** | *(optional)* When the person left or will leave the ecosystem | *Temporal context* |

---

### Expertise and Interests

*Supports Charter's coordination function: enabling others to identify potential collaborators*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `expertise` — **Areas of Expertise** | List of domains, skills, or methods the person has demonstrated competence in. Use specific, searchable terms (e.g., "machine learning", "qualitative research", "interaction design") | *Finding potential collaborators* |
| `interests` — **Research/Work Interests** | List of topics, questions, or domains the person is interested in exploring—whether or not they have current expertise | *Finding potential collaborators* |
| `background` — **Background Summary** | *(optional)* Brief narrative (2-3 sentences) describing the person's background, trajectory, or perspective | *Contextual understanding* |

---

### Current Involvement

*Charter requirement: "Active projects and initiatives the person is participating in, with their role in each"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `projects` — **Project Involvement** | List of projects the person is involved in. Each entry includes:<br>• `project_id`: Reference to project in registry<br>• `title`: Project title<br>• `role`: Role in this project (e.g., "owner", "contributor", "advisor")<br>• `percent_effort`: *(optional)* Time commitment (0–100%) | **Current Involvement** (projects) |
| `initiatives` — **Initiative Involvement** | List of initiatives the person participates in. Each entry includes:<br>• `initiative_id`: Reference to initiative in registry<br>• `title`: Initiative title<br>• `role`: Role in this initiative (e.g., "lead", "steward", "participant") | **Current Involvement** (initiatives) |

---

### Contact and Availability

*Charter requirement: "How to reach the person and their general availability for collaboration"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `email` — **Email** | Primary email address for professional contact | **Contact** |
| `location` — **Location** | *(optional)* Primary work location | **Contact** |
| `availability` — **Collaboration Availability** | General availability for new collaborations. One of:<br>• `available` - Actively seeking collaborations<br>• `limited` - Open to the right opportunity but capacity constrained<br>• `unavailable` - Not taking on new collaborations currently | **Availability** |
| `office_hours` — **Office Hours** | *(optional)* Regular times when the person is available for meetings or drop-ins | **Availability** |
| `preferred_contact` — **Preferred Contact Method** | *(optional)* How the person prefers to be contacted (e.g., "email", "Slack", "schedule via calendar link") | **Contact** |

---

### Person Status

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `status` — **Status** | Current status in the ecosystem. Must be one of:<br>• `active` - Currently participating<br>• `on_leave` - Temporarily away<br>• `emeritus` - Former active member with ongoing connection<br>• `alumni` - Former participant | **Status** |

---

### Links and Profiles

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `links` — **External Links** | *(optional)* List of external profiles or websites. Each entry includes:<br>• `type`: Type of link (e.g., "website", "orcid", "github", "linkedin")<br>• `url`: URL | *Discoverability* |

---

### Person Notes

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `notes` — **Notes** | *(optional)* Freeform space for additional context | *Flexibility* |

---

### Privacy Considerations

The registry is a coordination tool, not a public directory. Access to person records should be limited to participants in Charter-covered programs. Information included should be:

- **Professionally relevant**: Focused on enabling coordination, not personal details
- **Participant-controlled**: People should be able to update their own records and control visibility of optional fields
- **Appropriately scoped**: Available to those who need it for coordination, not publicly exposed

The principle of **openness with discernment** (Charter Section II.7) applies: transparency within the ecosystem supports coordination, but personal information requires appropriate protection.

---

## Part II: Projects

Projects are **bounded units of transformation**—finite, mission-driven endeavors with clear goals, collaborators, outputs, and measures of success. Every project must articulate not only what it aims to achieve, but also what would make it complete.

Projects are distinguished from initiatives by their finite nature. Projects end; initiatives persist until deliberately concluded.

### Basic Information

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `id` — **Project ID** | Unique internal identifier (e.g., `proj_2025_trustsignals`) | *Enables tracking and cross-referencing* |
| `title` — **Project Title** | Clear and specific name of the project; avoid generic or trendy terms | *Part of making work visible* |
| `summary` — **Project Summary** | A short paragraph (1–2 sentences) describing the project's aim and context | *Supports discoverability* |

---

### Intent and Problem Context

*Charter requirement: "What specific situation, breakdown, or opportunity this project addresses, what transformation is being pursued, and why"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `problem_statement` — **Problem Statement** | A specific real-world moment, breakdown, or question that motivates the project. Answers essential prompt #1: "What specific situation or moment is this project addressing?" | **Intent** (part 1) |
| `project_goals` — **Project Goals** | A list of what the project intends to *build, measure, or change*. Use verbs like "prototype", "evaluate", "reframe", etc. Answers essential prompt #2: "What will this project build, measure, or change?" | **Intent** (part 2) + **Scope** (part 1) |

---

### Scope and Outputs

*Charter requirement: "Boundaries of the project—what it includes and excludes, what it will build or measure or change, and what outputs it will produce"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `proposed_outputs` — **Proposed Outputs** | Concrete deliverables (e.g., a prototype, dataset, report, workshop, intervention) | **Scope** (outputs) |
| `scope_boundaries` — **Scope Boundaries** | What is explicitly included and excluded from this project. What will the project NOT attempt to do? What related questions are intentionally out of scope? | **Scope** (boundaries) |

---

### Measurability and Completion

*Charter requirement: "How impact or progress will be assessed (whether qualitatively or quantitatively), and what specific evidence would indicate success or failure"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `success_criteria` — **Success Criteria** | Specific outcomes that define whether the project was successful. This may include quantitative metrics (e.g., "used by 3 teams"), qualitative assessments (e.g., "positive stakeholder feedback"), or narrative evidence (e.g., "changed how participants frame the problem"). Answers essential prompt #3: "How will you know when the project has succeeded?" | **Measurability** |
| `completion_criterion` — **Completion Criterion** | What would make this project complete (not just successful, but done)? Answers essential prompt #4: "What would make this project complete?" | **Measurability and Completion** |
| `measurement_approach` — **Measurement Approach** | *(optional)* Brief note on assessment method (quantitative, qualitative, mixed, narrative). Acknowledges Charter's "measurability with forgiveness" principle. | **Measurability with Forgiveness** |

---

### Project Timeline

*Charter requirement: "When the project begins, when it is expected to complete, and key milestones along the way"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `timeline.start_date` — **Start Date** | When the project begins (format: `YYYY-MM-DD`) | **Temporal Bounds** |
| `timeline.end_date` — **End Date** | When the project is expected to finish | **Temporal Bounds** |
| `timeline.milestones` — **Milestones** | Key internal deadlines or events (e.g., "Prototype v1", "Midterm review", "Final evaluation") | **Temporal Bounds** (milestones) |

---

### Project Status

*Charter requirement: "Current state (proposed, active, paused, completed, archived)"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `status` — **Project Status** | Current lifecycle state. Must be one of: <br>• `proposed` - Project is defined but not yet started<br>• `active` - Project is currently underway<br>• `paused` - Project temporarily suspended<br>• `completed` - Project has met completion criterion<br>• `archived` - Project formally closed and archived | **Status** |

---

### Project Team

*Charter requirement: "Who has authority, accountability, and contribution roles"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `owner` — **Project Owner** | The person responsible for leading the project, ensuring delivery on the success criteria, and bearing primary accountability. References a person entry in the registry. | **Participants** (authority/accountability) |
| `contributors` — **Project Contributors** | A list of people helping with the project. Each contributor includes:<br>• `person_id`: Reference to person in registry<br>• `role`: Role (e.g., "Research Assistant", "Technical Advisor")<br>• `percent_effort`: Time commitment (0–100%) | **Participants** (contribution roles) |

---

### Project Dependencies

*Charter requirement: "What this project requires from other efforts, and what other efforts depend on this project"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `dependencies.requires` — **Required Dependencies** | List of other projects, resources, or outputs this project needs to succeed. Each dependency includes:<br>• `project_id` or `resource_name`: What is needed<br>• `description`: Why it's needed<br>• `criticality`: (low/medium/high) How essential is it | **Dependencies** (requirements) |
| `dependencies.enables` — **Enabled Projects** | List of other projects or initiatives that depend on this project's outputs. Each entry includes:<br>• `project_id` or `initiative_id`: What depends on this<br>• `description`: How this project enables it | **Dependencies** (what this enables) |
| `parent_initiative` — **Parent Initiative** | *(optional)* Reference to initiative that spawned or contains this project | **Dependencies** (initiative relationship) |

---

### Project Funding

*Charter requirement: "Funding sources, resource allocation, and budgeted areas" (where applicable)*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `funding.sources` — **Funding Sources** | List of where funding is coming from. Each source includes:<br>• `name`: Name of the funder<br>• `type`: Type (e.g., "Grant", "Gift", "Internal")<br>• `amount`: (optional) Total funding amount<br>• `restricted`: Whether it must be used in a specific way | **Resources** (sources) |
| `funding.budgeted_areas` — **Budgeted Areas** | How funds are planned to be used. Each entry includes:<br>• `category`: (e.g., "Personnel", "Travel", "Equipment")<br>• `description`: (optional) Notes on purpose<br>• `amount`: (optional) Budgeted amount | **Resources** (allocation) |

---

### Project Context

*Supports Charter's "Overlap and Coherence Analysis" requirements*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `domains` — **Related Domains** | Tags that help map this project to research or practice areas. These tags enable identifying overlapping scope and distinctiveness across projects. | *Enables overlap/coherence analysis* |

---

### Project Notes

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `notes` — **Notes** | Freeform space for assumptions, risks, open questions, or connections to prior work | *Flexibility for additional context* |

---

## Part III: Initiatives

Initiatives are **ongoing programs** without predetermined endpoints, evaluated on continuing justification rather than completion. Examples include research programs, standing working groups, recurring events, coordination functions, and cross-cutting efforts that persist as long as they serve their purpose.

Unlike projects, initiatives do not answer "What would make this complete?" Instead, they answer "Is this still serving its purpose?"

Initiatives often contain or spawn multiple projects. A research initiative might generate several bounded projects over its lifetime; a coordination initiative might establish processes that enable project work.

### Basic Information

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `id` — **Initiative ID** | Unique internal identifier (e.g., `init_2025_aiethics`) | *Enables tracking and cross-referencing* |
| `title` — **Initiative Title** | Clear and specific name of the initiative; avoid generic or trendy terms | *Part of making work visible* |
| `summary` — **Initiative Summary** | A short paragraph (1–2 sentences) describing the initiative's purpose and scope | *Supports discoverability* |

---

### Purpose and Justification

*Charter requirement: Initiatives "require ongoing justification and are evaluated on whether they continue to serve their purpose"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `purpose` — **Ongoing Purpose** | What enduring need, function, or opportunity does this initiative address? Why should it exist on an ongoing basis rather than as a bounded project? Answers essential prompt #1. | **Ongoing Justification** (purpose) |
| `value_proposition` — **Value Proposition** | What value does this initiative provide to the ecosystem? Who benefits and how? | **Ongoing Justification** (value) |
| `origin` — **Origin and History** | *(optional)* How and why was this initiative established? What prompted its creation? | *Contextual understanding* |

---

### Activities and Outputs

*What the initiative does on an ongoing basis*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `activities` — **Core Activities** | What does this initiative do on a regular or recurring basis? (e.g., "hosts monthly seminars", "maintains documentation", "coordinates cross-team communication") Answers essential prompt #2. | **Scope** (activities) |
| `outputs` — **Typical Outputs** | What does this initiative regularly produce? (e.g., "research papers", "event series", "coordination reports", "infrastructure maintenance") | **Scope** (outputs) |
| `scope_boundaries` — **Scope Boundaries** | What is explicitly within and outside this initiative's purview? What related activities are intentionally left to other initiatives or projects? | **Scope** (boundaries) |

---

### Evaluation and Review

*How the initiative's ongoing value is assessed*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `health_indicators` — **Health Indicators** | How will we know if the initiative is still serving its purpose? What signals indicate the initiative is healthy and valuable? (e.g., "participation levels", "projects spawned", "stakeholder satisfaction", "problems addressed") Answers essential prompt #3. | **Ongoing Justification** (evaluation) |
| `review_cycle` — **Review Cycle** | How often is this initiative formally reviewed for continued relevance? (e.g., "annually", "every 6 months") | **Ongoing Justification** (review) |
| `last_review` — **Last Review** | Date of most recent formal review (format: `YYYY-MM-DD`) | **Ongoing Justification** (review) |
| `sunset_conditions` — **Sunset Conditions** | *(optional)* Under what circumstances should this initiative be concluded or transformed? What would indicate it's no longer needed? | **Ongoing Justification** (conclusion) |

---

### Projects and Relationships

*Charter requirement: "Initiatives often contain or spawn multiple projects"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `spawned_projects` — **Spawned Projects** | List of projects this initiative has generated. Each entry includes:<br>• `project_id`: Reference to project in registry<br>• `relationship`: How initiative relates to project (e.g., "incubated", "funded", "coordinated") Answers essential prompt #4. | **Projects** (spawned) |
| `contained_projects` — **Contained Projects** | List of active projects operating within this initiative's scope. Same fields as spawned_projects. | **Projects** (contained) |
| `related_initiatives` — **Related Initiatives** | Other initiatives this one coordinates with, supports, or depends on | **Dependencies** (initiatives) |

---

### Initiative Timeline

*Unlike projects, initiatives do not have predetermined end dates*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `timeline.established` — **Established Date** | When the initiative was formally established (format: `YYYY-MM-DD`) | **Temporal Context** |
| `timeline.next_review` — **Next Review** | When the initiative will next be formally reviewed | **Ongoing Justification** (review) |
| `timeline.key_dates` — **Key Dates** | *(optional)* Recurring events or important dates (e.g., "Annual symposium: October", "Quarterly reports: end of each quarter") | **Temporal Context** |

---

### Initiative Status

*Initiative lifecycle states differ from project states*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `status` — **Initiative Status** | Current lifecycle state. Must be one of: <br>• `proposed` - Initiative is defined but not yet established<br>• `active` - Initiative is currently operating<br>• `paused` - Initiative temporarily suspended<br>• `under_review` - Initiative undergoing formal evaluation<br>• `concluding` - Initiative winding down deliberately<br>• `concluded` - Initiative formally ended | **Status** |

---

### Initiative Team

*Charter requirement: "Who has authority, accountability, and contribution roles"*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `lead` — **Initiative Lead** | The person responsible for the initiative's ongoing health, coordination, and accountability. References a person entry in the registry. | **Participants** (authority/accountability) |
| `stewards` — **Initiative Stewards** | *(optional)* Others who share responsibility for initiative governance and direction | **Participants** (shared authority) |
| `participants` — **Regular Participants** | People who regularly contribute to the initiative. Each participant includes:<br>• `person_id`: Reference to person in registry<br>• `role`: Role within initiative<br>• `since`: When they joined | **Participants** (contribution roles) |

---

### Initiative Resources

*Charter requirement: "Funding sources, resource allocation, and budgeted areas" (where applicable)*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `funding.sources` — **Funding Sources** | List of ongoing or recurring funding. Each source includes:<br>• `name`: Name of the funder<br>• `type`: Type (e.g., "Grant", "Institutional", "Internal")<br>• `recurring`: Whether funding recurs (true/false)<br>• `amount_annual`: (optional) Annual funding amount | **Resources** (sources) |
| `funding.budget_areas` — **Budget Areas** | How funds are typically allocated. Each entry includes:<br>• `category`: (e.g., "Personnel", "Events", "Infrastructure")<br>• `description`: (optional) Notes on purpose<br>• `amount_annual`: (optional) Typical annual amount | **Resources** (allocation) |

---

### Initiative Context

*Supports Charter's "Overlap and Coherence Analysis" requirements*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `domains` — **Related Domains** | Tags that help map this initiative to research or practice areas. Enables identifying overlapping scope across initiatives. | *Enables overlap/coherence analysis* |

---

### Initiative Notes

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `notes` — **Notes** | Freeform space for context, history, open questions, or connections to other work | *Flexibility for additional context* |

---

## Part IV: Courses

Courses are **recurring educational units** with defined learning objectives, credit values, and instructors. Unlike projects, courses recur across cohorts; unlike initiatives, they have structured syllabi and assessment criteria. Courses connect to the Charter principles they embody, the projects they support, and the capabilities they develop.

Courses appear in the registry to make the curriculum visible, discoverable, and connected to the broader ecosystem. Tracking courses enables participants to understand what capabilities are being developed, how courses evolve across terms, and where curricular gaps or overlaps exist.

### Basic Information

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `id` — **Course ID** | Unique internal identifier (e.g., `course_aps_1`) | *Enables tracking and cross-referencing* |
| `title` — **Course Title** | Official name of the course | *Part of making work visible* |
| `summary` — **Course Summary** | A short paragraph (1–2 sentences) describing what the course covers and why | *Supports discoverability* |
| `credits` — **Credit Value** | Number of credits awarded | **Academic Structure** |

---

### Learning Objectives and Charter Alignment

*Supports visibility of how curriculum connects to Charter principles*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `learning_objectives` — **Learning Objectives** | What capabilities does this course develop? List of specific, assessable outcomes. Answers essential prompt #1. | **Educational Practice** |
| `charter_alignment` — **Charter Principle Alignment** | Which Charter principles does this course embody or develop? List of section references with brief explanation (e.g., "Section II.1 Antidisciplinarity — course requires working across disciplinary boundaries"). Answers essential prompt #2. | **Charter Alignment** |
| `domains` — **Related Domains** | Tags that map this course to research or practice areas | *Enables overlap/coherence analysis* |

---

### Instruction

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `instructors` — **Instructors** | List of people who teach this course. Each entry includes:<br>• `person_id`: Reference to person in registry<br>• `role`: Role (e.g., "lead instructor", "co-instructor", "teaching assistant") Answers essential prompt #3. | **Participants** (authority) |
| `program` — **Degree Program** | Which program(s) this course belongs to. One or more of:<br>• `masters_mandatory`<br>• `masters_elective`<br>• `phd_mandatory`<br>• `phd_elective` | **Academic Structure** |
| `prerequisites` — **Prerequisites** | *(optional)* Other courses or knowledge expected before enrollment | **Academic Structure** |

---

### Schedule and Delivery

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `term` — **Term Offered** | When this course is typically offered (e.g., "Spring 2026", "Every fall term") | **Temporal Context** |
| `format` — **Delivery Format** | How the course is delivered. One of:<br>• `in_person`<br>• `remote`<br>• `hybrid` | **Logistics** |
| `schedule` — **Schedule** | *(optional)* Meeting pattern (e.g., "Tuesdays 10:00–12:00") | **Temporal Context** |

---

### Assessment

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `assessment_approach` — **Assessment Approach** | How is student learning assessed? (e.g., "project-based portfolio", "thesis proposal", "peer review and reflection"). Answers essential prompt #4. | **Educational Practice** (assessment) |

---

### Related Projects and Courses

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `related_projects` — **Related Projects** | *(optional)* Projects that this course supports or feeds into | **Dependencies** |
| `related_courses` — **Related Courses** | *(optional)* Other courses that complement or build on this one | **Dependencies** |

---

### Course Status

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `status` — **Course Status** | Current state. Must be one of:<br>• `planned` - Course designed but not yet offered<br>• `active` - Currently being taught<br>• `on_hold` - Not offered this term but expected to return<br>• `retired` - No longer offered | **Status** |

---

### Course Notes

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `notes` — **Notes** | Freeform space for pedagogical context, revision history, or planned changes | *Flexibility for additional context* |

---

## Part V: Theses

Theses are **bounded academic works** produced by students in pursuit of a degree. Each thesis has an advisor, a committee, defense milestones, and an expected contribution to knowledge. Theses connect to the projects and initiatives they draw from or contribute to, and to the people who advise and evaluate them.

Tracking theses in the registry makes student research visible across the ecosystem, helps advisors and collaborators identify connections, and creates an institutional record of the questions the community has chosen to investigate.

### Basic Information

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `id` — **Thesis ID** | Unique internal identifier (e.g., `thesis_2026_tanaka`) | *Enables tracking and cross-referencing* |
| `title` — **Thesis Title** | Working or final title of the thesis | *Part of making work visible* |
| `summary` — **Thesis Summary** | A short paragraph (1–2 sentences) describing the thesis topic and approach | *Supports discoverability* |
| `degree` — **Degree Type** | Which degree this thesis is for. One of:<br>• `masters`<br>• `phd` | **Academic Structure** |

---

### Research Question and Contribution

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `research_question` — **Research Question** | What question does this thesis address? Answers essential prompt #1. | **Intent** |
| `expected_contribution` — **Expected Contribution** | What is the expected contribution to knowledge, practice, or the ecosystem? Answers essential prompt #2. | **Measurability** |
| `domains` — **Related Domains** | Tags that map this thesis to research or practice areas | *Enables overlap/coherence analysis* |

---

### Advisory Team

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `student` — **Student** | The student authoring the thesis. References a person entry in the registry. | **Participants** (author) |
| `advisor` — **Primary Advisor** | The faculty member or principal researcher serving as primary advisor. References a person entry. Answers essential prompt #2. | **Participants** (authority/accountability) |
| `committee` — **Committee Members** | List of people on the thesis committee. Each entry includes:<br>• `person_id`: Reference to person in registry (or `external_name` for non-registry members)<br>• `role`: Role (e.g., "committee chair", "external examiner", "member") | **Participants** (evaluation) |

---

### Milestones and Timeline

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `timeline.start_date` — **Start Date** | When thesis work began (format: `YYYY-MM-DD`) | **Temporal Context** |
| `timeline.expected_defense` — **Expected Defense Date** | When the defense is anticipated | **Temporal Context** |
| `timeline.milestones` — **Milestones** | Key milestones. Each entry includes:<br>• `name`: Milestone name (e.g., "Proposal defense", "Mid-term review", "Final defense")<br>• `date`: Date (actual or planned)<br>• `status`: One of `planned`, `completed`, `deferred` Answers essential prompt #4. | **Temporal Context** (milestones) |

---

### Related Work

*Charter requirement: theses should connect to the broader ecosystem*

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `related_projects` — **Related Projects** | Projects this thesis draws from or contributes to. Each entry includes:<br>• `project_id`: Reference to project in registry<br>• `relationship`: How thesis relates (e.g., "extends", "evaluates", "contributes to") Answers essential prompt #3. | **Dependencies** (projects) |
| `related_initiatives` — **Related Initiatives** | Initiatives this thesis connects to | **Dependencies** (initiatives) |
| `related_courses` — **Related Courses** | *(optional)* Courses that informed or supported this thesis | **Dependencies** (courses) |

---

### Thesis Status

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `status` — **Thesis Status** | Current lifecycle state. Must be one of:<br>• `proposed` - Topic defined but not yet approved<br>• `in_progress` - Actively working on thesis<br>• `under_review` - Submitted for committee review<br>• `defended` - Defense completed, pending final approval<br>• `approved` - Thesis accepted and degree conferred<br>• `withdrawn` - Student withdrew from thesis | **Status** |

---

### Thesis Output

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `document_url` — **Document** | *(optional)* Link to thesis document (draft or final) | **Documentation** |
| `artifacts` — **Related Artifacts** | *(optional)* Other outputs produced alongside the thesis (e.g., software, datasets, prototypes) | **Documentation** |

---

### Thesis Notes

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `notes` — **Notes** | Freeform space for context, open questions, or advisory notes | *Flexibility for additional context* |

---

## Part VI: Events

Events are **time-bound gatherings**—seminars, workshops, conferences, open houses, guest lectures, thesis defenses, and other occasions that bring people together around shared purpose. Unlike projects, events are primarily about convening; unlike courses, they are typically singular or irregular rather than recurring on a fixed academic schedule.

Events connect the ecosystem's other entry types: an initiative might host a seminar series, a project might present at a workshop, a course might include a guest lecture, and a thesis defense is itself an event.

### Basic Information

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `id` — **Event ID** | Unique internal identifier (e.g., `event_2026_spring_symposium`) | *Enables tracking and cross-referencing* |
| `title` — **Event Title** | Clear and specific name of the event | *Part of making work visible* |
| `summary` — **Event Summary** | A short paragraph (1–2 sentences) describing the event's purpose and context | *Supports discoverability* |
| `event_type` — **Event Type** | Category of event. One of:<br>• `seminar` - Presentation and discussion<br>• `workshop` - Hands-on collaborative session<br>• `conference` - Multi-session gathering<br>• `open_house` - Public-facing event<br>• `lecture` - Guest or invited talk<br>• `defense` - Thesis or dissertation defense<br>• `review` - Formal project or initiative review<br>• `social` - Community-building gathering<br>• `other` - Events that don't fit other categories | **Classification** |

---

### Purpose and Context

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `purpose` — **Event Purpose** | What is this gathering meant to achieve? What would make it worthwhile? Answers essential prompt #1. | **Intent** |
| `audience` — **Target Audience** | Who should attend? (e.g., "all faculty and students", "project team members", "external partners", "public") Answers essential prompt #2. | **Scope** |
| `related_initiative` — **Related Initiative** | *(optional)* Reference to the initiative this event serves | **Context** (initiative) |
| `related_project` — **Related Project** | *(optional)* Reference to the project this event serves | **Context** (project) |
| `related_course` — **Related Course** | *(optional)* Reference to the course this event is part of | **Context** (course) |

---

### Scheduling

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `date` — **Event Date** | Date of the event (format: `YYYY-MM-DD`) | **Temporal Context** |
| `time` — **Start Time** | *(optional)* Start time (format: `HH:MM`, 24-hour) | **Temporal Context** |
| `duration` — **Duration** | *(optional)* Expected duration (e.g., "2 hours", "full day", "3 days") | **Temporal Context** |
| `location` — **Location** | Where the event takes place. Includes:<br>• `venue`: Physical location or "remote"<br>• `room`: *(optional)* Specific room or space<br>• `remote_url`: *(optional)* Video call or streaming link | **Logistics** |
| `recurring` — **Recurring** | *(optional)* Whether this is a recurring event and its schedule (e.g., "monthly, first Thursday", "weekly during term") | **Temporal Context** |

---

### Event Team

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `organizer` — **Organizer** | The person responsible for planning and running the event. References a person entry in the registry. | **Participants** (authority/accountability) |
| `speakers` — **Speakers/Presenters** | *(optional)* List of people presenting or leading sessions. Each entry includes:<br>• `person_id`: Reference to person in registry (or `external_name` for non-registry participants)<br>• `role`: Role (e.g., "keynote", "panelist", "presenter") | **Participants** (contributors) |
| `expected_attendees` — **Expected Attendees** | *(optional)* Estimated number of attendees or list of invited groups | **Scope** |

---

### Outcomes

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `expected_outcomes` — **Expected Outcomes** | What should result from this event? (e.g., "decision on registry platform", "feedback on draft Charter", "new collaboration identified") Answers essential prompt #4. | **Measurability** |
| `actual_outcomes` — **Actual Outcomes** | *(filled after event)* What actually resulted? Decisions made, actions agreed, connections formed. | **Measurability** (retrospective) |
| `materials` — **Materials** | *(optional)* Links to slides, recordings, notes, or other artifacts from the event | **Documentation** |

---

### Event Status

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `status` — **Event Status** | Current state. Must be one of:<br>• `planned` - Event is scheduled but hasn't occurred<br>• `confirmed` - Event details finalized, invitations sent<br>• `completed` - Event has occurred<br>• `cancelled` - Event was cancelled | **Status** |

---

### Event Context

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `domains` — **Related Domains** | Tags that help map this event to research or practice areas | *Enables overlap/coherence analysis* |

---

### Event Notes

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `notes` — **Notes** | Freeform space for logistics, context, or follow-up items | *Flexibility for additional context* |

---

## Comparison of Entry Types

| | **Projects** | **Initiatives** | **Courses** | **Theses** | **Events** |
| --- | --- | --- | --- | --- | --- |
| **Nature** | Bounded, finite | Ongoing, open-ended | Recurring, structured | Bounded, academic | Time-bound, convening |
| **End condition** | Completion criteria | Deliberate conclusion | End of term/cycle | Defense and approval | Event concludes |
| **Evaluation** | Did it achieve outcomes? | Is it still serving its purpose? | Does it develop promised capabilities? | Quality of contribution and rigor | Did it achieve its convening purpose? |
| **Time horizon** | Defined start and end | No predetermined end | Recurring per cohort | Defined by degree timeline | Specific date(s) |
| **Contains** | Tasks, milestones | Projects, activities | Lectures, assignments | Chapters, research | Sessions, presentations |
| **Key question** | "What would make this complete?" | "Should this continue?" | "What does this develop?" | "What does this contribute?" | "Why gather?" |

---

## Alignment with Charter Principles

This schema implements Section V of the Charter by:

1. **Making work and people visible**: Structured format enables browsing, discovery, and coordination
2. **Shared registry**: Single schema for all Charter-covered institutions prevents fragmentation
3. **Role clarity**: Person records establish clear positioning per Section VI.1
4. **Bounded projects**: Required fields enforce finite, mission-driven scope with completion criteria
5. **Ongoing justification**: Initiative fields ensure programs articulate why they should continue
6. **Measurability with forgiveness**: Success criteria and health indicators support both quantitative and qualitative assessment
7. **Accountability**: Owner, lead, and contributor fields establish clear responsibility
8. **Network visibility**: Cross-references between people, projects, initiatives, courses, theses, and events show how the ecosystem connects
9. **Coordination infrastructure**: Dependencies, domains, and scope boundaries enable overlap/coherence analysis

The schema may evolve through Charter governance processes (Section VII), with changes preserving backward compatibility or providing migration paths for existing entries.
