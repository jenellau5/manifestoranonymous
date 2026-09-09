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
    try {
      await fetch(ANON_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ room, submission, category, context, permission: true }),
        signal: AbortSignal.timeout(15000)
      });
      return true;
    } catch (error) {
      console.warn('Anonymous submission could not be sent.', error);
      return false;
    }
  }

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
  feedbackButton?.addEventListener('click', async () => {
    const submission = feedbackInput.value.trim();
    if (!submission) { feedbackStatus.textContent = 'Give me something to work with first.'; return; }
    feedbackButton.disabled = true;
    feedbackStatus.textContent = 'Sending...';
    const sent = await sendAnonymousSubmission({ room: 'Playground Feedback', submission, category: 'LOBBY FEEDBACK', context: 'Manifestor Playground lobby' });
    feedbackStatus.textContent = sent ? 'Send attempted. This connection cannot confirm delivery. Your feedback is still here.' : 'Could not confirm sending. Retrying may send a duplicate.';
    // Keep the draft: an opaque no-cors response cannot confirm receipt.
    feedbackButton.disabled = false;
  });

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
