// 用 Chrome 调试协议截图：可切换明暗、可切宽窄，用来核对实际渲染。
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9333;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const shots = JSON.parse(process.argv[2] || '[]');

const proc = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:/Users/Holive Hu/AppData/Local/Temp/icanchan-chrome',
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

for (const shot of shots) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: shot.w,
    height: shot.h,
    deviceScaleFactor: shot.scale || 1,
    mobile: !!shot.mobile,
  });
  await send('Page.navigate', { url: shot.url });
  await sleep(2000);
  if (shot.js) {
    await send('Runtime.evaluate', { expression: shot.js });
    await sleep(500);
  }
  const res = await send('Page.captureScreenshot', { format: 'png' });
  if (res.result?.data) {
    fs.writeFileSync(shot.out, Buffer.from(res.result.data, 'base64'));
    console.log('ok', shot.out);
  } else {
    console.log('fail', shot.url, JSON.stringify(res).slice(0, 200));
  }
}

ws.close();
proc.kill();
