import { NextResponse } from "next/server";

export async function POST(request:Request){
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ok:false},{status:400}); }
  const code = body && typeof body === "object" && "code" in body ? body.code : undefined;
  if (typeof code !== "string") return NextResponse.json({ok:false},{status:400});
  const runtime=process.env;
  if (!runtime.ACCESS_CODE || !runtime.SESSION_TOKEN || runtime.SESSION_TOKEN.length < 32) return NextResponse.json({ok:false},{status:503});
  if(!runtime.ACCESS_CODE||code?.trim().toUpperCase()!==runtime.ACCESS_CODE.trim().toUpperCase())return NextResponse.json({ok:false},{status:401});
  const response=NextResponse.json({ok:true});
  response.cookies.set("ma_gate_access",runtime.SESSION_TOKEN,{httpOnly:true,secure:true,sameSite:"strict",maxAge:60*60*24*30,path:"/"});
  return response;
}
