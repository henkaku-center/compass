# Charter Platform Progress Update

**Last Updated: February 5, 2026** (evening)

Since our January meeting, we've made substantial progress on building the Charter as a living document:

## What We've Accomplished

**Charter Structure**
- Created a clear template showing what belongs in each section
- Completed the 12 foundational principles (in English and Japanese)
- Organized the Charter into 8 main sections (recently split Research and Educational Practice into separate sections)
- Added guidance notes throughout explaining what content should go in each part

**Charter Content Development**
- Drafted comprehensive AI pedagogy framework for Educational Practice section
- Two-pillar approach: Teaching AI (workflow literacy) and Teaching with AI (developing human judgment)
- Emphasizes problem posing over problem solving
- Assessment focuses on judgment and questions, not just answers
- Based on "Teaching AI and Teaching with AI" by Gal Raz & Joseph Austerweil
- Added Roles and Positions section defining categories of people in the ecosystem: Director, Faculty, Principal Researchers, Researchers, Staff, Visiting Researchers, and Affiliates
- Clarified that faculty simultaneously function as principal researchers, reflecting integration of education and research
- Added physical presence expectations: in-person activities should primarily be at Tsudanuma Campus, with off-campus/remote permissible when justified
- Added neurodiversity commitment: respect for different modes of thinking, feeling, and collaborating; emphasis on making implicit expectations explicit so people don't have to guess at unstated rules
- Added human flourishing as explicit aim of transformation (Section II.2)
- Added awareness practices and contemplative traditions as educational resources (Section II.6)
- Added vocational orientation and unity of function/design principles (Section IV.2)
- Added curriculum agility requirement—programs must iterate with AI advances (Section IV.3)
- Added metacognitive development—learning to recognize AI failures (Section IV.3)
- Added industry integration model with joint supervision expectations (Section V.5)
- Added "Resisting Reduction" principle—embracing complexity, questioning quantification (Section II.4)
- Added "Data Humanism" research methodology—warm data, context, human fingerprints on data (Section III.1)
- Added "Non-Antagonistic Engagement"—future-oriented optimism, invitation over coercion (Section VI.3)
- Added "Process as Content"—visible craft, kintsugi principle, tacit knowledge (Section IV.2)
- Added "Balancing Dichotomies"—six productive tensions defining institutional character (Section I)
- Added "Uniqueness" principle—if someone else can do it, we shouldn't (Section III.1)
- Added "Bias Toward Action"—the art of getting things done (Section IV.2)
- Added "Magic"—valuing what escapes measurement (Section II.4)
- Revised Section II.3 (Human and AI) to emphasize symbiosis and collaboration, not just constraints
- Renamed Section II.4 to "Complexity and Magic" (was "Intellectual Integrity")
- Added new Section II.5 "Intellectual Integrity" with antidisciplinary-specific obligations: intellectual humility, honest engagement with other fields, attribution, calibrated claims, collaboration integrity
- Added "Global Institution, Japanese Roots" with key Japanese concepts (*wa*, *ma*, *aimai*, *wabi-sabi*, *monozukuri*) and global/local integration framing
- Split Section II.7 into two focused sections:
  - II.7 "Neurodiversity and Inclusion" (accessibility and cognitive diversity)
  - II.8 "Cultural Identity and Global Orientation" (Japanese context + global engagement)
- Section II now has 10 subsections
- Added explanations to all 12 foundational orientations (Section I)
- Added "In practice" explanations to all 6 balancing dichotomies (Section I)
- Simplified Section III.2 (Registry) from ~80 lines to ~30 lines—moved detailed specifications to REGISTRY_SCHEMA.md

**Curriculum Documentation**
- Created CURRICULUM.md documenting SDS Master's and PhD programs
- Master's program: 30 credits (5 mandatory courses, 9 elective options)
- PhD program: 17 credits (6 mandatory courses, 5 advanced electives)
- Mapped curriculum to Charter principles (project-centered learning, antidisciplinarity, awareness practices, human-AI collaboration, ethical grounding)

