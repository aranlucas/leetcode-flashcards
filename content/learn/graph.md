---
title: Graph
---

1. Understand the problem statement: read the problem carefully and make sure you understand what you are being asked to do. Pay attention to the specific constraints and requirements of the problem.
2. Identify the type of graph: determine whether the graph is directed or undirected, weighted or unweighted, and any other relevant properties.
3. Choose a graph traversal algorithm: based on the requirements of the problem, decide which algorithm is best suited to solving the problem. For example, if the problem involves finding the shortest path between two nodes, you may want to use Dijkstra's algorithm.
4. Come up with a plan: plan out how you will implement the chosen algorithm in code. This may involve defining appropriate data structures, such as adjacency lists or matrix, to represent the graph.
5. Implement the solution: write the code for your solution, following the plan you came up with in the previous step. Take care to consider any special properties of the graph (e.g. handling cycles in directed graphs) and to optimize your solution for efficiency.
6. Test your solution: run the test cases provided by LeetCode to ensure that your solution is correct and efficient. If any test cases fail, debug your code and try again.

```javascript
// create an empty stack and push the starting node onto it
stack = [start_node]

// create a set to store the nodes that have been visited
visited = set()

while stack is not empty:
  // pop the top node from the stack
  node = stack.pop()

  // mark the node as visited
  visited.add(node)

  // perform the desired operation on the node (e.g. calculate the shortest path)

  // get the neighbors of the current node
  neighbors = get_neighbors(node)

  // for each unvisited neighbor of the current node, push it onto the stack
  for neighbor in neighbors:
    if neighbor not in visited:
      stack.push(neighbor)
```
