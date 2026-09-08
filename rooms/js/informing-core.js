(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.InformingCore=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const words=t=>String(t).trim().split(/\s+/).filter(Boolean).length;
  const shared=t=>/(?:agreement|consent|joint|shared (?:money|decision|account)|our savings|co-sign|both (?:agree|decide)|need.{0,45}permission before)/i.test(t);
  function fallback(text,mode){
    const source=text.trim();
    // An offline aid quotes the user verbatim; it never pretends to understand intent.
    const sentences=source.match(/[^.!?]+[.!?]*/g)||[source];
    const candidate=sentences.find(s=>/\bI(?:'ve|’ve) decided\b/i.test(s))||sentences.find(s=>/\bI (?:want|need|am|don't|can’t|can't)\b/i.test(s))||source;
    const joint=mode==='person'&&shared(source);
    return {core:candidate.trim(),suggestion:'',question:joint?'What needs agreement before either of you moves?':'',requiresAgreement:joint,
      observation:joint?'This sounds like a shared decision. Clear communication still needs room for the other person’s agreement.':'The AI mirror is off. Here is a line from your words; you decide whether it is the point.',
      themes:[],source:'local'};
  }
  function validate(data){
    if(!data||typeof data.core!=='string'||!data.core.trim()||data.core.length>6000)throw Error('Invalid mirror');
    for(const key of ['observation','suggestion','question'])if(typeof data[key]!=='string'||data[key].length>1500)throw Error('Invalid mirror');
    if(typeof data.requiresAgreement!=='boolean'||!Array.isArray(data.themes)||data.themes.length>2||data.themes.some(t=>typeof t!=='string'||t.length>300))throw Error('Invalid mirror');
    return data;
  }
  return {words,shared,fallback,validate};
});
