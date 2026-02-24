// ============================================================
// TYPES.TS — All TypeScript interfaces for the Resume Builder
// ============================================================

export interface ResumeFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedIn: string;
  github: string;
  portfolio: string;
  codingProfiles: string;
  tagline: string;
  careerObjective: string;
  skills: string;
  education: string;
  experience: string;
  projects: string;
  certifications: string;
  roles: string;
  activities: string;
  achievements: string;
  references: string;
}

export interface ResumeOutput {
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedIn: string;
  github: string;
  portfolio: string;
  codingProfiles: string;
  tagline: string;
  summary: string;
  skills: SkillCategory[];
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  roles: RoleEntry[];
  activities: string[];
  achievements: string[];
  references: ReferenceEntry[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
  marks: string;
  coursework: string;
}

export interface ExperienceEntry {
  company: string;
  designation: string;
  duration: string;
  location: string;
  bullets: string[];
}

export interface ProjectEntry {
  title: string;
  description: string;
  link: string;
  github: string;
  techStack: string;
}

export interface CertificationEntry {
  name: string;
  score: string;
}

export interface RoleEntry {
  title: string;
  organization: string;
  location: string;
  duration: string;
  description: string;
}

export interface ReferenceEntry {
  name: string;
  designation: string;
  contact: string;
}

/** Which resume template style to use */
export type TemplateType = 'classic' | 'professional' | 'modern' | 'minimal';
