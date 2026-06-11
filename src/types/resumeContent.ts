export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  status: string;
}

export interface ExperienceItem {
  position: string;
  company: string;
  period: string;
  description: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  url?: string;
}

export interface ResumeContent {
  resumeUrl?: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  keySkills: string[];
  certifications: CertificationItem[];
}
