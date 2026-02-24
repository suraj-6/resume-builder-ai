// ============================================================
// TEMPLATE 4 — MINIMAL DEV (Anubhav Singh style)
// Dense, compact, left-name right-contact, subheadings
// ============================================================
import type { ResumeOutput } from '../../types';

export function MinimalTemplate({ resume }: { resume: ResumeOutput }) {
  return (
    <div className="font-sans text-gray-900 text-[10.5px] leading-[1.4] p-5 max-w-[800px] mx-auto bg-white">
      {/* Header — Left name, right contact */}
      <div className="flex justify-between items-start border-b border-gray-400 pb-1.5 mb-1.5">
        <div>
          <h1 className="text-[20px] font-extrabold">{resume.name}</h1>
          {resume.tagline && <div className="text-[9.5px] text-gray-500 italic">{resume.tagline}</div>}
          {resume.portfolio && (
            <div className="text-[10px]">
              Portfolio: <a href={resume.portfolio} className="text-blue-700 hover:underline">{resume.portfolio}</a>
            </div>
          )}
          {resume.github && (
            <div className="text-[10px]">
              GitHub: <a href={resume.github} className="text-blue-700 hover:underline">{resume.github}</a>
            </div>
          )}
        </div>
        <div className="text-right text-[10px]">
          {resume.email && <div>Email: <a href={`mailto:${resume.email}`} className="text-blue-700 hover:underline">{resume.email}</a></div>}
          {resume.phone && <div>Mobile: {resume.phone}</div>}
          {resume.address && <div>{resume.address}</div>}
          {resume.linkedIn && <div><a href={resume.linkedIn} className="text-blue-700 hover:underline">LinkedIn</a></div>}
          {resume.codingProfiles && <div><a href={resume.codingProfiles} className="text-blue-700 hover:underline">Coding Profiles</a></div>}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <DSection title="Summary">
          <p className="text-[10px]">{resume.summary}</p>
        </DSection>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <DSection title="Education">
          {resume.education.map((edu, i) => (
            <div key={i} className="mb-1">
              <div className="flex justify-between">
                <span className="font-bold text-[10.5px]">{edu.degree}</span>
                <span className="text-[9.5px] italic">{edu.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] italic">{edu.institution}</span>
                {edu.marks && <span className="text-[9.5px]">{edu.marks}</span>}
              </div>
              {edu.coursework && <div className="text-[9px] text-gray-500">Courses: {edu.coursework}</div>}
            </div>
          ))}
        </DSection>
      )}

      {/* Skills Summary */}
      {resume.skills.length > 0 && (
        <DSection title="Skills Summary">
          <div className="space-y-0.5">
            {resume.skills.map((cat, i) => (
              <div key={i} className="flex items-start gap-1">
                <span className="font-bold min-w-[110px] text-[10px]">{cat.category}</span>
                <span className="text-[10px]">{cat.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </DSection>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <DSection title="Experience">
          {resume.experience.map((exp, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <span className="font-bold text-[10.5px]">{exp.company}</span>
                <span className="text-[9.5px]">{exp.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] italic">{exp.designation}</span>
                {exp.location && <span className="text-[9.5px] italic">{exp.location}</span>}
              </div>
              {exp.bullets.length > 0 && (
                <ul className="mt-0.5 space-y-0.5">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-1 text-[10px]">
                      <span className="text-gray-400 mt-0.5 shrink-0">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </DSection>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <DSection title="Projects">
          {resume.projects.map((proj, i) => (
            <div key={i} className="mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[10.5px]">{proj.title}</span>
                {proj.techStack && <span className="text-[9px] text-gray-500">({proj.techStack})</span>}
                {proj.link && <a href={proj.link} className="text-blue-700 text-[9px] hover:underline">[Link]</a>}
                {proj.github && <a href={proj.github} className="text-blue-700 text-[9px] hover:underline">[GitHub]</a>}
              </div>
              {proj.description && <p className="text-[10px]">{proj.description}</p>}
            </div>
          ))}
        </DSection>
      )}

      {/* Certifications */}
      {resume.certifications.length > 0 && (
        <DSection title="Certifications">
          <ul className="space-y-0.5">
            {resume.certifications.map((cert, i) => (
              <li key={i} className="flex justify-between text-[10px]">
                <span>{cert.name}</span>
                {cert.score && <span className="text-gray-600">{cert.score}</span>}
              </li>
            ))}
          </ul>
        </DSection>
      )}

      {/* Achievements */}
      {resume.achievements.length > 0 && (
        <DSection title="Honors and Awards">
          <ul className="space-y-0.5">
            {resume.achievements.map((a, i) => (
              <li key={i} className="flex items-start gap-1 text-[10px]">
                <span className="text-gray-400 shrink-0">•</span><span>{a}</span>
              </li>
            ))}
          </ul>
        </DSection>
      )}

      {/* Activities */}
      {resume.activities.length > 0 && (
        <DSection title="Volunteer / Activities">
          <ul className="space-y-0.5">
            {resume.activities.map((a, i) => (
              <li key={i} className="flex items-start gap-1 text-[10px]">
                <span className="text-gray-400 shrink-0">•</span><span>{a}</span>
              </li>
            ))}
          </ul>
        </DSection>
      )}

      {/* Roles */}
      {resume.roles.length > 0 && (
        <DSection title="Leadership Roles">
          {resume.roles.map((role, i) => (
            <div key={i} className="mb-1">
              <div className="flex justify-between">
                <span className="font-bold text-[10px]">{role.title}{role.organization ? ` at ${role.organization}` : ''}</span>
                <span className="text-[9.5px]">{role.duration}</span>
              </div>
              {role.location && <div className="text-[9.5px] italic">{role.location}</div>}
              {role.description && <div className="text-[9.5px]">{role.description}</div>}
            </div>
          ))}
        </DSection>
      )}

      {/* References */}
      {resume.references.length > 0 && (
        <DSection title="References">
          {resume.references.map((ref, i) => (
            <div key={i} className="text-[10px] mb-0.5">
              <span className="font-bold">{ref.name}</span>
              {ref.designation && <span className="ml-1 italic">— {ref.designation}</span>}
              {ref.contact && <a href={`mailto:${ref.contact}`} className="text-blue-700 ml-2 hover:underline">{ref.contact}</a>}
            </div>
          ))}
        </DSection>
      )}
    </div>
  );
}

function DSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-1.5">
      <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-gray-800 pb-0.5 mb-1">
        {title}
      </h2>
      {children}
    </section>
  );
}
