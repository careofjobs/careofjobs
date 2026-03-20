import dotenv from "dotenv";

// Load regular .env variables manually into process.env
dotenv.config();

// Very simple object assigning default values or parsing environment strings
export const env = {
    PORT: parseInt(process.env.PORT) || 4000,
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGODB_URI: process.env.MONGODB_URI,
    API_ORIGIN: process.env.API_ORIGIN || "http://localhost:3000",
    API_KEY: process.env.API_KEY || "dev-secret-key-2024",

    // MySQL Config
    MYSQL_HOST: process.env.MYSQL_HOST || "127.0.0.1",
    MYSQL_PORT: parseInt(process.env.MYSQL_PORT) || 3306,
    MYSQL_USER: process.env.MYSQL_USER || "admin",
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "",
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || "jobapplication"
};

if (!env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in environment variables. Please check your .env file!");
}
