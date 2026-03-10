import { Briefcase, Twitter, Github, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#09090b] border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#8b5cf6]/30 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#2dd4bf] flex items-center justify-center">
                                <Briefcase className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-bold text-white">JobBoard</span>
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                            Connecting top tech talent with forward-thinking companies worldwide. Build your future here.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-[#8b5cf6]/20 hover:text-[#8b5cf6] transition-all">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-[#8b5cf6]/20 hover:text-[#8b5cf6] transition-all">
                                <Github className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-[#8b5cf6]/20 hover:text-[#8b5cf6] transition-all">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm font-sans tracking-wide">For Candidates</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-zinc-400 hover:text-[#2dd4bf] transition-colors">Explore Jobs</a></li>
                            <li><a href="#" className="text-sm text-zinc-400 hover:text-[#2dd4bf] transition-colors">Salary Guidelines</a></li>
                            <li><a href="#" className="text-sm text-zinc-400 hover:text-[#2dd4bf] transition-colors">Career Advice</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm font-sans tracking-wide">For Employers</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-zinc-400 hover:text-[#8b5cf6] transition-colors">Post a Job</a></li>
                            <li><a href="#" className="text-sm text-zinc-400 hover:text-[#8b5cf6] transition-colors">Pricing Plans</a></li>
                            <li><a href="#" className="text-sm text-zinc-400 hover:text-[#8b5cf6] transition-colors">Hiring Resources</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm font-sans tracking-wide">Company</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-500 text-sm">
                        © {new Date().getFullYear()} JobBoard. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Terms</a>
                        <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
