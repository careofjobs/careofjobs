import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function StaticPage({ title, lastUpdated, children }) {
    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="glass-card p-8 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
                    {lastUpdated && (
                        <p className="text-zinc-500 mb-8 pb-8 border-b border-white/5">
                            Last Updated: {lastUpdated}
                        </p>
                    )}

                    <div className="prose prose-invert prose-zinc max-w-none space-y-6 text-zinc-300">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
