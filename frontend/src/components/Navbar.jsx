import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Search, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    // Darken the navbar when user scrolls down
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when navigating to a new page
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#09090b]/90 backdrop-blur-xl border-b border-white/10 shadow-lg py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#2dd4bf] flex items-center justify-center shadow-lg shadow-[#7c3aed]/20 group-hover:scale-105 transition-transform duration-300">
                            <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            JobBoard
                        </span>
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            to="/jobs"
                            className={`text-sm font-medium transition-colors hover:text-white ${isActive('/jobs') ? 'text-white' : 'text-zinc-400'
                                }`}
                        >
                            Explore Jobs
                        </Link>
                        <a href="/#about" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            About Us
                        </a>
                        <div className="h-4 w-px bg-white/10" />
                        <Link to="/jobs" className="btn-primary py-2 px-5 text-sm">
                            <Search className="w-4 h-4" />
                            Find Jobs
                        </Link>
                    </div>

                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMobileOpen((prev) => !prev)}
                        className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            {mobileOpen && (
                <div className="md:hidden bg-[#09090b]/95 backdrop-blur-xl border-t border-white/10 px-4 py-6 space-y-4">
                    <Link
                        to="/jobs"
                        className={`block text-sm font-medium py-2 transition-colors hover:text-white ${isActive('/jobs') ? 'text-white' : 'text-zinc-400'
                            }`}
                    >
                        Explore Jobs
                    </Link>
                    <a
                        href="/#about"
                        className="block text-sm font-medium py-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        About Us
                    </a>
                    <div className="pt-2">
                        <Link to="/jobs" className="btn-primary w-full justify-center">
                            <Search className="w-4 h-4" />
                            Find Jobs
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
