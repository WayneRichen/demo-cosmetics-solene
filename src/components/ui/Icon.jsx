/**
 * Thin-stroke icon set. Usage: <Icon name="bag" size={20} />
 * Add new icons by adding a path entry below (24×24 viewBox, stroke only).
 */
const paths = {
  bag: (
    <>
      <path d="M5 8h14l-1 12.5a1 1 0 0 1-1 .9H7a1 1 0 0 1-1-.9L5 8Z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M3 8h18M3 16h18" />,
  arrowRight: <path d="M4 12h15m-5-5 5 5-5 5" />,
  arrowLeft: <path d="M20 12H5m5-5-5 5 5 5" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronLeft: <path d="m15 6-6 6 6 6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z" />
      <path d="M5 19 13 11" />
    </>
  ),
  drop: <path d="M12 3.5S6 10 6 14a6 6 0 0 0 12 0c0-4-6-10.5-6-10.5Z" />,
  flask: (
    <>
      <path d="M9.5 3.5h5M10 3.5v5.5L5 18.5a1.5 1.5 0 0 0 1.3 2h11.4a1.5 1.5 0 0 0 1.3-2L14 9V3.5" />
      <path d="M7.5 14.5h9" />
    </>
  ),
  rabbit: (
    <>
      <path d="M8 13.5c-2.5 1-3.5 3-3.5 4.5 0 1.6 1.3 2.5 3 2.5h8c2.5 0 4-1.5 4-3.7 0-2.8-2.5-4.8-5.5-4.8" />
      <path d="M10 12.5C8.5 9 8.5 4.5 10 3.5s2.5 4 2.5 8" />
      <path d="M12.5 11.5c.5-3.5 2-7 3.5-7s1 4-1 7.5" />
    </>
  ),
  star: <path d="m12 3.8 2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.6-5 2.6.9-5.6-4-3.9 5.6-.8L12 3.8Z" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
    </>
  ),
  pinterest: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10.8 9.2c.4-1.6 3.6-2 4.4 0 .8 2.3-.9 5-2.8 4.6-1-.2-1.3-1-1.3-1M11.2 11.4l-2 8" />
    </>
  ),
  tiktok: <path d="M14 3.5v11a3.5 3.5 0 1 1-3.5-3.5M14 3.5c.4 2.3 2.2 4 4.5 4.2" />,
};

export default function Icon({ name, size = 20, strokeWidth = 1.25, className, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
