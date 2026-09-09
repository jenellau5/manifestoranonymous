(() => {
'use strict';
const STATES={body:'MY BODY IS DEAD',brain:'MY BRAIN WON’T SHUT THE FUCK UP',sensory:'EVERYTHING IS TOO MUCH',irritated:'I’M IRRITATED BY EVERYONE',nothing:'I DON’T WANT TO DO ANYTHING',pushing:'I STILL HAVE ENERGY BUT I KNOW I’M PUSHING IT',finished:'I JUST FINISHED SOMETHING BIG',people:'I’VE BEEN AROUND PEOPLE TOO FUCKING LONG',emotional:'I FEEL EMOTIONALLY FULL',restless:'I WANT TO DO EVERYTHING AND NOTHING',fried:'I CAN FEEL MYSELF GETTING FRIED',unknown:'I DON’T EVEN KNOW. JUST TELL ME WHAT TO DO.'};
const TIMES=[2,10,30,120];
// Rows contain distinct actions. Time filters exclude actions that need a longer window.
const rows=[
['bed','GO THE FUCK TO BED','body pushing fried',120,'sleep','Put the phone down. Turn the lights off. Get your ass in bed. Not another episode. Not “one quick thing.” Bed.','The day is allowed to end before you run yourself into the ground.','sleep',true],
['horizontal','HORIZONTAL. NOW.','body fried nothing unknown finished',2,'physical','Lie down somewhere comfortable. Let the surface carry your weight. Stay there without adding an assignment.','You do not have to fall asleep for this to count.','quiet'],
['feet-up','THE FEET ARE OFF DUTY','body finished pushing',10,'physical','Sit back and rest your feet on a cushion or footstool. Leave your shoes and your next job out of this.','Standing by is still standing. You can stop.','quiet'],
['blanket','THE BLANKET PRESCRIPTION','body emotional sensory nothing unknown',2,'comfort','Get under a light blanket if it feels good. Settle into its familiar texture. Nothing else needs improving.','Comfort does not need a justification.','feel'],
['chair','LET THE CHAIR DO IT','body fried nothing unknown',2,'micro','Sit all the way back in a supportive chair. Rest your arms. Let yourself actually use the furniture.','You do not have to hold everything up.','quiet'],
['clothes','TAKE OFF THE WORK DAY','body people sensory finished',10,'comfort','Change out of whatever is digging in, pinching or keeping you in work mode. Put on the easiest clothes you own.','Nobody gets a performance review from your sweatpants.','quiet'],
['bra','TAKE OFF THE BRA','body sensory irritated',2,'comfort','If you are wearing something restrictive, loosen it or take it off somewhere private. Let your body have some room.','You can get comfortable before you get useful.','quiet'],
['pillow','BUILD ONE SOFT LANDING','body emotional fried unknown',10,'physical','Put a pillow where you need support. Settle your body around it instead of holding an awkward position. Stay.','This is not a posture project.','quiet'],
['lights','LIGHTS DOWN','sensory fried brain emotional unknown',2,'sensory','Switch off one harsh light or move away from it. Leave enough light to move safely. Let the softer room be enough.','You do not need a whole spa renovation.','quiet'],
['silence','NO MORE INPUT','sensory brain fried people unknown',2,'input','Pause whatever is playing. Put the screen face down. Spend this window without taking in another voice or headline.','Do not replace the podcast with a lesson about resting.','quiet'],
['earspace','TURN DOWN THE ROOM','sensory people irritated fried',2,'sensory','Lower the volume of the sound you can control. If you need to hear children, traffic or an alert, keep that audible.','Less noise is a complete plan.','quiet'],
['blank-wall','A BORING VIEW','brain sensory restless unknown',2,'sensory','Turn your chair toward a plain wall or a quiet corner. Give your eyes a view with nothing to read.','You do not need to find it beautiful.','quiet'],
['window','WINDOW. NO MISSION.','brain sensory emotional nothing',2,'outside','Look out of a window. Let one cloud, leaf or patch of sky hold your attention loosely. You do not need to name anything.','Looking is not researching.','quiet'],
['scent','RETIRE THE SCENT PARADE','sensory fried irritated',2,'sensory','Step away from strong fragrance, cooking smells or scented products if you can. Find a neutral patch of air.','You do not need a candle to rest.','quiet'],
['screen-dim','LESS SCREEN IN YOUR FACE','brain sensory fried pushing',2,'digital','Lower your screen brightness to a comfortable level, then lock the screen. Leave it alone for this window.','The screen does not get the final word.','quiet'],
['one-room','ONE ROOM. NO DEMANDS.','people irritated sensory fried unknown',10,'solitude','Move to a room where nobody needs anything from you. Close the door if that is available. Sit without doing the room’s chores.','You can be alone without making it mean anything.','space'],
['unavailable','NO ONE FUCKING TALK TO ME','people irritated pushing fried',2,'communication','Tell anyone who needs to know: “I’m taking a quiet break. I’ll be back later.” Then take the break.','Being clear is enough. You do not need a defense speech.','space'],
['messages','STOP ANSWERING PEOPLE','people irritated brain pushing',10,'communication','Leave nonurgent messages unopened for this window. Keep any essential contact route available. You are not holding office hours.','A notification is not an appointment.','space'],
['delegate','LET SOMEONE ELSE HANDLE IT','people pushing finished irritated',10,'social','If someone has already offered help, let them handle one nonessential thing. Do not hover or redo it during your break.','Help is allowed to remain help.','space'],
['optional','CANCEL THE OPTIONAL SHIT','people body fried pushing',10,'decision','Choose one genuinely optional plan to skip. Let anyone affected know. Use the space you just got back to stop.','Optional means it can actually be optional.','space'],
['audience','LEAVE THE AUDIENCE','people emotional finished irritated',2,'social','Step out of the group chat or conversation for a moment. You do not need to be funny, responsive or interesting on this break.','You have performed enough social presence.','space'],
['bathroom','THE PRIVATE TWO MINUTES','people sensory emotional unknown',2,'solitude','Take a private pause in a safe room with a door. Wash your hands slowly if you want. Stay off the phone.','Privacy is not a dramatic announcement.','quiet'],
['car','YOU HAVE NOT ARRIVED YET','people finished sensory',10,'transition','If you have a safely parked car in a comfortable temperature, sit for a minute before going inside. Engine off; no errands added. Otherwise use a quiet seat indoors.','Arriving somewhere does not mean immediately becoming available.','space'],
['phone-exile','PHONE EXILE','brain pushing restless fried',10,'digital','Put the phone somewhere you cannot reach from your resting spot. Keep urgent needs covered, then stop negotiating with the screen.','The phone can survive being in another room.','quiet'],
['laptop','CLOSE THE LAPTOP','pushing finished brain fried unknown',2,'digital','Save what is open. Close the laptop lid. Move your hands away from the work surface and let the break begin.','You do not need to clear the inbox first.','quiet'],
['tabs','NO MORE TABS','brain pushing restless',2,'mental','Stop opening tabs. Leave one short bookmark or note if needed, then close the browser. The investigation is paused.','You do not need another answer before resting.','brain'],
['idea-note','THE IDEA CAN WAIT','brain restless pushing finished',2,'mental','Write a single sentence naming the idea on paper. Put the paper down. No outline, launch plan or second page.','Having it does not mean starting it tonight.','brain'],
['parking-thought','NOT SOLVING THAT HERE','brain emotional restless unknown',2,'mental','When the same question shows up, answer it once with “Not solving that on this break.” Let the question stay unfinished.','No argument with your own brain is required.','brain'],
['decisions','STOP MAKING DECISIONS','brain fried pushing nothing',10,'decision','Put off nonurgent choices until after this rest window. Keep what is already comfortable instead of optimizing it.','You do not need the best possible way to sit down.','quiet'],
['comparison','CLOSE THE COMPARISON WINDOW','brain emotional pushing',10,'digital','Close the feed or page that has you measuring your life against someone else’s. Spend the break without checking how they are doing.','Their output is not your assignment.','feel'],
['no-learning','NO PODCAST. NO BOOK. NO LEARNING.','brain fried pushing sensory',10,'input','Set aside the educational content. Leave the headphones off. Give this window to something that does not ask you to understand it.','You are not behind on becoming a better person.','quiet'],
['boring','GO BE BORING','nothing restless brain unknown',10,'nothing','Sit with no entertainment selected. If you get bored, let that happen for a little while. You can stop the experiment whenever you want.','Boredom does not need an emergency replacement.','quiet'],
['nothing','ABSOLUTELY FUCKING NOTHING','nothing body emotional unknown fried',2,'nothing','Put down what is in your hands. Stay where you are if it is comfortable and safe. Let these minutes have no purpose.','Doing nothing is the entire thing.','quiet',true],
['not-cleaning','I SAID REST, NOT REORGANIZE','pushing restless finished',10,'decision','Leave the pile, drawer or shelf exactly as it is. Move yourself away from it and take a seat. You are not starting a tidy-up.','A sudden cleaning urge is not a binding contract.','quiet'],
['good-enough','STOP AT GOOD ENOUGH','pushing finished fried',2,'transition','Leave the nonessential polishing for another day. Save or set down what is already sufficient. Physically step away from it.','Enough does not need a final improvement.','quiet'],
['unfinished','YOU CAN LEAVE THAT UNFINISHED','pushing body fried unknown',2,'decision','Pause one nonurgent task at the next safe stopping point. Leave yourself a one-line place marker if needed. Then leave it.','A paused task is not a character flaw.','quiet'],
['second-wind','DO NOT USE YOUR SECOND WIND','pushing restless fried',10,'transition','When you feel the urge to start one more thing, stay stopped instead. Keep the next project closed for this whole window.','Having some energy left does not mean spending all of it.','buzz'],
['finish-line','THE POST-INITIATION COMEDOWN','finished body emotional',30,'post-initiation','Put away one object from the finished work. Change where you are sitting. Spend this window without reviewing the outcome or announcing the next thing.','Finishing can be followed by nothing.','feel',true],
['after-send','YOU HIT SEND. STEP AWAY.','finished brain pushing',2,'transition','Close the sent message or submitted work. Stop reopening it for this window. Move your attention to the room you are in.','The reply can arrive without you watching the door.','quiet'],
['end-day','LET THE DAY END','pushing finished body fried',30,'transition','Turn off the work light and put the work tools out of reach. Move into your evening without making an after-hours list.','Today has enough in it.','sleep'],
['shower','SHOWER AND DISAPPEAR','people finished sensory body',30,'environment','Take an ordinary comfortable shower. No audio, no planning. Dry off and sit somewhere easy afterward.','The shower does not have to wash your whole life into place.','quiet'],
['wash-face','WATER. THEN NOTHING.','fried sensory finished unknown',2,'micro','Wash your face with a comfortable water temperature. Pat it dry. Sit down instead of launching into a whole routine.','One small change is enough.','quiet'],
['change-rooms','CHANGE ROOMS','brain irritated restless fried',2,'environment','Leave the place where you have been pushing. Sit somewhere else, even if it is just the other side of a doorway.','A different room does not need a different task.','quiet'],
['outside','GO OUTSIDE WITHOUT A PURPOSE','brain restless people emotional',10,'outside','Step outside somewhere safe and comfortable. Stay near home if you want. No route, photo or errand is required.','You do not need to turn fresh air into content.','quiet'],
['walk','THE UNIMPORTANT WALK','restless irritated brain pushing',10,'movement','Take a slow, short walk somewhere safe. No step target. Turn back whenever you want. Let it be smaller than exercise.','The walk does not have to count toward anything.','buzz'],
['hands','GIVE YOUR HANDS A DIFFERENT JOB','restless brain irritated',2,'movement','Unfold and refold a soft cloth slowly, or turn a smooth familiar object in your hands. Stop before it becomes a task.','You can move without getting something done.','quiet'],
['shoulders','LOWER THE WORKDAY','body pushing irritated fried',2,'movement','Let your shoulders settle. Move them in one small comfortable circle if that feels okay. Let your arms hang or rest afterward.','No stretching target. No forcing.','buzz'],
['bare-feet','LET YOUR FEET ARRIVE','body restless people',2,'physical','If comfortable, take your shoes off and rest your feet on a familiar safe surface. Notice the change, then stop inspecting it.','You are allowed to arrive in your own body without a lesson.','quiet'],
['familiar-show','COMFORT SHOW. ZERO GUILT.','emotional body nothing',30,'comfort','Put on something familiar that does not ask much of you. Choose one episode, not a search for the perfect thing. Rest while it plays.','Enjoyment does not need an educational angle.','feel'],
['warm-cup','HOLD SOMETHING WARM','emotional body nothing unknown',10,'comfort','Make a drink you already know you like, at a comfortable temperature. Sit with it away from your work. No multitasking required.','The cup is enough company for a few minutes.','feel'],
['meal-pause','SIT DOWN WITH IT','body pushing fried',10,'comfort','If you already have a snack or meal ready, sit to eat it without a screen. If not, sit with a drink instead. No cooking project.','You do not have to eat standing over your next task.','quiet'],
['cry-room','YOU CAN FEEL IT WITHOUT EXPLAINING','emotional people fried',10,'emotional','Find a little privacy. Let tears come if they come; do not try to make them happen. You can also just sit.','You do not owe anyone a summary of what this is about.','feel'],
['not-process','YOU DON’T NEED TO PROCESS THIS','emotional brain nothing unknown',2,'emotional','Set aside the journal, analysis or conversation for now. Name nothing. Sit with whatever is here without trying to unpack it.','A feeling does not need to become homework.','feel'],
['hand-heart','A HAND, NOT AN ANSWER','emotional body nothing',2,'comfort','Rest a hand somewhere comfortable—your arm, lap or chest. Leave it there without trying to change how you feel.','You do not have to feel better on command.','feel'],
['no-story','NO POSTGAME ANALYSIS','people emotional finished brain',10,'mental','Pause the replay of what you said by stepping away from messages or recordings of it. Do one ordinary quiet thing, like sitting by the window.','You do not have to grade your performance today.','feel'],
['disappear','THE LONG DISAPPEAR','people pushing fried body',120,'long-rest','Cover anything essential, tell affected people you are unavailable, and leave the next few hours unbooked. No hidden catch-up session.','The empty time belongs to you too.','space',true],
['nap-window','YOU DO NOT HAVE TO SLEEP','body fried nothing finished',30,'sleep','Lie somewhere you can rest undisturbed. Close your eyes if comfortable. Set an alarm only if you need one. Let sleep be optional.','Rest is not a test you fail by staying awake.','sleep'],
['curtain','CLOSE THE CURTAIN','sensory body fried',2,'environment','Soften the daylight with a curtain or move out of glare. Settle in the gentler light without changing anything else.','One less sharp thing is enough.','quiet'],
['off-duty','TAKE YOURSELF OFF DUTY','people pushing irritated',30,'social','Arrange a short handover for anything that truly needs supervision. Step away from managing everything else for this window.','You can be responsible without being constantly available.','space'],
['no-photo','THIS DOES NOT NEED TO BECOME CONTENT','finished brain pushing emotional',10,'digital','Enjoy one small thing without photographing, posting or explaining it. Put the phone away before you begin.','You can have an experience that never becomes evidence.','quiet'],
['bench','THE SITTING-OUT EXPERIMENT','restless people irritated',30,'outside','Find a comfortable outdoor seat in suitable weather. Let other people walk past without joining their pace.','You can be outside without being on your way somewhere.','quiet'],
['unplug-notes','NO NOTES FROM THE BREAK','brain pushing finished',10,'mental','Leave the notebook and voice memo app behind. Let any break-time thought pass without capturing it for later.','Rest does not need to produce material.','quiet'],
['slow-route','TAKE THE SHORTER DAY','body pushing fried',30,'decision','Remove one optional errand from today. Keep essential needs covered, then use the freed time to sit instead of replacing the errand.','A smaller day can still be a whole day.','quiet'],
['bedside','MAKE THE LANDING EASY','body pushing fried',10,'sleep','Put water and anything you normally need near your resting place. Then sit or lie there. Stop after making it usable, not perfect.','Preparing to rest should not become a house project.','sleep'],
['quiet-company','COMPANY WITHOUT CONVERSATION','emotional nothing people',30,'social','If you want company, ask someone comfortable to sit nearby without talking or fixing. If nobody is available, keep the quiet seat for yourself.','You can want closeness without wanting questions.','feel']
];
const PRESCRIPTIONS=rows.map(([id,title,states,min,category,directions,permissionSlip,audio,signature=false])=>({id,title,states:states.split(' '),timeOptions:TIMES.filter(t=>t>=min),category,instructions:[directions],permissionSlip,audio,weight:signature?.2:1,isSignaturePrescription:signature,energyLevel:['movement','outside'].includes(category)?'some':'low',sensoryCapacity:['sensory','input'].includes(category)?'low':'any',socialCapacity:['social','solitude','communication'].includes(category)?'low':'any',mentalCapacity:'low'}));
const REG_STATES={wired:'WIRED',pissed:'PISSED',fried:'FRIED',empty:'EMPTY',emotional:'EMOTIONAL',overstimulated:'OVERSTIMULATED',restless:'RESTLESS',unknown:'NO FUCKING CLUE'};
const regRows=[
['exhale','LET THE OUT-BREATH LINGER','breath','wired restless','Breathe normally. If comfortable, let the next out-breath last a little longer. Try three times; no breath-holding or forcing.'],
['feet','LET THE FLOOR HOLD YOU','pressure','wired pissed restless unknown','Rest both feet on the floor. Press down gently, then release. Repeat twice if comfortable.'],
['jaw','UNCLENCH THE MEETING','unclench','pissed wired fried','Let your teeth separate a little. Rest your tongue wherever comfortable. You do not need to open your mouth wide.'],
['hands','UNMAKE THE FISTS','unclench','pissed restless emotional','Open your hands slowly. Rest your palms on your legs or a table. Stop squeezing anything for a moment.'],
['shake','SHAKE OFF ONE MINUTE','shake','wired restless pissed','Gently shake your hands at your sides for a few seconds. Stop and let them rest. Keep it small.'],
['look','FIND THE DOOR','orient','wired overstimulated unknown','Look around slowly. Notice the door and one familiar object. You do not need to count or describe everything.'],
['color','ONE COLOR. THAT’S ALL.','orient','emotional wired restless','Let your eyes find one color in the room. Rest your gaze there briefly, without trying to feel differently.'],
['neck','LOOK A LITTLE LEFT','movement','wired restless','Turn your head a small comfortable distance to one side, then back. Skip it if your neck objects.'],
['quiet','PAUSE THE NOISE','sound-reduction','overstimulated fried pissed unknown','Pause one source of audio you control. Stay with the quieter room for a minute. Keep essential alerts audible.'],
['light','LESS GLARE','light','overstimulated fried empty','Move out of glare or turn down one light. Let your eyes settle in the softer space.'],
['outside','ONE STEP OUT','outside','pissed restless wired','Step outside or into an open doorway somewhere safe. Notice the air for a moment. No walk required.'],
['cool','COOL HANDS, SMALL PAUSE','temperature','wired pissed overstimulated','Run comfortable cool—not icy—water over your hands briefly. Dry them. Notice whether that felt okay.'],
['lie','GET SUPPORTED','support','empty fried emotional unknown','Lie down or lean back somewhere supported. Let the surface do a little more of the holding.'],
['sway','TINY SWAY','sway','restless emotional wired','If comfortable, sway gently while seated or standing with support. Stop after a few small movements.'],
['hum','ONE QUIET HUM','hum','wired emotional restless','Hum softly on one ordinary out-breath if you want. No big inhale. Stop if it feels awkward or unpleasant.'],
['eyes','REST YOUR GAZE','eyes','fried overstimulated empty','While safely seated, close your eyes briefly if comfortable, or soften your gaze toward the floor.'],
['room','LEAVE THIS PATCH OF AIR','environment','pissed fried restless','Move to a quieter spot nearby. Stand or sit there for a minute without doing the new room’s jobs.'],
['texture','SOMETHING FAMILIAR','touch','emotional empty unknown','Touch a familiar sleeve, cushion or smooth object. Notice its texture without making it a concentration test.'],
['palms','REST YOUR HANDS','support','empty fried unknown','Put your hands on a table or your lap. Let their weight land. There is nothing to grip right now.'],
['shoulders','LET THEM DROP','unclench','pissed wired fried','Let your shoulders settle without pushing them down. Rest your elbows on something if that helps.'],
['heel','SLOW HEEL LIFT','movement','restless wired','While seated, lift one heel a little and lower it slowly. Try the other side if comfortable.'],
['wall','A SMALL PUSH','pressure','pissed restless','If comfortable, place your palms against a wall and press gently for a few seconds. Release completely.'],
['volume','ONE LESS VOICE','sound-reduction','overstimulated fried emotional','Step away from a conversation or ask for a brief quiet pause. You do not have to explain the whole day.'],
['screen','EYES OFF THE FEED','input','wired overstimulated fried unknown','Lock the screen for a minute after reading this. Look somewhere that is not delivering information.'],
['sip','ONE UNHURRIED SIP','comfort','empty emotional fried','If you have a drink nearby, take one comfortable sip and put it down. No need to go make anything.'],
['weight','FEEL THE CHAIR','orient','empty emotional unknown','Notice where your body meets the chair or bed. You are simply noticing contact, not trying to change yourself.'],
['hands-warm','WARM YOUR PALMS','touch','empty emotional','Rub your hands gently once or twice, then let them rest together. Skip it if that sensation is unwelcome.'],
['pause','STOP TRYING THIS HARD','nothing','fried empty overstimulated unknown','Put the exercise down too. Sit comfortably for a minute. You are allowed to stop trying to get a result.']
];
const REGULATIONS=regRows.map(([id,title,category,states,directions])=>({id:'reg-'+id,title,category,states:states.split(' '),directions}));
// Replace url with a curated playlist later; no interface changes are needed.
const AUDIO=[
{id:'quiet',title:'NO ONE FUCKING TALK TO ME',terms:'Brown Noise Rain Sounds',url:''},
{id:'brain',title:'MY BRAIN WON’T SHUT UP',terms:'Yoga Nidra NSDR',url:''},
{id:'buzz',title:'I’M STILL BUZZING',terms:'Ambient Relaxation',url:''},
{id:'feel',title:'LET ME FEEL MY SHIT',terms:'Calming Instrumental',url:''},
{id:'sleep',title:'PUT ME TO FUCKING SLEEP',terms:'Deep Sleep Yoga Nidra',url:''},
{id:'space',title:'GET OUT OF MY ENERGY',terms:'Headphones Ambient Instrumental',url:''}
];

function pickRotating(pool,recent,random=Math.random){
  if(!pool.length)throw Error('No matching experiment');
  const fresh=pool.filter(p=>!recent.includes(p.id));
  if(!fresh.length)return [...pool].sort((a,b)=>recent.lastIndexOf(a.id)-recent.lastIndexOf(b.id))[0];
  const total=fresh.reduce((sum,p)=>sum+(p.weight||1),0);let roll=random()*total;
  return fresh.find(p=>(roll-=(p.weight||1))<0)||fresh.at(-1);
}
function restPool(state,time,hour=new Date().getHours()){
  return PRESCRIPTIONS.filter(p=>p.states.includes(state)&&p.timeOptions.includes(time)&&(p.id!=='bed'||state==='body'||hour>=20||hour<5));
}
function regulationPool(state,excludeCategory){return REGULATIONS.filter(p=>p.states.includes(state)&&p.category!==excludeCategory);}
const SpaEngine={STATES,TIMES,PRESCRIPTIONS,REG_STATES,REGULATIONS,AUDIO,restPool,regulationPool,pickRotating};
if(typeof module==='object'&&module.exports){module.exports=SpaEngine;return;}

const root=document.getElementById('rest-spa-tool');if(!root)return;
const KEY='ma_rest_spa_v2';let history={recent:[],regRecent:[],visits:[],enabled:false};
try{const h=JSON.parse(localStorage.getItem(KEY)||'null');if(h&&typeof h==='object')history={recent:Array.isArray(h.recent)?h.recent.filter(x=>typeof x==='string').slice(-25):[],regRecent:Array.isArray(h.regRecent)?h.regRecent.filter(x=>typeof x==='string').slice(-25):[],visits:Array.isArray(h.visits)?h.visits.filter(x=>x&&typeof x.state==='string'&&typeof x.timestamp==='number').slice(-100):[],enabled:h.enabled===true};}catch{}
let state='unknown',time=10,current=null,regState='unknown',currentReg=null,visitId=null,issued=null,chosenSound='Silence',quiet=false;
const $=id=>root.querySelector('#rs-'+id);
const el=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;};
function button(label,fn,cls){const b=el('button',label,cls);b.type='button';b.addEventListener('click',fn);return b;}
function link(label,url){const a=el('a',label,'rs-link');a.href=url;return a;}
root.innerHTML=`<div class="rs-toolbar"><button type="button" id="rs-back">← Back to Spa</button><span class="rs-small">THE REST SPA</span><button type="button" id="rs-reset">START OVER / CLEAR MY SHIT</button></div><section id="rs-main" tabindex="-1"></section><section id="rs-audio" hidden tabindex="-1"></section><p id="rs-status" role="status" aria-live="polite"></p><p class="rs-footer">Not medical advice. Just permission to stop.</p>`;
const main=$('main');
function status(t){$('status').textContent=t;}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(history));}catch{status('This works here, but this browser couldn’t save your history.');}}
function record(kind,data={}){
  if(!history.enabled)return;
  const selectedState=data.state??(kind==='regulation'?regState:state);
  const stateLabel=kind==='regulation'?REG_STATES[selectedState]:STATES[selectedState];
  if(!visitId){visitId=crypto.randomUUID();history.visits.push({id:visitId,timestamp:Date.now(),kind,state:selectedState,stateLabel,time:kind==='regulation'?null:time,sound:null,...data});}
  else history.visits=history.visits.map(v=>v.id===visitId?{...v,...data,...(data.state?{stateLabel}:{})}:v);
  history.visits=history.visits.slice(-100);persist();
}
function frame(title,{low=false,home=false}={}){
  quiet=low;root.classList.toggle('rs-quiet',low);document.body.classList.toggle('rs-engaged',!home);
  $('back').hidden=home||low;main.replaceChildren();$('audio').replaceChildren();$('audio').hidden=true;status('');
  main.append(el('h2',title));main.focus({preventScroll:true});if(!home)root.scrollIntoView({block:'start',behavior:'instant'});
}
function actions(container,entries){const box=el('div',undefined,'rs-actions');entries.forEach(([label,fn,cls])=>box.append(button(label,fn,cls)));container.append(box);return box;}
function choices(entries){const box=el('div',undefined,'rs-choices');entries.forEach(([label,fn])=>box.append(button(label,fn)));main.append(box);}
function home(){
  current=null;currentReg=null;visitId=null;frame('You look fucking done. What do you need?',{home:true});
  const doors=el('div',undefined,'rs-doors');
  [['REST EXPERIMENT','Prescribe my rest.','One thing. No figuring it out.',triage],['REGULATION','Regulate me.','Try one tiny experiment.',regulate],['LOWEST POSSIBLE BAR','I’m fucking done.','Almost nothing required.',doneMenu]].forEach(([label,title,copy,fn])=>{const b=button('',()=>{visitId=null;fn();},'rs-door');b.append(el('small',label),el('strong',title),el('span',copy));doors.append(b);});main.append(doors);
  const extras=el('div',undefined,'rs-extras');[['REST OR RESISTANCE?',()=>quiz('resistance')],['WHAT PHASE AM I IN?',()=>quiz('phase')],['CLOSE THE CYCLE',closeCycle],['MY REST PATTERN',patterns]].forEach(([label,fn])=>extras.append(button(label,fn)));main.append(extras);
}
function triage(){frame('WHAT KIND OF FUCKED ARE YOU?');choices(Object.entries(STATES).map(([id,label])=>[label,()=>{state=id;timeMenu();}]));}
function timeMenu(){frame('HOW MUCH TIME DO YOU HAVE?');choices(TIMES.map(t=>[t===120?'LEAVE ME ALONE FOR HOURS':`${t} MINUTES`,()=>{time=t;prescribe();}]));main.append(button('← Change how I feel',triage));}
function prescribe(forcedId){
  current=forcedId?PRESCRIPTIONS.find(p=>p.id===forcedId):pickRotating(restPool(state,time),history.recent);
  history.recent=[...history.recent.filter(id=>id!==current.id),current.id].slice(-25);persist();issued=new Date();chosenSound='Silence';
  record('rest',{state,time,prescription:current.id,category:current.category});renderPrescription();
}
function dosage(){if(current.id==='bed')return issued.getHours()>=20||issued.getHours()<5?'Until tomorrow.':'A nap or an early night. No clock to beat.';return time===120?'Take the next few hours off. Stop the activity when you want; let the rest of the window stay empty.':`${time} minutes to step away. Finish the small action, then rest. Longer if it feels good.`;}
function renderPrescription(){
  frame('Your rest prescription.');const pad=el('article',undefined,'rs-pad');pad.id='rs-pad';
  pad.append(el('span','MANIFESTOR ANONYMOUS','rs-pad-brand'),el('p','THE REST SPA · REST PRESCRIPTION','rs-small'),el('hr'),el('span','PRESCRIBED FOR','rs-label'),el('p','A Manifestor who is done for now.'),el('span','CURRENT STATE','rs-label'),el('p',STATES[state]||REG_STATES[state]||'Ready to stop.'),el('h3',`Rx: ${current.title}`,'rs-rx'));
  pad.append(el('span','DIRECTIONS','rs-label'));current.instructions.forEach(t=>pad.append(el('p',t,'rs-directions')));
  for(const [label,text] of [['DOSAGE',dosage()],['REFILLS',current.id==='bed'?'Nightly, as fucking needed.':'As many as you fucking need.'],['PERMISSION SLIP',current.permissionSlip],['OPTIONAL SOUND',chosenSound]]){pad.append(el('span',label,'rs-label'),el('p',text));if(label==='OPTIONAL SOUND')pad.lastChild.id='rs-pad-sound';}
  pad.append(el('hr'),el('p',`ISSUED ${issued.toLocaleDateString()}`,'rs-small'),el('p','Not medical advice. Just permission to stop.','rs-small'));main.append(pad);
  if(current.id==='bed')actions(main,[['FINE. I’M GOING.',accepted,'rs-primary'],['GIVE ME SOMETHING TO FALL ASLEEP TO',soundPrompt],['I REFUSE 😂',()=>{status('Of course you do.');if(!root.querySelector('[data-refuse]')){const row=actions(main,[['OKAY. GIVE ME THE 10-MINUTE VERSION.',()=>{time=10;prescribe('horizontal');}]]);row.dataset.refuse='true';} }]]);
  else actions(main,[['I’LL DO THIS',accepted,'rs-primary'],['GIVE ME ANOTHER',()=>prescribe()],['ADD SOUND',soundPrompt]]);
  actions(main,[['PRINT MY PRESCRIPTION',print],['SAVE AS PDF',()=>{status('Choose “Save as PDF” in the print window.');window.print();}],['BACK TO SPA',home]]);
  const contextual=state==='people'||state==='irritated'?['Need to tell people you’re unavailable?','informing-studio.html']:state==='brain'||state==='restless'?['Is an idea refusing to leave you alone?','idea-market.html']:null;
  if(contextual)main.append(link(contextual[0]+' →',contextual[1]));
}
function print(){window.print();}
function accepted(){frame('Enough for now.',{low:true});main.append(el('p',current.permissionSlip,'rs-large'));actions(main,[['GIVE ME SOUND',soundPrompt],['I WANT SILENCE',silence]]);main.append(link('LEAVE THE SPA','../playground.html'));}
function soundPrompt(){
  const box=$('audio');box.hidden=false;box.replaceChildren(el('h3','SOUND OR SILENCE?'),el('p','Sometimes rest needs sound. Sometimes it needs absolutely fucking nothing.'));
  actions(box,[['SILENCE PLEASE',silence],['GIVE ME SOMETHING TO LISTEN TO',audioBar]]);box.focus();
}
function silence(){chosenSound='Silence';if($('pad-sound'))$('pad-sound').textContent=chosenSound;record(currentReg?'regulation':'rest',{sound:'silence'});$('audio').hidden=true;$('audio').replaceChildren();status('Silence it is. Nothing else to do.');}
function audioBar(){
  const box=$('audio');box.hidden=false;box.replaceChildren(el('h3','REST SPA AUDIO BAR'));
  const ordered=[...AUDIO].sort((a,b)=>Number(b.id===current?.audio)-Number(a.id===current?.audio));
  ordered.forEach(a=>{const item=el('div',undefined,'rs-audio-item');item.append(el('strong',a.title));const l=link('FIND SOMETHING ON SPOTIFY ↗',a.url||`https://open.spotify.com/search/${encodeURIComponent(a.terms)}`);l.target='_blank';l.rel='noopener noreferrer';l.addEventListener('click',()=>{chosenSound=a.terms;if($('pad-sound'))$('pad-sound').textContent=chosenSound;record(currentReg?'regulation':'rest',{sound:'sound',audio:a.id});});item.append(l);box.append(item);});box.append(button('Silence instead',silence));box.focus();
}
function regulate(){current=null;currentReg=null;frame('WHAT’S YOUR SYSTEM DOING?');choices(Object.entries(REG_STATES).map(([id,label])=>[label,()=>{regState=id;regExperiment();}]));}
function regExperiment(exclude){
  currentReg=pickRotating(regulationPool(regState,exclude),history.regRecent);history.regRecent=[...history.regRecent.filter(id=>id!==currentReg.id),currentReg.id].slice(-25);persist();record('regulation',{state:regState,regulation:currentReg.id,category:currentReg.category});
  frame(currentReg.title);main.append(el('p',currentReg.directions,'rs-large'),el('p','Try it only if comfortable. Stop if it feels unpleasant.','rs-note'),el('h3','FEEL ANY DIFFERENT?'));
  actions(main,[['YES',()=>regFinish('That can be enough.')],['A LITTLE',()=>regFinish('A little is allowed to be enough.')],['NOPE',()=>regExperiment(currentReg.category)]]);
  actions(main,[['I WANT SOUND INSTEAD',soundPrompt],['Choose another state',regulate]]);
  if(regState==='pissed')main.append(link('Still energized? Want to look at the anger? → RAGE ROOM','rage-room.html'));
}
function regFinish(copy){frame(copy,{low:true});main.append(el('p','You do not have to keep going.','rs-large'));actions(main,[['GIVE ME SOUND',soundPrompt],['BACK TO SPA',home]]);main.append(link('LEAVE THE SPA','../playground.html'));}
function doneMenu(){current=null;currentReg=null;frame('OKAY.',{low:true});main.append(el('p','YOU DON’T NEED TO FIGURE OUT WHAT YOU NEED.','rs-large'));choices([
  ['PUT ME IN BED',()=>{state='body';time=120;prescribe('bed');}],['GET EVERYONE AWAY FROM ME',()=>lowResult('Find a little privacy. Let anyone affected know you’re taking a break. Close the door if you can.','people')],['MY BODY IS BUZZING',()=>lowResult('Sit somewhere supported. Let your hands rest. You do not have to use the energy.','restless')],['I CAN’T STOP THINKING',()=>lowResult('Put down the screen. Let the questions stay unanswered for now. Sit somewhere easy.','brain')],['I WANT TO CRY',()=>lowResult('Find a little privacy. Let tears come if they come. You do not need to explain them.','emotional')],['EVERYTHING IS TOO MUCH',()=>lowResult('Turn down one source of light or sound. Sit somewhere comfortable. Nothing new needs to come in.','sensory')],['I DON’T EVEN WANT TO PICK',()=>lowResult('Put the phone down. Lie somewhere comfortable. Close your eyes if you want. You do not need to sleep, process anything, or figure out what happens next. Come back later.','unknown')]
  ]);main.append(button('Back to Spa',home));}
