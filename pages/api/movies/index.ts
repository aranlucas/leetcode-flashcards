import { NextApiRequest, NextApiResponse } from "next";
import Movie from "../../../models/movie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const movies = await Movie.find({}).limit(20);

  res.status(200).json({ success: true, data: movies });
}

