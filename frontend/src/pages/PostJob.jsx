import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { Building2, Briefcase, IndianRupee, MapPin, Tag, PlusCircle, AlertCircle, CheckCircle2, ArrowLeft, Upload, X } from 'lucide-react';

export default function PostJob() {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        companyLogo: '',
        category: '',
        experienceLevel: 'entry-level',
        location: '',
        locationType: 'onsite',
        employmentType: 'full-time',
        salaryMin: '',
        salaryMax: '',
        shortDescription: '',
        fullDescription: '',
        skills: '',
        tags: '',
        sourceUrl: ''
    });

    const API_URL = import.meta.env.VITE_API_URL || '';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (limit to ~1MB since we are using Base64 in standard MongoDB)
            if (file.size > 1024 * 1024) {
                setErrorMessage('Image size must be less than 1MB');
                setStatus('error');
                return;
            }
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, companyLogo: reader.result });
                setErrorMessage('');
                setStatus('idle');
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setFormData({ ...formData, companyLogo: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic frontend validation matches backend requirements
        if (!formData.title || !formData.company || !formData.category || !formData.location || !formData.shortDescription || !formData.fullDescription || !formData.sourceUrl) {
            setErrorMessage('Please fill out all required fields.');
            setStatus('error');
            return;
        }

        try {
            setStatus('submitting');
            setErrorMessage('');

            // Format data for backend
            const payload = {
                ...formData,
                salaryMin: formData.salaryMin ? Number(formData.salaryMin) : undefined,
                salaryMax: formData.salaryMax ? Number(formData.salaryMax) : undefined,
                skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
                tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : []
            };

            const response = await fetch(`${API_URL}/api/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to post job.');
            }

            setStatus('success');

            // Redirect to the new job page after brief success message
            setTimeout(() => {
                navigate(`/jobs/${data._id}`);
            }, 2000);

        } catch (err) {
            setStatus('error');
            setErrorMessage(err.message);
        }
    };

    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-8">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="mb-6 text-zinc-400 hover:text-white flex items-center gap-2 transition-colors w-fit"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <PlusCircle className="w-8 h-8 text-[#2dd4bf]" />
                        Post a New Job
                    </h1>
                    <p className="text-zinc-400">Create a new opportunity on the C/O Jobs platform. Asterisks (*) denote required fields.</p>
                </div>

                <div className="glass-card p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-tr from-[#7c3aed]/10 to-[#2dd4bf]/10 blur-[80px] rounded-full pointer-events-none" />

                    {status === 'success' ? (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10 text-green-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Job Posted Successfully!</h2>
                            <p className="text-zinc-400">Taking you to the new listing...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">

                            {status === 'error' && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    <p>{errorMessage}</p>
                                </div>
                            )}

                            {/* Basic Details Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">Basic Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Job Title *</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-[#18181b] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:border-[#8b5cf6]/50" required placeholder="e.g. Senior Frontend Engineer" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Company Name *</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                            <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-[#18181b] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:border-[#8b5cf6]/50" required placeholder="e.g. Acme Corp" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Company Logo Image</label>
                                        <div className="relative">
                                            {formData.companyLogo ? (
                                                <div className="flex items-center gap-4 p-2 bg-[#18181b] border border-white/10 rounded-xl">
                                                    <img src={formData.companyLogo} alt="Logo preview" className="w-10 h-10 object-contain rounded-lg bg-white" />
                                                    <span className="text-sm text-green-400 font-medium flex-1">Image attached</span>
                                                    <button type="button" onClick={removeImage} className="p-1 hover:bg-white/10 rounded-md transition-colors text-zinc-400 hover:text-red-400">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="relative group flex items-center w-full bg-[#18181b] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus-within:border-[#8b5cf6]/50 transition-colors">
                                                    <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-hover:text-[#2dd4bf] transition-colors" />
                                                    <input 
                                                        type="file" 
                                                        accept="image/*" 
                                                        onChange={handleImageChange} 
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                                        title="Upload logo (max 1MB)"
                                                    />
                                                    <span className="text-zinc-500 text-sm pointer-events-none relative z-0">Upload logo (max 1MB)</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Category *</label>
                                        <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full bg-[#18181b] border border-white/10 rounded-xl py-2.5 px-4 text-white focus:border-[#8b5cf6]/50" required placeholder="e.g. Engineering" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Experience Level</label>
                                        <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="w-full bg-[#18181b] border border-white/10 rounded-xl py-2.5 px-4 text-white focus:border-[#8b5cf6]/50 appearance-none">
                                            <option value="internship">Internship</option>
                                            <option value="entry-level">Entry Level</option>
                                            <option value="mid-level">Mid Level</option>
                                            <option value="senior">Senior Level</option>
                                            <option value="lead">Lead / Manager</option>
                                            <option value="executive">Executive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Logistics Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">Logistics & Compensation</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Location / HQ *</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                            <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-[#18181b] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:border-[#8b5cf6]/50" required placeholder="e.g. Bengaluru, KA" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Location Type</label>
                                        <select name="locationType" value={formData.locationType} onChange={handleChange} className="w-full bg-[#18181b] border border-white/10 rounded-xl py-2.5 px-4 text-white focus:border-[#8b5cf6]/50 appearance-none">
                                            <option value="remote">Remote</option>
                                            <option value="hybrid">Hybrid</option>
                                            <option value="onsite">On-site</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Employment Type</label>
                                        <select name="employmentType" value={formData.employmentType} onChange={handleChange} className="w-full bg-[#18181b] border border-white/10 rounded-xl py-2.5 px-4 text-white focus:border-[#8b5cf6]/50 appearance-none">
                                            <option value="full-time">Full-time</option>
                                            <option value="part-time">Part-time</option>
                                            <option value="contract">Contract</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-zinc-400 mb-1">Min Salary</label>
                                            <div className="relative">
                                                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                                <input type="number" name="salaryMin" value={formData.salaryMin} onChange={handleChange} className="w-full bg-[#18181b] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:border-[#8b5cf6]/50" placeholder="e.g. 1000000" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-zinc-400 mb-1">Max Salary</label>
                                            <div className="relative">
                                                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                                <input type="number" name="salaryMax" value={formData.salaryMax} onChange={handleChange} className="w-full bg-[#18181b] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:border-[#8b5cf6]/50" placeholder="e.g. 1500000" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">Description & Details</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Short Description (Summary) *</label>
                                        <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="w-full bg-[#18181b] border border-white/10 rounded-xl py-2.5 px-4 text-white focus:border-[#8b5cf6]/50 max-w-2xl" required placeholder="A brief one-sentence pitch about the role..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Full Description * (Markdown supported)</label>
                                        <textarea name="fullDescription" value={formData.fullDescription} onChange={handleChange} rows="6" className="w-full bg-[#18181b] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#8b5cf6]/50" required placeholder="Describe the responsibilities, team, and benefits..."></textarea>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-400 mb-1">Tags (comma separated)</label>
                                            <div className="relative">
                                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                                <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full bg-[#18181b] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:border-[#8b5cf6]/50" placeholder="e.g. react, node, urgent" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-400 mb-1">Application URL (External) *</label>
                                            <input type="url" name="sourceUrl" value={formData.sourceUrl} onChange={handleChange} className="w-full bg-[#18181b] border border-white/10 rounded-xl py-2.5 px-4 text-white focus:border-[#8b5cf6]/50" required placeholder="https://..." />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 flex justify-end">
                                <button type="submit" disabled={status === 'submitting'} className="btn-primary py-3 px-8 text-lg font-medium flex items-center gap-2">
                                    {status === 'submitting' && <Loader size="sm" />}
                                    {status === 'submitting' ? 'Posting...' : 'Post Job to Board'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
