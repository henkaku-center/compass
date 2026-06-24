// compass-ui.js — Shared UI infrastructure extracted from index.html
// DOM references, navigation, modals, sidebar, TOC, scroll handling, utilities

// --- DOM reference constants ---
const contentEl = document.getElementById("content");
const tocEl = document.getElementById("toc");
const tocListEl = document.getElementById("toc-list");
const docTocEl = document.getElementById("doc-toc");
const docTocListEl = document.getElementById("doc-toc-list");
const layoutEl = document.getElementById("layout");
const backToTopBtn = document.getElementById("back-to-top");

// --- Mutable state ---
let currentDoc = '';
let headings = [];

// --- Mobile nav ---
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
const navOverlay = document.getElementById("nav-overlay");

function closeNav() {
  navToggle.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navLinks.classList.remove("open");
  navOverlay.classList.remove("visible");
  document.body.style.overflow = "";
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.contains("open");
  if (isOpen) {
    closeNav();
  } else {
    navToggle.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    navLinks.classList.add("open");
    navOverlay.classList.add("visible");
    document.body.style.overflow = "hidden";
  }
});

navOverlay.addEventListener("click", closeNav);

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeNav);
});

// --- Modal close handlers ---
const modalOverlay = document.getElementById('modal-overlay');
const modalCloseBtn = document.getElementById('modal-close');

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
modalCloseBtn.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('visible')) closeModal();
});

// --- Modal functions ---
function showModal(title, bodyHtml, opts) {
  opts = opts || {};
  const overlay = document.getElementById('modal-overlay');
  const box = document.getElementById('modal-box');
  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body');
  const errorEl = document.getElementById('modal-error');

  titleEl.textContent = title;
  bodyEl.innerHTML = bodyHtml;
  errorEl.textContent = '';
  errorEl.classList.remove('visible');
  box.classList.toggle('wide', !!opts.wide);
  box.classList.toggle('narrow', !!opts.narrow);
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  var overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('visible');
  // Restore overflow based on current page (network needs hidden)
  var hash = window.location.hash.slice(1) || 'home';
  document.body.style.overflow = (hash === 'network') ? 'hidden' : '';
}

function showModalError(msg) {
  const errorEl = document.getElementById('modal-error');
  errorEl.textContent = msg;
  errorEl.classList.add('visible');
}

// --- Sidebar navigation ---
function showSidebar(activeKey) {
  headings = []; // Clear so scroll spy doesn't interfere
  tocListEl.innerHTML = '';
  docTocEl.classList.remove('visible'); // Hide right TOC until buildDocToc re-enables
  siteMap.forEach(function(item) {
    var li = document.createElement('li');
    if (item.group) {
      var span = document.createElement('span');
      span.textContent = item.group;
      span.classList.add('toc-group-label');
      if (item.group === 'Entities' && store.byType) {
        var total = Object.values(store.byType).reduce(function(sum, arr) { return sum + arr.length; }, 0);
        var badge = document.createElement('span');
        badge.className = 'nav-count';
        badge.textContent = total;
        span.appendChild(badge);
      }
      li.appendChild(span);
    } else {
      var a = document.createElement('a');
      if (item.external) {
        a.href = item.external;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      } else {
        a.href = '#' + item.key;
      }
      a.textContent = item.label;
      a.dataset.navKey = item.key;
      if (item.key === activeKey) a.classList.add('active');
      // Gray out entity types with no entries (updated after store loads)
      if (TYPE_FROM_PLURAL[item.key] && store.byType && store.byType[item.key] && store.byType[item.key].length === 0) {
        a.classList.add('toc-empty');
      }
      li.appendChild(a);
    }
    tocListEl.appendChild(li);
  });
  tocEl.querySelector('h4').style.display = 'none';
  tocEl.classList.add('visible');
  layoutEl.classList.add('has-toc');

  // Apply empty states if store is already loaded
  if (store.byType) updateSidebarEmptyStates();
}

// Update sidebar links to show entity counts and gray out empty types
function updateSidebarEmptyStates() {
  tocListEl.querySelectorAll('a[data-nav-key]').forEach(function(a) {
    var key = a.dataset.navKey;
    if (TYPE_FROM_PLURAL[key] && store.byType) {
      var entries = store.byType[key] || [];
      // Remove any existing count badge
      var existing = a.querySelector('.nav-count');
      if (existing) existing.remove();
      // Add count
      var badge = document.createElement('span');
      badge.className = 'nav-count';
      badge.textContent = entries.length;
      a.appendChild(badge);
      if (entries.length === 0) {
        a.classList.add('toc-empty');
      } else {
        a.classList.remove('toc-empty');
      }
    }
  });
}

