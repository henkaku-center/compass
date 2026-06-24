// compass-app.js — Router and bootstrap code.
// Extracted from index.html. References globals from compass-config.js,
// compass-ui.js, compass-auth.js, compass-entity.js, compass-network.js,
// compass-pages.js, compass-data.js, and api-client.js.

    // Load document based on hash
    function loadFromHash() {
      const rawHash = window.location.hash.slice(1) || 'home';
      // Backward-compatible redirect: #curriculum → #curricula
      if (rawHash === 'curriculum' || rawHash.startsWith('curriculum/')) {
        window.location.hash = '#' + rawHash.replace(/^curriculum/, 'curricula');
        return;
      }
      // Parse entity deep link: #type/entityId
      const baseHash = rawHash.split('?')[0];
      const slashIdx = baseHash.indexOf('/');
      const hash = slashIdx > 0 ? baseHash.slice(0, slashIdx) : baseHash;
      const entityId = slashIdx > 0 ? rawHash.slice(slashIdx + 1) : null;
      const docKey = Object.keys(routes).includes(hash) ? hash : 'home';

      // Clean up network resize listener when leaving
      if (window._networkResizeHandler) {
        window.removeEventListener('resize', window._networkResizeHandler);
        window._networkResizeHandler = null;
      }

      // Tag content element for page-specific CSS
      contentEl.setAttribute('data-page', docKey);

      // Full-bleed layout for network page only
      const isNetwork = docKey === 'network';
      layoutEl.classList.toggle('full-bleed', isNetwork);
      document.getElementById('site-footer').style.display = isNetwork ? 'none' : '';
      document.body.style.background = isNetwork ? '#1e1e1e' : '';
      document.body.style.overflow = isNetwork ? 'hidden' : '';

      if (docKey === 'home') {
        loadLanding();
      } else if (docKey === 'references') {
        loadReferences();
      } else if (docKey === 'history') {
        loadHistory();
      } else if (docKey === 'charter') {
        loadCharter();
      } else if (['people', 'projects', 'initiatives', 'institutions', 'courses', 'curricula', 'events', 'opportunities', 'domains', 'places', 'publications', 'vectors', 'deltas', 'theses', 'posts'].includes(docKey)) {
        if (entityId) {
          loadEntityDetail(docKey, entityId);
        } else {
          loadRegistryList(docKey);
        }
      } else if (docKey === 'network') {
        loadNetwork();
      } else if (docKey === 'feedback') {
        loadFeedback();
      } else if (docKey === 'contribute') {
        loadContribute();
      } else if (docKey === 'contact') {
        loadContact();
      } else {
        const path = routes[docKey];
        // For doc pages, the segment after the slash is a section anchor.
        loadDoc(path, docKey, entityId);
      }
    }

    // Expose for other files
    window.loadFromHash = loadFromHash;

    // Real-time updates: reload store and re-render when Registry data changes
    api.subscribeToChanges(function(event) {
      // Reset the cached store promise so ensureStore() fetches fresh data
      _storeReady = null;
      loadStore(api).then(function() {
        _storeReady = Promise.resolve();
        updateSidebarEmptyStates();
        loadFromHash();
      });
    });

    // Initial load
    updateLoginUI();
    loadFromHash();

    // Update sidebar empty states after store loads
    ensureStore().then(updateSidebarEmptyStates);

    // Listen for hash changes
    window.addEventListener('hashchange', loadFromHash);
