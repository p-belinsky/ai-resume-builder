"use client";

import { useState } from "react";
import { extractKeywords } from "../../lib/demo/ai";
import { recordUsage, assertLimit, LimitReachedError, saveJobMatch } from "../../lib/demo/store";
import { matchKeywords } from "../../lib/resume/match";
import type { JobMatch, ResumeContent } from "../../lib/resume/types";
import { Icon } from "../landing/Icon";
import { requestUpgrade } from "./AppShell";
import { useToast } from "./Toast";

export function JobMatchPanel({ resumeId, content, match }: { resumeId: string; content: ResumeContent; match?: JobMatch }) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const runMatch = async () => {
    if (!description.trim()) return;
    try {
      assertLimit("jobMatch");
      setLoading(true);
      const keywords = await extractKeywords(description.trim());
      const result = matchKeywords(content, keywords);
      const saved: JobMatch = { jobDescription: description.trim(), keywords, ...result, createdAt: new Date().toISOString() };
      saveJobMatch(resumeId, saved);
      recordUsage("jobMatch");
      showToast("Your job match is ready.");
    } catch (error) {
      if (error instanceof LimitReachedError) requestUpgrade();
      else showToast("Couldn’t check that job description. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="job-match-panel">
      <div className="tool-panel-heading"><span className="tool-icon tool-icon-lilac"><Icon name="target" /></span><div><h2>Match a job</h2><p>See how your resume lines up with a role.</p></div></div>
      <label className="field-label" htmlFor="job-description">Job description</label>
      <textarea id="job-description" maxLength={10000} onChange={(event) => setDescription(event.target.value)} placeholder="Paste a job description here…" rows={5} value={description} />
      <div className="textarea-foot"><span>We’ll look for role-relevant keywords.</span><span>{description.length.toLocaleString()} / 10,000</span></div>
      <button className="button-outline-app match-button" disabled={loading || !description.trim()} onClick={runMatch} type="button">{loading ? <><span className="button-spinner" /> Finding the overlap…</> : <><Icon name="target" /> Check my match</>}</button>
      {match && <div className="match-results">
        <div className="match-score"><span className="match-score-number">{match.score}<small>%</small></span><div><strong>Your match snapshot</strong><span>{match.found.length} of {match.keywords.length} keywords found</span></div></div>
        <div className="match-keyword-groups">
          <div><h3><Icon name="check-circle" /> Found <span>{match.found.length}</span></h3><div className="keyword-list">{match.found.map((keyword) => <span className="keyword keyword-found" key={keyword}>{keyword}</span>)}</div></div>
          <div><h3><Icon name="sparkle" /> Could add <span>{match.missing.length}</span></h3><div className="keyword-list">{match.missing.map((keyword) => <span className="keyword keyword-missing" key={keyword}>{keyword}</span>)}</div></div>
        </div>
        <p className="match-disclaimer">A helpful guide, not a hiring prediction. Add only the skills and experience that are true for you.</p>
      </div>}
    </section>
  );
}