import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { getTopMovies } from "../../lib/movies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const movies = await getTopMovies();

  res.json(movies);
}
