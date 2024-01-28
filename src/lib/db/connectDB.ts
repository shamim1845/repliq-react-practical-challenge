import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;
const options = {};

if (!URI) throw new Error("Please add your Mongo URI to .env.local file");

export const connectDb = () => {
  mongoose
    .connect(URI, options)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => console.log(err));
};
