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

  const content = {
    updated: Date.now(),
    data: q.data.submissions_dump
      .filter((s) => s.status_display === "Accepted")
      .map((s) => {
        return {
          id: s.id,
          slug: s.title_slug,
          title: s.title,
          code: s.code,
        };
      }),
  };

  fs.writeFileSync(questionsPath, JSON.stringify(content, null, 2));

  // prisma.user.findFirst({ where: { username: "arangol" } });
}

test();
