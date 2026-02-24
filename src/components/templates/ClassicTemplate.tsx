// ============================================================
// TEMPLATE 1 — CLASSIC (Original LaTeX style)
// Sections with bullet items, links bar, tagline, photo area
// ============================================================
import type { ResumeOutput } from '../../types';

export function ClassicTemplate({ resume }: { resume: ResumeOutput }) {
  return (
    <div className="font-serif text-gray-900 text-[11px] leading-[1.4] p-6 max-w-[800px] mx-auto bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h1 className="text-[22px] font-bold tracking-tight">{resume.name}</h1>
          {resume.tagline && <p className="text-[10.5px] text-gray-600 mt-0.5 italic">{resume.tagline}</p>}
          {resume.address && <p className="text-[10px] text-gray-600 mt-0.5">{resume.address}</p>}
          <div className="flex flex-wrap items-center gap-x-1 mt-1 text-[10px] text-blue-700">
            {resume.portfolio && <a href={resume.portfolio} className="hover:underline">Portfolio</a>}
            {resume.portfolio && resume.email && <span className="text-gray-400 font-bold">·</span>}
            {resume.email && <a href={`mailto:${resume.email}`} className="hover:underline">{resume.email}</a>}
            {resume.phone && <><span className="text-gray-400 font-bold">·</span><a href={`tel:${resume.phone}`} className="hover:underline">{resume.phone}</a></>}
            {resume.github && <><span className="text-gray-400 font-bold">·</span><a href={resume.github} className="hover:underline">GitHub</a></>}
          </div>
          <div className="flex flex-wrap items-center gap-x-1 text-[10px] text-blue-700 mt-0.5">
            {resume.linkedIn && <a href={resume.linkedIn} className="hover:underline">LinkedIn</a>}
            {resume.linkedIn && resume.codingProfiles && <span className="text-gray-400 font-bold">·</span>}
            {resume.codingProfiles && <a href={resume.codingProfiles} className="hover:underline">Coding Profiles</a>}
          </div>
        </div>
        {/* Photo placeholder */}
        <div className="w-16 h-20 bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-gray-400 text-[8px] ml-4 flex-shrink-0 text-center">
          <span>Photo</span>
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <CSection title="Summary">
          <ul className="list-disc pl-4"><li className="text-[10px]">{resume.summary}</li></ul>
        </CSection>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <CSection title="EDUCATION">
          <ul className="space-y-1.5">
            {resume.education.map((edu, i) => (
              <li key={i}>
                <div className="flex justify-between">
                  <span className="font-bold text-[10.5px]">{edu.degree}</span>
                  {edu.year && <span className="text-[10px]">({edu.year})</span>}
                </div>
                {edu.institution && <div className="text-[10px]">{edu.institution}</div>}
                {edu.marks && <div className="text-[10px]">Marks/CGPA: {edu.marks}</div>}
                {edu.coursework && <div className="text-[9.5px] text-gray-500 italic">Courses: {edu.coursework}</div>}
              </li>
            ))}
          </ul>
        </CSection>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <CSection title="SKILLS">
          <ul className="space-y-1">
            {resume.skills.map((cat, i) => (
              <li key={i}>
                <span className="font-bold text-[10.5px]">{cat.category}</span>
                <div className="text-[10px]">{cat.items.join(', ')}</div>
              </li>
            ))}
          </ul>
        </CSection>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <CSection title="PROJECTS">
          <ul className="space-y-1">
            {resume.projects.map((proj, i) => (
              <li key={i}>
                <span className="font-bold text-[10.5px]">{proj.title}</span>
                {proj.link && <a href={proj.link} className="text-blue-700 text-[10px] ml-2 hover:underline">[Link]</a>}
                {proj.github && <a href={proj.github} className="text-blue-700 text-[10px] ml-1 hover:underline">[Github]</a>}
                {proj.description && <div className="text-[10px] text-gray-700">{proj.description}</div>}
                {proj.techStack && <div className="text-[9.5px] text-gray-500 italic">Tech: {proj.techStack}</div>}
              </li>
            ))}
          </ul>
        </CSection>
      )}

      {/* Significant Roles */}
      {resume.roles.length > 0 && (
        <CSection title="Significant Roles">
          <ul className="space-y-1">
            {resume.roles.map((role, i) => (
              <li key={i}>
                <div className="flex justify-between">
                  <span className="font-bold text-[10.5px]">{role.title}</span>
                  {role.duration && <span className="text-[10px]">{role.duration}</span>}
                </div>
                {role.organization && <div className="text-[10px]">{role.organization}</div>}
                {role.location && <div className="text-[9.5px] text-gray-500">{role.location}</div>}
              </li>
            ))}
          </ul>
        </CSection>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <CSection title="EXPERIENCE">
          <ul className="space-y-1.5">
            {resume.experience.map((exp, i) => (
              <li key={i}>
                <div className="flex justify-between">
                  <span className="font-bold text-[10.5px]">{exp.company}</span>
                  {exp.duration && <span className="text-[10px]">{exp.duration}</span>}
                </div>
                <div className="italic text-[10px]">{exp.designation}</div>
                {exp.bullets.length > 0 && (
                  <ul className="list-disc pl-4 text-[9.5px] mt-0.5 space-y-0.5">
                    {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </CSection>
      )}

      {/* Certifications */}
      {resume.certifications.length > 0 && (
        <CSection title="Global Certifications">
          <ul className="space-y-0.5">
            {resume.certifications.map((cert, i) => (
              <li key={i} className="flex justify-between text-[10px]">
                <span className="font-bold">{cert.name}</span>
                {cert.score && <span>Overall Score: {cert.score}</span>}
              </li>
            ))}
          </ul>
        </CSection>
      )}

      {/* Achievements */}
      {resume.achievements.length > 0 && (
        <CSection title="Honors and Awards">
          <ul className="list-disc pl-4 space-y-0.5">
            {resume.achievements.map((a, i) => <li key={i} className="text-[10px]">{a}</li>)}
          </ul>
        </CSection>
      )}

      {/* References */}
      {resume.references.length > 0 && (
        <CSection title="References">
          <ul className="space-y-0.5">
            {resume.references.map((ref, i) => (
              <li key={i}>
                <span className="font-bold text-[10.5px]">{ref.name}</span>
                {ref.designation && <span className="text-[10px] ml-1">— {ref.designation}</span>}
                {ref.contact && <span className="text-blue-700 text-[10px] ml-2">{ref.contact}</span>}
              </li>
            ))}
          </ul>
        </CSection>
      )}

      {/* Declaration */}
      <CSection title="Declaration">
        <p className="text-[10px] text-gray-600">
          I hereby declare that the above mentioned information is correct up to my knowledge and I bear the responsibility for the correctness of the above mentioned.
        </p>
      </CSection>
    </div>
  );
}

function CSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-2.5">
      <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5 mb-1.5">{title}</h2>
      {children}
    </section>
  );
}
