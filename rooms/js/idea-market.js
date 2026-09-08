(() => {
  'use strict';
  const root=document.getElementById('market-room');if(!root)return;
  const KEY='ma_idea_market_v1',BACKUP=KEY+'_before_receipts';
  const statuses=['MOVING','WATCHING','PARKED','RELEASED'];
  const types=['IDEA','URGE','INITIATION',"I DON'T FUCKING KNOW"];
  const observations=['ENERGY GOT STRONGER','ENERGY DISAPPEARED','I KEEP THINKING ABOUT IT','SOMETHING OPENED UP','I ALREADY STARTED IT','LITERALLY NOTHING'];
  let items=[],snapshot=null,filter='ALL',selected=null,opener=null,blocked=false;
  const $=id=>root.querySelector('#im-'+id);
  const node=(tag,text,cls)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;};
  const button=(text,fn)=>{const b=node('button',text);b.type='button';b.addEventListener('click',fn);return b;};
  const date=value=>value===null||value===undefined?null:Number.isFinite(new Date(value).getTime())?new Date(value).getTime():null;
  const format=value=>value===null?'Date not recorded':new Date(value).toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'});
  function days(start,end=Date.now()){
    if(start===null)return null;const a=new Date(start),b=new Date(end);
    return Math.max(0,Math.round((Date.UTC(b.getFullYear(),b.getMonth(),b.getDate())-Date.UTC(a.getFullYear(),a.getMonth(),a.getDate()))/86400000));
  }
  const age=i=>{const n=days(i.createdAt);return n===null?'Original date not recorded':n===0?'Dropped today':`Dropped ${n} day${n===1?'':'s'} ago`;};
  function normalize(raw){
    if(!Array.isArray(raw))throw Error('Invalid inventory');
    const ids=new Set();
    return raw.map((i,n)=>{
      if(!i||typeof i!=='object'||typeof i.text!=='string')throw Error('Invalid item');
      const createdAt=date(i.createdAt??i.created);
      let id=typeof i.id==='string'?i.id:`legacy-${createdAt??'unknown'}-${n}`;if(ids.has(id))id+=`-${n}`;ids.add(id);
      const initial=String(i.initialType??i.type??'unknown').toUpperCase();
      const initialType=types.includes(initial)?initial:types[3];
      const oldStatus=String(i.status??'ACTIVE').toUpperCase();
      const status=statuses.includes(oldStatus)?oldStatus:oldStatus==='ARCHIVED'?'PARKED':'WATCHING';
      const checkIns=Array.isArray(i.checkIns)?i.checkIns.map(c=>{
        if(!c||typeof c.observation!=='string'||date(c.timestamp)===null)throw Error('Invalid history');
        return {...c,timestamp:date(c.timestamp),resultingStatus:statuses.includes(String(c.resultingStatus).toUpperCase())?String(c.resultingStatus).toUpperCase():null};
      }):[];
      return {...i,id,createdAt,initialType,status,statusUpdatedAt:date(i.statusUpdatedAt),releasedAt:date(i.releasedAt??i.released),initiatedAt:date(i.initiatedAt),checkIns,statusChanges:Array.isArray(i.statusChanges)?i.statusChanges:[],schemaVersion:2};
    });
  }
  root.innerHTML=`
    <div class="im-grid">
      <section class="im-entry"><span class="im-kicker">DROP SOMETHING OFF</span><h2>WHAT JUST SHOWED UP?</h2><p class="im-muted">Dump it here. Don’t make it make sense.</p>
        <form id="im-entry-form"><label for="im-text" class="im-note">Your idea, urge, or whatever this is</label><textarea id="im-text" maxlength="12000" required placeholder="The thing that won’t leave your head…"></textarea>
          <fieldset><legend>WHAT DOES IT FEEL LIKE RIGHT NOW?</legend><div class="im-types" id="im-types"></div></fieldset>
          <p class="im-note">That’s what it feels like right now. You don’t have to be right.</p>
          <button class="im-primary" type="submit" id="im-add">PUT IT ON THE BOARD</button>
        </form>
      </section>
      <section class="im-inventory"><div class="im-head"><div><span class="im-kicker">YOUR INVENTORY</span><h2>Let it sit. See what happens.</h2></div><button type="button" id="im-print">Print inventory</button></div>
        <div id="im-return" class="im-return" hidden></div><div class="im-filters" id="im-filters" aria-label="Filter inventory"></div><div class="im-cards" id="im-active"></div><p id="im-empty" class="im-muted"></p>
      </section>
    </div>
    <p id="im-message" role="status" aria-live="polite"></p><p class="im-note">Saved on this browser. No account. No database.</p>
    <section class="im-stats"><span class="im-kicker">YOUR MARKET</span><p id="im-total"></p><div class="im-counts" id="im-counts"></div><p id="im-pattern" class="im-note" hidden></p></section>
    <section class="im-universe"><span class="im-kicker">UNIVERSE MARKET</span><h2>Released does not have to mean erased.</h2><p class="im-muted">You don’t have to build it just because you thought of it. Put it down. Let it belong to the universe again.</p><div id="im-released" class="im-cards"></div></section>
    <dialog class="im-dialog" id="im-detail" aria-labelledby="im-detail-title"><button type="button" class="im-close" id="im-close-detail">Close</button><span class="im-kicker" id="im-detail-status"></span><h2 id="im-detail-title">WHAT HAPPENED WITH THIS?</h2><p id="im-detail-text" class="im-detail-text"></p><p id="im-detail-meta" class="im-note"></p><p id="im-authority" class="im-authority" hidden></p>
      <div id="im-checkin"><p class="im-note">Choose one.</p><div id="im-observations" class="im-observations"></div></div>
      <section id="im-next" hidden><p id="im-chosen" class="im-note"></p><h3>WHAT DO YOU WANT TO DO WITH IT NOW?</h3><div class="im-actions" id="im-status-actions"></div></section>
      <button class="im-primary" id="im-takeback" type="button" hidden>TAKE IT BACK</button>
      <p id="im-detail-message" role="status" aria-live="polite"></p><details><summary>Your history</summary><ol id="im-history" class="im-history"></ol></details>
    </dialog>
    <dialog class="im-dialog" id="im-receipt-dialog" aria-labelledby="im-receipt-title"><article class="im-receipt" id="im-receipt"></article><button class="im-receipt-close" id="im-close-receipt" type="button">Back to the market</button></dialog>`;
  types.forEach((t,n)=>{const label=node('label');const input=document.createElement('input');input.type='radio';input.name='im-type';input.value=t;input.required=true;input.id=`im-type-${n}`;label.append(input,node('span',t));$('types').append(label);});
  for(const f of ['ALL',...statuses.slice(0,3)]){const b=button(f,()=>{filter=f;render();});b.dataset.filter=f;$('filters').append(b);}
  function message(text){$('message').textContent=text;}
  function load(){
    try{snapshot=localStorage.getItem(KEY);items=normalize(snapshot?JSON.parse(snapshot):[]);blocked=false;}
    catch{blocked=true;message('Your saved ideas could not be opened. Nothing has been changed.');}
    $('add').disabled=blocked;
  }
  function save(next){
    if(blocked)return false;
    try{
      if(localStorage.getItem(KEY)!==snapshot){load();render();$('detail-message').textContent='Your market changed in another tab. Close this item and open it again.';message('Your market changed in another tab. Your latest ideas are shown.');return false;}
      // Keep an exact recovery copy before the first write of legacy data.
      if(snapshot&&JSON.parse(snapshot).some(i=>i.schemaVersion!==2)&&localStorage.getItem(BACKUP)===null)localStorage.setItem(BACKUP,snapshot);
      const serialized=JSON.stringify(next);localStorage.setItem(KEY,serialized);snapshot=serialized;items=next;render();return true;
    }catch{message('This browser could not save that change. Your saved inventory has not been replaced.');$('detail-message').textContent='Could not save. Try again when browser storage is available.';return false;}
  }
  function card(i){
    const el=node('article',undefined,'im-card');el.dataset.status=i.status;
    el.append(node('span',i.status,'im-status'),node('p',i.text),node('div',`CAME IN AS ${i.initialType}`,'im-card-meta'),node('div',`${format(i.createdAt)} · ${age(i)}`,'im-card-meta'));
    const b=button(i.status==='RELEASED'?'Open released idea':'What happened with this?',()=>openItem(i.id,b));el.append(b);return el;
  }
  function render(){
    $('active').replaceChildren();$('released').replaceChildren();
    const active=items.filter(i=>i.status!=='RELEASED'),released=items.filter(i=>i.status==='RELEASED');
    active.forEach(i=>{const el=card(i);el.hidden=filter!=='ALL'&&i.status!==filter;$('active').append(el);});
    released.forEach(i=>$('released').append(card(i)));
    if(!released.length)$('released').append(node('p','Nothing released yet.','im-muted'));
    $('empty').textContent=active.some(i=>filter==='ALL'||i.status===filter)?'':active.length?'Nothing in this part of the market.':'Nothing here yet. Drop something off.';
    $('filters').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));
    $('total').textContent=`${items.length} thing${items.length===1?' has':'s have'} landed here.`;
    $('counts').replaceChildren(...statuses.map(s=>{const el=node('span',s);el.prepend(node('strong',String(items.filter(i=>i.status===s).length)));return el;}));
    const movedUnknown=items.filter(i=>i.initialType===types[3]&&(i.statusChanges.some(c=>c.to==='MOVING')||i.checkIns.some(c=>c.resultingStatus==='MOVING'))).length;
    $('pattern').hidden=movedUnknown<5;$('pattern').textContent=movedUnknown>=5?`${movedUnknown} things you moved on originally came in as “I DON’T FUCKING KNOW.”`:'';
    const watching=active.filter(i=>i.status==='WATCHING'&&days(i.createdAt)>=1).sort((a,b)=>a.createdAt-b.createdAt)[0];
    $('return').hidden=!watching;$('return').replaceChildren();
    if(watching){$('return').append(node('span','STILL ALIVE?','im-kicker'),node('p',watching.text),node('p',`This has been sitting here for ${days(watching.createdAt)} days.`,'im-note'));const b=button('Check on it',()=>openItem(watching.id,b));$('return').append(b);}
  }
  function authority(){
    try{const a=JSON.parse(localStorage.getItem('ma_manifestor_setup_v1')||'{}').authority||'';return /emotional/i.test(a)?'You’ve had some time with this now. How does it feel compared with when it first hit?':/splenic/i.test(a)?'What was the immediate body hit before your brain started working on it?':/ego/i.test(a)?'Do you actually want this? Say your answer out loud.':'';}catch{return '';}
  }
  function openItem(id,from){
    selected=id;opener=from;showItem();if(!$('detail').open)$('detail').showModal();
  }
  function showItem(){
    const i=items.find(i=>i.id===selected);if(!i)return;
    $('detail-status').textContent=i.status;$('detail-text').textContent=i.text;$('detail-meta').textContent=`Came in as ${i.initialType} · ${format(i.createdAt)} · ${age(i)}`;
    const prompt=authority();$('authority').textContent=prompt;$('authority').hidden=!prompt||i.status==='RELEASED';
    const pending=i.checkIns.at(-1)?.resultingStatus===null?i.checkIns.at(-1):null;
    $('detail-title').textContent=i.status==='RELEASED'?'THIS ALIVE AGAIN?':'WHAT HAPPENED WITH THIS?';
    $('checkin').hidden=i.status==='RELEASED'||Boolean(pending);$('next').hidden=i.status==='RELEASED'||!pending;$('takeback').hidden=i.status!=='RELEASED';
    $('chosen').textContent=pending?`You noticed: ${pending.observation}`:'';$('detail-message').textContent='';
    $('history').replaceChildren();
    const entries=[{timestamp:i.createdAt,text:`Landed as ${i.initialType}.`},...i.checkIns.map(c=>({timestamp:c.timestamp,text:`${c.observation} · ${c.resultingStatus||'Status not changed yet'}`})),...i.statusChanges.filter(c=>!c.checkInTimestamp).map(c=>({timestamp:c.timestamp,text:`${c.from} → ${c.to}`}))];
    entries.sort((a,b)=>(a.timestamp??0)-(b.timestamp??0)).forEach(e=>$('history').append(node('li',`${format(date(e.timestamp))}${date(e.timestamp)!==null?' · '+new Date(e.timestamp).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'}):''} — ${e.text}`)));
  }
  function checkIn(observation){
    const i=items.find(i=>i.id===selected);if(!i||i.status==='RELEASED'||i.checkIns.at(-1)?.resultingStatus===null)return;
    const now=Date.now();const updated={...i,checkIns:[...i.checkIns,{timestamp:now,observation,resultingStatus:null}],initiatedAt:observation==='I ALREADY STARTED IT'?(i.initiatedAt??now):i.initiatedAt};
    if(save(items.map(x=>x.id===selected?updated:x)))showItem();
  }
  function changeStatus(to,takeback=false){
    const i=items.find(i=>i.id===selected);if(!i)return;
    const pending=i.checkIns.at(-1)?.resultingStatus===null;
    if(takeback?i.status!=='RELEASED':!pending||i.status==='RELEASED')return;
    const now=Date.now();const updated={...i,status:to,statusUpdatedAt:now,releasedAt:to==='RELEASED'?now:i.releasedAt,
      checkIns:i.checkIns.map((c,n)=>!takeback&&n===i.checkIns.length-1?{...c,resultingStatus:to}:c),
      statusChanges:[...i.statusChanges,{timestamp:now,from:i.status,to,checkInTimestamp:takeback?null:i.checkIns.at(-1).timestamp}]};
    if(!save(items.map(x=>x.id===selected?updated:x)))return;
    $('detail').close();if(to==='RELEASED')receipt(updated,true);else message(takeback?'Back in Watching. Your history is still here.':`Now ${to.toLowerCase()}.`);
  }
  function receipt(i,release=false){
    const r=$('receipt');r.replaceChildren();
    const title=node('h2',release?'RETURN RECEIPT':'IDEA MARKET');title.id='im-receipt-title';r.append(title,node('small',release?'IDEA MARKET · MANIFESTOR PLAYGROUND':'MANIFESTOR PLAYGROUND'),node('hr'));
    const field=(label,value,cls)=>r.append(node('small',label),node('strong',value,cls));
    field('ITEM',i.text);
    if(release){const n=days(i.createdAt,i.releasedAt);field('HELD FOR',n===null?'Original date not recorded':`${n} DAY${n===1?'':'S'}`);field('FINAL STATUS','RELEASED');r.append(node('hr'));field('REFUND','YOUR FUCKING ENERGY','im-refund');r.append(node('hr'),node('p','Returned to the universe.'),node('p','You are no longer responsible for doing anything with this.'));}
    else{field('CAME IN AS',i.initialType);field('STATUS','WATCHING');field('DATE DROPPED',format(i.createdAt));r.append(node('hr'));field('AMOUNT DUE','$0.00');field('OBLIGATION TO ACT','NONE');r.append(node('hr'),node('p','Having the idea does not mean you have to do the idea.'),node('strong','KEEP THE RECEIPT. SEE WHAT HAPPENS.'));}
    $('receipt-dialog').showModal();
  }
  observations.forEach(o=>$('observations').append(button(o,()=>checkIn(o))));
  ['MOVE IT','KEEP WATCHING','PARK IT','RELEASE IT'].forEach((label,n)=>$('status-actions').append(button(label,()=>changeStatus(statuses[n]))));
  $('takeback').addEventListener('click',()=>changeStatus('WATCHING',true));
  $('entry-form').addEventListener('submit',e=>{
    e.preventDefault();const text=$('text').value.trim(),type=root.querySelector('input[name="im-type"]:checked')?.value;
    if(!text){$('text').focus();return;}if(!type)return;
    const now=Date.now(),i={id:crypto.randomUUID(),text,createdAt:now,initialType:type,type,status:'WATCHING',statusUpdatedAt:now,releasedAt:null,initiatedAt:null,checkIns:[],statusChanges:[],schemaVersion:2};
    if(save([i,...items])){$('entry-form').reset();message('On the board. No obligation to act.');receipt(i);}
  });
  $('close-detail').addEventListener('click',()=>$('detail').close());
  $('detail').addEventListener('close',()=>{if(opener?.isConnected)opener.focus();else $('filters').querySelector('button')?.focus();});
  $('close-receipt').addEventListener('click',()=>$('receipt-dialog').close());
  $('receipt-dialog').addEventListener('close',()=>$('text').focus());
  $('print').addEventListener('click',()=>window.print());
  window.addEventListener('storage',e=>{if(e.key===KEY){load();render();if($('detail').open){$('detail').close();message('Your market changed in another tab. Open the item again to check on it.');}}});
  load();render();
})();
