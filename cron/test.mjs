import fs from "fs";
import path from "path";
import { createLeetCodeClient } from "./util/leetcode.mjs";

const questionsPath = path.join(process.cwd(), "src/data/questions.json");

const { instance } = await createLeetCodeClient({
  sessionId: process.env.LEETCODE_SESSION_TOKEN,
  csrf: process.env.LEETCODE_CSRF,
});

const q = await instance.get(`/api/submissions/`);

const data = q.data.submissions_dump
  .filter((s) => s.status_display === "Accepted")
  .map((s) => {
    return {
      id: s.title_slug,
      slug: s.title_slug,
      title: s.title,
      code: s.code,
    };
  });
const fileContents = fs.readFileSync(questionsPath, "utf8");

const questions = JSON.parse(fileContents).data;
const allQuestions = [...questions, ...data];

const unique = [...new Map(allQuestions.map((m) => [m.id, m])).values()];

const final = [];
for (const q of unique) {
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
    variables: { titleSlug: q.slug },
  };

  const response = await instance.post("/graphql", graphqlQuery);
  const questionData = response.data.data.question;
  const companyTagStats = JSON.parse(questionData.companyTagStats);

  const companies = [];
  ["1", "2"].forEach((section) => {
    companyTagStats[section].forEach((c) => {
      companies.push({
        name: c.name,
        slug: c.slug,
        frequency: c.timesEncountered,
      });
    });
  });
  q.title = questionData.title;
  q.difficulty = questionData.difficulty;
  q.premium = questionData.is_paid_only;
  q.content = questionData.content;
  q.companies = companies.sort((a, b) => a.frequency > b.frequency);
  final.push(q);
}

const content = {
  updated: Date.now(),
  data: final,
};

fs.writeFileSync(questionsPath, JSON.stringify(content, null, 2));
