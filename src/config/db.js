import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDatabase() {
    try {
        await mongoose.connect(env.MONGODB_URI, {
            serverSelectionTimeoutMS: 15000,
            maxPoolSize: 10,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}
