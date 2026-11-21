/* 本地可视化编辑的启动器：只在 TINA_DEV=1 时给 Astro 挂上 Tina，正常构建不受影响。 */
import { spawn, execSync } from 'node:child_process';
import net from 'node:net';
import fs from 'node:fs';

/* 项目路径里有空格（C:\Users\Holive Hu\...）。Tina 会把带空格的路径
   误判成查询语句，后台脚本里几个内部模块也解析不了，页面就白屏。
   Windows 自带一套不带空格的短路径，用它启动即可，文件还是同一份。 */
function shortPath(longPath) {
  try {
    const out = execSync(`for %I in ("${longPath}") do @echo %~sI`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    const candidate = out
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .pop();
    if (
      candidate &&
      /^[A-Za-z]:\\/.test(candidate) &&
      !/\s/.test(candidate) &&
      fs.existsSync(candidate)
    ) {
      return candidate;
    }
  } catch {
    // 取不到就走下面的兜底
  }
  return null;
}

const short = shortPath(process.cwd());
/* 兜底仍是相对路径；短路径可用时用它，Tina 的内部模块才能正常解析。 */
const rootArg = short ?? '.';
console.log(`[tina] 启动目录：${short ?? '(相对路径兜底)'}`);

/* Tina 的后台脚本服务只开在 IPv6 的 ::1:4001，浏览器常把 localhost 当 IPv4，
   于是后台报 "Failed loading TinaCMS assets"。这里在同一端口补一条 IPv4 通道，
   把请求原样送过去（HTTP 和实时更新的长连接都能过）。 */
const forwarder = net.createServer((client) => {
  const upstream = net.connect(4001, '::1');
  client.pipe(upstream);
  upstream.pipe(client);
  client.on('error', () => upstream.destroy());
  upstream.on('error', () => client.destroy());
});
forwarder.on('error', (err) => {
  console.warn('[tina] IPv4 通道没开起来：', err.code);
});
forwarder.listen(4001, '127.0.0.1');

const env = { ...process.env, TINA_DEV: '1' };
const command = `npx tinacms dev --rootPath "${rootArg}" -c "npx astro dev --host 127.0.0.1 --port 4321"`;

const child = spawn(command, {
  stdio: 'inherit',
  shell: true,
  env,
});

child.on('exit', (code) => {
  forwarder.close();
  process.exit(code ?? 0);
});
