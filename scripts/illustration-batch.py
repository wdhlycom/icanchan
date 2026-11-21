# -*- coding: utf-8 -*-
"""中文站 78 篇配图：批量后处理 + 换封面。

流程：
  1) 用 ImageGen 逐张生图，prompt 一律以「NN-题字」开头，原始 PNG 存到 illustration-samples/raw/
  2) python scripts/illustration-batch.py process  去水印 -> 720x492 -> 叠竖排题字 -> public/illustrations/ZenNN.jpg
  3) python scripts/illustration-batch.py covers  改 78 篇的 frontmatter cover
  4) python scripts/illustration-batch.py plan    把 illustration-plan.md 第二部分标记成已配图

顺序与 illustration-plan.md 第二部分的 #1 ~ #78 完全一致。
"""
import glob
import json
import os
import re
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW_DIR = os.path.join(ROOT, "illustration-samples", "raw")
OUT_DIR = os.path.join(ROOT, "public", "illustrations")
PLAN_MD = os.path.join(ROOT, "illustration-plan.md")
FONT_PATH = "C:/Windows/Fonts/STXINGKA.TTF"  # 华文行楷
OUT_W, OUT_H = 720, 492  # 与 public/illustrations 里的中文组一致

# 统一风格段：主体占画面一半到三分之二，右下角留空（平台水印落在那里），左上留题字条带
STYLE = (
    "中国传统水墨写意画，宣纸本底色，米黄偏赭的旧纸色，可见细微纸纹。"
    "墨分五色，湿墨晕染，干笔飞白，笔意简净，宋代文人画与禅画的气息。"
    "主体清晰可辨、占满画面一半到三分之二，构图饱满有分量，不要小到只剩一角。"
    "主体整体居中偏右，不挤进左上角；左上角与右下角保持空旷的纸面，只有极淡的墨晕，"
    "不要出现方块状或长条状的浅色色斑。"
    "全画只用墨的浓淡灰黑，不施鲜艳色彩。"
    "禁止出现任何文字、书法、题字、印章、签名、水印、边框、照片质感、油画质感、3D 渲染、卡通。"
)

