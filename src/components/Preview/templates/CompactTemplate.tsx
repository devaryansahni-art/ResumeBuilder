import React from 'react';
import { ResumeData } from '../../../types/resume';
import { FONT_FAMILY_MAP, FONT_SIZE_CLASSES } from '../../../utils/theme';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export const CompactTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, workExperiences, education, skillCategories, projects, certifications, languages, theme } = data;
  const fontStyle = { fontFamily: FONT_FAMILY_MAP[theme.fontFamily] || FONT_FAMILY_MAP.inter };
  const size = FONT_SIZE_CLASSES[theme.fontSize] || FONT_SIZE_CLASSES.sm;

  return (
    <div 
      className="bg-white text-gray-900 p-6 shadow-lg print:shadow-none min-h-[1056px] w-full box-border text-xs leading-tight"
      style={fontStyle}
    >
      {/* Dense Header */}
      <header className="flex justify-between items-start border-b pb-3 mb-3" style={{ borderColor: theme.accentColor }}>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900" style={{ color: theme.accentColor }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mt-0.5">
              {personalInfo.jobTitle}
            </p>
          )}
        </div>

        {/* Contact info array */}
        <div className="text-[11px] text-gray-600 space-y-0.5 text-right font-medium">
          <div className="flex items-center justify-end gap-2">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          </div>
          <div className="flex items-center justify-end gap-2">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.website && <span>• {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          </div>
          <div className="flex items-center justify-end gap-2">
            {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
            {personalInfo.github && <span>• {personalInfo.github}</span>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-3">
          <p className="text-[11px] text-gray-700 leading-snug">{summary}</p>
        </section>
      )}

      {/* Skills Grid - Badges */}
      {skillCategories.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[11px] uppercase font-black tracking-wider text-gray-900 border-b mb-1.5 pb-0.5" style={{ color: theme.accentColor }}>
            Skills & Competencies
          </h2>
          <div className="space-y-1">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="flex items-baseline gap-2">
                {cat.category && <span className="font-bold text-gray-900 shrink-0 w-28 text-[11px]">{cat.category}:</span>}
                <div className="flex flex-wrap gap-1">
                  {cat.items.map((item, idx) => (
                    <span 
                      key={idx} 
                      className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-[10px] font-medium border border-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {workExperiences.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[11px] uppercase font-black tracking-wider text-gray-900 border-b mb-2 pb-0.5" style={{ color: theme.accentColor }}>
            Work Experience
          </h2>
          <div className="space-y-2.5">
            {workExperiences.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-gray-900 text-xs">{exp.jobTitle}</span>
                    <span className="text-gray-600 font-semibold ml-1.5">@ {exp.company}</span>
                    {exp.location && <span className="text-gray-400 text-[10px] ml-1">({exp.location})</span>}
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500">
                    {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-3.5 space-y-0.5 mt-0.5 text-gray-700 text-[11px]">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-tight">
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

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[11px] uppercase font-black tracking-wider text-gray-900 border-b mb-1.5 pb-0.5" style={{ color: theme.accentColor }}>
            Projects
          </h2>
          <div className="space-y-1.5">
            {projects.map((proj) => (
              <div key={proj.id} className="break-inside-avoid">
                <div className="flex justify-between font-bold text-gray-900 text-[11px]">
                  <span>{proj.name}</span>
                  {proj.link && <span className="font-normal text-blue-600 font-mono text-[10px]">{proj.link}</span>}
                </div>
                {proj.description && <p className="text-[10px] text-gray-600 leading-snug">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certifications 2-Column Row */}
      <div className="grid grid-cols-2 gap-4">
        {education.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-[11px] uppercase font-black tracking-wider text-gray-900 border-b mb-1.5 pb-0.5" style={{ color: theme.accentColor }}>
              Education
            </h2>
            <div className="space-y-1 text-[11px]">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-gray-900">{edu.degree}</div>
                  <div className="text-gray-600 text-[10px]">{edu.institution} ({edu.endDate})</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-[11px] uppercase font-black tracking-wider text-gray-900 border-b mb-1.5 pb-0.5" style={{ color: theme.accentColor }}>
              Certifications
            </h2>
            <div className="space-y-1 text-[11px]">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="font-bold text-gray-900">{cert.name}</div>
                  <div className="text-gray-600 text-[10px]">{cert.issuer}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
