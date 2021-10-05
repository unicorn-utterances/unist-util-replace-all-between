// TypeScript Version: 3.5

import {Node, Parent} from 'unist';

/**
 * A unist utility to get all children of multiple different parents between two nodes or indices.
 *
 * @param parent Parent node to search in
 * @param start A node to start search with
 * @param end A node to end search with
 * @param func The function ran to change the nodes
 */
export default function findAllBetween<T extends Node>(
  parent: Parent,
  start: Node,
  end: Node,
  func: (node: Node[]) => Node[]
): Node[][];
