"use client";

import { useSyncExternalStore } from "react";
import { PLAN_LIMITS } from "../plans";
import { seedDemo } from "./seed";
import type { DemoSnapshot, LimitFeature, Resume, ResumeContent } from "../resume/types";

const STORAGE_KEY = "orbit.demo.v1";
const CLEARED_KEY = "orbit.demo.cleared.v1";
const listeners = new Set<() => void>();

function currentMonth() {
  return new Date().toISOString().slice(0, 7);
}

function readStoredSnapshot(): DemoSnapshot | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (isDemoSnapshot(parsed)) return parsed;
  } catch {
    // A broken or unavailable localStorage value should never prevent the demo from opening.
  }
  return null;
}

function isDemoSnapshot(value: unknown): value is DemoSnapshot {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<DemoSnapshot>;
  return (
    (candidate.plan === "free" || candidate.plan === "pro") &&
    typeof candidate.cancelAtPeriodEnd === "boolean" &&
    typeof candidate.user === "object" && candidate.user !== null &&
    typeof candidate.user.name === "string" && typeof candidate.user.email === "string" &&
    Array.isArray(candidate.resumes) &&
    typeof candidate.usage === "object" && candidate.usage !== null &&
    typeof candidate.usage.pdfDownloads === "number" && typeof candidate.usage.aiActions === "number" &&
    typeof candidate.usage.jobMatches === "number" && typeof candidate.usage.aiActionsThisMonth === "number" &&
    typeof candidate.usage.month === "string"
  );
}

function initialSnapshot(): DemoSnapshot | null {
  if (typeof window === "undefined") return null;
  const saved = readStoredSnapshot();
  if (saved) return saved;
  try {
    if (window.localStorage.getItem(CLEARED_KEY)) return null;
  } catch {
    // Continue with the in-memory sample when storage is disabled.
  }
  return structuredClone(seedDemo);
}

let snapshot: DemoSnapshot | null = initialSnapshot();

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return null;
}

function persist(next: DemoSnapshot | null) {
  snapshot = next;
  try {
    if (next) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // In-memory use remains available if browser storage is disabled.
  }
  listeners.forEach((listener) => listener());
}

function ensureSnapshot() {
  if (!snapshot) persist(structuredClone(seedDemo));
  return snapshot!;
}

function update(mutator: (state: DemoSnapshot) => DemoSnapshot) {
  persist(mutator(ensureSnapshot()));
}

export class LimitReachedError extends Error {
  constructor(readonly feature: LimitFeature) {
    super(`The free plan limit for ${feature} has been reached.`);
    this.name = "LimitReachedError";
  }
}

export function useDemo() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function createResume() {
  assertLimit("resume");
  const now = new Date().toISOString();
  const resume: Resume = {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `resume-${Date.now()}`,
    title: "Untitled resume",
    createdAt: now,
    updatedAt: now,
    content: {
      contact: { fullName: "", email: "", phone: "", location: "", linkedin: "", website: "" },
      summary: "",
      experience: [],
      education: [],
      skills: [],
    },
  };
  update((state) => ({ ...state, resumes: [resume, ...state.resumes] }));
  return resume.id;
}

export function duplicateResume(id: string) {
  assertLimit("resume");
  const original = getSnapshot()?.resumes.find((resume) => resume.id === id);
  if (!original) return null;
  const now = new Date().toISOString();
  const copy = { ...structuredClone(original), id: `resume-${Date.now()}`, title: `${original.title} copy`, createdAt: now, updatedAt: now };
  update((state) => ({ ...state, resumes: [copy, ...state.resumes] }));
  return copy.id;
}

export function deleteResume(id: string) {
  update((state) => ({ ...state, resumes: state.resumes.filter((resume) => resume.id !== id) }));
}

export function saveResume(id: string, title: string, content: ResumeContent) {
  update((state) => ({
    ...state,
    resumes: state.resumes.map((resume) => resume.id === id ? { ...resume, title: title.trim() || "Untitled resume", content: structuredClone(content), updatedAt: new Date().toISOString() } : resume),
  }));
}

export function assertLimit(feature: LimitFeature) {
  const state = getSnapshot() ?? seedDemo;
  if (state.plan === "pro") {
    if ((feature === "ai" || feature === "jobMatch") && state.usage.month === currentMonth() && state.usage.aiActionsThisMonth >= PLAN_LIMITS.pro.aiPerMonth) throw new LimitReachedError("ai");
    return;
  }
  const count = feature === "resume" ? state.resumes.length :
    feature === "pdf" ? state.usage.pdfDownloads :
      feature === "ai" ? state.usage.aiActions : state.usage.jobMatches;
  if (count >= PLAN_LIMITS.free[feature === "resume" ? "resumes" : feature === "pdf" ? "pdf" : feature === "ai" ? "ai" : "jobMatch"]) {
    throw new LimitReachedError(feature);
  }
}

export function recordUsage(feature: Exclude<LimitFeature, "resume">) {
  update((state) => {
    const month = currentMonth();
    const usage = state.usage.month === month ? { ...state.usage } : { ...state.usage, month, aiActionsThisMonth: 0 };
    if (feature === "pdf") usage.pdfDownloads += 1;
    if (feature === "ai") {
      usage.aiActions += 1;
      usage.aiActionsThisMonth += 1;
    }
    if (feature === "jobMatch") {
      usage.jobMatches += 1;
      if (state.plan === "pro") usage.aiActionsThisMonth += 1;
    }
    return { ...state, usage: { ...usage } };
  });
}

export function saveJobMatch(id: string, match: NonNullable<Resume["jobMatch"]>) {
  update((state) => ({ ...state, resumes: state.resumes.map((resume) => resume.id === id ? { ...resume, jobMatch: match, updatedAt: new Date().toISOString() } : resume) }));
}

export function upgradePlan() {
  update((state) => ({ ...state, plan: "pro", cancelAtPeriodEnd: false, usage: { ...state.usage, month: currentMonth(), aiActionsThisMonth: 0 } }));
}

export function cancelPlan() {
  update((state) => ({ ...state, cancelAtPeriodEnd: true }));
}

export function resumePlan() {
  update((state) => ({ ...state, cancelAtPeriodEnd: false }));
}

export function updateProfile(name: string, role: string) {
  update((state) => ({ ...state, user: { ...state.user, name: name.trim() || state.user.name, role: role.trim() } }));
}

export function resetDemo() {
  try {
    window.localStorage.removeItem(CLEARED_KEY);
  } catch {
    // The sample remains usable in memory if storage is disabled.
  }
  persist(structuredClone(seedDemo));
}

export function initializeDemo() {
  return ensureSnapshot();
}

export function authenticateDemo(email: string, name?: string) {
  initializeDemo();
  update((state) => ({ ...state, user: { ...state.user, email: email.trim() || state.user.email, name: name?.trim() || state.user.name } }));
}

export function clearDemo() {
  try {
    window.localStorage.setItem(CLEARED_KEY, "true");
  } catch {
    // The cleared state remains effective until the current page is closed.
  }
  persist(null);
}

export function deleteAccount() {
  clearDemo();
}