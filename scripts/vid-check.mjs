import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900}, reducedMotion:'reduce' });
const p = await ctx.newPage();
p.on('console', m => { if (m.type()==='error') console.log('CONSOLE-ERR', m.text().slice(0,140)); });
await p.goto('http://localhost:3000', { waitUntil:'networkidle' });
await p.waitForTimeout(2500);
const info = await p.evaluate(() => {
  const v = document.querySelector('video');
  if (!v) return { video:false };
  return {
    video:true, src:v.currentSrc.split('/').pop(), paused:v.paused, muted:v.muted,
    hasMutedAttr:v.hasAttribute('muted'), readyState:v.readyState,
    currentTime:+v.currentTime.toFixed(2), duration:+(v.duration||0).toFixed(2),
    networkState:v.networkState, autoplayAttr:v.hasAttribute('autoplay'),
  };
});
console.log('VIDEO', JSON.stringify(info));
await b.close();
