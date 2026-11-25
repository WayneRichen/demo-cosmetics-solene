import { useEffect } from 'react';

/**
 * Scroll-reveal for any element with a `data-reveal` attribute.
 * Optional: `style={{ '--reveal-delay': '120ms' }}` to stagger.
 * A MutationObserver picks up elements rendered later (e.g. after filtering).
 */
export function useReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const observe = (root) => {
      root.querySelectorAll?.('[data-reveal]:not(.is-visible)').forEach((el) => {
        if (prefersReduced) el.classList.add('is-visible');
        else io.observe(el);
      });
    };

    observe(document);

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach((node) => node.nodeType === 1 && observe(node.parentNode ?? node)));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
