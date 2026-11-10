/**
 * 本地预览服务器：刻意模仿 Vercel 的行为——
 * /zh 这种不带斜杠的地址会 308 跳转到 /zh/，跟上线后一致。
 * 只服务 dist/ 里的静态文件，不含任何构建逻辑。
 */
import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const PORT = Number(process.env.PORT || 4321);
const HOST = '127.0.0.1';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pf_fragment': 'application/octet-stream',
  '.pf_index': 'application/octet-stream',
  '.pf_meta': 'application/octet-stream',
};

if (!fs.existsSync(root)) {
  console.error('找不到 dist/，先跑 npm run build。');
  process.exit(1);
}

const send = async (req, res, file, status = 200, extra = {}) => {
  const stat = await fsp.stat(file);
  res.writeHead(status, {
    'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
    'Content-Length': stat.size,
    'Cache-Control': 'no-cache',
    ...extra,
  });
  if (req.method === 'HEAD') return res.end();
  fs.createReadStream(file).pipe(res);
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${HOST}`);
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400).end('Bad request');
    return;
  }
  // 防止 ../ 跳出 dist
  const target = path.join(root, pathname);
  if (target !== root && !target.startsWith(root + path.sep)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  const stat = await fsp.stat(target).catch(() => null);

  if (stat?.isDirectory()) {
    if (!pathname.endsWith('/')) {
      // 就是这一步：跟 Vercel 一样 308 补斜杠，不返回 404
      res.writeHead(308, { Location: `${pathname}/${url.search}` }).end();
      return;
    }
    const index = path.join(target, 'index.html');
    const ok = await fsp.stat(index).catch(() => null);
    if (ok?.isFile()) return send(req, res, index);
  } else if (stat?.isFile()) {
    return send(req, res, target);
  } else {
    const withHtml = `${target}.html`;
    const ok = await fsp.stat(withHtml).catch(() => null);
    if (ok?.isFile()) return send(req, res, withHtml);
  }

  const notFound = path.join(root, '404.html');
  const has404 = await fsp.stat(notFound).catch(() => null);
  if (has404?.isFile()) {
    res.writeHead(404, { 'Content-Type': MIME['.html'] });
    if (req.method === 'HEAD') return res.end();
    return fs.createReadStream(notFound).pipe(res);
  }
  res.writeHead(404).end('Not found');
});

server.listen(PORT, HOST, () => {
  console.log(`预览：http://${HOST}:${PORT}/  （尾斜杠行为与 Vercel 一致）`);
});
