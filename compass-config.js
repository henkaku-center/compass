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

// Entity type metadata — populated from GET /compass/entity-types on startup.
// Empty fallbacks here; loadEntityTypes() in compass-auth.js fills these.
const registryMeta = {};
const nodeColors = {};

// Default entity types shown in network viz (override with ?show=type1,type2 in URL)
const networkDefaultOn = new Set(['institutions', 'people', 'projects', 'initiatives', 'courses', 'events']);
const networkAllTypes = ['institutions', 'people', 'projects', 'initiatives', 'courses', 'curricula', 'events', 'domains', 'places', 'publications', 'vectors', 'deltas'];

// Pages that get a right-hand document TOC
const docTocPages = ['charter', 'archetypes', 'about', 'status'];

// --- Entity edit form constants ---

var longTextFields = ['background', 'summary', 'purpose', 'ecosystem_role', 'description', 'scope', 'notes', 'mandate'];
// Populated from API; empty fallback
var statusOptionsByType = {};
var editSkipFields = ['portrait', 'type'];

// Array-of-objects item templates (for structural content remaining on entities)
var arrayItemTemplates = {
  links: { type: '', url: '' }
};

// Populated from API; empty fallback
var entityTemplates = {};

// Populated from API; empty fallback
var relationTypesByEntity = {};
