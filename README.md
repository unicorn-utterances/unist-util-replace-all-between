# unist-util-replace-all-between

[**unist**](https://github.com/syntax-tree/unist) utility to modify an existing child list to replace all elements between all
instances of two nodes

## Install

[npm](https://docs.npmjs.com/cli/install):

```sh
npm install unist-util-replace-all-between
```

## Usage

```js
import u from 'unist-builder'
import replaceAllBetween from 'unist-util-replace-all-between'

const tree = u('root', [
  u('start', '1'),
  u('node', [u('leaf', '2'), u('node', [u('leaf', '3')])]),
  u('end', '4'),
  u('middle', '1'),
  u('start', '1'),
  u('node', '2'),
  u('end', '4'),
])

const newChildren = replaceAllBetween(tree, {type: 'start'}, {type: 'end'}, () => [u('replaced', '1')])

console.dir(newChildren, {depth: null})
```

Yields:

```js
[
    { type: 'replaced', value: '1' },
    { type: 'middle', value: '2' },
    { type: 'replaced', value: '1' },
]
```

## API

### `replaceAllBetween(parent, start, end, func)`

Mutate an existing parent's children to reflect function return

Parent's children are only search. None of their children (or further down) are searched

###### Parameters

* `parent` ([`Parent`](https://github.com/syntax-tree/unist#parent))
    — Parent to walk through children of
* `start` ([`Test`](https://github.com/syntax-tree/unist-util-is)) — [`is`](https://github.com/syntax-tree/unist-util-is)-compatible test (such as a
    [type](https://github.com/syntax-tree/unist#type)) to find the start of each section
* `end` ([`Test`](https://github.com/syntax-tree/unist-util-is)) — [`is`](https://github.com/syntax-tree/unist-util-is)-compatible test (such as a
    [type](https://github.com/syntax-tree/unist#type)) to find the end of each section
* `func` ((`nodes`: [`Node[]`](https://github.com/syntax-tree/unist#node)) `=>` [`Node[]`](https://github.com/syntax-tree/unist#node)) — Function
    used to change nodes. Return value is then set to the parent.children value

###### Returns

[`Node[]`](https://github.com/syntax-tree/unist#node) — List of children from `parent` post-mutation
