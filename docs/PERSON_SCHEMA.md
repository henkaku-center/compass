# Introduction

The Henkaku Person Schema is a structured framework for documenting participants across the Henkaku community. This schema implements the requirements established in Section III.2 of the Charter (Registry and Coordination Infrastructure).

The Charter mandates a **shared registry** that tracks people, projects, and initiatives. This schema defines what information is captured about people—enabling coordination, collaboration discovery, and network visibility across the ecosystem.

People appear in the registry not as isolated entries but as nodes in a network—connected to projects they lead or contribute to, initiatives they participate in, and other people they collaborate with. This relational view enables the coordination function the registry serves.

The schema captures:

1. *Who is this person and what is their role?*
2. *What expertise and interests do they bring?*
3. *What are they currently working on?*
4. *How can others reach and collaborate with them?*

These questions enable participants to find potential collaborators, understand who is working on what, and see how people relate to projects and initiatives across the ecosystem.

**Relationship to Other Schemas**: People entries connect to [Project Schema](PROJECT_SCHEMA.md) entries (as owners or contributors) and [Initiative Schema](INITIATIVE_SCHEMA.md) entries (as leads, stewards, or participants). The schemas are designed to interoperate, with person IDs referenced in project and initiative records.

# Schema

## Basic Information

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `id` — **Person ID** | Unique internal identifier for the person (e.g., `person_tanaka_yuki`) | *Enables tracking and cross-referencing* |
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
| `affiliations` — **Institutional Affiliations** | List of institutional affiliations. Each entry includes:<br>• `institution`: Institution name (e.g., "Henkaku Center", "SDS", "Chiba Tech")<br>• `department`: *(optional)* Department or unit<br>• `role`: Role within that institution<br>• `primary`: Whether this is the primary affiliation (true/false) | **Roles and Positions** (affiliations) |
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
| `location` — **Location** | *(optional)* Primary work location (e.g., "Tsudanuma Campus", "Remote - Berlin") | **Contact** |
| `availability` — **Collaboration Availability** | General availability for new collaborations. One of:<br>• `available` - Actively seeking collaborations<br>• `limited` - Open to the right opportunity but capacity constrained<br>• `unavailable` - Not taking on new collaborations currently | **Availability** |
| `office_hours` — **Office Hours** | *(optional)* Regular times when the person is available for meetings or drop-ins | **Availability** |
| `preferred_contact` — **Preferred Contact Method** | *(optional)* How the person prefers to be contacted (e.g., "email", "Slack", "schedule via calendar link") | **Contact** |

---

## Status

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `status` — **Status** | Current status in the ecosystem. Must be one of:<br>• `active` - Currently participating<br>• `on_leave` - Temporarily away<br>• `emeritus` - Former active member with ongoing connection<br>• `alumni` - Former participant | **Status** |

---

## Links and Profiles

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `links` — **External Links** | *(optional)* List of external profiles or websites. Each entry includes:<br>• `type`: Type of link (e.g., "website", "orcid", "github", "linkedin")<br>• `url`: URL | *Discoverability* |

---

## Other

| **Field** | **Description** | **Charter Mapping** |
| --- | --- | --- |
| `notes` — **Notes** | *(optional)* Freeform space for additional context | *Flexibility* |

---

# Alignment with Charter Principles

This schema implements Section III.2 of the Charter by:

1. **Making people visible**: Structured format enables discovery of potential collaborators
2. **Role clarity**: Role category and affiliations establish clear positioning per Section V.1
3. **Network visibility**: Project and initiative involvement shows how people connect to work
4. **Coordination support**: Expertise, interests, and availability enable collaboration matching
5. **Shared registry**: Person records link to projects and initiatives across the ecosystem

The schema may evolve through Charter governance processes (Section VI), with changes preserving backward compatibility or providing migration paths for existing entries.

---

# Privacy Considerations

The registry is a coordination tool, not a public directory. Access to person records should be limited to participants in Charter-covered programs. Information included should be:

- **Professionally relevant**: Focused on enabling coordination, not personal details
- **Participant-controlled**: People should be able to update their own records and control visibility of optional fields
- **Appropriately scoped**: Available to those who need it for coordination, not publicly exposed

The principle of **openness with discernment** (Charter Section II.7) applies: transparency within the ecosystem supports coordination, but personal information requires appropriate protection.
