import React from 'react';
import { ResumeData } from '../../../types/resume';
import { FONT_FAMILY_MAP, FONT_SIZE_CLASSES, SPACING_CLASSES } from '../../../utils/theme';

interface Props {
  data: ResumeData;
}

export const ExecutiveProTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, workExperiences, education, skillCategories, projects, certifications, theme } = data;

  const fontStyle = { fontFamily: FONT_FAMILY_MAP[theme.fontFamily] || FONT_FAMILY_MAP.playfair };
  const size = FONT_SIZE_CLASSES[theme.fontSize] || FONT_SIZE_CLASSES.md;
  const spacing = SPACING_CLASSES[theme.spacing] || SPACING_CLASSES.normal;

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedIn,
    personalInfo.website
  ].filter(Boolean);

  return (
    <div 
      className={`bg-slate-50 text-slate-900 ${spacing.padding} shadow-lg print:shadow-none min-h-[1056px] w-full box-border`}
      style={fontStyle}
    >
      {/* Full Bleed Top Banner Header */}
      <header 
        className="p-8 -mx-8 -mt-8 mb-8 text-white shadow-xl relative overflow-hidden"
        style={{ backgroundColor: theme.accentColor || '#1e293b' }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-extrabold tracking-wider uppercase font-serif">
              {personalInfo.fullName || 'Executive Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-base text-amber-200 tracking-widest font-semibold uppercase mt-1">
                {personalInfo.jobTitle}
              </p>
            )}
            
            {contactItems.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1.5 text-xs text-slate-200 font-sans">
                {contactItems.map((item, idx) => (
                  <span key={idx} className="flex items-center gap-1 opacity-90">
                    {idx > 0 && <span className="opacity-40 mr-1">•</span>}
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
              className="w-24 h-24 rounded-full border-4 border-amber-300/40 object-cover shadow-2xl shrink-0"
            />
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 font-serif whitespace-nowrap">
              Executive Profile
            </h2>
            <div className="h-0.5 w-full bg-slate-300" style={{ backgroundColor: `${theme.accentColor}40` }}></div>
          </div>
          <p className={`${size.body} text-slate-700 leading-relaxed font-sans text-justify font-serif italic`}>
            "{summary}"
          </p>
        </section>
      )}

      {/* Leadership Experience */}
      {workExperiences.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 font-serif whitespace-nowrap">
              Leadership & Career Record
            </h2>
            <div className="h-0.5 w-full bg-slate-300" style={{ backgroundColor: `${theme.accentColor}40` }}></div>
          </div>
          <div className="space-y-5 font-sans">
            {workExperiences.map((exp) => (
              <div key={exp.id} className="relative border-l-2 pl-4 ml-1" style={{ borderColor: theme.accentColor }}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-slate-900 text-base font-serif">{exp.jobTitle}</h3>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-200 px-2 py-0.5 rounded font-mono">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
                  {exp.company} {exp.location && `| ${exp.location}`}
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc ml-4 space-y-1 text-slate-700 text-xs">
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

      {/* Core Competencies Grid */}
      {skillCategories.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 font-serif whitespace-nowrap">
              Core Competencies
            </h2>
            <div className="h-0.5 w-full bg-slate-300" style={{ backgroundColor: `${theme.accentColor}40` }}></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="bg-slate-100 p-3 rounded border border-slate-200">
                <div className="text-xs font-bold text-slate-900 font-serif uppercase tracking-wider mb-1">
                  {cat.category}
                </div>
                <div className="text-xs text-slate-700 leading-snug">
                  {cat.items.join(' • ')}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 font-serif whitespace-nowrap">
              Education & Credentials
            </h2>
            <div className="h-0.5 w-full bg-slate-300" style={{ backgroundColor: `${theme.accentColor}40` }}></div>
          </div>
          <div className="space-y-3 font-sans">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-slate-900 text-xs font-serif">{edu.degree}</div>
                  <div className="text-xs text-slate-600">{edu.institution} {edu.location && `• ${edu.location}`}</div>
                </div>
                <div className="text-xs font-mono text-slate-500">{edu.startDate} – {edu.isCurrent ? 'Present' : edu.endDate}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
