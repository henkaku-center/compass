// compass-pages.js — Static/special page renderers extracted from index.html.
// These functions reference globals defined elsewhere (contentEl, api, currentDoc,
// tocEl, docTocEl, layoutEl, store, currentUser, isLoggedIn, showSidebar,
// updateActiveNavLink, assignHeadingIds, makeCollapsible, buildDocToc,
// renderMermaidDiagrams, showLoginModal, escapeHtml, escapeAttr, referenceFiles,
// loadFeedbackEntries, etc.). They are meant to be loaded alongside the main app.

function loadLanding() {
  currentDoc = 'home';
  tocEl.classList.remove('visible');
  docTocEl.classList.remove('visible');
  layoutEl.classList.remove('has-toc');

  contentEl.innerHTML = `
    <div class="landing">
      <div class="landing-orientations">
        <div class="orientation-rotator" id="orientation-rotator"></div>
      </div>
      <div class="landing-hero">
        <img src="compass-icon.png" alt="Compass" />
        <p class="tagline">
          <b>Compass</b> is the infrastructure for decentralized, antidisciplinary coordination&mdash;designed to make shared values and ongoing work visible and easy to contribute to.
        </p>
        <br>
        <p class="subtitle">
          <a href="https://chibatech.jp" target="_blank" rel="noopener">Chiba Tech</a> &middot;
          <a href="https://henkaku.center" target="_blank" rel="noopener">Henkaku Center</a> &middot;
          <a href="https://sds.chibatech.dev" target="_blank" rel="noopener">SDS</a>
        </p>
      </div>

      <a href="#contribute" class="landing-cta">
        <div class="landing-cta-icon">&gt;_</div>
        <div class="landing-cta-text">
          <div class="landing-cta-title">Contribute with AI</div>
          <div class="landing-cta-desc">Use your own AI assistant to explore, query, and contribute to Compass through natural conversation.</div>
        </div>
        <div class="landing-cta-arrow">&rsaquo;</div>
      </a>

      <div class="landing-group">
        <div class="landing-group-label">DNA</div>
        <div class="landing-group-desc">Blueprints and scaffolding for our ecosystem.</div>
        <div class="landing-cards">
          <a href="#charter" class="landing-card">
            <div class="card-title">Charter</div>
            <div class="card-desc">Values, governance, and commitments that orient all work.</div>
          </a>
          <a href="#archetypes" class="landing-card">
            <div class="card-title">Archetypes</div>
            <div class="card-desc">Structural templates for people, projects, initiatives, courses, and more.</div>
          </a>
        </div>
      </div>

      <div class="landing-group">
        <div class="landing-group-label">Entities</div>
        <div class="landing-group-desc">Living content&mdash;programs, people, and activities.</div>
        <div class="landing-cards">
          <a href="#network" class="landing-card full-row">
            <div class="card-title">Network</div>
            <div class="card-desc">Interactive 3D graph of people, projects, initiatives, courses, events, institutions, domains, and places.</div>
          </a>
          <a href="#people" class="landing-card">
            <div class="card-title">People</div>
            <div class="card-desc">Faculty, researchers, staff, and students with roles and domains.</div>
          </a>
          <a href="#projects" class="landing-card">
            <div class="card-title">Projects</div>
            <div class="card-desc">Bounded efforts with goals, teams, and completion criteria.</div>
          </a>
          <a href="#initiatives" class="landing-card">
            <div class="card-title">Initiatives</div>
            <div class="card-desc">Ongoing programs spanning research, education, and coordination.</div>
          </a>
          <a href="#institutions" class="landing-card">
            <div class="card-title">Institutions</div>
            <div class="card-desc">Universities, research centers, and partners in the ecosystem.</div>
          </a>
          <a href="#events" class="landing-card">
            <div class="card-title">Events</div>
            <div class="card-desc">Symposia, workshops, and gatherings with schedules and speakers.</div>
          </a>
          <a href="#publications" class="landing-card">
            <div class="card-title">Publications</div>
            <div class="card-desc">Peer-reviewed journal articles, conference papers, and book chapters.</div>
          </a>
          <a href="#vectors" class="landing-card">
            <div class="card-title">Vectors</div>
            <div class="card-desc">Directional transformations people are pursuing — energy, purpose, and aspiration.</div>
          </a>
          <a href="#deltas" class="landing-card">
            <div class="card-title">Deltas</div>
            <div class="card-desc">Observable changes — concrete evidence of movement and transformation.</div>
          </a>
          <span class="landing-card placeholder">
            <div class="card-title">Posts</div>
            <div class="card-desc">Written reflections and updates from participants. Coming soon.</div>
          </span>
          <a href="#curricula" class="landing-card">
            <div class="card-title">Curricula</div>
            <div class="card-desc">Degree programs with required and elective coursework, credit requirements, and milestones.</div>
          </a>
          <a href="#courses" class="landing-card">
            <div class="card-title">Courses</div>
            <div class="card-desc">Individual courses with credits, Charter alignment, and instructors.</div>
          </a>
          <span class="landing-card placeholder">
            <div class="card-title">Theses</div>
            <div class="card-desc">Student research with advisors, committees, and milestones. Coming soon.</div>
          </span>
          <a href="#places" class="landing-card">
            <div class="card-title">Places</div>
            <div class="card-desc">Campuses, coworking spaces, venues, and gathering spots in the ecosystem.</div>
          </a>
          <a href="#domains" class="landing-card">
            <div class="card-title">Domains</div>
            <div class="card-desc">Knowledge and research areas that map the intellectual landscape.</div>
          </a>
        </div>
      </div>

      <div class="landing-group">
        <div class="landing-group-label">Other Information</div>
        <div class="landing-cards">
          <a href="#about" class="landing-card">
            <div class="card-title">About</div>
            <div class="card-desc">What Compass is, who it serves, and how the pieces fit together.</div>
          </a>
          <a href="#references" class="landing-card">
            <div class="card-title">References</div>
            <div class="card-desc">Brochures, whiteboards, and source documents behind the design.</div>
          </a>
          <a href="#history" class="landing-card">
            <div class="card-title">History</div>
            <div class="card-desc">Every change to the repository, pulled live from GitHub.</div>
          </a>
          <a href="#contribute" class="landing-card">
            <div class="card-title">Contribute with AI</div>
            <div class="card-desc">Use your own AI assistant to explore, query, and contribute to Compass.</div>
          </a>
          <a href="#feedback" class="landing-card">
            <div class="card-title">Feedback</div>
            <div class="card-desc">Report issues or suggest improvements.</div>
          </a>
          <a href="#contact" class="landing-card">
            <div class="card-title">Contact</div>
            <div class="card-desc">Get in touch, request an invite, or find source code.</div>
          </a>
        </div>
      </div>


    </div>
  `;

  contentEl.querySelectorAll('.landing-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 60}ms`;
  });

  // Orientation rotator
  const orientations = [
    '<strong>Resilience</strong> over strength',
    '<strong>Systems</strong> over objects',
    '<strong>Disobedience</strong> over compliance',
    '<strong>Pull</strong> over push',
    '<strong>Compasses</strong> over maps',
    '<strong>Emergence</strong> over authority',
    '<strong>Risk</strong> over safety',
    '<strong>Practice</strong> over theory',
    '<strong>Learning</strong> over education',
    '<strong>Sustainability</strong> over growth',
    '<strong>Public</strong> over individuals',
    '<strong>Modular</strong> over monolithic',
  ];
  const rotator = document.getElementById('orientation-rotator');
  const compassImg = contentEl.querySelector('.landing-hero img');
  if (rotator && compassImg) {
    let idx = 0;
    function showOrientation() {
      const el = document.createElement('span');
      el.innerHTML = orientations[idx];
      el.classList.add('settling');
      rotator.innerHTML = '';
      rotator.appendChild(el);
      idx = (idx + 1) % orientations.length;
      compassImg.classList.remove('released');
      compassImg.classList.add('attracted');
    }
    function cycleOrientation() {
      const current = rotator.querySelector('span');
      if (current) {
        compassImg.classList.remove('attracted');
        compassImg.classList.add('released');
        current.classList.remove('settling');
        current.classList.add('leaving');
        current.addEventListener('animationend', () => {
          showOrientation();
        }, { once: true });
      } else {
        showOrientation();
      }
    }
    // Wait for the appear animation to finish, then hand off to transitions
    compassImg.addEventListener('animationend', () => {
      compassImg.style.animation = 'none';
      compassImg.style.opacity = '0.85';
      setTimeout(() => {
        showOrientation();
        window._orientationInterval = setInterval(cycleOrientation, 2500);
      }, 200);
    }, { once: true });
  }

  updateActiveNavLink('home');
  window.scrollTo(0, 0);
}

