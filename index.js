'use strict';

const is = require('unist-util-is');

function replaceAllBetween(parent, start, end, func) {
  if (!parent || !parent.type || !parent.children) {
    throw new Error('Expected parent node');
  }

  const {children} = parent;

  const isStart = (node) => is(node, start);
  const isEnd = (node) => is(node, end);

  /**
   * @type {Array<{start: number, end: number}>}
   */
  const ranges = children.reduce((previous, child, i) => {
    const lastPrevious = previous[previous.length - 1];
    if (isStart(children[i])) {
      if (lastPrevious && lastPrevious.end === undefined) {
        console.error(
          'Attempted to start a replacement before the first one was cleaned up'
        );
        throw new Error(
          'Attempted to start a replacement before the first one was cleaned up'
        );
      }

      previous.push({
        start: i
      });
      return previous;
    }

    if (isEnd(children[i])) {
      if (!lastPrevious || (lastPrevious && lastPrevious.start === undefined)) {
        console.error(
          'Attempted to end a replacement before finding the start',
          i,
          lastPrevious
        );
        throw new Error(
          'Attempted to end a replacement before finding the start'
        );
      }

      lastPrevious.end = i;
    }

    return previous;
  }, []);

  if (!ranges[ranges.length - 1].end) {
    console.error('No ending value was found');
    throw new Error('No ending value was found');
  }

  // The function will return a different length than the original
  // This offset is used to correct
  let offset = 0;

  ranges.map(({start, end}) => {
    const offsetStart = start + offset;
    const offsetEnd = end + offset;

    const replaced = children.slice(offsetStart, offsetEnd + 1);

    const changedArray = func(replaced);

    const diff = children.splice(
      offsetStart,
      offsetEnd - offsetStart + 1,
      ...changedArray
    );

    offset -= diff.length - changedArray.length;

    return changedArray;
  });

  return children;
}

module.exports = replaceAllBetween;
