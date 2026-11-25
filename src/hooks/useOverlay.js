import { useEffect, useRef } from 'react';

/**
 * Behaviour shared by modal, drawer and mobile menu:
 *  - locks page scroll while open
 *  - closes on Escape
 *  - traps Tab focus inside `ref` and restores focus on close
 */
export function useOverlay(isOpen, onClose) {
  const ref = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return undefined;

    const previouslyFocused = document.activeElement;
    document.body.classList.add('is-locked');

    const focusables = () =>
      ref.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ) ?? [];

    // focus the first control after the opening transition starts
    const t = setTimeout(() => focusables()[0]?.focus({ preventScroll: true }), 60);

    const onKey = (e) => {
      if (e.key === 'Escape') onCloseRef.current();
      if (e.key !== 'Tab') return;
      const els = [...focusables()];
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      // only unlock if no other overlay is still open
      if (!document.querySelector('[data-overlay-open="true"]')) {
        document.body.classList.remove('is-locked');
      }
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  return ref;
}
