import React from 'react';
import { ResumeData } from '../../../types/resume';
import { FONT_FAMILY_MAP, FONT_SIZE_CLASSES, SPACING_CLASSES } from '../../../utils/theme';

interface Props {
  data: ResumeData;
}

export const AcademicTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, workExperiences, education, skillCategories, projects, certifications, customSections, theme } = data;

  const fontStyle = { fontFamily: FONT_FAMILY_MAP[theme.fontFamily] || FONT_FAMILY_MAP.merriweather };
  const size = FONT_SIZE_CLASSES[theme.fontSize] || FONT_SIZE_CLASSES.md;
  const spacing = SPACING_CLASSES[theme.spacing] || SPACING_CLASSES.normal;

  const contactItems = [
    personalInfo.location,
    personalInfo.phone,
    personalInfo.email,
    personalInfo.website,
    personalInfo.linkedIn
  ].filter(Boolean);

  return (
    <div 
      className={`bg-white text-gray-900 ${spacing.padding} shadow-lg print:shadow-none min-h-[1056px] w-full box-border font-serif`}
      style={fontStyle}
    >
      {/* Academic Header */}
      <header className="text-center mb-6 pb-4 border-b-2 border-gray-900">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 uppercase">
          {personalInfo.fullName || 'Academic Researcher'}
        </h1>
        {personalInfo.jobTitle && (
          <div className="text-xs font-sans tracking-widest font-semibold text-gray-700 uppercase mt-1">
            {personalInfo.jobTitle}
          </div>
        )}
        {contactItems.length > 0 && (
          <div className="text-xs font-sans text-gray-600 mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1">
            {contactItems.map((item, idx) => (
              <span key={idx}>
                {idx > 0 && <span className="mr-3 text-gray-400">•</span>}
                {item}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Abstract / Research Statement */}
      {summary && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <h2 className="text-xs uppercase font-sans tracking-widest font-bold mb-2 pb-0.5 border-b border-gray-400">
            Research Overview & Academic Profile
          </h2>
          <p className={`${size.body} text-gray-800 leading-relaxed text-justify`}>{summary}</p>
        </section>
      )}

      {/* Education First for Academic CV */}
      {education.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <h2 className="text-xs uppercase font-sans tracking-widest font-bold mb-3 pb-0.5 border-b border-gray-400">
            Education & Academic Background
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline font-bold text-gray-900 text-sm">
                  <span>{edu.degree}</span>
                  <span className="text-xs font-sans font-normal text-gray-600">
                    {edu.startDate} – {edu.isCurrent ? 'Present' : edu.endDate}
                  </span>
                </div>
                <div className="text-xs italic text-gray-700">
                  {edu.institution} {edu.location && `, ${edu.location}`}
                </div>
                {edu.highlights && <div className="text-xs font-sans text-gray-700 mt-1">{edu.highlights}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Academic & Teaching Appointments */}
      {workExperiences.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <h2 className="text-xs uppercase font-sans tracking-widest font-bold mb-3 pb-0.5 border-b border-gray-400">
            Academic Appointments & Experience
          </h2>
          <div className="space-y-4">
            {workExperiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-gray-900 text-sm">
                  <span>{exp.jobTitle}</span>
                  <span className="text-xs font-sans font-normal text-gray-600">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs italic text-gray-700 mb-1">{exp.company} {exp.location && `— ${exp.location}`}</div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc ml-5 space-y-1 text-gray-800 text-xs">
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

      {/* Publications / Projects */}
      {projects.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <h2 className="text-xs uppercase font-sans tracking-widest font-bold mb-3 pb-0.5 border-b border-gray-400">
            Publications, Grants & Projects
          </h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="font-bold text-gray-900 text-xs">{proj.name}</div>
                <div className="text-xs text-gray-700 font-sans">{proj.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Methodologies & Technical Competencies */}
      {skillCategories.length > 0 && (
        <section className={`resume-section ${spacing.sectionGap}`}>
          <h2 className="text-xs uppercase font-sans tracking-widest font-bold mb-2 pb-0.5 border-b border-gray-400">
            Methodologies & Technical Competencies
          </h2>
          <div className="space-y-1 text-xs text-gray-800 font-sans">
            {skillCategories.map((cat) => (
              <div key={cat.id}>
                <span className="font-bold mr-2">{cat.category}:</span>
                <span>{cat.items.join('; ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
