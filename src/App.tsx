import React, { useState } from 'react';
import { useResumeData } from './hooks/useResumeData';
import { Header } from './components/Header';
import { ResumePreview } from './components/Preview/ResumePreview';
import { PersonalInfoForm } from './components/Editor/PersonalInfoForm';
import { SummaryForm } from './components/Editor/SummaryForm';
import { WorkExperienceForm } from './components/Editor/WorkExperienceForm';
import { EducationForm } from './components/Editor/EducationForm';
import { SkillsForm } from './components/Editor/SkillsForm';
import { ProjectsForm } from './components/Editor/ProjectsForm';
import { CertificationsForm } from './components/Editor/CertificationsForm';
import { LanguagesForm } from './components/Editor/LanguagesForm';
import { SectionManager } from './components/Editor/SectionManager';
import { ThemePicker } from './components/Editor/ThemePicker';
import { LinkedInImportModal } from './components/Modals/LinkedInImportModal';
import { TemplateSelectionModal } from './components/Modals/TemplateSelectionModal';
import { AuthModal } from './components/AuthModal';
import { AuthPage } from './components/AuthPage';
import { MyResumesModal } from './components/MyResumesModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { TemplateId } from './types/resume';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderGit2, 
  Award, 
  Languages as LangIcon, 
  Layers, 
  Palette, 
  Eye, 
  Edit3
} from 'lucide-react';
import './styles/print.css';

type ActiveTab = 
  | 'personal' 
  | 'summary' 
  | 'experience' 
  | 'education' 
  | 'skills' 
  | 'projects' 
  | 'certs_lang' 
  | 'sections' 
  | 'theme';

function AppContent() {
  const { user, loading } = useAuth();
  const [isGuestMode, setIsGuestMode] = useState(false);

  const {
    resume,
    updatePersonalInfo,
    updateSummary,
    updateTheme,
    updateSectionOrder,
    toggleSectionVisibility,
    updateList,
    loadSample,
    exportJSON,
    importJSON,
  } = useResumeData();

  const [activeTab, setActiveTab] = useState<ActiveTab>('personal');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-4">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin mb-4" />
        <p className="text-xs font-mono text-slate-400">Loading CraftCV Suite...</p>
      </div>
    );
  }

  // If user is not logged in and hasn't chosen guest mode, show full page Login & Sign Up page
  if (!user && !isGuestMode) {
    return <AuthPage onContinueAsGuest={() => setIsGuestMode(true)} />;
  }

  const handlePrint = () => {
    window.print();
  };

  const handleApplyThemeAndPreset = (
    template: TemplateId, 
    accentColor: string, 
    preset: 'engineer' | 'pm' | 'creative' | 'executive' | 'empty'
  ) => {
    loadSample(preset);
    updateTheme({ template, accentColor });
  };

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'personal', label: 'Personal Info', icon: <User className="w-4 h-4" /> },
    { id: 'summary', label: 'Summary', icon: <FileText className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Wrench className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'certs_lang', label: 'Certs & Lang', icon: <Award className="w-4 h-4" /> },
    { id: 'sections', label: 'Reorder Sections', icon: <Layers className="w-4 h-4" /> },
    { id: 'theme', label: 'Template & Design', icon: <Palette className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Header Bar */}
      <Header
        onPrint={handlePrint}
        onLoadSample={loadSample}
        onExportJSON={exportJSON}
        onImportJSON={importJSON}
        onOpenLinkedInModal={() => setIsLinkedInModalOpen(true)}
        onOpenTemplateModal={() => setIsTemplateModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenCloudModal={() => setIsCloudModalOpen(true)}
      />

      {/* Mobile Toggle Switch (Editor vs Preview) */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-2 flex gap-2 no-print">
        <button
          onClick={() => setMobileView('editor')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition ${
            mobileView === 'editor' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          Edit Content
        </button>
        <button
          onClick={() => setMobileView('preview')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition ${
            mobileView === 'preview' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
          }`}
        >
          <Eye className="w-4 h-4" />
          Live Preview
        </button>
      </div>

      {/* Main Split Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        {/* Left Side: Form Editor Panel */}
        <div 
          className={`lg:col-span-6 xl:col-span-5 flex flex-col bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden backdrop-blur-md no-print ${
            mobileView === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Section Navigation Tabs Bar */}
          <div className="bg-slate-950/70 p-2 border-b border-slate-800 flex overflow-x-auto gap-1 no-scrollbar">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Form Content */}
          <div className="flex-1 p-5 overflow-y-auto custom-scrollbar">
            {activeTab === 'personal' && (
              <PersonalInfoForm data={resume.personalInfo} onChange={updatePersonalInfo} />
            )}

            {activeTab === 'summary' && (
              <SummaryForm summary={resume.summary} onChange={updateSummary} />
            )}

            {activeTab === 'experience' && (
              <WorkExperienceForm
                experiences={resume.workExperiences}
                onChange={(newList) => updateList('workExperiences', newList)}
              />
            )}

            {activeTab === 'education' && (
              <EducationForm
                education={resume.education}
                onChange={(newList) => updateList('education', newList)}
              />
            )}

            {activeTab === 'skills' && (
              <SkillsForm
                skillCategories={resume.skillCategories}
                onChange={(newList) => updateList('skillCategories', newList)}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsForm
                projects={resume.projects}
                onChange={(newList) => updateList('projects', newList)}
              />
            )}

            {activeTab === 'certs_lang' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-indigo-400" />
                    Certifications
                  </h3>
                  <CertificationsForm
                    certifications={resume.certifications}
                    onChange={(newList) => updateList('certifications', newList)}
                  />
                </div>

                <div className="border-t border-slate-800 pt-6">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <LangIcon className="w-4 h-4 text-indigo-400" />
                    Languages
                  </h3>
                  <LanguagesForm
                    languages={resume.languages}
                    onChange={(newList) => updateList('languages', newList)}
                  />
                </div>
              </div>
            )}

            {activeTab === 'sections' && (
              <SectionManager
                sections={resume.sections}
                onChange={updateSectionOrder}
                onToggleVisibility={toggleSectionVisibility}
              />
            )}

            {activeTab === 'theme' && (
              <ThemePicker 
                theme={resume.theme} 
                onChange={updateTheme} 
                onOpenTemplateModal={() => setIsTemplateModalOpen(true)}
              />
            )}
          </div>
        </div>

        {/* Right Side: Live Resume Preview Panel */}
        <div 
          className={`lg:col-span-6 xl:col-span-7 h-[calc(100vh-140px)] min-h-[600px] ${
            mobileView === 'editor' ? 'hidden lg:block' : 'block'
          }`}
        >
          <ResumePreview data={resume} onPrint={handlePrint} />
        </div>
      </main>

      {/* Modals */}
      <LinkedInImportModal
        isOpen={isLinkedInModalOpen}
        onClose={() => setIsLinkedInModalOpen(false)}
        onLoadSample={() => loadSample('engineer')}
      />

      <TemplateSelectionModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        currentTemplate={resume.theme.template}
        currentAccentColor={resume.theme.accentColor}
        onApplyThemeAndPreset={handleApplyThemeAndPreset}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <MyResumesModal
        isOpen={isCloudModalOpen}
        onClose={() => setIsCloudModalOpen(false)}
        onSelectResume={(loadedData) => importJSON(loadedData)}
        currentResumeData={resume}
      />
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
