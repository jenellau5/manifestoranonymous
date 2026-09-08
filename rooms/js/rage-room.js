(() => {
  'use strict';
  document.documentElement.dataset.playgroundRoom = 'rage-room';
  const KEY = 'ma_rage_wreckage_v1';
  const signals = [
    ['BLOCKED','I knew where I wanted to go and something got in my fucking way.','What were you trying to move toward before something got in the way?'],
    ['CONTROLLED','Someone tried to decide for me, manage me or take over my choice.','What decision or choice feels like somebody else is trying to make for you?'],
    ['INTERRUPTED','I was already moving, creating, talking or doing something and got stopped.','What was already moving before it got interrupted?'],
    ['BOUNDARY CROSSED',"Something happened that I already knew I didn’t want.",'What is the no that needs to become clearer?'],
    ['SWALLOWED IT',"I didn’t say the thing, enforce the no or tell them what I actually needed.",'What sentence is sitting in your throat?'],
    ['NOT HEARD','I expressed or informed and it was ignored.',"What did you already communicate that you’re pissed you apparently have to communicate again?"],
    ['MISREAD','Someone decided what I meant, wanted or felt without actually asking me.',"What did they assume that isn’t actually fucking true?"],
    ['OVERRIDING MYSELF',"I’m doing something I don’t actually want to do.","What would you stop doing if you didn’t have to manage anyone else’s reaction?"],
    ['DEPLETED','I have no fucking capacity and now everything feels like interference.','Would this still piss you off this much if you actually had capacity right now?'],
    ['SOMETHING ELSE',"I know I’m pissed. I don’t know what category it belongs in yet.","If your anger could point at ONE thing and say ‘THIS,’ what would it point at?"]
  ];
  const uses = [
    ['INITIATION','Something needs to change, start or move.','What wants to move now?',"Don’t force yourself to initiate because you’re angry. Notice what the anger revealed and take it through Authority."],
    ['INFORMING','Something needs to be said or made clear.','What do people actually need to know?','Write the clean version. Then SAY THE DAMN THING OUT LOUD.'],
    ['BOUNDARY','Something needs to stop.','What stops here?',"What’s the simplest sentence that makes that clear?"],
    ['REDIRECTION',"I don’t actually want this anymore.",'What are you done giving energy to?','What direction actually has your energy instead?'],
    ['PROTECTION','Something important to me is being fucked with.','What is your anger trying to protect?',"Protection doesn’t automatically mean confrontation. The answer itself can be useful."],
    ['REST','This may be less about the situation and more about having zero capacity.','What can come off your plate right now?',"Your capacity is gone. Stop making yourself solve shit while you’re empty."],
    ['NOTHING',"I noticed the signal. I don’t need to do shit about it.",'THAT COUNTS.',"You noticed the signal. You don’t need to turn every emotion into homework. You can leave."]
  ];
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let step=0, historyOpen=false, busy=false;
  const fresh=()=>({rant:'',signal:null,use:null,answer:'',next:'',second:'',note:'',keepNote:false,saved:false,shared:false});
  let state=fresh();
  const heading=t=>`<h2 tabindex="-1">${t}</h2>`;
  const button=(id,t)=>`<button class="pg-btn rage-button" id="${id}">${t}</button>`;
  const field=(id,label,value,short=true)=>`<label for="${id}">${label}</label><textarea id="${id}" ${short?'class="rr-short"':''} autocomplete="off">${esc(value)}</textarea>`;
  function capture(){for(const [id,key] of [['rr-rant','rant'],['rr-answer','answer'],['rr-next-text','next'],['rr-second','second'],['rr-note','note']])if($(id))state[key]=$(id).value;if($('rr-keep-note'))state.keepNote=$('rr-keep-note').checked;}
  function cards(rows,type,selected){return `<div class="rr-grid" role="group" aria-label="${type==='signal'?'Anger signal':'Use the signal'}">${rows.map((r,i)=>`<button class="rr-card" data-${type}="${i}" aria-pressed="${selected===i}"><strong>${r[0]}</strong><span>${esc(r[1])}</span></button>`).join('')}</div>`;}
  function authority(){let a='';try{a=JSON.parse(localStorage.getItem('ma_manifestor_setup_v1')||'{}').authority;}catch{}const copy={Emotional:'Your anger found the signal. You still don’t owe anyone a decision from the emotional spike.',Splenic:'Notice what your immediate body knowing is telling you underneath the mental story.','Ego / Heart':'Strip away what you’re supposed to want. What do YOU actually want?'};return copy[a]?`<strong>${esc(a)} AUTHORITY</strong><p>${copy[a]}</p>`:'<p>Not sure? Check your Authority in My Setup.</p>';}
  function render(focus=true){
    $('rr-status').textContent='';$('rr-history').hidden=true;$('rr-flow').hidden=false;historyOpen=false;$('rr-wreckage').textContent='MY WRECKAGE';$('rr-back').hidden=step===0;
    $('rr-progress').textContent=`0${step+1} / 06 · ${['LET IT OUT','NOTICE IT','READ IT','USE THE SIGNAL','AUTHORITY CHECK','WHAT NOW?'][step]}`;
    let html='';
    if(step===0)html='<h1 tabindex="-1">WHAT THE FUCK PISSED YOU OFF?</h1><p>Don’t make yourself reasonable first.<br>Don’t explain why they probably meant well.<br>Don’t tell yourself you shouldn’t be mad.<br>Give me the unedited version.</p>'+field('rr-rant','LET IT OUT',state.rant,false)+'<small>Your words stay in this session. Nothing is saved or sent automatically.</small><details class="rr-voice"><summary>SAY IT OUT LOUD</summary><h3>USE YOUR DAMN THROAT.</h3><p>Sometimes you need to hear yourself say it before you can see what the anger is pointing at.</p><p>Say the unedited version somewhere you can speak freely. No recording. Typing is optional.</p></details>'+button('rr-continue','READ THE SIGNAL →');
    if(step===1)html=heading('WHAT DID YOUR ANGER CATCH?')+'<p>Pick the closest lens. These are possibilities to investigate, not diagnoses or final explanations.</p>'+cards(signals,'signal',state.signal)+button('rr-continue','READ IT →');
    if(step===2)html='<span class="rr-kicker">READ THE SIGNAL · '+signals[state.signal][0]+'</span>'+heading(signals[state.signal][2])+field('rr-answer','A SHORT ANSWER IS ENOUGH',state.answer)+button('rr-continue','USE THE SIGNAL →');
    if(step===3)html='<span class="rr-kicker">STOP WASTING YOUR ANGER.</span>'+heading('OKAY. WHAT IS YOUR ANGER GOOD FOR?')+'<p>Anger caught something.<br>That doesn’t mean you have to act on it.<br>But don’t throw away the information.</p>'+cards(uses,'use',state.use)+button('rr-continue','AUTHORITY CHECK →');
    if(step===4)html=heading('ANGER CAUGHT IT. AUTHORITY DECIDES.')+'<p>Your anger can point at the thing. It doesn’t get to make every decision for you.</p><p>Before you initiate, inform, confront, quit, cancel, change direction or burn the whole fucking thing down, run the decision through your Authority.</p><div class="rr-authority" id="rr-authority">'+authority()+'</div><button class="pg-btn pg-btn-dark" id="rr-setup">MY SETUP</button><p>This next step is space to consider what follows. It doesn’t mean you have decided to act.</p>'+button('rr-continue','WHAT NOW? →');
    if(step===5){const u=uses[state.use],nothing=u[0]==='NOTHING';html='<span class="rr-kicker">'+u[0]+'</span>'+heading(u[0]==='REST'?'YOU MIGHT NOT NEED TO SOLVE THIS TONIGHT.':u[2])+`<p>${esc(u[3])}</p>`;
      if(!nothing)html+=field('rr-next-text',u[0]==='REST'?u[2]:u[0]==='BOUNDARY'?u[3]:u[0]==='REDIRECTION'?u[2]:'YOUR WORDS',state.next);
      if(u[0]==='REDIRECTION')html+=field('rr-second',u[3],state.second);
      if(u[0]==='BOUNDARY')html+='<p><strong>SAY IT OUT LOUD.</strong></p>';
      if(u[0]==='INFORMING')html+='<a class="rr-door" href="informing-studio.html">TAKE THIS TO THE INFORMING STUDIO →</a><p><small>Your words won’t transfer automatically.</small></p>';
      if(u[0]==='REST')html+='<a class="rr-door" href="rest-spa.html">STEP INTO THE REST SPA →</a>';
      if(nothing)html+='<a class="pg-btn rage-button" href="../playground.html">BACK TO THE PLAYGROUND →</a>';
      html+='<section class="rr-save"><h3>KEEP THE SIGNAL IN MY WRECKAGE</h3><p>Your Wreckage is saved only in this browser. Save the date, signal and what you chose it was useful for. Your rant and answers are not included.</p><label class="rr-check"><input type="checkbox" id="rr-keep-note" '+(state.keepNote?'checked':'')+'>Include a short note I write below</label><label for="rr-note">OPTIONAL NOTE · 240 CHARACTERS</label><input class="rr-note" id="rr-note" maxlength="240" value="'+esc(state.note)+'" autocomplete="off">'+button('rr-save',state.saved?'SIGNAL SAVED':'SAVE THIS SIGNAL')+'<p>No account. No cloud sync. It won’t follow you between devices.</p></section>';
      html+='<details class="rr-anon"><summary>SHARE THE RANT ANONYMOUSLY · OPTIONAL</summary><p>This sends your raw rant to Manifestor Anonymous separately from My Wreckage. Remove names or identifying details from the rant first.</p><label class="rr-check"><input type="checkbox" id="rr-consent"><span><strong>LET MANIFESTOR ANONYMOUS KEEP THIS ANONYMOUSLY</strong><br>MA may anonymously use this submission for community insights, content or Anonymous Files. No name, contact information or chart setup is attached by this tool.</span></label>'+button('rr-share',state.shared?'SEND ATTEMPTED':'SEND ANONYMOUS COPY')+'<p id="rr-send-status" role="status"></p></details><div class="rr-actions">'+button('rr-finish','DONE · CLEAR THIS SESSION')+'<a class="rr-door" href="../playground.html">BACK TO THE PLAYGROUND →</a></div>';
    }
    $('rr-flow').innerHTML=html;
    if($('rr-continue'))$('rr-continue').disabled=(step===1&&state.signal===null)||(step===3&&state.use===null);
    if($('rr-save'))$('rr-save').disabled=state.saved;
    if($('rr-share'))$('rr-share').disabled=state.shared||!state.rant.trim();
    if(focus){$('rr-flow').querySelector('h1,h2')?.focus({preventScroll:true});$('rr-console').scrollIntoView({block:'start',behavior:'instant'});}
  }
  function readHistory(){const raw=localStorage.getItem(KEY);if(!raw)return [];const data=JSON.parse(raw);if(!Array.isArray(data))throw Error('history');return data.filter(e=>e&&typeof e.date==='string'&&Number.isFinite(Date.parse(e.date))&&signals.some(s=>s[0]===e.signal)&&uses.some(u=>u[0]===e.use)).map(e=>({date:e.date,signal:e.signal,use:e.use,note:typeof e.note==='string'?e.note.slice(0,240):''}));}
  function showHistory(){capture();historyOpen=true;$('rr-flow').hidden=true;$('rr-history').hidden=false;$('rr-back').hidden=true;$('rr-wreckage').textContent='BACK TO MY SIGNAL';$('rr-status').textContent='';let rows=[],error=false;try{rows=readHistory();}catch{error=true;}
    const now=Date.now(),recent=rows.filter(e=>now-Date.parse(e.date)>=0&&now-Date.parse(e.date)<=30*86400000).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
    const counts=signals.map(s=>[s[0],recent.filter(e=>e.signal===s[0]).length]).filter(s=>s[1]).sort((a,b)=>b[1]-a[1]);
    let html=heading('MY WRECKAGE')+'<p>Your Wreckage is saved only in this browser.</p>';
    if(error)html+='<p>Wreckage could not be read. Nothing has been overwritten. You can clear it below, or continue without saving.</p>';
    else if(!rows.length)html+='<p>No signals saved yet. Save one at the end of the flow if you want to track what keeps showing up.</p>';
    else{html+='<h3>LAST 30 DAYS</h3>'+ (counts.length?counts.map(([s,n])=>`<div class="rr-count"><span>${s}</span><b>× ${n}</b></div>`).join(''):'<p>No signals in the last 30 days.</p>');
      if(recent.length>=3){html+='<h3>YOUR ANGER KEEPS POINTING HERE</h3><p><strong>SOMETHING’S SHOWING UP.</strong></p>';const top=counts.filter(c=>c[1]===counts[0][1]);html+=`<p>${top.length===1?'Your most logged signal':'Your joint most logged signals'}: ${top.map(c=>c[0]).join(' + ')} (${counts[0][1]} ${top.length>1?'each ':''}of ${recent.length} in the last 30 days).</p>`;const last=recent.slice(0,6);const b=last.filter(e=>e.use==='BOUNDARY').length;if(b>=2)html+=`<p>${b} of your last ${last.length} signals in this period ended in BOUNDARY.</p>`;}
      else html+='<p>Save at least three signals within 30 days to start seeing patterns.</p>';
      html+='<h3>SAVED SIGNALS</h3>'+rows.slice().sort((a,b)=>Date.parse(b.date)-Date.parse(a.date)).map(e=>`<article class="rr-entry"><time>${esc(new Date(e.date).toLocaleString())}</time><strong>${e.signal} → ${e.use}</strong>${e.note?'<p>'+esc(e.note)+'</p>':''}</article>`).join('');}
    html+='<button class="pg-btn pg-btn-dark" id="rr-clear-history">CLEAR MY WRECKAGE</button>';$('rr-history').innerHTML=html;$('rr-history').querySelector('h2').focus({preventScroll:true});$('rr-console').scrollIntoView({block:'start',behavior:'instant'});
  }
  function reset(){state=fresh();step=0;render();$('rr-status').textContent='Session cleared. Your saved Wreckage is still here.';}
  $('rr-wreckage').onclick=()=>historyOpen?render():showHistory();
  $('rr-back').onclick=()=>{capture();if(step>0)step--;render();};
  $('rr-reset').onclick=()=>{if(!busy&&confirm('Clear this session’s words and selections? Saved Wreckage stays.'))reset();};
  $('rr-console').addEventListener('click',async e=>{
    const b=e.target.closest('button');if(!b||busy)return;
    if(b.dataset.signal!==undefined){capture();const n=Number(b.dataset.signal);if(state.signal!==n){state.answer='';state.saved=false;}state.signal=n;$('rr-flow').querySelectorAll('[data-signal]').forEach(x=>x.setAttribute('aria-pressed',x===b));$('rr-continue').disabled=false;}
    if(b.dataset.use!==undefined){capture();const n=Number(b.dataset.use);if(state.use!==n){state.next='';state.second='';state.saved=false;}state.use=n;$('rr-flow').querySelectorAll('[data-use]').forEach(x=>x.setAttribute('aria-pressed',x===b));$('rr-continue').disabled=false;}
    if(b.id==='rr-continue'){capture();step++;render();}
    if(b.id==='rr-setup')$('open-setup').click();
    if(b.id==='rr-finish'){if(confirm('Clear your session’s words and finish? Saved Wreckage stays.'))reset();}
    if(b.id==='rr-save'){capture();try{const rows=readHistory();rows.push({date:new Date().toISOString(),signal:signals[state.signal][0],use:uses[state.use][0],...(state.keepNote&&state.note.trim()?{note:state.note.trim().slice(0,240)}:{})});localStorage.setItem(KEY,JSON.stringify(rows));state.saved=true;b.disabled=true;b.textContent='SIGNAL SAVED';$('rr-status').textContent='Saved in this browser. Your rant and answers were not saved.';}catch{$('rr-status').textContent='Could not save in this browser. Nothing has been overwritten.';}}
    if(b.id==='rr-clear-history'&&confirm('Delete all Wreckage saved in this browser? This cannot be undone.')){try{localStorage.removeItem(KEY);state.saved=false;showHistory();$('rr-status').textContent='Your Wreckage is cleared.';}catch{$('rr-status').textContent='This browser could not clear Wreckage.';}}
    if(b.id==='rr-share'){
      if(!$('rr-consent').checked){$('rr-send-status').textContent='Check the permission box first. Nothing has been sent.';return;}
      busy=true;b.disabled=true;$('rr-reset').disabled=true;$('rr-back').disabled=true;$('rr-wreckage').disabled=true;$('rr-send-status').textContent='Sending an anonymous copy…';
      try{await fetch('https://script.google.com/macros/s/AKfycbwwPHSXEWDDsgnhew0_ZPpk-ElL7nCY-orUBZXeL_asX1PUcM1z-9YSKfvl850lbMg8/exec',{method:'POST',mode:'no-cors',credentials:'omit',referrerPolicy:'no-referrer',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({room:'Rage Room',submission:state.rant,category:signals[state.signal][0],context:'User explicitly shared after reading the anger signal.',permission:true}),signal:AbortSignal.timeout(15000)});state.shared=true;$('rr-send-status').textContent='Send attempted. This connection cannot confirm delivery. Your words are still here.';b.textContent='SEND ATTEMPTED';}catch{$('rr-send-status').textContent='Could not confirm sending. Your words are still here. Retrying may send a duplicate.';b.disabled=false;}finally{busy=false;$('rr-reset').disabled=false;$('rr-back').disabled=false;$('rr-wreckage').disabled=false;}
    }
  });
  for(const id of ['save-setup','clear-setup'])$(id)?.addEventListener('click',()=>{if($('rr-authority'))$('rr-authority').innerHTML=authority();});
  window.addEventListener('storage',e=>{if(e.key==='ma_manifestor_setup_v1'&&$('rr-authority'))$('rr-authority').innerHTML=authority();if(e.key===KEY&&historyOpen)showHistory();});
  window.addEventListener('pagehide',()=>{state=fresh();step=0;render(false);});
  render(false);
})();

