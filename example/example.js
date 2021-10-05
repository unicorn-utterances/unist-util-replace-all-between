import {remark} from 'remark';
import replaceAllBetween from '../index.js';

const markdown = `
# Hello World!

This is a [Real page](https://google.com)

<!-- hello:start -->

Ciao!

<!-- hello:end -->

Testing

# Test


<!-- hello:start -->

Hello!

<!-- hello:end -->

# Testing

![](asdf)
`;

// Create a plugin for remark
const plugin = () => (tree) => {
  // `start` and `end` nodes to look for, and find between.
  const start = {
    type: 'html',
    value: '<!-- hello:start -->'
  };

  const end = {
    type: 'html',
    value: '<!-- hello:end -->'
  };

  // Get lists between `start` and `end`
  replaceAllBetween(tree, start, end, (list) => {
    // Remove both `tabs` mention
    list.shift();
    list.pop();

    for (const node of list) {
      for (const child of node.children) {
        child.value += '! This is cool!';
      }
    }

    return list;
  });

  // Return new tree
  return tree;
};

remark()
  .use(plugin)
  .process(markdown)
  .then((result) => console.log(result.toString()), console.error);
