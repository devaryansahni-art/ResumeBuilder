import React from 'react';
import { ResumeData } from '../../../types/resume';
import { FONT_FAMILY_MAP, FONT_SIZE_CLASSES, SPACING_CLASSES } from '../../../utils/theme';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '../../Icons';

interface Props {
  data: ResumeData;
}

export const MinimalTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, workExperiences, education, skillCategories, projects, certifications, languages, sections, theme } = data;
  const fontStyle = { fontFamily: FONT_FAMILY_MAP[theme.fontFamily] || FONT_FAMILY_MAP.inter };
  const size = FONT_SIZE_CLASSES[theme.fontSize] || FONT_SIZE_CLASSES.md;
  const spacing = SPACING_CLASSES[theme.spacing] || SPACING_CLASSES.normal;

  const renderSection = (sectionId: string) => {
    const secConfig = sections.find((s) => s.id === sectionId);
    if (!secConfig || !secConfig.enabled) return null;

    switch (sectionId) {
      case 'summary':
        if (!summary) return null;
        return (
          <section key="summary" className={`resume-section ${spacing.sectionGap}`}>
            <h2 
              className="text-xs uppercase tracking-widest font-bold mb-2 pb-1 border-b"
              style={{ color: theme.accentColor, borderColor: `${theme.accentColor}40` }}
            >
              Professional Summary
            </h2>
            <p className={`${size.body} text-gray-700 whitespace-pre-line`}>{summary}</p>
          </section>
        );

      case 'experience':
        if (!workExperiences.length) return null;
        return (
          <section key="experience" className={`resume-section ${spacing.sectionGap}`}>
            <h2 
              className="text-xs uppercase tracking-widest font-bold mb-3 pb-1 border-b"
              style={{ color: theme.accentColor, borderColor: `${theme.accentColor}40` }}
            >
              Work Experience
            </h2>
            <div className="space-y-4">
              {workExperiences.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <span className="font-bold text-gray-900">{exp.jobTitle}</span>
                      {exp.company && <span className="text-gray-600 font-medium"> — {exp.company}</span>}
                      {exp.location && <span className="text-gray-400 text-xs ml-2">({exp.location})</span>}
                    </div>
                    <div className="text-xs font-medium text-gray-500 shrink-0 ml-2">
                      {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 mt-1 text-gray-700">
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
        );

      case 'education':
        if (!education.length) return null;
        return (
          <section key="education" className={`resume-section ${spacing.sectionGap}`}>
            <h2 
              className="text-xs uppercase tracking-widest font-bold mb-3 pb-1 border-b"
              style={{ color: theme.accentColor, borderColor: `${theme.accentColor}40` }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="font-bold text-gray-900">{edu.degree}</span>
                      {edu.institution && <span className="text-gray-600 font-medium">, {edu.institution}</span>}
                      {edu.location && <span className="text-gray-400 text-xs ml-2">({edu.location})</span>}
                    </div>
                    <div className="text-xs font-medium text-gray-500 shrink-0 ml-2">
                      {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Present' : edu.endDate}
                    </div>
                  </div>
                  {edu.gpa && <div className="text-xs text-gray-600 mt-0.5 font-medium">GPA: {edu.gpa}</div>}
                  {edu.highlights && <p className={`mt-0.5 text-gray-600 ${size.sm}`}>{edu.highlights}</p>}
                </div>
              ))}
            </div>
          </section>
        );

      case 'skills':
        if (!skillCategories.length) return null;
        return (
          <section key="skills" className={`resume-section ${spacing.sectionGap}`}>
            <h2 
              className="text-xs uppercase tracking-widest font-bold mb-2 pb-1 border-b"
              style={{ color: theme.accentColor, borderColor: `${theme.accentColor}40` }}
            >
              Skills & Expertise
            </h2>
            <div className="space-y-2">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="text-xs leading-relaxed">
                  {cat.category && <span className="font-bold text-gray-900 mr-2">{cat.category}:</span>}
                  <span className="text-gray-700">{cat.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'projects':
        if (!projects.length) return null;
        return (
          <section key="projects" className={`resume-section ${spacing.sectionGap}`}>
            <h2 
              className="text-xs uppercase tracking-widest font-bold mb-3 pb-1 border-b"
              style={{ color: theme.accentColor, borderColor: `${theme.accentColor}40` }}
            >
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <div className="font-bold text-gray-900">
                      {proj.name}
                      {proj.link && (
                        <span className="text-xs font-normal text-blue-600 ml-2">({proj.link})</span>
                      )}
                    </div>
                    {(proj.startDate || proj.endDate) && (
                      <div className="text-xs text-gray-500">
                        {proj.startDate} {proj.startDate && proj.endDate ? '–' : ''} {proj.endDate}
                      </div>
                    )}
                  </div>
                  {proj.description && <p className={`${size.body} text-gray-700 mt-1`}>{proj.description}</p>}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="text-xs text-gray-500 mt-1 font-mono">
                      Tech: {proj.technologies.join(' • ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case 'certifications':
        if (!certifications.length) return null;
        return (
          <section key="certifications" className={`resume-section ${spacing.sectionGap}`}>
            <h2 
              className="text-xs uppercase tracking-widest font-bold mb-2 pb-1 border-b"
              style={{ color: theme.accentColor, borderColor: `${theme.accentColor}40` }}
            >
              Certifications
            </h2>
            <div className="space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between text-xs break-inside-avoid">
                  <div>
                    <span className="font-bold text-gray-900">{cert.name}</span>
                    {cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}
                  </div>
                  {cert.date && <span className="text-gray-500">{cert.date}</span>}
                </div>
              ))}
            </div>
          </section>
        );

      case 'languages':
        if (!languages.length) return null;
        return (
          <section key="languages" className={`resume-section ${spacing.sectionGap}`}>
            <h2 
              className="text-xs uppercase tracking-widest font-bold mb-2 pb-1 border-b"
              style={{ color: theme.accentColor, borderColor: `${theme.accentColor}40` }}
            >
              Languages
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs">
              {languages.map((lang) => (
                <div key={lang.id}>
                  <span className="font-bold text-gray-900">{lang.language}</span>
                  {lang.proficiency && <span className="text-gray-500 ml-1">({lang.proficiency})</span>}
                </div>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className={`bg-white text-gray-900 ${spacing.padding} shadow-lg print:shadow-none min-h-[1056px] w-full box-border`}
      style={fontStyle}
    >
      {/* Header */}
      <header className="mb-6 border-b pb-4" style={{ borderColor: `${theme.accentColor}30` }}>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900" style={{ color: theme.accentColor }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-base font-semibold text-gray-700 mt-0.5">{personalInfo.jobTitle}</p>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-600 mt-3">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-gray-400" />
              <a href={personalInfo.website} target="_blank" rel="noreferrer" className="hover:underline">
                {personalInfo.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          {personalInfo.linkedIn && (
            <div className="flex items-center gap-1">
              <LinkedInIcon className="w-3.5 h-3.5 text-gray-400" />
              <span>{personalInfo.linkedIn}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <GitHubIcon className="w-3.5 h-3.5 text-gray-400" />
              <span>{personalInfo.github}</span>
            </div>
          )}
        </div>
      </header>

      {/* Sections in dynamic user order */}
      {sections.map((sec) => renderSection(sec.id))}
    </div>
  );
};
