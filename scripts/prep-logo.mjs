/**
 * 把扫描的书法 logo（白底黑墨）转成「纯墨色 + 透明背景」的 PNG。
 * alpha = 255 - 亮度，所以笔画的浓淡、飞白、毛边都保留，白底变透明。
 * 用法：node scripts/prep-logo.mjs <源图> <输出.png> [最长边]
 */
import fs from 'node:fs';
import zlib from 'node:zlib';
import jpeg from 'jpeg-js';

const [, , src, out, maxEdgeArg] = process.argv;
if (!src || !out) {
  console.error('用法: node scripts/prep-logo.mjs <源图> <输出.png> [最长边]');
  process.exit(1);
}
const maxEdge = Number(maxEdgeArg || 0);

const raw = jpeg.decode(fs.readFileSync(src), { useTArray: true });
const { width: W, height: H, data } = raw;

// 1) 亮度 → alpha；RGB 统一压成墨黑
const rgba = new Uint8Array(W * H * 4);
let minX = W;
let minY = H;
let maxX = -1;
let maxY = -1;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    // 240 以上算纸白；乘法把灰阶拉开，避免 JPEG 噪点变成一层薄雾
    let a = Math.round((240 - lum) * 1.12);
    a = Math.max(0, Math.min(255, a));
    rgba[i] = 0;
    rgba[i + 1] = 0;
    rgba[i + 2] = 0;
    rgba[i + 3] = a;
    if (a > 10) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

// 2) 裁掉四周空白，留一点呼吸
const pad = Math.round(Math.max(W, H) * 0.02);
const x0 = Math.max(0, minX - pad);
const y0 = Math.max(0, minY - pad);
const x1 = Math.min(W - 1, maxX + pad);
const y1 = Math.min(H - 1, maxY + pad);
const cw = x1 - x0 + 1;
const ch = y1 - y0 + 1;

const crop = new Uint8Array(cw * ch * 4);
for (let y = 0; y < ch; y++) {
  const from = ((y + y0) * W + x0) * 4;
  crop.set(rgba.subarray(from, from + cw * 4), y * cw * 4);
}

// 3) 需要的话缩放（面积平均，避免毛边锯齿）
let outW = cw;
let outH = ch;
let pixels = crop;
if (maxEdge && Math.max(cw, ch) > maxEdge) {
  const k = maxEdge / Math.max(cw, ch);
  outW = Math.round(cw * k);
  outH = Math.round(ch * k);
  pixels = new Uint8Array(outW * outH * 4);
  for (let y = 0; y < outH; y++) {
    for (let x = 0; x < outW; x++) {
      const sx0 = Math.floor((x * cw) / outW);
      const sx1 = Math.max(sx0 + 1, Math.ceil(((x + 1) * cw) / outW));
      const sy0 = Math.floor((y * ch) / outH);
      const sy1 = Math.max(sy0 + 1, Math.ceil(((y + 1) * ch) / outH));
      let sum = 0;
      let n = 0;
      for (let sy = sy0; sy < sy1; sy++) {
        for (let sx = sx0; sx < sx1; sx++) {
          sum += crop[(sy * cw + sx) * 4 + 3];
          n++;
        }
      }
      const i = (y * outW + x) * 4;
      pixels[i] = 0;
      pixels[i + 1] = 0;
      pixels[i + 2] = 0;
      pixels[i + 3] = Math.round(sum / n);
    }
  }
}

// 4) 写 PNG（RGBA / 8bit / 无滤波）
const table = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
const crc32 = (buf) => {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
};

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(outW, 0);
ihdr.writeUInt32BE(outH, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 6; // RGBA
const rawRows = Buffer.alloc((outW * 4 + 1) * outH);
for (let y = 0; y < outH; y++) {
  const dst = y * (outW * 4 + 1);
  rawRows[dst] = 0;
  Buffer.from(pixels.buffer, y * outW * 4, outW * 4).copy(rawRows, dst + 1);
}

fs.writeFileSync(
  out,
  Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(rawRows, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]),
);
console.log(`${out}  ${outW}x${outH}  ${(fs.statSync(out).size / 1024).toFixed(1)} KB`);
