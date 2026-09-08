(() => {
  const profiles = {
    "1/3": ["The Firestarter Scientist", "You build enough foundation to make contact with reality, then reality becomes the laboratory. Your Manifestor process often looks like investigate, initiate, discover what the theory missed and rebuild it stronger."],
    "1/4": ["The Underground Investigator", "Foundation gives you security, and relationships give that foundation somewhere to travel. Your impact often moves through people you already know rather than constant public visibility."],
    "2/4": ["The Hidden Fuse", "Natural gifts need space, while opportunities often arrive through your network. The tension is being called out before you feel ready to be available."],
    "2/5": ["The Disruptive Savior", "People can project competence onto what comes naturally to you. Protect your private time and choose carefully which problems you agree to solve."],
    "3/5": ["The Chaos Catalyst", "You create practical wisdom by finding what survives contact with real life. Other people may want your polished answer before you have finished experimenting."],
    "3/6": ["The Eternal Burner", "Life gathers data through trial and error before perspective grows with time. You do not need to look settled while the experiment is still teaching you."],
    "4/1": ["The Unstoppable Force", "Your foundation follows a fixed trajectory and your relationships carry its influence. The right people meet the direction rather than redesigning it."],
    "4/6": ["The System Breaker", "Relationships are part of your infrastructure. Over time, influence comes less from convincing and more from embodying what your people already recognize in you."],
    "5/1": ["The Revolutionary Commander", "People often arrive expecting an answer. Investigation helps you decide which expectations you can realistically fulfill and which will create resentment."],
    "5/2": ["The Shadow Disruptor", "Natural capability can attract expectations before you volunteer. Your work is knowing when to step out and solve something and when to remain unavailable."],
    "6/2": ["The Silent Provoker", "Natural gifts become clearer with distance and time. You do not need to perform wisdom; the role-model quality grows from what you have actually lived."],
    "6/3": ["The Indestructible Instigator", "Experimentation remains part of the process. Wisdom comes from developing perspective about which experiments are worth repeating."]
  };

  const root = document.querySelector("[data-profile-explorer]");
  if (!root) return;

  const select = root.querySelector("select");
  const result = root.querySelector("[data-result]");

  select.innerHTML =
    '<option value="">Choose your Profile…</option>' +
    Object.keys(profiles)
      .map(profile => `<option value="${profile}">${profile}</option>`)
      .join("");

  const render = () => {
    const profile = select.value;
    const data = profiles[profile];

    if (!data) {
      result.innerHTML =
        '<p class="explorer-empty">Choose the two-number Profile listed on your chart.</p>';
      return;
    }

    result.innerHTML =
      `<div class="result-kicker">PROFILE ${profile}</div>` +
      `<h2>${data[0]}</h2>` +
      `<p>${data[1]}</p>`;
  };

  select.addEventListener("change", render);
  render();
})();
