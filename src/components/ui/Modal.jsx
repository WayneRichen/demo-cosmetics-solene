import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useOverlay } from '../../hooks/useOverlay';
import Icon from './Icon';
import './Modal.css';

const EXIT_MS = 400;

/**
 * Accessible modal dialog rendered into <body>.
 * Keeps itself mounted during the exit transition.
 */
export default function Modal({ isOpen, onClose, label, children, className = '' }) {
  const [mounted, setMounted] = useState(isOpen);
  const [visible, setVisible] = useState(false);
  const ref = useOverlay(isOpen, onClose);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    const t = setTimeout(() => setMounted(false), EXIT_MS);
    return () => clearTimeout(t);
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <div className={`modal ${visible ? 'is-visible' : ''}`} data-overlay-open={isOpen}>
      <div className="modal__backdrop" onClick={onClose} aria-hidden="true" />
      <div
        ref={ref}
        className={`modal__dialog ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={label}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <Icon name="close" size={22} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
