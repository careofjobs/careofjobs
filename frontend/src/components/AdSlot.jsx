import { useEffect, useRef } from 'react';

// Centralised AdSense client + behaviour flags
const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT;
const LOAD_ADS = Boolean(ADSENSE_CLIENT);

// Basic singleton guard so we don't inject the script multiple times
let adsScriptAdded = false;

/**
 * Reusable Google AdSense slot with graceful fallback.
 * Renders a styled placeholder when no client/slot is configured so local
 * development still looks intentional.
 */
export default function AdSlot({
  slot,
  format = 'auto',
  layout = '',
  responsive = 'true',
  className = '',
  style = {}
}) {
  const adRef = useRef(null);

  // Load the AdSense library once per page
  useEffect(() => {
    if (!LOAD_ADS || adsScriptAdded) return;

    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-adsbygoogle-client', ADSENSE_CLIENT);
    document.head.appendChild(script);

    adsScriptAdded = true;
  }, []);

  // Tell AdSense to fill this <ins> after mount
  useEffect(() => {
    if (!LOAD_ADS || !slot || !adRef.current) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // In dev or if the user blocks ads, this can safely fail silently.
    }
  }, [slot]);

  // Friendly placeholder when ads are disabled or slot ID missing
  if (!LOAD_ADS || !slot) {
    return (
      <div
        className={`glass-card border-dashed border-white/10 text-zinc-400 text-sm flex items-center justify-between gap-3 px-4 py-3 ${className}`}
      >
        <span>Ad space</span>
        <span className="text-xs text-zinc-500">
          Set VITE_ADSENSE_CLIENT and slot env vars to enable ads.
        </span>
      </div>
    );
  }

  // Development dummy block to confirm the keys are loaded correctly
  // (Because real Google Ads actively refuse to render on localhost)
  if (import.meta.env.DEV) {
    return (
      <div className={`glass-card border-dashed border-[#2dd4bf] bg-[#2dd4bf]/5 text-center flex flex-col items-center justify-center gap-1 py-10 px-4 ${className}`}>
        <span className="text-[#2dd4bf] font-bold">Google AdSense Space</span>
        <span className="text-sm text-zinc-300">Slot ID: {slot}</span>
        <span className="text-xs text-zinc-500 mt-2 text-balance">
          Ads are successfully configured, but Google hides them on localhost. They will run normally on your live website.
        </span>
      </div>
    );
  }

  return (
    <div className={`glass-card ${className}`}>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block', minHeight: '120px', ...style }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
        data-ad-layout={layout}
        ref={adRef}
      />
    </div>
  );
}
