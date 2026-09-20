import React from 'react';
import { ResumeData } from '../../../types/resume';
import { FONT_FAMILY_MAP, FONT_SIZE_CLASSES, SPACING_CLASSES } from '../../../utils/theme';

interface Props {
  data: ResumeData;
}

export const EditorialTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, workExperiences, education, skillCategories, projects, theme } = data;

  const fontStyle = { fontFamily: FONT_FAMILY_MAP[theme.fontFamily] || FONT_FAMILY_MAP.playfair };
  const size = FONT_SIZE_CLASSES[theme.fontSize] || FONT_SIZE_CLASSES.md;
  const spacing = SPACING_CLASSES[theme.spacing] || SPACING_CLASSES.spacious;

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedIn,
    personalInfo.website
  ].filter(Boolean);

  return (
    <div 
      className={`bg-stone-50 text-stone-900 ${spacing.padding} shadow-lg print:shadow-none min-h-[1056px] w-full box-border font-serif`}
      style={fontStyle}
    >
      {/* Editorial Header */}
      <header className="mb-8 pb-6 border-b border-stone-300">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] font-sans text-stone-500 mb-2">
            Curriculum Vitae
          </p>
          <h1 className="text-4xl font-normal text-stone-900 tracking-tight font-serif italic mb-1">
            {personalInfo.fullName || 'Candidate Name'}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-sm font-sans uppercase tracking-[0.2em] font-semibold text-stone-600 mt-2">
              {personalInfo.jobTitle}
            </p>
          )}

          {contactItems.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-stone-600 font-sans tracking-wide">
              {contactItems.map((item, idx) => (
                <span key={idx} className="flex items-center gap-2">
                  {idx > 0 && <span className="text-stone-300">/</span>}
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Editorial Summary */}
      {summary && (
        <section className={`resume-section ${spacing.sectionGap} max-w-3xl mx-auto text-center`}>
          <p className={`${size.body} text-stone-700 leading-relaxed italic text-base border-l-2 pl-4 border-stone-400 text-left`} style={{ borderColor: theme.accentColor }}>
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {workExperiences.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap} mt-8`}>
          <div className="flex items-center justify-between mb-4 pb-1 border-b border-stone-300">
            <h2 className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-stone-800">
              Professional Experience
            </h2>
            <span className="text-[10px] text-stone-400 font-sans italic">Chronological Order</span>
          </div>

          <div className="space-y-6">
            {workExperiences.map((exp) => (
              <div key={exp.id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1 text-xs font-sans text-stone-500 font-semibold tracking-wider">
                  <div>{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</div>
                  <div className="text-stone-400 font-normal mt-0.5">{exp.location}</div>
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-serif text-base font-bold text-stone-900">{exp.jobTitle}</h3>
                  <div className="text-xs font-sans font-semibold text-stone-600 uppercase tracking-widest mb-2" style={{ color: theme.accentColor }}>
                    {exp.company}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc ml-4 space-y-1.5 text-xs text-stone-700 font-sans leading-relaxed">
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

      {/* Core Competencies & Education Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {skillCategories.length > 0 && (
          <section className={`resume-section ${spacing.sectionGap}`}>
            <h2 className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-stone-800 mb-3 pb-1 border-b border-stone-300">
              Expertise & Skills
            </h2>
            <div className="space-y-3 font-sans text-xs">
              {skillCategories.map((cat) => (
                <div key={cat.id}>
                  <div className="font-bold text-stone-900 mb-1">{cat.category}</div>
                  <div className="text-stone-600 leading-relaxed">{cat.items.join(' • ')}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className={`resume-section ${spacing.sectionGap}`}>
            <h2 className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-stone-800 mb-3 pb-1 border-b border-stone-300">
              Education & Honors
            </h2>
            <div className="space-y-4 font-sans text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-stone-900 text-sm font-serif">{edu.degree}</div>
                  <div className="text-stone-600">{edu.institution} {edu.location && `(${edu.location})`}</div>
                  <div className="text-stone-400 font-mono text-[10px] mt-0.5">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
