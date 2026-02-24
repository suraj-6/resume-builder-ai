// ============================================================
// TEMPLATE 2 — PROFESSIONAL (FAANGPath style)
// Centered header, tabular skills, clean horizontal rules
// ============================================================
import type { ResumeOutput } from '../../types';

export function ProfessionalTemplate({ resume }: { resume: ResumeOutput }) {
  return (
    <div className="font-sans text-gray-900 text-[11px] leading-[1.45] p-6 max-w-[800px] mx-auto bg-white">
      {/* Centered Header */}
      <div className="text-center mb-3">
        <h1 className="text-[22px] font-bold tracking-tight">{resume.name}</h1>
        <div className="flex flex-wrap justify-center items-center gap-x-2 mt-0.5 text-[10.5px] text-gray-600">
          {resume.phone && <span>{resume.phone}</span>}
          {resume.phone && resume.address && <span className="text-gray-400">·</span>}
          {resume.address && <span>{resume.address}</span>}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-2 mt-0.5 text-[10.5px]">
          {resume.email && <a href={`mailto:${resume.email}`} className="text-blue-700 hover:underline">{resume.email}</a>}
          {resume.linkedIn && <><span className="text-gray-400">·</span><a href={resume.linkedIn} className="text-blue-700 hover:underline">LinkedIn</a></>}
          {resume.github && <><span className="text-gray-400">·</span><a href={resume.github} className="text-blue-700 hover:underline">GitHub</a></>}
          {resume.portfolio && <><span className="text-gray-400">·</span><a href={resume.portfolio} className="text-blue-700 hover:underline">Portfolio</a></>}
        </div>
      </div>

      {/* Objective */}
      {resume.summary && (
        <RSection title="OBJECTIVE">
          <p className="text-[10.5px]">{resume.summary}</p>
        </RSection>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <RSection title="Education">
          {resume.education.map((edu, i) => (
            <div key={i} className="mb-1.5">
              <div className="flex justify-between items-start">
                <span className="text-[10.5px]">
                  <strong>{edu.degree}</strong>
                  {edu.institution ? `, ${edu.institution}` : ''}
                </span>
                {edu.year && <span className="text-[10px] italic ml-2 whitespace-nowrap">{edu.year}</span>}
              </div>
              {edu.coursework && <div className="text-[10px] text-gray-600">Relevant Coursework: {edu.coursework}</div>}
              {edu.marks && <div className="text-[10px] text-gray-500">{edu.marks}</div>}
            </div>
          ))}
        </RSection>
      )}

      {/* Skills — Tabular layout */}
      {resume.skills.length > 0 && (
        <RSection title="SKILLS">
          <table className="w-full text-[10.5px]">
            <tbody>
              {resume.skills.map((cat, i) => (
                <tr key={i}>
                  <td className="font-bold pr-6 py-0.5 whitespace-nowrap align-top w-36">{cat.category}</td>
                  <td className="py-0.5">{cat.items.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </RSection>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <RSection title="EXPERIENCE">
          {resume.experience.map((exp, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between items-start">
                <span className="font-bold text-[10.5px]">{exp.designation}</span>
                <span className="text-[10px]">{exp.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10.5px]">{exp.company}</span>
                {exp.location && <span className="italic text-[10px]">{exp.location}</span>}
              </div>
              {exp.bullets.length > 0 && (
                <ul className="list-disc pl-4 mt-0.5 space-y-0.5 text-[10px]">
                  {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </RSection>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <RSection title="PROJECTS">
          <ul className="space-y-1.5">
            {resume.projects.map((proj, i) => (
              <li key={i}>
                <span className="font-bold text-[10.5px]">{proj.title}.</span>{' '}
                <span className="text-[10px]">{proj.description}</span>
                {proj.link && <a href={proj.link} className="text-blue-700 text-[10px] ml-1 hover:underline">(Link)</a>}
                {proj.github && <a href={proj.github} className="text-blue-700 text-[10px] ml-1 hover:underline">(GitHub)</a>}
                {proj.techStack && <span className="text-[9.5px] text-gray-500 ml-1">Tech: {proj.techStack}</span>}
              </li>
            ))}
          </ul>
        </RSection>
      )}

      {/* Certifications */}
      {resume.certifications.length > 0 && (
        <RSection title="CERTIFICATIONS">
          <ul className="space-y-0.5">
            {resume.certifications.map((cert, i) => (
              <li key={i} className="flex justify-between text-[10.5px]">
                <span className="font-bold">{cert.name}</span>
                {cert.score && <span className="text-gray-600">Score: {cert.score}</span>}
              </li>
            ))}
          </ul>
        </RSection>
      )}

      {/* Extra-Curricular */}
      {resume.activities.length > 0 && (
        <RSection title="Extra-Curricular Activities">
          <ul className="list-disc pl-4 space-y-0.5 text-[10px]">
            {resume.activities.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </RSection>
      )}

      {/* Leadership / Roles */}
      {resume.roles.length > 0 && (
        <RSection title="Leadership">
          <ul className="list-disc pl-4 space-y-0.5 text-[10px]">
            {resume.roles.map((role, i) => (
              <li key={i}>
                <span className="font-bold">{role.title}</span>
                {role.organization && ` at ${role.organization}`}
                {role.duration && ` · ${role.duration}`}
                {role.description && `. ${role.description}`}
              </li>
            ))}
          </ul>
        </RSection>
      )}

      {/* Achievements */}
      {resume.achievements.length > 0 && (
        <RSection title="Honors and Awards">
          <ul className="list-disc pl-4 space-y-0.5 text-[10px]">
            {resume.achievements.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </RSection>
      )}

      {/* References */}
      {resume.references.length > 0 && (
        <RSection title="References">
          {resume.references.map((ref, i) => (
            <div key={i} className="text-[10.5px] mb-0.5">
              <span className="font-bold">{ref.name}</span>
              {ref.designation && <span className="ml-1 italic text-[10px]">— {ref.designation}</span>}
              {ref.contact && <a href={`mailto:${ref.contact}`} className="text-blue-700 text-[10px] ml-2 hover:underline">{ref.contact}</a>}
            </div>
          ))}
        </RSection>
      )}
    </div>
  );
}

function RSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-2.5">
      <h2 className="text-[12px] font-bold uppercase tracking-wide border-b-[1.5px] border-gray-800 pb-0.5 mb-1.5">{title}</h2>
      {children}
    </section>
  );
}
