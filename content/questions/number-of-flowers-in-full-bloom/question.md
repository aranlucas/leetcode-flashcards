---
id: 2334
title: Number of Flowers in Full Bloom
slug: number-of-flowers-in-full-bloom
status: null
---

You are given a **0-indexed** 2D integer array `flowers`, where `flowers[i] = [starti, endi]` means the `ith` flower will be in **full bloom** from `starti` to `endi` (**inclusive**). You are also given a **0-indexed** integer array `persons` of size `n`, where `persons[i]` is the time that the `ith` person will arrive to see the flowers.

Return _an integer array_ `answer` _of size_ `n`_, where_ `answer[i]` _is the **number** of flowers that are in full bloom when the_ `ith` _person arrives._

**Example 1:**

![](https://assets.leetcode.com/uploads/2022/03/02/ex1new.jpg)

**Input:** flowers = \[\[1,6\],\[3,7\],\[9,12\],\[4,13\]\], persons = \[2,3,7,11\]
**Output:** \[1,2,2,2\]
**Explanation:** The figure above shows the times when the flowers are in full bloom and when the people arrive.
For each person, we return the number of flowers in full bloom during their arrival.

**Example 2:**

![](https://assets.leetcode.com/uploads/2022/03/02/ex2new.jpg)

**Input:** flowers = \[\[1,10\],\[3,3\]\], persons = \[3,3,2\]
**Output:** \[2,2,1\]
**Explanation:** The figure above shows the times when the flowers are in full bloom and when the people arrive.
For each person, we return the number of flowers in full bloom during their arrival.

**Constraints:**

- `1 <= flowers.length <= 5 * 104`
- `flowers[i].length == 2`
- `1 <= starti <= endi <= 109`
- `1 <= persons.length <= 5 * 104`
- `1 <= persons[i] <= 109`
