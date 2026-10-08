import { useId } from "react";

/** The MAWA "M" monogram: a connected network path with joint nodes. */
export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0f0c29" />
          <stop offset="0.55" stopColor="#24243e" />
          <stop offset="1" stopColor="#302b63" />
        </linearGradient>
        <linearGradient id={`${id}m`} x1="130" y1="160" x2="382" y2="352" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f7b733" />
          <stop offset="1" stopColor="#fc4a1a" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill={`url(#${id}bg)`} />
      <path
        d="M130,352 L130,160 L256,280 L382,160 L382,352"
        stroke={`url(#${id}m)`}
        strokeWidth="34"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <g fill="#f7b733">
        <circle cx="130" cy="352" r="22" />
        <circle cx="130" cy="160" r="22" />
        <circle cx="256" cy="280" r="24" />
        <circle cx="382" cy="160" r="22" />
        <circle cx="382" cy="352" r="22" />
      </g>
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <LogoMark className="h-6 w-6 shrink-0" />
      <span className="text-callout leading-none font-semibold tracking-[-0.01em]">
        MAWA <span className="text-brand">DAO</span>
      </span>
    </span>
  );
}
