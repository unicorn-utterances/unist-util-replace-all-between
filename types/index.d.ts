// TypeScript Version: 3.5

import {Node, Parent} from 'unist';

export = findAllBetween;

/**
 * A unist utility to get all children of a parent between two nodes or indices.
 *
 * @param parent Parent node to search in
 * @param start A node or index to start search with
 * @param end A node or index to end search with
 * @param func The function ran to change the nodes
 */
declare function findAllBetween<T extends Node>(
  parent: Parent,
  start: Node | number,
  end: Node | number,
  func: (val: Node[]) => Node[]
): Node[];
