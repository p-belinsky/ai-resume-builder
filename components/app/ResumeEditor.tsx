"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { generateBullets, generateSummary, improveBullet } from "../../lib/demo/ai";
import { assertLimit, LimitReachedError, recordUsage, saveResume, useDemo } from "../../lib/demo/store";
import { downloadResumePdf } from "../../lib/resume/pdf";
import type { Resume, ResumeContent } from "../../lib/resume/types";
import { Icon } from "../landing/Icon";
import { AppShell, requestUpgrade } from "./AppShell";
import { AiSuggestionDialog } from "./AiSuggestionDialog";
import { EditorSkeleton } from "./Skeletons";
import { JobMatchPanel } from "./JobMatchPanel";
import { ResumePreview } from "./ResumePreview";
import { useToast } from "./Toast";

export function ResumeEditor({ id }: { id: string }) {
  const demo = useDemo();
  if (!demo) return <AppShell><EditorSkeleton /></AppShell>;
  const resume = demo.resumes.find((item) => item.id === id);
  return <AppShell>{resume ? <ResumeEditorForm key={resume.id} resume={resume} /> : <div className="not-found-card"><span className="empty-art"><Icon name="file" /></span><h1>We couldn’t find that resume.</h1><p>It may have been deleted, or this demo link may be out of date.</p><Link className="button-primary-app" href="/dashboard">Back to your workspace <Icon name="arrow-right" /></Link></div>}</AppShell>;
}

type Suggestion = { kind: "bullets" | "summary" | "improve"; targetId?: string; bulletIndex?: number; result: string | string[] };

