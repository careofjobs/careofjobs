import { Schema, model } from "mongoose";

const jobSchema = new Schema(
    {
        // ── Company ──────────────────────────────────────────
        title: { type: String, required: true, trim: true },
        company: { type: String, required: true, trim: true },
        companyLogo: { type: String, trim: true },        // URL to company logo image
        companyWebsite: { type: String, trim: true },     // Company website URL

        // ── Job Details ───────────────────────────────────────
        category: { type: String, required: true, trim: true },   // e.g. "Engineering", "Design"
        location: { type: String, required: true, trim: true },
        locationType: {
            type: String,
            enum: ["remote", "hybrid", "onsite"],
            default: "remote"
        },
        employmentType: {
            type: String,
            enum: ["full-time", "part-time", "contract", "internship", "freelance"],
            default: "full-time"
        },
        experienceLevel: {
            type: String,
            enum: ["internship", "entry-level", "mid-level", "senior", "lead", "executive"],
            required: true
        },
        salaryMin: { type: Number },                      // Numeric for filtering/sorting
        salaryMax: { type: Number },
        salaryCurrency: { type: String, default: "INR", trim: true },
        salaryPeriod: {
            type: String,
            enum: ["hourly", "monthly", "yearly"],
            default: "yearly"
        },

        // ── Descriptions ─────────────────────────────────────
        shortDescription: { type: String, required: true, trim: true },
        fullDescription: { type: String, required: true, trim: true },
        responsibilities: [{ type: String, trim: true }],
        requirements: [{ type: String, trim: true }],
        benefits: [{ type: String, trim: true }],

        // ── Metadata ──────────────────────────────────────────
        skills: [{ type: String, trim: true }],
        tags: [{ type: String, trim: true }],
        sourceUrl: { type: String, required: true, trim: true },
        applicationDeadline: { type: Date },
        isFeatured: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
        viewCount: { type: Number, default: 0 },
        applyCount: { type: Number, default: 0 }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Full-text search index
jobSchema.index({ title: "text", company: "text", tags: "text", skills: "text", category: "text" });

// Listing & filtering indexes
jobSchema.index({ isActive: 1, isFeatured: -1, createdAt: -1 });
jobSchema.index({ category: 1, isActive: 1 });
jobSchema.index({ experienceLevel: 1, isActive: 1 });
jobSchema.index({ applicationDeadline: 1 });

export const JobModel = model("Job", jobSchema);
