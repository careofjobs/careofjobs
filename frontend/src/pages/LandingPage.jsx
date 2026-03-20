import { Link } from 'react-router-dom';
import { Search, Zap, Shield, Users } from 'lucide-react';
import AdSlot from '../components/AdSlot';
import { useInView } from '../hooks/useInView';

const HERO_AD_SLOT = import.meta.env.VITE_ADSENSE_SLOT_HOME_HERO;
const MID_AD_SLOT = import.meta.env.VITE_ADSENSE_SLOT_HOME_MID;

export default function LandingPage() {
    const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: aboutRef, inView: aboutInView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <div className="flex flex-col">

            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-zinc-300 mb-8 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-[#2dd4bf] animate-pulse shrink-0"></span>
                        <span>
                            Over{' '}
                            <span className="relative inline-block whitespace-nowrap px-1">
                                <span className="relative z-10 text-white font-bold">2,000+</span>
                                <svg
                                    className="absolute inset-0 w-full h-full scale-x-125 scale-y-150 origin-center pointer-events-none fill-transparent stroke-[#2dd4bf]"
                                    viewBox="0 0 100 40"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M 10,20 C 15,5 85,5 90,20 C 95,35 25,40 10,30 C 0,25 15,10 50,15"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        className={heroInView ? "animate-draw-circle" : ""}
                                        strokeDasharray="350"
                                        strokeDashoffset="350"
                                    />
                                </svg>
                            </span>{' '}
                            new tech jobs added this week
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                        Find the work you <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#2dd4bf] animate-gradient bg-300%">
                            actually{' '}
                        </span>
                        <span className="relative inline-block mt-2">
                            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#2dd4bf] to-[#a78bfa] animate-gradient bg-300%">
                                care about.
                            </span>
                            <svg 
                                className="absolute -bottom-3 left-0 w-full h-8 pointer-events-none fill-transparent stroke-[#fbbf24]"
                                viewBox="0 0 100 20"
                                preserveAspectRatio="none"
                            >
                                <path 
                                    d="M 2,10 Q 30,5 98,15" 
                                    strokeWidth="3" 
                                    strokeLinecap="round" 
                                    className={heroInView ? "animate-draw-line" : ""}
                                    strokeDasharray="150"
                                    strokeDashoffset="150"
                                />
                            </svg>
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-12">
                        Discover roles at top startups and enterprise companies. Remote, hybrid, or on-site - your next career move starts here.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/jobs" className="btn-primary w-full sm:w-auto text-lg px-8 py-4">
                            <Search className="w-5 h-5" />
                            Explore Open Roles
                        </Link>
                        <a href="#about" className="btn-secondary w-full sm:w-auto text-lg px-8 py-4">
                            Learn How It Works
                        </a>
                    </div>

                    {/* Hero ad slot */}
                    <div className="max-w-5xl mx-auto mt-12">
                        <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
                            <span className="text-zinc-300 font-semibold">Sponsored</span>
                            <span>Ads keep the job board free.</span>
                        </div>
                        <AdSlot slot={HERO_AD_SLOT} className="mt-3 p-4" />
                    </div>

                    {/* Stats bar */}
                    <div className="mt-14 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Active Jobs', value: '10K+' },
                            { label: 'Tech Companies', value: '500+' },
                            { label: 'Remote Roles', value: '60%' },
                            { label: 'Success Stories', value: '12K+' }
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* About Section */}
            <section id="about" ref={aboutRef} className="py-24 bg-[#09090b]/50 border-y border-white/5 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 px-4">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            <span className="relative inline-block">
                                <span className="relative z-10">Why</span>
                                
                                {/* Sparks SVG */}
                                <svg 
                                    className="absolute -top-6 -left-6 w-12 h-12 pointer-events-none fill-transparent stroke-[#f97316]"
                                    viewBox="0 0 100 100"
                                    style={{ overflow: 'visible' }}
                                >
                                    <path d="M 40,70 L 10,40" strokeWidth="8" strokeLinecap="round" className={aboutInView ? "animate-draw-spark" : ""} style={{ animationDelay: '0.8s', strokeDasharray: 60, strokeDashoffset: 60 }} />
                                    <path d="M 60,60 L 60,15" strokeWidth="8" strokeLinecap="round" className={aboutInView ? "animate-draw-spark" : ""} style={{ animationDelay: '0.95s', strokeDasharray: 60, strokeDashoffset: 60 }} />
                                    <path d="M 80,65 L 110,40" strokeWidth="8" strokeLinecap="round" className={aboutInView ? "animate-draw-spark" : ""} style={{ animationDelay: '1.1s', strokeDasharray: 60, strokeDashoffset: 60 }} />
                                </svg>
                            </span>
                            {' '}top talent chooses{' '}
                            <span className="relative inline-block whitespace-nowrap mt-4 sm:mt-0">
                                <span className="relative z-10">C/O Jobs</span>

                                {/* Underline SVG */}
                                <svg 
                                    className="absolute -bottom-5 -left-2 w-[calc(100%+16px)] h-6 pointer-events-none fill-transparent stroke-[#f97316] overflow-visible"
                                    viewBox="0 0 100 20"
                                    preserveAspectRatio="none"
                                >
                                    <path 
                                        d="M 5,5 Q 40,-5 95,15" 
                                        strokeWidth="4" 
                                        strokeLinecap="round" 
                                        className={aboutInView ? "animate-draw-line" : ""}
                                        strokeDasharray="150"
                                        strokeDashoffset="150"
                                    />
                                </svg>
                            </span>
                        </h2>
                        <p className="text-lg text-zinc-400">
                            We cut through the noise of traditional job boards. No spam, no ghosting, just high-quality opportunities curated for professionals like you.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="glass-card p-8">
                            <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/20 flex items-center justify-center mb-6 text-[#a78bfa]">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Verified Companies</h3>
                            <p className="text-zinc-400 leading-relaxed">
                                Every employer on our platform is manually verified. We ensure you are only applying to legitimate, funded, and culturally sound companies.
                            </p>
                        </div>

                        <div className="glass-card p-8">
                            <div className="w-12 h-12 rounded-xl bg-[#2dd4bf]/20 flex items-center justify-center mb-6 text-[#2dd4bf]">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Direct Applications</h3>
                            <p className="text-zinc-400 leading-relaxed">
                                No middle-men. When you apply through C/O Jobs, your application goes directly to the hiring manager's inbox or ATS system.
                            </p>
                        </div>

                        <div className="glass-card p-8">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-6 text-orange-400">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Salary Transparency</h3>
                            <p className="text-zinc-400 leading-relaxed">
                                We advocate for upfront compensation ranges. Over 80% of our listings include detailed salary and equity expectations.
                            </p>
                        </div>
                    </div>

                    {/* Mid-page ad */}
                    <div className="max-w-5xl mx-auto mt-14">
                        <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
                            <span className="text-zinc-300 font-semibold">Sponsored</span>
                            <span>Relevant career resources</span>
                        </div>
                        <AdSlot slot={MID_AD_SLOT} className="mt-3 p-4" />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#8b5cf6]/20 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10 glass-panel rounded-3xl p-12 md:p-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                        Ready to make your next move?
                    </h2>
                    <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
                        Join thousands of developers, designers, and managers who found their dream job on C/O Jobs.
                    </p>
                    <Link to="/jobs" className="btn-primary text-lg px-10 py-5">
                        View Job Listings Now
                    </Link>
                </div>
            </section>

        </div>
    );
}
