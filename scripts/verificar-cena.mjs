import { chromium } from 'playwright';
const b = await chromium.launch();
// reducedMotion 'no-preference' é o ponto: sem isso a cena não fixa e o
// verificador estaria olhando para o estado de acessibilidade, não o real.
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
const p = await ctx.newPage();
await p.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
const info = await p.evaluate(() => ({
  total: document.body.scrollHeight,
  pinSpacer: !!document.querySelector('.pin-spacer'),
  triggers: (window).ScrollTrigger ? 'global' : 'scoped',
}));
console.log('INFO', JSON.stringify(info));
const marks = [0.43, 0.46];
for (const m of marks) {
  await p.evaluate(y => window.scrollTo(0, y), Math.round(info.total * m));
  await p.waitForTimeout(900);
  const fase = await p.evaluate(() => {
    const vis = [...document.querySelectorAll('.fase')].map(e => +getComputedStyle(e).opacity.slice(0,4));
    const d0 = document.querySelector('[data-desk]');
    return { fases: vis, deskTransform: d0 ? d0.getAttribute('transform') : null,
             gridOpacity: +getComputedStyle(document.querySelector('[data-grid]')).opacity.slice(0,4) };
  });
  console.log(m, JSON.stringify(fase));
  await p.screenshot({ path: `./shots/pw-${String(m).replace('.','_')}.png` });
}
await b.close();
