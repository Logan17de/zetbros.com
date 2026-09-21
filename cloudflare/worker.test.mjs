import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './worker.mjs';
const payload={name:'Migration verification',email:'migration-check@example.invalid',service:'An idea',message:'This is a synthetic migration verification message.'};
function request(data=payload,origin='https://zetbros.com') {return new Request('https://zetbros.com/api/contact',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(data)});}
function environment({allowed=true,fail=false}={}) {
 const state={writes:[]};
 return {state,CONTACT_RATE_LIMIT:{limit:async()=>({success:allowed})},DB:{prepare(sql){assert.match(sql,/INSERT INTO zetbros_contact_messages/);return {bind(...values){return {async run(){if(fail)throw new Error('offline');state.writes.push(values);}};}};}},ASSETS:{fetch:async()=>new Response('asset')}};
}
test('valid message writes only validated fields with server-owned status and source',async()=>{const env=environment();const response=await worker.fetch(request({...payload,status:'admin',source:'evil'}),env);assert.equal(response.status,201);assert.equal(env.state.writes.length,1);assert.equal(env.state.writes[0][6],'zetbros.com');});
test('cross-origin and invalid submissions never write',async()=>{for(const req of [request(payload,'https://other.example'),request({...payload,email:'invalid'}),request({...payload,message:'short'}),request({...payload,name:{a:1}})]) {const env=environment();assert.ok((await worker.fetch(req,env)).status>=400);assert.equal(env.state.writes.length,0);}});
test('rate limit and storage failure are reported without a false success',async()=>{assert.equal((await worker.fetch(request(),environment({allowed:false}))).status,429);assert.equal((await worker.fetch(request(),environment({fail:true}))).status,503);});
test('oversize body and honeypot do not reach storage',async()=>{const env=environment();assert.equal((await worker.fetch(request({...payload,message:'a'.repeat(33000)}),env)).status,413);assert.equal((await worker.fetch(request({...payload,website:'bot'}),env)).status,200);assert.equal(env.state.writes.length,0);});
test('API is write-only and website pages use assets',async()=>{const env=environment();assert.equal((await worker.fetch(new Request('https://zetbros.com/api/contact'),env)).status,405);assert.equal(await (await worker.fetch(new Request('https://zetbros.com/harness'),env)).text(),'asset');});
