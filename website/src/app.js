(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const all = JSON.parse($('build-data').textContent);
  const state = { category: 'All projects', query: '', platform: '', kind: '', sort: 'featured', selected: new Set() };
  const order = ['All projects', 'Desktop apps', 'Games & preservation', 'Developer tools', 'Hardware & protocols', 'Web & 3D', 'Official showcases', 'Analysis & evaluations', 'Learning & experiments', 'REA ecosystem'];
  const symbols = { 'Desktop apps': '▣', 'Games & preservation': '◆', 'Developer tools': '⌘', 'Hardware & protocols': '⛓', 'Web & 3D': '◈', 'REA ecosystem': '✳', 'Official showcases': '◉', 'Analysis & evaluations': '⌁', 'Learning & experiments': '✎' };
  const esc = x => String(x ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = x => typeof x === 'string' && /^https:\/\//.test(x) ? esc(x) : '#';
  const repoUrl = 'https://github.com/notsointresting/awesome-rea-builds';
  const repoPublished = true; // Repo becomes live once the owner creates and uploads this package.
  const external = (url, label, cls='btn') => `<a class="${cls}" href="${safeUrl(url)}" rel="noopener noreferrer" target="_blank">${esc(label)} ↗</a>`;
  const attrText = p => p.evidenceType === 'Primary-source attribution' ? 'Primary source cited' : (p.evidenceType === 'Discussion link not retrieved' ? 'Discussion listed' : 'Evidence linked');
  const verifiedTag = p => `<span class="tag ${p.evidenceType === 'Primary-source attribution' ? 'tag-verified' : ''}">${esc(attrText(p))}</span>`;

  function init(){
    $('total-hero').textContent = all.length;
    $('apps-hero').textContent = all.filter(x => x.kind === 'Official case study').length;
    $('tools-hero').textContent = all.filter(x => x.kind === 'Tool built for REA').length;
    if(repoPublished) {
      $('header-github').href = repoUrl;
      $('header-github').textContent = 'Star on GitHub ↗';
      $('contribute-link').href = `${repoUrl}/blob/main/CONTRIBUTING.md`;
    } else {
      $('contribute-link').href = 'https://github.com/morluto/rea/discussions';
      $('contribute-link').textContent = 'Explore REA community ↗';
    }
    $('featured-grid').innerHTML = all.filter(p => p.featured).slice(0,3).map(featureCard).join('');
    renderCategories(); renderProjects(); bindEvents(); openFromURL();
  }
  function icon(p){ return symbols[p.category] || '✦'; }
  function featureCard(p){return `<article class="feature-card" data-open="${esc(p.id)}" role="button" tabindex="0" aria-label="Open build passport for ${esc(p.name)}"><div class="visual ${esc(p.accent)}"><span class="visual-glyph" aria-hidden="true">${icon(p)}</span></div><div class="feature-body"><div class="mini-top"><span>${esc(p.category)}</span>${verifiedTag(p)}</div><h3>${esc(p.name)}</h3><p>${esc(p.subtitle)}</p><div class="feature-foot"><span>${esc(p.languages.slice(0,2).join(' / '))}</span><span>View passport ↗</span></div></div></article>`}
  function renderCategories(){
    $('categories').innerHTML = order.map(c=>{
      const count=c==='All projects'?all.length:all.filter(p=>p.category===c).length;
      return `<button class="${state.category===c?'active':''}" data-category="${esc(c)}" aria-pressed="${state.category===c}">${esc(c)} <em>${count}</em></button>`;
    }).join('');
  }
  function visible(){
    let filtered = all.filter(p=>{
      const haystack = [p.name,p.subtitle,p.description,p.category,p.original,p.built,p.kind,...p.languages,...p.tags,...p.platforms].join(' ').toLowerCase();
      return (state.category==='All projects'||p.category===state.category)
        && (!state.query||haystack.includes(state.query))
        && (!state.platform||p.platforms.includes(state.platform))
        && (!state.kind||p.kind===state.kind);
    });
    if(state.sort==='name')filtered.sort((a,b)=>a.name.localeCompare(b.name));
    else if(state.sort==='reviewed')filtered.sort((a,b)=>b.reviewed.localeCompare(a.reviewed)||a.name.localeCompare(b.name));
    else filtered.sort((a,b)=>Number(b.featured)-Number(a.featured)||a.name.localeCompare(b.name));
    return filtered;
  }
  function card(p){
    const chosen=state.selected.has(p.id);
    return `<article class="project-card"><div class="pc-top"><div class="pc-icon ${esc(p.accent)}" aria-hidden="true">${icon(p)}</div><div class="pc-meta">${esc(p.category)}<br>${esc(p.kind)}</div></div><h3 class="pc-title">${esc(p.name)}</h3><p class="pc-subtitle">${esc(p.subtitle)}</p><p class="pc-desc">${esc(p.description)}</p><div class="chips">${verifiedTag(p)}<span class="tag">${esc(p.languages[0])}</span>${p.demo?'<span class="tag">Demo / release linked</span>':''}</div><div class="pc-foot"><button class="linkbtn" data-open="${esc(p.id)}" aria-label="View build passport for ${esc(p.name)}">View passport ↗</button><button data-compare="${esc(p.id)}" class="comparebtn ${chosen?'selected':''}" aria-pressed="${chosen}" aria-label="${chosen?'Remove':'Add'} ${esc(p.name)} ${chosen?'from':'to'} comparison">${chosen?'✓ Selected':'+ Compare'}</button></div></article>`;
  }
  function renderProjects(){
    const projects=visible();
    $('projects-grid').innerHTML=projects.map(card).join('');
    $('result-count').textContent=`Showing ${projects.length} of ${all.length} catalogued REA cases`;
    $('empty').hidden=projects.length>0;
    updateCompareBar();
  }
  function updateCompareBar(){
    const n=state.selected.size;
    $('comparebar').classList.toggle('visible',n>0);
    $('compare-label').textContent=n===0?'No builds selected':`${n} selected · ${[...state.selected].map(id=>all.find(p=>p.id===id)?.name).filter(Boolean).join(' · ')}`;
    $('compare-open').disabled=n<2;
  }
  function openPassport(id,push=true){
    const p=all.find(x=>x.id===id); if(!p)return;
    const code=p.run.startsWith('See ')||p.run.startsWith('Follow ')||p.run.startsWith('Refer ');
    $('dialog-content').innerHTML=`<header class="dialog-head"><div class="dialog-topline"><div><div class="kicker">${p.kind === 'Reconstructed application' || p.kind === 'Interoperability implementation' ? 'BUILD PASSPORT' : 'CASE PASSPORT'} / ${esc(p.id)}</div><h2 id="dialog-title">${esc(p.name)}</h2><p>${esc(p.subtitle)}</p></div><button class="dialog-closer" id="close-dialog" aria-label="Close project passport">×</button></div><div class="chips" style="margin-top:19px">${verifiedTag(p)}<span class="tag">${esc(p.kind)}</span><span class="tag">Reviewed ${esc(p.reviewed)}</span></div></header><div class="dialog-body"><div class="detail-grid"><div class="detail-box"><h3>Original subject</h3><p>${esc(p.original)}</p></div><div class="detail-box"><h3>What was built</h3><p>${esc(p.built)}<br>${esc(p.platforms.join(' / '))}</p></div></div><div class="detail-label">PROJECT SUMMARY</div><p class="detail-copy">${esc(p.description)}</p><div class="detail-label">REA INVOLVEMENT & PROVENANCE</div><p class="detail-copy">${esc(p.evidenceNote)}</p><div class="detail-label">PUBLIC EVIDENCE</div><p class="detail-copy">${esc(p.proof)}</p><div class="detail-label">EXECUTION STATUS</div><p class="detail-copy">${esc(p.execution)}. This catalog has not independently executed this project's binary or build process.</p><div class="detail-label">LIMITATIONS</div><p class="detail-copy">${esc(p.limitations)}</p><div class="detail-label">HOW TO RUN</div>${code?`<p class="detail-copy">${esc(p.run)}</p>`:`<div class="code-wrap"><pre>${esc(p.run)}</pre><button id="copy-run" data-run="${esc(p.run)}">Copy</button></div>`}<div class="detail-links">${external(p.repo,p.repo.includes('github.com/morluto/rea/discussions/')||p.repo.includes('rea.tools/showcase/')?'Read case':'View source')}${external(p.evidence,'Read REA evidence')}${p.demo?external(p.demo,'Open demo / release'):''}</div><div class="notice">Source-reviewed does not mean independently reproduced. Check upstream licenses, compatibility, asset rights and security before running third-party code.</div></div>`;
    openOverlay();
    if(push){const u=new URL(location.href);u.searchParams.set('build',id);try{history.pushState({build:id},'',u)}catch(_e){/* Embedded preview without origin */}}
  }
  function openComparison(){
    const chosen=[...state.selected].map(id=>all.find(p=>p.id===id)).filter(Boolean);if(chosen.length<2)return;
    const rows=[['Type',p=>p.kind],['Original',p=>p.original],['Category',p=>p.category],['Language',p=>p.languages.join(', ')],['Platform',p=>p.platforms.join(', ')],['Attribution',p=>p.evidenceType],['Execution',p=>p.execution],['Limitations',p=>p.limitations]];
    $('dialog-content').innerHTML=`<header class="dialog-head"><div class="dialog-topline"><div><div class="kicker">SIDE BY SIDE</div><h2 id="dialog-title">Compare builds</h2><p>Evidence, scope and execution claims—without false accuracy rankings.</p></div><button class="dialog-closer" id="close-dialog" aria-label="Close comparison">×</button></div></header><div class="dialog-body"><div class="comparison"><table><thead><tr><th>Dimension</th>${chosen.map(p=>`<th>${esc(p.name)}</th>`).join('')}</tr></thead><tbody>${rows.map(([title,get])=>`<tr><td>${title}</td>${chosen.map(p=>`<td>${esc(get(p))}</td>`).join('')}</tr>`).join('')}<tr><td>Source</td>${chosen.map(p=>`<td>${external(p.repo,'GitHub','section-link')}</td>`).join('')}</tr></tbody></table></div><div class="notice">Project details are based on public documentation indexed on 2026-11-11 and may change upstream.</div></div>`;
    openOverlay();
  }
  function openOverlay(){const o=$('overlay');o.classList.add('open');o.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');$('close-dialog')?.focus()}
  function closeOverlay(){const o=$('overlay');if(!o.classList.contains('open'))return;o.classList.remove('open');o.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');if(new URL(location.href).searchParams.has('build')){const u=new URL(location.href);u.searchParams.delete('build');try{history.replaceState({},'',u)}catch(_e){/* Embedded preview without origin */}}}
  function openFromURL(){const id=new URL(location.href).searchParams.get('build');if(id)openPassport(id,false);else closeOverlay()}
  function bindEvents(){
    $('nav-toggle').addEventListener('click',()=>{const open=$('navlinks').classList.toggle('open');$('nav-toggle').setAttribute('aria-expanded',String(open))});
    document.querySelectorAll('#navlinks a').forEach(a=>a.addEventListener('click',()=>$('navlinks').classList.remove('open')));
    $('search').addEventListener('input',e=>{state.query=e.target.value.trim().toLowerCase();renderProjects()});
    $('platform').addEventListener('change',e=>{state.platform=e.target.value;renderProjects()});
    $('kind').addEventListener('change',e=>{state.kind=e.target.value;renderProjects()});
    $('sort').addEventListener('change',e=>{state.sort=e.target.value;renderProjects()});
    $('reset').addEventListener('click',()=>{state.query='';state.platform='';state.kind='';state.category='All projects';state.sort='featured';$('search').value='';$('platform').value='';$('kind').value='';$('sort').value='featured';renderCategories();renderProjects()});
    $('categories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;state.category=b.dataset.category;renderCategories();renderProjects()});
    document.addEventListener('click',e=>{const open=e.target.closest('[data-open]');if(open){openPassport(open.dataset.open);return}const compare=e.target.closest('[data-compare]');if(compare){const id=compare.dataset.compare;if(state.selected.has(id))state.selected.delete(id);else if(state.selected.size<3)state.selected.add(id);else{alert('You can compare up to three builds at a time.');return}renderProjects();return}const close=e.target.closest('#close-dialog');if(close)closeOverlay();const copy=e.target.closest('#copy-run');if(copy){navigator.clipboard?.writeText(copy.dataset.run).then(()=>copy.textContent='Copied!').catch(()=>copy.textContent='Select text to copy');}});
    $('featured-grid').addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.closest('[data-open]')){e.preventDefault();openPassport(e.target.closest('[data-open]').dataset.open)}});
    $('overlay').addEventListener('click',e=>{if(e.target===$('overlay'))closeOverlay()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeOverlay();if(e.key==='Tab'&&$('overlay').classList.contains('open')){const focusables=[...$('overlay').querySelectorAll('button:not([disabled]),a[href]')];if(!focusables.length)return;const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
    $('compare-clear').addEventListener('click',()=>{state.selected.clear();renderProjects()});
    $('compare-open').addEventListener('click',openComparison);
    window.addEventListener('popstate',openFromURL);
  }
  init();
})();
