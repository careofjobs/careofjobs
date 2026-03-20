/**
 * Shared helpers for job listing UI.
 * Used by both JobsPage and JobDetailsPage to avoid duplication.
 */

/**
 * Returns a Tailwind colour class string for a given job badge type.
 * Falls back to a neutral zinc style for unknown values.
 */
export function getBadgeColor(type) {
    const colors = {
        remote: 'text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/20',
        hybrid: 'text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/20',
        onsite: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
        'full-time': 'text-green-400 bg-green-400/10 border-green-400/20',
        'part-time': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    };
    return colors[type] || 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20';
}

/**
 * Generates a consistent CSS gradient string from a company name.
 * Same name always produces the same colour, so avatars are stable across renders.
 */
export function getAvatarGradient(name) {
    const hue = [...(name || 'A')].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
    return `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${(hue + 40) % 360}, 70%, 50%))`;
}
