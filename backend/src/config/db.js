import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDatabase() {
    try {
        await mongoose.connect(env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        // If the real Atlas URI fails, fall back to an in-memory database for local development.
        // This lets you run and test the API without needing working Atlas credentials.
        if (env.NODE_ENV === 'development') {
            console.warn('⚠️  Atlas connection failed. Falling back to in-memory MongoDB for development.');
            const { MongoMemoryServer } = await import('mongodb-memory-server');
            const mongoServer = await MongoMemoryServer.create();
            await mongoose.connect(mongoServer.getUri());
            console.log('✅ In-memory MongoDB connected (data resets on restart)');
        } else {
            console.error('MongoDB connection failed:', error.message);
            process.exit(1);
        }
    }
}
