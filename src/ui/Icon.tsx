import type { ReactNode } from "react";
export type IconName =
  | "arrow"
  | "back"
  | "check"
  | "book"
  | "grid"
  | "flask"
  | "refresh"
  | "menu"
  | "close"
  | "chevron"
  | "spark"
  | "sun"
  | "search";
const paths: Record<IconName, ReactNode> = {
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  back: <path d="M20 12H5m6-6-6 6 6 6" />,
  check: <path d="m5 12 4 4L19 6" />,
  book: (
    <path d="M12 5v15M12 5C8 2 3 4 3 4v15s5-2 9 1c4-3 9-1 9-1V4s-5-2-9 1Z" />
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  flask: (
    <>
      <path d="M9 3h6m-5 0v6L4 19a1.4 1.4 0 0 0 1 2h14a1.4 1.4 0 0 0 1-2L14 9V3M7 15h10" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 7v5h-5M4 17v-5h5" />
      <path d="M6.1 6a8 8 0 0 1 12.2 1L20 12M4 12l1.7 5A8 8 0 0 0 18 18" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  spark: <path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
};
export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
