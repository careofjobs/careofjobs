import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import fastifyJwt from "@fastify/jwt";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { healthRoutes } from "./routes/health.routes.js";
import { authRoutes } from "./routes/auth.routes.js";
import { jobRoutes } from "./routes/job.routes.js";
import { contactRoutes } from "./routes/contact.routes.js";
import { JobModel } from "./models/Job.js";
import { sampleJobs } from "./controllers/job.controller.js";
import { initMySQL } from "./config/mysql.js";

const app = Fastify({ logger: true });

// Basic security and config
await app.register(cors, {
    origin: [env.API_ORIGIN, "http://localhost:5500", "http://localhost:3000", "http://localhost:5173",
        "http://localhost:5501"
    ],
    credentials: true
});
await app.register(helmet);
await app.register(rateLimit, { max: 200, timeWindow: "1 minute" });

// JWT registration
await app.register(fastifyJwt, {
    secret: env.API_KEY || 'supersecret'
});

// Authentication Decorator (Checks token)
app.decorate("authenticate", async function (request, reply) {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.status(401).send({ error: "Unauthorized access. Please login." });
    }
});

// Admin Decorator (Checks token + role)
app.decorate("requireAdmin", async function (request, reply) {
    try {
        await request.jwtVerify();
        if (request.user.role !== 'admin') {
            reply.status(403).send({ error: "Forbidden. Admin access required." });
        }
    } catch (err) {
        reply.status(401).send({ error: "Unauthorized access. Please login." });
    }
});

// Register app routes
await app.register(healthRoutes, { prefix: "/api" });
await app.register(authRoutes, { prefix: "/api/auth" });
await app.register(jobRoutes, { prefix: "/api" });
await app.register(contactRoutes, { prefix: "/api" });

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
    // Attempt database connections
    await connectDatabase();
    await initMySQL();

    // Automatically seed some dummy job data in development if the collection is empty
    if (env.NODE_ENV === "development") {
        const jobCount = await JobModel.countDocuments();
        if (jobCount === 0) {
            await JobModel.insertMany(sampleJobs);
            console.log(`Seeded ${sampleJobs.length} jobs for development`);
        } else {
            console.log(`Skipping seed; ${jobCount} job(s) already exist in the database.`);
        }
    }

    await app.listen({ host: "0.0.0.0", port: env.PORT });
    console.log(`Server is running on port http://localhost:${env.PORT}`);
} catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
}
