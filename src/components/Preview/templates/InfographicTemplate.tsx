import React from 'react';
import { ResumeData } from '../../../types/resume';
import { FONT_FAMILY_MAP, FONT_SIZE_CLASSES, SPACING_CLASSES } from '../../../utils/theme';

interface Props {
  data: ResumeData;
}

export const InfographicTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, workExperiences, education, skillCategories, projects, theme } = data;

  const fontStyle = { fontFamily: FONT_FAMILY_MAP[theme.fontFamily] || FONT_FAMILY_MAP.jakarta };
  const size = FONT_SIZE_CLASSES[theme.fontSize] || FONT_SIZE_CLASSES.md;
  const spacing = SPACING_CLASSES[theme.spacing] || SPACING_CLASSES.normal;

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedIn,
    personalInfo.github
  ].filter(Boolean);

  return (
    <div 
      className={`bg-white text-slate-900 ${spacing.padding} shadow-lg print:shadow-none min-h-[1056px] w-full box-border`}
      style={fontStyle}
    >
      {/* Visual Header */}
      <header className="mb-6 pb-6 border-b-2 border-dashed border-slate-200">
        <div className="flex items-center justify-between gap-6">
          <div>
            <div className="inline-block bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2" style={{ backgroundColor: theme.accentColor }}>
              Professional Profile
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-sm font-bold text-slate-600 mt-0.5">
                {personalInfo.jobTitle}
              </p>
            )}
            {contactItems.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs text-slate-600 mt-3 font-mono">
                {contactItems.map((item, idx) => (
                  <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <img 
              src={personalInfo.photoUrl} 
              alt={personalInfo.fullName} 
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-100 shadow-md"
            />
          )}
        </div>
      </header>

      {/* Highlights / Summary Cards */}
      {summary && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">
              Executive Summary & Impact
            </h2>
            <p className={`${size.body} text-slate-800 leading-relaxed`}>{summary}</p>
          </div>
        </section>
      )}

      {/* Visual Skills Progress Pills */}
      {skillCategories.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
            Key Competencies & Skill Matrix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="font-bold text-xs text-slate-900 mb-2">{cat.category}</div>
                <div className="space-y-1.5">
                  {cat.items.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="text-slate-700 font-medium">{skill}</span>
                      <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${Math.min(100, Math.max(65, 95 - idx * 8))}%`, 
                            backgroundColor: theme.accentColor 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work History */}
      {workExperiences.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
            Professional Achievements
          </h2>
          <div className="space-y-4">
            {workExperiences.map((exp) => (
              <div key={exp.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow transition">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{exp.jobTitle}</h3>
                    <div className="text-xs font-bold text-slate-500">{exp.company} {exp.location && `• ${exp.location}`}</div>
                  </div>
                  <span className="text-xs font-mono font-bold text-white px-2.5 py-1 rounded-full shadow-sm" style={{ backgroundColor: theme.accentColor }}>
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc ml-5 space-y-1 text-xs text-slate-700 mt-2">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className={size.body}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {education.length > 0 && (
          <section className={`resume-section ${spacing.sectionGap}`}>
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Education</h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="font-bold text-xs text-slate-900">{edu.degree}</div>
                  <div className="text-xs text-slate-600">{edu.institution}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className={`resume-section ${spacing.sectionGap}`}>
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Key Projects</h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="font-bold text-xs text-slate-900">{proj.name}</div>
                  <div className="text-xs text-slate-600">{proj.description}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
