(() => {
    const ACCESS_CODE = 'MANIFESTOR97'; // change before launch
    const ACCESS_KEY = 'ma_playground_access';
    const SETUP_KEY = 'ma_manifestor_setup_v1';
    const IDEA_KEY = 'ma_idea_market_v1';
    const ANON_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxPNecfzU4LM73m50dif24N1DCBJUZoZcyNFDKFVrKeWhF5fbSxO6ORbqPvV7SsAM9S/exec';

    function escapeHtml(value = '') {
        return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[ch]));
    }

    async function sendAnonymousSubmission({ room, submission, category = '', context = '' }) {
        if (!submission || !room) return false;
        try {
            await fetch(ANON_ENDPOINT, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ room, submission, category, context, permission: true })
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
    if (localStorage.getItem(ACCESS_KEY) === 'yes') unlockApp();
    function tryUnlock() { if (accessInput.value.trim() === ACCESS_CODE) { localStorage.setItem(ACCESS_KEY, 'yes'); unlockApp(); } else { accessError.textContent = 'That code did not open the door.'; } }
    unlock?.addEventListener('click', tryUnlock); accessInput?.addEventListener('keydown', e => { if (e.key === 'Enter') tryUnlock() });

    function showView(id) { const target = document.getElementById(id); if (!target || !target.hasAttribute('data-view')) return; document.querySelectorAll('[data-view]').forEach(v => v.classList.toggle('is-active', v.id === id)); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    document.addEventListener('click', e => { const go = e.target.closest('[data-go]'); if (go) showView(go.dataset.go); });

    const drawer = document.getElementById('setup-drawer');
    const openSetup = () => { drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false') };
    const closeSetup = () => { drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true') };
    ['open-setup', 'open-setup-hero', 'open-setup-secondary', 'open-setup-situation'].forEach(id => document.getElementById(id)?.addEventListener('click', openSetup));
    document.getElementById('close-setup')?.addEventListener('click', closeSetup);
    drawer?.addEventListener('click', e => { if (e.target === drawer) closeSetup() });

    const centerWrap = document.getElementById('center-toggles');
    const gateWrap = document.getElementById('gate-chips');
    const derivedWrap = document.getElementById('derived-channels');
    let setup = { authority: '', profile: '', centers: {}, gates: [] };
    try { setup = { ...setup, ...JSON.parse(localStorage.getItem(SETUP_KEY) || '{}') }; } catch { }
    centers.forEach(c => { if (!setup.centers[c]) setup.centers[c] = 'unknown'; });

    function renderCenters() { centerWrap.innerHTML = ''; centers.forEach(c => { const b = document.createElement('button'); b.type = 'button'; b.className = 'center-toggle ' + (setup.centers[c] !== 'unknown' ? setup.centers[c] : ''); b.innerHTML = `<span>${c}</span><small>${setup.centers[c] === 'defined' ? 'DEFINED' : setup.centers[c] === 'undefined' ? 'UNDEFINED' : 'TAP TO SET'}</small>`; b.onclick = () => { setup.centers[c] = setup.centers[c] === 'unknown' ? 'defined' : setup.centers[c] === 'defined' ? 'undefined' : 'unknown'; renderCenters() }; centerWrap.appendChild(b); }); }
    function renderGates() { gateWrap.innerHTML = ''; for (let i = 1; i <= 64; i++) { const s = String(i), b = document.createElement('button'); b.type = 'button'; b.className = 'gate-chip' + (setup.gates.includes(s) ? ' is-selected' : ''); b.textContent = s; b.onclick = () => { setup.gates = setup.gates.includes(s) ? setup.gates.filter(g => g !== s) : [...setup.gates, s]; renderGates(); renderDerived() }; gateWrap.appendChild(b); } }
    function getDerived() { const s = new Set(setup.gates); return channels.filter(([a, b]) => s.has(a) && s.has(b)); }
    function renderDerived() { const found = getDerived(); derivedWrap.innerHTML = found.length ? found.map(c => `<span class="derived-channel">${c[2]}</span>`).join('') : '<span class="empty-derived">No complete channels found from the selected gates yet.</span>'; }
    renderCenters(); renderGates(); renderDerived();
    document.getElementById('setup-authority').value = setup.authority || ''; document.getElementById('setup-profile').value = setup.profile || '';
    document.getElementById('save-setup')?.addEventListener('click', () => { setup.authority = document.getElementById('setup-authority').value; setup.profile = document.getElementById('setup-profile').value; localStorage.setItem(SETUP_KEY, JSON.stringify(setup)); renderSetupSummary(); closeSetup(); });
    document.getElementById('clear-setup')?.addEventListener('click', () => { setup = { authority: '', profile: '', centers: Object.fromEntries(centers.map(c => [c, 'unknown'])), gates: [] }; localStorage.removeItem(SETUP_KEY); document.getElementById('setup-authority').value = ''; document.getElementById('setup-profile').value = ''; renderCenters(); renderGates(); renderDerived(); });
    function renderSetupSummary() { const el = document.getElementById('setup-summary'); if (!el) return; const defs = centers.filter(c => setup.centers[c] === 'defined'); const undefs = centers.filter(c => setup.centers[c] === 'undefined'); const found = getDerived(); el.innerHTML = `<span class="pg-kicker">YOUR SAVED SPECIMEN</span><h2>${setup.profile || 'Profile not set'} · ${setup.authority || 'Authority not set'}</h2><p><strong>Defined centers:</strong> ${defs.join(', ') || 'Not set'}<br><strong>Undefined centers:</strong> ${undefs.join(', ') || 'Not set'}<br><strong>Selected gates:</strong> ${setup.gates.length || 0}<br><strong>Complete channels found:</strong> ${found.map(c => c[2]).join(', ') || 'None yet'}</p>`; }
    renderSetupSummary();

    // Informing Studio
    let informMode = 'open';
    document.querySelectorAll('[data-inform-mode]').forEach(b => b.addEventListener('click', () => { informMode = b.dataset.informMode; document.querySelectorAll('[data-inform-mode]').forEach(x => x.classList.toggle('is-active', x === b)); document.getElementById('inform-label').textContent = informMode === 'open' ? 'WHAT ARE YOU INFORMING TODAY?' : 'WHAT DO THEY ACTUALLY NEED TO KNOW?'; }));
    document.getElementById('run-informing')?.addEventListener('click', () => {
        const text = document.getElementById('inform-text').value.trim(), out = document.getElementById('inform-output'); if (!text) { out.hidden = false; out.innerHTML = '<h3>Give me something to work with.</h3><p>Put the actual situation on the mic first.</p>'; return; }
        const low = text.toLowerCase(), flags = []; const permission = /is it okay|would it be okay|do you mind|can i|could i|would you let|if that's okay|if you are okay/.test(low); const reaction = /so you don't get mad|so you won't be upset|i hope you understand|please don't be mad|i don't want you to think|i just don't want/.test(low); const over = text.split(/\s+/).length > 70; if (permission) flags.push('PERMISSION-SEEKING'); if (reaction) flags.push('REACTION MANAGEMENT'); if (over) flags.push('OVEREXPLAINING'); if (!flags.length) flags.push('PRETTY CLEAN');
        let clean = text.replace(/^(hey|hi|so|okay|ok)[,!\.\s]*/i, '').replace(/\b(i just wanted to let you know that|i just wanted to tell you that|i wanted to let you know that)\b/ig, '').trim(); clean = clean.charAt(0).toUpperCase() + clean.slice(1); if (clean && !/[.!?]$/.test(clean)) clean += '.';
        const warm = `Quick heads-up: ${clean.charAt(0).toLowerCase() + clean.slice(1)}`;
        out.hidden = false; out.innerHTML = `<h3>${informMode === 'open' ? 'You said it. Good.' : 'Here is what I hear in the informing.'}</h3><div>${flags.map(f => `<span class="output-flag">${f}</span>`).join('')}</div><p>${permission ? 'You are drifting from informing into asking whether your movement is allowed.' : ''} ${reaction ? 'Part of the message is trying to manage their emotional response. You can be considerate without taking responsibility for their reaction.' : ''} ${over ? 'There is probably more context here than the impacted person actually needs before you move.' : ''}</p><div class="draft-box"><b>DIRECT</b>${clean}</div><div class="draft-box"><b>WARMER</b>${warm}</div>`;
    });

    // Idea Market
    let ideaType = 'IDEA'; let ideas = []; try { ideas = JSON.parse(localStorage.getItem(IDEA_KEY) || '[]') } catch { }
    const ideaGuide = {
        'IDEA': `<strong>IDEA</strong><p>A thought, concept or possibility that is interesting to you. It can be brilliant without being yours to act on. An idea does not become a commitment just because you can see what it could become.</p>`,
        'URGE': `<strong>URGE</strong><p>A pull with movement behind it. It tends to feel different from simply thinking something is interesting. You may notice it returning, gathering momentum or wanting expression. An urge still does not outrank your Authority.</p>`,
        'INITIATION': `<strong>INITIATION</strong><p>Something you are actually moving into motion. This is no longer only a possibility on the shelf. The decision has cleared through your Authority and there is real movement to begin, change, create, leave, tell or act.</p>`,
        "I DON'T KNOW": `<strong>I DON’T KNOW</strong><p>Do not force the label. Ask: Is there body momentum? Does it keep returning without mental effort? Is there pressure to act right now? Am I simply interested? You can leave it unidentified while your Authority does its job.</p>`
    };
    function showIdeaGuide() { const q = document.getElementById('market-question'); q.hidden = false; q.innerHTML = ideaGuide[ideaType] || '' }
    document.querySelectorAll('[data-idea-type]').forEach(b => b.addEventListener('click', () => { ideaType = b.dataset.ideaType; document.querySelectorAll('[data-idea-type]').forEach(x => x.classList.toggle('is-active', x === b)); showIdeaGuide() }));
    document.querySelector('[data-idea-type="IDEA"]')?.classList.add('is-active');
    showIdeaGuide();
    function saveIdeas() { localStorage.setItem(IDEA_KEY, JSON.stringify(ideas)); renderIdeas() }
    function renderIdeas() {
        const board = document.getElementById('idea-board'), released = document.getElementById('released-idea-board');
        const active = ideas.map((i, n) => ({ ...i, _index: n })).filter(i => i.status !== 'RELEASED');
        const releasedIdeas = ideas.map((i, n) => ({ ...i, _index: n })).filter(i => i.status === 'RELEASED');
        if (!active.length) { board.innerHTML = '<p class="empty-derived">Nothing on the board right now. Your brain survived.</p>' } else {
            board.innerHTML = active.map(i => `<article class="idea-card" data-idea-card="${i._index}"><div class="idea-card-head"><span class="idea-type">${escapeHtml(i.type)}</span><small>${escapeHtml(i.status || 'ACTIVE')}</small></div><p>${escapeHtml(i.text)}</p><small>${setup.authority ? `Authority: ${escapeHtml(setup.authority)}` : 'Set your Authority in My Setup before treating classification like a decision.'}</small><label class="anon-consent idea-consent"><input type="checkbox" data-idea-consent="${i._index}"><span><strong>LET MANIFESTOR ANONYMOUS KEEP THIS ANONYMOUSLY</strong><small>If you release this idea, MA may anonymously use it for community insights, content or Anonymous Files. No name or contact information is attached.</small></span></label><div class="idea-card-actions"><button data-idea-archive="${i._index}">${i.status === 'ARCHIVED' ? 'Bring back to active' : 'Park it'}</button><button class="release-idea" data-idea-release="${i._index}">Release to Universe Market</button></div><p class="submission-status" data-idea-status="${i._index}" aria-live="polite"></p></article>`).join('')
        }
        if (!releasedIdeas.length) { released.innerHTML = '<p class="empty-derived">Nothing released yet. When you are ready to stop carrying an idea, send it here.</p>' } else {
            released.innerHTML = releasedIdeas.map(i => `<article class="idea-card idea-card-released"><div class="idea-card-head"><span class="idea-type">${escapeHtml(i.type)}</span><small>RELEASED</small></div><p>${escapeHtml(i.text)}</p><small>${i.released ? `Released ${new Date(i.released).toLocaleDateString()}` : 'Released to the Universe Market'}${i.sharedAnonymously ? ' · shared anonymously with MA' : ''}</small><div class="idea-card-actions"><button data-idea-return="${i._index}">Take it back</button><button data-idea-delete="${i._index}">Delete forever</button></div></article>`).join('')
        }
    }
    renderIdeas();
    document.getElementById('add-idea')?.addEventListener('click', () => { const t = document.getElementById('idea-text').value.trim(); if (!t) return; ideas.unshift({ text: t, type: ideaType, status: 'ACTIVE', created: Date.now() }); document.getElementById('idea-text').value = ''; saveIdeas() });
    document.getElementById('idea-board')?.addEventListener('click', e => {
        const a = e.target.dataset.ideaArchive, r = e.target.dataset.ideaRelease;
        if (a !== undefined) { ideas[a].status = ideas[a].status === 'ARCHIVED' ? 'ACTIVE' : 'ARCHIVED'; saveIdeas() }
        if (r !== undefined) {
            const index = Number(r), item = ideas[index], card = e.target.closest('.idea-card');
            const consent = card?.querySelector(`[data-idea-consent="${index}"]`)?.checked === true;
            const status = card?.querySelector(`[data-idea-status="${index}"]`);
            if (consent) {
                if (status) status.textContent = 'Sending an anonymous copy to the MA mailbox…';
                sendAnonymousSubmission({
                    room: 'Idea Market',
                    submission: item.text,
                    category: item.type,
                    context: `Released to Universe Market. Authority saved in browser: ${setup.authority || 'not set'}.`
                }).then(ok => { if (status) status.textContent = ok ? 'Anonymous copy sent. Releasing the idea now.' : 'Could not send the anonymous copy. The idea will still be released.'; });
                item.sharedAnonymously = true;
            }
            card?.classList.add('is-releasing');
            setTimeout(() => { item.status = 'RELEASED'; item.released = Date.now(); saveIdeas() }, 900)
        }
    });
    document.getElementById('released-idea-board')?.addEventListener('click', e => {
        const back = e.target.dataset.ideaReturn, d = e.target.dataset.ideaDelete;
        if (back !== undefined) { ideas[back].status = 'ACTIVE'; delete ideas[back].released; saveIdeas() }
        if (d !== undefined) { ideas.splice(d, 1); saveIdeas() }
    });
    document.getElementById('print-inventory')?.addEventListener('click', () => window.print());

    // Rage Room
    let currentRage = { text: '', patterns: [] };
    document.getElementById('smash-rage')?.addEventListener('click', () => {
        const text = document.getElementById('rage-text').value.trim(), low = text.toLowerCase(), out = document.getElementById('rage-output'), release = document.getElementById('rage-release'); if (!text) { out.hidden = false; out.innerHTML = '<h3>No rage without the rage.</h3><p>Put the unedited version in the box.</p>'; release.hidden = true; return; }
        const patterns = [];
        const add = (name, copy, route) => patterns.push({ name, copy, route });
        if (/control|won't let|wouldn't let|made me|have to|forced|permission|told me i can't|boss/.test(low)) add('CONTROL / BLOCKED MOVEMENT', 'Something may be restricting movement or making you feel like you need permission to act. Check what is truly constrained versus what is simply inconvenient.', 'informing-studio');
        if (/interrupt|keeps asking|won't stop|everybody needs|everyone needs|bother|leave me alone/.test(low)) add('INTERRUPTION / ACCESS', 'Your energy may be getting treated like it is continuously available. Anger can be the signal that access needs a boundary. Phase 02 will add a dedicated rest and regulation room for the depletion side of this.', null);
        if (/didn't tell|haven't told|should tell|need to tell|kept it to myself|did not inform/.test(low)) add('SUPPRESSED INFORMING', 'There may be an impact gap here: you moved, planned or decided without giving an affected person the information they needed. That does not mean ask permission. It may mean inform.', 'informing-studio');
        if (/tired|exhaust|fried|burnout|can't do this|no energy|drained|sleep/.test(low)) add('DEPLETION', 'Some of this anger may be your system running on fumes. Do not turn exhaustion into a personality diagnosis. Rest and regulation is getting its own room in Phase 02.', null);
        if (/said yes|didn't want|shouldn't have|agreed|people pleasing|to be nice|resent/.test(low)) add('SELF-BETRAYAL', 'The anger may not only be about them. Check where you participated in the situation by overriding your own no, timing or limit.', null);
        if (/expect|supposed to|they think i should|everyone thinks|what they want/.test(low)) add('OTHER PEOPLE’S EXPECTATIONS', 'You may be fighting an expectation that was never actually yours to carry. Separate impact from obligation.', null);
        if (!patterns.length) add('RESISTANCE WORTH LOOKING AT', 'The text does not hit one of the obvious patterns strongly. That does not make the anger meaningless. Ask what movement is being blocked, what boundary was crossed, or what you agreed to that you now resent.', null);
        currentRage = { text, patterns: patterns.map(p => p.name) };
        out.hidden = false; out.innerHTML = `<h3>Anger is information. It is not a court order.</h3>${patterns.map(p => `<div class="draft-box"><b>${escapeHtml(p.name)}</b>${escapeHtml(p.copy)}${p.route ? `<div class="rage-route"><button data-go="${p.route}">Take this to Informing Studio →</button></div>` : ''}</div>`).join('')}`;
        release.hidden = false;
        document.getElementById('rage-share-consent').checked = false;
        document.getElementById('rage-submission-status').textContent = '';
    });

    document.getElementById('burn-rage')?.addEventListener('click', async () => {
        if (!currentRage.text) return;
        const consent = document.getElementById('rage-share-consent').checked === true;
        const status = document.getElementById('rage-submission-status');
        if (consent) {
            status.textContent = 'Sending an anonymous copy to the MA mailbox…';
            const ok = await sendAnonymousSubmission({
                room: 'Rage Room',
                submission: currentRage.text,
                category: currentRage.patterns.join(' + '),
                context: 'Burned after Rage Room pattern reflection.'
            });
            status.textContent = ok ? 'Anonymous copy sent. Now burn it.' : 'Could not send the anonymous copy. You can still burn it.';
        }
        const consoleEl = document.querySelector('.rage-console');
        consoleEl?.classList.add('is-burning');
        setTimeout(() => {
            document.getElementById('rage-text').value = '';
            document.getElementById('rage-output').hidden = true;
            document.getElementById('rage-output').innerHTML = '';
            document.getElementById('rage-release').hidden = true;
            document.getElementById('rage-share-consent').checked = false;
            status.textContent = '';
            currentRage = { text: '', patterns: [] };
            consoleEl?.classList.remove('is-burning');
        }, 900);
    });


})();
