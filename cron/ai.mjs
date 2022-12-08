import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import { tags } from "./util/tags.mjs";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

for (const tag of tags) {
  try {
    const slug = tag[1].split("/")[2];
    const filename = `content/learn/${slug}.md`;
    console.log(filename);

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
