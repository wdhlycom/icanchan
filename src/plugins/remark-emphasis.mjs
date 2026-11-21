/**
 * 正文强调标记插件。
 *
 * 站里中文正文用站酷小薇（只有 400 一档字重），合成粗体笔画会糊，
 * 所以加粗靠描边实现；而彩色强调需要额外的标记语法。
 *
 *   **文字**  → <strong>            加粗（CSS 里用描边，笔画锐利）
 *   ==文字==  → <span class="hl-gold">   赭金：重点词、关键短句
 *   ++文字++  → <span class="hl-seal">   朱砂：术语、专名、引文出处
 *
 * 只处理段落内的行内文字节点，不碰代码块、链接标题、HTML 块。
 */
import { visit } from 'unist-util-visit';

/* 顺序要紧：先把 ++ 和 == 摘出来，剩下的 ** 交给 remark 原生的 strong 处理。
   所以这里只处理 ++ 和 ==，不去碰 **。 */
const RULES = [
  { re: /\+\+([^\s+][^+]*?)\+\+/g, cls: 'hl-seal' },
  { re: /==([^=\s][^=]*?)==/g, cls: 'hl-gold' },
];

/* 这些节点里的文本不能动：代码、链接地址、行内代码、图片 alt */
const SKIP = new Set(['inlineCode', 'code', 'html', 'link', 'image', 'definition']);

function splitText(text) {
  // 返回 [{type:'text'|'mark', value, cls?}]
  let nodes = [{ type: 'text', value: text }];
  for (const rule of RULES) {
    const next = [];
    for (const node of nodes) {
      if (node.type !== 'text' || !rule.re.test(node.value)) {
        next.push(node);
        continue;
      }
      rule.re.lastIndex = 0;
      let last = 0;
      let m;
      while ((m = rule.re.exec(node.value)) !== null) {
        if (m.index > last) next.push({ type: 'text', value: node.value.slice(last, m.index) });
        next.push({ type: 'mark', value: m[1], cls: rule.cls });
        last = m.index + m[0].length;
      }
      if (last < node.value.length) next.push({ type: 'text', value: node.value.slice(last) });
    }
    nodes = next;
  }
  return nodes;
}

export default function remarkEmphasis() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || SKIP.has(parent.type)) return;
      const value = node.value;
      if (!value.includes('==') && !value.includes('++')) return;

      const parts = splitText(value);
      if (parts.length === 1 && parts[0].type === 'text') return;

      const replacement = [];
      for (const part of parts) {
        if (part.type === 'text') {
          replacement.push({ type: 'text', value: part.value });
        } else {
          replacement.push({
            type: 'html',
            value: `<span class="${part.cls}">${part.value}</span>`,
          });
        }
      }
      parent.children.splice(index, 1, ...replacement);
      return index + replacement.length;
    });
  };
}
