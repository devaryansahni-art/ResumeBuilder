import React from 'react';
import { ResumeData } from '../../../types/resume';
import { FONT_FAMILY_MAP, FONT_SIZE_CLASSES, SPACING_CLASSES } from '../../../utils/theme';
import { Mail, Phone, MapPin, Globe, Award, BookOpen, Layers } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '../../Icons';

interface Props {
  data: ResumeData;
}

export const ModernSidebarTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, summary, workExperiences, education, skillCategories, projects, certifications, languages, theme } = data;
  const fontStyle = { fontFamily: FONT_FAMILY_MAP[theme.fontFamily] || FONT_FAMILY_MAP.inter };
  const size = FONT_SIZE_CLASSES[theme.fontSize] || FONT_SIZE_CLASSES.md;

  return (
    <div 
      className="bg-white text-gray-900 shadow-lg print:shadow-none min-h-[1056px] w-full flex box-border overflow-hidden"
      style={fontStyle}
    >
      {/* Left Sidebar */}
      <aside 
        className="w-[34%] text-white p-6 flex flex-col gap-6 shrink-0 print:bg-slate-900 print:text-white"
        style={{ backgroundColor: theme.accentColor }}
      >
        {/* Contact Info */}
        <div>
          <h3 className="text-xs uppercase tracking-wider font-bold mb-3 border-b border-white/30 pb-1">
            Contact
          </h3>
          <div className="space-y-2.5 text-xs text-white/90">
            {personalInfo.email && (
              <div className="flex items-start gap-2 break-all">
                <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-80" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2 break-all">
                <Globe className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
            {personalInfo.linkedIn && (
              <div className="flex items-center gap-2 break-all">
                <LinkedInIcon className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>{personalInfo.linkedIn}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2 break-all">
                <GitHubIcon className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>{personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills in Sidebar */}
        {skillCategories.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold mb-3 border-b border-white/30 pb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 opacity-80" />
              Skills
            </h3>
            <div className="space-y-3 text-xs text-white/90">
              {skillCategories.map((cat) => (
                <div key={cat.id}>
                  {cat.category && <div className="font-semibold text-white/95 mb-1">{cat.category}</div>}
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((item, idx) => (
                      <span 
                        key={idx} 
                        className="bg-white/15 px-2 py-0.5 rounded text-[11px] font-medium backdrop-blur-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education in Sidebar */}
        {education.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold mb-3 border-b border-white/30 pb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 opacity-80" />
              Education
            </h3>
            <div className="space-y-3 text-xs text-white/90">
              {education.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <div className="font-bold text-white">{edu.degree}</div>
                  <div className="text-white/80">{edu.institution}</div>
                  <div className="text-[11px] text-white/60 mt-0.5">
                    {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Present' : edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications in Sidebar */}
        {certifications.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold mb-3 border-b border-white/30 pb-1 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 opacity-80" />
              Certifications
            </h3>
            <div className="space-y-2 text-xs text-white/90">
              {certifications.map((cert) => (
                <div key={cert.id} className="break-inside-avoid">
                  <div className="font-semibold text-white">{cert.name}</div>
                  {cert.issuer && <div className="text-white/70 text-[11px]">{cert.issuer}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold mb-3 border-b border-white/30 pb-1">
              Languages
            </h3>
            <div className="space-y-1 text-xs text-white/90">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span className="font-medium text-white">{lang.language}</span>
                  <span className="text-white/70 text-[11px]">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Right Content */}
      <main className="w-[66%] p-8 flex flex-col gap-6">
        {/* Name Header */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900" style={{ color: theme.accentColor }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-base font-semibold text-gray-600 mt-1 uppercase tracking-wider">
              {personalInfo.jobTitle}
            </p>
          )}
        </div>

        {/* Professional Summary */}
        {summary && (
          <section className="break-inside-avoid">
            <h2 
              className="text-xs uppercase tracking-widest font-bold mb-2 pb-1 border-b"
              style={{ color: theme.accentColor, borderColor: `${theme.accentColor}30` }}
            >
              Profile
            </h2>
            <p className={`${size.body} text-gray-700 leading-relaxed`}>{summary}</p>
          </section>
        )}

        {/* Experience */}
        {workExperiences.length > 0 && (
          <section>
            <h2 
              className="text-xs uppercase tracking-widest font-bold mb-3 pb-1 border-b"
              style={{ color: theme.accentColor, borderColor: `${theme.accentColor}30` }}
            >
              Work Experience
            </h2>
            <div className="space-y-4">
              {workExperiences.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <div className="font-bold text-gray-900 text-sm">
                      {exp.jobTitle} <span className="text-gray-500 font-normal">| {exp.company}</span>
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  {exp.location && <div className="text-xs text-gray-400 mb-1">{exp.location}</div>}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700">
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

        {/* Featured Projects */}
        {projects.length > 0 && (
          <section>
            <h2 
              className="text-xs uppercase tracking-widest font-bold mb-3 pb-1 border-b"
              style={{ color: theme.accentColor, borderColor: `${theme.accentColor}30` }}
            >
              Key Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-gray-900 text-sm">{proj.name}</span>
                    {proj.link && <span className="text-xs text-blue-600 font-mono">{proj.link}</span>}
                  </div>
                  {proj.description && <p className={`${size.body} text-gray-700 mt-0.5`}>{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
