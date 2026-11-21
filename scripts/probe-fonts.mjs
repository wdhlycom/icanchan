// 用 CDP 读浏览器**实际渲染**用到的平台字体（CSS.getPlatformFontsForNode），
// 用来核对 CSS 字体栈与真实显示是否一致。
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9334;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const url = process.argv[2];
const selectors = JSON.parse(process.argv[3] || '[]');

const proc = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${path.join(os.tmpdir(), 'icanchan-font-probe')}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
);

let wsUrl;
for (let i = 0; i < 60; i++) {
  try {
    const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    const list = await res.json();
    const page = list.find((t) => t.type === 'page');
    wsUrl = page?.webSocketDebuggerUrl;
    if (wsUrl) break;
  } catch {
    await sleep(200);
  }
}
if (!wsUrl) {
  console.error('Chrome 没起来');
  proc.kill();
  process.exit(1);
}

const ws = new WebSocket(wsUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const i = ++id;
    pending.set(i, resolve);
    ws.send(JSON.stringify({ id: i, method, params }));
  });

await send('Page.enable');
await send('Runtime.enable');
await send('DOM.enable');
await send('CSS.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: 1200,
  height: 2000,
  deviceScaleFactor: 1,
});
await send('Page.navigate', { url });
await sleep(3000);

for (const sel of selectors) {
  const r = await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.querySelector(${JSON.stringify(sel)});
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        text: (el.textContent || '').trim().slice(0, 24),
        declared: cs.fontFamily,
        weight: cs.fontWeight,
        size: cs.fontSize,
      };
    })()`,
    returnByValue: true,
  });
  const val = r.result?.result?.value;
  if (!val) {
    console.log(`${sel}  → 没找到元素`);
    continue;
  }

  // 拿节点 id 再问平台字体
  const nodeRes = await send('DOM.getDocument', { depth: -1 });
  const { root } = nodeRes.result;
  const q = await send('DOM.querySelector', { nodeId: root.nodeId, selector: sel });
  let fonts = [];
  if (q.result?.nodeId) {
    const f = await send('CSS.getPlatformFontsForNode', { nodeId: q.result.nodeId });
    fonts = (f.result?.fonts || []).map((x) => `${x.familyName}(${x.glyphCount})`);
  }
  console.log(`\n选择器 ${sel}`);
  console.log(`  实际文字 : ${val.text}`);
  console.log(`  CSS 栈   : ${val.declared}`);
  console.log(`  字重/字号: ${val.weight} / ${val.size}`);
  console.log(`  实际渲染 : ${fonts.join(', ') || '（读不到）'}`);
}

ws.close();
proc.kill();
