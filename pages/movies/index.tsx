import { GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "../../components/layout";
import { getTopMovies, Movie } from "../../lib/movies";

export default function Index({
  movies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <h1>Top 1000 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
        {movies.map((movie: Movie) => (
          <li key={movie._id}>
            <h2>{movie.title}</h2>
            <h3>{movie.metacritic}</h3>
            <p>{movie.plot}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const movies = await getTopMovies();

  return {
    props: {
      movies: movies,
    },
  };
};
