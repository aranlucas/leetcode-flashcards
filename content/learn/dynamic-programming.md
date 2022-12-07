---
title: Dynamic Programming
---

## What is it?

Dynamic programming is a method of solving complex problems by breaking them down into simpler subproblems. It typically involves breaking a problem down into subproblems, and then using the solutions to those subproblems to solve the original problem. Dynamic programming is used primarily for optimization problems, as it takes advantage of overlapping subproblems, making the computation process more efficient.

Once you have identified that the problem can be solved using dynamic programming, the next step is to devise a recursive solution to the problem. This involves defining a recursive function that takes as input the parameters of the problem and returns the solution to the subproblem defined by those parameters. The function should then call itself recursively on each subproblem, combining the solutions to the subproblems to construct the solution to the original problem.

Once you have a recursive solution to the problem, you can use dynamic programming to improve its efficiency by storing the solutions to the subproblems in a table or array and using those stored solutions to avoid recomputing the same subproblems multiple times. This is known as memoization, and it can significantly improve the time complexity of the algorithm.

To solve a dynamic programming problem on LeetCode, you would follow these steps:

1. Identify that the problem can be solved using dynamic programming.
2. Devise a recursive solution to the problem.
3. Use memoization to improve the efficiency of the recursive solution.
4. Implement and test the solution in the LeetCode editor.
