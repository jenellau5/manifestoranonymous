(() => {
  const data = window.MA_ARCHETYPES;
  const select = document.getElementById('ma-profile');
  if (!data || !select) return;
  const core = document.getElementById('ma-archetype-core');
  const details = document.getElementById('ma-archetype-details');
  const areas = document.getElementById('ma-archetype-areas');
  const context = document.getElementById('ma-archetype-context');
  const experiment = document.getElementById('ma-archetype-experiment');
  let area = data.lifeAreas[0], experimentIndex = 0;
  for (const profile of Object.keys(data.profileInfo)) {
    const option = document.createElement('option');
    option.value = profile; option.textContent = profile; select.append(option);
  }
  const add = (parent, tag, text) => {
    const element = document.createElement(tag); element.textContent = text;
    parent.append(element); return element;
  };
  function renderExperiment() {
    const bank = data.profileExperimentBanks[select.value] || [];
    experiment.textContent = (bank[experimentIndex % bank.length] || '').replace('the The ', 'the ');
  }
  function render() {
    const profile = data.profileInfo[select.value];
    core.replaceChildren(); details.hidden = !profile;
    if (!profile) { add(core, 'p', 'Choose a Profile to discover its MA Archetype.'); return; }
    add(core, 'span', `${select.value} · ${profile.traditional}`).className = 'section-label';
    add(core, 'h3', profile.archetype); add(core, 'p', profile.core);
    context.replaceChildren(); add(context, 'h4', area); add(context, 'p', profile.contexts[area]);
    for (const button of areas.children) button.setAttribute('aria-pressed', String(button.textContent === area));
    renderExperiment();
  }
  for (const name of data.lifeAreas) {
    const button = add(areas, 'button', name); button.type = 'button';
    button.addEventListener('click', () => { area = name; render(); });
  }
  select.addEventListener('change', () => { experimentIndex = 0; render(); });
  document.getElementById('ma-next-experiment').addEventListener('click', () => { experimentIndex++; renderExperiment(); });
  render();
})();
