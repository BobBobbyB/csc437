import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export function connect(dbname: string) {
  const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER } = process.env;

  const uri = MONGO_USER && MONGO_PWD && MONGO_CLUSTER
    ? `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${dbname}?retryWrites=true&w=majority`
    : `mongodb://localhost:27017/${dbname}`;

  mongoose.set("debug", true);
  mongoose
    .connect(uri)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err: unknown) => console.error("MongoDB connection error:", err))
}