// clearOrientationRotator() is defined in compass-ui.js

function loadReferences() {
  clearOrientationRotator();
  currentDoc = 'references';
  showSidebar('references');

  let html = `
    <h1>References</h1>
    <p>Source documents, historical versions, and supporting materials. Click to download or preview.</p>
    <ul class="references-list">
  `;

  referenceFiles.forEach(file => {
    const ext = file.filename.split('.').pop().toUpperCase();
    const isImage = ['PNG', 'JPG', 'JPEG', 'GIF'].includes(ext);

    html += `
      <li>
        <div class="ref-item">
          <div class="ref-info">
            <div class="ref-title">${file.title}</div>
            <div class="ref-meta">${file.description} · ${ext} · ${file.size} · ${file.date}</div>
          </div>
          <div>
            <a href="https://registry.henkaku.center/api/v1/compass/files/reference/${encodeURIComponent(file.filename)}" download class="ref-download">
              ↓ Download
            </a>
            <a href="https://registry.henkaku.center/api/v1/compass/files/reference/${encodeURIComponent(file.filename)}" target="_blank" class="ref-preview">
              ${isImage ? '🖼 View' : '📄 Open'}
            </a>
          </div>
        </div>
      </li>
    `;
  });

  html += '</ul>';

  contentEl.innerHTML = html;
  updateActiveNavLink('references');
  window.scrollTo(0, 0);
}

