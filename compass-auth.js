// compass-auth.js — Authentication, session management, and login UI
// Extracted from index.html. Depends on: api-client.js, compass-data.js, compass-ui.js

const api = new ApiClient('https://registry.henkaku.center');
api.init();

// Current user info (populated after login/session restore)
let currentUser = null;

// Load entity type metadata from Registry API (progressive enhancement)
let _entityTypesReady = null;
function loadEntityTypes() {
  if (_entityTypesReady) return _entityTypesReady;
  _entityTypesReady = api.getEntityTypes().then(types => {
    Object.entries(types).forEach(([key, t]) => {
      registryMeta[key] = {
        singular: t.singular,
        plural: t.plural,
        description: t.description,
        color: t.color
      };
      nodeColors[key] = t.color;
      if (t.id_prefix) ID_PREFIXES[key] = t.id_prefix;
      if (t.db_type) {
        TYPE_FILE_MAP[t.db_type] = key;
        TYPE_FROM_PLURAL[key] = t.db_type;
      }
    });
  }).catch(err => {
    console.warn('Entity types API unavailable, using defaults:', err.message);
  });
  return _entityTypesReady;
}

// Ensure store is loaded (cached after first call)
let _storeReady = null;
function ensureStore() {
  if (_storeReady) return _storeReady;
  _storeReady = loadEntityTypes().then(() => loadStore(api));
  return _storeReady;
}

// Resolve a person ID to a display name
function personName(id) {
  return getEntityDisplay(id);
}

// Resolve URL slug back to entity ID (e.g. "compass" → "proj_compass")
function slugToEntityId(type, slug) {
  const prefix = ID_PREFIXES[type];
  if (!prefix) return slug;
  const candidate = prefix + slug;
  return (store.entities && store.entities[candidate]) ? candidate : slug;
}

function isLoggedIn() {
  return api.isAuthenticated;
}

function getUsername() {
  if (currentUser) return currentUser.name || currentUser.email;
  return '';
}

function updateLoginUI() {
  const loginEl = document.getElementById('nav-login');
  if (!loginEl) return;
  if (isLoggedIn() && currentUser) {
    const displayName = currentUser.name || currentUser.email;
    const nameHtml = currentUser.compass_entity_id
      ? `<a href="#people/${currentUser.compass_entity_id}" class="username">${displayName}</a>`
      : `<span class="username">${displayName}</span>`;
    loginEl.innerHTML = `${nameHtml} <button onclick="logout()">Logout</button>`;
  } else {
    loginEl.innerHTML = `<button onclick="showLoginModal()">Login</button>`;
  }
}

function showLoginModal() {
  var html = '<div class="form-group">' +
    '<label for="login-email">Email</label>' +
    '<input type="email" id="login-email" placeholder="you@example.com" />' +
    '</div>' +
    '<div class="form-group">' +
    '<label for="login-password">Password</label>' +
    '<input type="password" id="login-password" placeholder="Password" />' +
    '</div>' +
    '<div class="modal-actions">' +
    '<button class="btn" onclick="closeModal()">Cancel</button>' +
    '<button class="btn btn-primary" id="login-btn" onclick="handleLogin()">Login</button>' +
    '</div>';
  showModal('Login', html, { narrow: true });
  setTimeout(function() {
    var el = document.getElementById('login-email'); if (el) el.focus();
    var pw = document.getElementById('login-password');
    if (pw) pw.addEventListener('keydown', function(e) { if (e.key === 'Enter') handleLogin(); });
  }, 100);
}

async function handleLogin() {
  var email = document.getElementById('login-email');
  email = email ? email.value.trim() : '';
  var password = document.getElementById('login-password');
  password = password ? password.value : '';
  if (!email || !password) { showModalError('Please enter email and password.'); return; }

  var loginBtn = document.getElementById('login-btn');
  if (loginBtn) { loginBtn.disabled = true; loginBtn.textContent = 'Verifying\u2026'; }

  try {
    await api.login(email, password);
    currentUser = await api.me();
    if (currentUser.must_change_password) {
      closeModal();
      showForcePasswordChange();
      return;
    }
    closeModal();
    _storeReady = null;
    updateLoginUI();
    loadFromHash();
  } catch (err) {
    showModalError(err.message || 'Login failed. Check your credentials.');
    if (loginBtn) { loginBtn.disabled = false; loginBtn.textContent = 'Login'; }
  }
}

function showForcePasswordChange() {
  var html = '<p style="color:#555;margin-bottom:16px;">You have a temporary password. Please set a new password to continue.</p>' +
    '<div class="form-group"><label for="force-cur-pw">Current password</label>' +
    '<input type="password" id="force-cur-pw" /></div>' +
    '<div class="form-group"><label for="force-new-pw">New password</label>' +
    '<input type="password" id="force-new-pw" /></div>' +
    '<div class="form-group"><label for="force-confirm-pw">Confirm new password</label>' +
    '<input type="password" id="force-confirm-pw" /></div>' +
    '<div class="modal-actions"><button class="btn btn-primary" onclick="handleForcePasswordChange()">Set new password</button></div>';
  showModal('Password change required', html, { narrow: true });
  // Prevent closing
  document.getElementById('modal-close').style.display = 'none';
  document.getElementById('modal-overlay').onclick = null;
}

async function handleForcePasswordChange() {
  var cur = document.getElementById('force-cur-pw').value;
  var pw = document.getElementById('force-new-pw').value;
  var confirm = document.getElementById('force-confirm-pw').value;
  if (pw !== confirm) { showModalError('New passwords do not match.'); return; }
  if (!cur || !pw) { showModalError('Please fill in all fields.'); return; }
  try {
    await api.changePassword(cur, pw);
    currentUser.must_change_password = false;
    document.getElementById('modal-close').style.display = '';
    closeModal();
    updateLoginUI();
    loadFromHash();
  } catch (err) {
    showModalError(err.message || 'Failed to change password.');
  }
}

function logout() {
  api.logout();
  currentUser = null;
  _storeReady = null;
  updateLoginUI();
  loadFromHash();
}

// Restore session on page load
(async function restoreSession() {
  if (api.isAuthenticated) {
    try {
      currentUser = await api.me();
    } catch (e) {
      api.logout();
      currentUser = null;
    }
    if (currentUser && currentUser.must_change_password) {
      showForcePasswordChange();
      return;
    }
    updateLoginUI();
  }
})();
