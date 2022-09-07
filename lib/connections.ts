import dbConnect from "./dbConnect";

const db = dbConnect();

const connections = {
  movies: db.useDb("sample_mflix"),
  pets: db.useDb("pets"),
};

export default connections;
