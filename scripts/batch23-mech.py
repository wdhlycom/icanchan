# -*- coding: utf-8 -*-
"""批 2/3 机械层：短标题、删预告、禅句撤栏目、表格天→章、木筏喻去重。"""
import io, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR = os.path.join(ROOT, 'src', 'content', 'articles-zh')

TITLES = {
 '01-abundant-everything-empty-something.md': ('物质富足，精神空虚——这是时代的症状', '物质富足，精神空虚'),
 '02-the-empty-pews.md': ('当教堂变空了，人们去了哪里', '西方人正在大规模离开教堂'),
 '03-not-what-you-think.md': ('佛学——可能我们很多人都没见过的样子', '佛学，可能不是你想的样子'),
 '04-the-four-truths.md': ('痛苦的四个真相——或者说，四个不那么丧的发现', '痛苦的四个真相'),
 '05-where-suffering-comes-from.md': ('痛苦从哪里来——三台不停运转的焦虑发动机', '痛苦从哪里来'),
 '06-can-it-stop.md': ('痛苦可以终结吗——撕掉「涅槃」的神秘面纱', '痛苦可以终结吗'),
 '07-the-map.md': ('通往自由的地图——八正道概览', '通往自由的地图'),
 '09-the-soil.md': ('印度的思想土壤——佛陀站在谁的肩上', '佛陀站在谁的肩上'),
 '10-the-first-split.md': ('佛灭之后——第一次分裂', '佛灭之后，谁说了算'),
 '11-mahayana-revolution.md': ('大乘革命——从「自己脱身」到「拉上所有人」', '大乘革命'),
 '12-when-buddhism-met-daoism.md': ('当佛学遇见道家——佛教如何走进中国', '当佛学遇见道家'),
 '13-bodhidharmas-wall.md': ('达摩面壁，慧能闻经——禅宗的诞生', '达摩面壁九年，一句话不说'),
 '14-the-chan-manifesto.md': ('不立文字，直指人心——禅宗的四个字', '不立文字，直指人心'),
 '15-platform-sutra.md': ('唯一被称为「经」的中国佛典——《坛经》', '一个不识字的樵夫，留下一部经'),
 '16-sudden-vs-gradual.md': ('顿悟与渐悟——自由能不能一步到位', '自由能不能一步到位'),
 '17-no-thought-no-form.md': ('无念、无相、无住——心智自由的三个操作定义', '无念、无相、无住'),
 '18-koans.md': ('公案——不是谜语，是心智训练工具', '公案不是谜语'),
 '19-everyday-chan.md': ('担水砍柴，无非妙道——修行不在蒲团上', '担水砍柴，无非妙道'),
 '20-chan-and-daoism.md': ('禅与道家——庄子遇见了慧能', '庄子遇见了慧能'),
 '21-chan-and-confucianism.md': ('禅与儒家——入世和出世怎么兼容', '入世和出世怎么兼容'),
 '23-watching-the-breath.md': ('观呼吸——现在就可以试的练习', '观呼吸，现在就可以试'),
 '24-eating-walking-talking.md': ('吃饭、走路、说话——日常中的正念', '吃饭、走路、说话'),
 '26-relationships.md': ('关系中的佛学——慈悲不是软弱', '慈悲不是软弱'),
 '27-impermanence.md': ('无常与死亡——不是安慰，是直面', '无常，不是坏消息'),
 '28-psychology.md': ('佛学与心理学——两千年后的重逢', '两千年后的重逢'),
 '29-the-map.md': ('三十天回顾——一张心智地图', '一张心智地图'),
 '30-next-steps.md': ('你的下一步——个人修行路线图', '你的下一步'),
}

# 禅句：删掉栏目名与解读，只留原文；1/5/6 整块撤（本章正文没用到那句，留着是提前给结论）
DROP_QUOTE = ['01-abundant-everything-empty-something.md',
              '05-where-suffering-comes-from.md',
              '06-can-it-stop.md']
REPLACE_QUOTE = {
 '19-everyday-chan.md': ('「春有百花秋有月，夏有凉风冬有雪。若无闲事挂心头，便是人间好时节。」——无门慧开禅师',
                         '「一日不作，一日不食。」——百丈怀海'),
}

log = []
for name in sorted(os.listdir(DIR)):
    if not re.match(r'^\d\d-', name):
        continue
    p = os.path.join(DIR, name)
    s = io.open(p, encoding='utf-8').read()
    orig = s

    # 1. 标题
    if name in TITLES:
        old, new = TITLES[name]
        assert ('title: "%s"' % old) in s, name
        s = s.replace('title: "%s"' % old, 'title: "%s"' % new)

    # 3. 禅句栏目
    if name in DROP_QUOTE:
        s2 = re.sub(r'\n---\n\n> \*\*(今日禅句|最后一日禅句)\*\*\n>.*?\n(?=\n---)', '\n', s, flags=re.S)
        assert s2 != s, '禅句未撤 ' + name
        s = s2
    else:
        if name in REPLACE_QUOTE:
            oldq, newq = REPLACE_QUOTE[name]
            assert oldq in s, name
            s = s.replace(oldq, newq)
        # 去掉栏目名行与「> 」+解读行
        s2 = re.sub(r'> \*\*(今日禅句|最后一日禅句)\*\*\n>\n', '', s)
        assert s2 != s, '禅句标签未删 ' + name
        s = s2
        s2 = re.sub(r'>\n> 解读：[^\n]*\n', '', s)
        assert s2 != s, '解读未删 ' + name
        s = s2

    # 2. 删末尾预告块
    s2 = re.sub(r'\n---\n\n\*下一章：[^\n]*\*\s*$', '\n', s)
    if name != '30-next-steps.md':
        assert s2 != s, '预告未删 ' + name
    s = s2

    # 4. 周小结表头「天」→「章」
    s = s.replace('| 天 | 核心事件 |', '| 章 | 核心事件 |').replace('| 天 | 核心内容 |', '| 章 | 核心内容 |')

    if s != orig:
        io.open(p, 'w', encoding='utf-8').write(s)
        log.append(name)

print('改动文件 %d 个' % len(log))
print('\n'.join(log))
