import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import { Loader } from '../components/Loader';

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL || '';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to register');
            }

            login(data.token, data.user);
            navigate('/jobs');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-32 pb-20 min-h-screen flex items-center justify-center px-4">
            <div className="glass-card w-full max-w-md p-8 md:p-10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white mb-2">Join Us</h1>
                    <p className="text-zinc-400">Create your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">First Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full bg-[#18181b] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                                    placeholder="Jane"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Last Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full bg-[#18181b] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                                    placeholder="Doe"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-[#18181b] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                                placeholder="name@example.com"
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-[#18181b] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                                placeholder="••••••••"
                                required
                                minLength={6}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full py-3 mt-6 flex justify-center items-center gap-2"
                    >
                        {isSubmitting && <Loader size="sm" />}
                        {isSubmitting ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center text-zinc-400 text-sm mt-8">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#8b5cf6] hover:underline font-medium">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
