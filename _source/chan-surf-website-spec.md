# chan.surf — 网站设计规格文档

> **用途**：本文档是 chan.surf 网站的完整设计规格，提供给网页开发者/Hugo 模板配置使用。
> **不含文案**：本文档所有标题、标签、按钮文字的中英文示例仅为占位说明，最终文案由 Hu 另行提供。
> **不含代码**：本文档只描述结构和行为，具体实现由 Hugo 模板开发者完成。

---

## 一、项目概览

### 1.1 网站使命

chan.surf 是一个面向西方读者、传播中国禅宗文化精髓的知识网站。核心目标——

- **文化正名**：让西方读者了解 Chinese Chan（中国禅），不只知 Japanese Zen（日本禅）。Chan 是 Zen 的根源。
- **理性心灵哲学**：不把佛教当宗教传播，而是作为一种理性的、温和的心灵哲学和生活方法论。不涉及冥想指导。
- **知识传播**：以系列文章形式，系统介绍佛教基础、禅宗历史与思想。

### 1.2 目标读者

- 西方英语世界 25-55 岁受过教育人群
- 对东方哲学有兴趣但未深入
- 精神上有探索需求，但非宗教人士
- 可能通过 Substack、Google 搜索、社交媒体发现网站
- 后续覆盖西班牙语读者

### 1.3 品牌定位

- **不端着**：学术但不学究。严肃但不沉闷。
- **冲浪感**：Chan 像冲浪——自由、流动、挑战、不可名状的艺术。
- **根源性**：回到源头（the source），不是追逐潮流（the wave）。

---

## 二、技术约束

### 2.1 基础架构

| 项目 | 选择 |
|------|------|
| 域名 | canchan.com |
| 站点生成器 | Hugo（静态站点） |
| 托管 | GitHub Pages / Netlify / Cloudflare Pages（按成本最低选择） |
| 后端 | 无后端。纯静态 |
| CMS | 无。内容通过 Markdown 文件管理 |

### 2.2 多语言

- **英文版**：根路径 `/`
- **西班牙语版**：`/es/` 前缀
- **翻译方式**：不含自动翻译。Hu 自行用英文和西语分别写稿。两套内容完全独立，主题相同但表达方式各自适配语言文化。
- **语言切换器**：导航栏右上角，EN / ES 两个按钮。当前语言高亮。切语言后跳转到对应语言版本的同路径页面。

### 2.3 频道矩阵

网站是读者旅程的入口，向外连接到社媒矩阵——

| 阶段 | 渠道 | 用途 | 启动时间 |
|------|------|------|---------|
| 第1波 | chan.surf（网站） | 内容主阵地 | 立即 |
| 第1波 | Substack | 邮件订阅分发 | 立即 |
| 第1波 | Twitter/X | 短内容引流 | 立即 |
| 第2波 | YouTube | 深度视频内容 | 2000+ 订阅后 |
| 第3波 | Podcast (Apple/Spotify) | 音频分发 | 后续 |
| 第4波 | Pinterest | 图文引流 | 后续 |

---

## 三、整体设计风格

### 3.1 视觉参考

