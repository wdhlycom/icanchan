# -*- coding: utf-8 -*-
"""生成 78 张新插图的画廊页（illustration-samples/gallery.html）。

用法：python scripts/illustration-gallery.py
"""
import importlib.util
import os
import re
import sys

_here = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location("illbatch", os.path.join(_here, "illustration-batch.py"))
_illbatch = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_illbatch)
ROOT = _illbatch.ROOT
SPECS = _illbatch.SPECS
article_paths = _illbatch.article_paths

OUT = os.path.join(ROOT, "illustration-samples", "gallery.html")

CSS = """
  body { margin:0; padding:36px 20px 70px; background:#f6f2e9; color:#2b2721;
         font-family:"Songti SC","STSong",Georgia,serif; }
  .wrap { max-width:1240px; margin:0 auto; }
  h1 { font-size:25px; font-weight:normal; margin:0 0 6px; letter-spacing:2px; }
  p.lead { color:#7a7367; font-size:14px; line-height:1.8; margin:0 0 28px; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(290px,1fr)); gap:26px 20px; }
  figure { margin:0; }
  figure img { width:100%; display:block; border:1px solid #e3dccb; }
  figcaption { font-size:13px; color:#6f685c; margin-top:8px; line-height:1.6; }
  .no { display:inline-block; min-width:34px; font-size:11px; color:#a08f6d; }
  .ti { color:#3a352c; }
  .path { color:#a09787; font-size:11px; }
"""

TPL = """<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>中文站插图 · 78 张新图</title><style>{css}</style></head>
<body><div class="wrap">
<h1>中文站插图 · 78 张新图</h1>
<p class="lead">按 illustration-plan.md 第二部分的 #1 ~ #78 顺序排列，文件名 Zen01.jpg ~ Zen78.jpg。题字写在图内左上角，图片已按站内规则缩到 720×492、四边渐隐、墨色叠印。</p>
<div class="grid">
{items}
</div>
</div></body></html>
"""


def main():
    paths = article_paths()
    items = []
    for (nn, title, _), ((doc_nn, rel), _) in zip(SPECS, zip(paths, paths)):
        assert nn == doc_nn
        items.append(
            f'<figure><img src="../public/illustrations/Zen{nn:02d}.jpg" alt="{title}" loading="lazy">'
            f'<figcaption><span class="no">#{nn:02d}</span> <span class="ti">{title}</span><br>'
            f'<span class="path">{rel}</span></figcaption></figure>'
        )
    html = TPL.format(css=CSS, items="\n".join(items))
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"画廊页写好了：{OUT}（{len(items)} 张）")


if __name__ == "__main__":
    main()
