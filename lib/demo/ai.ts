import type { ResumeContent } from "../resume/types";

const wait = (milliseconds = 950) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function generateBullets({ jobTitle, company, notes }: { jobTitle: string; company: string; notes: string }) {
  await wait();
  const role = jobTitle.trim() || "your role";
  const workplace = company.trim() || "your team";
  const detail = notes.trim() || "high-impact projects";
  return [
    `Led ${detail} at ${workplace}, turning customer needs into clear, measurable outcomes.`,
    `Partnered with a cross-functional team to improve ${role.toLowerCase()} workflows and deliver work on schedule.`,
    `Used research and performance insights to prioritize opportunities and strengthen the customer experience.`,
  ];
}

export async function improveBullet(bullet: string, jobTitle: string) {
  await wait(750);
  const clean = bullet.trim().replace(/[.!?]+$/, "");
  return `${clean} — creating measurable impact as a ${jobTitle.trim() || "team contributor"}.`;
}

export async function generateSummary(content: ResumeContent) {
  await wait(900);
  const role = content.experience[0]?.jobTitle || "thoughtful professional";
  const skills = content.skills.slice(0, 3).join(", ");
  return `${role} with a track record of turning complex challenges into meaningful results. ${skills ? `Brings strengths in ${skills} and` : "Brings"} a collaborative, customer-centered approach to every project.`;
}

export async function extractKeywords(jobDescription: string) {
  await wait(850);
  const common = ["product strategy", "user research", "design systems", "prototyping", "accessibility", "stakeholder collaboration", "Figma", "data-informed design", "communication", "leadership", "roadmapping", "interaction design"];
  const words = new Set(jobDescription.toLowerCase().split(/[^a-z0-9+#]+/).filter((word) => word.length > 4));
  const relevant = common.filter((term) => term.split(" ").some((word) => words.has(word.toLowerCase())));
  return [...new Set([...relevant, ...common])].slice(0, 10);
}