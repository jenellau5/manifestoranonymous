import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

const token = randomBytes(32).toString('hex');
const code = randomBytes(8).toString('hex');
const port = 3187;
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next','start','-p',String(port)], {
  env: {...process.env, ACCESS_CODE:code,SESSION_TOKEN:token}, stdio:'ignore'
});
const base=`http://127.0.0.1:${port}`;
const post=(path,body,cookie)=>fetch(base+path,{method:'POST',headers:{'Content-Type':'application/json',...(cookie?{Cookie:cookie}:{})},body:JSON.stringify(body)});
try {
  let ready=false;
  for(let i=0;i<100;i++) {
    try { if((await fetch(base)).ok){ready=true;break;} } catch {}
    await new Promise(r=>setTimeout(r,200));
  }
  assert.ok(ready,'Production server must start');
  assert.equal((await post('/api/unlock',{code:'incorrect'})).status,401);
  assert.equal((await post('/api/unlock',{code:123})).status,400);
  const payload={song:'Migration test',evidence:'struggle for purpose, fight for what matters',feelings:['Defiant'],center:'Root Center',circuit:'Individual'};
  assert.equal((await post('/api/code-song',payload)).status,401);
  assert.equal((await post('/api/code-song',payload,'ma_gate_access=forged')).status,401);
  const login=await post('/api/unlock',{code});
  assert.equal(login.status,200);
  const cookie=login.headers.get('set-cookie');
  assert.match(cookie,/HttpOnly/i); assert.match(cookie,/Secure/i); assert.match(cookie,/SameSite=strict/i);
  const session=cookie.split(';')[0];
  const result=await post('/api/code-song',payload,session);
  assert.equal(result.status,200);
  const {results}=await result.json();
  assert.equal(results.length,3);
  assert.equal(new Set(results.map(r=>r.number)).size,3);
  assert.equal(results[0].number,38);
  assert.ok(results.every(r=>r.reason && r.listen && r.compare));
  assert.equal((await post('/api/code-song',{song:'Missing evidence'},session)).status,400);
  const html=await (await fetch(base)).text();
  assert.ok(!html.includes(token) && !html.includes(code),'Secrets must not appear in HTML');
  console.log('PASS: access control, cookie flags, three-gate results, input validation and secret isolation.');
} finally { server.kill(); await once(server,'exit'); }
