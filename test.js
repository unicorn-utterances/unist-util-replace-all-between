'use strict';

const {test} = require('tap');
const findAllBetween = require('.');

test('unist-util-find-all-between', (test) => {
  test.throws(() => {
    findAllBetween();
  }, 'Should fail without parent node');

  test.throws(() => {
    findAllBetween({type: 'foo'});
  }, 'Should fail without parent node');

  test.doesNotThrow(() => {
    test.throws(() => {
      findAllBetween({type: 'foo', children: []});
    }, 'Expected positive finite index or child node');

    test.throws(() => {
      findAllBetween({type: 'foo', children: []}, -1);
    }, 'Expected positive finite index or child node');

    test.throws(() => {
      findAllBetween({type: 'foo', children: []}, {type: 'bar'});
    }, 'Expected positive finite index or child node');

    test.throws(() => {
      findAllBetween({type: 'foo', children: []}, 1, {type: 'bar'});
    }, 'Expected positive finite index or child node');
  }, 'Should fail without index');

  test.doesNotThrow(() => {
    test.ok(
      findAllBetween(
        {
          type: 'foo',
          children: [
            {
              type: 'foo'
            },
            {
              type: 'bar'
            }
          ]
        },
        0,
        1,
        (v) => v
      )
    );
  }, 'Should not throw with `unist-util-is` >= 4.0.0');

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
        (v) => v
      ),
      [
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
    );
  }, 'Expects identity function to return the same');

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
