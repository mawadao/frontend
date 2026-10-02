/** Small line-icon set, drawn on a 24px grid with a consistent 1.6 stroke. */
const paths = {
  store: "M3.5 9.5 5 4.5h14l1.5 5M3.5 9.5a2.75 2.75 0 0 0 5.5 0 2.75 2.75 0 0 0 5.5 0 2.75 2.75 0 0 0 5.5 0M5 12.5v7h14v-7M10 19.5v-4h4v4",
  chain: "M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1",
  gift: "M4 10h16v3H4zM5.5 13h13v7h-13zM12 10v10M12 10S10.5 5 8 5.5 7 9.5 12 10Zm0 0s1.5-5 4-4.5 1 4-4 4.5Z",
  people: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M16 4.3a3.5 3.5 0 0 1 0 6.4M18 14.8c1.8.7 3 2.6 3 5.2",
  layers: "m12 3.5 9 4.5-9 4.5L3 8Zm-9 8.5 9 4.5 9-4.5M3 16l9 4.5 9-4.5",
  signal: "M5 19.5v-3M9.5 19.5v-6M14 19.5v-9M18.5 19.5v-13",
  shield: "M12 3.5 19.5 6v5.5c0 4.5-3.2 8-7.5 9-4.3-1-7.5-4.5-7.5-9V6ZM9 12l2.2 2.2L15.5 10",
  lock: "M6 10.5h12v9.5H6zM8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14.5v2",
  eye: "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  scale: "M12 4v16M7 20h10M4.5 7.5h15M7 7.5 4 14a3 3 0 0 0 6 0Zm10 0-3 6.5a3 3 0 0 0 6 0Z",
  hand: "M8 12V6.5a1.5 1.5 0 0 1 3 0V11m0-5.5V5a1.5 1.5 0 0 1 3 0v6m0-4.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-.5a6 6 0 0 1-5-2.7L3.6 14.2a1.5 1.5 0 0 1 2.4-1.8L8 14.5",
  flag: "M5.5 21V4m0 1h11l-2 4 2 4h-11",
  code: "m8.5 8-4 4 4 4m7-8 4 4-4 4M13.5 5.5l-3 13",
  school: "M12 4 2.5 9 12 14l9.5-5ZM6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5M21.5 9v5",
  briefcase: "M3.5 8h17v11.5h-17zM9 8V5.5h6V8M3.5 13h17",
  heart: "M12 20s-8-4.6-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.4 12 20 12 20Z",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "h-7 w-7" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
