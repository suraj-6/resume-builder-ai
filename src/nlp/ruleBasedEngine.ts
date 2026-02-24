// ============================================================
// ENGINE A — RULE-BASED TEMPLATE GENERATOR
// ============================================================
// KEY NLP CONCEPTS:
// - Template-based Natural Language Generation (NLG)
// - String tokenization (splitting text into meaningful parts)
// - Rule-based text transformation
// This is called "Template-based NLG" in NLP literature.

import type {
  ResumeFormData, ResumeOutput, SkillCategory,
  EducationEntry, ExperienceEntry, ProjectEntry,
  CertificationEntry, RoleEntry, ReferenceEntry,
} from '../types';

// ---- HELPER: Parse skills into categories ----
// "Languages: Python, Java | Frameworks: React" → [{ category, items }]
export function parseSkills(raw: string): SkillCategory[] {
  if (!raw.trim()) return [];
  const lines = raw.split(/[\n|]/).map(l => l.trim()).filter(Boolean);
  const categories: SkillCategory[] = [];
  for (const line of lines) {
    if (line.includes(':')) {
      const colonIdx = line.indexOf(':');
      const cat = line.slice(0, colonIdx).trim();
      const items = line.slice(colonIdx + 1).split(',').map(s => s.trim()).filter(Boolean);
      categories.push({ category: cat, items });
    } else {
      const items = line.split(',').map(s => s.trim()).filter(Boolean);
      if (items.length > 0) {
        const existing = categories.find(c => c.category === 'Technical Skills');
        if (existing) existing.items.push(...items);
        else categories.push({ category: 'Technical Skills', items });
      }
    }
  }
  return categories;
}

// ---- HELPER: Parse education entries ----
// "B.Tech in CSE, XYZ University, 2020-2024, 8.5 CGPA, OS; DSA; ML"
export function parseEducation(raw: string): EducationEntry[] {
  if (!raw.trim()) return [];
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
  return lines.map(line => {
    const parts = line.split(',').map(p => p.trim());
    return {
      degree: parts[0] || '',
      institution: parts[1] || '',
      year: parts[2] || '',
      marks: parts[3] || '',
      coursework: parts[4] || '',
    };
  });
}

// ---- HELPER: Parse experience entries ----
// "Company, Designation, Duration, Location, Bullet1; Bullet2; Bullet3"
export function parseExperience(raw: string): ExperienceEntry[] {
  if (!raw.trim()) return [];
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
  return lines.map(line => {
    const parts = line.split(',').map(p => p.trim());
    const bulletsRaw = parts.slice(3).join(', ');
    const bullets = bulletsRaw
      ? bulletsRaw.split(/[;|]/).map(b => b.trim()).filter(Boolean)
      : [];
    return {
      company: parts[0] || '',
      designation: parts[1] || '',
      duration: parts[2] || '',
      location: '',
      bullets,
    };
  });
}

// ---- HELPER: Parse project entries ----
// "Title, Description, Link, GitHub, TechStack"
export function parseProjects(raw: string): ProjectEntry[] {
  if (!raw.trim()) return [];
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
  return lines.map(line => {
    const parts = line.split(',').map(p => p.trim());
    return {
      title: parts[0] || '',
      description: parts[1] || '',
      link: parts[2] || '',
      github: parts[3] || '',
      techStack: parts[4] || '',
    };
  });
}

// ---- HELPER: Parse certifications ----
export function parseCertifications(raw: string): CertificationEntry[] {
  if (!raw.trim()) return [];
  return raw.split('\n').map(l => l.trim()).filter(Boolean).map(line => {
    const parts = line.split(',').map(p => p.trim());
    return { name: parts[0] || '', score: parts[1] || '' };
  });
}

// ---- HELPER: Parse roles ----
// "Title, Organization, Location, Duration, Description"
export function parseRoles(raw: string): RoleEntry[] {
  if (!raw.trim()) return [];
  return raw.split('\n').map(l => l.trim()).filter(Boolean).map(line => {
    const parts = line.split(',').map(p => p.trim());
    return {
      title: parts[0] || '',
      organization: parts[1] || '',
      location: parts[2] || '',
      duration: parts[3] || '',
      description: parts[4] || '',
    };
  });
}