function loadHistory() {
  clearOrientationRotator();
  currentDoc = 'history';
  showSidebar('history');

  contentEl.innerHTML = `
    <div class="history-page">
      <h1>History</h1>
      <p class="history-subtitle">Commit history from the project repository.</p>
      <div id="history-list" class="history-loading">Loading commit history&hellip;</div>
    </div>
  `;

  updateActiveNavLink('history');
  window.scrollTo(0, 0);

  const owner = 'henkaku-center';
  const repo = 'compass';
  const perPage = 100;

  fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}`, {
    headers: { 'Accept': 'application/vnd.github.v3+json' }
  })
    .then(res => {
      if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
      return res.json();
    })
    .then(commits => {
      const container = document.getElementById('history-list');
      if (!container) return;

      // Group commits by date
      const groups = {};
      commits.forEach(c => {
        const date = c.commit.author.date.slice(0, 10);
        if (!groups[date]) groups[date] = [];
        groups[date].push(c);
      });

      let html = '';
      Object.keys(groups).sort().reverse().forEach(date => {
        const d = new Date(date + 'T00:00:00');
        const label = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        html += `<div class="history-date-group"><h2>${label}</h2>
          <table class="history-table">
            <thead><tr>
              <th>Contributor</th>
              <th>Type</th>
              <th>Memo</th>
            </tr></thead>
            <tbody>`;

        groups[date].forEach(c => {
          const msg = c.commit.message.split('\n')[0];
          const url = c.html_url;
          const authorLogin = c.author ? c.author.login : null;

          // Parse conventional commit prefix
          const prefixMatch = msg.match(/^(feat|fix|docs|refactor|chore|style|test|perf|ci|build)(\(.+?\))?:\s*/i);
          let type = 'other';
          let cleanMsg = msg;
          if (prefixMatch) {
            type = prefixMatch[1].toLowerCase();
            cleanMsg = msg.slice(prefixMatch[0].length);
          }

          const badgeType = ['feat', 'fix', 'docs', 'refactor'].includes(type) ? type : 'other';
          const badgeLabel = prefixMatch ? prefixMatch[1].toLowerCase() : 'commit';
          const contributor = authorLogin ? `@${authorLogin}` : '';

          html += `
            <tr class="history-row" onclick="window.open('${url}', '_blank')">
              <td class="col-contributor">${contributor}</td>
              <td class="col-type"><span class="change-type ${badgeType}">${badgeLabel}</span></td>
              <td class="col-memo">${cleanMsg}</td>
            </tr>
          `;
        });

        html += '</tbody></table></div>';
      });

      container.className = '';
      container.innerHTML = html;
    })
    .catch(err => {
      const container = document.getElementById('history-list');
      if (container) {
        container.className = 'history-error';
        container.innerHTML = `Could not load commit history. <br><small>${err.message}</small>`;
      }
    });
}

async function loadCharter() {
  clearOrientationRotator();
  currentDoc = 'charter';
  showSidebar('charter');
  contentEl.innerHTML = '<p>Loading Charter&hellip;</p>';
  updateActiveNavLink('charter');

  try {
    const result = await api.getDocumentContent('charter');
    const markdown = result.content || result;
    let html = marked.parse(markdown);

    html = '<div class="charter-banner">The definitive source for the Charter is <a href="https://charter.henkaku.center" target="_blank" rel="noopener noreferrer">charter.henkaku.center</a>, which also provides an interface for proposing and voting on amendments and exporting the Charter in various formats.</div><div class="charter-version" id="charter-version-info"></div>' + html;

    contentEl.innerHTML = html;
    renderMermaidDiagrams();

    // Fetch version info
    try {
      const head = await api.getHead('charter');
      if (head && head.current_version_id) {
        const versions = await api.getVersions('charter');
        if (versions && versions.length > 0) {
          const latest = versions[versions.length - 1];
          const date = new Date(latest.approved_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
          const versionEl = document.getElementById('charter-version-info');
          if (versionEl) versionEl.textContent = `Current version: ${date}`;
        }
      }
    } catch (e) { /* version info is non-critical */ }

    assignHeadingIds();
    makeCollapsible();
    buildDocToc('charter');
    window.scrollTo(0, 0);
  } catch (err) {
    contentEl.innerHTML = `<p style="color:#c62828;">Error loading Charter: ${err.message}</p>`;
  }
}

function loadDoc(path, docKey) {
  clearOrientationRotator();
  currentDoc = docKey;
  const cacheBuster = `?t=${Date.now()}`;

  fetch(path + cacheBuster, { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${path}`);
      return response.text();
    })
    .then(markdown => {
      // Extract and preserve HTML comments
      const commentPlaceholders = [];
      let processedMarkdown = markdown.replace(/<!--([\s\S]*?)-->/g, (match, content) => {
        const index = commentPlaceholders.length;
        commentPlaceholders.push(content.trim());
        return `<!--PLACEHOLDER_${index}-->`;
      });

      // Parse markdown
      let html = marked.parse(processedMarkdown);

      // Replace comment placeholders
      commentPlaceholders.forEach((content, index) => {
        const placeholder = `<!--PLACEHOLDER_${index}-->`;
        const escapedContent = content
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\n/g, '<br>');
        const commentDiv = `<div class="html-comment">${escapedContent}</div>`;
        html = html.replace(placeholder, commentDiv);
      });

      // Charter banner: link to definitive source with version info
      if (docKey === 'charter') {
        html = '<div class="charter-banner">The definitive source for the Charter is <a href="https://charter.henkaku.center" target="_blank" rel="noopener noreferrer">charter.henkaku.center</a>, which also provides an interface for proposing and voting on amendments and exporting the Charter in various formats.</div><div class="charter-version" id="charter-version-info"></div>' + html;
      }

      contentEl.innerHTML = html;
      renderMermaidDiagrams();

      // Fetch Charter version info
      if (docKey === 'charter') {
        fetch('https://charter.henkaku.center/data/versions.json?t=' + Date.now())
          .then(r => r.json())
          .then(versions => {
            var keys = Object.keys(versions).sort();
            var latest = versions[keys[keys.length - 1]];
            var vNum = keys[keys.length - 1].split('_')[0].replace('v', '');
            var date = new Date(latest.approved_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            var el = document.getElementById('charter-version-info');
            if (el) el.textContent = 'Version ' + vNum + ' \u00b7 Approved ' + date;
          })
          .catch(function() {});
      }

      // Add IDs to headings for anchor links
      assignHeadingIds();

      // Show site map sidebar
      showSidebar(docKey);

      // Make sections collapsible
      makeCollapsible();

      // Build right-hand document TOC
      buildDocToc(docKey);

      // Update active nav link
      updateActiveNavLink(docKey);

      // Scroll to top
      window.scrollTo(0, 0);
    })
    .catch(error => {
      contentEl.innerHTML = "<p>Error loading document.</p>";
      console.error(error);
    });
}

