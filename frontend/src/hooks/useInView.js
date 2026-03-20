import { useEffect, useState, useRef } from 'react';

export function useInView(options = { triggerOnce: true, threshold: 0.1 }) {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const currentRef = ref.current;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                if (options.triggerOnce && currentRef) {
                    observer.unobserve(currentRef);
                }
            } else if (!options.triggerOnce) {
                setInView(false);
            }
        }, {
            threshold: options.threshold,
            rootMargin: options.rootMargin
        });

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options.triggerOnce, options.threshold, options.rootMargin]);

    return { ref, inView };
}
