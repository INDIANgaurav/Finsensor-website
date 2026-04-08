import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL!;

if (!DATABASE_URL) throw new Error("DATABASE_URL is not defined in .env.local");

// Cache connection across hot reloads in dev
const cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = 
  (global as unknown as { mongoose: typeof cached }).mongoose ?? { conn: null, promise: null };

(global as unknown as { mongoose: typeof cached }).mongoose = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(DATABASE_URL, { dbName: process.env.DATABASE_NAME });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
