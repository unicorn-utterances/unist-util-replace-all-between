import {remark} from 'remark'
import replaceBetween from '../index.js';

const markdown = `
# Hello World!

This is a [Real page](https://google.com)

<!-- tabs:start -->

#### **English**

Hello!

#### **French**

Bonjour!

#### **Italian**

Ciao!

<!-- tabs:end -->

Testing

# Test
`;

// Create a plugin for remark
const plugin = () => (tree) => {
  // `start` and `end` nodes to look for, and find between.
  const start = {
    type: 'html',
    value: '<!-- tabs:start -->'
  };

  const end = {
    type: 'html',
    value: '<!-- tabs:end -->'
  };

  // Get lists between `start` and `end`
  replaceBetween(tree, start, end, list => {
    console.log(list)
    return [{
      type: 'html',
      value: '<p>Testing</p>'
    }]
  });

  // Return new tree
  return tree;
};

remark()
  .use(plugin)
  .process(markdown)
  .then((result) => console.log(result.toString()), console.error);

/**
 * Outputs:
 *
 * **List one:**
 *
 * - 1
 * - 2
 *
 * **List two:**
 *
 * - 3
 * - 4
 * - 5
 *
 */