function lowResult(copy,s){state=s;time=10;record('low',{state,time:null,category:'lowest-bar'});frame('Nothing else required.',{low:true});main.append(el('p',copy,'rs-large'));actions(main,[['GIVE ME SOUND',soundPrompt],['I WANT SILENCE',silence]]);main.append(link('LEAVE THE SPA','../playground.html'));}
function closeCycle(){
  frame('CLOSE THE CYCLE');main.append(el('p','Sometimes your body stopped but your brain is still carrying the thing.'));
  const form=el('form'),label=el('label','WHAT ARE YOU DONE CARRYING?');label.htmlFor='rs-cycle-text';const input=el('textarea');input.id='rs-cycle-text';input.maxLength=1500;input.required=true;
  const b=el('button','SAY IT IF YOU CAN','rs-primary');b.type='submit';form.append(label,input,b);form.addEventListener('submit',e=>{e.preventDefault();const text=input.value.trim();if(!text)return;frame('SAY IT IF YOU CAN:');main.append(el('p',`“I’m done carrying ${text}.”`,'rs-large'));input.value='';actions(main,[['I’M DONE.',()=>{frame('CLOSED.',{low:true});main.append(el('p','YOU DO NOT HAVE TO DO ANYTHING WITH THAT RIGHT NOW. GO REST.','rs-large'));actions(main,[['GO REST',doneMenu],['BACK TO SPA',home]]);}]]);});main.append(form,el('p','This text is not saved or sent anywhere.','rs-note'));
}
const QUIZZES={
 resistance:['Would you happily do something else right now?','Does everything feel exhausting, not just this?','Would being completely alone sound good?','Does your body feel tired?','If this obligation disappeared, would energy return?'],
 phase:['Have you recently finished a big push?','Do ordinary things feel like too much right now?','Are you continuing despite wanting to stop?','Is some curiosity or energy starting to return?','Would unplanned quiet time feel welcome?']
};
function quiz(kind){
  const answers=[];let index=0;
  function question(){frame(kind==='phase'?'WHAT PHASE AM I IN?':'REST OR RESISTANCE?');main.append(el('p',kind==='phase'?'A Human Design reflection, not a diagnosis.':'Do I need rest, or do I just really not want to do THAT?','rs-note'),el('p',`${index+1} / 5`,'rs-small'),el('h3',QUIZZES[kind][index]));choices(['Yes','No','Not sure'].map((label,n)=>[label,()=>{answers[index]=n;index++;if(index<5)question();else result();}]));if(index)main.append(button('← Previous question',()=>{index--;question();}));}
  function result(){
    let title,copy;
    if(kind==='phase'){
      if(answers[2]===0){title='YOU MIGHT BE PUSHING PAST YOUR STOP';copy='Try leaving one nonurgent thing for another day.';}
      else if(answers[1]===0||(answers[0]===0&&answers[4]===0)){title='DEEP RECOVERY / COME-DOWN?';copy='A small, supported pause might fit what you described.';}
      else if(answers[3]===0){title='ENERGY STARTING TO RETURN?';copy='You can notice the interest without turning it into a commitment.';}
      else{title='CREATING SPACE?';copy='Let a little time stay unassigned. You do not need to manufacture the next thing.';}
    }else{
      const rest=answers[1]===0||answers[3]===0,task=answers[0]===0||answers[4]===0;
      title=rest&&!task?'THIS LOOKS A LOT LIKE REST.':task&&!rest?'THIS MIGHT BE RESISTANCE TO THE THING, NOT TO LIFE.':'HONESTLY? COULD BE BOTH.';
      copy=task&&!rest?'Pause the nonurgent obligation briefly. Notice how it feels when you are not facing it.':'Take a small pause before deciding what any of this means.';
    }
    frame(title);main.append(el('p',copy,'rs-large'),el('p',kind==='phase'?'A Human Design reflection, not a diagnosis. Ongoing exhaustion, pain, sleep problems or distress should not be explained away as your design.':'A reflection to try on, not a verdict.','rs-note'));actions(main,[['TAKE A SMALL PAUSE',()=>{state='unknown';time=2;prescribe('chair');}],['BACK TO SPA',home]]);
  }question();
}
function patterns(){
  frame('MY REST PATTERN');main.append(el('p','Only visits you choose to save. No private writing.','rs-note'));
  const label=el('label',undefined,'rs-save');const input=el('input');input.type='checkbox';input.checked=history.enabled;input.addEventListener('change',()=>{history.enabled=input.checked;visitId=null;persist();});label.append(input,el('span','Save my Spa visits on this browser'));main.append(label);
  main.append(el('p',`${history.visits.length} saved visit${history.visits.length===1?'':'s'}. Keeping the latest 100.`));
  const most=key=>{const counts={};history.visits.forEach(v=>{if(v[key]!==null&&v[key]!==undefined)counts[v[key]]=(counts[v[key]]||0)+1;});const sorted=Object.entries(counts).sort((a,b)=>b[1]-a[1]);return sorted.length&&(sorted.length===1||sorted[0][1]>sorted[1][1])?sorted[0]:null;};
  if(history.visits.length>=3){const s=most('stateLabel');if(s)main.append(el('p',`Your most saved arrival: ${s[0]} (${s[1]} visits).`));const t=most('time');if(t)main.append(el('p',`Your most chosen rest window: ${Number(t[0])===120?'hours':t[0]+' minutes'}.`));const sound=history.visits.filter(v=>v.sound==='sound').length,sil=history.visits.filter(v=>v.sound==='silence').length;if(sound+sil)main.append(el('p',`You chose sound ${sound} times and silence ${sil} times.`));}
  main.append(button('CLEAR MY REST HISTORY',()=>{history={recent:[],regRecent:[],visits:[],enabled:history.enabled};visitId=null;let cleared=true;try{localStorage.removeItem(KEY);if(history.enabled)persist();}catch{cleared=false;}patterns();status(cleared?'Rest history cleared.':'Cleared for this visit. This browser could not remove the saved copy.');}));
}
$('back').addEventListener('click',home);
 $('reset').onclick=()=>{if(!confirm('Clear this Spa session and all saved rest history in this browser?'))return;history={recent:[],regRecent:[],visits:[],enabled:false};state='unknown';time=10;current=null;regState='unknown';currentReg=null;visitId=null;issued=null;chosenSound='Silence';let cleared=true;try{localStorage.removeItem(KEY);}catch{cleared=false;}home();status(cleared?'Session and saved rest history cleared.':'Session cleared; browser storage could not be erased. Use browser site-data settings.');};
window.addEventListener('pagehide',()=>{main.replaceChildren();$('audio').replaceChildren();});
window.addEventListener('pageshow',e=>{if(e.persisted)home();});
home();

})();
