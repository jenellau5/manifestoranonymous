/* Recordings and words stay in this tab. */
(() => {
  'use strict';
  const root=document.querySelector('.informing-studio-page .studio-console');
  if(!root)return;
  const words=t=>t.trim().split(/\s+/).filter(Boolean).length;
  const modes={open:['NO COACHING. NO PROMPTS. JUST THE MIC.','Say it. You choose what happens next.'],person:['WHAT NEEDS TO BE SAID?','Give the people impacted the information. Shared decisions still need agreement.'],universe:['WHAT NEEDS TO BE SAID OUT LOUD?',"DON’T FIX IT. INFORM IT."]};
  const prompts=['What do you want that you’ve been making yourself justify?','What are you done pretending you’re okay with?','What would you love to happen even though you have no idea how?','What are you ready for?','What are you not available for anymore?','What do you want someone to know?','What are you fucking tired of?','What keeps coming back into your head?','What have you already decided?','What are you afraid to admit you want?','What would you say if nobody could tell you it was unrealistic?'];
  let mode='open',takes=0,version=0,recording=false,starting=false,recognition=null,stream=null,recorder=null,audioURL='',timer=null,playbackReady=false,seed='',finalWords='',promptIndex=-1;
  const $=id=>root.querySelector('#is-'+id);
  root.innerHTML=`
    <div class="is-top"><span class="is-meta"><span class="is-lamp"></span>INFORMING STUDIO / ROOM 01</span><button id="is-clear">Clear this session</button></div>
    <div class="is-modes" aria-label="Choose your studio mode">
      <button class="is-mode" data-mode="open" aria-pressed="true">OPEN MIC<small>Just let it out.</small></button>
      <button class="is-mode" data-mode="person" aria-pressed="false">INFORM A PERSON<small>Find your sentence.</small></button>
      <button class="is-mode" data-mode="universe" aria-pressed="false">INFORM THE UNIVERSE<small>Give it your throat.</small></button>
    </div>
    <div id="is-work">
      <div class="is-booth"><span class="is-meta" id="is-take">TAKE 01</span><h2 id="is-heading"></h2><p class="is-muted" id="is-intro"></p>
        <button class="is-mic" id="is-mic" aria-label="Start microphone" aria-pressed="false"><svg viewBox="0 0 32 40" fill="none" aria-hidden="true"><rect x="10" y="2" width="12" height="23" rx="6" stroke="currentColor" stroke-width="2"/><path d="M5 18v3a11 11 0 0 0 22 0v-3M16 32v6M10 38h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
        <p class="is-meta" id="is-mic-label">TAP TO SPEAK</p><div class="is-options"><label><input id="is-transcribe" type="checkbox"/> Show my words as text</label><label><input id="is-playback" type="checkbox" checked/> Let me listen back</label></div>
        <p class="is-muted" style="font-size:.875rem">Your recording stays here. Turning speech into text may send audio to your browser’s speech service.</p>
        <button id="is-type">I’d rather type</button><button id="is-prompt" hidden>Give me a prompt</button><section id="is-prompt-card" class="is-prompt-card" hidden tabindex="-1" aria-label="Your speaking prompt" aria-live="polite"><span class="is-meta">TRY SAYING THIS OUT LOUD</span><p id="is-prompt-text"></p><small>Speak your answer, or type it below.</small></section>
      </div>
      <div class="is-field" id="is-who-wrap" hidden><label for="is-who">WHO NEEDS TO KNOW? · OPTIONAL</label><select id="is-who"><option value="">Not sure yet</option><option>Partner</option><option>Family</option><option>Friend</option><option>Boss</option><option>Coworker</option><option>Employee</option><option>Client</option><option>Audience</option><option>Other</option></select></div>
      <div class="is-field" id="is-transcript-wrap" hidden><label for="is-transcript">YOUR WORDS · EDIT ANYTHING THE MIC MISHEARD</label><textarea id="is-transcript" maxlength="6000" placeholder="Start wherever you are. It doesn’t have to come out clean." spellcheck="true"></textarea><div class="is-row"><span class="is-meta" id="is-count">0 WORDS</span><span class="is-muted">Up to 6,000 characters per take</span></div></div>
      <audio id="is-audio" controls hidden aria-label="Hear yourself"></audio>
      <p id="is-hear-note" class="is-muted" hidden>WHAT DID YOU NOTICE WHEN YOU HEARD YOURSELF?</p>
      <div class="is-actions"><button class="is-primary" id="is-done">I’m done with this take</button></div>
      <section id="is-choices" hidden><h3>WHAT NEXT?</h3><div class="is-chips" id="is-choice-buttons"></div></section>
      <section class="is-result" id="is-result" hidden tabindex="-1" aria-label="Edit your words">
        <div class="is-field"><label for="is-own-line">WHAT DO YOU WANT TO SAY?</label><textarea id="is-own-line" maxlength="6000" placeholder="Write it your way."></textarea></div>
        <div class="is-actions"><button class="is-primary" id="is-keep">Keep these words</button><button id="is-again">Say it again</button></div>
      </section>
    </div>
    <section id="is-finish" class="is-finish" hidden tabindex="-1"><span class="is-meta">INFORMED IN THE STUDIO.</span><h2 id="is-finish-heading"></h2><p id="is-finish-copy"></p><blockquote id="is-final"></blockquote>
      <div class="is-actions"><button id="is-copy">COPY IT</button><button id="is-practice">PRACTICE AGAIN</button><button id="is-new">START ANOTHER</button><a class="is-link" href="../playground.html">BACK TO PLAYGROUND</a></div>
      <details><summary>KEEP MY WORDS</summary><div class="is-field"><label for="is-noticed">WHAT I NOTICED · OPTIONAL</label><textarea id="is-noticed" maxlength="600" placeholder="I kept trying to explain why."></textarea></div><button id="is-session-sheet-button">Show my transcript</button></details>
      <div class="is-session-sheet" id="is-session-sheet" hidden><span class="is-meta">MANIFESTOR ANONYMOUS / INFORMING STUDIO</span><h3>SESSION TRANSCRIPT</h3><span class="is-meta">WHAT NEEDED OUT</span><blockquote id="is-session-sheet-line"></blockquote><p id="is-session-sheet-meta"></p><p id="is-session-sheet-note"></p><strong>SAY THE DAMN THING.</strong></div><button id="is-download" hidden>Download transcript (.txt)</button>
    </section>
    <p class="is-status" id="is-status" role="status" aria-live="polite"></p>
    <details class="is-privacy"><summary>Your privacy</summary>
      <p>Your words and recording stay in this tab. Clear the session or leave the page to remove them. A new take replaces the recording.</p>
      <p>Turning speech into text may send audio to your browser’s speech service. Leave that option off to record only.</p>
      <p>A transcript you download stays on your device until you delete it.</p>
    </details><p class="is-rule">YOUR WORDS. YOUR VOICE. YOUR EXPERIMENT.</p>`;
  function status(t){$('status').textContent=t;}
  function hide(id,v=true){$(id).hidden=v;}
  function count(){ $('count').textContent=`${words($('transcript').value)} WORDS`; }
  function button(label,fn){const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',fn);return b;}
  function buttons(id,items){$(id).replaceChildren(...items.map(([label,fn])=>button(label,fn)));}
  function releaseAudio(){if(audioURL)URL.revokeObjectURL(audioURL);audioURL='';playbackReady=false;$('audio').pause();$('audio').removeAttribute('src');$('audio').load();hide('audio');hide('hear-note');}
  function stopMedia(discard=false){
    clearTimeout(timer);timer=null;starting=false;
    if(recognition){const r=recognition;recognition=null;if(discard){r.onresult=null;r.onend=null;r.onerror=null;r.abort();}else r.stop();}
    if(recorder&&recorder.state!=='inactive'){if(discard){recorder.ondataavailable=null;recorder.onstop=null;}recorder.stop();}recorder=null;
    if(stream)stream.getTracks().forEach(t=>t.stop());stream=null;recording=false;
    $('transcript').readOnly=false;$('mic').setAttribute('aria-pressed','false');$('mic').setAttribute('aria-label','Start microphone');$('mic-label').textContent='TAP TO SPEAK';
  }
  function cancelWork(){version++;stopMedia(true);}
  function clearSession(){cancelWork();releaseAudio();takes=0;seed='';finalWords='';$('done').hidden=false;$('transcript').value='';$('own-line').value='';$('noticed').value='';$('who').value='';for(const id of ['final','session-sheet-line','session-sheet-meta','session-sheet-note'])$(id).textContent='';showMode();status('Session cleared.');}
  function showMode(){
    root.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
    $('heading').textContent=modes[mode][0];$('intro').textContent=modes[mode][1];$('take').textContent=`TAKE ${String(takes+1).padStart(2,'0')}`;
    hide('prompt-card');$('prompt').textContent='Give me a prompt';hide('who-wrap',mode!=='person');hide('prompt',mode!=='universe');hide('work',false);hide('finish');hide('result');hide('choices');hide('session-sheet');hide('download');hide('transcript-wrap',!$('transcript').value&&(canRecord||canTranscribe));if(!canRecord&&!canTranscribe)$('mic-label').textContent='TYPE YOUR WORDS BELOW';count();
  }
  async function mic(){
    if(recording){stopMedia();status('Take stopped. Listen back or choose what happens next.');return;}
    if(starting)return;
    if($('done').hidden)another();
    const token=++version;starting=true;
    const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!navigator.mediaDevices?.getUserMedia){starting=false;hide('transcript-wrap',false);status('Microphone recording is unavailable here. Type your words, or use keyboard dictation.');$('transcript').focus();return;}
    if(!$('playback').checked&&!$('transcribe').checked){starting=false;status('Choose playback or transcription to use the mic.');return;}
    if(!($('playback').checked&&window.MediaRecorder)&&!($('transcribe').checked&&Recognition)){starting=false;hide('transcript-wrap',false);status('Your browser does not support the selected recording option. Type here or use keyboard dictation.');$('transcript').focus();return;}
    status('Waiting for microphone permission…');
    try{
      const s=await navigator.mediaDevices.getUserMedia({audio:true});
      if(token!==version){s.getTracks().forEach(t=>t.stop());return;}
      stream=s;releaseAudio();recording=true;starting=false;$('mic').setAttribute('aria-pressed','true');$('mic').setAttribute('aria-label','Stop microphone');$('mic-label').textContent='ON AIR · TAP TO STOP';
      if($('playback').checked&&window.MediaRecorder){
        const chunks=[];const rec=new MediaRecorder(stream);recorder=rec;
        rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
        rec.onstop=()=>{if(token!==version)return;audioURL=URL.createObjectURL(new Blob(chunks,{type:rec.mimeType||'audio/webm'}));$('audio').src=audioURL;playbackReady=true;hide('audio',false);hide('hear-note',false);};rec.start();
      }
      if($('transcribe').checked&&Recognition){
        hide('transcript-wrap',false);const r=new Recognition();recognition=r;r.continuous=true;r.interimResults=true;r.lang=document.documentElement.lang||'en-US';seed=$('transcript').value.trim();finalWords='';$('transcript').readOnly=true;
        r.onresult=e=>{if(token!==version)return;let interim='';for(let i=e.resultIndex;i<e.results.length;i++){if(e.results[i].isFinal)finalWords+=e.results[i][0].transcript+' ';else interim+=e.results[i][0].transcript;}$('transcript').value=[seed,finalWords,interim].filter(Boolean).join(' ').slice(0,6000);count();};
        r.onerror=e=>{if(token!==version)return;status(e.error==='not-allowed'?'Speech permission was denied. You can type your words.':'Transcription stopped. You can edit or type your words.');stopMedia();};
        r.onend=()=>{if(token!==version)return;recognition=null;if(recording){stopMedia();status('The browser ended this take. Your words are editable; tap the mic to continue.');}};r.start();
      }else if($('transcribe').checked){hide('transcript-wrap',false);status('This browser does not support transcription. You can listen back or type instead.');}
      if(!$('transcribe').checked||Recognition)status('Recording. You have up to 3 minutes; tap the mic to stop.');
      timer=setTimeout(()=>{stopMedia();status('Three-minute take complete. Keep this one or start another.');},180000);
    }catch(e){if(token!==version)return;stopMedia(true);hide('transcript-wrap',false);status('The mic could not start. Check browser permission, or type your words here.');$('transcript').focus();}
  }
  function done(){
    if(recording||starting){status('Stop the mic first.');return;}
    if(!$('transcript').value.trim()&&!playbackReady){hide('transcript-wrap',false);status('Speak or type something first.');$('transcript').focus();return;}
    takes++;$('own-line').value='';hide('result');$('done').hidden=true;hide('choices',false);
    buttons('choice-buttons',[
      ['That’s the one.',()=>finish(true)],
      ['Edit my words',editWords],
      ['Say it again',another],
      ['I just needed to say it.',()=>finish(false)]
    ]);status('Listen back, edit your words, or leave it here.');
  }
  function editWords(){
    $('own-line').value=$('transcript').value;hide('result',false);$('own-line').focus();
    status($('transcript').value?'Change anything you want.':'Type the words you want to keep.');
  }
  function another(){
    cancelWork();releaseAudio();$('done').hidden=false;hide('finish');hide('work',false);hide('choices');hide('result');
    $('transcript').value='';count();hide('transcript-wrap');$('take').textContent=`TAKE ${String(takes+1).padStart(2,'0')}`;status('Fresh take. Say it your way.');$('mic').focus();
  }
  function finish(celebrate){
    stopMedia();hide('work');hide('finish',false);const line=$('own-line').value.trim()||$('transcript').value.trim();$('final').textContent=line;
    $('finish-heading').textContent=celebrate?'THAT’S THE FUCKING ONE.':'YOU SAID IT.';
    $('finish-copy').textContent=mode==='person'?'Now the actual person still needs the information.':mode==='universe'?'YOU DON’T HAVE TO FIGURE OUT THE WHOLE FUCKING THING RIGHT NOW.':'It can stay right here. You don’t have to turn it into anything.';
    $('copy').hidden=!line;$('finish').focus();
  }
  function sessionSheet(){ $('session-sheet-line').textContent=$('final').textContent;$('session-sheet-meta').textContent=`INFORMED TO: ${mode==='person'?'PERSON':mode==='universe'?'UNIVERSE':'OPEN MIC'} · TAKES: ${takes} · ${new Date().toLocaleDateString()}`;$('session-sheet-note').textContent=$('noticed').value;hide('session-sheet',false);hide('download',false); }
  $('mic').addEventListener('click',mic);$('clear').addEventListener('click',clearSession);$('done').addEventListener('click',done);$('type').addEventListener('click',()=>{hide('transcript-wrap',false);$('transcript').focus();});$('transcript').addEventListener('input',count);
  $('prompt').addEventListener('click',()=>{promptIndex=(promptIndex+1)%prompts.length;$('prompt-text').textContent=prompts[promptIndex];hide('prompt-card',false);$('prompt').textContent='Give me another prompt';$('prompt-card').focus({preventScroll:true});$('prompt-card').scrollIntoView({block:'center',behavior:'instant'});});
  root.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{if(mode===b.dataset.mode)return;mode=b.dataset.mode;clearSession();$('done').hidden=false;status('New mode. Fresh take.');}));
  $('again').addEventListener('click',another);$('practice').addEventListener('click',another);$('new').addEventListener('click',()=>{clearSession();$('done').hidden=false;});$('keep').addEventListener('click',()=>{if(!$('own-line').value.trim()){status('Add the words you want to keep.');return;}finish(true);});
  $('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('final').textContent);$('copy').textContent='COPIED';setTimeout(()=>$('copy').textContent='COPY IT',1800);}catch{status('Copy is unavailable. Select the sentence and copy it manually.');$('final').setAttribute('tabindex','0');$('final').focus();}});
  $('session-sheet-button').addEventListener('click',sessionSheet);$('download').addEventListener('click',()=>{sessionSheet();const url=URL.createObjectURL(new Blob([$('session-sheet').innerText],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='informing-transcript.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&(recording||starting)){if(starting)version++;stopMedia();status('Microphone stopped because you left this tab.');}});
  const canRecord=Boolean(navigator.mediaDevices?.getUserMedia&&window.MediaRecorder);
  const canTranscribe=Boolean(navigator.mediaDevices?.getUserMedia&&(window.SpeechRecognition||window.webkitSpeechRecognition));
  $('playback').checked=canRecord;$('playback').closest('label').hidden=!canRecord;
  $('transcribe').closest('label').hidden=!canTranscribe;
  if(!canRecord&&!canTranscribe){hide('mic');$('mic-label').textContent='TYPE YOUR WORDS BELOW';}
  window.addEventListener('pagehide',clearSession);showMode();
  if(!canRecord&&!canTranscribe)hide('transcript-wrap',false);
})();
