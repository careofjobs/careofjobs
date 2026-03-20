import { useState } from 'react';
import StaticPage from './StaticPage';
import { Mail, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { Loader } from '../components/Loader';
export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
            setErrorMessage('Please fill out all fields.');
            setStatus('error');
            return;
        }

        try {
            setStatus('loading');
            setErrorMessage('');

            // Since we configured Vite proxy for /api, we can just use the relative URL in dev
            const API_URL = import.meta.env.VITE_API_URL || '';
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message.');
            }

            setStatus('success');
            setFormData({ firstName: '', lastName: '', email: '', message: '' });

        } catch (err) {
            setStatus('error');
            setErrorMessage(err.message);
        }
    };

    return (
        <StaticPage title="Contact Us">
            <p className="text-lg">
                We're always here to help. Whether you're a candidate looking for support with an application,
                or an employer needing assistance with a job posting, our team is ready to assist you.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-[#8b5cf6]/20 rounded-full flex items-center justify-center text-[#a78bfa] mb-4">
                        <Mail className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Email Support</h3>
                    <p className="text-zinc-400 mb-4">Our friendly team is here to help.</p>
                    <a href="mailto:support@C/O Jobs.com" className="text-[#2dd4bf] hover:underline font-medium">
                        support@C/O Jobs.com
                    </a>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-[#2dd4bf]/20 rounded-full flex items-center justify-center text-[#2dd4bf] mb-4">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Office</h3>
                    <p className="text-zinc-400 mb-4">Come say hello at our headquarters.</p>
                    <address className="text-zinc-300 not-italic">
                        123 Tech Boulevard<br />
                        Bengaluru, KA 560001<br />
                        India
                    </address>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-6">Send us a message</h2>

                {status === 'success' ? (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-6 rounded-xl flex items-center gap-4">
                        <CheckCircle2 className="w-8 h-8 shrink-0" />
                        <div>
                            <h4 className="font-semibold text-white">Message sent!</h4>
                            <p className="text-sm">Thanks for reaching out. We'll get back to you shortly.</p>
                        </div>
                    </div>
                ) : (
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {status === 'error' && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full bg-[#18181b] border border-white/10 rounded-xl py-3 px-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                                    placeholder="Jane"
                                    disabled={status === 'loading'}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full bg-[#18181b] border border-white/10 rounded-xl py-3 px-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                                    placeholder="Doe"
                                    disabled={status === 'loading'}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-[#18181b] border border-white/10 rounded-xl py-3 px-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                                placeholder="jane@example.com"
                                disabled={status === 'loading'}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Message</label>
                            <textarea
                                rows="4"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full bg-[#18181b] border border-white/10 rounded-xl py-3 px-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#8b5cf6]/50 transition-colors"
                                placeholder="How can we help?"
                                disabled={status === 'loading'}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn-primary w-full py-3 flex justify-center items-center gap-2"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' && <Loader size="sm" />}
                            {status === 'loading' ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                )}
            </div>
        </StaticPage>
    );
}

