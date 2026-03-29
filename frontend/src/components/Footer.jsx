import { Twitter, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoUrl from '../assets/logo_transparent.png';

export default function Footer() {
    return (
        <footer className="bg-[#09090b] border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#8b5cf6]/30 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <img src={logoUrl} alt="C/O Jobs Logo" className="w-14 h-14 object-contain" />
                            <span className="text-xl font-bold tracking-tight text-white">C/O Jobs</span>
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
                            <li><Link to="/jobs" className="text-sm text-zinc-400 hover:text-[#2dd4bf] transition-colors">Explore Jobs</Link></li>
                            <li><Link to="/jobs" className="text-sm text-zinc-400 hover:text-[#2dd4bf] transition-colors">Salary Guidelines</Link></li>
                            <li><Link to="/about" className="text-sm text-zinc-400 hover:text-[#2dd4bf] transition-colors">Career Advice</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm font-sans tracking-wide">For Employers</h3>
                        <ul className="space-y-3">
                            <li><Link to="/contact" className="text-sm text-zinc-400 hover:text-[#8b5cf6] transition-colors">Post a Job</Link></li>
                            <li><Link to="/contact" className="text-sm text-zinc-400 hover:text-[#8b5cf6] transition-colors">Pricing Plans</Link></li>
                            <li><Link to="/about" className="text-sm text-zinc-400 hover:text-[#8b5cf6] transition-colors">Hiring Resources</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm font-sans tracking-wide">Company</h3>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="text-sm text-zinc-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact</Link></li>
                            <li><Link to="/privacy" className="text-sm text-zinc-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-500 text-sm">
                        © {new Date().getFullYear()} C/O Jobs. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link to="/terms" className="text-sm text-zinc-500 hover:text-white transition-colors">Terms</Link>
                        <Link to="/privacy" className="text-sm text-zinc-500 hover:text-white transition-colors">Privacy</Link>
                        <Link to="/cookies" className="text-sm text-zinc-500 hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