**主参考网站**：[wirecutter.guru](https://wirecutter.guru/)

核心特征参考——

- 极简单栏布局，无侧边栏
- 白色/浅色背景为主
- 统一的文章卡片网格（缩略图 + 标题，无摘要文字）
- 导航栏简洁（Home / Blog / Privacy / Contact）
- 搜索为点击展开式图标，非常规输入框
- Footer 分栏：网站介绍 + 链接 + 社交媒体图标
- 整体感觉：干净、克制、内容至上

### 3.2 设计原则

1. **内容为王** — 每个页面元素必须有存在的理由
2. **极简，而非空洞** — 少不是目的，让内容呼吸才是目的
3. **阅读优先** — 所有设计决策服务阅读体验
4. **移动优先** — 先确保手机上阅读舒适，再适配桌面
5. **无侧边栏** — 侧边栏分散注意力，不适合深度阅读
6. **单 CTA** — 每个视觉高度区域内最多一个行动号召

### 3.3 色彩系统

| 角色 | 颜色 | 用途 |
|------|------|------|
| 背景 | #FFFFFF | 全局背景 |
| 正文文字 | #1a1a1a 或 #222 | 文章正文 |
| 辅助文字 | #666 或 #777 | 日期、阅读时间、标签 |
| 强调色（CTA） | 一个暖色调 | 订阅按钮、链接悬停（最终颜色由 Hu 决定） |
| 浅灰底 | #f8f8f8 或 #fafafa | 卡片悬停、分隔区块背景 |
| 边框 | #eee 或 #e0e0e0 | 卡片边框、分隔线 |

### 3.4 字体

| 元素 | 字体风格 | 说明 |
|------|---------|------|
| 正文 | Serif（衬线体） | 长文阅读舒适，经典禅意 |
| 标题 | Sans-serif（无衬线） | 清爽现代，与正文形成对比 |
| UI 元素 | Sans-serif | 导航、标签、按钮 |
| 代码/引用 | Monospace 或 Serif italic | 佛经引用统一格式 |

### 3.5 响应式断点

| 断点 | 宽度 | 布局变化 |
|------|------|---------|
| 手机 | < 768px | 单列。导航折叠为汉堡菜单。文章卡片单列。 |
| 平板 | 768px – 1024px | 导航展开。文章卡片 2 列。 |
| 桌面 | > 1024px | 全宽导航。文章卡片 3 列。文章页面 max-width 720px 居中。 |

---

## 四、全局组件

### 4.1 导航栏

**位置**：页面顶部，吸顶（sticky），白色背景 + 底部细线分隔。

**元素**（从左到右）——
1. Logo：chan.surf（文字，非图片）
2. Start Here（链接）
3. Series（链接）
4. Articles（链接，可选下拉按系列筛选，暂不实现）
5. About（链接）
6. 语言切换器：**EN** | **ES**（当前语言高亮。点击切换）
7. 搜索图标（🔍，点击展开搜索输入框，内联不跳转独立页面）
8. Subscribe 按钮（实心按钮，对比色，区别于其他文字链接）

**响应式**：手机端——Logo + 搜索 + 汉堡菜单。点击汉堡展开全屏菜单覆盖。

### 4.2 Footer

**位置**：所有页面底部。

**结构**：三栏（桌面）/ 单栏堆叠（手机）

| 左栏 | 中栏 | 右栏 |
|------|------|------|
| chan.surf logo | **Explore** | **Follow** |
| "Chan is the Chinese root of Zen. We surf the source, not the wave." | Start Here | Twitter/X |
| | Series | Substack |
| | Articles | YouTube |
| | About | Podcast (Apple) |
| | Contact | RSS Feed |
| | Privacy Policy | |

**底部**：© 2026 chan.surf. All rights reserved.

### 4.3 搜索

**触发**：导航栏搜索图标。

**行为**：点击图标 → 导航栏内展开一个搜索输入框（取代导航链接的位置，或在其下方展开）→ 输入关键词 → 实时或提交后显示搜索结果。

**搜索结果页** (`/search/?q=xxx`)：列表形式，每条结果包含标题 + 系列标签 + 简短摘要（2行截断）。无图片。

**注意**：Hugo 静态站搜索可用 Lunr.js 或 Fuse.js 客户端实现，不需要后端。

---

## 五、页面详细规格

### 5.1 首页 `/`

首页是内容入口+引导页，不堆砌信息。按以下区块从上到下排列——

---

#### 区块 1：Hero（头条精选）

| 属性 | 规格 |
|------|------|
| 类型 | 单篇文章大卡，全宽 |
| 图片 | 860 × 573 px，文章配图 |
| 标签 | 系列名称 + 第N篇（如 "Buddhism 101 · Chapter 3"） |
| 标题 | 大号加粗，h1 级，单行或两行 |
| 摘要 | 一句话描述（约20-30词） |
| 元信息 | By Hu · 8 min read · June 14, 2026 |
| CTA | "Read →" 按钮或链接 |

> 展示逻辑：默认为最新发布的文章。可手动置顶某篇。

---

#### 区块 2：使命句

一行或两行文字，居中，较大字号（约20-24px），serif 斜体。

> "Chan is the Chinese root of Zen. We surf the source, not the wave."

颜色略淡于正文（#555 或 #666）。

---

#### 区块 3：Essential Reading（必读精选）

| 属性 | 规格 |
|------|------|
| 标题 | "Essential Reading" / "必读精选" |
| 布局 | 网格：桌面3列、平板2列、手机1列 |
| 每列 | 一张文章卡片（见下方卡片规格） |
| 数量 | 6张（两行×3列） |
| 内容 | 手动精选，非自动排序。由 Hu 选择最重要的6篇 |

> 每张卡片的结构见"通用组件 → 文章卡片"。

---

#### 区块 4：Series 入口

| 属性 | 规格 |
|------|------|
| 标题 | "Explore by Series" |
| 布局 | 水平排列的系列大卡片（桌面2列，手机1列） |
| 数量 | 当前1个（Buddhism 101），后续新增 |

每张系列卡片包含——
- 系列封面图（660 × 370 px）
- 系列名称
- 一句话描述（50-80词）
- 文章数（如 "30 chapters"）
- CTA："Browse Series →"

---

#### 区块 5：Newsletter / Subscribe

| 属性 | 规格 |
|------|------|
| 标题 | "Get new articles in your inbox" |
| 副标题 | 一句话说明价值和频率 |
| 输入 | Email 输入框 + Subscribe 按钮 |
| 隐私提醒 | 小字："No spam. Unsubscribe anytime." |
| 行为 | 提交后跳转到 Substack 或内嵌的邮件收集（视 Hugo 模板支持情况而定） |

---

#### 区块 6：Footer

见"全局组件 → Footer"。

---

### 5.2 Start Here `/start-here`

这是网站转化率最高的页面——把随机访客变成清晰知道自己在哪里、想继续读下去的读者。

| 属性 | 规格 |
|------|------|
| 页面类型 | 独立页面，单栏，max-width 720px 居中 |
| 标题 | "Start Here" |
| 副标题 | 一行钩子，解释这个网站是什么 |

**内容段落（按顺序）**——

1. **Chan vs Zen**：简短解释 Chan 是 Zen 的中国根源，以及为什么了解这个区别很重要。
2. **这个网站是什么**：大致脉络——不教冥想、不当传教士、只提供知识和思考。
3. **谁应该读**：三句话定位理想读者。
4. **推荐阅读路径**——

| 如果 | 去读 |
|------|------|
| 完全不了解佛教 | Buddhism 101 系列，从第1篇开始 |
| 有一点了解，想深入 | 从 Buddhism 101 的第X篇开始（Hu 指定） |
| 就是好奇 | 从 Essential Reading 或博客挑感兴趣的 |

5. **Keep in touch**：引导订阅 Substack / Newsletter，链接到 /subscribe。

---

### 5.3 系列页 `/series/` 和 `/series/buddhism-101/`

#### `/series/` — 系列总览

列出所有系列（当前仅 Buddhism 101），每个系列一张卡片（同首页区块4的系列卡片样式）。

#### `/series/buddhism-101/` — 单个系列页

| 属性 | 规格 |
|------|------|
| 描述 | 系列简介（150-300词） |
| 文章列表 | 30篇文章按章节顺序排列 |
| 列表样式 | 每行：章节号 + 标题 + 一句话摘要 + 阅读时间 |
| 图片 | 可选，若有则用小缩略图（150×100）放在标题左侧 |

列表底部：引导订阅（"Want all chapters delivered to your inbox? Subscribe →"）

---

### 5.4 文章页 `/series/buddhism-101/[slug]/`

| 属性 | 规格 |
|------|------|
| 布局 | 单栏，max-width 720px，居中 |
| 不显示侧边栏 | 纯粹的沉浸式阅读体验 |

**页面结构（从上到下）**——

1. **系列 + 章节标签**：`Buddhism 101 · Chapter 3`
2. **文章标题**：h1
3. **元信息行**：By Hu · 8 min read · June 14, 2026
4. **文章配图**：860 × 573 px（如有）
5. **正文**：Markdown 渲染，标准 H2/H3 层级，可含引用块（佛经引用用特殊样式——serif italic，浅灰底色）
6. **系列导航**：

```
← Chapter 2: [前一篇标题]          Chapter 4: [后一篇标题] →
```

7. **Subscribe CTA**：一句话 + 按钮。"Enjoying this series? Get the next chapter in your inbox. [Subscribe →]"

---

### 5.5 Articles `/articles/`

| 属性 | 规格 |
|------|------|
| 内容 | 所有不属于系列的独立文章 |
| 布局 | 3列卡片网格（桌面），同 Essential Reading 样式 |
| 排序 | 按发布时间倒序 |
| 分页 | 有，每页 12 篇 |
| 标题 | "Articles" / "All Articles" |

---

### 5.6 About `/about`

| 属性 | 规格 |
|------|------|
| 标题 | "About" |
| 布局 | 单栏，max-width 720px 居中 |
| 内容 | Hu 的自我介绍 + 网站使命 + 联系方式 |

**必备元素**——
- Hu 的头像或照片（可选）
- Hu 的背景（理性佛学爱好者，为什么创建这个网站）
- 网站定位声明
- 联系邮箱或联系表单链接
- 社交媒体链接（Twitter、Substack）

---

### 5.7 Subscribe `/subscribe`

| 属性 | 规格 |
|------|------|
| 布局 | 单栏，居中 |
| 标题 | "Subscribe to chan.surf" |
| 说明 | 列出订阅价值（新文章通知、独家内容等） |
| CTA | Email 输入 + Subscribe 按钮 → Substack 嵌入或跳转 |
| 隐私声明 | 简短，一行 |

---

### 5.8 Contact `/contact`

| 属性 | 规格 |
|------|------|
| 布局 | 单栏，居中 |
| 表单 | 名称 + Email + 消息 + 发送按钮 |
| 实现 | 可用 Netlify Forms / Formspree / Google Forms 嵌入（Hugo 静态站无后端） |

---

### 5.9 搜索页 `/search/`

| 属性 | 规格 |
|------|------|
| 触发 | 导航栏搜索图标提交后跳转 |
| URL | `/search/?q=xxx` |
| 结果样式 | 列表。每项：标题（链接）+ 系列标签 + 两行摘要 |
| 空结果 | "No results found for 'xxx'." + 建议浏览 Series 或 Start Here |

---

### 5.10 404 页

| 属性 | 规格 |
|------|------|
| 标题 | "Page Not Found" |
| 副标题 | 一句话（禅意风格） |
| 链接 | Start Here、Series、Home |

---

## 六、通用组件规格

### 6.1 文章卡片（Article Card）

所有出现文章卡片的地方（首页 Essential Reading、Articles 列表、系列内文章列表）统一使用此规格。

| 属性 | 规格 |
|------|------|
| 缩略图 | 330 × 220 px，居中裁剪 |
| 图片格式 | WebP（优先），JPG（回退） |
| 系列标签 | 图片和标题之间，小号文字（12px），浅色，如 "Buddhism 101" |
| 标题 | 16-18px，bold。最多两行截断。 |
| 阅读时间 | 标题下方，小号灰字，如 "8 min read" |
| 日期 | 可选，若显示则放在阅读时间同行或下一行 |
| **无摘要** | 卡片不显示文章摘要或正文预览。标题和图片足以激发兴趣。 |
| 悬停效果 | 卡片整体微幅上浮（2-4px）+ 阴影加深。图片轻微缩放（1.02x）。 |

### 6.2 系列导航（文章底部）

| 属性 | 规格 |
|------|------|
| 位置 | 正文结束后，Subscribe CTA 之前 |
| 上一章 | 左对齐：`← Chapter N-1: [标题]` |
| 下一章 | 右对齐：`Chapter N+1: [标题] →` |
| 链接颜色 | 正文链接色 |
| 移动端 | 上下堆叠（上一章在上，下一章在下） |

### 6.3 Subscribe CTA（文章底部 / 区块）

| 属性 | 规格 |
|------|------|
| 文案 | 简短。1-2 句。 |
| 输入 | Email 输入框 |
| 按钮 | Subscribe →（实心按钮，对比色） |
| 位置 | 每篇文章底部、系列页底部、首页底部区块 |

---

## 七、多语言架构

### 7.1 URL 结构

```
chan.surf/                          ← 英文首页
chan.surf/start-here/               ← 英文
chan.surf/series/buddhism-101/      ← 英文
chan.surf/articles/some-article/    ← 英文

chan.surf/es/                       ← 西语首页
chan.surf/es/empezar-aqui/          ← 西语
chan.surf/es/series/budismo-101/    ← 西语
chan.surf/es/articulos/algo/        ← 西语
```

### 7.2 Hugo 实现方案

- 使用 Hugo 内置的 Multilingual Mode
- 两个语言配置：`en`（默认）和 `es`
- 内容各自独立，不共用 Markdown 文件
- 语言切换器在导航栏，点击跳转同路径的西语/英文版本

### 7.3 页面映射表

| 英文 | 西语（占位，由 Hu 定最终名称） |
|------|------|
| Start Here | Empezar Aquí |
| Series | Series |
| Articles | Artículos |
| About | Sobre |
| Subscribe | Suscribirse |
| Contact | Contacto |
| Search | Buscar |
| Essential Reading | Lecturas Esenciales |
| Explore by Series | Explorar por Series |
| Get new articles in your inbox | Recibe nuevos artículos en tu correo |

---

## 八、SEO 结构

### 8.1 页面层级

```
首页（权重最高）
├── /start-here（引导页，适合获取外链）
├── /series/buddhism-101/（支柱页，目标大词）
│   ├── 30篇文章（长尾词覆盖）
├── /series/（系列中心）
└── /articles/（内容库）
```

### 8.2 内链策略

- 每篇文章链接回所在系列页
- 系列页链接到每篇文章
- /start-here 链接到系列页和 Essential Reading
- 文章之间通过"系列导航"互链（上一篇/下一篇）
- 首页 Hero 和 Essential Reading 链接到重点文章

### 8.3 元标签

每页必须输出——
- Title tag：`文章标题 — chan.surf` 或 `页面标题 — chan.surf`
- Meta description：每页独立，150-160 字符
- Canonical URL：每页独立
- Hreflang tags：双语版本的互引用（`<link rel="alternate" hreflang="en" href="...">` 和 `es`）
- Open Graph tags：og:title, og:description, og:image, og:url
- Twitter Card：summary_large_image

### 8.4 结构化数据

- 首页：WebSite schema
- 文章页：Article schema（含 author、datePublished、dateModified）
- 系列页（可选）：CollectionPage schema

### 8.5 关键词定位

- 主词：Chinese Chan Buddhism, Chan vs Zen, What is Chan Buddhism
- 支柱页目标词：Buddhism basics, introduction to Buddhism, Buddhist philosophy
- 文章长尾词：每篇文章独立覆盖（如 "Four Noble Truths explained", "Chan history Bodhidharma"）

### 8.6 技术 SEO

- sitemap.xml：Hugo 自动生成，含双语版本
- robots.txt：允许全部爬取，Sitemap 指向
- 图片：全部含 alt 文本，使用 WebP 格式
- 性能目标：移动端 4G 网络 < 2 秒加载（Lighthouse Performance > 90）
- 无 JavaScript 框架依赖（Hugo 纯静态输出）
- HTTPS 必须

---

## 九、社会化推广架构

### 9.1 漏斗设计

```
Twitter/X（短内容、思想碎片）
    ↓
chan.surf（深度文章）
    ↓
Substack（邮件推送，建立订阅关系）
    ↓
未来：付费订阅、课程
```

### 9.2 各渠道角色

| 渠道 | 内容类型 | 发布频率 |
|------|---------|---------|
| chan.surf | 深度系列文章 3000-5000 词 | 每周 1-2 篇 |
| Substack | 邮件版文章 + 独家简短思考 | 与网站同步 |
| Twitter/X | 禅宗思想片段、引语、文章链接 | 每日 1-3 条 |
| YouTube（未来） | 深度讲解、纪录片式内容 | 每月 2-4 条 |
| Podcast（未来） | 音频版深度内容 | 每周 1 期 |
| Pinterest（未来） | 禅意图文卡片引流 | 每周 |

### 9.3 网站上的社媒展示位置

1. **Footer**：全部社媒图标链接
2. **About 页**：全部社媒链接
3. **文章底部**（可选）："Share this article" 小图标（Twitter、Facebook、Email）
4. **不推荐**：文章页面的浮动分享侧栏（干扰阅读）

---

## 十、Hugo 配置要点

### 10.1 目录结构

```
chan-surf/
├── config.toml              ← 主配置
├── content/
│   ├── _index.md            ← 英文首页
│   ├── start-here.md
│   ├── about.md
│   ├── subscribe.md
│   ├── contact.md
│   ├── series/
│   │   ├── _index.md        ← 系列总览
│   │   └── buddhism-101/
│   │       ├── _index.md    ← 系列主页
│   │       ├── chapter-01.md
│   │       ├── chapter-02.md
│   │       └── ...
│   ├── articles/
│   │   ├── _index.md        ← 文章列表
│   │   └── ...
│   └── es/
│       ├── _index.md        ← 西语首页
│       ├── empezar-aqui.md
│       └── ...
├── static/
│   └── images/              ← 所有图片
├── layouts/                 ← 自定义模板
└── themes/
    └── [hugo-theme]/
```

### 10.2 内容模板（Archetypes）

每个页面类型需要一个 Hugo archetype 模板，确保 frontmatter 一致——

```yaml
---
title: ""
date: ""
series: ""       # 如 "buddhism-101"
chapter: 0       # 系列内的章节号
description: ""  # 150-160字符
image: ""        # 配图路径
reading_time: 0
draft: true
---
```

### 10.3 主题选择标准

Hugo 主题必须满足——

- 支持单栏布局，无侧边栏（或可关闭侧边栏）
- 支持多语言（Multilingual Mode）
- 文章卡片使用缩略图（非全宽列表）
- 轻量，无 jQuery 依赖
- 支持 Open Graph、Twitter Card
- 可自定义颜色和字体

优先考虑的主题风格：Ananke、PaperMod、Congo、Hugo-book（需确认是否可关闭侧边栏）。

---

## 十一、下一步

1. **确定 Hugo 主题**（可回到本文档与 Hu 讨论选择）
2. **初始化 Hugo 站点**（`hugo new site chan-surf`）
3. **配置多语言**（config.toml 中设置 languages.en / languages.es）
4. **设计首页和文章页模板**（基于本文档第五、六章规格）
5. **创建 Archetypes 模板**（基于 10.2 节）
6. **录入 Buddhism 101 系列 30 篇文章**
7. **撰写 Start Here 页面内容**
8. **上线 + 提交 Search Console**

---

> 本文档不含代码和文案，仅描述结构、行为和设计约束。
> 任何实现层面的技术问题（如 Hugo 配置语法、CSS 具体数值等）应由开发者自行决定或与 Hu 沟通确认。
