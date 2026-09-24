type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Logo({ className = "h-7 w-7" }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <g stroke="var(--color-bg)" strokeWidth="2" strokeLinejoin="round">
        {/* Top Face - Cyan (Control & Security) */}
        <path d="M16 2 L3 9.5 L16 17 L29 9.5 Z" fill="#5bc8dc" />
        {/* Left Face - Amber (Migration & Activity) */}
        <path d="M3 9.5 L3 24.5 L16 32 L16 17 Z" fill="#f2a33c" />
        {/* Right Face - Green (Integrity & Success) */}
        <path d="M29 9.5 L29 24.5 L16 32 L16 17 Z" fill="#4cc573" />
      </g>
    </svg>
  );
}

export function IconServer({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <rect x="3.5" y="4" width="17" height="7" rx="1.5" />
      <rect x="3.5" y="13" width="17" height="7" rx="1.5" />
      <path d="M7 7.5h.01M7 16.5h.01" strokeWidth="2.4" />
      <path d="M13.5 7.5h3.5M13.5 16.5h3.5" opacity="0.7" />
    </svg>
  );
}

export function IconShare({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M3.5 8.5 12 4l8.5 4.5L12 13 3.5 8.5Z" />
      <path d="M3.5 13 12 17.5l8.5-4.5" opacity="0.7" />
      <path d="M3.5 17 12 21.5 20.5 17" opacity="0.4" />
    </svg>
  );
}

export function IconDisk({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M14.2 13.6 19 18" opacity="0.7" />
    </svg>
  );
}

export function IconGap({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M4 12h4.5M15.5 12H20" />
      <path d="M10.2 8.8a4.5 4.5 0 0 0 0 6.4M13.8 8.8a4.5 4.5 0 0 1 0 6.4" opacity="0.7" />
      <path d="M5 5l14 14" stroke="#e0655a" strokeWidth="1.8" />
    </svg>
  );
}

export function IconLock({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <rect x="5.5" y="10.5" width="13" height="9.5" rx="1.5" />
      <path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7" />
      <path d="M12 14.2v2.4" strokeWidth="2" />
    </svg>
  );
}

export function IconAudit({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
      <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4" />
      <circle cx="16" cy="15.4" r="0.4" fill="currentColor" />
    </svg>
  );
}

export function IconKey({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <circle cx="8" cy="12" r="4" />
      <path d="M12 12h8.5M18 12v3M15.2 12v2.2" />
    </svg>
  );
}

export function IconCopy({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <rect x="8.5" y="8.5" width="11" height="11" rx="1.5" />
      <path d="M15.5 5.5v-1a1.5 1.5 0 0 0-1.5-1.5H5.5A1.5 1.5 0 0 0 4 4.5V13a1.5 1.5 0 0 0 1.5 1.5h1" opacity="0.7" />
    </svg>
  );
}

export function IconCheck({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M4.5 12.5 10 18 19.5 6.5" />
    </svg>
  );
}

export function IconChevron({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M6 9.5l6 6 6-6" />
    </svg>
  );
}

export function IconArrow({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M4 12h15M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function IconClock({ className = "h-5 w-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.2 2" />
    </svg>
  );
}
