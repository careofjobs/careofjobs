import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';

// Read the API base URL from .env so we never hardcode localhost in the code
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter state
    const [search, setSearch] = useState('');
    const [locationType, setLocationType] = useState('');
    const [employmentType, setEmploymentType] = useState('');

    const fetchJobs = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (locationType) params.append('locationType', locationType);
            if (employmentType) params.append('employmentType', employmentType);

            const response = await fetch(`${API_URL}/api/jobs?${params.toString()}`);
            if (!response.ok) throw new Error('Failed to fetch jobs');

            const data = await response.json();
            setJobs(data.jobs || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Re-fetch whenever dropdown filters change
    useEffect(() => {
        fetchJobs();
    }, [locationType, employmentType]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs();
    };

    // Returns a Tailwind colour class string based on job type value
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

    // Generates a consistent colour gradient from the company name
    const getAvatarGradient = (name) => {
        const hue = [...(name || 'A')].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
        return `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${(hue + 40) % 360}, 70%, 50%))`;
    };

    const getInitial = (company) => (company ? company.charAt(0).toUpperCase() : 'C');

    return (
        <div className="pt-24 pb-20 min-h-screen">

            {/* ── Search Header ── */}
            <div className="bg-[#09090b]/80 border-b border-white/5 py-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/5 to-[#2dd4bf]/5 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                        Find your next opportunity
                    </h1>

                    <form onSubmit={handleSearch} className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
                        {/* Text search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search job title, skills, or company..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-[#18181b] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#8b5cf6]/50 focus:ring-1 focus:ring-[#8b5cf6]/50 transition-all"
                            />
                        </div>

                        {/* Location type filter */}
                        <select
                            value={locationType}
                            onChange={(e) => setLocationType(e.target.value)}
                            className="bg-[#18181b] border border-white/10 rounded-xl py-3 px-4 text-zinc-300 focus:outline-none focus:border-[#8b5cf6]/50 cursor-pointer"
                        >
                            <option value="">Any Location</option>
                            <option value="remote">Remote</option>
                            <option value="hybrid">Hybrid</option>
                            <option value="onsite">On-site</option>
                        </select>

                        {/* Employment type filter */}
                        <select
                            value={employmentType}
                            onChange={(e) => setEmploymentType(e.target.value)}
                            className="bg-[#18181b] border border-white/10 rounded-xl py-3 px-4 text-zinc-300 focus:outline-none focus:border-[#8b5cf6]/50 cursor-pointer"
                        >
                            <option value="">Any Type</option>
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="contract">Contract</option>
                        </select>

                        <button type="submit" className="btn-primary py-3 px-8">
                            Search
                        </button>
                    </form>
                </div>
            </div>

            {/* ── Job Listings ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold text-white">
                        {loading ? 'Loading...' : `${jobs.length} ${jobs.length === 1 ? 'Job' : 'Jobs'} Found`}
                    </h2>
                </div>

                {/* Loading skeletons */}
                {loading && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="glass-card p-6 animate-pulse">
                                <div className="flex gap-4 items-start mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/5" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-5 bg-white/5 rounded w-3/4" />
                                        <div className="h-4 bg-white/5 rounded w-1/2" />
                                    </div>
                                </div>
                                <div className="space-y-2 mt-6">
                                    <div className="h-4 bg-white/5 rounded w-full" />
                                    <div className="h-4 bg-white/5 rounded w-5/6" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error state */}
                {!loading && error && (
                    <div className="text-center py-20 glass-card">
                        <h3 className="text-xl font-medium text-red-400 mb-2">Could not load jobs</h3>
                        <p className="text-zinc-500 mb-6">{error}</p>
                        <button onClick={fetchJobs} className="btn-secondary">Try again</button>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && jobs.length === 0 && (
                    <div className="text-center py-20 glass-card">
                        <h3 className="text-xl font-medium text-white mb-2">No jobs match your search</h3>
                        <p className="text-zinc-500">Try adjusting your filters or search terms.</p>
                    </div>
                )}

                {/* Job cards grid */}
                {!loading && !error && jobs.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map(job => (
                            <Link
                                to={`/jobs/${job._id}`}
                                key={job._id}
                                className="glass-card p-6 group flex flex-col h-full"
                            >
                                {/* Company header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex gap-4">
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-inner shrink-0"
                                            style={{ background: getAvatarGradient(job.company) }}
                                        >
                                            {getInitial(job.company)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white group-hover:text-[#2dd4bf] transition-colors line-clamp-1">
                                                {job.title}
                                            </h3>
                                            <p className="text-zinc-400 text-sm">{job.company}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className={`badge ${getBadgeColor(job.locationType)}`}>
                                        {job.locationType}
                                    </span>
                                    <span className={`badge ${getBadgeColor(job.employmentType)}`}>
                                        {job.employmentType}
                                    </span>
                                    {job.salaryMin && (
                                        <span className="badge text-zinc-300 bg-white/5 border-white/10">
                                            ${(job.salaryMin / 1000).toFixed(0)}k – ${(job.salaryMax / 1000).toFixed(0)}k
                                        </span>
                                    )}
                                </div>

                                {/* Short description */}
                                <p className="text-zinc-400 text-sm line-clamp-3 mb-6 flex-grow">
                                    {job.shortDescription}
                                </p>

                                {/* Footer */}
                                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-zinc-500 text-xs mt-auto">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {job.location}
                                    </div>
                                    <span className="font-medium text-[#8b5cf6] group-hover:translate-x-1 transition-transform">
                                        View Details →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
