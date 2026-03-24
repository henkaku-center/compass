/**
 * Compass Data Layer
 *
 * Unified store for entities and relations. Loaded by index.html.
 * Provides entity CRUD, relation management, generic graph building,
 * and generic relation rendering.
 */

// --- Relation type vocabulary ---

const RELATION_TYPES = {
  // Person → entity
  owner:            { inverse: 'owned_by',        label: 'Owner',          inverseLabel: 'Owned by' },
  owned_by:         { inverse: 'owner',           label: 'Owned by',       inverseLabel: 'Owner' },
  contributor:      { inverse: 'has_contributor',  label: 'Contributor',    inverseLabel: 'Has contributor' },
  has_contributor:  { inverse: 'contributor',      label: 'Has contributor',inverseLabel: 'Contributor' },
  participant:      { inverse: 'has_participant',  label: 'Participant',    inverseLabel: 'Has participant' },
  has_participant:  { inverse: 'participant',      label: 'Has participant',inverseLabel: 'Participant' },
  affiliated:       { inverse: 'has_affiliate',    label: 'Affiliated with',inverseLabel: 'Has affiliate' },
  has_affiliate:    { inverse: 'affiliated',       label: 'Has affiliate',  inverseLabel: 'Affiliated with' },
  teaches:          { inverse: 'taught_by',        label: 'Teaches',        inverseLabel: 'Taught by' },
  taught_by:        { inverse: 'teaches',          label: 'Taught by',      inverseLabel: 'Teaches' },
  supports:         { inverse: 'supported_by',     label: 'Supports',       inverseLabel: 'Supported by' },
  supported_by:     { inverse: 'supports',          label: 'Supported by',   inverseLabel: 'Supports' },
  guest_lectures:   { inverse: 'has_guest_lecturer', label: 'Guest lectures', inverseLabel: 'Has guest lecturer' },
  has_guest_lecturer: { inverse: 'guest_lectures',   label: 'Has guest lecturer', inverseLabel: 'Guest lectures' },
  advises:          { inverse: 'advised_by',       label: 'Advises',        inverseLabel: 'Advised by' },
  advised_by:       { inverse: 'advises',          label: 'Advised by',     inverseLabel: 'Advises' },
  directs:          { inverse: 'directed_by',      label: 'Directs',        inverseLabel: 'Directed by' },
  directed_by:      { inverse: 'directs',          label: 'Directed by',    inverseLabel: 'Directs' },
  organizes:        { inverse: 'organized_by',     label: 'Organizes',      inverseLabel: 'Organized by' },
  organized_by:     { inverse: 'organizes',        label: 'Organized by',   inverseLabel: 'Organizes' },
  speaks_at:        { inverse: 'has_speaker',      label: 'Speaks at',      inverseLabel: 'Has speaker' },
  has_speaker:      { inverse: 'speaks_at',        label: 'Has speaker',    inverseLabel: 'Speaks at' },
  exhibits_at:      { inverse: 'has_exhibitor',    label: 'Exhibits at',    inverseLabel: 'Has exhibitor' },
  has_exhibitor:    { inverse: 'exhibits_at',      label: 'Has exhibitor',  inverseLabel: 'Exhibits at' },
  authored:         { inverse: 'authored_by',      label: 'Authored',       inverseLabel: 'Authored by' },
  authored_by:      { inverse: 'authored',         label: 'Authored by',    inverseLabel: 'Authored' },
  // Entity → entity
  hosts:            { inverse: 'hosted_by',        label: 'Hosts',          inverseLabel: 'Hosted by' },
  hosted_by:        { inverse: 'hosts',            label: 'Hosted by',      inverseLabel: 'Hosts' },
  spawned:          { inverse: 'spawned_by',       label: 'Spawned',        inverseLabel: 'Spawned by' },
  spawned_by:       { inverse: 'spawned',          label: 'Spawned by',     inverseLabel: 'Spawned' },
  parent:           { inverse: 'child',            label: 'Parent of',      inverseLabel: 'Child of' },
  child:            { inverse: 'parent',           label: 'Child of',       inverseLabel: 'Parent of' },
  depends_on:       { inverse: 'dependency_of',    label: 'Depends on',     inverseLabel: 'Dependency of' },
  dependency_of:    { inverse: 'depends_on',       label: 'Dependency of',  inverseLabel: 'Depends on' },
  has_prerequisite: { inverse: 'prerequisite_of',  label: 'Has prerequisite',inverseLabel: 'Prerequisite of' },
  prerequisite_of:  { inverse: 'has_prerequisite', label: 'Prerequisite of',inverseLabel: 'Has prerequisite' },
  // Place relations
  located_at:       { inverse: 'location_of',      label: 'Located at',     inverseLabel: 'Location of' },
  location_of:      { inverse: 'located_at',        label: 'Location of',    inverseLabel: 'Located at' },
  has_affinity_for: { inverse: 'affinity_of',        label: 'Has affinity for', inverseLabel: 'Affinity of' },
  affinity_of:      { inverse: 'has_affinity_for',  label: 'Affinity of',    inverseLabel: 'Has affinity for' },
  // Vector & delta relations
  pursues:          { inverse: 'pursued_by',       label: 'Pursues',        inverseLabel: 'Pursued by' },
  pursued_by:       { inverse: 'pursues',          label: 'Pursued by',     inverseLabel: 'Pursues' },
  evidences:        { inverse: 'evidenced_by',     label: 'Evidences',      inverseLabel: 'Evidenced by' },
  evidenced_by:     { inverse: 'evidences',        label: 'Evidenced by',   inverseLabel: 'Evidences' },
  aligns_with:      { inverse: 'aligns_with',      label: 'Aligns with',    inverseLabel: 'Aligns with' },
  composed_of:      { inverse: 'component_of',     label: 'Composed of',    inverseLabel: 'Component of' },
  component_of:     { inverse: 'composed_of',      label: 'Component of',   inverseLabel: 'Composed of' },
  produces:         { inverse: 'produced_by',       label: 'Produces',       inverseLabel: 'Produced by' },
  produced_by:      { inverse: 'produces',          label: 'Produced by',    inverseLabel: 'Produces' },
  // Curriculum → course
  requires:         { inverse: 'required_by',      label: 'Requires',       inverseLabel: 'Required by' },
  required_by:      { inverse: 'requires',         label: 'Required by',    inverseLabel: 'Requires' },
  accepts:          { inverse: 'accepted_by',      label: 'Accepts',        inverseLabel: 'Accepted by' },
  accepted_by:      { inverse: 'accepts',          label: 'Accepted by',    inverseLabel: 'Accepts' },
  // Symmetric
  partner:          { inverse: 'partner',          label: 'Partner',        inverseLabel: 'Partner' },
  related:          { inverse: 'related',          label: 'Related',        inverseLabel: 'Related' },
};

