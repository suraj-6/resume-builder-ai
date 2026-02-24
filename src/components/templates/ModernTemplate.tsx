// ============================================================
// TEMPLATE 3 — MODERN DATA SCIENCE (TLC Resume Style)
// Color accents, skill tags, objective section, clean layout
// ============================================================
import type { ResumeOutput } from '../../types';

export function ModernTemplate({ resume }: { resume: ResumeOutput }) {
  return (
    <div className="font-sans text-gray-900 text-[11px] leading-[1.45] p-6 max-w-[800px] mx-auto bg-white">
      {/* Header — left-aligned with indigo accent */}
      <div className="border-b-2 border-indigo-600 pb-3 mb-2">
        <h1 className="text-[22px] font-extrabold text-indigo-900 tracking-tight">{resume.name}</h1>
        {resume.tagline && <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">{resume.tagline}</p>}
        <div className="flex flex-wrap items-center gap-x-3 mt-1 text-[10px] text-gray-600">
          {resume.phone && <span>📞 {resume.phone}</span>}
          {resume.address && <span>📍 {resume.address}</span>}
          {resume.email && <span>✉ <a href={`mailto:${resume.email}`} className="text-indigo-700 hover:underline">{resume.email}</a></span>}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 mt-0.5 text-[10px]">
          {resume.linkedIn && <a href={resume.linkedIn} className="text-indigo-700 hover:underline">🔗 LinkedIn</a>}
          {resume.github && <a href={resume.github} className="text-indigo-700 hover:underline">💻 GitHub</a>}
          {resume.portfolio && <a href={resume.portfolio} className="text-indigo-700 hover:underline">🌐 Portfolio</a>}
          {resume.codingProfiles && <a href={resume.codingProfiles} className="text-indigo-700 hover:underline">⚡ Coding</a>}
        </div>
      </div>

      {/* Objective */}
      {resume.summary && (
        <MSection title="Objective">
          <p className="text-[10.5px] leading-relaxed">{resume.summary}</p>
        </MSection>
      )}

      {/* Skills — chip tags */}
      {resume.skills.length > 0 && (
        <MSection title="Skills">
          <div className="space-y-1.5">
            {resume.skills.map((cat, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="font-bold text-indigo-800 min-w-[110px] text-[10.5px] pt-0.5">{cat.category}</span>
                <div className="flex flex-wrap gap-1">
                  {cat.items.map((skill, j) => (
                    <span key={j} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-800 text-[9.5px] rounded border border-indigo-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </MSection>
      )}

      {/* Technical Experience */}
      {resume.experience.length > 0 && (
        <MSection title="Technical Experience">
          {resume.experience.map((exp, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[11px]">{exp.designation} — {exp.company}</span>
                <span className="text-[10px] text-gray-500">{exp.duration}</span>
              </div>
              {exp.location && <div className="text-[10px] text-gray-500 italic">{exp.location}</div>}
              {exp.bullets.length > 0 && (
                <ul className="list-disc pl-4 mt-0.5 space-y-0.5 text-[10px]">
                  {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </MSection>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <MSection title="Education">
          {resume.education.map((edu, i) => (
            <div key={i} className="mb-1.5">
              <div className="flex justify-between items-start">
                <span className="text-[10.5px]">
                  <strong>{edu.degree}</strong>{edu.institution ? ` — ${edu.institution}` : ''}
                </span>
                {edu.year && <span className="text-[10px] text-gray-500 ml-2 whitespace-nowrap">{edu.year}</span>}
              </div>
              {edu.marks && <div className="text-[10px] text-gray-600">{edu.marks}</div>}
              {edu.coursework && <div className="text-[9.5px] text-gray-500 italic">Coursework: {edu.coursework}</div>}
            </div>
          ))}
        </MSection>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <MSection title="Projects">
          {resume.projects.map((proj, i) => (
            <div key={i} className="mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[10.5px]">{proj.title}</span>
                {proj.link && <a href={proj.link} className="text-indigo-600 text-[9px] hover:underline">[Demo]</a>}
                {proj.github && <a href={proj.github} className="text-indigo-600 text-[9px] hover:underline">[Code]</a>}
              </div>
              {proj.description && <p className="text-[10px]">{proj.description}</p>}
              {proj.techStack && <p className="text-[9.5px] text-indigo-600 italic">Tech: {proj.techStack}</p>}
            </div>
          ))}
        </MSection>
      )}

      {/* Roles / Leadership */}
      {resume.roles.length > 0 && (
        <MSection title="Leadership Roles">
          {resume.roles.map((role, i) => (
            <div key={i} className="mb-1">
              <div className="flex justify-between">
                <span className="font-bold text-[10.5px]">{role.title}{role.organization ? ` — ${role.organization}` : ''}</span>
                {role.duration && <span className="text-[10px] text-gray-500">{role.duration}</span>}
              </div>
              {role.description && <div className="text-[10px]">{role.description}</div>}
            </div>
          ))}
        </MSection>
      )}

      {/* Activities */}
      {resume.activities.length > 0 && (
        <MSection title="Activities">
          <ul className="list-disc pl-4 space-y-0.5 text-[10px]">
            {resume.activities.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </MSection>
      )}

      {/* Achievements */}
      {resume.achievements.length > 0 && (
        <MSection title="Achievements & Awards">
          <ul className="list-disc pl-4 space-y-0.5 text-[10px]">
            {resume.achievements.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </MSection>
      )}

      {/* Certifications */}
      {resume.certifications.length > 0 && (
        <MSection title="Certifications">
          <ul className="space-y-0.5">
            {resume.certifications.map((cert, i) => (
              <li key={i} className="flex justify-between text-[10px]">
                <span className="font-bold">{cert.name}</span>
                {cert.score && <span className="text-gray-600">{cert.score}</span>}
              </li>
            ))}
          </ul>
        </MSection>
      )}
    </div>
  );
}

function MSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-2.5">
      <h2 className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider border-b border-indigo-200 pb-0.5 mb-1.5">{title}</h2>
      {children}
    </section>
  );
}
