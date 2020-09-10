const babel = require('@babel/core');
const path = require('path');
const fs = require('fs').promises;
const mdx = require('@mdx-js/mdx');
const matter = require('gray-matter');
const stringifyObject = require('stringify-object');

module.exports = function plugin() {
  return {
    name: 'snowpack-plugin-mdx',
    resolve: {
      input: ['.md', '.mdx'],
      output: ['.js'],
    },
    async load({ filePath }) {
      if (!/\.md$|\.mdx$/.test(filePath)) {
        return null;
      }

      const src = await fs.readFile(filePath, 'utf-8');
      const { content, data } = matter(src);

      const mdxResult = await mdx(content, {
        filepath: path.resolve(filePath),
        remarkPlugins: [
          [require('remark-docz')],
          [require('remark-breaks')],
          [require('remark-emoji'), { padSpaceAfter: true }],
        ],
        rehypePlugins: [
          [require('rehype-docz')],
        ],
      });

      const code = `
import React from 'react';
import { mdx } from '@mdx-js/react';

export const metadata = ${stringifyObject(data)};

${mdxResult}
`;

      const config = babel.loadPartialConfig({ filename: filePath });
      const transformOptions = config?.options;
      const { code: transpiled } =
      (await babel.transformAsync(code, transformOptions)) || {};

      return {
        '.js': transpiled,
      };
    },
  };
};
