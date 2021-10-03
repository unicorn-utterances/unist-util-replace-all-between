'use strict';

const find = require('unist-util-find');

function replaceBetween(parent, start, end, func) {
  if (!parent || !parent.type || !parent.children) {
    throw new Error('Expected parent node');
  }

  const {children} = parent;

  const index = check(start);
  const length = check(end);

  const replaced = children.splice(index, length - index + 1);

  const changedArray = func(replaced);

  children.splice(index, 0, ...changedArray);

  return changedArray;

  function check(index) {
    if (index && index.type) {
      const node = find(parent, index);
      index = children.indexOf(node);
    }

    if (isNaN(index) || index < 0 || index === Infinity) {
      throw new Error('Expected positive finite index or child node');
    }

    if (index >= children.length) {
      index = children.length - 1;
    }

    return index;
  }
}

module.exports = replaceBetween;
