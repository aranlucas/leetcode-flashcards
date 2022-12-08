import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import { tags } from "./util/tags.mjs";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const done = [
  "content/learn/array.md",
  "content/learn/backtracking.md",
  "content/learn/binary-search.md",
  "content/learn/binary-tree.md",
  "content/learn/bit-manipulation.md",
  "content/learn/breadth-first-search.md",
  "content/learn/database.md",
  "content/learn/depth-first-search.md",
  "content/learn/design.md",
  "content/learn/dynamic-programming.md",
  "content/learn/graph.md",
  "content/learn/greedy.md",
  "content/learn/hash-table.md",
  "content/learn/heap-priority-queue.md",
  "content/learn/math.md",
  "content/learn/matrix.md",
  "content/learn/prefix-sum.md",
  "content/learn/simulation.md",
  "content/learn/sorting.md",
  "content/learn/stack.md",
  "content/learn/string.md",
  "content/learn/tree.md",
  "content/learn/two-pointers.md",
  "content/learn/sliding-window.md",
  "content/learn/linked-list.md",
  "content/learn/union-find.md",
  "content/learn/ordered-set.md",
  "content/learn/monotonic-stack.md",
  "content/learn/enumeration.md",
  "content/learn/recursion.md",
  "content/learn/trie.md",
];

const doneSet = new Set(done);
for (const tag of tags) {
  try {
    const slug = tag[1].split("/")[2];
    const filename = `content/learn/${slug}.md`;
    console.log(filename);
    if (doneSet.has(filename)) {
      console.log("skipping");
      continue;
    }
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: [`What is ${tag[0]}`],
      max_tokens: 2000,
    });

    console.log(completion.data);

    const prev = fs.readFileSync(filename);
    const content = `${prev}
${completion.data.choices[0].text}
`;

    fs.writeFileSync(filename, content);
    // file written successfully
  } catch (err) {
    console.error(err);
  }
}
