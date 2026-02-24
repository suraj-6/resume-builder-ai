// ============================================================
// ENGINE C — PATTERN-BASED NLP GENERATOR
// ============================================================
// KEY NLP CONCEPTS:
// - Action verb extraction (lexicon-based POS tagging)
// - Tech term detection via regex
// - Quantifier detection
// - Bigram extraction (N-gram analysis)
// - Role & experience level classification

import type { ResumeFormData, ResumeOutput } from '../types';
import { generateWithRuleBased } from './ruleBasedEngine';

const ACTION_VERBS = new Set([
  'developed','built','created','designed','implemented','managed',
  'led','organized','analyzed','improved','optimized','deployed',
  'maintained','architected','integrated','automated','tested',
  'debugged','collaborated','contributed','launched','published',
  'trained','mentored','coordinated','engineered','researched',
  'streamlined','configured','monitored','resolved','delivered',
  'established','spearheaded','initiated','executed','facilitated',
]);

const SOFT_SKILL_INDICATORS = new Set([
  'team','teamwork','leadership','communication','collaborative',
  'problem-solving','critical','thinking','adaptable','creative',
  'innovative','motivated','self-motivated','detail-oriented',
  'organized','management','interpersonal','analytical',
]);

const TECH_TERM_PATTERN = /\b(API|REST|GraphQL|SQL|NoSQL|CI\/CD|AWS|GCP|Azure|Docker|Kubernetes|Git|GitHub|Linux|Agile|Scrum|MVP|SaaS|SDK|IDE|OOP|MVC|MERN|MEAN|LAMP)\b/gi;
const QUANTIFIER_PATTERN = /(\d+[+%]?)\s*(years?|months?|projects?|users?|clients?|team|members?|apps?|applications?|websites?|systems?)/gi;

function extractActionVerbs(text: string): string[] {
  const words = text.toLowerCase().split(/\s+/);
  return [...new Set(words.filter(w => ACTION_VERBS.has(w)))];
}

function extractSoftSkills(text: string): string[] {
  const words = text.toLowerCase().split(/\s+/);
  return [...new Set(words.filter(w => SOFT_SKILL_INDICATORS.has(w)))];
}

function extractQuantifiers(text: string): string[] {
  const matches: string[] = [];
  const regex = new RegExp(QUANTIFIER_PATTERN.source, 'gi');
  let match;
  while ((match = regex.exec(text)) !== null) matches.push(match[0]);
  return matches;
}

function extractTechTerms(text: string): string[] {
  const matches: string[] = [];
  const regex = new RegExp(TECH_TERM_PATTERN.source, 'gi');
  let match;
  while ((match = regex.exec(text)) !== null) matches.push(match[0].toUpperCase());
  return [...new Set(matches)];
}

function extractBigrams(text: string): string[] {
  const stopWords = new Set(['the','and','for','with','has','was','are','this','that','from','but','not','its']);
  const words = text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);
  const bigrams: string[] = [];
  for (let i = 0; i < words.length - 1; i++) {
    if (!stopWords.has(words[i]) && !stopWords.has(words[i + 1])) {
      bigrams.push(`${words[i]} ${words[i + 1]}`);
    }
  }
  return bigrams;
}

function detectRole(allText: string): string {
  const text = allText.toLowerCase();
  const rolePatterns: [string, string[]][] = [
    ['Full-Stack Developer', ['fullstack','full-stack','full stack','frontend','backend','react','node','mern','mean']],
    ['Frontend Developer', ['frontend','front-end','react','angular','vue','css','html','ui','ux']],
    ['Backend Developer', ['backend','back-end','node','express','django','flask','api','server']],
    ['Data Scientist', ['data science','machine learning','ml','pandas','numpy','sklearn','statistics','analysis']],
    ['ML Engineer', ['tensorflow','pytorch','deep learning','neural network','model training','ai']],
    ['Mobile Developer', ['android','ios','flutter','react native','mobile','kotlin','swift']],
    ['DevOps Engineer', ['devops','docker','kubernetes','ci/cd','jenkins','terraform','ansible']],
    ['Cloud Engineer', ['aws','azure','gcp','cloud','lambda','ec2','s3']],
    ['Software Engineer', ['software','engineer','developer','programming','coding','java','python','c++']],
    ['Cybersecurity Analyst', ['security','cyber','penetration','vulnerability','firewall','encryption']],
  ];
  let bestRole = 'Software Professional';
  let bestScore = 0;
  for (const [role, kws] of rolePatterns) {
    const score = kws.filter(k => text.includes(k)).length;
    if (score > bestScore) { bestScore = score; bestRole = role; }
  }
  return bestRole;
}

function detectExperienceLevel(text: string): string {
  const yearMatch = text.match(/(\d+)\+?\s*years?/i);
  if (yearMatch) {
    const years = parseInt(yearMatch[1]);
    if (years >= 5) return 'senior';
    if (years >= 2) return 'mid-level';
    return 'junior';
  }
  const studentWords = ['student','pursuing','currently studying','fresher','graduate','undergraduate','intern'];
  if (studentWords.some(w => text.toLowerCase().includes(w))) return 'entry-level';
  return 'aspiring';
}

function generatePatternSummary(data: ResumeFormData): string {
  if (data.careerObjective.trim()) return data.careerObjective.trim();

  const allText = [data.skills, data.experience, data.projects, data.education, data.certifications, data.roles].join(' ');
  const actionVerbs = extractActionVerbs(allText);
  const softSkills = extractSoftSkills(allText);
  const quantifiers = extractQuantifiers(allText);
  const techTerms = extractTechTerms(allText);
  const bigrams = extractBigrams(data.skills + ' ' + data.projects);
  const role = detectRole(allText);
  const level = detectExperienceLevel(allText);

  console.log('[Pattern Engine] Action Verbs:', actionVerbs);
  console.log('[Pattern Engine] Soft Skills:', softSkills);
  console.log('[Pattern Engine] Quantifiers:', quantifiers);
  console.log('[Pattern Engine] Tech Terms:', techTerms);
  console.log('[Pattern Engine] Bigrams:', bigrams.slice(0, 5));
  console.log('[Pattern Engine] Role:', role, '| Level:', level);

  const levelMap: Record<string, string> = {
    senior: 'Seasoned and accomplished',
    'mid-level': 'Experienced and skilled',
    junior: 'Enthusiastic and growing',
    'entry-level': 'Motivated and eager',
    aspiring: 'Passionate and dedicated',
  };

  const parts: string[] = [];
  parts.push(`${levelMap[level] || 'Dedicated'} ${role} with`);
  if (quantifiers.length > 0) parts.push(`${quantifiers[0]} of hands-on experience.`);
  else parts.push('a strong foundation in software development.');
  if (actionVerbs.length >= 2) parts.push(`Has successfully ${actionVerbs.slice(0, 3).join(', ')} various technical solutions.`);
  if (techTerms.length > 0) parts.push(`Proficient in industry-standard technologies including ${techTerms.slice(0, 4).join(', ')}.`);
  if (bigrams.length > 0) parts.push(`Key areas of expertise include ${bigrams.slice(0, 3).join(', ')}.`);
  if (softSkills.length > 0) parts.push(`Demonstrates strong ${softSkills.slice(0, 3).join(', ')} abilities.`);

  return `${data.fullName} — ${parts.join(' ')}`;
}

export function generateWithPatterns(data: ResumeFormData): ResumeOutput {
  const summary = generatePatternSummary(data);
  console.log('[Pattern Engine] Final Summary:', summary);
  const baseOutput = generateWithRuleBased(data);
  return { ...baseOutput, summary };
}