# (序号, 题字, 画面主体)
SPECS = [
    (1, "色即是空", "一张旧木桌占画面中央偏右，桌面上摆着一只粗瓷碗、一枚铜钱、一方旧印，桌沿木纹被墨汁洇开与纸面渐渐融为一体，物件的影子淡淡拖长。"),
    (2, "众生平等", "一条田埂上，左边一只猫，右边一个穿短褐的农人，都正面朝前、大小相当，站在同一条地平线上，远山淡墨。"),
    (3, "无常", "占画面右半的大花枝正在盛放又凋落，花瓣纷纷飘下，地上积了一层落瓣，枝上尚余两三朵。"),
    (4, "空", "一张拆开的方桌，四条桌腿的榫卯散落在地，木头钉子散乱，桌面上空无一物，只剩中央一道淡淡的影子。"),
    (5, "缘起", "夜色里一张矮桌，桌上一支写到一半的毛笔、一只摔出裂纹的碗、一盏将熄的油灯，三样东西被一线淡墨连在一起。"),
    (6, "无我", "一个拱手力争的古人立在铜镜前，镜中倒影与本人错开半步，壁上另有他更淡的影子，比本人淡得多。"),
    (7, "因果", "一片瓜地占画面大半，藤蔓铺开，瓜大而圆，远处地面干裂有裂纹，一个挑担的农人背影走向田里。"),
    (8, "般若", "一个人双手捧着一把沙，沙从指缝不断漏下，落成一柱细流，掌中越漏越少，身后远山孤树。"),
    (9, "涅槃", "一盏油灯居中偏右、占画面近一半，灯芯上一缕青烟笔直升起，火苗已熄，灯身积着薄灰。"),
    (10, "九年面壁", "石壁下坐着一位僧人背对观者，壁上刻着密密九道短痕，石缝里长出一株草，地面落叶厚厚一层。"),
    (11, "一花开五叶", "一朵大莲居中偏右，花瓣向五方舒展，花下五片叶分向五边，五条细溪从下方分流而去。"),
    (12, "心不可得", "大雪夜，一个僧人立在洞口外，雪没到膝，身后洞内透出一点昏黄灯光，人与雪占满画面中央。"),
    (13, "至道无难", "一个人闭眼坐在地中央，身边散着杯盏、包袱、几本书和一只鞋，他两手空空肩上无物。"),
    (14, "农禅", "山坡上一座茅屋，屋前几垄菜畦，一头老牛在田里耕，僧人弯腰插秧，远山在后。"),
    (15, "守本真心", "土墙上贴着两张写满字的纸，字迹以墨块示意，两人在墙下仰头细看，一人在旁执笔。"),
    (16, "续五宗", "一只茶盏落在地上碎成几瓣，水溅开，蒲团空着，旁边有一只伸出的脚。"),
    (17, "八风吹不动", "江面宽阔，芦苇被大风吹得齐齐倒伏，一叶小舟在浪中，舟中一人端坐不动。"),
    (18, "诸恶莫作", "一位客人张口愣在原地，对面一个僧人低头扫地不答话，院子一角有口古井，槐树浓荫。"),
    (19, "木樨香", "满院桂花盛开，风起时花如雨落，一人仰头闭眼闻香，师父立在旁侧，地上落满花瓣。"),
    (20, "云在青天", "屋檐下一位禅师低头读经不抬头，客人转身欲走衣袖带风，门外山头露出大团淡云。"),
    (21, "本来无一物", "土墙上写着两首偈，笔势淋漓，一人在墙下仰头读，另一人执笔刚放下，纸角墨迹未干。"),
    (22, "般若", "灯下经案，卷开的经书摊在案上，讲经的僧人端坐案后，案前一盏灯，墙面大片留白。"),
    (23, "功德", "巍峨寺宇占了画面大半，重檐殿宇一层层向上，塔与幡在侧，阶下两个人对面对立。"),
    (24, "定慧一体", "同一个人的两个姿态重影，一个盘坐闭目，一个睁眼坐起，淡墨叠在一起，中间一盏灯。"),
    (25, "直心", "山路上一位僧人挑着两只水桶前行，扁担压弯，脚下石阶通向远处山门，路旁松树斜出。"),
    (26, "坐禅", "院子中一人缓步经行，一手拨动墙上挂着的念珠，屋檐下空着蒲团，地上落叶随步而动。"),
    (27, "无相忏悔", "一叠纸层层叠起，上面是同一个手印样的墨迹，一个人低头看着，手里还捏着笔。"),
    (28, "心迷法华转", "法会上经卷长长展开，蒲团上的人正俯身行礼却起了偏差，殿内香烟缭绕，木鱼与钟磬在侧。"),
    (29, "辞诏", "山下石阶上一队人马举着诏书上山，山腰茅屋门虚掩，屋里只有一盏灯，僧人未动身。"),
    (30, "一物不中", "年轻僧人立在老僧面前张口欲答又答不上，师父手扶一根柱杖，两人相距很近。"),
    (31, "生死事大", "雪夜院中，一人绕着另一人走了三圈，地上留下三道交错的脚印，雪深没过脚踝。"),
    (32, "亦见亦不见", "小沙弥低头站着，肩头刚被柱杖点过微微歪着，师父立在旁边看着他。"),
    (33, "生活禅", "厨房一角，一双手在水盆里洗碗，水花溅起，旁边叠着一摞干净的碗，窗外有竹影。"),
    (34, "浪还没起的时候", "渡口系着一条空船，船桨搁在船里，岸上无人，水面平静，江对岸山影极淡。"),
    (35, "一只手拍掌", "一只手高举，另一只手在下方，两掌之间空着，掌影落在墙上，屋里清静无人。"),
    (36, "除了水没有别的冰", "一只白瓷盆里盛着清水，水中一块冰正在融化，冰面反光，倒影里显出一张熟悉的脸。"),
    (37, "吃粥了吗", "粗瓷粥碗还在桌上冒着热气，桌边水盆里泡着一只脏碗，灶上柴火只剩余烬。"),
    (38, "通勤无聊时", "旧式车厢窗边，一人扶着立柱站着，窗外站台与电线掠过，窗玻璃上蒙着一层雾气。"),
    (39, "刷手机停不下来", "饭桌上一只手在桌下握着一块发光的小方块，方块的光映在脸上，桌上饭菜冒着热气。"),
    (40, "坏事记得更牢", "一册摊开的信笺，一行字被浓墨圈住，其余字迹淡得几乎看不清，一只手按在纸上。"),
    (41, "我不够好", "一个人低头坐在地上，脚边散落许多纸片，纸上的字化成墨点，他用手捂住额头。"),
    (42, "大脑也在变", "同一棵老树的两态并排，左边枝繁叶茂，右边叶子稀落只剩枯枝，两棵树干一模一样。"),
    (43, "慈悲能练吗", "香客在佛前合掌替别人祈愿，身后一个人手里捧着打翻的墨砚，低头不肯看自己。"),
    (44, "平常心是道", "一边是刻意挺胸盘坐的人，肩膀绷得发僵；另一边台阶上随意坐着的人，松松散散。"),
    (45, "失眠的夜里", "深夜，一人坐在床沿，床头一盏灯将灭，窗外月色，帐幔低垂，旁边一具更漏。"),
    (46, "一个人就慌", "空屋中一个人坐在椅子上，远处一台开着的收音机，声音用几道墨线表示，灯开得很亮。"),
    (47, "重放一场吵架", "两人隔空对峙的剪影，中间地上散着重复的脚印和几个反复的墨点，其中一个人背过身去。"),
    (48, "对亲近的人不耐烦", "门槛内外两个人——外面的背影正要转身走开，里面的身影刚探出半个身子。"),
    (49, "和父母越来越远", "老屋门前，两位白发老人并肩站着，中间隔着一步的距离，院子里的树影长长地拖在地上。"),
    (50, "孩子问题让我崩溃", "大人蹲着身子张了张嘴，面前一个小孩的背影，地上散着没收的书和倒下的玩具。"),
    (51, "越努力越焦虑", "书案上堆着成叠的卷宗与账册，烛火将尽，人还在伏案写，墙上挂着一格一格的日历。"),
    (52, "嫉妒同事升职", "席上两处案几，一处案上摆着新置的冠与杯，另一处一人手指点着纸，嘴唇微动。"),
    (53, "该不该辞职", "夜里的案前，一叠纸和一支笔，纸上墨迹只写了一行就停了，窗外有人影走过。"),
    (54, "拖了又拖", "一张纸只起了个头就空着，旁边散着几张写过的回信，手里的笔悬在纸上没落下。"),
    (55, "忙到没时间修行", "案上文书卷宗堆成小山，最底下压着一串佛珠和一角经卷，笔尖点着一张空白签条。"),
    (56, "怕死", "深夜灯下独坐的人，墙上投下他自己的影子，影子站得笔直，比本人高出一头。"),
    (57, "什么都有还是不快乐", "一屋子器物——屏风、箱笼、瓶花、古琴，人独坐中央被物围着，低着头。"),
    (58, "怕变老", "铜镜前一个人抬起衣袖看自己的手，镜中倒影的手背上添了几道皱纹，鬓边有白。"),
    (59, "生病的时候", "卧榻上一人侧卧，窗外雨丝，床几上一只药碗、一盏将凉的灯。"),
    (60, "信仰和迷信", "庙前一列人的背影，有人举香过头，香炉里烟气缭绕，屋檐下垂着旧幡。"),
    (61, "平常心与精进", "天色暮，禅堂最后一盏灯还亮着，一个人在扫院归拢蒲团，桌上排满明日的功课单。"),
    (62, "百丈野狐", "老人坐在松下说话，身侧一只淡墨的狐狸影子正慢慢走开，远处山径空无一人。"),
    (63, "云在青天水在瓶", "一双手托着一只粗陶瓶，瓶口升起一团云气，另一只手指向天上，远山在侧。"),
    (64, "庭前柏树子", "庭院里一棵虬曲苍柏占画面大半，两个小小的人站在树下说话，一人伸手指着树。"),
    (65, "丹霞烧佛", "佛堂前一只三足焚炉，炉中一堆灰烬和焦黑木屑，一旁的木佛只剩下底座。"),
    (66, "饥来吃饭困来即眠", "一张矮桌上摆着饭菜，一人正低头吃，旁边榻上另一个人已经睡着，帐子半垂。"),
    (67, "磨砖作镜", "庵前空地上，一人蹲着拿手磨一块砖，砖屑飞起，旁边打坐的人睁开眼看着他。"),
    (68, "即心即佛", "同一个人的两个姿态，一个向前走，一个转身往回走，中间空地分隔，一僧一坐一立。"),
    (69, "南泉斩猫", "堂上一只黑白猫，围着的人影散乱；门口一人趿着鞋把鞋顶在头上，正往外走。"),
    (70, "无寒暑处", "一半是雪景一半是暖炉——门槛外雪地，门槛内炭火，一只手指向门外。"),
    (71, "放下再背起来", "一人肩上一担东西，地上另有一件捆好的行李，人站在中间不动，旁边僧人背手不语。"),
    (72, "道得也三十棒", "德山举起柱杖，来人张口欲答，棒影落在两人之间，杖下地面有裂纹。"),
    (73, "三岁孩儿也道得", "竹林小径上，童子伸手指着一样东西说话，白居易拱手愕然站着。"),
    (74, "谁使谁", "回廊下一人对着日晷出神，晷针的影子指向某处，廊外日光斜照，时间正在流逝。"),
    (75, "香严击竹", "一丛竹被竹杖击打，竹叶纷落，一人立于竹旁侧身看，远处地上放着经卷。"),
    (76, "狗子有无佛性", "院里一只写意的狗抬头看人，旁边站着一个拱手发问的人，墙角一棵老树。"),
    (77, "减压不是解脱", "一个绳结松开了，一端垂落地面，另一端仍系在木桩上，桩上的绳圈勒出深深的印子。"),
    (78, "贴上正念之后", "一张纸符贴在墙上，纸上的纹样被反复描画得密密麻麻，人在下面仰头看，手里也拿着一张。"),
]

