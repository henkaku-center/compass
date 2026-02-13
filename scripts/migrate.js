#!/usr/bin/env node
/**
 * Migration script: Unified Entity + Relations Architecture
 *
 * Reads current JSON data files, transforms entities (add type, rename fields,
 * strip relation fields), extracts relations into relations.json, and writes
 * all output files.
 *
 * Usage: node scripts/migrate.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DRY_RUN = process.argv.includes('--dry-run');

// --- Read current data ---

function readJSON(filename) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), 'utf-8'));
}

const people = readJSON('people.json');
const projects = readJSON('projects.json');
const initiatives = readJSON('initiatives.json');
const institutions = readJSON('institutions.json');
const courses = readJSON('courses.json');
const events = readJSON('events.json');
const domains = readJSON('domains.json');
const places = readJSON('places.json');

// --- Relations accumulator ---

const relations = [];
const relationSet = new Set();

function addRelation(source, target, type, meta) {
  if (!source || !target) return;
  // Include meta in dedup key for relation types that allow multiple entries
  // (e.g., speaks_at with different sessions, exhibits_at with different exhibitions)
  const metaKey = meta ? JSON.stringify(meta) : '';
  const key = `${source}|${target}|${type}|${metaKey}`;
  const reverseKey = `${target}|${source}|${type}|${metaKey}`;
  if (relationSet.has(key) || relationSet.has(reverseKey)) return;
  relationSet.add(key);
  const rel = { source, target, type };
  if (meta && Object.keys(meta).length > 0) rel.meta = meta;
  relations.push(rel);
}

// --- Extract relations from people ---

people.forEach(person => {
  // affiliations: person → institution
  if (person.affiliations) {
    person.affiliations.forEach(a => {
      const meta = {};
      if (a.role) meta.role = a.role;
      if (a.primary) meta.primary = true;
      addRelation(person.id, a.institution_id, 'affiliated', meta);
    });
  }

  // person.projects: skip — prefer project-side data which is richer
  // person.initiatives: skip — prefer initiative-side data which is richer
});

// --- Extract relations from projects ---

projects.forEach(proj => {
  // owner
  if (proj.owner) {
    addRelation(proj.owner, proj.id, 'owner');
  }

  // contributors
  if (proj.contributors) {
    proj.contributors.forEach(c => {
      const meta = {};
      if (c.role) meta.role = c.role;
      addRelation(c.person_id, proj.id, 'contributor', meta);
    });
  }

  // parent_initiative → initiative contains project
  if (proj.parent_initiative) {
    addRelation(proj.parent_initiative, proj.id, 'contains');
  }

  // dependencies
  if (proj.dependencies && proj.dependencies.requires) {
    proj.dependencies.requires.forEach(d => {
      const meta = {};
      if (d.description) meta.description = d.description;
      if (d.criticality) meta.criticality = d.criticality;
      addRelation(proj.id, d.project_id, 'depends_on', meta);
    });
  }
});

// --- Extract relations from initiatives ---

initiatives.forEach(init => {
  // owner (formerly lead)
  if (init.lead) {
    addRelation(init.lead, init.id, 'owner');
  }

  // participants
  if (init.participants) {
    init.participants.forEach(p => {
      const meta = {};
      if (p.role) meta.role = p.role;
      addRelation(p.person_id, init.id, 'participant', meta);
    });
  }

  // spawned_projects
  if (init.spawned_projects) {
    init.spawned_projects.forEach(p => {
      addRelation(init.id, p.project_id, 'spawned');
    });
  }

  // related_institutions
  if (init.related_institutions) {
    init.related_institutions.forEach(r => {
      if (r.relationship === 'hosted_by') {
        addRelation(r.institution_id, init.id, 'hosts');
      } else if (r.relationship === 'partner') {
        addRelation(init.id, r.institution_id, 'partner');
      } else {
        addRelation(init.id, r.institution_id, r.relationship || 'related');
      }
    });
  }
});

// --- Extract relations from institutions ---

institutions.forEach(inst => {
  // parent_institution
  if (inst.parent_institution) {
    addRelation(inst.parent_institution, inst.id, 'parent');
  }

  // related_institutions
  if (inst.related_institutions) {
    inst.related_institutions.forEach(r => {
      if (r.relationship === 'host') {
        addRelation(inst.id, r.institution_id, 'hosts');
      } else if (r.relationship === 'hosted_by') {
        addRelation(r.institution_id, inst.id, 'hosts');
      } else if (r.relationship === 'partner') {
        addRelation(inst.id, r.institution_id, 'partner');
      } else {
        addRelation(inst.id, r.institution_id, r.relationship || 'related');
      }
    });
  }

  // key_contacts
  if (inst.key_contacts) {
    inst.key_contacts.forEach(c => {
      const meta = {};
      if (c.role) meta.role = c.role;
      addRelation(c.person_id, inst.id, 'contact_for', meta);
    });
  }

  // hosted_projects
  if (inst.hosted_projects) {
    inst.hosted_projects.forEach(pid => {
      addRelation(inst.id, pid, 'hosts');
    });
  }

  // hosted_initiatives
  if (inst.hosted_initiatives) {
    inst.hosted_initiatives.forEach(iid => {
      addRelation(inst.id, iid, 'hosts');
    });
  }
});

// --- Extract relations from courses ---

courses.forEach(course => {
  // prerequisites
  if (course.prerequisites) {
    course.prerequisites.forEach(pid => {
      addRelation(course.id, pid, 'has_prerequisite');
    });
  }

  // related_courses
  if (course.related_courses) {
    course.related_courses.forEach(rid => {
      addRelation(course.id, rid, 'related');
    });
  }

  // instructors (person IDs)
  if (course.instructors) {
    course.instructors.forEach(pid => {
      if (typeof pid === 'string' && pid) {
        addRelation(pid, course.id, 'teaches');
      }
    });
  }
});

// --- Extract relations from events ---

events.forEach(event => {
  // organizer
  if (event.organizer) {
    addRelation(event.organizer, event.id, 'organizes');
  }

  // related_institutions
  if (event.related_institutions) {
    event.related_institutions.forEach(r => {
      if (r.relationship === 'host') {
        addRelation(r.institution_id, event.id, 'hosts');
      } else {
        addRelation(r.institution_id, event.id, r.relationship || 'related');
      }
    });
  }

  // schedule speakers → speaks_at relations
  if (event.schedule) {
    event.schedule.forEach(session => {
      if (session.speakers) {
        session.speakers.forEach(sp => {
          if (sp.person_id) {
            const meta = { session: session.title };
            if (sp.role) meta.role = sp.role;
            addRelation(sp.person_id, event.id, 'speaks_at', meta);
          }
        });
      }
    });
  }

  // exhibition participants → exhibits_at relations
  if (event.exhibitions) {
    event.exhibitions.forEach(ex => {
      if (ex.participants) {
        ex.participants.forEach(p => {
          if (p.person_id) {
            addRelation(p.person_id, event.id, 'exhibits_at', { exhibition: ex.title });
          }
        });
      }
    });
  }
});

// --- Transform entities ---

// Person fields to strip (relation fields)
const personRelationFields = ['affiliations', 'projects', 'initiatives'];

const transformedPeople = people.map(p => {
  const out = { id: p.id, type: 'person' };
  for (const [key, val] of Object.entries(p)) {
    if (key === 'id') continue;
    if (personRelationFields.includes(key)) continue;
    if (key === 'title') {
      out.job_title = val;
    } else {
      out[key] = val;
    }
  }
  return out;
});

// Project fields to strip
const projectRelationFields = ['owner', 'contributors', 'parent_initiative', 'dependencies'];

const transformedProjects = projects.map(p => {
  const out = { id: p.id, type: 'project' };
  for (const [key, val] of Object.entries(p)) {
    if (key === 'id') continue;
    if (projectRelationFields.includes(key)) continue;
    if (key === 'title') {
      out.name = val;
    } else {
      out[key] = val;
    }
  }
  return out;
});

// Initiative fields to strip
const initiativeRelationFields = [
  'lead', 'participants', 'spawned_projects', 'contained_projects',
  'related_initiatives', 'related_institutions'
];

const transformedInitiatives = initiatives.map(i => {
  const out = { id: i.id, type: 'initiative' };
  for (const [key, val] of Object.entries(i)) {
    if (key === 'id') continue;
    if (initiativeRelationFields.includes(key)) continue;
    if (key === 'title') {
      out.name = val;
    } else {
      out[key] = val;
    }
  }
  return out;
});

// Institution fields to strip
const institutionRelationFields = [
  'parent_institution', 'related_institutions', 'key_contacts',
  'hosted_projects', 'hosted_initiatives'
];

const transformedInstitutions = institutions.map(i => {
  const out = { id: i.id, type: 'institution' };
  for (const [key, val] of Object.entries(i)) {
    if (key === 'id') continue;
    if (institutionRelationFields.includes(key)) continue;
    out[key] = val;
  }
  return out;
});

// Course fields to strip
const courseRelationFields = ['prerequisites', 'related_courses', 'instructors'];

const transformedCourses = courses.map(c => {
  const out = { id: c.id, type: 'course' };
  for (const [key, val] of Object.entries(c)) {
    if (key === 'id') continue;
    if (courseRelationFields.includes(key)) continue;
    if (key === 'title') {
      out.name = val;
    } else {
      out[key] = val;
    }
  }
  return out;
});

// Event fields to strip (keep schedule and exhibitions as structural content)
const eventRelationFields = ['organizer', 'related_institutions'];

const transformedEvents = events.map(e => {
  const out = { id: e.id, type: 'event' };
  for (const [key, val] of Object.entries(e)) {
    if (key === 'id') continue;
    if (eventRelationFields.includes(key)) continue;
    if (key === 'title') {
      out.name = val;
    } else {
      out[key] = val;
    }
  }
  return out;
});

// Domains — no embedded relations to extract
const transformedDomains = domains.map(d => {
  const out = { id: d.id, type: 'domain' };
  for (const [key, val] of Object.entries(d)) {
    if (key === 'id') continue;
    out[key] = val;
  }
  return out;
});

// Places — no embedded relations to extract
const transformedPlaces = places.map(p => {
  const out = { id: p.id, type: 'place' };
  for (const [key, val] of Object.entries(p)) {
    if (key === 'id') continue;
    out[key] = val;
  }
  return out;
});

// --- Write output ---

function writeJSON(filename, data) {
  const filepath = path.join(DATA_DIR, filename);
  const content = JSON.stringify(data, null, 2) + '\n';
  if (DRY_RUN) {
    console.log(`[DRY RUN] Would write ${filepath} (${content.length} bytes, ${Array.isArray(data) ? data.length + ' entries' : 'object'})`);
  } else {
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`Wrote ${filepath} (${Array.isArray(data) ? data.length + ' entries' : 'object'})`);
  }
}

// Sort relations for stable output
relations.sort((a, b) => {
  if (a.source < b.source) return -1;
  if (a.source > b.source) return 1;
  if (a.target < b.target) return -1;
  if (a.target > b.target) return 1;
  if (a.type < b.type) return -1;
  if (a.type > b.type) return 1;
  return 0;
});

writeJSON('people.json', transformedPeople);
writeJSON('projects.json', transformedProjects);
writeJSON('initiatives.json', transformedInitiatives);
writeJSON('institutions.json', transformedInstitutions);
writeJSON('courses.json', transformedCourses);
writeJSON('events.json', transformedEvents);
writeJSON('domains.json', transformedDomains);
writeJSON('places.json', transformedPlaces);
writeJSON('relations.json', relations);

// --- Summary ---
console.log(`\nMigration summary:`);
console.log(`  People: ${transformedPeople.length} entities`);
console.log(`  Projects: ${transformedProjects.length} entities`);
console.log(`  Initiatives: ${transformedInitiatives.length} entities`);
console.log(`  Institutions: ${transformedInstitutions.length} entities`);
console.log(`  Courses: ${transformedCourses.length} entities`);
console.log(`  Events: ${transformedEvents.length} entities`);
console.log(`  Domains: ${transformedDomains.length} entities`);
console.log(`  Places: ${transformedPlaces.length} entities`);
console.log(`  Relations: ${relations.length} extracted`);

// Relation type breakdown
const typeCounts = {};
relations.forEach(r => { typeCounts[r.type] = (typeCounts[r.type] || 0) + 1; });
console.log(`\nRelation types:`);
Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).forEach(([t, c]) => {
  console.log(`  ${t}: ${c}`);
});
