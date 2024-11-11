import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Cache the MongoDB connection globally to avoid creating multiple connections
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If connection already exists, return it

  
  if (cached.conn) {
    return cached.conn;
  }

  // If connection promise doesn't exist, create it
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "TrackyNext", // Specify database name
        connectTimeoutMS: 1000 * 60 * 5, // Set connection timeout
      })
      .then((mongoose) => {
        return mongoose;
      });
  }

  // Wait for the connection promise to resolve
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
