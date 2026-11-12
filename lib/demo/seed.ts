import type { DemoSnapshot } from "../resume/types";

export const seedDemo: DemoSnapshot = {
  user: {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    role: "Product designer",
    joinedAt: "2025-01-14T12:00:00.000Z",
  },
  plan: "free",
  cancelAtPeriodEnd: false,
  usage: {
    pdfDownloads: 0,
    aiActions: 3,
    jobMatches: 0,
    aiActionsThisMonth: 3,
    month: "2025-02",
  },
  resumes: [
    {
      id: "resume-alex-morgan",
      title: "Product Designer Resume",
      createdAt: "2025-01-14T12:00:00.000Z",
      updatedAt: "2025-02-20T12:00:00.000Z",
      content: {
        contact: {
          fullName: "Alex Morgan",
          email: "alex.morgan@example.com",
          phone: "+1 (415) 555-0138",
          location: "San Francisco, CA",
          linkedin: "linkedin.com/in/alexmorgan",
          website: "alexmorgan.design",
        },
        summary:
          "Product designer with 6+ years of experience creating thoughtful, accessible digital experiences. I connect customer insight with clear product strategy to help teams turn complex problems into simple, useful products.",
        experience: [
          {
            id: "exp-lumen",
            jobTitle: "Senior Product Designer",
            company: "Lumen Studio",
            location: "San Francisco, CA",
            startDate: "2022-03",
            endDate: "",
            current: true,
            bullets: [
              "Led end-to-end design for a new onboarding experience, increasing activation by 24% across 80,000 monthly users.",
              "Partnered with product and engineering to simplify a complex analytics dashboard into a flexible, accessible design system.",
              "Introduced a lightweight research program that brought customer feedback into weekly product decisions.",
            ],
          },
          {
            id: "exp-northstar",
            jobTitle: "Product Designer",
            company: "Northstar Health",
            location: "Oakland, CA",
            startDate: "2019-06",
            endDate: "2022-02",
            current: false,
            bullets: [
              "Designed a patient scheduling flow that reduced support requests by 31% and improved appointment completion.",
              "Worked with a cross-functional team of 12 to ship research-backed features on a two-week release cycle.",
            ],
          },
        ],
        education: [
          {
            id: "edu-cal",
            school: "California College of the Arts",
            degree: "BFA",
            field: "Interaction Design",
            startDate: "2015-08",
            endDate: "2019-05",
          },
        ],
        skills: ["Product strategy", "UX research", "Prototyping", "Figma", "Design systems", "Accessibility", "Interaction design"],
      },
    },
  ],
};