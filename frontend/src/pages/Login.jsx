import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Loader } from '../components/Loader';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL || '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to login');
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
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-zinc-400">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="relative">
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#18181b] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                                placeholder="name@example.com"
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#18181b] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                                placeholder="••••••••"
                                required
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
                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center text-zinc-400 text-sm mt-8">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-[#2dd4bf] hover:underline font-medium">
                        Create one now
                    </Link>
                </p>
            </div>
        </div>
    );
}
