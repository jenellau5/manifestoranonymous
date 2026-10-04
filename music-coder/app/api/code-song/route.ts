import { NextRequest,NextResponse } from "next/server";
import { gates } from "../../../lib/gates";

const stop=new Set("the a an and or but if to of in on at with for from by it its is are was were be been being this that these those i me my we our you your they their them he she his her as into through about what how when where who which not no so than then very just song lyric lyrics music feel feeling felt makes made like sounds sound overall moment artist".split(" "));
const tokenize=(value:string)=>value.toLowerCase().replace(/[^a-z0-9\s-]/g," ").split(/\s+/).filter(w=>w.length>2&&!stop.has(w));

export async function POST(request:NextRequest){
  const runtime=process.env;
  if(!runtime.SESSION_TOKEN||request.cookies.get("ma_gate_access")?.value!==runtime.SESSION_TOKEN)return NextResponse.json({error:"Unauthorized"},{status:401});
  let input: unknown;
  try { input = await request.json(); } catch { return NextResponse.json({error:"Invalid request"},{status:400}); }
  if (!input || typeof input !== "object") return NextResponse.json({error:"Invalid request"},{status:400});
  const data = input as Record<string,unknown>;
  if (typeof data.song !== "string" || !data.song.trim() || typeof data.evidence !== "string" || !data.evidence.trim()
    || !Array.isArray(data.feelings) || !data.feelings.every(f=>typeof f === "string")
    || [data.artist,data.ownWords,data.center,data.circuit].some(v=>v !== undefined && typeof v !== "string"))
    return NextResponse.json({error:"Check your song and listening notes"},{status:400});
  const body=data as {song:string;artist?:string;evidence:string;feelings:string[];ownWords?:string;center?:string;circuit?:string};
  const query=tokenize([body.evidence,...(body.feelings||[]),body.ownWords||""].join(" "));
  const ranked=gates.map(g=>{const corpus=tokenize([g.name,...g.keywords,g.core,g.listen].join(" "));const counts=new Map<string,number>();corpus.forEach(w=>counts.set(w,(counts.get(w)||0)+1));const matched=query.filter((w,i)=>query.indexOf(w)===i&&counts.has(w));let score=matched.reduce((n,w)=>n+Math.min(counts.get(w)||0,3),0);if(body.center&&g.center.toLowerCase().includes(body.center.toLowerCase().replace(" center","")))score+=18;if(body.circuit&&g.circuit===body.circuit)score+=12;return{g,score,matched}}).sort((a,b)=>b.score-a.score||a.g.number-b.g.number).slice(0,3);
  const results=ranked.map((item,index)=>({number:item.g.number,name:item.g.name,center:item.g.center,circuit:item.g.circuit,reason:item.matched.length?`Your words overlap with this gate through ${item.matched.slice(0,5).join(", ")}. ${body.center?`You also located the song in the ${item.g.center}`:"The language of the song points toward this center"}${body.circuit?` and identified a ${item.g.circuit.toLowerCase()} pattern.`:"."}`:`${index===0?"This is the closest":"This is another"} match based on the center and circuit pattern you selected. Use the musical clues below to test it against what you actually heard.`,listen:item.g.listen,compare:index===0?"Does the song consistently carry this frequency, or did one line make you choose it? Compare the complete track against the next two possibilities.":`Choose this gate over Gate ${ranked[0].g.number} only if its musical clues describe more of the entire song, not just one lyric.`,keywords:item.g.keywords}));
  return NextResponse.json({results});
}
