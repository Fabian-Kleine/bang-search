import mongoose from "mongoose"

const MONGODB_URI = process.env.DB_CONNECT || "";

export const connectDB = async () => {
    if (!MONGODB_URI) {
        throw new Error("Please define the DB_CONNECT environment variable inside .env.local");
    }
    console.log("Connecting to MongoDB...");
    mongoose.connect(MONGODB_URI);
};