// compass-config.js
// Configuration constants for the Compass single-page app.
// Extracted from index.html to keep routing, navigation, metadata,
// network-graph settings, and entity-edit form definitions in one place.

// Map hash fragments to document paths
const routes = {
  'home': null, // Special case: landing page
  'about': 'README.md',
  'charter': null, // Special case: loaded from Registry API
  'curricula': null, // Registry list page
  'archetypes': 'https://registry.henkaku.center/api/v1/compass/files/docs/ARCHETYPES.md',
  'references': null, // Special case: rendered from data
  'history': null, // Special case: rendered from GitHub API
  'people': null, // Registry list page
  'projects': null, // Registry list page
  'initiatives': null, // Registry list page
  'institutions': null, // Registry list page
  'courses': null, // Registry list page
  'events': null, // Registry list page
  'domains': null, // Registry list page
  'places': null, // Registry list page
  'publications': null, // Registry list page
  'vectors': null, // Registry list page
  'deltas': null, // Registry list page
  'network': null, // Graph visualization page
  'feedback': null, // Feedback submission page
  'contribute': null, // Contribute with AI page
  'contact': null // Contact page
};

// Site map for sidebar navigation (groups + pages)
const siteMap = [
  { key: 'contribute', label: 'Contribute with AI' },
  { group: 'DNA' },
  { key: 'charter', label: 'Charter' },
  { key: 'archetypes', label: 'Archetypes' },
  { group: 'Entities' },
  { key: 'network', label: 'Network' },
  { key: 'people', label: 'People' },
  { key: 'projects', label: 'Projects' },
  { key: 'initiatives', label: 'Initiatives' },
  { key: 'institutions', label: 'Institutions' },
  { key: 'curricula', label: 'Curricula' },
  { key: 'courses', label: 'Courses' },
  { key: 'vectors', label: 'Vectors' },
  { key: 'deltas', label: 'Deltas' },
  { key: 'theses', label: 'Theses', placeholder: true },
  { key: 'posts', label: 'Posts', placeholder: true },
  { key: 'events', label: 'Events' },
  { key: 'publications', label: 'Publications' },
  { key: 'places', label: 'Places' },
  { key: 'domains', label: 'Domains' },
  { group: 'Info' },
  { key: 'about', label: 'About' },
  { key: 'references', label: 'References' },
  { key: 'history', label: 'History' },
  { key: 'feedback', label: 'Feedback' },
  { key: 'contact', label: 'Contact' },
];

// Reference files data (sorted oldest to newest)
const referenceFiles = [
  {
    filename: '20171231_Neri Oxman Krebs Cycle of Creativity.jpeg',
    title: 'Krebs Cycle of Creativity',
    description: 'Neri Oxman diagram: Art, Science, Engineering, Design',
    date: '2017-12-31',
    size: '113 KB'
  },
  {
    filename: '20220329_Research_Report-compressed.pdf',
    title: 'Towards Henaku: Research Report for a Future Design Philosophy',
    description: 'Background research document by Pentagram Design',
    date: '2022-03-31',
    size: '14.6 MB'
  },
  {
    filename: '20240612_GSDS Retreat.pdf',
    title: 'GSDS Retreat: Core DNA Ideas',
    description: 'Presentation by Joi Ito on foundational principles',
    date: '2024-06-12',
    size: '3.9 MB'
  },
  {
    filename: '20240613_SDS_DNA_CheatSheet.png',
    title: 'SDS DNA Cheat Sheet',
    description: 'Visual summary of SDS principles by Ira Winder',
    date: '2024-06-13',
    size: '515 KB'
  },
  {
    filename: '20240705_Curriculum_Whiteboard.pdf',
    title: 'SDS Curriculum (Whiteboard)',
    description: 'SDS curriculum planning document by Ira Winder',
    date: '2024-07-05',
    size: '6.4 MB'
  },
  {
    filename: '20250710_Research_Project_Schema.pdf',
    title: 'Research Project Schema for Henkaku Center',
    description: 'Project definition template (early version) by Ira Winder',
    date: '2025-07-10',
    size: '294 KB'
  },
  {
    filename: '20251009_Ira_PBL_Example.pdf',
    title: 'Antidisciplinary Problem Solving',
    description: 'Example project-based learning course by Ira Winder',
    date: '2025-10-09',
    size: '9.7 MB'
  },
  {
    filename: '20251114_SDS_Open House_Brochure_fin.pdf',
    title: 'SDS Open House Brochure',
    description: 'Graduate School of Design & Science overview',
    date: '2025-11-14',
    size: '1.0 MB'
  },
  {
    filename: '20260203_Teaching AI and Teaching with AI.pdf',
    title: 'Teaching AI and Teaching with AI',
    description: 'Framework for AI pedagogy by Gal Raz & Joseph Austerweil',
    date: '2026-02-03',
    size: '80 KB'
  }
];

