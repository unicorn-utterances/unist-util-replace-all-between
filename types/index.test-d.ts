import {Node, Parent} from 'unist';
import {expectError} from 'tsd';
import between = require('.');

const n1: Node = {type: 'a', value: 'a'};
const n2: Node = {type: 'b', value: 'b'};
const parent: Parent = {type: 'root', children: [n1, n2]};

/**
 * Incorrect number of arguments
 */
expectError(between());
expectError(between(parent));
expectError(between(parent, n1));
expectError(between(parent, n1, n2));

/**
 * Incorrect types of arguments
 */
expectError(between((v: Node[][]) => v));
expectError(between(parent, (v: Node[][]) => v));
expectError(between(parent, n1, (v: Node[][]) => v));

/**
 * Incorrect test type
 */
expectError(between(parent, n1, n2, true));

/**
 * Correct test type
 */
between(parent, n1, n2, (v) => v);
