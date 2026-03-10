import { requireAuth } from "../middleware/auth.js";
import {
    applyToJob,
    createJob,
    deleteJob,
    getJob,
    getJobClicks,
    listJobs,
    seedJobs,
    updateJob
} from "../controllers/job.controller.js";

export async function jobRoutes(app) {
    // ── Public routes ────────────────────────────────────────
    app.get("/jobs", listJobs);
    app.get("/jobs/:id", getJob);
    app.get("/jobs/:id/apply", applyToJob);

    // ── Protected routes (require API key) ───────────────────
    app.post("/jobs", { preHandler: requireAuth }, createJob);
    app.patch("/jobs/:id", { preHandler: requireAuth }, updateJob);
    app.delete("/jobs/:id", { preHandler: requireAuth }, deleteJob);
    app.get("/jobs/:id/clicks", { preHandler: requireAuth }, getJobClicks);

    // ── Dev-only: seed sample data ───────────────────────────
    // Kept on a separate top-level path to avoid Fastify route conflicts
    app.post("/dev/seed", { preHandler: requireAuth }, seedJobs);
}