// --- Heading IDs & document TOC ---
function assignHeadingIds() {
  var used = {};
  contentEl.querySelectorAll('h2, h3').forEach(function(heading) {
    var slug = heading.textContent.toLowerCase()
      // Drop "Part I:", "Part XII:", "Part 3:" prefixes for cleaner anchors.
      .replace(/^part\s+[ivxlcdm0-9]+\s*:\s*/i, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 50)
      .replace(/-$/, '');
    if (!slug) slug = 'section';
    // De-duplicate repeated headings (e.g. "Basic Information").
    if (used[slug] != null) {
      used[slug] += 1;
      slug = slug + '-' + used[slug];
    } else {
      used[slug] = 1;
    }
    heading.id = slug;
  });
}

// docTocPages is defined in compass-config.js

// Scroll to a heading by id, expanding its collapsible section if needed.
function scrollToSection(id, smooth) {
  var el = document.getElementById(id);
  if (!el) return false;
  // If the heading lives inside a collapsed section, expand it first.
  var container = el.closest('.section-content');
  if (container && container.classList.contains('collapsed')) {
    container.classList.remove('collapsed');
    if (container.previousElementSibling) {
      container.previousElementSibling.classList.remove('collapsed');
    }
  }
  el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  return true;
}

function buildDocToc(docKey) {
  docTocListEl.innerHTML = '';
  headings = [];

  if (!docTocPages.includes(docKey)) {
    docTocEl.classList.remove('visible');
    return;
  }

  contentEl.querySelectorAll('h2, h3').forEach(function(heading) {
    var id = heading.id;
    if (!id) return;
    headings.push({ id: id, el: heading });

    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + id;
    a.textContent = heading.textContent;
    if (heading.tagName === 'H3') li.classList.add('dtoc-h3');
    a.addEventListener('click', function(e) {
      e.preventDefault();
      scrollToSection(id, true);
      // Update the URL so the section can be linked/shared directly.
      history.replaceState(null, '', '#' + docKey + '/' + id);
    });
    li.appendChild(a);
    docTocListEl.appendChild(li);
  });

  if (headings.length > 0) {
    docTocEl.classList.add('visible');
  } else {
    docTocEl.classList.remove('visible');
  }
}

function updateActiveDocTocLink() {
  if (!docTocEl.classList.contains('visible')) return;
  if (headings.length === 0) return;

  let activeId = null;
  const scrollTop = window.scrollY + 100;

  for (let i = headings.length - 1; i >= 0; i--) {
    if (headings[i].el.offsetTop <= scrollTop) {
      activeId = headings[i].id;
      break;
    }
  }

  docTocListEl.querySelectorAll('a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + activeId);
  });
}

// --- Collapsible sections ---
function makeCollapsible() {
  const h2s = contentEl.querySelectorAll('h2');

  h2s.forEach(h2 => {
    // Skip if already processed
    if (h2.classList.contains('section-header')) return;

    h2.classList.add('section-header');

    // Collect all siblings until next h2 or end
    const sectionContent = document.createElement('div');
    sectionContent.classList.add('section-content');

    let sibling = h2.nextElementSibling;
    const siblings = [];

    while (sibling && sibling.tagName !== 'H2') {
      siblings.push(sibling);
      sibling = sibling.nextElementSibling;
    }

    // Move siblings into section content div
    siblings.forEach(s => sectionContent.appendChild(s));
    h2.after(sectionContent);

    // Toggle on click
    h2.addEventListener('click', () => {
      h2.classList.toggle('collapsed');
      sectionContent.classList.toggle('collapsed');
    });
  });
}

// --- Active nav link ---
function updateActiveNavLink(docKey) {
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').slice(1);
    a.classList.toggle('active', href === docKey);
  });
}

// --- Scroll spy for TOC ---
function updateActiveTocLink() {
  if (!tocEl.classList.contains('visible')) return;
  if (headings.length === 0) return; // Emergent sidebar, not heading TOC

  let activeId = null;
  const scrollTop = window.scrollY + 100;

  for (let i = headings.length - 1; i >= 0; i--) {
    if (headings[i].el.offsetTop <= scrollTop) {
      activeId = headings[i].id;
      break;
    }
  }

  tocListEl.querySelectorAll('a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + activeId);
  });
}

// --- Back to top button ---
function updateBackToTop() {
  backToTopBtn.classList.toggle('visible', window.scrollY > 300);
}

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Throttled scroll handler ---
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) return;
  scrollTimeout = setTimeout(() => {
    updateActiveTocLink();
    updateActiveDocTocLink();
    updateBackToTop();
    scrollTimeout = null;
  }, 50);
});

// --- Orientation rotator cleanup ---
function clearOrientationRotator() {
  if (window._orientationInterval) {
    clearInterval(window._orientationInterval);
    window._orientationInterval = null;
  }
}

// --- Utility functions ---
function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
