import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:900}, reducedMotion:'no-preference' })).newPage();
p.on('console', m => { if (m.type()==='error') console.log('ERR', m.text().slice(0,120)); });
await p.goto('http://localhost:3000', { waitUntil:'networkidle' });
// plano 01
await p.waitForTimeout(2200);
console.log('t=2.2s', JSON.stringify(await p.evaluate(() => {
  const vs=[...document.querySelectorAll('video')];
  return { n:vs.length, op:vs.map(v=>+getComputedStyle(v).opacity.slice(0,4)),
           playing:vs.map(v=>!v.paused), t:vs.map(v=>+v.currentTime.toFixed(1)) };
})));
await p.screenshot({ path:'./shots/topo-01.png' });
// depois do corte para o plano 02
await p.waitForTimeout(6200);
console.log('t=8.4s', JSON.stringify(await p.evaluate(() => {
  const vs=[...document.querySelectorAll('video')];
  return { op:vs.map(v=>+getComputedStyle(v).opacity.slice(0,4)), playing:vs.map(v=>!v.paused) };
})));
await p.screenshot({ path:'./shots/topo-02.png' });
await b.close();
