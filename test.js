import {test} from 'tap';
import findAllBetween from './index.js';

test('unist-util-find-all-between', (test) => {
  test.throws(() => {
    findAllBetween();
  }, 'Should fail without parent node');

  test.throws(() => {
    findAllBetween({type: 'foo'});
  }, 'Should fail without parent node');

  test.throws(() => {
    findAllBetween(
      {type: 'foo', children: [{type: 'start'}, {type: 'start'}]},
      {type: 'start'},
      {type: 'end'}
    );
  }, 'Tried getting a new start instead of ending');

  test.throws(() => {
    findAllBetween(
      {
        type: 'foo',
        children: [{type: 'start'}, {type: 'end'}, {type: 'start'}]
      },
      {type: 'start'},
      {type: 'end'}
    );
  }, 'No ending value was found');

  test.throws(() => {
    findAllBetween(
      {type: 'foo', children: [{type: 'end'}, {type: 'start'}]},
      {type: 'start'},
      {type: 'end'}
    );
  }, 'Attempted to end a replacement before finding the start');

  test.throws(() => {
    findAllBetween(
      {type: 'foo', children: [{type: 'start'}, {type: 'end'}, {type: 'end'}]},
      {type: 'start'},
      {type: 'end'}
    );
  }, 'Attempted to end a replacement before finding the start');

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
        {type: 'ooo'},
        {type: 'wow'},
        (v) => [{type: 'test', data: v.length}]
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
  }, 'Nothing was replaced');

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
        {type: 'foo'},
        {type: 'baz'},
        (v) => [{type: 'test', data: v.length}]
      ),
      [
        {
          type: 'test',
          data: 3
        }
      ]
    );
  }, 'Replaces single match with new output');

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
            },
            {
              type: 'hello'
            },

            {
              type: 'foo'
            },
            {
              type: 'what'
            },
            {
              type: 'another'
            },
            {
              type: 'baz'
            }
          ]
        },
        {type: 'foo'},
        {type: 'baz'},
        (v) => [{type: 'test', data: v.length}]
      ),
      [
        {
          type: 'test',
          data: 3
        },
        {
          type: 'hello'
        },
        {
          type: 'test',
          data: 4
        }
      ]
    );
  }, 'Replaces two matches with new output');

  test.end();
});
