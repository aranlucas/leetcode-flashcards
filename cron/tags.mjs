import fs from "fs";
import { tags } from "./util/tags.mjs";
import matter from "gray-matter";
import { createLeetCodeClient } from "./util/leetcode.mjs";

const sleep = (delay) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
};

const { instance } = await createLeetCodeClient({
  sessionId: process.env.LEETCODE_SESSION_TOKEN,
  csrf: process.env.LEETCODE_CSRF,
});

for (const tag of tags) {
  const tmp = "tmp/tag.json";
  const dbfile = fs.readFileSync(tmp) || "[]";
  const db = JSON.parse(dbfile) || [];

  const done = new Set(db);
  try {
    const slug = tag[1];
    console.log(`Processing ${slug}`);

    if (done.has(slug)) {
      console.log(`Skipping ${slug}`);
      continue;
    }

    const query = `
     query getTopicTag($slug: String!) {
        topicTag(slug: $slug) {
          name
          slug
          questions {
            status
          }
        }
      }
    `;
    const graphqlQuery = {
      query,
      variables: { slug },
    };

    const response = await instance.post("/graphql", graphqlQuery);

    // const response = { data: { data: { topicTag: { questions: [] } } } };
    const fileName = `content/learn/${slug}.md`;
    const file = matter.read(fileName);

    file.data.questionCount = response.data.data.topicTag.questions.length;

    fs.writeFileSync(fileName, file.stringify());
    db.push(slug);

    // Write tmp file to avoid re-running
    fs.writeFileSync(tmp, JSON.stringify(db));
    sleep(3000);
    // file written successfully
  } catch (err) {
    console.error(err);
  }
}
