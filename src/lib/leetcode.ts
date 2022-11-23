import path from "path";
import fs from "fs";

export interface Question {
  title: string;
  id: string;
  slug: string;
  date: string;
}

const questionsPath = path.join(process.cwd(), "src/data/questions.json");

export function getQuestions(): Question[] {
  const fileContents = fs.readFileSync(questionsPath, "utf8");

  return JSON.parse(fileContents).data;
}

export function getQuestionData(id: string) {
  const questions = getQuestions();

  return questions.find((q) => (q.id = id));
}

export function getAllQuestionId() {
  const questions = getQuestions();

  return questions.map((question) => {
    return {
      params: {
        id: question.slug,
      },
    };
  });
}
