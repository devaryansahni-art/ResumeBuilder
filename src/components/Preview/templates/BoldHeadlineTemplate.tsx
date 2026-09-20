import React from 'react';
import { ResumeData } from '../../../types/resume';
import { FONT_FAMILY_MAP, FONT_SIZE_CLASSES, SPACING_CLASSES } from '../../../utils/theme';

interface Props {
  data: ResumeData;
}

export const BoldHeadlineTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, workExperiences, education, skillCategories, projects, theme } = data;

  const fontStyle = { fontFamily: FONT_FAMILY_MAP[theme.fontFamily] || FONT_FAMILY_MAP.outfit };
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
      {/* High-Impact Oversized Header */}
      <header className="mb-8 border-b-4 border-slate-900 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 
              className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-none text-slate-900"
              style={{ color: theme.accentColor || '#0f172a' }}
            >
              {personalInfo.fullName || 'FULL NAME'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-lg font-bold text-slate-700 tracking-wider uppercase mt-2">
                {personalInfo.jobTitle}
              </p>
            )}
          </div>
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <img 
              src={personalInfo.photoUrl} 
              alt={personalInfo.fullName} 
              className="w-20 h-20 rounded-xl object-cover ring-2 ring-slate-900 shadow-xl"
            />
          )}
        </div>

        {contactItems.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-700">
            {contactItems.map((item, idx) => (
              <span key={idx} className="bg-slate-100 border-2 border-slate-900 px-2.5 py-1 rounded-md">
                {item}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Summary */}
      {summary && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md">
            <h2 className="text-xs font-black uppercase tracking-widest text-indigo-300 mb-1">
              Executive Profile
            </h2>
            <p className={`${size.body} leading-relaxed text-slate-200`}>{summary}</p>
          </div>
        </section>
      )}

      {/* Main Grid Experience & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column (2/3 width) - Experience */}
        <div className="md:col-span-2 space-y-6">
          {workExperiences.length > 0 && (
            <section className={`resume-section ${spacing.sectionGap}`}>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-1 mb-3">
                Experience
              </h2>
              <div className="space-y-4">
                {workExperiences.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-slate-900 pl-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900 text-base">{exp.jobTitle}</h3>
                      <span className="text-[11px] font-bold bg-slate-200 px-2 py-0.5 rounded">
                        {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-600 mb-2">{exp.company} {exp.location && `• ${exp.location}`}</div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="list-disc ml-4 space-y-1 text-xs text-slate-800">
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

          {projects.length > 0 && (
            <section className={`resume-section ${spacing.sectionGap}`}>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-1 mb-3">
                Featured Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-slate-50 p-3 rounded-lg border border-slate-300">
                    <div className="font-bold text-xs text-slate-900">{proj.name}</div>
                    <div className="text-xs text-slate-700">{proj.description}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (1/3 width) - Skills & Education */}
        <div className="space-y-6">
          {skillCategories.length > 0 && (
            <section className={`resume-section ${spacing.sectionGap}`}>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-1 mb-3">
                Skills
              </h2>
              <div className="space-y-3">
                {skillCategories.map((cat) => (
                  <div key={cat.id}>
                    <div className="text-xs font-bold text-slate-900 uppercase mb-1">{cat.category}</div>
                    <div className="flex flex-wrap gap-1">
                      {cat.items.map((item, idx) => (
                        <span key={idx} className="text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-300 px-2 py-0.5 rounded">
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
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-1 mb-3">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-slate-50 p-3 rounded-lg border border-slate-300">
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
    </div>
  );
};
