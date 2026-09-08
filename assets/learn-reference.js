(() => {
  const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);

  const gateRoot = document.querySelector("[data-simple-gate]");
  if (gateRoot && window.MA_GATES) {
    const select = gateRoot.querySelector("select");
    const result = gateRoot.querySelector("[data-result]");
    select.innerHTML = '<option value="">Choose a Gate…</option>' +
      Object.entries(window.MA_GATES)
        .map(([number, gate]) => `<option value="${number}">Gate ${number} · ${escapeHtml(gate.name)}</option>`)
        .join("");

    const renderGate = () => {
      const gate = window.MA_GATES[select.value];
      result.innerHTML = gate
        ? `<div class="result-kicker">GATE ${escapeHtml(select.value)}</div><h2>${escapeHtml(gate.name)}</h2><p>${escapeHtml(gate.core)}</p>`
        : '<p class="explorer-empty">Choose a Gate from your chart.</p>';
    };

    select.addEventListener("change", renderGate);
    renderGate();
  }

  const channelRoot = document.querySelector("[data-simple-channel]");
  if (channelRoot && window.MA_CHANNELS) {
    const select = channelRoot.querySelector("select");
    const result = channelRoot.querySelector("[data-result]");
    select.innerHTML = '<option value="">Choose a Channel…</option>' +
      Object.entries(window.MA_CHANNELS)
        .map(([number, channel]) => `<option value="${number}">${number} · ${escapeHtml(channel.name)}</option>`)
        .join("");

    const renderChannel = () => {
      const channel = window.MA_CHANNELS[select.value];
      result.innerHTML = channel
        ? `<div class="result-kicker">CHANNEL ${escapeHtml(select.value)}</div><h2>${escapeHtml(channel.name)}</h2><p>${escapeHtml(channel.core)}</p>`
        : '<p class="explorer-empty">Choose a Channel from your chart.</p>';
    };

    select.addEventListener("change", renderChannel);
    renderChannel();
  }
})();
