import fs from "fs-extra";
import matter from "gray-matter";
import { createLeetCodeClient } from "./util/leetcode.mjs";

const { instance } = await createLeetCodeClient({
  sessionId: process.env.LEETCODE_SESSION_TOKEN,
  csrf: process.env.LEETCODE_CSRF,
});

const problems = await instance.get("/api/problems/algorithms/");

console.log(problems.data);

const questions = problems.data.stat_status_pairs.map((q) => {
  return {
    id: q.stat.question_id,
    title: q.stat.question__title,
    slug: q.stat.question__title_slug,
  };
});

for (const question of questions) {
  const fileName = `content/questions/${question.slug}/question.md`;

  fs.writeFileSync(fileName, matter.stringify("", question));
}