function loadContact() {
  clearOrientationRotator();
  currentDoc = 'contact';
  showSidebar('contact');

  contentEl.innerHTML = `
    <div class="contact-page" style="max-width: 780px;">
      <h1>Contact</h1>

      <div style="margin:2rem 0;padding:1.5rem;border:1px solid #e5e5e5;border-radius:8px;background:#f9f9f9;">
        <div style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.08em;color:#999;margin-bottom:0.5rem;">Email</div>
        <a href="mailto:compass@henkaku.center" style="font-size:1.1rem;">compass@henkaku.center</a>
        <p style="margin:0.5rem 0 0;color:#666;font-size:0.9rem;">Questions, feedback, invite codes, or anything else.</p>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-top:2rem;">
        <div>
          <div style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.08em;color:#999;margin-bottom:0.75rem;">Organizations</div>
          <div style="display:flex;flex-direction:column;gap:0.4rem;">
            <a href="https://henkaku.center" target="_blank" rel="noopener">Henkaku Center</a>
            <a href="https://sds.chibatech.dev" target="_blank" rel="noopener">Graduate School of Design &amp; Science</a>
            <a href="https://chibatech.jp" target="_blank" rel="noopener">Chiba Institute of Technology</a>
          </div>
        </div>
        <div>
          <div style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.08em;color:#999;margin-bottom:0.75rem;">Source Code</div>
          <div style="display:flex;flex-direction:column;gap:0.4rem;">
            <a href="https://github.com/henkaku-center/compass" target="_blank" rel="noopener">Compass</a>
            <a href="https://github.com/henkaku-center/charter" target="_blank" rel="noopener">Charter</a>
            <a href="https://github.com/henkaku-center/registry" target="_blank" rel="noopener">Registry</a>
          </div>
        </div>
      </div>
    </div>
  `;

  updateActiveNavLink('contact');
  window.scrollTo(0, 0);
}

