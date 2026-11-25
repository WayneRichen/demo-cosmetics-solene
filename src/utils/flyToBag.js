/**
 * "Add to bag" flight animation.
 * Clones a small round thumbnail at `fromEl`, flies it in an arc to the navbar
 * bag icon (`[data-bag-target]`) and resolves when it lands.
 */
export function flyToBag(fromEl, imageSrc) {
  const target = document.querySelector('[data-bag-target]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fromEl || !target || reduced || !document.body.animate) return Promise.resolve();

  // the navbar hides on scroll down — ask it to come back so the bag is visible
  window.dispatchEvent(new CustomEvent('solene:show-nav'));

  const from = fromEl.getBoundingClientRect();
  const rect = target.getBoundingClientRect();
  // measure where the bag will be once the header has slid back in (ignore its current translateY)
  const header = target.closest('header');
  const offsetY = header ? new DOMMatrixReadOnly(getComputedStyle(header).transform).m42 : 0;
  const to = { left: rect.left, top: rect.top - offsetY, width: rect.width, height: rect.height };
  const size = 56;

  const dot = document.createElement('div');
  dot.className = 'fly-to-bag';
  dot.style.cssText = `
    position: fixed; z-index: 120; pointer-events: none;
    left: ${from.left + from.width / 2 - size / 2}px;
    top: ${from.top + from.height / 2 - size / 2}px;
    width: ${size}px; height: ${size}px; border-radius: 50%;
    background: #e8dccb url("${imageSrc}") center / cover no-repeat;
    box-shadow: 0 10px 30px -8px rgba(59, 42, 32, .45);
    border: 2px solid #faf7f2;
  `;
  document.body.appendChild(dot);

  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);

  // Arc: rise up first, then drop into the bag
  const animation = dot.animate(
    [
      { transform: 'translate(0, 0) scale(0.4)', opacity: 0 },
      { transform: 'translate(0, -20px) scale(1)', opacity: 1, offset: 0.15 },
      { transform: `translate(${dx * 0.55}px, ${dy * 0.55 - 120}px) scale(0.8)`, opacity: 1, offset: 0.55 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.15)`, opacity: 0.4 },
    ],
    { duration: 850, easing: 'cubic-bezier(0.45, 0, 0.25, 1)' }
  );

  return animation.finished.then(() => dot.remove(), () => dot.remove());
}