// Type plural → singular mapping
const TYPE_FILE_MAP = {
  person: 'people',
  project: 'projects',
  initiative: 'initiatives',
  institution: 'institutions',
  course: 'courses',
  event: 'events',
  domain: 'domains',
  place: 'places',
  publication: 'publications',
  vector: 'vectors',
  delta: 'deltas',
  curriculum: 'curricula',
};

const TYPE_FROM_PLURAL = {};
Object.entries(TYPE_FILE_MAP).forEach(([singular, plural]) => {
  TYPE_FROM_PLURAL[plural] = singular;
});

// --- Store ---

const store = {
  entities: {},    // id → entity
  relations: [],   // array of {source, target, type, meta?}
  byType: {},      // plural type → [entity, ...]
  _dirty: new Set(), // track which file types have been modified
};

// --- API ↔ Frontend transforms ---

// API entity {id, type, name, data: {…}} → flat frontend entity {id, type, name, short_name, …}
function flattenEntity(apiEntity) {
  const { id, type, name, data, created_at, updated_at } = apiEntity;
  return { id, type, name, ...data };
}

// Flat frontend entity → API create payload {id, type, name, data: {…}}
function unflattenEntityForCreate(flat) {
  const { id, type, name, ...rest } = flat;
  return { id, type, name, data: rest };
}

