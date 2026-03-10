import mongoose from "mongoose";
import { env } from "../config/env.js";
import { JobClickModel } from "../models/JobClick.js";
import { JobModel } from "../models/Job.js";

// Helper checking if ID is valid MongoDB format
function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

// ──────────────────────────────────────────────────────────
// GET /api/jobs
// Query params: page, limit, search, locationType, employmentType, tag
// ──────────────────────────────────────────────────────────
export async function listJobs(request, reply) {
    try {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        const skip = (page - 1) * limit;

        const { search, locationType, employmentType, tag } = request.query;

        // Build simple MongoDB filter object
        const filter = { isActive: true };

        if (search) filter.$text = { $search: search };
        if (locationType) filter.locationType = locationType;
        if (employmentType) filter.employmentType = employmentType;
        if (tag) filter.tags = tag;

        // Sort by text search score, or newest first
        let sort = { createdAt: -1 };
        if (search) sort = { score: { $meta: "textScore" } };

        const jobs = await JobModel.find(filter).sort(sort).skip(skip).limit(limit).lean();
        const total = await JobModel.countDocuments(filter);

        return reply.send({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            jobs
        });
    } catch (error) {
        return reply.status(500).send({ error: "Failed to fetch jobs" });
    }
}

// ──────────────────────────────────────────────────────────
// GET /api/jobs/:id
// ──────────────────────────────────────────────────────────
export async function getJob(request, reply) {
    const id = request.params.id;

    if (!isValidId(id)) {
        return reply.status(400).send({ error: "Invalid job ID format" });
    }

    try {
        const job = await JobModel.findById(id).lean();

        if (!job || !job.isActive) {
            return reply.status(404).send({ error: "Job not found" });
        }

        return reply.send(job);
    } catch (error) {
        return reply.status(500).send({ error: "Failed to fetch job details" });
    }
}

// ──────────────────────────────────────────────────────────
// POST /api/jobs  (protected)
// ──────────────────────────────────────────────────────────
export async function createJob(request, reply) {
    try {
        const jobData = request.body;

        // Simple manual validation for required fields
        if (!jobData.title || !jobData.company || !jobData.shortDescription) {
            return reply.status(400).send({ error: "Title, company, and shortDescription are required" });
        }

        const newJob = await JobModel.create(jobData);
        return reply.status(201).send(newJob);
    } catch (error) {
        return reply.status(400).send({ error: error.message || "Failed to create job" });
    }
}

// ──────────────────────────────────────────────────────────
// PATCH /api/jobs/:id  (protected)
// ──────────────────────────────────────────────────────────
export async function updateJob(request, reply) {
    const id = request.params.id;

    if (!isValidId(id)) {
        return reply.status(400).send({ error: "Invalid job ID format" });
    }

    try {
        const updatedJob = await JobModel.findByIdAndUpdate(
            id,
            request.body,
            { new: true, runValidators: true }
        ).lean();

        if (!updatedJob) {
            return reply.status(404).send({ error: "Job not found" });
        }

        return reply.send(updatedJob);
    } catch (error) {
        return reply.status(400).send({ error: error.message || "Failed to update job" });
    }
}

// ──────────────────────────────────────────────────────────
// DELETE /api/jobs/:id  (protected – soft delete)
// ──────────────────────────────────────────────────────────
export async function deleteJob(request, reply) {
    const id = request.params.id;

    if (!isValidId(id)) {
        return reply.status(400).send({ error: "Invalid job ID format" });
    }

    try {
        // We do a soft delete by setting isActive to false instead of actually deleting
        const job = await JobModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).lean();

        if (!job) {
            return reply.status(404).send({ error: "Job not found" });
        }

        return reply.status(204).send();
    } catch (error) {
        return reply.status(400).send({ error: "Failed to delete job" });
    }
}

// ──────────────────────────────────────────────────────────
// GET /api/jobs/:id/apply  (public)
// Tracks the click then redirects to the outside job link
// ──────────────────────────────────────────────────────────
export async function applyToJob(request, reply) {
    const id = request.params.id;

    if (!isValidId(id)) {
        return reply.status(400).send({ error: "Invalid job ID format" });
    }

    try {
        const job = await JobModel.findById(id).lean();

        if (!job || !job.isActive) {
            return reply.status(404).send({ error: "Job not found" });
        }

        // Record the click in the background so we don't slow down the redirect
        JobClickModel.create({
            jobId: job._id,
            sourceUrl: job.sourceUrl,
            ipAddress: request.ip,
            userAgent: request.headers["user-agent"]
        }).catch(err => console.error("Failed to save click:", err));

        // Redirect the user to the actual company application URL
        return reply.redirect(job.sourceUrl);
    } catch (error) {
        return reply.status(500).send({ error: "Failed to apply to job" });
    }
}

// ──────────────────────────────────────────────────────────
// GET /api/jobs/:id/clicks  (protected)
// Analytics: returns total click count + recent clicks
// ──────────────────────────────────────────────────────────
export async function getJobClicks(request, reply) {
    const id = request.params.id;

    if (!isValidId(id)) {
        return reply.status(400).send({ error: "Invalid job ID format" });
    }

    try {
        const totalClicks = await JobClickModel.countDocuments({ jobId: id });
        const recentClicks = await JobClickModel.find({ jobId: id })
            .sort({ createdAt: -1 })
            .limit(10)
            .lean();

        return reply.send({
            jobId: id,
            totalClicks: totalClicks,
            recentClicks: recentClicks
        });
    } catch (error) {
        return reply.status(500).send({ error: "Failed to fetch analytics" });
    }
}

// ──────────────────────────────────────────────────────────
// POST /api/dev/seed  (protected, dev only)
// Adds a set of sample jobs to the database quickly
// ──────────────────────────────────────────────────────────
export async function seedJobs(request, reply) {
    if (env.NODE_ENV !== "development") {
        return reply.status(403).send({ error: "Seed command is only for development mode" });
    }

    const sampleJobs = [
        {
            title: "Senior React Engineer",
            company: "Stripe",
            category: "Engineering",
            experienceLevel: "senior",
            location: "Remote",
            locationType: "remote",
            employmentType: "full-time",
            salaryMin: 130000,
            salaryMax: 180000,
            shortDescription: "Build payment UIs used by millions of developers.",
            fullDescription: "You will work with a frontend team to design and implement React components for Stripe. You will own performance and accessibility.",
            skills: ["React", "TypeScript", "CSS"],
            tags: ["frontend", "remote"],
            sourceUrl: "https://stripe.com/jobs"
        },
        {
            title: "Backend Engineer",
            company: "Vercel",
            category: "Engineering",
            experienceLevel: "mid-level",
            location: "Remote",
            locationType: "remote",
            employmentType: "full-time",
            salaryMin: 140000,
            salaryMax: 190000,
            shortDescription: "Scale the infrastructure that deploys websites.",
            fullDescription: "Design and maintain systems behind Vercel's edge network and APIs using Node.js.",
            skills: ["Node.js", "AWS", "Redis"],
            tags: ["backend", "node"],
            sourceUrl: "https://vercel.com/careers"
        }
    ];

    try {
        await JobModel.insertMany(sampleJobs);
        return reply.status(201).send({ message: `Successfully added ${sampleJobs.length} jobs!` });
    } catch (error) {
        return reply.status(500).send({ error: "Failed to seed jobs" });
    }
}
