---
title: Backtracking
questionCount: 94
---

Backtracking is a general algorithm for finding all (or some) solutions to some computational problems, notably constraint satisfaction problems, that incrementally builds candidates to the solutions, and abandons each partial candidate ("backtracks") as soon as it determines that the candidate cannot possibly be completed to a valid solution.

To solve a backtracking problem, you can follow these steps:

1. Identify the base case(s) for the problem, which is the point at which the problem cannot be further divided. This is typically when the input is small enough that it can be solved directly, or when there are no more decisions that can be made.
2. Divide the problem into smaller subproblems by making one or more choices. This is typically done by choosing one option from a set of available options, and recursively solving the subproblem created by that choice.
3. Solve the subproblems by recursively applying the backtracking algorithm to each subproblem. This typically involves making one or more choices and solving the resulting subproblems until a base case is reached.
4. Combine the solutions to the subproblems to create a solution to the original problem. This is typically done by combining the solutions to the subproblems in a way that satisfies the constraints of the original problem.
5. If the current partial candidate cannot be completed to a valid solution, backtrack to the previous decision point and try a different option. This involves undoing the choices made in the current branch of the search tree and trying a different option.

By repeating these steps, the backtracking algorithm systematically considers all possible solutions to the problem and returns a valid solution (if one exists) or determines that no solution exists.

## Types of Backtracking problems

There are many different types of backtracking problems, but some common examples include:

1. Constraint satisfaction problems, where the goal is to find a set of values that satisfy a given set of constraints. For example, the 8-queens problem is a classic constraint satisfaction problem where the goal is to place 8 queens on a chessboard so that no two queens attack each other.
2. Search problems, where the goal is to find a path through a graph or other discrete structure. For example, the knight's tour problem is a search problem where the goal is to find a sequence of moves for a knight on a chessboard such that the knight visits every square on the board exactly once.
3. Optimization problems, where the goal is to find the best solution to a problem according to some measure of "goodness". For example, the traveling salesmanperson problem is an optimization problem where the goal is to find the shortest possible route that visits a given set of cities and returns to the starting city.

In general, any problem that can be solved by systematically exploring a large space of potential solutions and pruning the search space when it is clear that certain solutions cannot be valid can be solved using backtracking.

## Template

```java
public void backtrack(/* some parameters */) {
  // Check if the current partial candidate solution is a valid solution
  if (isSolution(/* some parameters */)) {
    // If it is a valid solution, process it (e.g. print it, save it, etc.)
    processSolution(/* some parameters */);
  } else {
    // If it is not a valid solution, enumerate the possible next steps
    List<Integer> nextSteps = generateNextSteps(/* some parameters */);

    // Try each possible next step
    for (Integer nextStep : nextSteps) {
      // Make the next step and recursively search for solutions
      makeNextStep(nextStep);
      backtrack(/* some parameters */);
      // Undo the next step to prepare for trying the next one
      unmakeNextStep(nextStep);
    }
  }
}
```

Backtracking is a type of algorithm used to solve problems by exploring a set of potential solutions incrementally and eventually arriving at a final solution, or by determining that a final solution is not possible. It is a form of recursive trial and error that is typically used for combinatorial optimization problems. The algorithm works by first selecting a partial solution and then testing to see if that partial solution can be extended to a complete solution. If it can be extended, the solution is extended and tested; if it cannot be extended, the algorithm backtracks and tries another partial solution.

To perform backtracking, follow these steps:

1. Identify the problem and define the search space, or the set of potential solutions to the problem.
2. Define the decision points, or the choices that must be made at each step of the algorithm.
3. Start with the initial state and make a choice at the first decision point.
4. Advance to the next decision point and make a choice.

If the choice leads to a solution, return it. Otherwise, reverse the choice and try a different one.

Repeat step 5 until a solution is found or all choices have been exhausted.

If no solution was found, return "no solution" or backtrack to the previous decision point and try a different choice.

Repeat steps 6-7 until a solution is found or the initial state is reached.

For example, to solve a maze using backtracking, the search space would be the maze itself, and the decision points would be the possible paths at each junction. The algorithm would start at the entrance and make a choice at the first junction, then advance to the next junction and make another choice. If the choice leads to a dead end, the algorithm would backtrack and try a different path. It would repeat this process until it reaches the exit or all paths have been exhausted.