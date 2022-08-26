import clientPromise from "./mongodb";

export type Movie = {
  _id: string;
  title: string;
  metacritic: string;
  plot: string;
};

export async function getTopMovies() {
  const client = await clientPromise;

  const db = client.db("sample_mflix");

  const movies = await db
    .collection<Movie>("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  return JSON.parse(JSON.stringify(movies));
}
