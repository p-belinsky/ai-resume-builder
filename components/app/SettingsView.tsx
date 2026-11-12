"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteAccount, cancelPlan, resetDemo, resumePlan, updateProfile, useDemo } from "../../lib/demo/store";
import { Icon } from "../landing/Icon";
import { AppShell, requestUpgrade } from "./AppShell";
import { ConfirmDialog } from "./ConfirmDialog";
import { DashboardSkeleton } from "./Skeletons";
import { useToast } from "./Toast";

export function SettingsView() {
  const demo = useDemo();
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { showToast } = useToast();
  if (!demo) return <AppShell><DashboardSkeleton /></AppShell>;

  return (
    <AppShell>
      <div className="settings-page">
        <div className="settings-heading"><p className="eyebrow">YOUR ACCOUNT</p><h1>Settings</h1><p className="page-lede">A few details about your Orbit workspace.</p></div>
        <section className="settings-card profile-settings">
          <div className="settings-card-heading"><div><h2>Personal details</h2><p>Keep your account information up to date.</p></div><span className="settings-card-icon"><Icon name="user" /></span></div>
          <ProfileForm key={demo.user.email} name={demo.user.name} role={demo.user.role} onSave={(name, role) => { updateProfile(name, role); showToast("Your profile is updated."); }} />
          <div className="settings-readonly"><span>Email address</span><strong>{demo.user.email}</strong><small>Email updates aren’t connected in this demo.</small></div>
        </section>

        <section className="settings-card billing-settings">
          <div className="settings-card-heading"><div><h2>Plan & billing</h2><p>Your plan gives you room to build at your own pace.</p></div><span className="plan-pill"><i /> {demo.plan === "pro" ? "ORBIT PRO" : "FREE PLAN"}</span></div>
          <div className="billing-plan-row"><div><span className="billing-plan-name">{demo.plan === "pro" ? "Orbit Pro" : "Orbit Free"}</span><p>{demo.plan === "pro" ? "$15 / month · Demo subscription" : "The thoughtful place to begin."}</p></div>{demo.plan === "free" ? <button className="button-primary-app" onClick={requestUpgrade} type="button">Explore Pro <Icon name="arrow-right" /></button> : <strong className="billing-price">$15 <small>/ month</small></strong>}</div>
          {demo.plan === "pro" && <div className="subscription-state"><Icon name={demo.cancelAtPeriodEnd ? "clock" : "check-circle"} /><span>{demo.cancelAtPeriodEnd ? "Your plan is set to end at the end of this period." : "Your subscription is active in this demo."}</span></div>}
          {demo.plan === "pro" && <div className="billing-actions">{demo.cancelAtPeriodEnd ? <button className="button-outline-app" onClick={() => { resumePlan(); showToast("Your Pro plan will continue."); }} type="button">Resume plan</button> : <button className="text-action" onClick={() => { cancelPlan(); showToast("Your plan is set to cancel at period end.", "info"); }} type="button">Cancel subscription</button>}<span>Manage billing actions are simulated.</span></div>}
          <div className="plan-perks"><span><Icon name="check" /> {demo.plan === "pro" ? "Unlimited resumes" : "1 resume at a time"}</span><span><Icon name="check" /> {demo.plan === "pro" ? "300 AI actions / month" : "5 AI actions"}</span><span><Icon name="check" /> {demo.plan === "pro" ? "Unlimited PDF downloads" : "1 PDF download"}</span></div>
        </section>

        <section className="settings-card demo-settings">
          <div className="settings-card-heading"><div><h2>Demo workspace</h2><p>Everything here is stored only in this browser.</p></div><span className="settings-card-icon"><Icon name="sparkle" /></span></div>
          <div className="demo-settings-row"><div><strong>Start fresh</strong><p>Restore the sample profile, resume, and usage counters.</p></div><button className="button-outline-app" onClick={() => { resetDemo(); showToast("Your demo workspace is back to its starting point."); }} type="button">Reset demo data</button></div>
          <div className="demo-settings-row danger-row"><div><strong>Delete account</strong><p>Clear this local demo profile and its saved resume.</p></div><button className="text-action text-danger" onClick={() => setDeleteOpen(true)} type="button">Delete demo account</button></div>
        </section>
        {deleteOpen && <ConfirmDialog confirmLabel="Delete account" description="This removes the fake profile and all resumes saved in this browser. You can start again from the sign-in screen." onCancel={() => setDeleteOpen(false)} onConfirm={() => { deleteAccount(); setDeleteOpen(false); router.push("/auth/sign-in"); }} title="Delete your demo account?" />}
      </div>
    </AppShell>
  );
}

function ProfileForm({ name, role, onSave }: { name: string; role: string; onSave: (name: string, role: string) => void }) {
  const [draftName, setDraftName] = useState(name);
  const [draftRole, setDraftRole] = useState(role);
  return (
    <form className="settings-profile-form" onSubmit={(event) => { event.preventDefault(); onSave(draftName, draftRole); }}>
      <label className="form-field">Full name<input autoComplete="name" onChange={(event) => setDraftName(event.target.value)} value={draftName} /></label>
      <label className="form-field">Current role<input onChange={(event) => setDraftRole(event.target.value)} placeholder="What do you do?" value={draftRole} /></label>
      <button className="button-outline-app" type="submit">Save details</button>
    </form>
  );
}