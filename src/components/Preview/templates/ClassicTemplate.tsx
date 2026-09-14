import React from 'react';
import { ResumeData } from '../../../types/resume';
import { FONT_FAMILY_MAP, FONT_SIZE_CLASSES, SPACING_CLASSES } from '../../../utils/theme';

interface Props {
  data: ResumeData;
}

export const ClassicTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, workExperiences, education, skillCategories, projects, certifications, languages, sections, theme } = data;
  
  // Default to Merriweather or Playfair for Classic Executive feel
  const fontStyle = { fontFamily: FONT_FAMILY_MAP[theme.fontFamily] || FONT_FAMILY_MAP.merriweather };
  const size = FONT_SIZE_CLASSES[theme.fontSize] || FONT_SIZE_CLASSES.md;
  const spacing = SPACING_CLASSES[theme.spacing] || SPACING_CLASSES.normal;

  const contactItems = [
    personalInfo.location,
    personalInfo.phone,
    personalInfo.email,
    personalInfo.website ? personalInfo.website.replace(/^https?:\/\//, '') : '',
    personalInfo.linkedIn,
    personalInfo.github,
  ].filter(Boolean);

  return (
    <div 
      className={`bg-white text-gray-900 ${spacing.padding} shadow-lg print:shadow-none min-h-[1056px] w-full box-border`}
      style={fontStyle}
    >
      {/* Centered Classic Header */}
      <header className="text-center mb-6 border-b-2 pb-4" style={{ borderColor: theme.accentColor }}>
        <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-wide uppercase">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <div className="text-sm font-semibold tracking-widest uppercase text-gray-600 mt-1">
            {personalInfo.jobTitle}
          </div>
        )}
        {contactItems.length > 0 && (
          <div className="text-xs text-gray-600 mt-2 flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
            {contactItems.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-gray-400">•</span>}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </header>

      {/* Summary */}
      {summary && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <h2 
            className="text-sm uppercase font-serif tracking-wider font-bold mb-2 pb-0.5 border-b text-gray-900"
            style={{ borderColor: `${theme.accentColor}60` }}
          >
            Executive Summary
          </h2>
          <p className={`${size.body} text-gray-800 text-justify leading-relaxed`}>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {workExperiences.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <h2 
            className="text-sm uppercase font-serif tracking-wider font-bold mb-3 pb-0.5 border-b text-gray-900"
            style={{ borderColor: `${theme.accentColor}60` }}
          >
            Professional Experience
          </h2>
          <div className="space-y-4">
            {workExperiences.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline font-bold text-gray-900">
                  <span>{exp.jobTitle}</span>
                  <span className="text-xs font-normal text-gray-600">
                    {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between text-xs italic text-gray-700 mb-1">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-5 space-y-1 text-gray-800">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className={size.body}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <h2 
            className="text-sm uppercase font-serif tracking-wider font-bold mb-3 pb-0.5 border-b text-gray-900"
            style={{ borderColor: `${theme.accentColor}60` }}
          >
            Education & Academic Background
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline font-bold text-gray-900">
                  <span>{edu.degree}</span>
                  <span className="text-xs font-normal text-gray-600">
                    {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Present' : edu.endDate}
                  </span>
                </div>
                <div className="flex justify-between text-xs italic text-gray-700">
                  <span>{edu.institution}</span>
                  <span>{edu.location}</span>
                </div>
                {edu.gpa && <div className="text-xs text-gray-700 mt-0.5">Honors/GPA: {edu.gpa}</div>}
                {edu.highlights && <div className="text-xs text-gray-600 mt-0.5">{edu.highlights}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skillCategories.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <h2 
            className="text-sm uppercase font-serif tracking-wider font-bold mb-2 pb-0.5 border-b text-gray-900"
            style={{ borderColor: `${theme.accentColor}60` }}
          >
            Core Competencies & Skills
          </h2>
          <div className="space-y-1.5 text-xs text-gray-800">
            {skillCategories.map((cat) => (
              <div key={cat.id}>
                {cat.category && <span className="font-bold mr-2">{cat.category}:</span>}
                <span>{cat.items.join(' • ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <h2 
            className="text-sm uppercase font-serif tracking-wider font-bold mb-3 pb-0.5 border-b text-gray-900"
            style={{ borderColor: `${theme.accentColor}60` }}
          >
            Key Projects
          </h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id} className="break-inside-avoid">
                <div className="font-bold text-gray-900 text-xs">{proj.name}</div>
                {proj.description && <p className={`${size.body} text-gray-700`}>{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
