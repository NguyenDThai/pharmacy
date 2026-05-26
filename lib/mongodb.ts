import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Vui lòng định nghĩa biến MONGO_URI trong file .env');
}

declare global {
  var mongoose:
    | {
        conn: typeof import('mongoose') | null;
        promise: Promise<typeof import('mongoose')> | null;
      }
    | undefined;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
if (!globalThis.mongoose) {
  globalThis.mongoose = { conn: null, promise: null };
}
const cached = globalThis.mongoose!;

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI!, opts).then((mongoose) => {
      console.warn('=> Đã kết nối thành công tới MongoDB');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
