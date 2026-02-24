import { useState } from 'react';
import type { ResumeFormData, TemplateType } from '../types';

interface ResumeFormProps {
  onGenerate: (data: ResumeFormData) => void;
  isGenerating: boolean;
  selectedTemplate: TemplateType;
  onTemplateChange: (t: TemplateType) => void;
}

const INITIAL_FORM: ResumeFormData = {
  fullName: '', email: '', phone: '', address: '',
  linkedIn: '', github: '', portfolio: '', codingProfiles: '',
  tagline: '', careerObjective: '', skills: '', education: '',
  experience: '', projects: '', certifications: '', roles: '',
  activities: '', achievements: '', references: '',
};

const SAMPLE_DATA: ResumeFormData = {
  fullName: 'Anubhav Singh',
  email: 'xprilion@gmail.com',
  phone: '+91-9876543210',
  address: 'Kolkata, India',
  linkedIn: 'https://linkedin.com/in/anubhavsingh',
  github: 'https://github.com/xprilion',
  portfolio: 'https://xprilion.com',
  codingProfiles: 'https://leetcode.com/xprilion',
  tagline: 'Software Engineer | ML Enthusiast | Open Source Contributor',
  careerObjective: '',
  skills: 'Languages: Python, PHP, C++, JavaScript, SQL, Bash, Java\nFrameworks: Scikit, NLTK, SpaCy, TensorFlow, Keras, Django, Flask, NodeJS\nTools: Kubernetes, Docker, GIT, PostgreSQL, MySQL, SQLite\nPlatforms: Linux, Web, Windows, AWS, GCP, Alibaba Cloud\nSoft Skills: Leadership, Event Management, Writing, Public Speaking, Time Management',
  education: 'B.Tech in Information Technology, Netaji Subhash Engineering College, July 2016 - June 2020, 7.27 GPA, Operating Systems; Data Structures; Algorithms; AI; Machine Learning; Databases',
  experience: 'Google Summer of Code - Submitty, Student Developer (Full-time), May 2019 - Sep 2019, Remote, Refactored forum for performance to handle large databases; Built REST API for Discussion Forum; Implemented Ratchet PHP WebSocket for real-time updates\nDataCamp Inc., Instructor (Part-time), Dec 2018 - Present, Remote, Created project course on Movie Similarity using NLP; Built RL tutorial for Q-learning; Course taken by 250+ students with 4.65 avg rating',
  projects: 'Hiring Search Tool, Built a tool to search for Hiring Managers and Recruiters using ReactJS NodeJS Firebase. 25000+ users with 5000+ queries saved, https://hiring-search.careerflow.ai, https://github.com/xprilion/hiring-search, ReactJS; NodeJS; Firebase\nReinforcement Learning Traffic Control, AI model to resolve city traffic 50% faster, https://traffic.demo.com, https://github.com/xprilion/traffic-rl, Python; Raspberry Pi; OpenCV; SUMO\nPanorama from Satellite Imagery, Distributed computing to stitch ISRO drone images reducing processing time exponentially, https://panorama.demo.com, https://github.com/xprilion/panorama, PHP; C++; Java; Python',
  certifications: 'AWS Certified Developer Associate, Overall Score: 749\nCertified Entry-Level Python Programmer, Overall Score: 88%\nWipro TalentNext Java J2EE Certification, Overall Score: 78%',
  roles: 'Community Lead at Developer Student Clubs NSEC, Kolkata, Jan 2019 - Present, 12 months, Conducted online and offline technical training impacting over 3000 students\nEvent Organizer at Google Developers Group Kolkata, Kolkata, Jan 2018 - Present, Organized events reaching over 7000 developers',
  activities: 'Actively write blog posts and social media content viewed by 20K+ job seekers per week\nMentor students on career development and technical interview preparation\nContribute to open-source projects on GitHub regularly',
  achievements: 'Awarded title of Intel Software Innovator - May 2019\nSecond Runner\'s Up at TCS EngiNx Engineering Project Innovation - Sep 2018\nRunner\'s Up at Facebook Developers Circle Hackathon - Aug 2017',
  references: 'Dr. Rajesh Kumar, Professor of CS at NSEC, rajesh@nsec.ac.in\nSara Johnson, Engineering Manager at Google, sara.j@google.com',
};