function loadContribute() {
  clearOrientationRotator();
  currentDoc = 'contribute';
  showSidebar('contribute');

  var downloadBtn = isLoggedIn()
    ? `<p><a href="#" onclick="downloadOnboarding(event)" style="display:inline-block;padding:0.5rem 1.25rem;background:#111;color:#fff;border-radius:6px;text-decoration:none;font-weight:500;">Download ONBOARDING.md</a></p>`
    : `<p><span style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.5rem 1.25rem;background:#e5e5e5;color:#999;border-radius:6px;font-weight:500;cursor:default;">Download ONBOARDING.md</span> <a href="#" onclick="showLoginModal();return false" style="font-size:0.85rem;margin-left:0.5rem;">Log in to download</a></p>`;

  contentEl.innerHTML = `
    <div class="contribute-page" style="max-width: 780px;">
      <h1>Contribute with AI</h1>
      <p>You can interact with Compass using your own AI assistant &mdash; exploring data, querying the registry, and even making contributions &mdash; all through natural conversation.</p>

      <h2>How it works</h2>
      <p>Compass has a public API that any AI coding assistant can use on your behalf. You give your AI the onboarding guide (a single file), and it learns how to read the registry, look up people and projects, browse the Charter, submit feedback, and more.</p>

      <h2>Step 1: Download the onboarding guide</h2>
      <p>This file tells your AI everything it needs to know about the Compass API &mdash; what endpoints exist, how authentication works, and what you can ask it to do.</p>
      ${downloadBtn}

      <h2>Step 2: Give it to your AI</h2>
      <p>How you do this depends on your platform. Here are instructions for the most common AI coding assistants:</p>

      <h3>Claude Code <span style="font-size:0.85em;color:#666;font-weight:normal;">(recommended)</span></h3>
      <p><a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener">Claude Code</a> is Anthropic&rsquo;s CLI agent. It can read files, make API calls, and handle multi-step tasks autonomously.</p>
      <ol>
        <li>Save <code>ONBOARDING.md</code> to your working directory</li>
        <li>Open Claude Code in a terminal: <code>claude</code></li>
        <li>Tell it: <em>&ldquo;Read ONBOARDING.md &mdash; that&rsquo;s the Compass API guide. Show me who&rsquo;s in the registry.&rdquo;</em></li>
      </ol>
      <p>Claude Code can read the file directly, make <code>curl</code> calls to the API, and present results conversationally. It handles authentication, multi-step workflows (like creating proposals), and can even upload files.</p>
      <p>For persistent access, add the file to your project&rsquo;s <code>CLAUDE.md</code> or reference it in your instructions:</p>
      <pre><code># In your CLAUDE.md
See ONBOARDING.md for the Compass API reference.</code></pre>

      <h3>ChatGPT (with Code Interpreter or browsing)</h3>
      <ol>
        <li>Upload <code>ONBOARDING.md</code> as a file attachment in a conversation</li>
        <li>Say: <em>&ldquo;Use this API guide to help me explore Compass. Start by showing me all the people.&rdquo;</em></li>
      </ol>
      <p>ChatGPT can read the file and make API calls if browsing is enabled. For write operations, you&rsquo;ll need to provide your credentials.</p>

      <h3>Cursor / Windsurf / Copilot</h3>
      <ol>
        <li>Save <code>ONBOARDING.md</code> in your project directory</li>
        <li>Reference it in the AI chat: <em>&ldquo;@ONBOARDING.md &mdash; use this API guide to fetch all projects from Compass&rdquo;</em></li>
      </ol>
      <p>These editor-based agents can read the file and run terminal commands to interact with the API.</p>

      <h3>Other AI assistants</h3>
      <p>Any AI that can read documents and make HTTP requests will work. The key is giving it the <code>ONBOARDING.md</code> file so it knows the API structure. Copy-paste the contents if file upload isn&rsquo;t available.</p>

      <h2>What you can do</h2>
      <p>Once your AI has the onboarding guide, you can ask it to:</p>
      <ul>
        <li><strong>Explore</strong> &mdash; browse people, projects, initiatives, courses, events, and more</li>
        <li><strong>Read the Charter</strong> &mdash; fetch and walk through governance documents</li>
        <li><strong>See how things connect</strong> &mdash; who works on what, which institutions host which programs</li>
        <li><strong>Check proposals</strong> &mdash; see what&rsquo;s up for a vote and how people voted</li>
        <li><strong>Add yourself</strong> &mdash; create your own person entry in the registry</li>
        <li><strong>Propose changes</strong> &mdash; draft and submit Charter amendments</li>
        <li><strong>Submit feedback</strong> &mdash; report bugs or suggest features</li>
      </ul>
      <p>Read operations work immediately. Write operations require a Compass account &mdash; ask an admin for an invite code if you don&rsquo;t have one.</p>

      <h2>Why this matters</h2>
      <p>Compass is coordination infrastructure designed to be accessed by both humans and AI agents. Instead of requiring everyone to learn a web interface, the API lets your personal AI act as your guide &mdash; fetching data, explaining context, and handling the mechanics of contribution so you can focus on what you want to say or do.</p>
      <p>This is one of the ways the <a href="#charter">Charter&rsquo;s</a> commitment to human-AI collaboration shows up in practice: AI assists with access and mechanics, while authority and decisions remain with you.</p>
    </div>
  `;

  updateActiveNavLink('contribute');
  window.scrollTo(0, 0);
}

