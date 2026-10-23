import { describe, it, expect } from 'vitest';
import { markdownToHtml } from 'satteri';
import { satteriBreaks } from '../src/index';

describe('satteriBreaks', () => {
  it.each([
    {
      name: 'converts soft line breaks inside text nodes to hard breaks (<br>)',
      input: 'hello\nworld',
      expected: '<p>hello<br>\nworld</p>',
    },
    {
      name: 'keeps normal text without line breaks untouched',
      input: 'hello world',
      expected: '<p>hello world</p>',
    },
    {
      name: 'converts Windows line endings (CRLF)',
      input: 'hello\r\nworld',
      expected: '<p>hello<br>\nworld</p>',
    },
    {
      name: 'converts legacy Mac line endings (CR)',
      input: 'hello\rworld',
      expected: '<p>hello<br>\nworld</p>',
    },
    {
      name: 'converts multiple consecutive soft line breaks',
      input: 'hello\nworld\nagain',
      expected: '<p>hello<br>\nworld<br>\nagain</p>',
    },
    {
      name: 'preserves paragraph boundaries',
      input: 'hello\n\nworld',
      expected: '<p>hello</p>\n<p>world</p>',
    },
    {
      name: 'preserves inline Markdown formatting',
      input: 'hello *beautiful*\nworld',
      expected: '<p>hello <em>beautiful</em><br>\nworld</p>',
    },
  ])('$name', ({ input, expected }) => {
    const { html } = markdownToHtml(input, {
      mdastPlugins: [satteriBreaks],
    });

    expect(html.trim()).toBe(expected);
  });
});