// Flat frontend entity → API update payload {name, data: {…}}
function unflattenEntityForUpdate(flat) {
  const { id, type, name, ...rest } = flat;
  return { name, data: rest };
}

// API relation {id, source_id, target_id, type, meta} → frontend {source, target, type, meta, _apiId}
function flattenRelation(apiRel) {
  const rel = { source: apiRel.source_id, target: apiRel.target_id, type: apiRel.type, _apiId: apiRel.id };
  if (apiRel.meta) rel.meta = apiRel.meta;
  return rel;
}

// Frontend relation → API create payload {source_id, target_id, type, meta}
function unflattenRelationForCreate(rel) {
  const out = { source_id: rel.source, target_id: rel.target, type: rel.type };
  if (rel.meta && Object.keys(rel.meta).length > 0) out.meta = rel.meta;
  return out;
}

// Resolve portrait URL: handles API-stored portraits/ paths
function resolvePortraitUrl(entity, apiClient) {
  const p = entity && entity.portrait;
  if (!p) return 'compass-icon.png';
  // Full URL — pass through
  if (p.startsWith('http://') || p.startsWith('https://')) return p;
  // API-stored paths like "portraits/person_xyz.png" — build full API URL
  if (apiClient && p.startsWith('portraits/')) {
    return `${apiClient.baseUrl}/api/v1/compass/entities/${entity.id}/files/${p.replace('portraits/', '')}`;
  }
  return p;
}

// --- Loading ---

async function loadStore(apiClient) {
  // Clear store
  store.entities = {};
  store.relations = [];
  store.byType = {};
  store._dirty.clear();

  if (apiClient) {
    // Fetch from Registry API
    const [apiEntities, apiRelations] = await Promise.all([
      apiClient.getEntities(),
      apiClient.getRelations(),
    ]);

    apiEntities.forEach(ae => {
      const entity = flattenEntity(ae);
      store.entities[entity.id] = entity;
      const plural = TYPE_FILE_MAP[entity.type];
      if (plural) {
        if (!store.byType[plural]) store.byType[plural] = [];
        store.byType[plural].push(entity);
      }
    });

    store.relations = apiRelations.map(flattenRelation);
  }

  return store;
}

// --- Entity API ---

function getEntity(id) {
  return store.entities[id] || null;
}

function listEntities(typePlural, filterFn) {
  const list = store.byType[typePlural] || [];
  const filtered = filterFn ? list.filter(filterFn) : [...list];
  // Randomize people; alphabetize everything else
  if (typePlural === 'people') shuffle(filtered);
  else filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  return filtered;
}

function addEntity(entity) {
  if (!entity.id || !entity.type) throw new Error('Entity must have id and type');
  if (store.entities[entity.id]) throw new Error(`Entity ${entity.id} already exists`);
  store.entities[entity.id] = entity;
  const plural = TYPE_FILE_MAP[entity.type];
  if (!plural) throw new Error(`Unknown entity type: ${entity.type}`);
  if (!store.byType[plural]) store.byType[plural] = [];
  store.byType[plural].push(entity);
  store._dirty.add(plural);
}

function updateEntity(id, changes) {
  const entity = store.entities[id];
  if (!entity) throw new Error(`Entity ${id} not found`);
  if (changes.id && changes.id !== id) throw new Error('Cannot change entity id');
  if (changes.type && changes.type !== entity.type) throw new Error('Cannot change entity type');
  Object.assign(entity, changes);
  const plural = TYPE_FILE_MAP[entity.type];
  if (plural) store._dirty.add(plural);
}

