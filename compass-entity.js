// compass-entity.js — Entity card rendering, list/detail pages, edit modal, and CRUD operations.
// Extracted from index.html. All functions reference globals defined in index.html,
// compass-data.js, compass-config.js, and api-client.js.

// --- Generic field renderer ---
// Fields that are handled by type-specific code or are structural (not user-facing data).
const SKIP_FIELDS = new Set([
  'id', 'type', 'name', 'status', 'visibility', 'portrait', 'short_name', 'name_ja',
]);

function formatFieldLabel(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function renderFieldValue(value) {
  if (value == null || value === '') return null;
  if (Array.isArray(value)) {
    if (value.length === 0) return null;
    // Array of link objects
    if (typeof value[0] === 'object' && value[0] !== null && ('url' in value[0] || 'label' in value[0])) {
      return value.map(l =>
        `<a href="${l.url}" target="_blank" rel="noopener">${l.label || l.type || l.url}</a>`
      ).join('<br>');
    }
    // Array of objects with nested structure (schedules, exhibitions, etc.)
    if (typeof value[0] === 'object') {
      return value.map(item => {
        const parts = Object.entries(item)
          .filter(([, v]) => v != null && v !== '' && !Array.isArray(v))
          .map(([, v]) => String(v));
        return parts.join(' — ');
      }).join('<br>');
    }
    return value.join(', ');
  }
  if (typeof value === 'object') {
    // Location objects
    if ('lat' in value && 'lng' in value) {
      return `<a href="https://maps.google.com/?q=${value.lat},${value.lng}" target="_blank" rel="noopener">${Number(value.lat).toFixed(4)}, ${Number(value.lng).toFixed(4)}</a>`;
    }
    return JSON.stringify(value);
  }
  if (typeof value === 'string') {
    // URLs
    if (value.startsWith('http://') || value.startsWith('https://')) {
      return `<a href="${value}" target="_blank" rel="noopener">${value}</a>`;
    }
    // Email
    if (value.includes('@') && value.includes('.') && !value.includes(' ')) {
      return `<a href="mailto:${value}">${value}</a>`;
    }
    // Markdown-ish content (multi-line or contains markdown links)
    if (value.includes('\n') || value.match(/\[.*?\]\(.*?\)/)) {
      return marked.parse(value);
    }
    // Inline markdown (single line that may have links)
    return marked.parseInline(value);
  }
  return String(value);
}

function renderRemainingFields(entry, renderedFields) {
  const skip = new Set([...SKIP_FIELDS, ...renderedFields]);
  let html = '';
  for (const [key, value] of Object.entries(entry)) {
    if (skip.has(key)) continue;
    const rendered = renderFieldValue(value);
    if (rendered === null) continue;
    html += `<p class="detail-label">${formatFieldLabel(key)}</p><div>${rendered}</div>`;
  }
  return html;
}

    function renderRegistryCard(entry, type) {
      const card = document.createElement('div');
      card.className = 'registry-card';
      card.dataset.entityId = entry.id;

      let nameField = entry.name || entry.id;
      let summaryField = entry.summary || '';
      let metaHtml = '';
      let relationsHtml = '';

      // Status badge — people default to "active" when unset; other types only badge if status is present
      const cardStatus = type === 'people' ? (entry.status || 'active') : entry.status;
      if (cardStatus) {
        metaHtml += `<span class="status-badge ${cardStatus}">${cardStatus}</span>`;
      }

      switch (type) {
        case 'institutions':
          if (entry.institution_type) {
            metaHtml += `<span class="type-badge">${entry.institution_type.replace(/_/g, ' ')}</span>`;
          }
          if (entry.short_name && !(entry.name || '').includes(`(${entry.short_name})`)) {
            nameField = `${entry.name} (${entry.short_name})`;
          }
          break;

        case 'people':
          if (entry.name_ja) {
            nameField += `<div style="opacity:0.5;font-weight:normal;font-size:0.85em;">${entry.name_ja}</div>`;
          }
          if (entry.role_categories) {
            entry.role_categories.forEach(r => {
              metaHtml += `<span class="type-badge">${r.replace(/_/g, ' ')}</span>`;
            });
          }
          // Affiliations shown on detail page only
          // Show domains from affinity relations
          const domainRels = getRelated(entry.id, { type: 'has_affinity_for' });
          if (domainRels.length > 0) {
            relationsHtml += `<strong>Domains:</strong> ${domainRels.map(r =>
              `<a href="${entityHref('domains', r.entity.id)}" style="color:inherit;text-decoration:underline dotted;text-underline-offset:2px;">${getEntityDisplay(r.entity.id)}</a>`
            ).join(', ')}`;
          }
          break;

        case 'projects':
          if (entry.domains) {
            entry.domains.forEach(d => {
              metaHtml += `<span class="type-badge">${d}</span>`;
            });
          }
          break;

        case 'initiatives':
          if (entry.domains) {
            entry.domains.forEach(d => {
              metaHtml += `<span class="type-badge">${d}</span>`;
            });
          }
          break;

        case 'courses':
          if (entry.short_name && !(entry.name || '').includes(`(${entry.short_name})`)) {
            nameField = `${entry.name} (${entry.short_name})`;
          }
          metaHtml += `<span class="type-badge">${entry.credits} credit${entry.credits !== 1 ? 's' : ''}</span>`;
          if (entry.duration) {
            metaHtml += `<span class="type-badge">${entry.duration}</span>`;
          }
          if (entry.program) {
            entry.program.forEach(p => {
              metaHtml += `<span class="type-badge">${p.replace(/_/g, ' ')}</span>`;
            });
          }
          if (entry.domains) {
            relationsHtml += `<strong>Domains:</strong> ${renderDomainLinks(entry.domains)}`;
          }
          break;

        case 'curricula':
          if (entry.credit_requirement) {
            metaHtml += `<span class="type-badge">${entry.credit_requirement} credits</span>`;
          }
          if (entry.duration) {
            metaHtml += `<span class="type-badge">${entry.duration}</span>`;
          }
          break;

        case 'events':
          if (entry.event_type) {
            metaHtml += `<span class="type-badge">${entry.event_type}</span>`;
          }
          if (entry.date) {
            metaHtml += `<span class="type-badge">${entry.date}</span>`;
          }
          if (entry.location && entry.location.venue) {
            relationsHtml += `<strong>Location:</strong> ${entry.location.venue}`;
          }
          break;

        case 'opportunities':
          if (entry.opportunity_type) {
            metaHtml += `<span class="type-badge">${entry.opportunity_type.replace(/_/g, ' ')}</span>`;
          }
          if (entry.status) {
            metaHtml += `<span class="type-badge">${entry.status}</span>`;
          }
          if (entry.deadline) {
            metaHtml += `<span class="type-badge">Deadline ${entry.deadline}</span>`;
          }
          const opOfferRels = getRelated(entry.id, { type: 'offered_by' });
          if (opOfferRels.length > 0) {
            relationsHtml += `<strong>Offered by:</strong> ${opOfferRels.map(r =>
              `<a href="${entityHref('institutions', r.entity.id)}" style="color:inherit;text-decoration:underline dotted;text-underline-offset:2px;">${getEntityDisplay(r.entity.id)}</a>`
            ).join(', ')}`;
          }
          break;

        case 'domains':
          break;

        case 'places':
          if (entry.place_type) {
            metaHtml += `<span class="type-badge">${entry.place_type}</span>`;
          }
          if (entry.address) {
            relationsHtml += `<strong>Address:</strong> ${entry.address}`;
          }
          break;

        case 'publications':
          if (entry.publication_type) {
            metaHtml += `<span class="type-badge">${entry.publication_type.replace(/_/g, ' ')}</span>`;
          }
          if (entry.published_date) {
            metaHtml += `<span class="type-badge">${entry.published_date}</span>`;
          }
          if (entry.venue) {
            relationsHtml += `<strong>Venue:</strong> ${entry.venue}`;
          }
          break;

        case 'vectors':
          if (entry.from) {
            relationsHtml += `<strong>From:</strong> ${entry.from}`;
          }
          if (entry.toward) {
            relationsHtml += (relationsHtml ? '<br>' : '') + `<strong>Toward:</strong> ${entry.toward}`;
          }
          if (entry.domains) {
            entry.domains.forEach(d => { metaHtml += `<span class="type-badge">${d}</span>`; });
          }
          break;

        case 'deltas':
          if (entry.from) {
            relationsHtml += `<strong>From:</strong> ${entry.from}`;
          }
          if (entry.toward) {
            relationsHtml += (relationsHtml ? '<br>' : '') + `<strong>Toward:</strong> ${entry.toward}`;
          }
          if (entry.observed_date) {
            metaHtml += `<span class="type-badge">${entry.observed_date}</span>`;
          }
          if (entry.domains) {
            entry.domains.forEach(d => { metaHtml += `<span class="type-badge">${d}</span>`; });
          }
          break;
      }

      // Generic relations for card summary (non-people types that don't already set relationsHtml)
      if (type !== 'people' && type !== 'courses' && type !== 'events') {
        const genRels = renderRelationsHtml(entry.id);
        if (genRels) {
          relationsHtml += (relationsHtml ? '<br>' : '') + genRels;
        }
      }

      const portraitSrc = resolvePortraitUrl(entry, api);
      const portraitHtml = `<img class="card-portrait" src="${portraitSrc}" alt="" loading="lazy">`;

      card.innerHTML = `
        <div class="card-header">
          ${portraitHtml}
          <div class="card-name">${nameField}</div>
        </div>
        <div class="card-meta">${metaHtml}</div>
        ${summaryField ? `<div class="card-summary">${summaryField}</div>` : ''}
        ${relationsHtml ? `<div class="card-relations">${relationsHtml}</div>` : ''}
      `;

      card.addEventListener('click', (e) => {
        // Don't navigate if clicking a link
        if (e.target.tagName === 'A') return;
        location.hash = entityHref(type, entry.id);
      });

      return card;
    }

    function filterRegistryList(query) {
      const list = document.getElementById('registry-list');
      if (!list) return;
      const q = query.toLowerCase().trim();
      Array.from(list.children).forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = !q || text.includes(q) ? '' : 'none';
      });
    }

    function toggleListView(mode) {
      const list = document.getElementById('registry-list');
      if (!list) return;
      if (mode === 'list') {
        list.classList.add('list-mode');
      } else {
        list.classList.remove('list-mode');
      }
      localStorage.setItem('compass_view_mode', mode);
    }

    function loadRegistryList(type) {
      clearOrientationRotator();
      currentDoc = type;
      showSidebar(type);

      contentEl.innerHTML = '<p style="color: #999;">Loading&hellip;</p>';
      updateActiveNavLink(type);
      window.scrollTo(0, 0);

      ensureStore()
        .then(() => {
          const meta = registryMeta[type];
          if (!meta) { contentEl.innerHTML = `<p style="color:#c62828;">Unknown entity type: ${type}</p>`; return; }
          contentEl.innerHTML = `
            <div class="registry-page-header">
              <h1>${meta.plural}</h1>
              <p>${meta.description}</p>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
              <input type="text" id="registry-search" placeholder="Filter by keyword…"
                style="flex:1;max-width:480px;padding:8px 12px;font-size:15px;font-family:inherit;border:1px solid #ccc;"
                oninput="filterRegistryList(this.value)">
              <select class="view-toggle" id="view-toggle" onchange="toggleListView(this.value)">
                <option value="cards">Cards</option>
                <option value="list">List</option>
              </select>
            </div>
            <div class="registry-list" id="registry-list">
              <p style="color: #999;">Loading&hellip;</p>
            </div>
          `;
          let entries = listEntities(type, e => !e.status || e.status !== 'cancelled');
          // People: sort active before alumni
          if (type === 'people') {
            entries.sort((a, b) => {
              const aAlumni = a.status === 'alumni' ? 1 : 0;
              const bAlumni = b.status === 'alumni' ? 1 : 0;
              return aAlumni - bAlumni || (a.name || '').localeCompare(b.name || '');
            });
          }
          const list = document.getElementById('registry-list');
          if (!list) return;
          list.innerHTML = '';
          entries.forEach(entry => {
            list.appendChild(renderRegistryCard(entry, type));
          });
          // Restore saved view mode
          const savedMode = localStorage.getItem('compass_view_mode') || 'cards';
          const toggle = document.getElementById('view-toggle');
          if (toggle) toggle.value = savedMode;
          if (savedMode === 'list') list.classList.add('list-mode');
        })
        .catch(err => {
          const list = document.getElementById('registry-list');
          if (list) {
            list.innerHTML = `<p style="color: #c62828;">Error loading data: ${err.message}</p>`;
          }
        });
    }

    function loadEntityDetail(type, entityId) {
      clearOrientationRotator();
      currentDoc = type;
      showSidebar(type);

      contentEl.innerHTML = '<p style="color: #999;">Loading&hellip;</p>';
      updateActiveNavLink(type);
      window.scrollTo(0, 0);

      ensureStore()
        .then(() => {
          const meta = registryMeta[type] || { singular: type, plural: type };
          // Resolve slug to full entity ID (e.g. "compass" → "proj_compass")
          const resolvedId = slugToEntityId(type, entityId);
          const entry = store.entities[resolvedId];
          if (!entry) {
            contentEl.innerHTML = `
              <div class="entity-detail">
                <a href="#${type}" class="entity-detail-back">&larr; Back to ${meta.plural}</a>
                <p style="color: #c62828;">Entity not found: ${escapeHtml(entityId)}</p>
              </div>
            `;
            return;
          }

          const editBtnHtml = '';

          // Header info
          let nameHtml = entry.name || entry.id;
          if ((type === 'institutions' || type === 'courses' || type === 'curricula') && entry.short_name && !(entry.name || '').includes(`(${entry.short_name})`)) {
            nameHtml = `${entry.name} (${entry.short_name})`;
          }

          let nameJaHtml = '';
          if (type === 'people' && entry.name_ja) {
            nameJaHtml = `<div class="entity-detail-name-ja">${entry.name_ja}</div>`;
          }

          // Badges
          let badgesHtml = '';
          if (isLoggedIn() && entry.visibility && entry.visibility !== 'public') {
            const visLabel = entry.visibility.charAt(0).toUpperCase() + entry.visibility.slice(1);
            badgesHtml += `<span class="type-badge" style="background:#e8e0f0;color:#6a3d9a;">${visLabel}</span>`;
          }
          const detailStatus = type === 'people' ? (entry.status || 'active') : entry.status;
          if (detailStatus) {
            badgesHtml += `<span class="status-badge ${detailStatus}">${detailStatus}</span>`;
          }
          if (type === 'people' && entry.role_categories) {
            entry.role_categories.forEach(r => {
              badgesHtml += `<span class="type-badge">${r.replace(/_/g, ' ')}</span>`;
            });
          }
          if (type === 'institutions' && entry.institution_type) {
            badgesHtml += `<span class="type-badge">${entry.institution_type.replace(/_/g, ' ')}</span>`;
          }
          if (type === 'projects' && entry.domains) {
            entry.domains.forEach(d => { badgesHtml += `<span class="type-badge">${d}</span>`; });
          }
          if (type === 'initiatives' && entry.domains) {
            entry.domains.forEach(d => { badgesHtml += `<span class="type-badge">${d}</span>`; });
          }
          if (type === 'courses') {
            badgesHtml += `<span class="type-badge">${entry.credits} credit${entry.credits !== 1 ? 's' : ''}</span>`;
            if (entry.duration) { badgesHtml += `<span class="type-badge">${entry.duration}</span>`; }
            if (entry.program) {
              entry.program.forEach(p => { badgesHtml += `<span class="type-badge">${p.replace(/_/g, ' ')}</span>`; });
            }
          }
          if (type === 'curricula') {
            if (entry.credit_requirement) badgesHtml += `<span class="type-badge">${entry.credit_requirement} credits</span>`;
            if (entry.duration) badgesHtml += `<span class="type-badge">${entry.duration}</span>`;
            if (entry.degree) badgesHtml += `<span class="type-badge">${entry.degree}</span>`;
          }
          if (type === 'events') {
            if (entry.event_type) badgesHtml += `<span class="type-badge">${entry.event_type}</span>`;
            if (entry.date) badgesHtml += `<span class="type-badge">${entry.date}</span>`;
          }
          if (type === 'places' && entry.place_type) {
            badgesHtml += `<span class="type-badge">${entry.place_type}</span>`;
          }
          if (type === 'publications') {
            if (entry.publication_type) badgesHtml += `<span class="type-badge">${entry.publication_type.replace(/_/g, ' ')}</span>`;
            if (entry.published_date) badgesHtml += `<span class="type-badge">${entry.published_date}</span>`;
          }
          if (type === 'vectors' && entry.domains) {
            entry.domains.forEach(d => { badgesHtml += `<span class="type-badge">${d}</span>`; });
          }
          if (type === 'deltas') {
            if (entry.observed_date) badgesHtml += `<span class="type-badge">${entry.observed_date}</span>`;
            if (entry.domains) {
              entry.domains.forEach(d => { badgesHtml += `<span class="type-badge">${d}</span>`; });
            }
          }

          // Summary
          let summaryHtml = '';
          if (entry.summary) {
            summaryHtml = marked.parseInline(entry.summary);
          }

          // Portrait
          const portraitSrc = resolvePortraitUrl(entry, api);

          // Type-specific detail sections
          let detailHtml = '';
          // Track which fields the type-specific code renders (so the generic fallback skips them)
          const renderedFields = new Set(['summary']);

          if (type === 'people') {
            ['email', 'bio', 'bio_ja', 'links', 'role_categories'].forEach(f => renderedFields.add(f));
            if (entry.email) {
              detailHtml += `<p class="detail-label">Email</p><p><a href="mailto:${entry.email}">${entry.email}</a></p>`;
            }
            if (entry.bio) {
              const bioText = entry.bio.replace(/^\s*\[.*?\]\(https?:\/\/.*?\)\s*\n+/, '');
              detailHtml += `<div class="person-bio">${marked.parse(bioText)}</div>`;
            }
            // bio_ja hidden until bilingual UI is implemented (see feedback item)
            if (entry.links && entry.links.length > 0) {
              detailHtml += `<p class="detail-label">Links</p>`;
              detailHtml += entry.links.map(l =>
                `<p><a href="${l.url}" target="_blank" rel="noopener">${l.type || l.url}</a></p>`
              ).join('');
            }
            // Affiliations as first relation group
            const affiliations = getRelated(entry.id, { type: 'affiliated' });
            if (affiliations.length > 0) {
              const sorted = [...affiliations].sort((a, b) => (b.meta && b.meta.primary ? 1 : 0) - (a.meta && a.meta.primary ? 1 : 0));
              detailHtml += `<p class="detail-label">Affiliations</p>`;
              detailHtml += sorted
                .filter(a => a.meta && a.meta.role)
                .map(a => `<p>${a.meta.role} — ${entityLink(a.entity.id, a.entity.name || getEntityDisplay(a.entity.id))}</p>`)
                .join('');
            }
            detailHtml += renderRelationsDetailHtml(entry.id, ['has_affinity_for', 'affiliated']);
            const domainRels = getRelated(entry.id, { type: 'has_affinity_for' });
            if (domainRels.length > 0) {
              detailHtml += `<p class="detail-label">Domains</p>`;
              detailHtml += `<p>${domainRels.map(r =>
                `<a href="${entityHref('domains', r.entity.id)}">${getEntityDisplay(r.entity.id)}</a>`
              ).join(', ')}</p>`;
            }
          }

          if (type === 'institutions') {
            ['mandate', 'ecosystem_role', 'capabilities', 'constraints', 'charter_coverage', 'domains', 'location', 'founding_date', 'language', 'website'].forEach(f => renderedFields.add(f));
            if (entry.mandate) {
              detailHtml += `<p class="detail-label">Mandate</p><p>${entry.mandate}</p>`;
            }
            if (entry.ecosystem_role) {
              detailHtml += `<p class="detail-label">Ecosystem Role</p><p>${entry.ecosystem_role}</p>`;
            }
            if (entry.capabilities && entry.capabilities.length > 0) {
              detailHtml += `<p class="detail-label">Capabilities</p><p>${entry.capabilities.join(', ')}</p>`;
            }
            if (entry.constraints && entry.constraints.length > 0) {
              detailHtml += `<p class="detail-label">Constraints</p><p>${entry.constraints.join(', ')}</p>`;
            }
            if (entry.charter_coverage) {
              detailHtml += `<p class="detail-label">Charter Coverage</p><p>${entry.charter_coverage}</p>`;
            }
            if (entry.domains && entry.domains.length > 0) {
              detailHtml += `<p class="detail-label">Domains</p><p>${renderDomainLinks(entry.domains)}</p>`;
            }
            if (entry.location) {
              if (typeof entry.location === 'object' && entry.location.lat) {
                detailHtml += `<p class="detail-label">Location</p><p><a href="https://maps.google.com/?q=${entry.location.lat},${entry.location.lng}" target="_blank" rel="noopener">${entry.location.lat.toFixed(4)}, ${entry.location.lng.toFixed(4)}</a></p>`;
              } else {
                detailHtml += `<p class="detail-label">Location</p><p>${marked.parseInline(String(entry.location))}</p>`;
              }
            }
            if (entry.founding_date) {
              detailHtml += `<p class="detail-label">Founded</p><p>${entry.founding_date}</p>`;
            }
            if (entry.language) {
              detailHtml += `<p class="detail-label">Language</p><p>${entry.language}</p>`;
            }
            if (entry.website) {
              detailHtml += `<p class="detail-label">Website</p><p><a href="${entry.website}" target="_blank" rel="noopener">${entry.website}</a></p>`;
            }
            detailHtml += renderRelationsDetailHtml(entry.id);
          }

          if (type === 'projects') {
            ['project_goals', 'completion_criterion', 'problem_statement', 'scope_boundaries', 'success_criteria', 'timeline', 'website'].forEach(f => renderedFields.add(f));
            if (entry.project_goals && entry.project_goals.length > 0) {
              detailHtml += `<p class="detail-label">Goals</p>`;
              detailHtml += entry.project_goals.map(g => `<p>${g}</p>`).join('');
            }
            if (entry.completion_criterion) {
              detailHtml += `<p class="detail-label">Completion Criterion</p><p>${entry.completion_criterion}</p>`;
            }
            if (entry.problem_statement) {
              detailHtml += `<p class="detail-label">Problem Statement</p><p>${entry.problem_statement}</p>`;
            }
            if (entry.scope_boundaries) {
              detailHtml += `<p class="detail-label">Scope Boundaries</p><p>${entry.scope_boundaries}</p>`;
            }
            if (entry.success_criteria) {
              detailHtml += `<p class="detail-label">Success Criteria</p><p>${entry.success_criteria}</p>`;
            }
            if (entry.timeline) {
              detailHtml += `<p class="detail-label">Timeline</p><p>${entry.timeline}</p>`;
            }
            if (entry.website) {
              detailHtml += `<p class="detail-label">Website</p><p><a href="${entry.website}" target="_blank" rel="noopener">${entry.website}</a></p>`;
            }
            detailHtml += renderRelationsDetailHtml(entry.id);
          }

          if (type === 'initiatives') {
            ['purpose', 'activities', 'health_indicators', 'review_cycle', 'notes', 'domains'].forEach(f => renderedFields.add(f));
            if (entry.purpose) {
              detailHtml += `<p class="detail-label">Purpose</p><p>${marked.parseInline(entry.purpose)}</p>`;
            }
            if (entry.activities && entry.activities.length > 0) {
              detailHtml += `<p class="detail-label">Activities</p>`;
              detailHtml += entry.activities.map(a => `<p>${a}</p>`).join('');
            }
            if (entry.health_indicators && entry.health_indicators.length > 0) {
              detailHtml += `<p class="detail-label">Health Indicators</p><p>${entry.health_indicators.join(', ')}</p>`;
            }
            if (entry.review_cycle) {
              detailHtml += `<p class="detail-label">Review Cycle</p><p>${entry.review_cycle}</p>`;
            }
            if (entry.notes) {
              detailHtml += `<p class="detail-label">Notes</p><p>${marked.parseInline(entry.notes)}</p>`;
            }
            detailHtml += renderRelationsDetailHtml(entry.id);
          }

          if (type === 'courses') {
            ['name_ja', 'credits', 'semester', 'semester_jp', 'schedule', 'schedule_jp', 'room', 'room_ja', 'duration', 'duration_jp', 'program', 'outcomes', 'requirements', 'reading', 'links', 'charter_alignment', 'domains', 'notes'].forEach(f => renderedFields.add(f));
            if (entry.credits) {
              detailHtml += `<p class="detail-label">Credits</p><p>${entry.credits}</p>`;
            }
            if (entry.semester) {
              detailHtml += `<p class="detail-label">Semester</p><p>${entry.semester}</p>`;
            }
            if (entry.schedule) {
              detailHtml += `<p class="detail-label">Schedule</p><p>${entry.schedule}${entry.duration ? ' (' + entry.duration + ')' : ''}</p>`;
            }
            if (entry.room) {
              detailHtml += `<p class="detail-label">Room</p><p>${entry.room}</p>`;
            }
            if (entry.program && entry.program.length > 0) {
              detailHtml += `<p class="detail-label">Program</p><p>${entry.program.map(p => p.replace(/_/g, ' ')).join(', ')}</p>`;
            }
            if (entry.outcomes) {
              detailHtml += `<p class="detail-label">Learning Outcomes</p><p>${entry.outcomes}</p>`;
            }
            if (entry.requirements) {
              detailHtml += `<p class="detail-label">Requirements</p><p>${entry.requirements}</p>`;
            }
            if (entry.reading) {
              detailHtml += `<p class="detail-label">Reading</p><p>${entry.reading}</p>`;
            }
            if (entry.links && entry.links.length > 0) {
              detailHtml += `<p class="detail-label">Links</p>`;
              detailHtml += entry.links.map(l =>
                `<p><a href="${l.url}" target="_blank" rel="noopener">${l.label || l.url}</a></p>`
              ).join('');
            }
            if (entry.charter_alignment && entry.charter_alignment.length > 0) {
              detailHtml += `<p class="detail-label">Charter Alignment</p>`;
              detailHtml += entry.charter_alignment.map(a => `<p>${a}</p>`).join('');
            }
            if (entry.domains && entry.domains.length > 0) {
              detailHtml += `<p class="detail-label">Domains</p>`;
              detailHtml += `<p>${renderDomainLinks(entry.domains)}</p>`;
            }
            if (entry.notes) {
              detailHtml += `<p class="detail-label">Notes</p><p>${marked.parseInline(entry.notes)}</p>`;
            }
            detailHtml += renderRelationsDetailHtml(entry.id);
          }

          if (type === 'curricula') {
            ['name_ja', 'credit_requirement', 'mandatory_credits', 'elective_credits', 'duration', 'degree', 'notes', 'content'].forEach(f => renderedFields.add(f));
            if (entry.name_ja) {
              detailHtml += `<p style="opacity:0.6; margin-bottom:0.5rem;">${entry.name_ja}</p>`;
            }
            if (entry.credit_requirement) {
              detailHtml += `<p class="detail-label">Credit Requirement</p><p>${entry.credit_requirement}</p>`;
            }
            if (entry.mandatory_credits) {
              detailHtml += `<p class="detail-label">Mandatory Credits</p><p>${entry.mandatory_credits}</p>`;
            }
            if (entry.elective_credits) {
              detailHtml += `<p class="detail-label">Elective Credits</p><p>${entry.elective_credits}</p>`;
            }
            if (entry.duration) {
              detailHtml += `<p class="detail-label">Duration</p><p>${entry.duration}</p>`;
            }
            if (entry.degree) {
              detailHtml += `<p class="detail-label">Degree</p><p>${entry.degree}</p>`;
            }
            // Related courses grouped by relation type
            const requiredCourses = getRelated(entry.id, { type: 'requires' });
            const electiveCourses = getRelated(entry.id, { type: 'accepts' });
            if (requiredCourses.length > 0) {
              detailHtml += `<p class="detail-label">Mandatory Courses</p>`;
              detailHtml += `<p>${requiredCourses.map(r =>
                `<a href="${entityHref('courses', r.entity.id)}">${getEntityDisplay(r.entity.id)}</a>`
              ).join(', ')}</p>`;
            }
            if (electiveCourses.length > 0) {
              detailHtml += `<p class="detail-label">Elective Courses</p>`;
              detailHtml += `<p>${electiveCourses.map(r =>
                `<a href="${entityHref('courses', r.entity.id)}">${getEntityDisplay(r.entity.id)}</a>`
              ).join(', ')}</p>`;
            }
            detailHtml += renderRelationsDetailHtml(entry.id, ['requires', 'accepts']);
            if (entry.notes) {
              detailHtml += `<p class="detail-label">Notes</p><p>${marked.parseInline(entry.notes)}</p>`;
            }
            if (entry.content) {
              detailHtml += `<div class="curriculum-content">${marked.parse(entry.content)}</div>`;
            }
          }

          if (type === 'events') {
            ['date', 'time', 'location', 'purpose', 'duration', 'audience', 'schedule', 'exhibitions', 'expected_outcomes', 'domains', 'website', 'event_type'].forEach(f => renderedFields.add(f));
            if (entry.date) {
              detailHtml += `<p class="detail-label">Date</p><p>${entry.date}${entry.time ? ' · ' + entry.time : ''}</p>`;
            }
            if (entry.location) {
              if (typeof entry.location === 'object' && entry.location.lat) {
                detailHtml += `<p class="detail-label">Location</p><p><a href="https://maps.google.com/?q=${entry.location.lat},${entry.location.lng}" target="_blank" rel="noopener">${entry.location.lat.toFixed(4)}, ${entry.location.lng.toFixed(4)}</a></p>`;
              } else {
                detailHtml += `<p class="detail-label">Location</p><p>${marked.parseInline(String(entry.location))}</p>`;
              }
            }
            if (entry.purpose) {
              detailHtml += `<p class="detail-label">Purpose</p><p>${entry.purpose}</p>`;
            }
            if (entry.duration) {
              detailHtml += `<p class="detail-label">Duration</p><p>${entry.duration}</p>`;
            }
            if (entry.audience) {
              detailHtml += `<p class="detail-label">Audience</p><p>${entry.audience}</p>`;
            }
            if (entry.schedule && entry.schedule.length > 0) {
              detailHtml += `<p class="detail-label">Schedule</p>`;
              detailHtml += entry.schedule.map(s => {
                let speakers = '';
                if (s.speakers && s.speakers.length > 0) {
                  speakers = ' — ' + s.speakers.map(sp =>
                    sp.person_id ? entityLink(sp.person_id, personName(sp.person_id)) : sp.external_name
                  ).join(', ');
                }
                return `<p>${s.time} ${s.title}${speakers}</p>`;
              }).join('');
            }
            if (entry.exhibitions && entry.exhibitions.length > 0) {
              detailHtml += `<p class="detail-label">Exhibitions</p>`;
              detailHtml += entry.exhibitions.map(ex => {
                let people = '';
                if (ex.participants && ex.participants.length > 0) {
                  people = ' — ' + ex.participants.map(p =>
                    p.person_id ? entityLink(p.person_id, personName(p.person_id)) : p.external_name
                  ).join(', ');
                }
                return `<p>${ex.title}${people}</p>`;
              }).join('');
            }
            if (entry.expected_outcomes && entry.expected_outcomes.length > 0) {
              detailHtml += `<p class="detail-label">Expected Outcomes</p>`;
              detailHtml += entry.expected_outcomes.map(o => `<p>${o}</p>`).join('');
            }
            if (entry.domains && entry.domains.length > 0) {
              detailHtml += `<p class="detail-label">Domains</p><p>${renderDomainLinks(entry.domains)}</p>`;
            }
            if (entry.website) {
              detailHtml += `<p class="detail-label">Website</p><p><a href="${entry.website}" target="_blank" rel="noopener">${entry.website}</a></p>`;
            }
            detailHtml += renderRelationsDetailHtml(entry.id);
          }

          if (type === 'opportunities') {
            ['name_ja', 'opportunity_type', 'description', 'eligibility', 'compensation', 'commitment', 'location', 'remote', 'deadline', 'date_posted', 'date_closed', 'start_date', 'end_date', 'requirements', 'conflicts_of_interest', 'application_url', 'contact', 'links', 'notes'].forEach(f => renderedFields.add(f));
            if (entry.opportunity_type) {
              detailHtml += `<p class="detail-label">Type</p><p>${entry.opportunity_type.replace(/_/g, ' ')}</p>`;
            }
            if (entry.description) {
              detailHtml += `<div class="person-bio">${marked.parse(entry.description)}</div>`;
            }
            if (entry.eligibility && entry.eligibility.length > 0) {
              detailHtml += `<p class="detail-label">Eligibility</p><p>${entry.eligibility.map(e => e.replace(/_/g, ' ')).join(', ')}</p>`;
            }
            if (entry.date_posted) {
              detailHtml += `<p class="detail-label">Date Posted</p><p>${entry.date_posted}</p>`;
            }
            if (entry.deadline) {
              detailHtml += `<p class="detail-label">Application Deadline</p><p>${entry.deadline}</p>`;
            }
            if (entry.date_closed) {
              detailHtml += `<p class="detail-label">Date Closed</p><p>${entry.date_closed}</p>`;
            }
            if (entry.start_date || entry.end_date) {
              detailHtml += `<p class="detail-label">Dates</p><p>${entry.start_date || ''}${entry.end_date ? ' – ' + entry.end_date : ''}</p>`;
            }
            if (entry.commitment) {
              detailHtml += `<p class="detail-label">Commitment</p><p>${entry.commitment}</p>`;
            }
            if (entry.compensation) {
              detailHtml += `<p class="detail-label">Compensation</p><p>${marked.parseInline(String(entry.compensation))}</p>`;
            }
            if (entry.location || entry.remote) {
              detailHtml += `<p class="detail-label">Location</p><p>${[entry.location, entry.remote].filter(Boolean).join(' · ')}</p>`;
            }
            if (entry.requirements && entry.requirements.length > 0) {
              detailHtml += `<p class="detail-label">Requirements</p>`;
              detailHtml += entry.requirements.map(r => `<p>${r}</p>`).join('');
            }
            if (entry.conflicts_of_interest) {
              detailHtml += `<p class="detail-label">Potential Conflicts of Interest</p><p>${marked.parseInline(String(entry.conflicts_of_interest))}</p>`;
            }
            if (entry.application_url) {
              detailHtml += `<p class="detail-label">Apply</p><p><a href="${entry.application_url}" target="_blank" rel="noopener">${entry.application_url}</a></p>`;
            }
            if (entry.contact) {
              detailHtml += `<p class="detail-label">Contact</p><p>${marked.parseInline(String(entry.contact))}</p>`;
            }
            if (entry.links && entry.links.length > 0) {
              detailHtml += `<p class="detail-label">Links</p>`;
              detailHtml += entry.links.map(l =>
                `<p><a href="${l.url}" target="_blank" rel="noopener">${l.label || l.url}</a></p>`
              ).join('');
            }
            if (entry.notes) {
              detailHtml += `<p class="detail-label">Notes</p><p>${marked.parseInline(entry.notes)}</p>`;
            }
            detailHtml += renderRelationsDetailHtml(entry.id);
          }

          if (type === 'domains') {
            ['description'].forEach(f => renderedFields.add(f));
            detailHtml += renderRelationsDetailHtml(entry.id);
          }

          if (type === 'places') {
            ['address', 'location', 'website', 'place_type'].forEach(f => renderedFields.add(f));
            if (entry.address) {
              detailHtml += `<p class="detail-label">Address</p><p>${entry.address}</p>`;
            }
            if (entry.location) {
              if (typeof entry.location === 'object' && entry.location.lat) {
                detailHtml += `<p class="detail-label">Location</p><p><a href="https://maps.google.com/?q=${entry.location.lat},${entry.location.lng}" target="_blank" rel="noopener">${entry.location.lat.toFixed(4)}, ${entry.location.lng.toFixed(4)}</a></p>`;
              } else {
                detailHtml += `<p class="detail-label">Location</p><p>${marked.parseInline(String(entry.location))}</p>`;
              }
            }
            if (entry.website) {
              detailHtml += `<p class="detail-label">Website</p><p><a href="${entry.website}" target="_blank" rel="noopener">${entry.website}</a></p>`;
            }
            detailHtml += renderRelationsDetailHtml(entry.id);
          }

          if (type === 'publications') {
            ['abstract', 'venue', 'doi', 'published_date', 'url', 'publication_type', 'citations', 'citations_date', 'display_rank'].forEach(f => renderedFields.add(f));
            if (entry.abstract) {
              detailHtml += `<p class="detail-label">Abstract</p><p>${entry.abstract}</p>`;
            }
            if (entry.venue) {
              detailHtml += `<p class="detail-label">Venue</p><p>${entry.venue}</p>`;
            }
            if (entry.doi) {
              detailHtml += `<p class="detail-label">DOI</p><p><a href="https://doi.org/${entry.doi}" target="_blank" rel="noopener">${entry.doi}</a></p>`;
            }
            if (entry.published_date) {
              detailHtml += `<p class="detail-label">Published</p><p>${entry.published_date}</p>`;
            }
            if (entry.citations != null) {
              let citationsText = `${entry.citations}`;
              if (entry.citations_date) citationsText += ` <span class="field-note">(as of ${entry.citations_date})</span>`;
              detailHtml += `<p class="detail-label">Citations</p><p>${citationsText}</p>`;
            }
            if (entry.url) {
              detailHtml += `<p class="detail-label">URL</p><p><a href="${entry.url}" target="_blank" rel="noopener">${entry.url}</a></p>`;
            }
            detailHtml += renderRelationsDetailHtml(entry.id);
          }

          if (type === 'vectors') {
            ['from', 'toward', 'domains', 'notes'].forEach(f => renderedFields.add(f));
            if (entry.from) {
              detailHtml += `<p class="detail-label">From</p><p>${entry.from}</p>`;
            }
            if (entry.toward) {
              detailHtml += `<p class="detail-label">Toward</p><p>${entry.toward}</p>`;
            }
            if (entry.domains && entry.domains.length > 0) {
              detailHtml += `<p class="detail-label">Domains</p><p>${renderDomainLinks(entry.domains)}</p>`;
            }
            if (entry.notes) {
              detailHtml += `<p class="detail-label">Notes</p><p>${marked.parseInline(entry.notes)}</p>`;
            }
            detailHtml += renderRelationsDetailHtml(entry.id);
          }

          if (type === 'deltas') {
            ['from', 'toward', 'observed_date', 'domains', 'notes'].forEach(f => renderedFields.add(f));
            if (entry.from) {
              detailHtml += `<p class="detail-label">From</p><p>${entry.from}</p>`;
            }
            if (entry.toward) {
              detailHtml += `<p class="detail-label">Toward</p><p>${entry.toward}</p>`;
            }
            if (entry.observed_date) {
              detailHtml += `<p class="detail-label">Observed</p><p>${entry.observed_date}</p>`;
            }
            if (entry.domains && entry.domains.length > 0) {
              detailHtml += `<p class="detail-label">Domains</p><p>${renderDomainLinks(entry.domains)}</p>`;
            }
            if (entry.notes) {
              detailHtml += `<p class="detail-label">Notes</p><p>${marked.parseInline(entry.notes)}</p>`;
            }
            detailHtml += renderRelationsDetailHtml(entry.id);
          }

          // For types with no specific block, render relations
          if (renderedFields.size <= 1) {
            detailHtml += renderRelationsDetailHtml(entry.id);
          }

          // Generic fallback: render any data fields not handled by type-specific code
          detailHtml += renderRemainingFields(entry, renderedFields);

          // Check-in section
          const checkinFormHtml = isLoggedIn() ? `
            <form id="checkin-form" style="margin-top: 0.75rem; display: flex; gap: 0.5rem;">
              <input type="text" id="checkin-note" placeholder="Check-in note (optional)" maxlength="500" style="flex:1; padding: 0.4rem 0.6rem; border: 1px solid #ccc; border-radius: 4px; font-size: 0.9em;">
              <button type="submit" style="padding: 0.4rem 1rem; background: #333; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9em;">Check in</button>
            </form>` : '';

          contentEl.innerHTML = `
            <div class="entity-detail">
              <div class="entity-detail-top-row">
                <a href="#${type}" class="entity-detail-back">&larr; Back to ${meta.plural}</a>
                ${editBtnHtml}
              </div>
              <div class="entity-detail-header">
                <img class="entity-detail-portrait" src="${portraitSrc}" alt="">
                <div class="entity-detail-header-info">
                  <h1>${nameHtml}</h1>
                  ${nameJaHtml}
                  ${badgesHtml ? `<div class="entity-detail-badges">${badgesHtml}</div>` : ''}
                </div>
              </div>
              ${summaryHtml ? `<div class="entity-detail-summary">${summaryHtml}</div>` : ''}
              <div class="entity-detail-section">
                ${detailHtml}
              </div>
              <div style="margin-top: 2rem; border-top: 1px solid #e5e5e5; padding-top: 1.5rem;">
                <p class="detail-label" style="display: flex; align-items: center; gap: 0.5rem;">Health <span id="health-dot" style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#ccc;"></span> <span id="health-score" style="font-weight:normal;color:#666;font-size:0.85em;"></span></p>
                <div id="checkin-log" style="color:#666;font-size:0.9em;"></div>
                ${checkinFormHtml}
              </div>
              <div style="margin-top: 1.5rem; border-top: 1px solid #e5e5e5; padding-top: 1.5rem;">
                <details id="entity-history-details">
                  <summary style="cursor:pointer; font-weight:600; font-size:0.95em; color:#333; user-select:none;">Change History</summary>
                  <div id="entity-history-log" style="color:#666; font-size:0.85em; margin-top:0.75rem;">Loading...</div>
                </details>
              </div>
            </div>
          `;

          // Render any mermaid diagrams in the detail content
          renderMermaidDiagrams();

          // Load health + check-ins asynchronously
          api.getEntityHealth(resolvedId).then(h => {
            const dot = document.getElementById('health-dot');
            const score = document.getElementById('health-score');
            if (dot) {
              const hue = Math.round(h.health * 120); // 0=red, 120=green
              dot.style.background = `hsl(${hue}, 70%, 50%)`;
            }
            if (score) score.textContent = h.health > 0 ? `${Math.round(h.health * 100)}%` : 'No check-ins';
          }).catch(() => {});

          api.getCheckIns(resolvedId, 5).then(checkins => {
            const log = document.getElementById('checkin-log');
            if (!log) return;
            if (checkins.length === 0) {
              log.textContent = 'No check-ins yet.';
              return;
            }
            log.innerHTML = checkins.map(c => {
              const date = new Date(c.created_at).toLocaleDateString();
              const userName = getEntityDisplay(c.user_id) || 'Unknown';
              return `<p style="margin:0.25rem 0;"><strong>${date}</strong>${c.note ? ' — ' + escapeHtml(c.note) : ''}</p>`;
            }).join('');
          }).catch(() => {});

          // History: load on first expand
          const historyDetails = document.getElementById('entity-history-details');
          if (historyDetails) {
            let historyLoaded = false;
            historyDetails.addEventListener('toggle', async () => {
              if (!historyDetails.open || historyLoaded) return;
              historyLoaded = true;
              const historyLog = document.getElementById('entity-history-log');
              try {
                const history = await api.getEntityHistory(resolvedId, 30);
                if (history.length === 0) {
                  historyLog.textContent = 'No changes recorded.';
                  return;
                }
                historyLog.innerHTML = history.map(h => {
                  const date = new Date(h.created_at).toLocaleString();
                  const typeLabel = h.change_type.replace(/_/g, ' ');
                  let userName = '';
                  if (h.user_name) {
                    userName = ` by <span style="color:#555; font-weight:500;">${escapeHtml(h.user_name)}</span>`;
                  } else if (h.user_id) {
                    userName = ` by <span style="color:#999;">${h.user_id.substring(0, 8)}…</span>`;
                  }

                  let detailHtml = '';

                  if (h.change_type === 'created') {
                    detailHtml = '<div style="margin:0.2rem 0 0.5rem 1rem; color:#555;">Entity created</div>';
                  }

                  if (h.change_type === 'deleted') {
                    const relCount = (h.snapshot.relations || []).length;
                    detailHtml = '<div style="margin:0.2rem 0 0.5rem 1rem; color:#c62828;">Entity deleted'
                      + (relCount > 0 ? ` (${relCount} relation${relCount !== 1 ? 's' : ''} removed)` : '')
                      + '</div>';
                  }

                  if (h.change_type === 'restored') {
                    detailHtml = '<div style="margin:0.2rem 0 0.5rem 1rem; color:#2e7d32;">Restored to previous state</div>';
                  }

                  if (h.change_type === 'updated' && h.changes) {
                    const fields = Object.entries(h.changes).filter(([k]) => k !== 'from_change_id');
                    if (fields.length > 0) {
                      detailHtml = '<div style="margin:0.2rem 0 0.5rem 1rem;">' + fields.map(([field, diff]) => {
                        const label = field.replace(/_/g, ' ');
                        let oldVal = diff.old;
                        let newVal = diff.new;
                        // For data field, show sub-field diffs
                        if (field === 'data' && typeof oldVal === 'object' && typeof newVal === 'object') {
                          const subChanges = [];
                          const allKeys = new Set([...Object.keys(oldVal || {}), ...Object.keys(newVal || {})]);
                          for (const k of allKeys) {
                            const ov = (oldVal || {})[k];
                            const nv = (newVal || {})[k];
                            if (JSON.stringify(ov) !== JSON.stringify(nv)) {
                              const kLabel = k.replace(/_/g, ' ');
                              if (nv === undefined || nv === null) {
                                subChanges.push(`<span style="color:#999;">${kLabel}</span> removed`);
                              } else if (ov === undefined || ov === null) {
                                const preview = typeof nv === 'string' ? nv.substring(0, 60) + (nv.length > 60 ? '…' : '') : JSON.stringify(nv).substring(0, 60);
                                subChanges.push(`<span style="color:#999;">${kLabel}</span> set to "${escapeHtml(preview)}"`);
                              } else {
                                const oldPreview = typeof ov === 'string' ? ov.substring(0, 40) : JSON.stringify(ov).substring(0, 40);
                                const newPreview = typeof nv === 'string' ? nv.substring(0, 40) : JSON.stringify(nv).substring(0, 40);
                                subChanges.push(`<span style="color:#999;">${kLabel}</span> changed from "${escapeHtml(oldPreview)}…" to "${escapeHtml(newPreview)}…"`);
                              }
                            }
                          }
                          return subChanges.join('<br>');
                        }
                        // Simple field
                        const oldStr = oldVal != null ? String(oldVal).substring(0, 50) : '(empty)';
                        const newStr = newVal != null ? String(newVal).substring(0, 50) : '(empty)';
                        return `<span style="color:#999;">${label}</span>: "${escapeHtml(oldStr)}" → "${escapeHtml(newStr)}"`;
                      }).join('<br>') + '</div>';
                    }
                  }

                  if ((h.change_type === 'relation_added' || h.change_type === 'relation_removed') && h.changes && h.changes.relation) {
                    const r = h.changes.relation;
                    const isAdd = h.change_type === 'relation_added';
                    const color = isAdd ? '#2e7d32' : '#c62828';
                    const verb = isAdd ? 'Added' : 'Removed';
                    const other = r.source_id === resolvedId ? r.target_id : r.source_id;
                    const otherName = getEntityDisplay(other) || other;
                    const relLabel = r.type.replace(/_/g, ' ');
                    const otherLink = `<a href="${entityHrefById(other)}" style="color:inherit;text-decoration:underline;">${escapeHtml(otherName)}</a>`;
                    detailHtml = `<div style="margin:0.2rem 0 0.5rem 1rem; color:${color};">${verb} relation: <strong>${relLabel}</strong> → ${otherLink}</div>`;
                  }

                  return `<div style="margin:0.4rem 0; padding:0.4rem 0; border-bottom:1px solid #f0f0f0;">
                    <div><span style="color:#999;">${date}</span> <span style="font-weight:600; text-transform:capitalize;">${typeLabel}</span>${userName}</div>
                    ${detailHtml}
                  </div>`;
                }).join('');
              } catch {
                historyLog.textContent = 'Could not load history.';
              }
            });
          }

          // Check-in form handler
          const checkinForm = document.getElementById('checkin-form');
          if (checkinForm) {
            checkinForm.addEventListener('submit', async (e) => {
              e.preventDefault();
              const noteInput = document.getElementById('checkin-note');
              const note = noteInput.value.trim() || null;
              try {
                await api.createCheckIn(resolvedId, note);
                noteInput.value = '';
                // Reload the detail page to refresh health + log
                loadEntityDetail(type, entityId);
              } catch (err) {
                alert('Check-in failed: ' + err.message);
              }
            });
          }

        })
        .catch(err => {
          contentEl.innerHTML = `
            <div class="entity-detail">
              <a href="#${type}" class="entity-detail-back">&larr; Back to ${meta.plural}</a>
              <p style="color: #c62828;">Error loading data: ${err.message}</p>
            </div>
          `;
        });
    }

