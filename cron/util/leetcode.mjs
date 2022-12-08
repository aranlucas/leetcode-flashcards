import axios from "axios";

export async function createLeetCodeClient({ sessionId, csrf }) {
  const instance = axios.create({
    baseURL: "https://leetcode.com",
  });

  instance.defaults.headers.common.Cookie = `csrftoken=${csrf}; LEETCODE_SESSION=${sessionId};`;
  instance.defaults.headers.common.LEETCODE_SESSION = sessionId;
  instance.defaults.headers.common["X-CSRFToken"] = csrf;
  instance.defaults.headers.common["accept-encoding"] = "application/json";

  return { instance, session: sessionId, csrf };
}
