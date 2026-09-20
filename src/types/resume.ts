export type TemplateId = 
  | 'minimal' 
  | 'modern' 
  | 'classic' 
  | 'compact' 
  | 'creative'
  | 'technical'
  | 'executive-pro'
  | 'infographic'
  | 'editorial'
  | 'bold-headline'
  | 'timeline'
  | 'academic'
  | 'startup';
export type FontFamily = 'inter' | 'merriweather' | 'playfair' | 'outfit' | 'jakarta';
export type FontSize = 'sm' | 'md' | 'lg';
export type SpacingSize = 'compact' | 'normal' | 'spacious';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedIn: string;
  github: string;
  photoUrl: string;
  showPhoto: boolean;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  gpa: string;
  highlights: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Language {
  id: string;
  language: string;
  proficiency: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export type SectionType = 
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'custom';

export interface SectionConfig {
  id: SectionType;
  name: string;
  enabled: boolean;
}

export interface ResumeTheme {
  template: TemplateId;
  accentColor: string;
  fontFamily: FontFamily;
  fontSize: FontSize;
  spacing: SpacingSize;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperiences: WorkExperience[];
  education: Education[];
  skillCategories: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  customSections: CustomSection[];
  sections: SectionConfig[];
  theme: ResumeTheme;
}
