// ============================================================
// ENGINE B — TF-IDF BASED KEYWORD EXTRACTION + SUMMARY
// ============================================================
// KEY NLP CONCEPTS:
// TF(t) = count(t) / total_terms
// IDF(t) = log(N / docs_containing_t) + 1  (smooth)
// TF-IDF = TF × IDF → Higher = more important keyword

import type { ResumeFormData, ResumeOutput } from '../types';
import { generateWithRuleBased } from './ruleBasedEngine';

// ---- STOP WORDS ----
const STOP_WORDS = new Set([
  'i','me','my','myself','we','our','ours','ourselves','you','your','yours',
  'yourself','yourselves','he','him','his','himself','she','her','hers',
  'herself','it','its','itself','they','them','their','theirs','themselves',
  'what','which','who','whom','this','that','these','those','am','is','are',
  'was','were','be','been','being','have','has','had','having','do','does',
  'did','doing','a','an','the','and','but','if','or','because','as','until',
  'while','of','at','by','for','with','about','against','between','through',
  'during','before','after','above','below','to','from','up','down','in',
  'out','on','off','over','under','again','further','then','once','here',
  'there','when','where','why','how','all','both','each','few','more','most',
  'other','some','such','no','nor','not','only','own','same','so','than',
  'too','very','s','t','can','will','just','don','should','now','also',
  'used','using','worked','work','working','experience','project','projects',
  'developed','built','created','etc','including','like','well','use','good',
]);

// ---- DOMAIN MAP ----
const DOMAIN_MAP: Record<string, string[]> = {
  'Machine Learning & AI': ['python','ml','machine','learning','tensorflow','pytorch','keras','deep','neural','network','ai','artificial','intelligence','nlp','natural','language','processing','sklearn','scikit','pandas','numpy','data','science','model','classification','regression','clustering'],
  'Web Development': ['react','angular','vue','javascript','typescript','html','css','node','express','django','flask','frontend','backend','fullstack','api','rest','graphql','tailwind','bootstrap','nextjs','next','webpack','vite'],
  'Mobile Development': ['android','ios','flutter','react-native','kotlin','swift','mobile','app'],
  'Cloud & DevOps': ['aws','azure','gcp','google','cloud','docker','kubernetes','ci','cd','jenkins','devops','terraform','ansible'],
  'Database & Backend': ['sql','mysql','postgresql','mongodb','redis','firebase','supabase','database','nosql','orm'],
  'Systems & Low-Level': ['c','c++','cpp','java','rust','go','golang','system','embedded','linux','os','operating'],
  'Cybersecurity': ['security','cyber','penetration','testing','ethical','hacking','firewall','encryption','vulnerability'],
};

const SUMMARY_TEMPLATES: Record<string, string[]> = {
  'Machine Learning & AI': ['Proficient in building and deploying machine learning models','Experienced in data analysis, model training, and evaluation'],
  'Web Development': ['Experienced in building responsive and scalable web applications','Proficient in modern frontend and backend technologies'],
  'Mobile Development': ['Experienced in developing cross-platform mobile applications'],
  'Cloud & DevOps': ['Experienced in cloud infrastructure and deployment automation'],
  'Database & Backend': ['Skilled in database design, optimization, and backend architecture'],
  'Systems & Low-Level': ['Proficient in systems programming and low-level optimization'],
  'Cybersecurity': ['Skilled in identifying and mitigating security vulnerabilities'],
};

// ---- TOKENIZATION ----
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s+#-]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1 && !STOP_WORDS.has(t));
}

// ---- TF: Term Frequency ----
function computeTF(tokens: string[]): Map<string, number> {
  const freq = new Map<string, number>();
  const total = tokens.length || 1;
  for (const t of tokens) freq.set(t, (freq.get(t) || 0) + 1);
  const tf = new Map<string, number>();
  for (const [term, count] of freq) tf.set(term, count / total);
  return tf;
}

// ---- IDF: Inverse Document Frequency ----
function computeIDF(documents: string[][]): Map<string, number> {
  const N = documents.length;
  const df = new Map<string, number>();
  for (const doc of documents) {
    const unique = new Set(doc);
    for (const t of unique) df.set(t, (df.get(t) || 0) + 1);
  }
  const idf = new Map<string, number>();
  for (const [term, count] of df) {
    idf.set(term, Math.log((N + 1) / (count + 1)) + 1);
  }
  return idf;
}

// ---- TF-IDF ----
function computeTFIDF(tf: Map<string, number>, idf: Map<string, number>): Map<string, number> {
  const tfidf = new Map<string, number>();
  for (const [term, tfScore] of tf) {
    tfidf.set(term, tfScore * (idf.get(term) || 1));
  }
  return tfidf;
}

// ---- Top Keywords ----
function extractTopKeywords(tfidf: Map<string, number>, n = 15): string[] {
  return Array.from(tfidf.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([term]) => term);
}

// ---- Domain Classification ----
function classifyDomains(keywords: string[]): string[] {
  const scores = new Map<string, number>();
  for (const kw of keywords) {
    for (const [domain, domainKws] of Object.entries(DOMAIN_MAP)) {
      if (domainKws.includes(kw)) scores.set(domain, (scores.get(domain) || 0) + 1);
    }
  }
  return Array.from(scores.entries()).sort((a, b) => b[1] - a[1]).map(([d]) => d);
}

// ---- Generate Domain-Aware Summary ----
function generateTFIDFSummary(data: ResumeFormData, keywords: string[], domains: string[]): string {
  if (data.careerObjective.trim()) {
    return `${data.careerObjective.trim()} Key competencies include ${keywords.slice(0, 5).join(', ')}.`;
  }
  const parts: string[] = [];
  if (domains.length > 0) {
    parts.push(`${data.fullName} is a results-driven professional specializing in ${domains.slice(0, 2).join(' and ')}.`);
    for (const domain of domains.slice(0, 2)) {
      const templates = SUMMARY_TEMPLATES[domain];
      if (templates?.length) {
        parts.push(templates[data.fullName.length % templates.length] + '.');
      }
    }
  } else {
    parts.push(`${data.fullName} is a results-driven professional.`);
  }
  if (keywords.slice(0, 6).join(', ')) {
    parts.push(`Core technical proficiencies include ${keywords.slice(0, 6).join(', ')}.`);
  }
  return parts.join(' ');
}

// ============================================================
// MAIN ENGINE FUNCTION
// ============================================================
export function generateWithTFIDF(data: ResumeFormData): ResumeOutput {
  const documents = [
    tokenize(data.skills),
    tokenize(data.experience),
    tokenize(data.projects),
    tokenize(data.education),
    tokenize(data.careerObjective),
    tokenize(data.certifications),
    tokenize(data.achievements),
  ].filter(doc => doc.length > 0);

  const allTokens = documents.flat();
  const tf = computeTF(allTokens);
  const idf = computeIDF(documents);
  const tfidf = computeTFIDF(tf, idf);
  const topKeywords = extractTopKeywords(tfidf, 15);
  const domains = classifyDomains(topKeywords);
  const summary = generateTFIDFSummary(data, topKeywords, domains);

  console.log('[TF-IDF Engine] All tokens:', allTokens.slice(0, 20), '...');
  console.log('[TF-IDF Engine] Top Keywords:', topKeywords);
  console.log('[TF-IDF Engine] Detected Domains:', domains);
  console.log('[TF-IDF Engine] Generated Summary:', summary);

  const baseOutput = generateWithRuleBased(data);
  return { ...baseOutput, summary };
}
