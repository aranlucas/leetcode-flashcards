import fs from "fs-extra";
import matter from "gray-matter";
import { createLeetCodeClient } from "./util/leetcode.mjs";
import TurndownService from "turndown";
import { sleep } from "./util/sleep.mjs";

const { instance } = await createLeetCodeClient({
  sessionId: process.env.LEETCODE_SESSION_TOKEN,
  csrf: process.env.LEETCODE_CSRF,
});

const problems = await instance.get("/api/problems/algorithms/");

const questions = problems.data.stat_status_pairs.map((q) => {
  return {
    id: q.stat.question_id,
    title: q.stat.question__title,
    slug: q.stat.question__title_slug,
    status: q.status,
  };
});

const tmp = "tmp/questions.json";
const dbfile = fs.readFileSync(tmp) || "[]";
const db = JSON.parse(dbfile) || [];
const done = new Set(db);

const turndownService = new TurndownService();

for (const question of questions) {
  // for (const question of [{ slug: "two-sum" }]) {
  console.log(`Processing ${question.slug}`);

  if (done.has(question.slug)) {
    console.log(`Skipping ${question.slug}`);

    continue;
  }
  const query = `
      query questionData($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          title
          difficulty
          isPaidOnly
          metaData
          content
        }
      }
    `;
  const graphqlQuery = {
    query,
    variables: { titleSlug: question.slug },
  };
  const response = await instance.post("/graphql", graphqlQuery);
  const questionData = response.data.data.question;

  if (!questionData.content) {
    continue;
  }
  const markdown = turndownService.turndown(questionData.content);

  const fileName = `content/questions/${question.slug}/question.md`;

  fs.ensureFileSync(fileName);
  fs.writeFileSync(fileName, matter.stringify(markdown, question));

  done.add(question.slug);

  // Write tmp file to avoid re-running
  fs.writeFileSync(tmp, JSON.stringify(Array.from(done)));
  await sleep(3000);
}

// Empty cache
fs.writeFileSync(tmp, JSON.stringify([]));
