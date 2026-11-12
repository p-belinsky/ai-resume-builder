"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PLANS } from "../../lib/plans";
import { createResume, deleteResume, duplicateResume, LimitReachedError, useDemo } from "../../lib/demo/store";
import { Icon } from "../landing/Icon";
import { AppShell, requestUpgrade } from "./AppShell";
import { ConfirmDialog } from "./ConfirmDialog";
import { DashboardSkeleton } from "./Skeletons";
import { useToast } from "./Toast";

function dateLabel(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

export function DashboardView() {
  const demo = useDemo();
  const router = useRouter();
  const { showToast } = useToast();
  const [removeId, setRemoveId] = useState<string | null>(null);
  if (!demo) return <AppShell><DashboardSkeleton /></AppShell>;

  const create = () => {
    try {
      router.push(`/resumes/${createResume()}`);
    } catch (error) {
      if (error instanceof LimitReachedError) requestUpgrade();
      else showToast("Couldn’t create a resume. Please try again.", "error");
    }
  };

  const selectedResume = demo.resumes.find((resume) => resume.id === removeId);
  const usedAi = demo.plan === "pro" ? demo.usage.aiActionsThisMonth : demo.usage.aiActions;
  const aiLimit = demo.plan === "pro" ? 300 : 5;

  return (
    <AppShell>
      <div className="dashboard-page">
        <section className="welcome-row">
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h1>Good morning, {demo.user.name.split(" ")[0]}<span className="welcome-sparkle">✦</span></h1>
            <p className="page-lede">Every next chapter starts somewhere. Let’s make yours a little clearer.</p>
          </div>
          <button className="button-primary-app" onClick={create} type="button"><Icon name="plus" /> Create a resume</button>
        </section>

        <section aria-label="Your plan usage" className="usage-cards">
          <article className="usage-card"><span className="usage-icon usage-icon-rose"><Icon name="file" /></span><div><span>Resumes</span><strong>{demo.resumes.length}<small>{demo.plan === "pro" ? " / unlimited" : " / 1"}</small></strong></div><i className="usage-card-arrow">↗</i></article>
          <article className="usage-card"><span className="usage-icon usage-icon-lilac"><Icon name="sparkle" /></span><div><span>AI actions</span><strong>{usedAi}<small> / {aiLimit}{demo.plan === "pro" ? " this month" : " used"}</small></strong></div><div className="usage-progress"><span style={{ width: `${Math.min(100, (usedAi / aiLimit) * 100)}%` }} /></div></article>
          <article className="usage-card"><span className="usage-icon usage-icon-sage"><Icon name="download" /></span><div><span>PDF downloads</span><strong>{demo.usage.pdfDownloads}<small>{demo.plan === "pro" ? " / unlimited" : " / 1"}</small></strong></div><i className="usage-card-arrow">↗</i></article>
        </section>

        <section className="resume-section" id="resumes">
          <div className="section-title-row">
            <div><p className="eyebrow">YOUR STORY, IN PROGRESS</p><h2>My resumes <span>{demo.resumes.length}</span></h2></div>
            {demo.resumes.length > 0 && <button className="button-outline-app" onClick={create} type="button"><Icon name="plus" /> New resume</button>}
          </div>
          {demo.resumes.length ? (
            <div className="resume-list">
              {demo.resumes.map((resume, index) => (
                <article className="resume-list-card" key={resume.id}>
                  <Link aria-label={`Edit ${resume.title}`} className={`resume-thumbnail resume-thumbnail-${index % 3}`} href={`/resumes/${resume.id}`}>
                    <span className="thumbnail-name">{resume.content.contact.fullName || "Your name"}</span><span className="thumbnail-rule" /><span className="thumbnail-lines" /><span className="thumbnail-lines short" />
                  </Link>
                  <div className="resume-card-body">
                    <div className="resume-card-heading"><div><Link href={`/resumes/${resume.id}`}>{resume.title}</Link><span className="resume-status"><i /> In progress</span></div><div className="resume-card-menu"><button aria-label={`Duplicate ${resume.title}`} onClick={() => {
                      try {
                        const id = duplicateResume(resume.id);
                        if (id) { router.push(`/resumes/${id}`); showToast("Resume duplicated."); }
                      } catch (error) {
                        if (error instanceof LimitReachedError) requestUpgrade();
                      }
                    }} type="button"><Icon name="copy" /></button><button aria-label={`Delete ${resume.title}`} onClick={() => setRemoveId(resume.id)} type="button"><Icon name="trash" /></button></div></div>
                    <p className="resume-card-meta">Updated {dateLabel(resume.updatedAt)}</p>
                    <p className="resume-card-role">{resume.content.experience[0]?.jobTitle || "Add your experience"}{resume.content.experience[0]?.company ? ` · ${resume.content.experience[0].company}` : ""}</p>
                    <div className="resume-card-footer"><span><Icon name="file" /> Classic template</span><Link href={`/resumes/${resume.id}`}>Continue editing <Icon name="arrow-right" /></Link></div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-resumes">
              <span className="empty-art"><Icon name="file" /><i>✦</i></span>
              <h3>Your next chapter starts here.</h3>
              <p>Create a resume that feels like you, then shape it one thoughtful step at a time.</p>
              <button className="button-primary-app" onClick={create} type="button"><Icon name="plus" /> Create your first resume</button>
            </div>
          )}
        </section>

        <section className="plan-strip">
          <span className="plan-strip-icon"><Icon name="sparkle" /></span>
          <div><strong>{demo.plan === "pro" ? "You’re making the most of Orbit Pro." : "Your Free plan is a lovely place to start."}</strong><p>{demo.plan === "pro" ? "Your workspace is ready for whatever comes next." : `${PLANS.free.resumes} · ${PLANS.free.pdfDownloads} · ${PLANS.free.aiActions}`}</p></div>
          {demo.plan === "free" && <button onClick={requestUpgrade} type="button">See what Pro can do <Icon name="arrow-right" /></button>}
        </section>
      </div>
      {selectedResume && <ConfirmDialog description={`“${selectedResume.title}” will be removed from this demo workspace.`} onCancel={() => setRemoveId(null)} onConfirm={() => { deleteResume(selectedResume.id); setRemoveId(null); showToast("Resume deleted."); }} title="Delete this resume?" />}
    </AppShell>
  );
}