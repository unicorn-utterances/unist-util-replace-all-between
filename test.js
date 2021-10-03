'use strict';

const {test} = require('tap');
const findAllBetween = require('.');

test('unist-util-find-all-between', (test) => {

  test.doesNotThrow(() => {
    test.deepEqual(
      findAllBetween(
        {
          type: 'foo',
          children: [
            {
              type: 'foo'
            },
            {
              type: 'bar'
            },
            {
              type: 'baz'
            }
          ]
        },
        0,
        2,
        (v) => [{type: 'test', data: v.length}]
      ),
      [
        {
          type: 'test',
          data: 3
        }
      ]
    );
  }, 'Replaces range with new output');

  test.end();
});
