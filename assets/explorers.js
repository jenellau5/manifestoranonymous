(() => {
    const esc = (s = '') => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
    const gateRoot = document.querySelector('[data-gate-explorer]');
    if (gateRoot && window.MA_GATES) {
        const select = gateRoot.querySelector('select');
        const result = gateRoot.querySelector('[data-result]');
        select.innerHTML = '<option value="">Choose a gate…</option>' + Object.keys(window.MA_GATES).map(n => `<option value="${n}">Gate ${n} · ${esc(window.MA_GATES[n].name)}</option>`).join('');
        const render = () => {
            const g = window.MA_GATES[select.value];
            if (!g) { result.innerHTML = '<p class="explorer-empty">Choose a gate from your chart to start.</p>'; return; }
            const connected = (window.MA_CHANNEL_LIST || []).filter(c => c.a === +select.value || c.b === +select.value);
            result.innerHTML = `<div class="result-kicker">GATE ${esc(select.value)} · ${esc(g.center)} · ${esc(g.circuit)}</div><h2>${esc(g.name)}</h2><div class="result-grid"><div><b>CORE</b><p>${esc(g.core)}</p></div><div><b>HIGH EXPRESSION</b><p>${esc(g.high)}</p></div><div><b>SHADOW / PRESSURE</b><p>${esc(g.low)}</p></div><div><b>MANIFESTOR LENS</b><p>${esc(g.manifestor)}</p></div></div>${connected.length ? `<div class="result-connections"><b>CHANNEL CONNECTIONS</b><p>${connected.map(c => `${c.a}-${c.b} ${c.name}`).join(' · ')}</p></div>` : ''}<div class="paid-depth-note"><b>FREE = LEARN THE GATE.</b><p>The Playground goes deeper into your line, whether the gate is hanging or part of a channel, and how it can show up in business, relationships, parenting and everyday life.</p></div>`;
        };
        select.addEventListener('change', render); render();
    }
    const channelRoot = document.querySelector('[data-channel-explorer]');
    if (channelRoot && window.MA_CHANNELS) {
        const select = channelRoot.querySelector('select');
        const result = channelRoot.querySelector('[data-result]');
        const entries = Object.entries(window.MA_CHANNELS);
        select.innerHTML = '<option value="">Choose a channel…</option>' + entries.map(([k, c]) => `<option value="${k}">${k} · ${esc(c.name)}</option>`).join('');
        const render = () => {
            const c = window.MA_CHANNELS[select.value];
            if (!c) { result.innerHTML = '<p class="explorer-empty">Choose a channel to start.</p>'; return; }
            result.innerHTML = `<div class="result-kicker">CHANNEL ${esc(select.value)} · ${esc(c.circuit)}</div><h2>${esc(c.name)}</h2><div class="status-pill ${c.possible ? 'possible' : 'impossible'}">${c.possible ? 'CAN BE FULLY DEFINED IN A MANIFESTOR' : 'CANNOT BE FULLY DEFINED IN A MANIFESTOR'}</div><div class="result-grid"><div><b>CORE</b><p>${esc(c.core)}</p></div><div><b>HIGH EXPRESSION</b><p>${esc(c.high)}</p></div><div><b>SHADOW / PRESSURE</b><p>${esc(c.low)}</p></div><div><b>MANIFESTOR LENS</b><p>${esc(c.manifestor)}</p></div></div><div class="paid-depth-note"><b>FREE = LEARN THE CHANNEL.</b><p>The Playground will go deeper into how your actual channel or hanging-gate relationship can be lived in work, business, relationships, parenting and everyday life.</p></div>`;
        };
        select.addEventListener('change', render); render();
    }
})();
