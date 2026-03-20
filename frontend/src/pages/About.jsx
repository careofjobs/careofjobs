import StaticPage from './StaticPage';
import { Shield, Zap, Users } from 'lucide-react';

export default function About() {
    return (
        <StaticPage title="About C/O Jobs">
            <p className="text-xl text-zinc-300 leading-relaxed mb-12">
                C/O Jobs was built with a simple mission: to cut through the noise of traditional job hunting
                and connect top tech talent directly with forward-thinking companies.
            </p>

            <div className="grid md:grid-cols-3 gap-8 my-16">
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#8b5cf6]/20 flex items-center justify-center text-[#a78bfa] mb-6">
                        <Users className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Community First</h3>
                    <p className="text-zinc-400">
                        We prioritize the candidate experience, ensuring transparency in salaries, expectations, and culture.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#2dd4bf]/20 flex items-center justify-center text-[#2dd4bf] mb-6">
                        <Shield className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Verified Opportunities</h3>
                    <p className="text-zinc-400">
                        No ghost jobs or spam. Every employer on our platform is manually verified by our team.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 mb-6">
                        <Zap className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Fast & Direct</h3>
                    <p className="text-zinc-400">
                        Applications go straight to the hiring manager. No third-party recruiters in the middle.
                    </p>
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-16 mb-4">Our Story</h2>
            <p className="mb-4">
                Founded in 2026 by a team of frustrated developers, C/O Jobs was created to solve the
                inefficiencies of modern hiring. We were tired of endless applicant tracking systems,
                missing salary ranges, and companies that never replied.
            </p>
            <p>
                Today, C/O Jobs hosts over 10,000 active remote, hybrid, and on-site opportunities across
                the globe, helping thousands of candidates build their dream careers without the headaches.
            </p>

        </StaticPage>
    );
}
