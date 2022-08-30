import { createConnection } from "mongoose";

if (process.env.MONGODB_URI == null) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

const uri: string = process.env.MONGODB_URI;

const connections = {
  movies: createConnection(uri, { dbName: "sample_mflix" }),
  pets: createConnection(uri, { dbName: "pets" }),
};

export default connections;