// Entity type metadata (singular/plural names, descriptions, colors)
const registryMeta = {
  people: {
    singular: 'Person',
    plural: 'People',
    description: 'Participants in the ecosystem — their roles, domain affinities, affiliations, and project involvement.',
    color: '#e8a0b0'
  },
  projects: {
    singular: 'Project',
    plural: 'Projects',
    description: 'Bounded units of transformation with clear goals, collaborators, and completion criteria.',
    color: '#e8a840'
  },
  initiatives: {
    singular: 'Initiative',
    plural: 'Initiatives',
    description: 'Ongoing programs that spawn and coordinate projects across the ecosystem.',
    color: '#5a6270'
  },
  institutions: {
    singular: 'Institution',
    plural: 'Institutions',
    description: 'Organizations that provide infrastructure, legitimacy, resources, and collaboration.',
    color: '#7a8490'
  },
  courses: {
    singular: 'Course',
    plural: 'Courses',
    description: 'Recurring educational units with learning objectives, credit values, and Charter alignment.',
    color: '#7b68ae'
  },
  events: {
    singular: 'Event',
    plural: 'Events',
    description: 'Time-bound gatherings — symposia, workshops, lectures, and other occasions that bring people together.',
    color: '#c06050'
  },
  domains: {
    singular: 'Domain',
    plural: 'Domains',
    description: 'Knowledge and research areas that map the intellectual landscape of the ecosystem.',
    color: '#999999'
  },
  places: {
    singular: 'Place',
    plural: 'Places',
    description: 'Physical locations where ecosystem activities happen — campuses, coworking spaces, venues, and gathering spots.',
    color: '#2a9d8f'
  },
  publications: {
    singular: 'Publication',
    plural: 'Publications',
    description: 'Peer-reviewed academic works — journal articles, conference papers, book chapters, and reports.',
    color: '#3a7ca5'
  },
  vectors: {
    singular: 'Vector',
    plural: 'Vectors',
    description: 'Directional transformations worth pursuing — aspirational, flexible, connecting energy to purpose.',
    color: '#d4a017'
  },
  deltas: {
    singular: 'Delta',
    plural: 'Deltas',
    description: 'Observable changes — concrete evidence of movement along a vector or within the ecosystem.',
    color: '#17a2b8'
  },
  curricula: {
    singular: 'Curriculum',
    plural: 'Curricula',
    description: 'Degree programs with required and elective coursework, credit requirements, and milestones.',
    color: '#6a4c93'
  }
};

// Network graph colors per entity type
const nodeColors = {
  institutions: '#7a8490',
  people: '#e8a0b0',
  projects: '#e8a840',
  initiatives: '#4a9e6a',
  courses: '#7b68ae',
  events: '#c06050',
  domains: '#999999',
  places: '#2a9d8f',
  publications: '#3a7ca5',
  vectors: '#7ccf9e',
  deltas: '#d4b560',
  curricula: '#6a4c93'
};

// Default entity types shown in network viz (override with ?show=type1,type2 in URL)
const networkDefaultOn = new Set(['institutions', 'people', 'projects', 'initiatives', 'courses', 'events']);
const networkAllTypes = ['institutions', 'people', 'projects', 'initiatives', 'courses', 'curricula', 'events', 'domains', 'places', 'publications', 'vectors', 'deltas'];

// Pages that get a right-hand document TOC
const docTocPages = ['charter', 'archetypes', 'about', 'status'];

// --- Entity edit form constants ---

var longTextFields = ['background', 'summary', 'purpose', 'ecosystem_role', 'description', 'scope', 'notes', 'mandate'];
var statusOptionsByType = {
  people: ['active', 'alumni', 'emeritus'],
  courses: ['planned', 'active', 'archived'],
  events: ['proposed', 'confirmed', 'completed', 'cancelled'],
  projects: ['proposed', 'active', 'paused', 'completed'],
  initiatives: ['active', 'paused', 'completed'],
  institutions: ['active', 'inactive'],
  domains: ['active', 'inactive'],
  places: ['active', 'inactive'],
  publications: ['draft', 'submitted', 'in_review', 'accepted', 'published']
};
var editSkipFields = ['portrait', 'type'];

// Array-of-objects item templates (for structural content remaining on entities)
var arrayItemTemplates = {
  links: { type: '', url: '' }
};

