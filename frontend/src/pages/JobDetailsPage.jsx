import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Building2, ExternalLink, ArrowLeft, CheckCircle2 } from 'lucide-react';

// Read API base URL from environment so it's never hardcoded
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function JobDetailsPage() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${API_URL}/api/jobs/${id}`);
                if (!response.ok) throw new Error('Job not found');

                const data = await response.json();
                setJob(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    // Tracks the click on the backend then opens the company's real application page
    const handleApply = () => {
        window.open(`${API_URL}/api/jobs/${id}/apply`, '_blank', 'noopener,noreferrer');
    };

    const getBadgeColor = (type) => {
        const colors = {
            remote: 'text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/20',
            hybrid: 'text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/20',
            onsite: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
            'full-time': 'text-green-400 bg-green-400/10 border-green-400/20',
            'part-time': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
        };
        return colors[type] || 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20';
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    // Creates a deterministic gradient colour from the company name string
    const getAvatarGradient = (company) => {
        const hue = [...(company || 'A')].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
        return `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${(hue + 40) % 360}, 70%, 50%))`;
    };

    // ── Loading skeleton ──────────────────────────────────────
    if (loading) {
        return (
            <div className="pt-32 pb-20 min-h-screen max-w-4xl mx-auto px-4 animate-pulse">
                <div className="h-4 bg-white/5 rounded w-24 mb-8" />
                <div className="glass-card p-8 md:p-12">
                    <div className="flex gap-6 mb-8">
                        <div className="w-16 h-16 rounded-xl bg-white/5" />
                        <div className="flex-1 space-y-4">
                            <div className="h-8 bg-white/5 rounded w-3/4" />
                            <div className="h-4 bg-white/5 rounded w-1/3" />
                        </div>
                    </div>
                    <div className="space-y-4 mt-8">
                        <div className="h-4 bg-white/5 rounded w-full" />
                        <div className="h-4 bg-white/5 rounded w-5/6" />
                        <div className="h-4 bg-white/5 rounded w-4/6" />
                    </div>
                </div>
            </div>
        );
    }

    // ── Error / not found ─────────────────────────────────────
    if (error || !job) {
        return (
            <div className="pt-32 pb-20 min-h-screen text-center">
                <div className="glass-card max-w-md mx-auto p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Job Not Found</h2>
                    <p className="text-zinc-400 mb-8">{error || 'This job listing may have been removed.'}</p>
                    <Link to="/jobs" className="btn-secondary">
                        <ArrowLeft className="w-4 h-4" /> Back to Jobs
                    </Link>
                </div>
            </div>
        );
    }

    // ── Job detail view ───────────────────────────────────────
    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Back link */}
                <Link
                    to="/jobs"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to all jobs
                </Link>

                {/* Header card */}
                <div className="glass-card p-8 md:p-12 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#8b5cf6]/10 blur-[80px] rounded-full pointer-events-none" />

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                        {/* Company info */}
                        <div className="flex items-start gap-6">
                            <div
                                className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-2xl flex items-center justify-center text-white font-bold text-2xl md:text-3xl shadow-lg ring-1 ring-white/10"
                                style={{ background: getAvatarGradient(job.company) }}
                            >
                                {job.company.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{job.title}</h1>
                                <div className="text-lg text-[#a78bfa] font-medium mb-4 flex items-center gap-2">
                                    <Building2 className="w-5 h-5" />
                                    {job.company}
                                </div>

                                <div className="flex flex-wrap gap-2 md:gap-4 text-sm text-zinc-400">
                                    <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                                        <MapPin className="w-4 h-4 text-zinc-500" /> {job.location}
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                                        <Clock className="w-4 h-4 text-zinc-500" /> Posted {formatDate(job.createdAt)}
                                    </span>
                                    {job.salaryMin && (
                                        <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 text-green-400 font-medium">
                                            💰 ${(job.salaryMin / 1000).toFixed(0)}k – ${(job.salaryMax / 1000).toFixed(0)}k
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Badges + Apply button */}
                        <div className="flex flex-col gap-3 md:items-end">
                            <div className="flex gap-2">
                                <span className={`badge ${getBadgeColor(job.locationType)}`}>{job.locationType}</span>
                                <span className={`badge ${getBadgeColor(job.employmentType)}`}>{job.employmentType}</span>
                            </div>
                            <button onClick={handleApply} className="btn-primary w-full md:w-auto mt-2">
                                Apply Now <ExternalLink className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Body: description + sidebar */}
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Main content */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="glass-card p-8">
                            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">
                                About the Role
                            </h2>
                            <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-base md:text-lg">
                                {job.fullDescription}
                            </div>
                        </div>

                        {job.requirements && job.requirements.length > 0 && (
                            <div className="glass-card p-8">
                                <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">
                                    Requirements
                                </h2>
                                <ul className="space-y-3">
                                    {job.requirements.map((req, i) => (
                                        <li key={i} className="flex gap-3 text-zinc-300">
                                            <CheckCircle2 className="w-5 h-5 text-[#2dd4bf] shrink-0 mt-0.5" />
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="glass-card p-6">
                            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
                                Required Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {job.skills && job.skills.length > 0 ? (
                                    job.skills.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 bg-[#8b5cf6]/10 text-[#a78bfa] border border-[#8b5cf6]/20 rounded-lg text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-zinc-500 text-sm">Not specified</span>
                                )}
                            </div>
                        </div>

                        <div className="glass-card p-6">
                            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
                                Job Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {job.tags && job.tags.length > 0 ? (
                                    job.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-2.5 py-1 bg-white/5 text-zinc-300 border border-white/5 rounded-md text-xs font-medium"
                                        >
                                            #{tag}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-zinc-500 text-sm">No tags</span>
                                )}
                            </div>
                        </div>

                        {/* CTA card */}
                        <div className="glass-card p-6 border-t-[3px] border-t-[#2dd4bf] bg-gradient-to-b from-[#2dd4bf]/5 to-transparent">
                            <h3 className="text-white font-bold mb-2">Ready to apply?</h3>
                            <p className="text-zinc-400 text-sm mb-6">
                                Your application will be sent directly to the {job.company} hiring team.
                            </p>
                            <button onClick={handleApply} className="w-full btn-primary text-sm">
                                Start Application
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
