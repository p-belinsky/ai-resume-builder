export const PLANS = {
  free: {
    name: "Free",
    priceMonthly: 0,
    resumes: "1 resume at a time",
    pdfDownloads: "1 PDF download",
    aiActions: "5 AI actions",
    jobMatches: "1 job match",
  },
  pro: {
    name: "Pro",
    priceMonthly: 15,
    priceAnnual: 120,
    resumes: "Unlimited resumes",
    pdfDownloads: "Unlimited PDF downloads",
    aiActions: "300 AI actions / month",
    jobMatches: "Unlimited job matches",
  },
} as const;

export const PLAN_LIMITS = {
  free: { resumes: 1, pdf: 1, ai: 5, jobMatch: 1 },
  pro: { aiPerMonth: 300 },
} as const;