**Charter Draft Ready for Review (February 4-5, 2026)**
- All sections now contain full text—no placeholder notes remain
- Converted 17 placeholder sections to full Charter text:
  - Preamble: scope, applicability, what Charter is not, living document nature
  - II.1 Antidisciplinarity: definition, distinction from inter/transdisciplinary
  - II.3 Human and Artificial Intelligence: symbiosis, accountability in partnership, designing for collaboration, boundaries
  - II.6 Experimentation and Risk: legitimacy of failure, boundaries
  - II.9 Openness with Discernment: when transparency vs. confidentiality
  - II.10 Coordination as Design Problem: failure modes to avoid
  - IV.1 Project-Centered Learning: projects as learning unit, student agency
  - V.2 Chiba Tech: host institution framing, operating within constraints
  - V.3 Henkaku/SDS: distinct but coupled entities, different functions
  - V.4 Boundary Management: context-dependent roles, authority transfer
  - VI.1 Charter Stewardship: who proposes changes, review process
  - VI.2 Decision-Making Principles: horizontal authority, decentralized governance
  - VII.1 Living Nature: versioning, revision conditions, deprecation
  - VII.2 Portability and Reuse: forking vs adoption, derivative obligations
  - VIII.1 Authority and Interpretation: no legal authority but influences culture; Chiba Tech policy takes precedence; authorizes project registry and curriculum
  - VIII.2 Ratification and Acknowledgement: formal agreement required; initial ratification by Director + seven founding faculty
  - Appendices: framing for future additions (glossary, historical notes, case studies, experimental mechanisms)
- Removed all HTML comment placeholders—the draft is now ready for review by ratifying members
- Added English language policy for SDS (V.3)
- Distinguished between "projects" (bounded, with completion criteria) and "initiatives" (ongoing programs)

**Registry and Coordination Infrastructure**
- Added a Charter section (III.2) requiring a shared registry for people, projects, and initiatives
- Registry must be shared across all Charter-covered organizations—not fragmented
- Created unified Registry Schema (REGISTRY_SCHEMA.md) with three interoperating parts:
  - People: participants with roles, expertise, affiliations, and involvement
  - Projects: bounded endeavors with completion criteria
  - Initiatives: ongoing programs with review cycles
- Schema is portable—no organization-specific references, can be adopted by other Charter users
- All three parts cross-reference each other for network visibility
- Essential questions ground each entry type:
  - People: Who are they? What do they know? What are they working on? How to reach them?
  - Projects: What problem? What will change? How measure success? What makes it complete?
  - Initiatives: What ongoing purpose? What activities? Still serving purpose? What projects spawned?

**Website for Viewing Documents**
- Built a simple website where people can read the Charter
- Made the guidance notes visible (they show up in light gray)
- Added the project template to the website
- Organized files so it's easy to find what you need
- Added direct linking - can share URLs that go straight to specific pages
- Added social media preview cards for sharing on Twitter, Facebook, etc.

**Consensus Mechanism Design**
- Drafted user stories describing how people will interact with the Charter
- Designed data structure for tracking proposals, reviews, and decisions
- Laid groundwork for formal approval process

**Documentation**
- Updated the overview to explain how everything is organized
- Created instructions for people helping with this work
- Documented how we track changes over time
- Added this status page to track progress for non-technical stakeholders
- Comprehensive guide for AI assistants working on this project

## What Still Needs Work

**Charter Review and Ratification**
- Draft text is ready for review by the Director and seven founding faculty
- Ratifying members should review, propose changes, and reach consensus
- Once ratified, the Charter becomes the governing framework

**Amendment Proposal System**
- Need to build a system for proposing and reviewing Charter amendments
- Data structure and user stories drafted, but not yet implemented
- Need to finalize: how proposals are submitted, reviewed, and approved

**Registry Platform**
- We have the schema for how to describe people, projects, and initiatives
- We don't yet have a place where people can actually submit and browse registry entries
- Could be as simple as a spreadsheet or as complex as custom software
- Needs to support the interoperating structure (people linked to their projects/initiatives)

## Questions to Discuss

1. **How should ratifying members review the draft?** What's the process for the Director and founding faculty to review, comment on, and propose changes to the draft before ratification?

2. **What does the amendment system need?** How should people propose changes after ratification? What approval process makes sense?

3. **Where does the registry live?** Should we use something like Google Sheets, Airtable, or build something custom for people to submit and browse people, projects, and initiatives?

4. **When do we aim to ratify?** What timeline makes sense for review and ratification?

The Charter draft is ready for review. We also need to build the system for proposing amendments.

---

## Reference: Original Planning (January 2026)

From our January meeting, the tasks were:
- Finalize the consensus mechanism
- Finalize the charter content (second draft)
- Finalize list of design specifications for the charter platform
- Identify supporting tools for implementation

Note: "finalize" meant having a first pass ready. The charter platform is designed for revision and updating over time as context changes.
