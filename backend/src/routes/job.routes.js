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

    // ── Protected routes (require Admin JWT) ───────────────────
    app.post("/jobs", { onRequest: [app.requireAdmin] }, createJob);
    app.patch("/jobs/:id", { onRequest: [app.requireAdmin] }, updateJob);
    app.delete("/jobs/:id", { onRequest: [app.requireAdmin] }, deleteJob);
    app.get("/jobs/:id/clicks", { onRequest: [app.requireAdmin] }, getJobClicks);

    // ── Dev-only: seed sample data ───────────────────────────
    app.post("/dev/seed", { onRequest: [app.requireAdmin] }, seedJobs);
}