# 78 篇文章路径（与 illustration-plan.md 第二部分表格一一对应）
def article_paths():
    """从 illustration-plan.md 第二部分表格里读出 78 篇文章路径，保证与文档同步。"""
    paths = []
    started = False
    with open(PLAN_MD, encoding="utf-8") as f:
        for line in f:
            if line.startswith("## 二、"):
                started = True
                continue
            if started and line.startswith("## 三、"):
                break
            if started:
                m = re.match(r"\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|", line)
                if m:
                    paths.append((int(m.group(1)), m.group(2)))
    return paths


def build_prompt(nn, title, scene):
    """prompt 开头带「NN-题字」，生图文件名前缀就能对上编号。"""
    return f"{nn:02d}-{title}。{scene}。{STYLE}"


def remove_watermark(img):
    """平台水印固定在右下角；右下角本来留空，从左侧平移一块纸面盖上去，接缝做羽化。"""
    W, H = img.size
    x1, y1 = int(W * 0.885), int(H * 0.905)
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
    """左上单列竖排毛笔题字，位置与站内现有中文组一致。"""
    font = ImageFont.truetype(FONT_PATH, 38)
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    x, y, step = 52, 44, 51
    ink = (28, 26, 23, 238)
    for ch in text:
        d.text((x, y), ch, font=font, fill=ink, anchor="lt")
        y += step
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")


