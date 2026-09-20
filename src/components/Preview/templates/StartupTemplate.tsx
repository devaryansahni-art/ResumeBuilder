import React from 'react';
import { ResumeData } from '../../../types/resume';
import { FONT_FAMILY_MAP, FONT_SIZE_CLASSES, SPACING_CLASSES } from '../../../utils/theme';

interface Props {
  data: ResumeData;
}

export const StartupTemplate: React.FC<Props> = ({ data }) => {
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
      className={`bg-slate-50 text-slate-900 ${spacing.padding} shadow-lg print:shadow-none min-h-[1056px] w-full box-border`}
      style={fontStyle}
    >
      {/* Startup Header Box */}
      <header className="mb-6 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold px-2 py-0.5 rounded-md uppercase font-mono">
                Tech Founder & Leader
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {personalInfo.fullName || 'Startup Leader'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-sm font-bold text-indigo-600 mt-0.5">
                {personalInfo.jobTitle}
              </p>
            )}
          </div>

          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <img 
              src={personalInfo.photoUrl} 
              alt={personalInfo.fullName} 
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/30 shadow-md"
            />
          )}
        </div>

        {contactItems.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-xs font-mono text-slate-600">
            {contactItems.map((item, idx) => (
              <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                {item}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Summary Box */}
      {summary && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
              Founder Vision & Mission
            </h2>
            <p className={`${size.body} text-slate-800 leading-relaxed font-medium`}>{summary}</p>
          </div>
        </section>
      )}

      {/* Experience Cards */}
      {workExperiences.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
            Startup & Growth History
          </h2>
          <div className="space-y-3">
            {workExperiences.map((exp) => (
              <div key={exp.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900 text-sm">{exp.jobTitle}</h3>
                  <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs font-bold text-indigo-600 mb-2">
                  {exp.company} {exp.location && `• ${exp.location}`}
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc ml-4 space-y-1 text-xs text-slate-700">
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

      {/* Skills & Projects Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillCategories.length > 0 && (
          <section className={`resume-section ${spacing.sectionGap}`}>
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Tech Stack & Tools</h2>
            <div className="space-y-2">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="font-bold text-xs text-slate-900 mb-1">{cat.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((item, idx) => (
                      <span key={idx} className="text-[10px] font-mono bg-slate-100 text-slate-800 border border-slate-200 px-2 py-0.5 rounded-md">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className={`resume-section ${spacing.sectionGap}`}>
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Background & Education</h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="font-bold text-xs text-slate-900">{edu.degree}</div>
                  <div className="text-xs text-slate-600">{edu.institution}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
