import fs from "fs";
import path from "path";
import axios from "axios";

export async function createCSRFToken({ sessionId, csrf }) {
  const instance = axios.create({
    baseURL: "https://leetcode.com",
  });

  instance.defaults.headers.common.Cookie = `csrftoken=${csrf}; LEETCODE_SESSION=${sessionId};`;
  instance.defaults.headers.common.LEETCODE_SESSION = sessionId;
  instance.defaults.headers.common["X-CSRFToken"] = csrf;
  instance.defaults.headers.common["accept-encoding"] = "application/json";

  return { instance, session: sessionId, csrf };
}

const questionsPath = path.join(process.cwd(), "src/data/questions.json");

async function test() {
  const { instance } = await createCSRFToken({
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

  const content = {
    updated: Date.now(),
    data: unique,
  };

  fs.writeFileSync(questionsPath, JSON.stringify(content, null, 2));
}

test();