function downloadOnboarding(e) {
  e.preventDefault();
  var token = localStorage.getItem('registry_access_token');
  if (!token) return;
  fetch('https://registry.henkaku.center/api/v1/compass/files/docs/ONBOARDING.md', {
    headers: { 'Authorization': 'Bearer ' + token }
  })
    .then(function(res) {
      if (!res.ok) throw new Error('Download failed');
      return res.blob();
    })
    .then(function(blob) {
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'ONBOARDING.md';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    })
    .catch(function(err) { alert('Download failed: ' + err.message); });
}

// --- Feedback page ---

var feedbackSelectedFiles = [];
var MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function loadFeedback() {
  clearOrientationRotator();
  currentDoc = 'feedback';
  showSidebar('feedback');

  var formHtml = '';
  if (isLoggedIn()) {
    formHtml = `
      <div class="feedback-form-section">
        <h2>Submit Feedback</h2>
        <div class="feedback-form-error" id="feedback-form-error"></div>
        <input type="hidden" id="feedback-type" value="feature_request" />
        <div class="form-group">
          <div class="feedback-type-toggle">
            <button type="button" class="type-btn active" data-value="feature_request" onclick="selectFeedbackType(this)">Feature Request</button>
            <button type="button" class="type-btn" data-value="bug_report" onclick="selectFeedbackType(this)">Bug Report</button>
          </div>
        </div>
        <div class="form-group">
          <label for="feedback-title">Title</label>
          <input type="text" id="feedback-title" placeholder="Brief summary" />
        </div>
        <div class="form-group">
          <label for="feedback-desc">Description</label>
          <textarea id="feedback-desc" class="tall" placeholder="Detailed description..."></textarea>
        </div>
        <div class="form-group">
          <label for="feedback-files">Attachments <span style="font-weight:normal;color:#888;">(images or files, 10 MB max each)</span></label>
          <input type="file" id="feedback-files" multiple accept="image/*,.pdf,.txt,.md,.json,.csv" />
          <div id="feedback-file-list" class="feedback-file-list"></div>
        </div>
        <div class="modal-actions">
          <button class="btn btn-primary" id="feedback-submit-btn" onclick="handleFeedbackSubmit()">Submit</button>
        </div>
      </div>
    `;
  } else {
    formHtml = `
      <div class="feedback-login-prompt">
        <p>Log in to submit feedback.</p>
        <button class="btn" onclick="showLoginModal()">Login</button>
      </div>
    `;
  }

  contentEl.innerHTML = `
    <div class="feedback-page">
      <h1>Feedback</h1>
      <p class="feedback-subtitle">Bug reports and feature requests for the Compass project.</p>
      ${formHtml}
      <div id="feedback-entries"><div class="feedback-empty">Loading&hellip;</div></div>
    </div>
  `;

  updateActiveNavLink('feedback');
  window.scrollTo(0, 0);
  feedbackSelectedFiles = [];
  setupFeedbackFileInput();
  loadFeedbackEntries();
}

