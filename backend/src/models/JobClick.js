import { Schema, model } from "mongoose";

const jobClickSchema = new Schema(
    {
        jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true, index: true },
        sourceUrl: { type: String, required: true },
        ipAddress: { type: String },
        userAgent: { type: String }
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        versionKey: false
    }
);

export const JobClickModel = model("JobClick", jobClickSchema);
