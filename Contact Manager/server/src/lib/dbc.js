import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`Connected to database : ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    exit(1);
  }
};