function loadFeedbackEntries() {
  var entriesEl = document.getElementById('feedback-entries');
  if (!entriesEl) return;

  Promise.all([api.getFeedback('compass'), api.getStakeholders().catch(function() { return []; })])
    .then(function(results) {
      var entries = results[0];
      var users = results[1];
      var userNames = {};
      users.forEach(function(u) { userNames[u.id] = u.name; });
      if (!entries || entries.length === 0) {
        entriesEl.innerHTML = '<div class="feedback-empty">No feedback submitted yet.</div>';
        return;
      }

      var closedStatuses = { resolved: true, closed: true };
      var openEntries = entries.filter(function(e) { return !closedStatuses[e.status]; });
      var closedEntries = entries.filter(function(e) { return !!closedStatuses[e.status]; });

      function renderList(list) {
        var listEl = document.getElementById('feedback-list');
        if (!listEl) return;
        listEl.innerHTML = '';
        if (list.length === 0) {
          listEl.innerHTML = '<div class="feedback-empty">No items.</div>';
          return;
        }
        list.forEach(function(entry) {
          listEl.appendChild(renderFeedbackCard(entry, userNames));
        });
      }

      entriesEl.innerHTML =
        '<h2 style="font-size:1rem;border:none;margin:0 0 0.75rem;padding:0;">Existing Feedback</h2>' +
        '<div class="feedback-filter-toggle">' +
          '<button class="filter-btn active" data-filter="open">Open (' + openEntries.length + ')</button>' +
          '<button class="filter-btn" data-filter="closed">Closed (' + closedEntries.length + ')</button>' +
        '</div>' +
        '<div id="feedback-list"></div>';

      renderList(openEntries);

      entriesEl.querySelector('.feedback-filter-toggle').addEventListener('click', function(e) {
        var btn = e.target.closest('.filter-btn');
        if (!btn) return;
        entriesEl.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderList(btn.getAttribute('data-filter') === 'closed' ? closedEntries : openEntries);
      });
    })
    .catch(function(err) {
      entriesEl.innerHTML = '<div class="feedback-empty" style="color:#c62828;">Error loading feedback: ' + escapeHtml(err.message) + '</div>';
    });
}

