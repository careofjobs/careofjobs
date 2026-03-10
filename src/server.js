import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { healthRoutes } from "./routes/health.routes.js";
import { jobRoutes } from "./routes/job.routes.js";

const app = Fastify({ logger: true });

// Basic security and config
await app.register(cors, { origin: env.API_ORIGIN || true, credentials: true });
await app.register(helmet);
await app.register(rateLimit, { max: 200, timeWindow: "1 minute" });

// Register app routes
await app.register(healthRoutes, { prefix: "/api" });
await app.register(jobRoutes, { prefix: "/api" });

// Simple global error handler
app.setErrorHandler((error, request, reply) => {
    app.log.error(error);
    const statusCode = error.statusCode || 500;
    reply.status(statusCode).send({
        error: error.message || "Internal Server Error"
    });
});

// Start the database and the server
try {
    await connectDatabase();
    await app.listen({ host: "0.0.0.0", port: env.PORT });
    console.log(`Server is running on port ${env.PORT}`);
} catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
}
