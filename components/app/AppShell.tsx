"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BRAND } from "../../lib/config";
import { useDemo } from "../../lib/demo/store";
import { Brand } from "../landing/Brand";
import { Icon } from "../landing/Icon";
import { UpgradeDialog } from "./UpgradeDialog";

export function requestUpgrade() {
  window.dispatchEvent(new Event("orbit:upgrade"));
}

export function AppShell({ children }: { children: ReactNode }) {
  const demo = useDemo();
  const router = useRouter();
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const openUpgrade = () => setUpgradeOpen(true);
    window.addEventListener("orbit:upgrade", openUpgrade);
    return () => window.removeEventListener("orbit:upgrade", openUpgrade);
  }, []);

  if (!demo) return <div className="app-loading"><div className="loading-orbit" /><span>Getting your workspace ready…</span></div>;

  const initials = demo.user.name.split(" ").map((part) => part[0]).slice(0, 2).join("");
  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="app-shell">
      <aside className={`app-sidebar${mobileOpen ? " app-sidebar-open" : ""}`}>
        <div className="sidebar-brand"><Brand /></div>
        <p className="sidebar-caption">WORKSPACE</p>
        <nav aria-label="Workspace navigation" className="sidebar-nav">
          <Link href="/dashboard" onClick={closeMobile}><Icon name="grid" /><span>Overview</span></Link>
          <Link href="/dashboard#resumes" onClick={closeMobile}><Icon name="file" /><span>My resumes</span><b>{demo.resumes.length}</b></Link>
          <Link href="/settings" onClick={closeMobile}><Icon name="settings" /><span>Settings</span></Link>
        </nav>
        <div className="sidebar-spacer" />
        {demo.plan === "free" ? (
          <div className="sidebar-upgrade">
            <span className="upgrade-sparkle"><Icon name="sparkle" /></span>
            <strong>A little more room?</strong>
            <p>Unlock all the tools for your next chapter.</p>
            <button onClick={requestUpgrade} type="button">Explore Pro <Icon name="arrow-right" /></button>
          </div>
        ) : (
          <div className="sidebar-pro"><Icon name="sparkle" /><span>You’re on Orbit Pro</span></div>
        )}
        <Link className="sidebar-profile" href="/settings">
          <span className="avatar">{initials}</span>
          <span className="sidebar-user"><strong>{demo.user.name}</strong><small>{demo.plan === "pro" ? "Pro member" : "Free plan"}</small></span>
          <Icon name="chevron-down" />
        </Link>
      </aside>
      {mobileOpen && <button aria-label="Close navigation" className="mobile-scrim" onClick={closeMobile} type="button" />}
      <div className="app-main-column">
        <header className="app-topbar">
          <button aria-label="Open navigation" className="mobile-menu-button" onClick={() => setMobileOpen(true)} type="button"><Icon name="grid" /></button>
          <span className="topbar-greeting">A little closer to your next chapter.</span>
          <div className="topbar-actions">
            <Link className="topbar-help" href="/">Visit site</Link>
            <button aria-label="Open account settings" className="topbar-avatar" onClick={() => router.push("/settings")} type="button">{initials}</button>
          </div>
        </header>
        <main className="app-main">{children}</main>
        <footer className="app-footer"><span>© {BRAND.name}</span><span>Made for your next chapter <i>✦</i></span></footer>
      </div>
      <UpgradeDialog onClose={() => setUpgradeOpen(false)} open={upgradeOpen} />
    </div>
  );
}