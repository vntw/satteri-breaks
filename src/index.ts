import type { PhrasingContent } from 'mdast';
import { defineMdastPlugin } from 'satteri';

const lineEndingPattern = /\r\n?|\n/;

/**
 * Satteri-compatible copy of remark-breaks.
 *
 * Converts soft line endings inside mdast text nodes to hard break nodes,
 * matching remark-breaks without requiring the unified/remark pipeline.
 */
export const satteriBreaks = defineMdastPlugin({
  name: 'satteri-breaks',
  text(node, ctx) {
    if (!lineEndingPattern.test(node.value)) return;

    const children: PhrasingContent[] = [];

    for (const [index, value] of node.value.split(lineEndingPattern).entries()) {
      if (index > 0) {
        children.push({ type: 'break' });
      }

      if (value) {
        children.push({ type: 'text', value });
      }
    }

    ctx.replaceNode(node, children);
  },
});

export default satteriBreaks;