// Blank entity templates for "Add New"
var entityTemplates = {
  people: {
    id: '', type: 'person', name: '', name_ja: '', status: 'active', role_categories: [],
    job_title: '', email: '',
    background: '', links: [], notes: ''
  },
  projects: {
    id: '', type: 'project', name: '', status: 'proposed', summary: '', domains: [],
    project_goals: [], links: [], notes: ''
  },
  initiatives: {
    id: '', type: 'initiative', name: '', status: 'active', summary: '', purpose: '', domains: [],
    activities: [], health_indicators: [], review_cycle: '', links: [], notes: ''
  },
  institutions: {
    id: '', type: 'institution', name: '', name_ja: '', short_name: '', status: 'active',
    institution_type: '', summary: '', ecosystem_role: '', mandate: '',
    capabilities: [], domains: [], links: [], notes: ''
  },
  courses: {
    id: '', type: 'course', name: '', short_name: '', status: 'planned', summary: '',
    credits: 2, program: [], charter_alignment: [], domains: [], notes: ''
  },
  events: {
    id: '', type: 'event', name: '', status: 'proposed', summary: '', event_type: '',
    purpose: '', audience: '', date: '', time: '', duration: '', domains: [],
    expected_outcomes: [], notes: ''
  },
  domains: {
    id: '', type: 'domain', name: '', status: 'active', summary: '', notes: ''
  },
  places: {
    id: '', type: 'place', name: '', status: 'active', summary: '', place_type: '',
    address: '', website: '', notes: ''
  },
  publications: {
    id: '', type: 'publication', name: '', status: 'published', summary: '',
    publication_type: '', venue: '', published_date: '', doi: '', url: '',
    domains: [], notes: ''
  },
  vectors: {
    id: '', type: 'vector', name: '', status: 'active', summary: '',
    from: '', toward: '', domains: [], notes: ''
  },
  deltas: {
    id: '', type: 'delta', name: '', status: 'observed', summary: '',
    from: '', toward: '', observed_date: '', domains: [], notes: ''
  },
  curricula: {
    id: '', type: 'curriculum', name: '', name_ja: '', short_name: '', status: 'active',
    summary: '', credit_requirement: 0, mandatory_credits: 0, elective_credits: 0,
    duration: '', degree: '', institution: '', school: '', content: '', notes: ''
  }
};

// Relation types available per entity type for the relation editor
var relationTypesByEntity = {
  people: [
    { type: 'affiliated', targetTypes: ['institutions'], label: 'Affiliated with' },
    { type: 'owner', targetTypes: ['projects'], label: 'Owner of' },
    { type: 'contributor', targetTypes: ['projects'], label: 'Contributor to' },
    { type: 'owner', targetTypes: ['initiatives'], label: 'Owner of' },
    { type: 'participant', targetTypes: ['initiatives'], label: 'Participant in' },
    { type: 'teaches', targetTypes: ['courses'], label: 'Teaches' },
    { type: 'organizes', targetTypes: ['events'], label: 'Organizes' },
    { type: 'speaks_at', targetTypes: ['events'], label: 'Speaks at' },
    { type: 'exhibits_at', targetTypes: ['events'], label: 'Exhibits at' },
    { type: 'has_affinity_for', targetTypes: ['domains'], label: 'Has affinity for' },
    { type: 'authored', targetTypes: ['publications'], label: 'Author of' },
    { type: 'pursues', targetTypes: ['vectors'], label: 'Pursues' },
    { type: 'produces', targetTypes: ['deltas'], label: 'Produces' }
  ],
  projects: [
    { type: 'depends_on', targetTypes: ['projects'], label: 'Depends on' }
  ],
  initiatives: [
    { type: 'spawned', targetTypes: ['projects'], label: 'Spawned project' },
    { type: 'contains', targetTypes: ['projects'], label: 'Contains project' },
    { type: 'partner', targetTypes: ['institutions'], label: 'Partner' }
  ],
  institutions: [
    { type: 'hosts', targetTypes: ['projects', 'initiatives', 'institutions', 'events'], label: 'Hosts' },
    { type: 'parent', targetTypes: ['institutions'], label: 'Parent of' },
    { type: 'partner', targetTypes: ['institutions'], label: 'Partner' }
  ],
  courses: [
    { type: 'has_prerequisite', targetTypes: ['courses'], label: 'Has prerequisite' },
    { type: 'related', targetTypes: ['courses'], label: 'Related to' }
  ],
  events: [
    { type: 'partner', targetTypes: ['institutions'], label: 'Partner' }
  ],
  domains: [],
  places: [
    { type: 'located_at', targetTypes: ['institutions'], label: 'Located at' }
  ],
  publications: [
    { type: 'related', targetTypes: ['projects', 'initiatives'], label: 'Related to' }
  ],
  vectors: [
    { type: 'aligns_with', targetTypes: ['vectors'], label: 'Aligns with' },
    { type: 'composed_of', targetTypes: ['deltas'], label: 'Composed of' },
    { type: 'related', targetTypes: ['initiatives', 'projects', 'domains'], label: 'Related to' }
  ],
  deltas: [
    { type: 'evidences', targetTypes: ['vectors'], label: 'Evidences' },
    { type: 'related', targetTypes: ['projects', 'courses', 'deltas'], label: 'Related to' }
  ],
  curricula: [
    { type: 'requires', targetTypes: ['courses'], label: 'Requires (mandatory)' },
    { type: 'accepts', targetTypes: ['courses'], label: 'Accepts (elective)' },
    { type: 'related', targetTypes: ['institutions'], label: 'Related to' }
  ]
};
