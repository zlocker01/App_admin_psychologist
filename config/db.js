import mongoose from "mongoose";

// conection to DB

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'PsychoTracker',
    });

    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(`MongoDB connected on ${url}`);
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
};