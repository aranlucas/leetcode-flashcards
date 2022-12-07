---
title: Reservoir Sampling
---

Reservoir sampling is a family of randomized algorithms for randomly choosing elements from a given stream of data. The most common version is known as “reservoir sampling” and is used to select items from streaming data randomly. It is widely used to create a sample of data without reading the whole data set. The basic version of reservoir sampling works by processing items in the data stream one-by-one and for each item, randomly decide to keep it or discard it. When each item is processed, the set of “kept” items is updated so that a random sample is maintained.
