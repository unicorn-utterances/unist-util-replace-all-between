'use strict';

const is = require('unist-util-is');

function replaceAllBetween(parent, start, end, func) {
  if (!parent || !parent.type || !parent.children) {
    throw new Error('Expected parent node');
  }

  const {children} = parent;

  const isStart = node => is(node, start);
  const isEnd = node => is(node, end);

  /**
   * @type {Array<{start: number, end: number}>}
   */
  const ranges = children.reduce((prev, child, i) => {
    const lastPrev = prev[prev.length - 1];
    if (isStart(children[i])) {
      if (lastPrev && !lastPrev.end) {
        console.error('Attempted to start a second replacement before the first one was cleaned up');
        return prev;
      }
      prev.push({
        start: i
      });
      return prev;
    }
    if (isEnd(children[i])) {
      lastPrev.end = i;
    }
    return prev;
  }, []);

  // The function will return a different length than the original
  // This offset is used to correct
  let offset = 0;

  return ranges.map(({start, end}) => {
    const offsetStart = start + offset;
    const offsetEnd = end + offset;

    const replaced = children.slice(offsetStart, offsetEnd + 1);

    const changedArray = func(replaced);

    const diff = children.splice(offsetStart, offsetEnd - offsetStart + 1, ...changedArray);

    offset -= diff.length - changedArray.length;

    return changedArray;
  });
}

module.exports = replaceAllBetween;
