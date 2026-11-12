export type ResumeContent = {
  contact: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  experience: {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    bullets: string[];
  }[];
  education: {
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }[];
  skills: string[];
};

export type JobMatch = {
  jobDescription: string;
  keywords: string[];
  found: string[];
  missing: string[];
  score: number;
  createdAt: string;
};

export type Resume = {
  id: string;
  title: string;
  content: ResumeContent;
  createdAt: string;
  updatedAt: string;
  jobMatch?: JobMatch;
};

export type DemoUser = {
  name: string;
  email: string;
  role: string;
  joinedAt: string;
};

export type DemoSnapshot = {
  user: DemoUser;
  plan: "free" | "pro";
  cancelAtPeriodEnd: boolean;
  resumes: Resume[];
  usage: {
    pdfDownloads: number;
    aiActions: number;
    jobMatches: number;
    aiActionsThisMonth: number;
    month: string;
  };
};

export type LimitFeature = "resume" | "pdf" | "ai" | "jobMatch";