// globals.d.ts
declare module globalThis {
  let mongoose: {
    conn: MongoConnection | null;
    promise: Promise<MongoConnection> | null;
  };
}