function removeEntity(id) {
  const entity = store.entities[id];
  if (!entity) return;
  const plural = TYPE_FILE_MAP[entity.type];
  delete store.entities[id];
  if (plural && store.byType[plural]) {
    store.byType[plural] = store.byType[plural].filter(e => e.id !== id);
    store._dirty.add(plural);
  }
  // Remove all relations involving this entity
  store.relations = store.relations.filter(r => r.source !== id && r.target !== id);
  store._dirty.add('_relations');
}

// --- Relation API ---

function addRelation(source, target, type, meta) {
  if (!store.entities[source]) throw new Error(`Source entity ${source} not found`);
  if (!store.entities[target]) throw new Error(`Target entity ${target} not found`);
  if (!RELATION_TYPES[type]) throw new Error(`Unknown relation type: ${type}`);

  // Deduplicate (include meta to allow multiple relations with different metadata)
  const metaKey = meta ? JSON.stringify(meta) : '';
  const exists = store.relations.some(r =>
    r.source === source && r.target === target && r.type === type &&
    (r.meta ? JSON.stringify(r.meta) : '') === metaKey
  );
  if (exists) return;

  const rel = { source, target, type };
  if (meta && Object.keys(meta).length > 0) rel.meta = meta;
  store.relations.push(rel);
  store._dirty.add('_relations');
}

function removeRelation(source, target, type) {
  const before = store.relations.length;
  store.relations = store.relations.filter(r =>
    !(r.source === source && r.target === target && r.type === type)
  );
  if (store.relations.length !== before) {
    store._dirty.add('_relations');
  }
}

function getRelated(id, opts) {
  const results = [];
  const seen = new Set();
  const filterType = opts && opts.type;
  const filterTargetType = opts && opts.targetType;

  store.relations.forEach(r => {
    let entity, relationType, direction, meta;

    if (r.source === id) {
      entity = store.entities[r.target];
      relationType = r.type;
      direction = 'outgoing';
      meta = r.meta;
    } else if (r.target === id) {
      entity = store.entities[r.source];
      // Use the inverse relation type
      const typeInfo = RELATION_TYPES[r.type];
      relationType = typeInfo ? typeInfo.inverse : r.type;
      direction = 'incoming';
      meta = r.meta;
    } else {
      return;
    }

    if (!entity) return;
    if (filterType && relationType !== filterType) return;
    if (filterTargetType && entity.type !== TYPE_FROM_PLURAL[filterTargetType] && entity.type !== filterTargetType) return;

    // Deduplicate: same entity + relation type + meta
    const metaKey = meta ? JSON.stringify(meta) : '';
    const key = `${entity.id}:${relationType}:${metaKey}`;
    if (seen.has(key)) return;
    seen.add(key);

    results.push({ entity, relationType, direction, meta });
  });

  return results;
}

// --- Display helpers ---

function getEntityDisplay(id) {
  const entity = store.entities[id];
  if (!entity) return id;
  return entity.short_name || entity.name || id;
}

function getEntityFullDisplay(id) {
  const entity = store.entities[id];
  if (!entity) return id;
  if (entity.short_name && !(entity.name || '').includes(`(${entity.short_name})`)) return `${entity.name} (${entity.short_name})`;
  return entity.name || id;
}

function getRelationLabel(relationType) {
  const info = RELATION_TYPES[relationType];
  return info ? info.label : relationType.replace(/_/g, ' ');
}

// --- URL slug helpers ---
// Strip type prefix from IDs for cleaner URLs
// e.g. "proj_compass" → "compass", "person_irawinder" → "irawinder"

const ID_PREFIXES = {
  people: 'person_',
  projects: 'proj_',
  initiatives: 'init_',
  institutions: 'inst_',
  courses: 'course_',
  events: 'event_',
  domains: 'domain_',
  places: 'place_',
  publications: 'pub_',
  vectors: 'vec_',
  deltas: 'delta_',
  curricula: 'curriculum_'
};

