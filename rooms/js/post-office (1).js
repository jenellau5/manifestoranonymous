(() => {
  'use strict';
  document.documentElement.dataset.playgroundRoom = 'post-office';
  const $ = id => document.getElementById(id);
  const packages = [
    ["Something I never said", ["What happened that left something unsaid?", "What did you want to say, in your own words?", "What is still hanging in the air for you?"]],
    ["Something I wish I'd said differently", ["What did you say, and what would you change?", "What did you mean to communicate?", "How would you say it now?"]],
    ["Someone else's expectations", ["What expectation are you carrying, and where did it come from?", "Which part, if any, do you actually agree to?", "What do you want to say about the rest?"]],
    ["Someone else's reaction to me", ["What was their reaction? What, if anything, did they put on you?", "What part, if any, did you start believing?", "What actually belongs to you? What belongs to them?"]],
    ["Guilt about the impact I made", ["What happened? What impact do you know about, and what are you assuming?", "What part do you want to take responsibility for?", "What do you want to acknowledge, clarify, or leave here?"]],
    ["An initiation/idea I'm done carrying", ["What did you start, imagine, or try to get moving?", "What is still asking something of you?", "What do you want to say to this idea or initiation now?"]],
    ["A version of me I've outgrown", ["Which version of you is this about?", "What no longer fits? What, if anything, are you keeping?", "What do you want to say to that version of yourself?"]],
    ["I don't fucking know, I just need to get this out", ["Start anywhere. What keeps coming back?", "What else needs to be put into words?", "Is there anything you want to leave on the page, even without an explanation?"]]
  ];
  const dispositions = [
    ['SEND IT', "I'm actually going to say/send this; give me a clean copy.", 'SENT', 'Ready for your delivery · not sent by MA', 'Your clean copy is below. SENT records your choice; delivery is yours to do.'],
    ['RETURN TO SENDER', "This isn't mine anymore.", 'RETURNED', 'Returned by your choice · no external delivery', 'NO LONGER MY FUCKING PACKAGE'],
    ['HOLD AT POST OFFICE', "I'm not ready to do anything with this yet.", 'HELD', 'Held in this open page only', 'No decision needed now. To keep this beyond this visit, download your letter to your own device. This room does not store it.'],
    ['DEAD LETTER OFFICE', 'Nobody needs to receive this; I just needed it out of me.', 'DEAD LETTER', 'No recipient delivery requested', 'The words can stay here until you delete them or leave. Nobody receives them.'],
    ['NEVER FUCKING MAIL THIS', 'Exactly what it sounds like.', 'NEVER MAILED', 'Do not deliver', 'Never mailed. Your words remain here until you delete them or leave.']
  ];
  const stages = ['po-address', 'po-writing', 'po-review', 'po-counter', 'po-result'];
  let selected = 7;
  let disposition = null;
  const status = message => { $('po-status').textContent = message; };
  function reveal(id) { $(id).hidden = false; $(id).querySelector('h2').focus(); }
  function invalidateResult() { $('po-result').hidden = true; disposition = null; $('po-slip').replaceChildren(); $('po-clean-letter').textContent = ''; $('po-dispositions').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', 'false')); }
  function button(text, action) { const b = document.createElement('button'); b.type = 'button'; b.textContent = text; b.onclick = action; return b; }
  function choosePackage(index) {
    const existingAnswers = [...$('po-prompts').querySelectorAll('textarea')].map(t => t.value);
    selected = index;
    invalidateResult();
    $('po-types').querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-pressed', String(i === index)));
    $('po-package').textContent = packages[index][0];
    $('po-prompts').replaceChildren();
    [...packages[index][1], 'Anything else? (Optional)'].forEach((prompt, i) => {
      const label = document.createElement('label'); label.htmlFor = `po-answer-${i}`; label.textContent = prompt;
      const input = document.createElement('textarea'); input.id = label.htmlFor; input.value = existingAnswers[i] || ''; input.rows = 4; input.autocomplete = 'off'; input.spellcheck = false;
      input.oninput = () => { invalidateResult(); $('po-counter').hidden = true; };
      $('po-prompts').append(label, input);
    });
    status('');
  }
  packages.forEach(([label], i) => { const b = button(label, () => choosePackage(i)); b.setAttribute('aria-pressed', 'false'); $('po-types').append(b); });
  ['po-from', 'po-to', 'po-signoff'].forEach(id => $(id).oninput = invalidateResult);
  $('po-prompt-toggle').onclick = () => {
    const open = $('po-writing').hidden;
    $('po-writing').hidden = !open;
    $('po-prompt-toggle').setAttribute('aria-expanded', String(open));
    if (open) reveal('po-writing');
  };
  function formattedLetter() {
    const to = $('po-to').value.trim() || 'Recipient';
    const from = $('po-from').value.trim() || 'ME';
    const closing = $('po-signoff').value.trim();
    return 'TO: ' + to + '\nFROM: ' + from + '\n\nDear ' + to + ',\n\n' + $('po-letter').value.trim() + (closing ? '\n\n' + closing + '\n' + from : '');
  }
  $('po-assemble').onclick = () => {
    const paragraphs = [...$('po-prompts').querySelectorAll('textarea')].map(t => t.value.trim()).filter(Boolean);
    if (!paragraphs.length) { status('Put some words into at least one prompt first.'); return $('po-answer-0').focus(); }
    if ($('po-letter').value && !window.confirm('Rebuild from your prompt answers? This replaces edits in the letter below.')) return;
    $('po-letter').value = paragraphs.join('\n\n'); invalidateResult(); $('po-counter').hidden = true; status(''); reveal('po-review');
  };
  $('po-letter').oninput = invalidateResult;
  $('po-counter-open').onclick = () => {
    if (!$('po-letter').value.trim()) { status('Your letter needs some words before it reaches the counter.'); return $('po-letter').focus(); }
    status(''); reveal('po-counter');
  };
  function field(label, value) {
    const box = document.createElement('div'); const title = document.createElement('dt'); const text = document.createElement('dd');
    title.textContent = label; text.textContent = value; box.append(title, text); return box;
  }
  function chooseDisposition(index) {
    if (!$('po-letter').value.trim()) return status('Fill in the addressee and letter first.');
    disposition = index;
    $('po-dispositions').querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-pressed', String(i === index)));
    const [name, , stamp, tracking, note] = dispositions[index];
    const title = document.createElement('h3'); title.textContent = 'MANIFESTOR ANONYMOUS POSTAL SERVICE';
    const division = document.createElement('p'); division.textContent = 'CERTIFIED DISPOSITION SLIP / MA · UNRESOLVED IMPACT DIVISION';
    const fields = document.createElement('dl');
    fields.append(field('FROM', $('po-from').value.trim() || 'ME'), field('TO', $('po-to').value.trim() || 'Recipient'), field('CONTENTS', packages[selected][0]), field('DISPOSITION', name), field('TRACKING STATUS', tracking), field('POSTMARK', new Date().toLocaleDateString(undefined, {year:'numeric', month:'short', day:'numeric'})));
    const mark = document.createElement('strong'); mark.className = 'po-stamp'; mark.textContent = stamp;
    const foot = document.createElement('p'); foot.textContent = index === 1 ? 'NO LONGER MY FUCKING PACKAGE' : 'PERSONAL RECORD · NO POSTAGE VALUE · NO EXTERNAL DELIVERY';
    $('po-slip').replaceChildren(title, division, fields, mark, foot);
    $('po-result-note').textContent = note;
    $('po-clean').hidden = false;
    $('po-clean-letter').textContent = formattedLetter();
    status(''); reveal('po-result');
  }
  dispositions.forEach(([label, description], i) => { const b = button('', () => chooseDisposition(i)); const title = document.createElement('strong'); title.textContent = label; const detail = document.createElement('span'); detail.textContent = description; b.append(title, detail); b.setAttribute('aria-pressed', 'false'); $('po-dispositions').append(b); });
  function print(mode) { document.body.dataset.poPrint = mode; window.print(); }
  window.addEventListener('afterprint', () => { delete document.body.dataset.poPrint; });
  $('po-print-slip').onclick = () => print('slip');
  $('po-print-letter').onclick = () => print('letter');
  $('po-copy').onclick = async () => { try { await navigator.clipboard.writeText(formattedLetter()); status('Clean letter copied.'); } catch { status('Clipboard unavailable. Select and copy the clean letter below.'); } };
  $('po-save-draft').onclick = () => {
    const url = URL.createObjectURL(new Blob([formattedLetter()], {type:'text/plain;charset=utf-8'}));
    const link = document.createElement('a'); link.href = url; link.download = 'ma-post-office-letter.txt'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    status('Download requested. A downloaded copy stays on your device after you clear this room.');
  };
  function reset() {
    selected = 7; disposition = null;
    $('po-workbench').querySelectorAll('input, textarea, select').forEach(input => input.value = '');
    stages.forEach(id => $(id).hidden = true); $('po-prompts').replaceChildren(); invalidateResult();
    $('po-review').hidden = false; $('po-address').hidden = false; $('po-prompt-toggle').setAttribute('aria-expanded', 'false'); choosePackage(7);
    $('po-result-note').textContent = ''; $('po-package').textContent = '';
    $('po-workbench').querySelectorAll('[aria-pressed]').forEach(b => b.setAttribute('aria-pressed', 'false'));
  }
  $('po-reset').onclick = () => { reset(); status('Cleared from this page. Any downloaded, printed, or clipboard copies are yours to delete separately.'); $('po-letter').focus(); };
  choosePackage(7);
  window.addEventListener('pagehide', reset);
})();
