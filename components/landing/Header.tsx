"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Brand } from "./Brand";
import { Icon } from "./Icon";

const navigation = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Why Orbit" },
  { href: "#pricing", label: "Pricing" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${isScrolled ? " site-header-scrolled" : ""}`}>
      <div className="site-header-inner">
        <Brand light={!isScrolled} />
        <nav aria-label="Main navigation" className={`site-nav${menuOpen ? " site-nav-open" : ""}`}>
          {navigation.map((item) => (
            <a href={item.href} key={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <Link className="site-nav-mobile-cta" href="/auth/sign-up" onClick={closeMenu}>
            Get started <Icon name="arrow-up-right" />
          </Link>
        </nav>
        <div className="site-header-actions">
          <Link className="site-login" href="/auth/sign-in">Log in</Link>
          <Link className="button button-small button-cream" href="/auth/sign-up">
            Build your resume <Icon name="arrow-up-right" />
          </Link>
        </div>
        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          className="site-menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}