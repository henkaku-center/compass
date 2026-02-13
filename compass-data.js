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
  advises:          { inverse: 'advised_by',       label: 'Advises',        inverseLabel: 'Advised by' },
  advised_by:       { inverse: 'advises',          label: 'Advised by',     inverseLabel: 'Advises' },
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

// --- Loading ---

async function loadStore() {
  const types = ['people', 'projects', 'initiatives', 'institutions', 'courses', 'events', 'domains', 'places'];
  const cacheBuster = `?t=${Date.now()}`;

  const fetches = types.map(t =>
    fetch(`data/${t}.json${cacheBuster}`, { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load data/${t}.json`);
        return res.json();
      })
      .then(data => ({ type: t, data }))
  );

  // Also fetch relations
  fetches.push(
    fetch(`data/relations.json${cacheBuster}`, { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to load data/relations.json');
        return res.json();
      })
      .then(data => ({ type: '_relations', data }))
  );

  const results = await Promise.all(fetches);

  // Clear store
  store.entities = {};
  store.relations = [];
  store.byType = {};
  store._dirty.clear();

  results.forEach(({ type, data }) => {
    if (type === '_relations') {
      store.relations = data;
    } else {
      store.byType[type] = data;
      data.forEach(entity => {
        store.entities[entity.id] = entity;
      });
    }
  });

  return store;
}

// --- Entity API ---

function getEntity(id) {
  return store.entities[id] || null;
}

function listEntities(typePlural, filterFn) {
  const list = store.byType[typePlural] || [];
  return filterFn ? list.filter(filterFn) : list;
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
  if (entity.short_name) return `${entity.name} (${entity.short_name})`;
  return entity.name || id;
}

function getRelationLabel(relationType) {
  const info = RELATION_TYPES[relationType];
  return info ? info.label : relationType.replace(/_/g, ' ');
}

// --- URL slug helpers ---
// Strip type prefix from IDs for cleaner URLs
// e.g. "proj_compass" → "compass", "person_winder_ira" → "winder_ira"

const ID_PREFIXES = {
  people: 'person_',
  projects: 'proj_',
  initiatives: 'init_',
  institutions: 'inst_',
  courses: 'course_',
  events: 'event_',
  domains: 'domain_',
  places: 'place_'
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

  return { nodes, links };
}

// --- Generic relation renderer ---

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
    const label = getRelationLabel(relType);
    const itemStrs = items.map(({ entity, meta }) => {
      let display = entityLinkShort(entity.id);
      if (meta && meta.role) display += ` (${meta.role})`;
      return display;
    });
    if (html) html += '<br>';
    html += `<strong>${label}:</strong> ${itemStrs.join(', ')}`;
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

  let html = '';
  Object.entries(groups).forEach(([relType, items]) => {
    const label = getRelationLabel(relType);
    html += `<p class="detail-label">${label}</p>`;
    items.forEach(({ entity, meta }) => {
      let display = entityLink(entity.id);
      if (meta && meta.role) display += ` — ${meta.role}`;
      if (meta && meta.primary) display += ' (primary)';
      if (meta && meta.session) display += ` — ${meta.session}`;
      if (meta && meta.exhibition) display += ` — ${meta.exhibition}`;
      html += `<p>${display}</p>`;
    });
  });

  return html;
}
