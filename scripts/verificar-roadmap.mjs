import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:900}, reducedMotion:'no-preference' })).newPage();
p.on('console', m => { if (m.type()==='error') console.log('ERR', m.text().slice(0,120)); });
await p.goto('http://localhost:3000', { waitUntil:'networkidle' });
await p.waitForTimeout(1500);
const total = await p.evaluate(() => document.body.scrollHeight);
// acha onde o roadmap fixa
const top = await p.evaluate(() => {
  const s = document.querySelector('#metodo');
  return s ? Math.round(s.getBoundingClientRect().top + scrollY) : -1;
});
console.log('total', total, 'roadmapTop', top);
for (const frac of [0.15, 0.45, 0.80, 0.98]) {
  await p.evaluate(y => scrollTo(0, y), Math.round(top + 2880 * frac)); // pin = +=320% de 900px
  await p.waitForTimeout(900);
  const st = await p.evaluate(() => {
    const road = document.querySelector('[data-road]');
    const apt = document.querySelector('[data-marca-apt]');
    const nos = [...document.querySelectorAll('[data-no]')].map(n => +getComputedStyle(n).opacity.slice(0,4));
    return { roadDash: road?.getAttribute('stroke-dasharray')?.slice(0,22),
             aptOp: apt ? +getComputedStyle(apt).opacity.slice(0,4) : null, nos };
  });
  console.log(frac, JSON.stringify(st));
  await p.screenshot({ path: `./shots/rm-${frac}.png` });
}
await b.close();
