"""样片后处理：去右下角平台水印 -> 统一 720x492 -> 叠加竖排毛笔题字。

只读取 illustration-samples/ 里新生成的 PNG，输出新的 JPG，不改动任何现有站点图片。
"""
import glob
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAMPLE_DIR = os.path.join(ROOT, "illustration-samples")
FONT_PATH = "C:/Windows/Fonts/STXINGKA.TTF"  # 华文行楷
OUT_W, OUT_H = 720, 492  # 与 public/illustrations 里的中文组一致

# 两份生图：按文件名（含时间戳）排序，01=落花远山，02=庭前柏树
JOBS = [
    ("sample-01-impermanence", "诸行无常"),
    ("sample-02-cypress", "庭前柏树子"),
]


def remove_watermark(img):
    """水印固定在右下角；从左侧平移一块同尺寸纸面盖上去，接缝做羽化。"""
    W, H = img.size
    x1, y1 = int(W * 0.90), int(H * 0.925)
    w, h = W - x1, H - y1
    shift = 210
    patch = img.crop((x1 - shift, y1, x1 - shift + w, y1 + h))

    mask = Image.new("L", (w, h), 255)
    px = mask.load()
    edge = 12
    for y in range(h):
        for x in range(w):
            px[x, y] = int(255 * min(1.0, x / edge, y / edge))
    img.paste(patch, (x1, y1), mask)
    return img


def add_caption(img, text):
    """左上单列竖排题字，位置与站内现有中文组一致。"""
    font = ImageFont.truetype(FONT_PATH, 38)
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    x, y, step = 52, 44, 51
    ink = (28, 26, 23, 238)
    for ch in text:
        d.text((x, y), ch, font=font, fill=ink, anchor="lt")
        y += step
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")


def main():
    raws = sorted(glob.glob(os.path.join(SAMPLE_DIR, "*.png")))
    assert len(raws) >= 2, f"找不到两张原始生图: {raws}"
    for raw, (name, caption) in zip(raws[:2], JOBS):
        img = Image.open(raw).convert("RGB")
        img = remove_watermark(img)
        img = img.resize((OUT_W, OUT_H), Image.LANCZOS)
        clean = os.path.join(SAMPLE_DIR, name + "-nocaption.jpg")
        final = os.path.join(SAMPLE_DIR, name + ".jpg")
        img.save(clean, quality=92, subsampling=0)
        add_caption(img, caption).save(final, quality=92, subsampling=0)
        print(os.path.basename(final), img.size, "题字:", caption)


if __name__ == "__main__":
    main()