function ResumeEditorForm({ resume }: { resume: Resume }) {
  const [title, setTitle] = useState(resume.title);
  const [content, setContent] = useState<ResumeContent>(() => structuredClone(resume.content));
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [generating, setGenerating] = useState<string | null>(null);
  const [baseline, setBaseline] = useState(JSON.stringify({ title: resume.title, content: resume.content }));
  const { showToast } = useToast();
  const dirty = JSON.stringify({ title, content }) !== baseline;

  useEffect(() => {
    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = "";
    };
    const confirmNavigation = (event: MouseEvent) => {
      if (!dirty || !(event.target instanceof Element)) return;
      const anchor = event.target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const destination = new URL(anchor.href, window.location.href);
      if (destination.pathname === window.location.pathname && destination.hash === window.location.hash) return;
      if (!window.confirm("You have unsaved changes. Leave this page without saving?")) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    window.addEventListener("beforeunload", warnBeforeUnload);
    window.addEventListener("click", confirmNavigation, true);
    return () => {
      window.removeEventListener("beforeunload", warnBeforeUnload);
      window.removeEventListener("click", confirmNavigation, true);
    };
  }, [dirty]);

  const updateContact = (key: keyof ResumeContent["contact"], value: string) => {
    setContent((current) => ({ ...current, contact: { ...current.contact, [key]: value } }));
  };
  const updateExperience = (id: string, key: string, value: string | boolean | string[]) => {
    setContent((current) => ({ ...current, experience: current.experience.map((item) => item.id === id ? { ...item, [key]: value } : item) }));
  };
  const updateEducation = (id: string, key: string, value: string) => {
    setContent((current) => ({ ...current, education: current.education.map((item) => item.id === id ? { ...item, [key]: value } : item) }));
  };
  const save = () => {
    const cleanTitle = title.trim() || "Untitled resume";
    saveResume(resume.id, cleanTitle, content);
    setTitle(cleanTitle);
    setBaseline(JSON.stringify({ title: cleanTitle, content }));
    showToast("Your changes are saved.");
  };
  const gated = async (action: () => Promise<void>, label: string) => {
    try {
      assertLimit("ai");
      setGenerating(label);
      await action();
      recordUsage("ai");
    } catch (error) {
      if (error instanceof LimitReachedError) requestUpgrade();
      else showToast("That didn’t work just yet. Please try again.", "error");
    } finally {
      setGenerating(null);
    }
  };
  const addExperience = () => setContent((current) => ({ ...current, experience: [...current.experience, { id: `experience-${Date.now()}`, jobTitle: "", company: "", location: "", startDate: "", endDate: "", current: false, bullets: [] }] }));
  const addEducation = () => setContent((current) => ({ ...current, education: [...current.education, { id: `education-${Date.now()}`, school: "", degree: "", field: "", startDate: "", endDate: "" }] }));

  const downloadPdf = () => {
    try {
      assertLimit("pdf");
      if (dirty) save();
      downloadResumePdf(content, title);
      recordUsage("pdf");
      showToast("Your resume PDF is ready to download.");
    } catch (error) {
      if (error instanceof LimitReachedError) requestUpgrade();
      else showToast("Couldn’t create the PDF. Please try again.", "error");
    }
  };

  const acceptSuggestion = () => {
    if (!suggestion) return;
    if (suggestion.kind === "summary" && typeof suggestion.result === "string") setContent((current) => ({ ...current, summary: suggestion.result as string }));
    if (suggestion.kind === "bullets" && Array.isArray(suggestion.result) && suggestion.targetId) {
      const experience = content.experience.find((item) => item.id === suggestion.targetId);
      if (experience) updateExperience(experience.id, "bullets", [...experience.bullets, ...suggestion.result]);
    }
    if (suggestion.kind === "improve" && typeof suggestion.result === "string" && suggestion.targetId && suggestion.bulletIndex !== undefined) {
      const experience = content.experience.find((item) => item.id === suggestion.targetId);
      if (experience) updateExperience(experience.id, "bullets", experience.bullets.map((bullet, index) => index === suggestion.bulletIndex ? suggestion.result as string : bullet));
    }
    setSuggestion(null);
    showToast("Suggestion added to your resume.");
  };

  return (
    <div className="editor-page">
      <div className="editor-topline"><Link className="back-link" href="/dashboard"><Icon name="arrow-left" /> All resumes</Link><span className={dirty ? "save-state is-dirty" : "save-state"}><i />{dirty ? "Unsaved changes" : "All changes saved"}</span></div>
      <div className="editor-heading-row">
        <div><p className="eyebrow">RESUME BUILDER <span>·</span> CLASSIC TEMPLATE</p><input aria-label="Resume title" className="resume-title-input" onChange={(event) => setTitle(event.target.value)} value={title} /><p className="editor-subtitle">A clear, confident snapshot of what you bring.</p></div>
        <div className="editor-actions"><button className="button-secondary" disabled={!dirty} onClick={save} type="button">Save changes</button><button className="button-primary-app" onClick={downloadPdf} type="button"><Icon name="download" /> Download PDF</button></div>
      </div>
      <div className="editor-tabs" role="tablist"><button aria-selected={tab === "edit"} onClick={() => setTab("edit")} role="tab" type="button">Edit resume</button><button aria-selected={tab === "preview"} onClick={() => setTab("preview")} role="tab" type="button">Live preview</button></div>
      <div className={`editor-workspace editor-tab-${tab}`}>
        <div className="editor-form-column">
          <section className="editor-section">
            <div className="form-section-heading"><span className="section-number">01</span><div><h2>Contact</h2><p>How should a future teammate reach you?</p></div></div>
            <div className="form-grid">
              <label className="form-field">Full name<input autoComplete="name" onChange={(event) => updateContact("fullName", event.target.value)} placeholder="Your name" value={content.contact.fullName} /></label>
              <label className="form-field">Email<input autoComplete="email" onChange={(event) => updateContact("email", event.target.value)} placeholder="you@example.com" type="email" value={content.contact.email} /></label>
              <label className="form-field">Phone<input autoComplete="tel" onChange={(event) => updateContact("phone", event.target.value)} placeholder="(555) 000-0000" value={content.contact.phone} /></label>
              <label className="form-field">Location<input onChange={(event) => updateContact("location", event.target.value)} placeholder="City, State" value={content.contact.location} /></label>
              <label className="form-field">LinkedIn<input onChange={(event) => updateContact("linkedin", event.target.value)} placeholder="linkedin.com/in/you" value={content.contact.linkedin} /></label>
              <label className="form-field">Website<input onChange={(event) => updateContact("website", event.target.value)} placeholder="yourportfolio.com" value={content.contact.website} /></label>
            </div>
          </section>

          <section className="editor-section">
            <div className="form-section-heading"><span className="section-number">02</span><div><h2>About you</h2><p>A few lines that make your experience make sense.</p></div><button className="ai-button" disabled={!!generating} onClick={() => gated(async () => setSuggestion({ kind: "summary", result: await generateSummary(content) }), "summary")} type="button"><Icon name="sparkle" /> {generating === "summary" ? "Writing…" : "Write with AI"}</button></div>
            <label className="form-field">Professional summary<textarea maxLength={1200} onChange={(event) => setContent((current) => ({ ...current, summary: event.target.value }))} placeholder="What do you do well, and what kind of work do you love?" rows={5} value={content.summary} /></label>
            <div className="field-helper-row"><span>Keep it human, specific, and true to you.</span><span>{content.summary.length} / 1,200</span></div>
          </section>

          <section className="editor-section">
            <div className="form-section-heading"><span className="section-number">03</span><div><h2>Experience</h2><p>Start with your most recent role.</p></div><button className="add-entry-button" onClick={addExperience} type="button"><Icon name="plus" /> Add role</button></div>
            {!content.experience.length && <div className="section-empty"><p>Your work history will appear here.</p><button className="button-outline-app" onClick={addExperience} type="button"><Icon name="plus" /> Add your first role</button></div>}
            {content.experience.map((item, index) => (
              <div className="entry-card" key={item.id}>
                <div className="entry-card-title"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.jobTitle || "New role"}</strong><button aria-label="Remove role" className="icon-button subtle-icon" onClick={() => setContent((current) => ({ ...current, experience: current.experience.filter((entry) => entry.id !== item.id) }))} type="button"><Icon name="trash" /></button></div>
                <div className="form-grid">
                  <label className="form-field">Job title<input onChange={(event) => updateExperience(item.id, "jobTitle", event.target.value)} placeholder="Product designer" value={item.jobTitle} /></label>
                  <label className="form-field">Company<input onChange={(event) => updateExperience(item.id, "company", event.target.value)} placeholder="Company name" value={item.company} /></label>
                  <label className="form-field">Location<input onChange={(event) => updateExperience(item.id, "location", event.target.value)} placeholder="City, State" value={item.location} /></label>
                  <div className="date-fields"><label className="form-field">Start date<input onChange={(event) => updateExperience(item.id, "startDate", event.target.value)} type="month" value={item.startDate} /></label><label className="form-field">End date<input disabled={item.current} onChange={(event) => updateExperience(item.id, "endDate", event.target.value)} type="month" value={item.endDate} /></label></div>
                  <label className="current-role"><input checked={item.current} onChange={(event) => updateExperience(item.id, "current", event.target.checked)} type="checkbox" /> I currently work here</label>
                </div>
                <div className="bullet-editor-heading"><strong>What did you make happen?</strong><button className="ai-button" disabled={!!generating} onClick={() => gated(async () => setSuggestion({ kind: "bullets", targetId: item.id, result: await generateBullets({ jobTitle: item.jobTitle, company: item.company, notes: item.bullets.join(" ") }) }), `bullets-${item.id}`)} type="button"><Icon name="sparkle" /> {generating === `bullets-${item.id}` ? "Writing…" : "Suggest bullets"}</button></div>
                <div className="bullet-list-editor">
                  {item.bullets.map((bullet, bulletIndex) => <div className="bullet-input-row" key={`${item.id}-${bulletIndex}`}><span>•</span><textarea aria-label={`Experience bullet ${bulletIndex + 1}`} onChange={(event) => updateExperience(item.id, "bullets", item.bullets.map((value, index) => index === bulletIndex ? event.target.value : value))} rows={2} value={bullet} /><button aria-label="Improve this bullet with AI" className="icon-button ai-mini" disabled={!!generating} onClick={() => gated(async () => setSuggestion({ kind: "improve", targetId: item.id, bulletIndex, result: await improveBullet(bullet, item.jobTitle) }), `improve-${item.id}-${bulletIndex}`)} type="button"><Icon name="wand" /></button><button aria-label="Remove bullet" className="icon-button subtle-icon" onClick={() => updateExperience(item.id, "bullets", item.bullets.filter((_, index) => index !== bulletIndex))} type="button"><Icon name="close" /></button></div>)}
                  <button className="add-bullet" onClick={() => updateExperience(item.id, "bullets", [...item.bullets, ""])} type="button"><Icon name="plus" /> Add a bullet</button>
                </div>
              </div>
            ))}
          </section>

          <section className="editor-section">
            <div className="form-section-heading"><span className="section-number">04</span><div><h2>Education</h2><p>Degrees, programs, and other learning.</p></div><button className="add-entry-button" onClick={addEducation} type="button"><Icon name="plus" /> Add education</button></div>
            {!content.education.length && <div className="section-empty"><p>Share the learning that brought you here.</p><button className="button-outline-app" onClick={addEducation} type="button"><Icon name="plus" /> Add education</button></div>}
            {content.education.map((item) => <div className="entry-card" key={item.id}><div className="entry-card-title"><span>✦</span><strong>{item.school || "New education"}</strong><button aria-label="Remove education" className="icon-button subtle-icon" onClick={() => setContent((current) => ({ ...current, education: current.education.filter((entry) => entry.id !== item.id) }))} type="button"><Icon name="trash" /></button></div><div className="form-grid"><label className="form-field">School<input onChange={(event) => updateEducation(item.id, "school", event.target.value)} placeholder="School or program" value={item.school} /></label><label className="form-field">Degree<input onChange={(event) => updateEducation(item.id, "degree", event.target.value)} placeholder="BFA" value={item.degree} /></label><label className="form-field">Field of study<input onChange={(event) => updateEducation(item.id, "field", event.target.value)} placeholder="Interaction design" value={item.field} /></label><div className="date-fields"><label className="form-field">Start date<input onChange={(event) => updateEducation(item.id, "startDate", event.target.value)} type="month" value={item.startDate} /></label><label className="form-field">End date<input onChange={(event) => updateEducation(item.id, "endDate", event.target.value)} type="month" value={item.endDate} /></label></div></div></div>)}
          </section>

          <section className="editor-section">
            <div className="form-section-heading"><span className="section-number">05</span><div><h2>Skills</h2><p>Tools and strengths you bring to the work.</p></div></div>
            <label className="form-field">Your skills<input onChange={(event) => setContent((current) => ({ ...current, skills: event.target.value.split(",").map((skill) => skill.trim()).filter(Boolean) }))} placeholder="Figma, Research, Prototyping…" value={content.skills.join(", ")} /></label>
            {!!content.skills.length && <div className="skill-chips">{content.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>}
          </section>

          <JobMatchPanel content={content} match={resume.jobMatch} resumeId={resume.id} />
          <div className="editor-bottom-actions"><button className="button-secondary" disabled={!dirty} onClick={save} type="button">Save changes</button><button className="button-primary-app" onClick={downloadPdf} type="button"><Icon name="download" /> Download PDF</button></div>
        </div>
        <aside className="editor-preview-column"><div className="preview-sticky"><div className="preview-heading"><div><span className="preview-live-dot" /><strong>LIVE PREVIEW</strong></div><span>Classic</span></div><ResumePreview content={content} /><p className="preview-note"><Icon name="shield" /> Clean, readable, and ATS-friendly.</p></div></aside>
      </div>
      <AiSuggestionDialog onAccept={acceptSuggestion} onClose={() => setSuggestion(null)} result={suggestion?.result ?? null} />
    </div>
  );
}