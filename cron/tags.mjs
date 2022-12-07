import fs from "fs";

const tags = [
  ["Array", "/tag/array"],
  ["String", "/tag/string"],
  ["Hash Table", "/tag/hash-table"],
  ["Dynamic Programming", "/tag/dynamic-programming"],
  ["Math", "/tag/math"],
  ["Sorting", "/tag/sorting"],
  ["Greedy", "/tag/greedy"],
  ["Depth-First Search", "/tag/depth-first-search"],
  ["Database", "/tag/database"],
  ["Breadth-First Search", "/tag/breadth-first-search"],
  ["Tree", "/tag/tree"],
  ["Binary Search", "/tag/binary-search"],
  ["Matrix", "/tag/matrix"],
  ["Binary Tree", "/tag/binary-tree"],
  ["Two Pointers", "/tag/two-pointers"],
  ["Bit Manipulation", "/tag/bit-manipulation"],
  ["Stack", "/tag/stack"],
  ["Heap (Priority Queue)", "/tag/heap-priority-queue"],
  ["Design", "/tag/design"],
  ["Graph", "/tag/graph"],
  ["Prefix Sum", "/tag/prefix-sum"],
  ["Simulation", "/tag/simulation"],
  ["Backtracking", "/tag/backtracking"],
  ["Counting", "/tag/counting"],
  ["Sliding Window", "/tag/sliding-window"],
  ["Linked List", "/tag/linked-list"],
  ["Union Find", "/tag/union-find"],
  ["Ordered Set", "/tag/ordered-set"],
  ["Monotonic Stack", "/tag/monotonic-stack"],
  ["Enumeration", "/tag/enumeration"],
  ["Recursion", "/tag/recursion"],
  ["Trie", "/tag/trie"],
  ["Divide and Conquer", "/tag/divide-and-conquer"],
  ["Binary Search Tree", "/tag/binary-search-tree"],
  ["Bitmask", "/tag/bitmask"],
  ["Queue", "/tag/queue"],
  ["Memoization", "/tag/memoization"],
  ["Geometry", "/tag/geometry"],
  ["Segment Tree", "/tag/segment-tree"],
  ["Topological Sort", "/tag/topological-sort"],
  ["Hash Function", "/tag/hash-function"],
  ["Game Theory", "/tag/game-theory"],
  ["Binary Indexed Tree", "/tag/binary-indexed-tree"],
  ["Number Theory", "/tag/number-theory"],
  ["Interactive", "/tag/interactive"],
  ["String Matching", "/tag/string-matching"],
  ["Rolling Hash", "/tag/rolling-hash"],
  ["Shortest Path", "/tag/shortest-path"],
  ["Data Stream", "/tag/data-stream"],
  ["Combinatorics", "/tag/combinatorics"],
  ["Randomized", "/tag/randomized"],
  ["Monotonic Queue", "/tag/monotonic-queue"],
  ["Brainteaser", "/tag/brainteaser"],
  ["Merge Sort", "/tag/merge-sort"],
  ["Iterator", "/tag/iterator"],
  ["Concurrency", "/tag/concurrency"],
  ["Doubly-Linked List", "/tag/doubly-linked-list"],
  ["Probability and Statistics", "/tag/probability-and-statistics"],
  ["Quickselect", "/tag/quickselect"],
  ["Bucket Sort", "/tag/bucket-sort"],
  ["Suffix Array", "/tag/suffix-array"],
  ["Minimum Spanning Tree", "/tag/minimum-spanning-tree"],
  ["Counting Sort", "/tag/counting-sort"],
  ["Shell", "/tag/shell"],
  ["Line Sweep", "/tag/line-sweep"],
  ["Reservoir Sampling", "/tag/reservoir-sampling"],
  ["Eulerian Circuit", "/tag/eulerian-circuit"],
  ["Radix Sort", "/tag/radix-sort"],
  ["Strongly Connected Component", "/tag/strongly-connected-component"],
  ["Rejection Sampling", "/tag/rejection-sampling"],
  ["Biconnected Component", "/tag/biconnected-component"],
];

tags.forEach((tag) => {
  try {
    const content = `---
title: ${tag[0]}
---
    `;
    const slug = tag[1].split("/")[2];
    fs.writeFileSync(`content/learn/${slug}.md`, content);
    // file written successfully
  } catch (err) {
    console.error(err);
  }
});
