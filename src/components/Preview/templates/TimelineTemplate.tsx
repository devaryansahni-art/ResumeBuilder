import React from 'react';
import { ResumeData } from '../../../types/resume';
import { FONT_FAMILY_MAP, FONT_SIZE_CLASSES, SPACING_CLASSES } from '../../../utils/theme';

interface Props {
  data: ResumeData;
}

export const TimelineTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, workExperiences, education, skillCategories, projects, theme } = data;

  const fontStyle = { fontFamily: FONT_FAMILY_MAP[theme.fontFamily] || FONT_FAMILY_MAP.inter };
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
      {/* Timeline Floating Card Header */}
      <header className="mb-8 p-6 bg-slate-900 text-white rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-widest block mb-1">
            Career Timeline Resume
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {personalInfo.fullName || 'Candidate Name'}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-sm text-indigo-200 font-medium mt-0.5">
              {personalInfo.jobTitle}
            </p>
          )}

          {contactItems.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-300 font-mono">
              {contactItems.map((item, idx) => (
                <span key={idx}>
                  {idx > 0 && <span className="text-slate-600 mr-2">•</span>}
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
            className="w-20 h-20 rounded-full border-2 border-indigo-400 object-cover shadow-md shrink-0"
          />
        )}
      </header>

      {/* Summary */}
      {summary && (
        <section className={`resume-section ${spacing.sectionGap} mb-6`}>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Executive Summary</h2>
            <p className={`${size.body} text-slate-800 leading-relaxed`}>{summary}</p>
          </div>
        </section>
      )}

      {/* Vertical Timeline Work Experience */}
      {workExperiences.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: theme.accentColor }}></span>
            Career Milestones & Progression
          </h2>

          <div className="relative pl-6 border-l-2 space-y-6" style={{ borderColor: `${theme.accentColor}40` }}>
            {workExperiences.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Timeline Dot Badge */}
                <div 
                  className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-white ring-2 ring-slate-200 shadow-sm"
                  style={{ backgroundColor: theme.accentColor }}
                ></div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition">
                  <div className="flex flex-wrap justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900 text-base">{exp.jobTitle}</h3>
                    <span 
                      className="text-xs font-mono font-bold text-white px-2.5 py-0.5 rounded-full"
                      style={{ backgroundColor: theme.accentColor }}
                    >
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-600 mb-2">
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
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grid Skills & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {skillCategories.length > 0 && (
          <section className={`resume-section ${spacing.sectionGap}`}>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3">Skills & Capabilities</h2>
            <div className="space-y-2">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="font-bold text-xs text-slate-900 mb-1">{cat.category}</div>
                  <div className="text-xs text-slate-600">{cat.items.join(', ')}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className={`resume-section ${spacing.sectionGap}`}>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3">Education</h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="font-bold text-xs text-slate-900">{edu.degree}</div>
                  <div className="text-xs text-slate-600">{edu.institution}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
