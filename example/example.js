import {remark} from 'remark'
import {is} from 'unist-util-is';
import replaceAllBetween from '../all.js';

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


<!-- tabs:start -->

#### **English**

Hello!

#### **French**

Bonjour!

Telakjdsf

asdf

<!-- tabs:end -->

# Testing

![](asdf)
`;

/**
 * @typedef {Object} Section
 * @prop {string} header
 * @prop {any[]} range
 */

/**
 * @returns {Section[]}
 */
const getSections = (allChildren, headerIndexes) =>
  headerIndexes.map((_, i, arr) => {
    let [startIndex, endIndex] = [arr[i], arr[i + 1]];
    const header = allChildren[startIndex];
    startIndex += 1;

    return {
      header,
      range: allChildren.slice(startIndex, endIndex)
    };
  });

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
  replaceAllBetween(tree, start, end, list => {
    // Remove both `tabs` mention
    // list.shift();
    // list.pop()

    console.log({list});

    const headerIndexes = list
      .map((node, i) => is(node, {type: 'heading'}) && i)
      .filter(Number.isInteger)

    return [{
      type: 'html',
      value: headerIndexes.toString()
    }]

    // const sections = getSections(list, headerIndexes);
    //
    // const tabNodes = sections.map(section => {
    //   return {
    //     type: 'tab',
    //     heading: section.heading,
    //     children: section.range
    //   }
    // })
    //
    // return [{
    //   type: 'tabList',
    //   children: tabNodes
    // }]
  });

  // Return new tree
  return tree;
};

remark()
  .use(plugin)
  .process(markdown)
  .then((result) => console.log(result.toString()), console.error);
