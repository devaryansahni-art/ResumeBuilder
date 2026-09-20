import React from 'react';
import { ResumeData } from '../../../types/resume';
import { FONT_FAMILY_MAP, FONT_SIZE_CLASSES, SPACING_CLASSES } from '../../../utils/theme';

interface Props {
  data: ResumeData;
}

export const TechnicalTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, workExperiences, education, skillCategories, projects, certifications, languages, theme } = data;
  
  const fontStyle = { fontFamily: FONT_FAMILY_MAP[theme.fontFamily] || FONT_FAMILY_MAP.inter };
  const size = FONT_SIZE_CLASSES[theme.fontSize] || FONT_SIZE_CLASSES.md;
  const spacing = SPACING_CLASSES[theme.spacing] || SPACING_CLASSES.normal;

  const contactItems = [
    personalInfo.email && `mailto:${personalInfo.email}`,
    personalInfo.phone && `tel:${personalInfo.phone}`,
    personalInfo.location,
    personalInfo.github && `github:${personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}`,
    personalInfo.linkedIn && `in:${personalInfo.linkedIn.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}`,
    personalInfo.website && `web:${personalInfo.website.replace(/^https?:\/\//, '')}`
  ].filter(Boolean);

  return (
    <div 
      className={`bg-slate-900 text-slate-100 ${spacing.padding} shadow-lg print:shadow-none min-h-[1056px] w-full box-border font-mono`}
      style={fontStyle}
    >
      {/* Code Terminal Style Header */}
      <header className="mb-6 p-5 rounded-lg bg-slate-950 border border-slate-800 relative overflow-hidden">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
          <span className="text-xs text-slate-500 ml-2 font-mono">~/resume/{personalInfo.fullName ? personalInfo.fullName.toLowerCase().replace(/\s+/g, '-') : 'profile'}.ts</span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs text-indigo-400 font-mono font-bold mb-1">// Senior Developer Profile</div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight font-sans">
              {personalInfo.fullName || 'Developer Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-sm text-emerald-400 font-mono mt-1 font-semibold">
                const role = "{personalInfo.jobTitle}";
              </p>
            )}
          </div>
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <img 
              src={personalInfo.photoUrl} 
              alt={personalInfo.fullName} 
              className="w-16 h-16 rounded-lg object-cover border-2 border-emerald-500/50"
            />
          )}
        </div>

        {contactItems.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-1 font-mono">
            {contactItems.map((item, idx) => (
              <span key={idx} className="hover:text-emerald-400 transition-colors">
                {item}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Summary / About */}
      {summary && (
        <section className={`resume-section ${spacing.sectionGap} bg-slate-950/60 p-4 rounded-lg border border-slate-800/80`}>
          <div className="flex items-center gap-2 mb-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
            <span className="text-emerald-400">#</span> Summary
          </div>
          <p className={`${size.body} text-slate-300 leading-relaxed font-sans`}>{summary}</p>
        </section>
      )}

      {/* Skill Tags */}
      {skillCategories.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <div className="flex items-center gap-2 mb-3 text-indigo-400 font-bold text-xs uppercase tracking-wider">
            <span className="text-emerald-400">#</span> Tech Stack & Skills
          </div>
          <div className="space-y-3 font-sans">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="bg-slate-950/40 p-3 rounded border border-slate-800">
                {cat.category && <div className="text-xs font-bold text-slate-400 font-mono mb-1.5">{cat.category}:</div>}
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs bg-slate-800 text-emerald-300 border border-slate-700 px-2 py-0.5 rounded font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {workExperiences.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <div className="flex items-center gap-2 mb-3 text-indigo-400 font-bold text-xs uppercase tracking-wider">
            <span className="text-emerald-400">#</span> Experience History
          </div>
          <div className="space-y-4 font-sans">
            {workExperiences.map((exp) => (
              <div key={exp.id} className="bg-slate-950/40 p-4 rounded-lg border border-slate-800">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-white text-base font-sans">{exp.jobTitle}</h3>
                  <span className="text-xs text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                    {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs text-indigo-300 font-mono mb-2">
                  @ {exp.company} {exp.location && `(${exp.location})`}
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc ml-5 space-y-1 text-slate-300 text-xs">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className={size.body}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <div className="flex items-center gap-2 mb-3 text-indigo-400 font-bold text-xs uppercase tracking-wider">
            <span className="text-emerald-400">#</span> Featured Projects
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-slate-950/40 p-3.5 rounded border border-slate-800">
                <div className="font-bold text-slate-100 text-sm flex items-center justify-between">
                  <span>{proj.name}</span>
                  {proj.link && <span className="text-[10px] text-emerald-400 font-mono">link ↗</span>}
                </div>
                {proj.description && <p className="text-xs text-slate-300 mt-1">{proj.description}</p>}
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {proj.technologies.map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certs */}
      {education.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <div className="flex items-center gap-2 mb-3 text-indigo-400 font-bold text-xs uppercase tracking-wider">
            <span className="text-emerald-400">#</span> Education
          </div>
          <div className="space-y-2 font-sans">
            {education.map((edu) => (
              <div key={edu.id} className="bg-slate-950/40 p-3 rounded border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white text-xs">{edu.degree}</div>
                  <div className="text-xs text-slate-400 font-mono">{edu.institution} {edu.location && `• ${edu.location}`}</div>
                </div>
                <div className="text-xs text-emerald-400 font-mono">{edu.startDate} – {edu.isCurrent ? 'Present' : edu.endDate}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