function entitySlug(type, id) {
  const prefix = ID_PREFIXES[type];
  return (prefix && id.startsWith(prefix)) ? id.slice(prefix.length) : id;
}

function entityHref(type, id) {
  return '#' + type + '/' + entitySlug(type, id);
}

// Build href from just an entity ID (looks up type from store)
function entityHrefById(id) {
  const entity = store.entities[id];
  if (!entity) return '#';
  const plural = TYPE_FILE_MAP[entity.type] || entity.type;
  return entityHref(plural, id);
}

// Build an <a> tag linking to an entity's detail page
function entityLink(id, displayText) {
  const text = displayText || getEntityFullDisplay(id);
  const href = entityHrefById(id);
  return `<a href="${href}">${text}</a>`;
}

// Short display variant for card summaries
function entityLinkShort(id) {
  const text = getEntityDisplay(id);
  const href = entityHrefById(id);
  return `<a href="${href}">${text}</a>`;
}

// --- Dirty tracking for commits ---

function getModifiedFiles() {
  const files = [];
  store._dirty.forEach(t => {
    if (t === '_relations') {
      files.push('data/relations.json');
    } else {
      files.push(`data/${t}.json`);
    }
  });
  return files;
}

function clearDirty() {
  store._dirty.clear();
}

// --- Generic graph builder ---

function buildGraphData() {
  const nodes = [];
  const links = [];
  const nodeIds = new Set();

  // Build nodes from all entities
  Object.values(store.entities).forEach(entity => {
    // Skip inactive people
    if (entity.type === 'person' && entity.status && entity.status !== 'active') return;

    const typePlural = TYPE_FILE_MAP[entity.type] || entity.type;
    nodeIds.add(entity.id);
    nodes.push({
      id: entity.id,
      label: entity.short_name || entity.name || entity.id,
      type: typePlural,
      raw: entity,
      val: 2
    });
  });

  // Build links from all relations
  const edgeSet = new Set();
  store.relations.forEach(r => {
    if (!nodeIds.has(r.source) || !nodeIds.has(r.target)) return;
    const key = `${r.source}->${r.target}:${r.type}`;
    if (edgeSet.has(key)) return;
    edgeSet.add(key);
    links.push({
      source: r.source,
      target: r.target,
      label: r.type.replace(/_/g, ' ')
    });
  });

  // Synthesize domain links from data.domains arrays (name-matched to domain entities)
  const domainByName = {};
  Object.values(store.entities).forEach(e => {
    if (e.type === 'domain') domainByName[e.name.toLowerCase()] = e.id;
  });
  Object.values(store.entities).forEach(entity => {
    if (!entity.domains || !Array.isArray(entity.domains) || entity.type === 'domain') return;
    if (!nodeIds.has(entity.id)) return;
    entity.domains.forEach(d => {
      const domainId = domainByName[d.toLowerCase()];
      if (!domainId || !nodeIds.has(domainId)) return;
      const key = `${entity.id}->${domainId}:has_affinity_for`;
      if (edgeSet.has(key)) return;
      edgeSet.add(key);
      links.push({ source: entity.id, target: domainId, label: 'has affinity for' });
    });
  });

  return { nodes, links };
}

// Render domain strings as links when they match domain entities, plain text otherwise
function renderDomainLinks(domains) {
  if (!domains || !Array.isArray(domains)) return '';
  const domainByName = {};
  Object.values(store.entities).forEach(e => {
    if (e.type === 'domain') domainByName[e.name.toLowerCase()] = e.id;
  });
  return domains.map(d => {
    const domainId = domainByName[d.toLowerCase()];
    if (domainId) return `<a href="${entityHref('domains', domainId)}">${d}</a>`;
    return d;
  }).join(', ');
}

// Format role strings: convert snake_case to Title Case, pass through already-formatted roles
function formatRole(role) {
  if (!role) return role;
  if (role.includes('_')) return role.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return role;
}

// --- Generic relation renderer ---

