import Link from "next/link";
import { BRAND } from "../../lib/config";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link aria-label={`${BRAND.name} home`} className={`site-brand${light ? " site-brand-light" : ""}`} href="/">
      <span className="site-brand-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(-34 16 16)" />
          <circle cx="24.7" cy="8.1" r="2" fill="currentColor" />
        </svg>
      </span>
      <span className="site-brand-name">{BRAND.name}</span>
    </Link>
  );
}