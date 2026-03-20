import React from 'react';

export function Loader({ size = "md", className = "" }) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12",
        xl: "w-16 h-16"
    };

    const dims = sizeClasses[size] || sizeClasses.md;

    return (
        <div className={`relative flex items-center justify-center ${dims} ${className}`}>
            <svg
                className="animate-spin w-full h-full text-transparent"
                viewBox="0 0 50 50"
            >
                <defs>
                    <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7c3aed" />    {/* Purple */}
                        <stop offset="100%" stopColor="#2dd4bf" />  {/* Teal */}
                    </linearGradient>
                </defs>
                <circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke="url(#brandGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="90 150"
                    strokeDashoffset="0"
                />
            </svg>
        </div>
    );
}

export function PageLoader() {
    return (
        <div className="w-full py-24 flex flex-col items-center justify-center gap-4">
            <Loader size="lg" />
            <p className="text-zinc-500 font-medium animate-pulse text-sm">Loading...</p>
        </div>
    );
}
