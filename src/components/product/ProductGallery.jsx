import { useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon';
import './ProductGallery.css';

const SWIPE_THRESHOLD = 50;

/**
 * Image carousel with arrows, thumbnails, keyboard (← →) and swipe support.
 */
export default function ProductGallery({ images, alt, className = '' }) {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const drag = useRef(null);
  const count = images.length;

  // reset when switching product
  useEffect(() => setIndex(0), [images]);

  const go = (i) => setIndex((i + count) % count);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(index + 1);
    if (e.key === 'ArrowLeft') go(index - 1);
  };

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY, active: false };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    // only treat as a swipe once horizontal intent is clear (lets vertical scroll through)
    if (!d.active && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(e.clientY - d.y)) {
      d.active = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (d.active) setDragX(dx);
  };

  const onPointerUp = () => {
    if (drag.current?.active) {
      if (dragX < -SWIPE_THRESHOLD) go(index + 1);
      else if (dragX > SWIPE_THRESHOLD) go(index - 1);
    }
    drag.current = null;
    setDragX(0);
  };

  return (
    <div
      className={`gallery ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${alt} images`}
      onKeyDown={onKeyDown}
    >
      <div
        className="gallery__viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className={`gallery__track ${dragX ? 'is-dragging' : ''}`}
          style={{ transform: `translateX(calc(${-index * 100}% + ${dragX}px))` }}
        >
          {images.map((src, i) => (
            <div
              className="gallery__slide"
              key={src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
            >
              <img src={src} alt={i === 0 ? alt : ''} draggable="false" loading={i === 0 ? 'eager' : 'lazy'} />
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button className="gallery__arrow gallery__arrow--prev" onClick={() => go(index - 1)} aria-label="Previous image">
              <Icon name="chevronLeft" size={20} />
            </button>
            <button className="gallery__arrow gallery__arrow--next" onClick={() => go(index + 1)} aria-label="Next image">
              <Icon name="chevronRight" size={20} />
            </button>
            <p className="gallery__counter" aria-live="polite">
              {String(index + 1).padStart(2, '0')} <span>/ {String(count).padStart(2, '0')}</span>
            </p>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="gallery__thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              className={`gallery__thumb ${i === index ? 'is-active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
