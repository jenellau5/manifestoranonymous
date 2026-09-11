(() => {
  'use strict';
  document.documentElement.dataset.playgroundRoom = 'rage-room';
  const KEY = 'ma_rage_wreckage_v1'; // Preserve previously saved signals.
  const $ = id => document.getElementById(id);
  if (!$('rr-flow')) return;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const signals = ['A boundary','An interruption','Being controlled','Being misunderstood','Resistance or a blocked direction','Something else'];
  const fresh = () => ({id:globalThis.crypto?.randomUUID?.() || 'note-'+Date.now()+'-'+Math.random().toString(36).slice(2),rant:'',signal:'',answer:'',next:'',note:'',saved:false,shared:false});
  let state = fresh(), view = 'write', busy = false;
  const status = text => { $('rr-status').textContent = text; };
  const button = (id,text) => `<button type="button" class="pg-btn rage-button" id="${id}">${text}</button>`;
  const section = (title,text) => text?.trim() ? `<section><h3>${title}</h3><p class="rr-words">${esc(text)}</p></section>` : '';
  function capture() {
    for (const [id,key] of [['rr-rant','rant'],['rr-signal','signal'],['rr-answer','answer'],['rr-next-text','next']]) {
      if (!$(id)) continue;
      if ($(id).value !== state[key]) { state.saved=false; if (key==='rant') state.shared=false; }
      state[key]=$(id).value;
    }
  }
  function readHistory() {
    const rows=JSON.parse(localStorage.getItem(KEY)||'[]');
    if (!Array.isArray(rows) || rows.some(r=>!r || typeof r.date!=='string')) throw Error('Saved notes could not be read.');
    return rows.map((r,i)=>({...r,id:r.id||'legacy-'+r.date+'-'+i}));
  }
  function render(focus=true) {
    $('rr-history').hidden=true; $('rr-flow').hidden=false;
    $('rr-wreckage').textContent='MY SAVED NOTES'; $('rr-back').hidden=view!=='result';
    $('rr-progress').textContent=view==='write'?'WRITE → KEEP OR BURN':view==='result'?'YOUR ANGER NOTE':'NOTE BURNED';
    status('');
    if (view==='write') {
      $('rr-flow').innerHTML=`<h1 tabindex="-1">WHAT THE FUCK PISSED YOU OFF?</h1>
        <p>Anger can be a signal that something needs attention—a boundary, a change, or something you want to get done. Get the words out first. You decide what they mean.</p>
        <label for="rr-rant">WRITE IT OUT</label><textarea id="rr-rant" autocomplete="off" placeholder="The unedited version.">${esc(state.rant)}</textarea>
        <details class="rr-reflect" ${state.signal||state.answer||state.next?'open':''}><summary>WANT TO FIND THE SIGNAL? · OPTIONAL</summary>
          <label for="rr-signal">What might this be pointing toward?</label><select id="rr-signal"><option value="">Leave this open</option>${signals.map(s=>`<option ${state.signal===s?'selected':''}>${s}</option>`).join('')}</select>
          <label for="rr-answer">What part of life needs attention? · optional</label><textarea id="rr-answer" class="rr-short" placeholder="The part that hit hardest, or what you notice.">${esc(state.answer)}</textarea>
          <label for="rr-next-text">What do you want to do with that? · optional</label><textarea id="rr-next-text" class="rr-short" placeholder="A conversation, a change, one task, a pause—or nothing yet.">${esc(state.next)}</textarea>
        </details>
        <p><small>Nothing is saved or sent unless you choose it. Blank reflections stay off your note.</small></p>${button('rr-continue','SHOW MY ANGER NOTE')}`;
      // Legacy signal labels remain editable without silently replacing them.
      if(state.signal&&!signals.includes(state.signal)){const option=new Option(state.signal,state.signal,true,true);$('rr-signal').add(option);}
    } else if (view==='result') {
      $('rr-flow').innerHTML=`<h2 tabindex="-1">YOUR WORDS. YOUR SIGNAL.</h2><article class="rr-signal-board" id="rr-note-board"><span class="rr-kicker">MY ANGER NOTE</span>
        ${section('WHAT PISSED ME OFF',state.rant)}${section('WHAT IT MIGHT POINT TOWARD',state.signal)}${section('WHAT NEEDS ATTENTION',state.answer)}${section('WHAT I WANT TO DO',state.next)}${section('MY SAVED NOTE',state.note)}</article>
        <p>You can use this information to make a change or get something moving. You can also pause. Feeling angry does not decide the next move for you.</p>
        <div class="rr-actions">${button('rr-save',state.saved?'NOTE SAVED':'SAVE ANGER NOTE')}${button('rr-burn','BURN THIS NOTE')}${button('rr-edit','EDIT MY NOTE')}</div>
        <p><small>Save keeps this whole note in this browser, including your rant. Burn deletes this note here, including its saved copy. Neither action sends it to anyone.</small></p>
        <details class="rr-anon"><summary>SHARE THE RANT WITH MA · OPTIONAL</summary><p>Only your original rant is shared. Remove identifying details before sending. Sharing is separate from saving or burning.</p><label class="rr-check"><input type="checkbox" id="rr-consent">I give MA permission to receive this rant and use it anonymously for community insights or content.</label>${button('rr-share',state.shared?'RANT RECEIVED':'SEND ANONYMOUS COPY')}<p id="rr-send-status" role="status"></p><small>Burning cannot recall a copy already shared with MA.</small></details>`;
      $('rr-save').disabled=state.saved; $('rr-share').disabled=state.shared||!state.rant.trim();
    } else {
      $('rr-flow').innerHTML=`<h2 tabindex="-1">NOTE BURNED.</h2><p>The words are cleared from this session and this note’s saved copy. Other saved notes stay. Burning a note does not erase what happened—you can still act on what you noticed.</p>${button('rr-new','WRITE ANOTHER')}<a class="rr-door" href="../playground.html">BACK TO THE PLAYGROUND →</a>`;
    }
    if (focus) { $('rr-flow').querySelector('h1,h2')?.focus({preventScroll:true}); $('rr-console').scrollIntoView({block:'start',behavior:'instant'}); }
  }
  function showHistory() {
    capture(); $('rr-flow').hidden=true; $('rr-history').hidden=false; $('rr-back').hidden=true; $('rr-wreckage').textContent='BACK TO MY NOTE'; status('');
    let html='<h2 tabindex="-1">MY SAVED ANGER NOTES</h2><p>Saved only in this browser. Older signal-only entries are still here.</p>';
    try {
      const rows=readHistory().sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
      html+=rows.length ? rows.map(r=>`<article class="rr-entry"><time>${esc(new Date(r.date).toLocaleString())}</time><p>${esc((r.rant||r.note||r.signal||'Saved signal').slice(0,180))}</p><button type="button" data-open-note="${esc(r.id)}">OPEN NOTE</button></article>`).join('') : '<p>No notes saved yet.</p>';
    } catch { html+='<p>Saved notes could not be opened. Nothing has been overwritten.</p>'; }
    html+='<button type="button" id="rr-clear-history">DELETE ALL SAVED NOTES</button>';
    $('rr-history').innerHTML=html; $('rr-history').querySelector('h2').focus();
  }
  function reset(message='Session cleared. Other saved notes stay.') { state=fresh(); view='write'; render(); status(message); }
  $('rr-wreckage').onclick=()=>{if(busy)return;$('rr-history').hidden?showHistory():render();};
  $('rr-back').onclick=()=>{if(!busy){view='write';render();}};
  $('rr-reset').onclick=()=>{if(!busy&&confirm('Clear this session? Saved notes stay unless you burn or delete them.'))reset();};
  $('rr-console').addEventListener('click',async e=>{
    const b=e.target.closest('button'); if(!b||busy)return;
    if(b.id==='rr-continue') {capture();if(!state.rant.trim()){status('Put some words in the note first.');$('rr-rant').focus();return;}view='result';render();}
    if(b.id==='rr-edit'){view='write';render();}
    if(b.id==='rr-new')reset('');
    if(b.id==='rr-save') {
      try {const rows=readHistory(),entry={id:state.id,date:new Date().toISOString(),rant:state.rant,signal:state.signal,answer:state.answer,next:state.next,note:state.note};const at=rows.findIndex(r=>r.id===state.id);if(at<0)rows.push(entry);else rows[at]=entry;localStorage.setItem(KEY,JSON.stringify(rows));state.saved=true;b.disabled=true;b.textContent='NOTE SAVED';status('Your whole anger note is saved in this browser.');}
      catch {status('This browser could not save your note. Your words are still on this page.');}
    }
    if(b.id==='rr-burn') {
      if(!confirm('Burn this note? Its words and its saved copy in this browser will be deleted. A shared copy cannot be recalled.'))return;
      try {const rows=readHistory();if(rows.some(r=>r.id===state.id))localStorage.setItem(KEY,JSON.stringify(rows.filter(r=>r.id!==state.id)));}
      catch {status('Could not check or remove the saved copy. Your note has not been burned.');return;}
      busy=true; $('rr-note-board').classList.add('rr-burning');
      await new Promise(resolve=>setTimeout(resolve,matchMedia('(prefers-reduced-motion: reduce)').matches?0:450));
      const shared=state.shared;state=fresh();view='burned';busy=false;render();if(shared)status('The copy already shared with MA cannot be recalled.');
    }
    if(b.dataset.openNote) {
      try {const row=readHistory().find(r=>r.id===b.dataset.openNote);if(!row)return;if(state.rant.trim()&&!state.saved&&state.id!==row.id&&!confirm('Open the saved note and discard this unsaved draft?'))return;state={...fresh(),...row,answer:row.answer||'',next:row.next||row.use||'',rant:row.rant||'',signal:row.signal||'',note:row.note||'',saved:true};view='result';render();}
      catch {status('Could not open that note. Nothing was changed.');}
    }
    if(b.id==='rr-clear-history'&&confirm('Delete all saved anger notes in this browser?')) {
      try {localStorage.removeItem(KEY);state.saved=false;showHistory();status('Saved notes deleted.');}catch {status('Could not delete saved notes. Use your browser’s site-data settings.');}
    }
    if(b.id==='rr-share') {
      if(!$('rr-consent').checked){$('rr-send-status').textContent='Check the permission box first. Nothing sent.';return;}
      const sendingState=state;busy=true;b.disabled=true;$('rr-send-status').textContent='Sending…';
      try {await window.maSendAnonymousSubmission({room:'Rage Room',submission:state.rant,category:state.signal||'Anger note',context:'User explicitly chose anonymous sharing.'});if(state!==sendingState)return;state.shared=true;b.textContent='RANT RECEIVED';$('rr-send-status').textContent='Rant received by MA.';}
      catch(error){if(state!==sendingState)return;$('rr-send-status').textContent='Delivery not confirmed. '+(error.message||'Connection unavailable.')+' Your words are still here. Retrying may send a duplicate.';b.disabled=false;}
      finally {busy=false;}
    }
  });
  window.addEventListener('pagehide',()=>{state=fresh();view='write';busy=false;render(false);});
  window.addEventListener('storage',e=>{if(e.key===KEY){state.saved=false;if(!$('rr-history').hidden)showHistory();else if(view==='result')render(false);}});
  render(false);
})();
