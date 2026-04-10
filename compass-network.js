// compass-network.js — 3D force-graph network visualization for Compass
// Extracted from index.html. Depends on globals from index.html (contentEl, tocEl,
// docTocEl, layoutEl, currentDoc, api, ensureStore, buildGraphData, etc.),
// compass-config.js (nodeColors, networkDefaultOn, networkAllTypes, registryMeta),
// and CDN libs (ForceGraph3D, SpriteText, THREE).

    function loadNetwork() {
      clearOrientationRotator();
      currentDoc = 'network';
      tocEl.classList.remove('visible');
      docTocEl.classList.remove('visible');
      layoutEl.classList.remove('has-toc');

      // Parse ?show= and ?connected= from hash (e.g. #network?show=people,projects&connected=domains)
      const hashQuery = location.hash.split('?')[1];
      const params = hashQuery ? new URLSearchParams(hashQuery) : null;
      const showParam = params && params.get('show');
      const connParam = params && params.get('connected');
      let typeStates; // map of type -> 'on'|'connected'|'off'
      if (showParam || connParam) {
        const onSet = showParam ? new Set(showParam.split(',').filter(t => networkAllTypes.includes(t))) : new Set();
        const connSet = connParam ? new Set(connParam.split(',').filter(t => networkAllTypes.includes(t))) : new Set();
        typeStates = {};
        networkAllTypes.forEach(t => { typeStates[t] = onSet.has(t) ? 'on' : connSet.has(t) ? 'connected' : 'off'; });
      } else {
        typeStates = {};
        networkAllTypes.forEach(t => { typeStates[t] = networkDefaultOn.has(t) ? 'on' : 'off'; });
      }

      const filterButtons = networkAllTypes.map(t => {
        const cls = typeStates[t] === 'on' ? '' : typeStates[t] === 'connected' ? ' connected' : ' off';
        const label = t.charAt(0).toUpperCase() + t.slice(1);
        return `<button class="network-toggle${cls}" data-type="${t}"><span class="toggle-dot" style="background: ${nodeColors[t]}"></span> ${label}</button>`;
      }).join('\n              ');

      contentEl.innerHTML = `
        <div class="network-page">
          <div class="network-controls">
            <div class="network-filters" id="network-filters">
              ${filterButtons}
            </div>
          </div>
          <div class="network-container" id="network-container"></div>
          <div class="network-detail" id="network-detail"></div>
          <div class="network-controls-hint" id="network-controls-hint">
            <div><kbd>Left drag</kbd> Pan</div>
            <div><kbd>Right drag</kbd> Orbit</div>
            <div><kbd>Scroll</kbd> Zoom</div>
            <div><kbd>Click</kbd> Select node</div>
          </div>
        </div>
      `;

      updateActiveNavLink('network');
      window.scrollTo(0, 0);

      ensureStore().then(() => {
          const graphData = buildGraphData();
          const container = document.getElementById('network-container');
          if (!container) return;

          const graph = ForceGraph3D()(container)
            .graphData(graphData)
            .nodeId('id')
            .nodeLabel(() => '')
            .nodeColor(node => {
              if (!window._hoveredNodeId || (window._connectedNodeIds && window._connectedNodeIds.has(node.id))) return nodeColors[node.type] || '#999';
              return '#2a2a2a';
            })
            .nodeVal('val')
            .nodeRelSize(3)
            .nodeOpacity(0.9)
            .nodeThreeObjectExtend(true)
            .nodeThreeObject(node => {
              const sprite = new SpriteText(node.label, 3.5, '#ffffff');
              sprite.material.depthWrite = false;
              sprite.material.depthTest = false;
              sprite.material.opacity = 0.55;
              sprite.material.transparent = true;
              sprite.renderOrder = 1;
              node.__labelSprite = sprite;
              node.__labelBaseScale = { x: sprite.scale.x, y: sprite.scale.y, z: sprite.scale.z };
              return sprite;
            })
            .onNodeHover(node => {
              window._hoveredNode = node;
              // Build set of connected node IDs
              window._hoveredNodeId = node ? node.id : null;
              window._connectedNodeIds = new Set();
              if (node) {
                window._connectedNodeIds.add(node.id);
                graph.graphData().links.forEach(l => {
                  const src = typeof l.source === 'object' ? l.source.id : l.source;
                  const tgt = typeof l.target === 'object' ? l.target.id : l.target;
                  if (src === node.id) window._connectedNodeIds.add(tgt);
                  if (tgt === node.id) window._connectedNodeIds.add(src);
                });
              }
              container.style.cursor = node ? 'pointer' : 'default';
            })
            .linkColor(() => 'rgba(255,255,255,0.15)')
            .linkWidth(0.3)
            .backgroundColor('#1e1e1e')
            .onNodeClick(node => {
              if (window._selectedNodeId === node.id) {
                deselectNode();
              } else {
                selectNode(node);
              }
            })
            .onBackgroundClick(() => {
              if (window._selectedNodeId) deselectNode();
            });

          // Soften repulsion so disconnected nodes don't fly far away
          graph.d3Force('charge').strength(-30);
          graph.d3Force('center').strength(0.15);
          window._d3ForceCenter = graph.d3Force('center');
          window._d3DefaultLinkStrength = graph.d3Force('link').strength();

          // Fit all nodes in view early
          setTimeout(() => graph.zoomToFit(400, 40), 500);

          // Camera: left-drag = pan, right-drag = orbit, scroll = zoom
          const controls = graph.controls();
          controls.mouseButtons = { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE };
          controls.touches = { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_ROTATE };
          controls.panSpeed = 0.1;

          // Keep labels slightly below nodes relative to camera orientation
          const _camUp = new THREE.Vector3();
          graph.onEngineTick(() => {
            const camera = graph.camera();
            _camUp.set(0, 1, 0).applyQuaternion(camera.quaternion);
            const currentNodes = graph.graphData().nodes;
            for (let i = 0; i < currentNodes.length; i++) {
              const s = currentNodes[i].__labelSprite;
              if (s) {
                s.position.set(-_camUp.x * 6, -_camUp.y * 6, -_camUp.z * 6);
              }
            }
          });

          // Animate hover transitions (~0.5s ease)
          const LERP_SPEED = 0.08; // per frame, ~0.5s to settle at 60fps
          function lerp(a, b, t) { return a + (b - a) * t; }
          function lerpColor(current, target, t) {
            // Parse hex #RRGGBB
            const cr = parseInt(current.slice(1,3),16), cg = parseInt(current.slice(3,5),16), cb = parseInt(current.slice(5,7),16);
            const tr = parseInt(target.slice(1,3),16), tg = parseInt(target.slice(3,5),16), tb = parseInt(target.slice(5,7),16);
            const r = Math.round(lerp(cr,tr,t)), g = Math.round(lerp(cg,tg,t)), b2 = Math.round(lerp(cb,tb,t));
            return '#' + ((1<<24)+(r<<16)+(g<<8)+b2).toString(16).slice(1);
          }

          // Initialize per-node/link animation state
          graph.graphData().nodes.forEach(n => { n._curColor = nodeColors[n.type] || '#999999'; n._curLabelOp = 0.55; n._curScale = 1.0; });
          graph.graphData().links.forEach(l => { l._curOp = 0.15; l._curWidth = 0.3; });

          function animateHover() {
            window._hoverAnimFrame = requestAnimationFrame(animateHover);
            // Determine active focus: hover takes priority, then selection
            const hId = window._hoveredNodeId;
            const sId = window._selectedNodeId;
            const sNeighbors = window._selectedNeighborIds;
            const focusId = hId || sId;
            // Connected set: for hover use hover connections, for selection use selection neighbors
            let focusConn = null;
            if (hId) {
              focusConn = window._connectedNodeIds;
            } else if (sId && sNeighbors) {
              focusConn = new Set(sNeighbors);
              focusConn.add(sId);
            }

            const nodes = graph.graphData().nodes;
            const links = graph.graphData().links;

            // Animate nodes
            for (let i = 0; i < nodes.length; i++) {
              const n = nodes[i];
              const isConn = !focusId || (focusConn && focusConn.has(n.id));
              const isFocused = focusId && n.id === focusId;
              const targetColor = isConn ? (nodeColors[n.type] || '#999999') : '#2a2a2a';
              const targetLabelOp = !focusId ? 0.55 : (isConn ? 0.9 : 0.1);
              const targetScale = isFocused ? 1.3 : 1.0;

              n._curColor = lerpColor(n._curColor || '#999999', targetColor, LERP_SPEED);
              n._curLabelOp = lerp(n._curLabelOp || 0.55, targetLabelOp, LERP_SPEED);
              n._curScale = lerp(n._curScale || 1.0, targetScale, LERP_SPEED);

              if (n.__labelSprite) {
                n.__labelSprite.material.opacity = n._curLabelOp;
                const bs = n.__labelBaseScale;
                if (bs) n.__labelSprite.scale.set(bs.x * n._curScale, bs.y * n._curScale, bs.z * n._curScale);
              }
            }
            graph.nodeColor(n => n._curColor);

            // Animate links
            for (let i = 0; i < links.length; i++) {
              const l = links[i];
              const src = typeof l.source === 'object' ? l.source.id : l.source;
              const tgt = typeof l.target === 'object' ? l.target.id : l.target;
              const touchesFocus = focusId && (src === focusId || tgt === focusId);
              // When selected, only show edges where both endpoints are in the connected set
              const bothInSet = focusConn && focusConn.has(src) && focusConn.has(tgt);
              const isConn = hId ? touchesFocus : (sId ? (touchesFocus && bothInSet) : false);
              const targetOp = !focusId ? 0.15 : (isConn ? 0.8 : 0.0);
              const targetWidth = !focusId ? 0.3 : (isConn ? 1.5 : 0.3);
              l._curOp = lerp(l._curOp || 0.15, targetOp, LERP_SPEED);
              l._curWidth = lerp(l._curWidth || 0.3, targetWidth, LERP_SPEED);
            }
            graph.linkColor(l => `rgba(255,255,255,${(l._curOp != null ? l._curOp : 0.15).toFixed(3)})`);
            graph.linkWidth(l => l._curWidth);
          }
          animateHover();

          // Resize graph when window resizes
          function resizeGraph() {
            graph.width(container.clientWidth);
            graph.height(container.clientHeight);
          }
          window._networkResizeHandler = resizeGraph;
          window.addEventListener('resize', resizeGraph);

          // Store graph and full data for filtering
          window._forceGraph = graph;
          window._forceGraphData = graphData;
          // No need to save link defs — we never swap graphData during selection
          window._selectedNode = null;

          // Fade out controls hint after first interaction
          const hint = document.getElementById('network-controls-hint');
          if (hint) {
            const fadeHint = () => {
              hint.style.opacity = '0';
              container.removeEventListener('pointerdown', fadeHint);
              container.removeEventListener('wheel', fadeHint);
            };
            container.addEventListener('pointerdown', fadeHint);
            container.addEventListener('wheel', fadeHint);
          }

          // Helper: get link endpoint ID (handles both string and object refs)
          function linkId(endpoint) {
            return typeof endpoint === 'object' ? endpoint.id : endpoint;
          }

          // Helper: get filter state for each type from buttons
          function getTypeStates() {
            const states = { on: new Set(), connected: new Set() };
            const filters = document.getElementById('network-filters');
            if (filters) {
              filters.querySelectorAll('.network-toggle').forEach(btn => {
                if (btn.classList.contains('off')) return;
                if (btn.classList.contains('connected')) states.connected.add(btn.dataset.type);
                else states.on.add(btn.dataset.type);
              });
            }
            return states;
          }

          // Helper: get all visible types (on + connected) for backward compat
          function getCheckedTypes() {
            const s = getTypeStates();
            return [...s.on, ...s.connected];
          }

          // Helper: apply type filters to full data (no selection)
          function applyTypeFilters() {
            const { on: onTypes, connected: connTypes } = getTypeStates();
            const fullData = window._forceGraphData;
            // First pass: all fully-on nodes
            const onNodes = fullData.nodes.filter(n => onTypes.has(n.type));
            const onIds = new Set(onNodes.map(n => n.id));
            // Second pass: connected-type nodes that link to at least one on-node
            const connNodes = connTypes.size > 0
              ? fullData.nodes.filter(n => connTypes.has(n.type) && fullData.links.some(l =>
                  (linkId(l.source) === n.id && onIds.has(linkId(l.target))) ||
                  (linkId(l.target) === n.id && onIds.has(linkId(l.source)))
                ))
              : [];
            const filteredNodes = [...onNodes, ...connNodes];
            const visibleIds = new Set(filteredNodes.map(n => n.id));
            const filteredLinks = fullData.links.filter(l =>
              visibleIds.has(linkId(l.source)) && visibleIds.has(linkId(l.target))
            );
            graph.graphData({ nodes: filteredNodes, links: filteredLinks });
          }

          // Select a node: keep all nodes & links, but zero out forces for non-adjacent links
          function selectNode(node) {
            // Unpin all nodes from any previous selection
            graph.graphData().nodes.forEach(n => {
              n.fx = undefined; n.fy = undefined; n.fz = undefined;
            });

            window._selectedNode = node;
            const nodeId = node.id;

            // Find neighbor IDs from current graph links
            const neighborIds = new Set();
            graph.graphData().links.forEach(l => {
              const srcId = typeof l.source === 'object' ? l.source.id : l.source;
              const tgtId = typeof l.target === 'object' ? l.target.id : l.target;
              if (srcId === nodeId) neighborIds.add(tgtId);
              else if (tgtId === nodeId) neighborIds.add(srcId);
            });

            // Store selection context for animation system
            window._selectedNodeId = nodeId;
            window._selectedNeighborIds = neighborIds;

            // Pin selected node at its current position so the camera target stays valid
            const selectedInGraph = graph.graphData().nodes.find(n => n.id === nodeId);
            if (selectedInGraph) {
              selectedInGraph.fx = selectedInGraph.x;
              selectedInGraph.fy = selectedInGraph.y;
              selectedInGraph.fz = selectedInGraph.z;
            }

            // Disable center force so unconnected nodes aren't pulled to origin
            graph.d3Force('center', null);

            // Zero out link force strength for non-adjacent links
            graph.d3Force('link').strength(l => {
              const src = typeof l.source === 'object' ? l.source.id : l.source;
              const tgt = typeof l.target === 'object' ? l.target.id : l.target;
              return (src === nodeId || tgt === nodeId) ? 1 : 0;
            });

            // Strengthen charge repulsion for unconnected nodes to push them away
            graph.d3Force('charge').strength(n => {
              if (n.id === nodeId || neighborIds.has(n.id)) return -30;
              return -200;
            });
            graph.d3ReheatSimulation();

            // Save camera state before zooming in
            const cam = graph.camera();
            window._preSelectCameraPos = { x: cam.position.x, y: cam.position.y, z: cam.position.z };
            const lookAt = graph.controls().target;
            window._preSelectCameraLookAt = { x: lookAt.x, y: lookAt.y, z: lookAt.z };

            // Fly camera to the pinned node's position
            const nx = selectedInGraph ? selectedInGraph.x : 0;
            const ny = selectedInGraph ? selectedInGraph.y : 0;
            const nz = selectedInGraph ? selectedInGraph.z : 0;
            const ctrl = graph.controls();
            ctrl.enabled = false;
            graph.cameraPosition(
              { x: nx, y: ny, z: nz + 300 },
              { x: nx, y: ny, z: nz },
              1500
            );
            setTimeout(() => { ctrl.enabled = true; }, 1550);

            // Show detail panel
            showDetail(node);
          }

          // Deselect: gradually restore forces and zoom out
          function deselectNode() {
            window._selectedNode = null;
            window._selectedNodeId = null;
            window._selectedNeighborIds = null;

            // Unpin all nodes
            graph.graphData().nodes.forEach(n => {
              n.fx = undefined; n.fy = undefined; n.fz = undefined;
            });

            // Restore center force
            graph.d3Force('center', window._d3ForceCenter);

            // Gradually ramp link strength and charge back to defaults
            if (window._forceRampInterval) clearInterval(window._forceRampInterval);
            const savedLinkStr = window._d3DefaultLinkStrength;
            let t = 0;
            const steps = 120; // ~4s at 33ms interval
            // Increase velocity decay so nodes slow down faster (less bouncing)
            graph.d3VelocityDecay(0.6);
            // Single gentle reheat — don't re-spike alpha each frame
            graph.d3AlphaDecay(0.01);
            graph.d3ReheatSimulation();

            window._forceRampInterval = setInterval(() => {
              t = Math.min(t + 1 / steps, 1);
              const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

              // Charge: -200 → -30
              graph.d3Force('charge').strength(() => -200 + 170 * ease);
              // Link strength: 0 → default
              graph.d3Force('link').strength(typeof savedLinkStr === 'function'
                ? (l => savedLinkStr(l) * ease)
                : ease);

              if (t >= 1) {
                graph.d3Force('link').strength(savedLinkStr);
                graph.d3Force('charge').strength(-30);
                // Restore default simulation parameters
                graph.d3VelocityDecay(0.4);
                graph.d3AlphaDecay(0.0228);
                clearInterval(window._forceRampInterval);
              }
            }, 33);

            // Restore camera: use saved zoom distance but target the graph centroid
            // (nodes may have shifted, so the old look-at could be off-screen)
            if (window._preSelectCameraPos) {
              const pre = window._preSelectCameraPos;
              const preLook = window._preSelectCameraLookAt;
              // Compute saved distance from camera to look-at
              const dx = pre.x - preLook.x, dy = pre.y - preLook.y, dz = pre.z - preLook.z;
              const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
              // Wait for nodes to start settling, then target their centroid
              setTimeout(() => {
                const nodes = graph.graphData().nodes;
                let cx = 0, cy = 0, cz = 0;
                nodes.forEach(n => { cx += n.x || 0; cy += n.y || 0; cz += n.z || 0; });
                cx /= nodes.length; cy /= nodes.length; cz /= nodes.length;
                graph.cameraPosition(
                  { x: cx, y: cy, z: cz + dist },
                  { x: cx, y: cy, z: cz },
                  1500
                );
              }, 800);
            }

            const detail = document.getElementById('network-detail');
            if (detail) detail.classList.remove('visible');
          }

          // Show detail panel for a node
          function showDetail(node) {
            const data = node.raw;
            const type = node.type;
            const detail = document.getElementById('network-detail');
            if (!detail || !data) return;

            let html = '';
            const detailPortrait = resolvePortraitUrl(data, api);
            html += `<div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.5rem;">`;
            html += `<img src="${detailPortrait}" alt="" style="width:48px;height:48px;border-radius:50%;object-fit:cover;">`;
            html += `<h3 style="margin:0">${data.name || data.id}</h3></div>`;
            if (data.summary) html += `<p>${data.summary}</p>`;
            if (data.status) html += `<p><span class="status-badge ${data.status}">${data.status}</span></p>`;

            switch (type) {
              case 'people':
                if (data.name_ja) html += `<p style="opacity: 0.6;">${data.name_ja}</p>`;
                // Affiliations shown on detail page only
                if (data.role_categories) html += `<p><strong>Roles:</strong> ${data.role_categories.join(', ')}</p>`;
                const netDomains = getRelated(data.id, { type: 'has_affinity_for' });
                if (netDomains.length > 0) html += `<p><strong>Domains:</strong> ${netDomains.map(r => `<a href="${entityHref('domains', r.entity.id)}" style="color:inherit;text-decoration:underline dotted;">${getEntityDisplay(r.entity.id)}</a>`).join(', ')}</p>`;
                if (data.bio) html += `<p style="margin-top: 0.5rem; opacity: 0.8; font-size: 0.85rem;">${data.bio}</p>`;
                break;
              case 'institutions':
                if (data.institution_type) html += `<p><strong>Type:</strong> ${data.institution_type.replace(/_/g, ' ')}</p>`;
                if (data.ecosystem_role) html += `<p><strong>Role:</strong> ${data.ecosystem_role}</p>`;
                break;
              case 'projects':
                if (data.domains) html += `<p><strong>Domains:</strong> ${data.domains.join(', ')}</p>`;
                if (data.project_goals) html += `<p><strong>Goals:</strong> ${data.project_goals.join('; ')}</p>`;
                break;
              case 'initiatives':
                if (data.purpose) html += `<p><strong>Purpose:</strong> ${data.purpose}</p>`;
                if (data.domains) html += `<p><strong>Domains:</strong> ${data.domains.join(', ')}</p>`;
                break;
              case 'courses':
                if (data.name_ja) html += `<p style="opacity:0.6;">${data.name_ja}</p>`;
                if (data.credits) html += `<p><strong>Credits:</strong> ${data.credits}</p>`;
                if (data.semester) html += `<p><strong>Semester:</strong> ${data.semester}</p>`;
                if (data.schedule) html += `<p><strong>Schedule:</strong> ${data.schedule}</p>`;
                if (data.program) html += `<p><strong>Program:</strong> ${data.program.map(p => p.replace(/_/g, ' ')).join(', ')}</p>`;
                break;
              case 'curricula':
                if (data.credit_requirement) html += `<p><strong>Credits Required:</strong> ${data.credit_requirement}</p>`;
                if (data.duration) html += `<p><strong>Duration:</strong> ${data.duration}</p>`;
                if (data.degree) html += `<p><strong>Degree:</strong> ${data.degree}</p>`;
                break;
              case 'events':
                if (data.date) html += `<p><strong>Date:</strong> ${data.date}</p>`;
                if (data.event_type) html += `<p><strong>Type:</strong> ${data.event_type}</p>`;
                break;
              case 'domains':
                break;
              case 'places':
                if (data.place_type) html += `<p><strong>Type:</strong> ${data.place_type}</p>`;
                if (data.address) html += `<p><strong>Address:</strong> ${data.address}</p>`;
                break;
              case 'publications':
                if (data.publication_type) html += `<p><strong>Type:</strong> ${data.publication_type.replace(/_/g, ' ')}</p>`;
                if (data.venue) html += `<p><strong>Venue:</strong> ${data.venue}</p>`;
                if (data.published_date) html += `<p><strong>Published:</strong> ${data.published_date}</p>`;
                break;
            }

            html += `<p style="margin-top: 0.75rem;"><a href="${entityHref(type, data.id)}" style="color: ${nodeColors[type]}; text-decoration: none; border-bottom: 1px solid ${nodeColors[type]};">View detail</a> &middot; <a href="#${type}" style="color: ${nodeColors[type]}; text-decoration: none; border-bottom: 1px solid ${nodeColors[type]};">View all ${(registryMeta[type] || {}).plural || type}</a></p>`;

            detail.innerHTML = html;
            detail.classList.add('visible');
          }

          // Type filter toggle buttons
          const filters = document.getElementById('network-filters');
          if (filters) {
            filters.querySelectorAll('.network-toggle').forEach(btn => {
              btn.addEventListener('click', function () {
                // Cycle: on → connected → off → on
                if (!btn.classList.contains('off') && !btn.classList.contains('connected')) {
                  btn.classList.add('connected');
                } else if (btn.classList.contains('connected')) {
                  btn.classList.remove('connected');
                  btn.classList.add('off');
                } else {
                  btn.classList.remove('off');
                }
                // Update URL to reflect filter states
                const states = getTypeStates();
                const onArr = [...states.on];
                const connArr = [...states.connected];
                const isDefault = networkDefaultOn.size === onArr.length && onArr.every(t => networkDefaultOn.has(t)) && connArr.length === 0;
                let newHash = '#network';
                if (!isDefault) {
                  const parts = [];
                  if (onArr.length) parts.push('show=' + onArr.join(','));
                  if (connArr.length) parts.push('connected=' + connArr.join(','));
                  if (parts.length) newHash += '?' + parts.join('&');
                }
                history.replaceState(null, '', newHash);
                if (window._selectedNode) {
                  selectNode(window._selectedNode);
                } else {
                  applyTypeFilters();
                }
              });
            });
          }

          // Apply initial filters (respects buttons that start with .off)
          applyTypeFilters();
        })
        .catch(err => {
          const container = document.getElementById('network-container');
          if (container) {
            container.innerHTML = `<p style="color: #c62828; padding: 2rem;">Error loading network data: ${err.message}</p>`;
          }
        });
    }
