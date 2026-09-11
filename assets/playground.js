(() => {
  const ACCESS_CODE = 'MANIFESTOR97'; // Client-side convenience gate; not secure purchase verification
  const ACCESS_KEY = 'ma_playground_access';
  const SETUP_KEY = 'ma_manifestor_setup_v1';
  const ANON_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwwPHSXEWDDsgnhew0_ZPpk-ElL7nCY-orUBZXeL_asX1PUcM1z-9YSKfvl850lbMg8/exec';

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[ch]));
  }

  async function sendAnonymousSubmission({ room, submission, category = '', context = '' }) {
    if (!submission || !room) return false;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(ANON_ENDPOINT, {
        method: 'POST', mode: 'cors', credentials: 'omit', referrerPolicy: 'no-referrer',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ room, submission, category, context, permission: true }),
        signal: controller.signal
      });
      if (!response.ok) throw new Error('The inbox returned an error (' + response.status + ').');
      const result = await response.json();
      if (result.success !== true) throw new Error(result.message || 'The inbox did not accept this submission.');
      return result;
    } finally { clearTimeout(timer); }
  }
  window.maSendAnonymousSubmission = sendAnonymousSubmission;

  const centers = ['Head', 'Ajna', 'Throat', 'G / Identity', 'Ego / Heart', 'Solar Plexus', 'Spleen', 'Sacral', 'Root'];
  const channels = [
    ['1', '8', '1–8 Inspiration'], ['2', '14', '2–14 The Beat'], ['3', '60', '3–60 Mutation'], ['4', '63', '4–63 Logic'], ['5', '15', '5–15 Rhythm'], ['6', '59', '6–59 Intimacy'], ['7', '31', '7–31 Alpha'], ['9', '52', '9–52 Concentration'], ['10', '20', '10–20 Awakening'], ['10', '34', '10–34 Exploration'], ['10', '57', '10–57 Perfected Form'], ['11', '56', '11–56 Curiosity'], ['12', '22', '12–22 Openness'], ['13', '33', '13–33 Prodigal'], ['16', '48', '16–48 Wavelength'], ['17', '62', '17–62 Acceptance'], ['18', '58', '18–58 Judgment'], ['19', '49', '19–49 Synthesis'], ['20', '34', '20–34 Charisma'], ['20', '57', '20–57 Brainwave'], ['21', '45', '21–45 Money Line'], ['23', '43', '23–43 Structuring'], ['24', '61', '24–61 Awareness'], ['25', '51', '25–51 Initiation'], ['26', '44', '26–44 Surrender'], ['27', '50', '27–50 Preservation'], ['28', '38', '28–38 Struggle'], ['29', '46', '29–46 Discovery'], ['30', '41', '30–41 Recognition'], ['32', '54', '32–54 Transformation'], ['34', '57', '34–57 Power'], ['35', '36', '35–36 Transitoriness'], ['37', '40', '37–40 Community'], ['39', '55', '39–55 Emoting'], ['42', '53', '42–53 Maturation'], ['47', '64', '47–64 Abstraction']
  ];

  const access = document.getElementById('pg-access');
  const app = document.getElementById('pg-app');
  const unlock = document.getElementById('unlock-playground');
  const accessInput = document.getElementById('access-code');
  const accessError = document.getElementById('access-error');

  function unlockApp() { access.setAttribute('aria-hidden', 'true'); app.classList.remove('is-locked'); app.setAttribute('aria-hidden', 'false'); }
  try { if (localStorage.getItem(ACCESS_KEY) === 'yes') unlockApp(); } catch {}
  function tryUnlock() { if (accessInput.value.trim() === ACCESS_CODE) { try { localStorage.setItem(ACCESS_KEY, 'yes'); } catch {} unlockApp(); } else { accessError.textContent = 'That code did not open the door.'; } }
  unlock?.addEventListener('click', tryUnlock); accessInput?.addEventListener('keydown', e => { if (e.key === 'Enter') tryUnlock() });

  const feedbackInput = document.getElementById('playground-feedback');
  const feedbackButton = document.getElementById('send-playground-feedback');
  const feedbackStatus = document.getElementById('playground-feedback-status');
  // The deployed inbox rejects the existing "Playground Feedback" route.
  // Keep feedback local until the service owner enables that room.
  if (feedbackButton) {
    feedbackButton.textContent = 'COPY FEEDBACK';
    const privacy = document.getElementById('feedback-privacy');
    if (privacy) privacy.textContent = 'Feedback delivery is unavailable: the inbox is not configured to accept feedback. Copy your words to keep them. Nothing is sent by this button.';
    feedbackButton.addEventListener('click', async () => {
      if (!feedbackInput.value.trim()) { feedbackStatus.textContent = 'Give me something to work with first.'; return; }
      try {
        await navigator.clipboard.writeText(feedbackInput.value);
        feedbackStatus.textContent = 'Feedback copied. It has not been sent to MA.';
      } catch {
        feedbackInput.focus(); feedbackInput.select();
        feedbackStatus.textContent = 'Automatic copy is unavailable. Your feedback is selected; use Copy in your browser or keyboard. Nothing was sent.';
      }
    });
  }

  function showView(id) { const target = document.getElementById(id); if (!target || !target.hasAttribute('data-view')) return; document.querySelectorAll('[data-view]').forEach(v => v.classList.toggle('is-active', v.id === id)); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  document.addEventListener('click', e => {
    const roomLink = e.target.closest('[data-room-link]');
    if (roomLink) { window.location.href = roomLink.dataset.roomLink; return; }
    const go = e.target.closest('[data-go]'); if (go) showView(go.dataset.go);
  });

  const drawer = document.getElementById('setup-drawer');
  let setupOpener;
  const openSetup = () => { setupOpener=document.activeElement; drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false'); drawer.setAttribute('role','dialog'); drawer.setAttribute('aria-modal','true'); drawer.setAttribute('aria-label','My Manifestor Setup'); document.getElementById('close-setup')?.focus(); };
  const closeSetup = () => { drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true'); setupOpener?.focus(); };
  drawer?.addEventListener('keydown', e => { if(e.key==='Escape'){e.preventDefault();closeSetup();} if(e.key==='Tab'){const nodes=[...drawer.querySelectorAll('button,input,select,a[href]')].filter(n=>!n.disabled&&n.getClientRects().length); const first=nodes[0],last=nodes.at(-1); if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}} });
  ['open-setup', 'open-setup-hero', 'open-setup-secondary', 'open-setup-situation'].forEach(id => document.getElementById(id)?.addEventListener('click', openSetup));
  document.getElementById('close-setup')?.addEventListener('click', closeSetup);
  drawer?.addEventListener('click', e => { if (e.target === drawer) closeSetup() });

  const centerWrap = document.getElementById('center-toggles');
  const gateWrap = document.getElementById('gate-chips');
  const derivedWrap = document.getElementById('derived-channels');
  let setup = { authority: '', profile: '', centers: {}, gates: [] };
  try { setup = { ...setup, ...JSON.parse(localStorage.getItem(SETUP_KEY) || '{}') }; } catch { }
  centers.forEach(c => { if (!setup.centers[c]) setup.centers[c] = 'unknown'; });

  function renderCenters() { if (!centerWrap) return; centerWrap.innerHTML = ''; centers.forEach(c => { const b = document.createElement('button'); b.type = 'button'; b.className = 'center-toggle ' + (setup.centers[c] !== 'unknown' ? setup.centers[c] : ''); b.innerHTML = `<span>${c}</span><small>${setup.centers[c] === 'defined' ? 'DEFINED' : setup.centers[c] === 'undefined' ? 'UNDEFINED' : 'TAP TO SET'}</small>`; b.onclick = () => { setup.centers[c] = setup.centers[c] === 'unknown' ? 'defined' : setup.centers[c] === 'defined' ? 'undefined' : 'unknown'; renderCenters() }; centerWrap.appendChild(b); }); }
  function renderGates() { if (!gateWrap) return; gateWrap.innerHTML = ''; for (let i = 1; i <= 64; i++) { const s = String(i), b = document.createElement('button'); b.type = 'button'; b.className = 'gate-chip' + (setup.gates.includes(s) ? ' is-selected' : ''); b.textContent = s; b.setAttribute('aria-pressed', String(setup.gates.includes(s))); b.onclick = () => { setup.gates = setup.gates.includes(s) ? setup.gates.filter(g => g !== s) : [...setup.gates, s]; renderGates(); renderDerived() }; gateWrap.appendChild(b); } }
  function getDerived() { const s = new Set(setup.gates); return channels.filter(([a, b]) => s.has(a) && s.has(b)); }
  function renderDerived() { if (!derivedWrap) return; const found = getDerived(); derivedWrap.innerHTML = found.length ? found.map(c => `<span class="derived-channel">${c[2]}</span>`).join('') : '<span class="empty-derived">No complete channels found from the selected gates yet.</span>'; }
  renderCenters(); renderGates(); renderDerived();
  if (document.getElementById('setup-authority')) document.getElementById('setup-authority').value = setup.authority || ''; if (document.getElementById('setup-profile')) document.getElementById('setup-profile').value = setup.profile || '';
  document.getElementById('save-setup')?.addEventListener('click', () => { setup.authority = document.getElementById('setup-authority').value; setup.profile = document.getElementById('setup-profile').value; try { localStorage.setItem(SETUP_KEY, JSON.stringify(setup)); } catch { alert('Your setup could not be saved in this browser. You can still use the rooms.'); } renderSetupSummary(); closeSetup(); });
  document.getElementById('clear-setup')?.addEventListener('click', () => { setup = { authority: '', profile: '', centers: Object.fromEntries(centers.map(c => [c, 'unknown'])), gates: [] }; try { localStorage.removeItem(SETUP_KEY); } catch { alert('Browser storage could not be cleared. Use your browser site-data settings.'); } document.getElementById('setup-authority').value = ''; document.getElementById('setup-profile').value = ''; renderCenters(); renderGates(); renderDerived(); });
  function renderSetupSummary() { const el = document.getElementById('setup-summary'); if (!el) return; const defs = centers.filter(c => setup.centers[c] === 'defined'); const undefs = centers.filter(c => setup.centers[c] === 'undefined'); const found = getDerived(); el.innerHTML = `<span class="pg-kicker">YOUR SAVED SPECIMEN</span><h2>${setup.profile || 'Profile not set'} · ${setup.authority || 'Authority not set'}</h2><p><strong>Defined centers:</strong> ${defs.join(', ') || 'Not set'}<br><strong>Undefined centers:</strong> ${undefs.join(', ') || 'Not set'}<br><strong>Selected gates:</strong> ${setup.gates.length || 0}<br><strong>Complete channels found:</strong> ${found.map(c => c[2]).join(', ') || 'None yet'}</p>`; }
  renderSetupSummary();

})();

