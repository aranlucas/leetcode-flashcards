import { Schema, models } from "mongoose";
import connection from "../lib/connections";

export interface IMovie {
  title: string;
  metacritic?: string;
  plot: string;
}

/* MovieSchema will correspond to a collection in your MongoDB database. */
const MovieSchema = new Schema<IMovie>({
  title: {
    /* The name of this Movie */
    type: String,
  },
  metacritic: {
    /* The owner of this Movie */
    type: String,
  },
  plot: {
    /* The owner of this Movie */
    type: String,
  },
});

export default models.Movie || connection.movies.model("Movie", MovieSchema);
