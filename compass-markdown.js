// compass-markdown.js — Mermaid + Marked configuration
// Depends on: mermaid (CDN), marked (CDN)

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#e8eaf6',
    primaryTextColor: '#111',
    primaryBorderColor: '#9fa8da',
    lineColor: '#5c6bc0',
    secondaryColor: '#f5f5f5',
    tertiaryColor: '#fff',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '14px',
    sectionBkgColor: '#dde1f8',
    sectionBkgColor2: '#f8f8f8',
    altSectionBkgColor: '#dde1f8',
    gridColor: '#e0e0e0',
    todayLineColor: '#2C40D3',
    taskBorderColor: '#5c6bc0',
    taskBkgColor: '#c5cae9',
    activeTaskBorderColor: '#2C40D3',
    activeTaskBkgColor: '#9fa8da',
    doneTaskBkgColor: '#e8eaf6',
    doneTaskBorderColor: '#9fa8da',
    milestoneTextColor: '#111'
  },
  gantt: {
    titleTopMargin: 15,
    barHeight: 24,
    barGap: 6,
    topPadding: 40,
    sidePadding: 60,
    numberSectionStyles: 2
  }
});

let mermaidCounter = 0;

marked.use({
  renderer: {
    code({ text, lang }) {
      if (lang && lang.toLowerCase() === 'mermaid') {
        const id = 'mermaid-' + (mermaidCounter++);
        return `<div class="mermaid-placeholder" data-id="${id}" data-content="${text.replace(/"/g, '&quot;')}" style="overflow-x:auto;"></div>`;
      }
      return `<pre><code class="language-${lang || ''}">${text}</code></pre>`;
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const titleAttr = title ? ` title="${title}"` : '';
      if (href && href.startsWith('http')) {
        return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
      }
      return `<a href="${href}"${titleAttr}>${text}</a>`;
    }
  }
});

// Call after inserting marked HTML into the DOM
async function renderMermaidDiagrams() {
  const placeholders = document.querySelectorAll('.mermaid-placeholder');
  for (const el of placeholders) {
    const id = el.dataset.id;
    const content = el.dataset.content.replace(/&quot;/g, '"');
    try {
      const { svg } = await mermaid.render(id, content);
      el.innerHTML = svg;
      el.classList.add('mermaid-rendered');
      // Fix alternating section colors post-render
      const svgEl = el.querySelector('svg');
      if (svgEl) {
        const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
        styleEl.textContent = `
          .section0 { fill: #dde1f8 !important; }
          .section1 { fill: #f5f5f5 !important; }
        `;
        svgEl.insertBefore(styleEl, svgEl.firstChild);
      }
    } catch (e) {
      el.innerHTML = `<pre style="color:#999;font-size:13px;">Diagram could not be rendered</pre>`;
      console.error('Mermaid render error:', e);
    }
  }
}