/* Small, local finishing gestures. No sound, network requests or stored copies. */
(() => {
  const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const active=new Set(),byTarget=new WeakMap();
  window.maRoomFinish=(target,kind,text='')=>new Promise(resolve=>{
    if(!target||!target.isConnected)return resolve();
    byTarget.get(target)?.();
    const stage=document.createElement('div');stage.className='ma-finish-stage ma-'+kind;stage.setAttribute('aria-hidden','true');
    const surface=kind==='burn'?target:target.parentElement;
    if(kind==='release'){
      const note=document.createElement('div');note.className='ma-drifting-idea';note.textContent=text;stage.append(note);
      target.classList.add('ma-receipt-wait');
    }else{target.classList.add('ma-burning-note');const edge=document.createElement('div');edge.className='ma-burn-edge';stage.append(edge);}
    if(!reduced())for(let i=0;i<20;i++){const mote=document.createElement('i');mote.className='ma-mote';mote.style.setProperty('--x',(4+(i*47%91))+'%');mote.style.setProperty('--delay',(i%5)*.09+'s');mote.style.setProperty('--drift',((i%2?1:-1)*(15+i*3))+'px');stage.append(mote);}
    surface.classList.add('ma-finish-surface');surface.append(stage);
    let raf=0,timer=0,finished=false;const started=performance.now(),duration=reduced()?180:kind==='burn'?1550:1250;
    const finish=()=>{if(finished)return;finished=true;cancelAnimationFrame(raf);clearTimeout(timer);stage.remove();target.classList.remove('ma-burning-note','ma-receipt-wait');target.style.removeProperty('--ma-burn');surface.classList.remove('ma-finish-surface');active.delete(finish);byTarget.delete(target);resolve();};
    active.add(finish);byTarget.set(target,finish);
    const tick=now=>{if(!target.isConnected||!stage.isConnected)return finish();const p=Math.min(1,(now-started)/duration);if(kind==='burn')target.style.setProperty('--ma-burn',(p*103)+'%');if(p<1)raf=requestAnimationFrame(tick);else finish();};
    raf=requestAnimationFrame(tick);timer=setTimeout(finish,duration+150);
  });
  window.addEventListener('pagehide',()=>{for(const finish of [...active])finish();});
  window.addEventListener('beforeprint',()=>{for(const finish of [...active])finish();});
  // Animate only newly created results, never personal inputs or navigation.
  const selectors='#po-slip,#rs-pad,.wod-board,#is-finish,#rr-note-board,.im-receipt';
  const seen=new WeakSet();
  const observe=new MutationObserver(()=>{
    document.querySelectorAll(selectors).forEach(el=>{
      if(!el.childElementCount||el.hidden||seen.has(el))return;
      seen.add(el);el.classList.add('ma-result-arrival');
    });
  });
  observe.observe(document.getElementById('pg-app')||document.body,{childList:true,subtree:true});
})();