export function ResumeForm({ onGenerate, isGenerating, selectedTemplate, onTemplateChange }: ResumeFormProps) {
  const [formData, setFormData] = useState<ResumeFormData>(INITIAL_FORM);

  const handleChange = (field: keyof ResumeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[Form] Submitted formData:', formData);
    onGenerate(formData);
  };

  const templates: { id: TemplateType; name: string; desc: string; preview: string }[] = [
    { id: 'classic', name: 'Classic', desc: 'Photo area · links bar · declaration', preview: '📋' },
    { id: 'professional', name: 'Professional', desc: 'FAANG-style · tabular skills · centered header', preview: '💼' },
    { id: 'modern', name: 'Modern', desc: 'Indigo accents · skill tags · objectives', preview: '🎨' },
    { id: 'minimal', name: 'Minimal Dev', desc: 'Dense compact · left-name · right-contact', preview: '⚡' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* ===== TEMPLATE SELECTOR ===== */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <span>🎨</span> Choose Resume Template
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {templates.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => onTemplateChange(t.id)}
              className={`text-left p-3 rounded-xl border-2 transition-all text-xs ${
                selectedTemplate === t.id
                  ? 'border-indigo-500 bg-indigo-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{t.preview}</span>
                <div>
                  <div className="font-bold text-gray-800">{t.name}</div>
                  <div className="text-[10px] text-gray-500 leading-tight">{t.desc}</div>
                </div>
                {selectedTemplate === t.id && <span className="ml-auto text-indigo-500 text-base">✓</span>}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      {/* NLP Engine Info Badge */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🧠</span>
          <span className="font-bold text-indigo-800 text-sm">Unified NLP Engine</span>
        </div>
        <p className="text-[10px] text-gray-600 leading-relaxed">
          Your resume will be processed using a combined NLP pipeline:
          <span className="font-semibold text-blue-600"> Rule-Based NLG</span> (parsing) +
          <span className="font-semibold text-purple-600"> TF-IDF</span> (keywords) +
          <span className="font-semibold text-orange-600"> Pattern Analysis</span> (role detection)
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      {/* Quick Actions */}
      <div className="flex gap-2">
        <button type="button" onClick={() => setFormData(SAMPLE_DATA)} className="text-xs px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition font-medium">
          📋 Load Sample Data
        </button>
        <button type="button" onClick={() => setFormData(INITIAL_FORM)} className="text-xs px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition font-medium">
          🗑️ Clear All
        </button>
      </div>

      {/* ===== FORM FIELDS ===== */}

      {/* 1. Personal Info */}
      <FGroup num="1" color="blue" title="Personal Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <IField label="Full Name *" value={formData.fullName} onChange={v => handleChange('fullName', v)} placeholder="John Doe" required />
          <IField label="Email *" value={formData.email} onChange={v => handleChange('email', v)} placeholder="john@email.com" type="email" required />
          <IField label="Phone" value={formData.phone} onChange={v => handleChange('phone', v)} placeholder="+91-9876543210" />
          <IField label="Address / City" value={formData.address} onChange={v => handleChange('address', v)} placeholder="Kolkata, India" />
        </div>
        <IField label="Tagline" value={formData.tagline} onChange={v => handleChange('tagline', v)} placeholder="Full-Stack Developer | ML Enthusiast" />
      </FGroup>

      {/* 2. Links */}
      <FGroup num="2" color="green" title="Links & Profiles">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <IField label="LinkedIn" value={formData.linkedIn} onChange={v => handleChange('linkedIn', v)} placeholder="https://linkedin.com/in/..." />
          <IField label="GitHub" value={formData.github} onChange={v => handleChange('github', v)} placeholder="https://github.com/..." />
          <IField label="Portfolio" value={formData.portfolio} onChange={v => handleChange('portfolio', v)} placeholder="https://yoursite.com" />
          <IField label="Coding Profiles" value={formData.codingProfiles} onChange={v => handleChange('codingProfiles', v)} placeholder="https://leetcode.com/..." />
        </div>
      </FGroup>

      {/* 3. Career Objective */}
      <FGroup num="3" color="yellow" title="Career Objective" sub="(leave blank to auto-generate via NLP)">
        <TArea value={formData.careerObjective} onChange={v => handleChange('careerObjective', v)}
          placeholder="Leave blank for NLP auto-generation, or write your own objective..." rows={2} />
      </FGroup>

      {/* 4. Skills */}
      <FGroup num="4" color="purple" title="Skills *" sub="Category: skill1, skill2 (one per line)">
        <TArea value={formData.skills} onChange={v => handleChange('skills', v)}
          placeholder={"Languages: Python, JavaScript, Java\nFrameworks: React, Django, Node.js\nDatabases: PostgreSQL, MongoDB\nOr just: Python, React, SQL, Docker"}
          rows={4} />
      </FGroup>

      {/* 5. Education */}
      <FGroup num="5" color="indigo" title="Education *" sub="Degree, Institution, Year, Marks, Coursework">
        <TArea value={formData.education} onChange={v => handleChange('education', v)}
          placeholder={"B.Tech in CSE, XYZ University, 2020-2024, 8.5 CGPA, OS; DSA; ML\n12th, ABC School, 2020, 95%"}
          rows={3} />
      </FGroup>

      {/* 6. Experience */}
      <FGroup num="6" color="red" title="Experience" sub="Company, Designation, Duration, Location, Bullet1; Bullet2">
        <TArea value={formData.experience} onChange={v => handleChange('experience', v)}
          placeholder={"Google, SWE Intern, May-Aug 2023, Remote, Built APIs; Improved perf 30%; Reduced load time\nStartup Inc, Backend Dev, Jan-Dec 2022, Bangalore, Designed microservices; Scaled to 10k users"}
          rows={3} />
      </FGroup>

      {/* 7. Projects */}
      <FGroup num="7" color="teal" title="Projects" sub="Title, Description, Live Link, GitHub, TechStack">
        <TArea value={formData.projects} onChange={v => handleChange('projects', v)}
          placeholder={"AI Resume Builder, NLP-powered resume generator, https://demo.com, https://github.com/user/repo, React; Python; NLP\nE-Commerce App, Full-stack MERN app with payments, https://shop.com, https://github.com/user/shop, MongoDB; Express; React"}
          rows={3} />
      </FGroup>

      {/* 8. Certifications */}
      <FGroup num="8" color="amber" title="Certifications" sub="Name, Score (one per line)">
        <TArea value={formData.certifications} onChange={v => handleChange('certifications', v)}
          placeholder={"AWS Developer Associate, Score: 892/1000\nTensorFlow Developer Certificate, Score: Pass"}
          rows={2} />
      </FGroup>

      {/* 9. Leadership Roles */}
      <FGroup num="9" color="pink" title="Leadership Roles" sub="Title, Organization, Location, Duration, Description">
        <TArea value={formData.roles} onChange={v => handleChange('roles', v)}
          placeholder={"Tech Lead, GDSC NSEC, Kolkata, Jan 2023 - Present, Led workshops impacting 500+ students\nOpen Source Maintainer, Apache Foundation, Remote, Jan 2022 - Present"}
          rows={2} />
      </FGroup>

      {/* 10. Extra-Curricular */}
      <FGroup num="10" color="emerald" title="Extra-Curricular Activities" sub="One per line">
        <TArea value={formData.activities} onChange={v => handleChange('activities', v)}
          placeholder={"Write technical blog posts viewed by 20K+ weekly\nMentor students in career development and technical skills\nContribute to open-source projects regularly"}
          rows={2} />
      </FGroup>

      {/* 11. Achievements */}
      <FGroup num="11" color="orange" title="Honors & Achievements" sub="One per line">
        <TArea value={formData.achievements} onChange={v => handleChange('achievements', v)}
          placeholder={"Intel Software Innovator Award - May 2019\nRunner's Up at Facebook Hackathon - Aug 2017\nSecond Runner at TCS EngiNx - Sep 2018"}
          rows={2} />
      </FGroup>

      {/* 12. References */}
      <FGroup num="12" color="cyan" title="References" sub="Name, Designation, Contact (one per line)">
        <TArea value={formData.references} onChange={v => handleChange('references', v)}
          placeholder={"Dr. XYZ, Professor at ABC University, xyz@uni.edu\nJane Doe, Engineering Manager at Google, jane@google.com"}
          rows={2} />
      </FGroup>

      {/* Submit */}
      <button
        type="submit"
        disabled={isGenerating || !formData.fullName.trim() || !formData.email.trim()}
        className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-3"
      >
        {isGenerating ? (
          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
        ) : (
          <>🚀 Generate Resume</>
        )}
      </button>
    </form>
  );
}

// ---- Reusable sub-components ----

function FGroup({ num, color, title, sub, children }: {
  num: string; color: string; title: string; sub?: string; children: React.ReactNode;
}) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600', green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600', purple: 'bg-purple-100 text-purple-600',
    indigo: 'bg-indigo-100 text-indigo-600', red: 'bg-red-100 text-red-600',
    teal: 'bg-teal-100 text-teal-600', amber: 'bg-amber-100 text-amber-600',
    pink: 'bg-pink-100 text-pink-600', cyan: 'bg-cyan-100 text-cyan-600',
    emerald: 'bg-emerald-100 text-emerald-600', orange: 'bg-orange-100 text-orange-600',
  };
  return (
    <fieldset className="space-y-2">
      <legend className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2 flex-wrap">
        <span className={`w-5 h-5 ${colors[color] || 'bg-gray-100 text-gray-600'} rounded-md flex items-center justify-center text-[10px] shrink-0`}>{num}</span>
        {title}
        {sub && <span className="text-[10px] font-normal text-gray-400 normal-case">{sub}</span>}
      </legend>
      {children}
    </fieldset>
  );
}

function IField({ label, value, onChange, placeholder, type = 'text', required = false }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; type?: string; required?: boolean;
}) {
  return (
    <div className="space-y-0.5">
      {label && <label className="text-[10px] font-medium text-gray-600">{label}</label>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required}
        className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition" />
    </div>
  );
}

function TArea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder: string; rows?: number;
}) {
  return (
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition resize-none font-mono text-[10px] leading-relaxed" />
  );
}