// Fisher-Yates shuffle (in-place)
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const RANDOM_ORDER_NOTE = `<p style="font-size:12px;color:#5A5A5A;margin-top:4px;">&middot; <a href="https://doi.org/10.1257/aer.20161492" style="color:#5A5A5A;">random name order</a></p>`;
const RANDOM_ORDER_NOTE_INLINE = `<span style="font-size:11px;color:#5A5A5A;">(<a href="https://doi.org/10.1257/aer.20161492" style="color:#5A5A5A;">names presented in random order</a>)</span>`;

function renderRelationsHtml(entityId) {
  const related = getRelated(entityId);
  if (related.length === 0) return '';

  // Group by relation type
  const groups = {};
  related.forEach(({ entity, relationType, meta }) => {
    if (!groups[relationType]) groups[relationType] = [];
    groups[relationType].push({ entity, meta });
  });

  let html = '';
  Object.entries(groups).forEach(([relType, items]) => {
    // Separate people from non-people; shuffle people, alphabetize the rest
    const people = items.filter(i => i.entity.type === 'person');
    const nonPeople = items.filter(i => i.entity.type !== 'person');
    const isMultiPeople = people.length > 1;
    if (isMultiPeople) shuffle(people);
    nonPeople.sort((a, b) => (a.entity.name || '').localeCompare(b.entity.name || ''));
    const sorted = [...people, ...nonPeople];
    const label = getRelationLabel(relType);
    const itemStrs = sorted.map(({ entity, meta }) => {
      let display = entityLinkShort(entity.id);
      if (meta && meta.role) display += ` (${formatRole(meta.role)})`;
      return display;
    });
    if (html) html += '<br>';
    html += `<strong>${label}:</strong> ${itemStrs.join(', ')}`;
    if (isMultiPeople) html += ` ${RANDOM_ORDER_NOTE_INLINE}`;
  });
  return html;
}

// Render detailed relations for entity detail view
// Optional excludeTypes: array of relation types to skip (e.g. ['has_affinity_for'])
function renderRelationsDetailHtml(entityId, excludeTypes) {
  const related = getRelated(entityId);
  if (related.length === 0) return '';

  // Group by relation type
  const groups = {};
  related.forEach(({ entity, relationType, meta }) => {
    if (excludeTypes && excludeTypes.includes(relationType)) return;
    if (!groups[relationType]) groups[relationType] = [];
    groups[relationType].push({ entity, meta });
  });

  // Sort relation groups: teaching relations first for courses
  const priorityTypes = ['taught_by', 'supported_by', 'has_guest_lecturer'];
  const sortedEntries = Object.entries(groups).sort(([a], [b]) => {
    const aIdx = priorityTypes.indexOf(a);
    const bIdx = priorityTypes.indexOf(b);
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return 0;
  });

  let html = '';
  sortedEntries.forEach(([relType, items]) => {
    // Separate people from non-people; shuffle people, alphabetize the rest
    const people = items.filter(i => i.entity.type === 'person');
    const nonPeople = items.filter(i => i.entity.type !== 'person');
    const isMultiPeople = people.length > 1;
    if (isMultiPeople) shuffle(people);
    nonPeople.sort((a, b) => (a.entity.name || '').localeCompare(b.entity.name || ''));
    const sorted = [...people, ...nonPeople];
    const label = getRelationLabel(relType);
    html += `<p class="detail-label">${label}${isMultiPeople ? ' ' + RANDOM_ORDER_NOTE_INLINE : ''}</p>`;
    sorted.forEach(({ entity, meta }) => {
      let display = entityLink(entity.id);
      if (meta && meta.role) display += ` — ${formatRole(meta.role)}`;
      if (meta && meta.primary) display += ' (primary)';
      if (meta && meta.session) display += ` — ${meta.session}`;
      if (meta && meta.exhibition) display += ` — ${meta.exhibition}`;
      html += `<p>${display}</p>`;
    });
  });
  return html;
}
