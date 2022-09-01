import mongoose, { ConnectOptions } from "mongoose";

if (process.env.MONGODB_URI == null) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

const uri: string = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null };
}

function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  const opts: ConnectOptions = {
    bufferCommands: true,
  };

  cached.conn = mongoose.createConnection(uri, opts);

  return cached.conn;
}

export default dbConnect;