// ---- HELPER: Parse activities (one per line) ----
export function parseActivities(raw: string): string[] {
  if (!raw.trim()) return [];
  return raw.split('\n').map(l => l.trim()).filter(Boolean);
}

// ---- HELPER: Parse achievements (one per line) ----
export function parseAchievements(raw: string): string[] {
  if (!raw.trim()) return [];
  return raw.split('\n').map(l => l.trim()).filter(Boolean);
}

// ---- HELPER: Parse references ----
export function parseReferences(raw: string): ReferenceEntry[] {
  if (!raw.trim()) return [];
  return raw.split('\n').map(l => l.trim()).filter(Boolean).map(line => {
    const parts = line.split(',').map(p => p.trim());
    return { name: parts[0] || '', designation: parts[1] || '', contact: parts[2] || '' };
  });
}

// ============================================================
// TEMPLATE-BASED SUMMARY GENERATION (Core NLG)
// ============================================================
function generateSummary(
  data: ResumeFormData,
  skills: SkillCategory[],
  education: EducationEntry[],
  experience: ExperienceEntry[],
): string {
  if (data.careerObjective.trim()) return data.careerObjective.trim();

  const allSkills = skills.flatMap(s => s.items);
  const skillStr = allSkills.slice(0, 5).join(', ');
  const hasExp = experience.length > 0;
  const hasEdu = education.length > 0;

  if (hasExp && hasEdu && allSkills.length > 0) {
    return `${data.fullName} is a motivated professional with expertise in ${skillStr}. With experience at ${experience[0].company} as ${experience[0].designation}, and academic background from ${education[0].institution}, ${data.fullName.split(' ')[0]} brings a strong combination of theoretical knowledge and practical skills to any team.`;
  }
  if (!hasExp && hasEdu && allSkills.length > 0) {
    return `${data.fullName} is an aspiring professional currently pursuing ${education[0].degree} at ${education[0].institution}. Skilled in ${skillStr}, ${data.fullName.split(' ')[0]} is eager to apply academic knowledge to real-world challenges and contribute meaningfully to innovative projects.`;
  }
  if (allSkills.length > 0) {
    return `A dedicated and detail-oriented individual with strong proficiency in ${skillStr}. ${data.fullName} is passionate about continuous learning and applying technical skills to solve complex problems efficiently.`;
  }
  return `${data.fullName} is a motivated individual seeking opportunities to grow and contribute in a professional environment.`;
}

// ============================================================
// MAIN ENGINE FUNCTION
// ============================================================
export function generateWithRuleBased(data: ResumeFormData): ResumeOutput {
  const skills = parseSkills(data.skills);
  const education = parseEducation(data.education);
  const experience = parseExperience(data.experience);
  const projects = parseProjects(data.projects);
  const certifications = parseCertifications(data.certifications);
  const roles = parseRoles(data.roles);
  const activities = parseActivities(data.activities);
  const achievements = parseAchievements(data.achievements);
  const references = parseReferences(data.references);
  const summary = generateSummary(data, skills, education, experience);

  console.log('[Rule-Based Engine] Input:', data);
  console.log('[Rule-Based Engine] Parsed Skills:', skills);
  console.log('[Rule-Based Engine] Parsed Experience:', experience);
  console.log('[Rule-Based Engine] Generated Summary:', summary);

  return {
    name: data.fullName,
    email: data.email,
    phone: data.phone,
    address: data.address,
    linkedIn: data.linkedIn,
    github: data.github,
    portfolio: data.portfolio,
    codingProfiles: data.codingProfiles,
    tagline: data.tagline,
    summary,
    skills,
    education,
    experience,
    projects,
    certifications,
    roles,
    activities,
    achievements,
    references,
  };
}
