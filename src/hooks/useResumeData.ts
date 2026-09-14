import { useState, useEffect, useCallback } from 'react';
import { ResumeData, ResumeTheme, SectionConfig } from '../types/resume';
import { 
  SAMPLE_RESUME_SOFTWARE_ENGINEER, 
  SAMPLE_RESUME_PRODUCT_MANAGER, 
  SAMPLE_RESUME_CREATIVE, 
  SAMPLE_RESUME_EXECUTIVE, 
  EMPTY_RESUME 
} from '../data/sampleData';

const LOCAL_STORAGE_KEY = 'craftcv_resume_data_v1';

export function useResumeData() {
  const [resume, setResume] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Basic fallback checks for data compatibility
        return {
          ...SAMPLE_RESUME_SOFTWARE_ENGINEER,
          ...parsed,
          personalInfo: { ...SAMPLE_RESUME_SOFTWARE_ENGINEER.personalInfo, ...parsed.personalInfo },
          theme: { ...SAMPLE_RESUME_SOFTWARE_ENGINEER.theme, ...parsed.theme },
        };
      }
    } catch (e) {
      console.error('Failed to load resume data from localStorage:', e);
    }
    return SAMPLE_RESUME_SOFTWARE_ENGINEER;
  });

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resume));
    } catch (e) {
      console.error('Failed to save resume data to localStorage:', e);
    }
  }, [resume]);

  const updatePersonalInfo = useCallback((fields: Partial<ResumeData['personalInfo']>) => {
    setResume((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...fields },
    }));
  }, []);

  const updateSummary = useCallback((summary: string) => {
    setResume((prev) => ({ ...prev, summary }));
  }, []);

  const updateTheme = useCallback((themeFields: Partial<ResumeTheme>) => {
    setResume((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...themeFields },
    }));
  }, []);

  const updateSectionOrder = useCallback((sections: SectionConfig[]) => {
    setResume((prev) => ({ ...prev, sections }));
  }, []);

  const toggleSectionVisibility = useCallback((sectionId: string) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.id === sectionId ? { ...sec, enabled: !sec.enabled } : sec
      ),
    }));
  }, []);

  // Generic updater for array sections (experience, education, skills, projects, etc.)
  const updateList = useCallback(<K extends keyof ResumeData>(key: K, newList: ResumeData[K]) => {
    setResume((prev) => ({ ...prev, [key]: newList }));
  }, []);

  const loadSample = useCallback((preset: 'engineer' | 'pm' | 'creative' | 'executive' | 'empty') => {
    if (preset === 'engineer') {
      setResume(SAMPLE_RESUME_SOFTWARE_ENGINEER);
    } else if (preset === 'pm') {
      setResume(SAMPLE_RESUME_PRODUCT_MANAGER);
    } else if (preset === 'creative') {
      setResume(SAMPLE_RESUME_CREATIVE);
    } else if (preset === 'executive') {
      setResume(SAMPLE_RESUME_EXECUTIVE);
    } else {
      setResume(EMPTY_RESUME);
    }
  }, []);

  const exportJSON = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement('a');
    const filename = `${(resume.personalInfo.fullName || 'resume').toLowerCase().replace(/\s+/g, '_')}_craftcv.json`;
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [resume]);

  const importJSON = useCallback((importedData: ResumeData) => {
    if (importedData && importedData.personalInfo) {
      setResume(importedData);
      return true;
    }
    return false;
  }, []);

  return {
    resume,
    setResume,
    updatePersonalInfo,
    updateSummary,
    updateTheme,
    updateSectionOrder,
    toggleSectionVisibility,
    updateList,
    loadSample,
    exportJSON,
    importJSON,
  };
}
