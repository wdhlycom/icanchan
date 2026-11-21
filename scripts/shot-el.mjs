// 用法：node scripts/shot-el.mjs <url> <要截的元素的文字片段> <输出> [width] [scale]
// 打开页面，找到包含指定文字的元素，滚动到它，然后截它周围一小块。
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9334;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const [url, needle, out, w = '1000', scale = '2'] = process.argv.slice(2);

const proc = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  '--no-first-run', '--no-default-browser-check',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${path.join(os.tmpdir(), 'icanchan-chrome-el')}`,
  'about:blank',
], { stdio: 'ignore' });

let wsUrl;
for (let i = 0; i < 60; i++) {
  try {
    const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    const list = await res.json();
    const page = list.find((t) => t.type === 'page');
    wsUrl = page?.webSocketDebuggerUrl;
    if (wsUrl) break;
  } catch { await sleep(200); }
}
if (!wsUrl) { console.error('Chrome 没起来'); proc.kill(); process.exit(1); }

const ws = new WebSocket(wsUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
};
const send = (method, params = {}) => new Promise((resolve) => {
  const i = ++id;
  pending.set(i, resolve);
  ws.send(JSON.stringify({ id: i, method, params }));
});

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: Number(w), height: 900, deviceScaleFactor: Number(scale), mobile: false,
});
await send('Page.navigate', { url });
await sleep(2200);
await send('Runtime.evaluate', {
  expression: `localStorage.setItem('theme','light');document.documentElement.setAttribute('data-theme','light');`,
});
await sleep(400);

const found = await send('Runtime.evaluate', {
  expression: `(() => {
    const el = [...document.querySelectorAll('.prose p, .prose li, .prose blockquote, .prose h2, .prose h3')]
      .find(e => e.textContent.includes(${JSON.stringify(needle)}));
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height, text: el.textContent.slice(0, 80) };
  })()`,
  returnByValue: true,
});

const info = found.result?.result?.value;
if (!info) { console.error('没找到元素：', needle); proc.kill(); process.exit(1); }
console.log('命中：', info.text);

await send('Runtime.evaluate', {
  expression: `window.scrollTo(0, ${Math.max(0, info.top - 160)})`,
});
await sleep(600);

const res = await send('Page.captureScreenshot', { format: 'png' });
if (res.result?.data) {
  fs.writeFileSync(out, Buffer.from(res.result.data, 'base64'));
  console.log('ok', out);
}
ws.close();
proc.kill();
