import dbConnect from "./dbConnect";

const connections = {
  movies: dbConnect().useDb("sample_mflix"),
  pets: dbConnect().useDb("pets"),
};

export default connections;