function renderFeedbackCard(entry, userNames) {
  var card = document.createElement('div');
  card.className = 'feedback-card';

  var isBug = entry.type === 'bug_report' || entry.type === 'bug';
  var typeLabel = isBug ? 'Bug' : 'Feature';
  var typeCls = isBug ? 'bug' : 'feature';
  var statusLabel = (entry.status || 'open').replace('_', ' ');

  // Status changes are admin/developer-only via API
  var statusHtml = '<span class="feedback-status-badge ' + escapeAttr(entry.status || 'open') + '">' + escapeHtml(statusLabel) + '</span>';

  var dateStr = entry.created_at || entry.submitted_at;
  var date = dateStr ? new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
  var authorId = entry.author_id || entry.submitted_by || '';
  var author = (userNames && userNames[authorId]) || authorId || 'unknown';

  var attachmentsHtml = '';
  if (entry.attachments && entry.attachments.length > 0) {
    attachmentsHtml = '<div class="feedback-card-attachments">';
    entry.attachments.forEach(function(att) {
      var url = api.getAttachmentUrl(entry.id, att.id);
      var isImage = (att.content_type || att.type || '').startsWith('image/');
      var name = att.filename || att.name || 'attachment';
      if (isImage) {
        attachmentsHtml += '<a href="' + escapeAttr(url) + '" target="_blank" rel="noopener noreferrer"><img class="attachment-thumb" src="' + escapeAttr(url) + '" alt="' + escapeAttr(name) + '" /></a>';
      } else {
        attachmentsHtml += '<a href="' + escapeAttr(url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(name) + '</a>';
      }
    });
    attachmentsHtml += '</div>';
  }

  var hasResolution = entry.resolution && (entry.resolution.analysis || entry.resolution.fix);
  var chevronHtml = '';
  var resolutionHtml = '';
  if (hasResolution) {
    card.classList.add('expandable');
    chevronHtml = '<span class="feedback-chevron">&#9654;</span>';
    resolutionHtml = '<div class="feedback-resolution">';
    if (entry.resolution.analysis) {
      resolutionHtml += '<h4>Analysis</h4><p>' + escapeHtml(entry.resolution.analysis) + '</p>';
    }
    if (entry.resolution.fix) {
      resolutionHtml += '<h4>Fix</h4><p>' + escapeHtml(entry.resolution.fix) + '</p>';
    }
    resolutionHtml += '</div>';
  }

  card.innerHTML =
    '<div class="feedback-card-header">' +
      '<span class="feedback-type-badge ' + typeCls + '">' + escapeHtml(typeLabel) + '</span>' +
      statusHtml +
      '<span class="feedback-card-title">' + escapeHtml(entry.title || '') + '</span>' +
      chevronHtml +
    '</div>' +
    (entry.description ? '<div class="feedback-card-desc">' + escapeHtml(entry.description) + '</div>' : '') +
    attachmentsHtml +
    '<div class="feedback-card-meta">by ' + escapeHtml(author) + (date ? ' on ' + date : '') + '</div>' +
    resolutionHtml;

  if (hasResolution) {
    card.addEventListener('click', function() {
      card.classList.toggle('expanded');
      card.querySelector('.feedback-resolution').classList.toggle('visible');
    });
  }

  return card;
}

function showFeedbackFormError(msg) {
  var el = document.getElementById('feedback-form-error');
  if (!el) return;
  if (msg) {
    el.textContent = msg;
    el.classList.add('visible');
  } else {
    el.textContent = '';
    el.classList.remove('visible');
  }
}

function selectFeedbackType(btn) {
  document.querySelectorAll('.feedback-type-toggle .type-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  document.getElementById('feedback-type').value = btn.getAttribute('data-value');
}

function setupFeedbackFileInput() {
  var input = document.getElementById('feedback-files');
  if (!input) return;
  input.addEventListener('change', function() {
    Array.from(input.files).forEach(function(file) {
      if (file.size > MAX_FILE_SIZE) {
        showFeedbackFormError(file.name + ' exceeds 10 MB limit.');
        return;
      }
      if (!feedbackSelectedFiles.some(function(f) { return f.name === file.name && f.size === file.size; })) {
        feedbackSelectedFiles.push(file);
      }
    });
    input.value = '';
    renderFeedbackFileList();
  });
}

function renderFeedbackFileList() {
  var listEl = document.getElementById('feedback-file-list');
  if (!listEl) return;
  listEl.innerHTML = '';
  feedbackSelectedFiles.forEach(function(file, i) {
    var chip = document.createElement('span');
    chip.className = 'feedback-file-chip';
    var sizeKB = (file.size / 1024).toFixed(0);
    var sizeStr = file.size >= 1048576 ? (file.size / 1048576).toFixed(1) + ' MB' : sizeKB + ' KB';
    chip.innerHTML = escapeHtml(file.name) + ' <span style="color:#aaa;">(' + sizeStr + ')</span> <span class="remove-file" data-idx="' + i + '">&times;</span>';
    chip.querySelector('.remove-file').addEventListener('click', function() {
      feedbackSelectedFiles.splice(i, 1);
      renderFeedbackFileList();
    });
    listEl.appendChild(chip);
  });
}

async function handleFeedbackSubmit() {
  showFeedbackFormError('');
  var title = (document.getElementById('feedback-title').value || '').trim();
  var desc = (document.getElementById('feedback-desc').value || '').trim();
  var type = document.getElementById('feedback-type').value;

  if (!title) {
    showFeedbackFormError('Title is required.');
    return;
  }
  if (!isLoggedIn()) {
    showFeedbackFormError('Please log in first.');
    return;
  }

  var entryId = 'fb_' + Date.now().toString(36);
  var btn = document.getElementById('feedback-submit-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Submitting\u2026'; }

  try {
    var feedbackData = {
      id: entryId,
      project: 'compass',
      type: type,
      author_id: currentUser ? currentUser.id : 'unknown',
      title: title,
      description: desc
    };

    await api.createFeedback(feedbackData);

    // Upload attachments
    for (var i = 0; i < feedbackSelectedFiles.length; i++) {
      await api.uploadAttachment(entryId, feedbackSelectedFiles[i]);
    }

    document.getElementById('feedback-title').value = '';
    document.getElementById('feedback-desc').value = '';
    feedbackSelectedFiles = [];
    renderFeedbackFileList();
    showFeedbackFormError('');
    if (btn) { btn.disabled = false; btn.textContent = 'Submit'; }
    loadFeedbackEntries();
  } catch (err) {
    showFeedbackFormError(err.message);
    if (btn) { btn.disabled = false; btn.textContent = 'Submit'; }
  }
}

function handleFeedbackStatusChange(selectEl) {
  var entryId = selectEl.getAttribute('data-entry-id');
  var newStatus = selectEl.value;
  selectEl.disabled = true;

  api.updateFeedback(entryId, { status: newStatus })
    .then(function() {
      selectEl.disabled = false;
    })
    .catch(function(err) {
      alert('Failed to update status: ' + err.message);
      selectEl.disabled = false;
      loadFeedbackEntries();
    });
}