def cmd_process():
    """raw/*.png -> public/illustrations/ZenNN.jpg"""
    raw_files = sorted(glob.glob(os.path.join(RAW_DIR, "*.png")))
    found = {}
    for p in raw_files:
        m = re.match(r"^(\d{2})", os.path.basename(p))
        if m:
            found[int(m.group(1))] = p
    missing = [n for n, _, _ in SPECS if n not in found]
    print(f"raw 目录共 {len(raw_files)} 张，能对上编号 {len(found)} 张")
    if missing:
        print("还没生出来的编号（跳过）：", missing)
    for nn, title, _ in SPECS:
        if nn not in found:
            continue
        src = found[nn]
        img = Image.open(src).convert("RGB")
        img = remove_watermark(img).resize((OUT_W, OUT_H), Image.LANCZOS)
        out = os.path.join(OUT_DIR, f"Zen{nn:02d}.jpg")
        add_caption(img, title).save(out, quality=92, subsampling=0)
        print(f"Zen{nn:02d}.jpg  题字「{title}」  <- {os.path.basename(src)}")


def cmd_covers():
    """把 78 篇的 cover 换成新图；改动前把旧值存成 JSON 以便回退。"""
    paths = article_paths()
    assert len(paths) == len(SPECS), f"文档表格 {len(paths)} 篇，与 SPECS {len(SPECS)} 条对不上"
    backup = os.path.join(ROOT, ".workbuddy", "illustration-covers-backup.json")
    old = {}
    changed = []
    for (nn, rel), (spec_nn, title, _) in zip(paths, SPECS):
        assert nn == spec_nn, f"编号对不上：文档 {nn} vs SPECS {spec_nn}"
        full = os.path.join(ROOT, "src", "content", rel)
        with open(full, encoding="utf-8") as f:
            text = f.read()
        m = re.search(r'^cover:\s*"?([^"\s]+)"?\s*$', text, re.M)
        assert m, f"{rel} 里找不到 cover"
        old[rel] = m.group(1)
        new = f"/illustrations/Zen{nn:02d}.jpg"
        if m.group(1) != new:
            text = re.sub(r'^cover:\s*"?[^"\s]+"?\s*$', f'cover: "{new}"', text, count=1, flags=re.M)
            with open(full, "w", encoding="utf-8") as f:
                f.write(text)
            changed.append(rel)
    os.makedirs(os.path.dirname(backup), exist_ok=True)
    with open(backup, "w", encoding="utf-8") as f:
        json.dump(old, f, ensure_ascii=False, indent=2)
    print(f"改了 {len(changed)} 篇的 cover，旧的 cover 值备份在 {backup}")


