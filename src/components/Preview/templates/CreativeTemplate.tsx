import React from 'react';
import { ResumeData } from '../../../types/resume';
import { FONT_FAMILY_MAP, FONT_SIZE_CLASSES, SPACING_CLASSES } from '../../../utils/theme';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedInIcon } from '../../Icons';

interface Props {
  data: ResumeData;
}

export const CreativeTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, workExperiences, education, skillCategories, projects, certifications, languages, theme } = data;
  const fontStyle = { fontFamily: FONT_FAMILY_MAP[theme.fontFamily] || FONT_FAMILY_MAP.outfit };
  const size = FONT_SIZE_CLASSES[theme.fontSize] || FONT_SIZE_CLASSES.md;
  const spacing = SPACING_CLASSES[theme.spacing] || SPACING_CLASSES.normal;

  return (
    <div 
      className="bg-white text-gray-900 shadow-lg print:shadow-none min-h-[1056px] w-full box-border flex flex-col"
      style={fontStyle}
    >
      {/* Creative Header Banner */}
      <header 
        className="p-8 text-white relative overflow-hidden"
        style={{ backgroundColor: theme.accentColor }}
      >
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-lg font-medium text-white/90 mt-1 tracking-wide">
              {personalInfo.jobTitle}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/90 mt-4 font-medium">
            {personalInfo.email && (
              <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
                <Mail className="w-3.5 h-3.5" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
                <Phone className="w-3.5 h-3.5" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5" />
                {personalInfo.location}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
                <Globe className="w-3.5 h-3.5" />
                {personalInfo.website.replace(/^https?:\/\//, '')}
              </span>
            )}
            {personalInfo.linkedIn && (
              <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
                <LinkedInIcon className="w-3.5 h-3.5" />
                {personalInfo.linkedIn}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Body Content */}
      <div className={`p-8 space-y-6 ${spacing.padding}`}>
        {/* Summary */}
        {summary && (
          <section className="break-inside-avoid">
            <div className="flex items-center gap-2 mb-2">
              <span 
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: theme.accentColor }}
              />
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-gray-900">
                About Me
              </h2>
            </div>
            <p className={`${size.body} text-gray-700 leading-relaxed bg-gray-50/80 p-4 rounded-lg border border-gray-100`}>
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {workExperiences.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span 
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: theme.accentColor }}
              />
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-gray-900">
                Career History
              </h2>
            </div>
            <div className="space-y-4 border-l-2 pl-4 ml-1" style={{ borderColor: `${theme.accentColor}30` }}>
              {workExperiences.map((exp) => (
                <div key={exp.id} className="relative break-inside-avoid">
                  <div 
                    className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 bg-white"
                    style={{ borderColor: theme.accentColor }}
                  />
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-sm">{exp.jobTitle}</h3>
                    <span 
                      className="text-[11px] font-semibold px-2 py-0.5 rounded text-white"
                      style={{ backgroundColor: theme.accentColor }}
                    >
                      {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-gray-600 mb-1">
                    {exp.company} {exp.location ? `• ${exp.location}` : ''}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 mt-1">
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

        {/* Skills Matrix */}
        {skillCategories.length > 0 && (
          <section className="break-inside-avoid">
            <div className="flex items-center gap-2 mb-3">
              <span 
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: theme.accentColor }}
              />
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-gray-900">
                Expertise & Tools
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="font-bold text-xs text-gray-900 mb-1.5" style={{ color: theme.accentColor }}>
                    {cat.category}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((item, idx) => (
                      <span 
                        key={idx}
                        className="bg-white text-gray-800 px-2 py-0.5 rounded text-[11px] font-medium border border-gray-200 shadow-2xs"
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

        {/* Education & Certifications Row */}
        <div className="grid grid-cols-2 gap-6">
          {education.length > 0 && (
            <section className="break-inside-avoid">
              <div className="flex items-center gap-2 mb-2">
                <span 
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: theme.accentColor }}
                />
                <h2 className="text-xs uppercase font-extrabold tracking-widest text-gray-900">
                  Education
                </h2>
              </div>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="font-bold text-xs text-gray-900">{edu.degree}</div>
                    <div className="text-xs text-gray-600">{edu.institution}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{edu.endDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section className="break-inside-avoid">
              <div className="flex items-center gap-2 mb-2">
                <span 
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: theme.accentColor }}
                />
                <h2 className="text-xs uppercase font-extrabold tracking-widest text-gray-900">
                  Certifications
                </h2>
              </div>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="font-bold text-xs text-gray-900">{cert.name}</div>
                    <div className="text-xs text-gray-600">{cert.issuer}</div>
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
