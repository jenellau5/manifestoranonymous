window.MA_SITE_CONFIG = Object.freeze({
  playgroundPayhip: "https://payhip.com/b/4SZio",
  profilePayhip: "https://payhip.com/b/Hwgs5",
  channelsPayhip: "https://payhip.com/b/6kvnu",
  musicPayhip: "https://payhip.com/b/eGAgT",
  chartDropPayhip: "https://payhip.com/b/ky9wG",
  songCoderUrl: "https://learn-gates-through-music.jenellau.chatgpt.site/",
  songCoderPassword: "HEAR64",
  anonymousForm: "https://tr.ee/r3r4PB5Pyh",
  playgroundPrice: "$97"
});

document.addEventListener('DOMContentLoaded', () => {
  const C = window.MA_SITE_CONFIG;
  document.querySelectorAll('[data-ma-link]').forEach(el => {
    const key = el.dataset.maLink;
    if (C[key]) el.href = C[key];
  });
  document.querySelectorAll('[data-ma-text]').forEach(el => {
    const key = el.dataset.maText;
    if (C[key] !== undefined) el.textContent = C[key];
  });
});