def cmd_plan():
    """把 illustration-plan.md 第二部分的表格补上「新图」一列。"""
    with open(PLAN_MD, encoding="utf-8") as f:
        lines = f.read().split("\n")
    out = []
    in_second = False
    for line in lines:
        if line.startswith("## 二、"):
            in_second = True
        elif line.startswith("## 三、"):
            in_second = False
        if in_second and line.startswith("| # | 文章 | 标题 | 文章开头 | 现在用的老图 |"):
            out.append(line.rstrip() + " 新图 |")
            continue
        if in_second and re.match(r"^\|\s*---", line):
            out.append(line.rstrip() + " --- |")
            continue
        m = re.match(r"^(\|\s*)(\d+)(\s*\|\s*`[^`]+`.*)$", line) if in_second else None
        if m:
            nn = int(m.group(2))
            line = f"{m.group(1)}{nn}{m.group(3)} | `Zen{nn:02d}.jpg` |"
        out.append(line)
    with open(PLAN_MD, "w", encoding="utf-8") as f:
        f.write("\n".join(out))
    print("illustration-plan.md 第二部分已补上「新图」一列")


def cmd_prompts():
    """为 78 篇各写一份完整 prompt 文件，供生图时原样使用，避免自由发挥。"""
    out_dir = os.path.join(RAW_DIR, "prompts")
    os.makedirs(out_dir, exist_ok=True)
    for nn, title, scene in SPECS:
        path = os.path.join(out_dir, f"{nn:02d}.txt")
        with open(path, "w", encoding="utf-8") as f:
            f.write(build_prompt(nn, title, scene))
    print(f"写了 {len(SPECS)} 份 prompt 到 {out_dir}")


def cmd_check():
    paths = article_paths()
    print(f"文档第二部分：{len(paths)} 篇")
    print(f"SPECS：{len(SPECS)} 条")
    for (nn, rel), (spec_nn, title, _) in zip(paths, SPECS):
        full = os.path.join(ROOT, "src", "content", rel)
        ok = os.path.exists(full)
        if not ok or nn != spec_nn:
            print("对不上：", nn, rel, ok)
    print("题字一览：", "、".join(t for _, t, _ in SPECS))


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "check"
    {"check": cmd_check, "prompts": cmd_prompts, "process": cmd_process, "covers": cmd_covers, "plan": cmd_plan}[cmd]()
