import type { ResumeContent } from "./types";

function resumeText(content: ResumeContent) {
  return [
    content.contact.fullName,
    content.summary,
    ...content.experience.flatMap((item) => [item.jobTitle, item.company, ...item.bullets]),
    ...content.education.flatMap((item) => [item.school, item.degree, item.field]),
    ...content.skills,
  ].join(" ").toLowerCase();
}

export function matchKeywords(content: ResumeContent, keywords: string[]) {
  const text = resumeText(content);
  const found = keywords.filter((keyword) => text.includes(keyword.toLowerCase()));
  const missing = keywords.filter((keyword) => !found.includes(keyword));
  return { found, missing, score: keywords.length ? Math.round((found.length / keywords.length) * 100) : 0 };
}