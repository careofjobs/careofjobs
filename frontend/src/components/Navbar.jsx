import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, LogOut, PlusCircle, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAdmin, logout } = useAuth();

    // Darken the navbar when user scrolls down
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when navigating to a new page
    useEffect(() => {
        const closeMobileMenu = () => setMobileOpen(false);
        closeMobileMenu();
    }, [location.pathname]);

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#09090b]/90 backdrop-blur-xl border-b border-white/10 shadow-lg py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src="/images/logo_transparent.png" alt="C/O Jobs Logo" className="w-12 h-12 object-contain group-hover:scale-105 transition-transform duration-300" />
                        <span className="text-xl font-bold tracking-tight text-white">
                            C/O Jobs
                        </span>
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-8">
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

                        {/* Auth Container */}
                        <div className="flex items-center gap-4">
                            {!user ? (
                                <>
                                    <Link to="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                                        Sign In
                                    </Link>
                                    <Link to="/register" className="btn-primary py-2 px-5 text-sm">
                                        Join Now
                                    </Link>
                                </>
                            ) : (
                                <div className="flex items-center gap-4">
                                    {isAdmin && (
                                        <Link to="/admin/post-job" className="btn-secondary py-2 px-4 shadow-lg text-sm flex items-center gap-2 border-[rgba(45,212,191,0.2)] text-[#2dd4bf] hover:bg-[rgba(45,212,191,0.1)]">
                                            <PlusCircle className="w-4 h-4" />
                                            Post Job
                                        </Link>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#2dd4bf] flex items-center justify-center text-white font-bold shadow-inner">
                                            {user.firstName.charAt(0).toUpperCase()}
                                        </div>
                                        <button onClick={handleLogout} className="text-zinc-400 hover:text-white transition-colors" title="Log out">
                                            <LogOut className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
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

                    <div className="pt-2 pb-2 border-t border-white/10 space-y-3">
                        {!user ? (
                            <>
                                <Link to="/login" className="block text-sm font-medium py-2 text-zinc-400 hover:text-white">
                                    Sign In
                                </Link>
                                <Link to="/register" className="btn-primary w-full justify-center py-3">
                                    Join Now
                                </Link>
                            </>
                        ) : (
                            <div className="space-y-3">
                                {isAdmin && (
                                    <Link to="/admin/post-job" className="btn-secondary py-3 w-full justify-center flex items-center gap-2 text-[#2dd4bf] border-[rgba(45,212,191,0.2)]">
                                        <PlusCircle className="w-4 h-4" />
                                        Post Job
                                    </Link>
                                )}
                                <div className="flex items-center justify-between py-2 border-t border-white/5 mt-2 pt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#2dd4bf] flex items-center justify-center text-white font-bold">
                                            {user.firstName.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium text-white">{user.firstName} {user.lastName}</span>
                                    </div>
                                    <button onClick={handleLogout} className="p-2 text-zinc-400 hover:text-red-400 transition-colors">
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
