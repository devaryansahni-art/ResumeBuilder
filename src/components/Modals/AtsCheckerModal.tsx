import React, { useState, useMemo } from 'react';
import { ResumeData } from '../../types/resume';
import { calculateAtsScore, AtsImprovement } from '../../utils/atsScorer';
import { 
  X, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Upload, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Search,
  Check,
  FileCode2
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentResume: ResumeData;
  onSelectTab?: (tabKey: any) => void;
  onImportResumeData?: (data: ResumeData) => void;
}

export const AtsCheckerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentResume,
  onSelectTab,
  onImportResumeData,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'audit' | 'jd' | 'upload'>('audit');
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedResumeData, setUploadedResumeData] = useState<ResumeData | null>(null);
  const [uploadError, setUploadError] = useState('');

  // Calculate ATS Score dynamically
  const activeResumeToScore = uploadedResumeData || currentResume;
  const atsResult = useMemo(() => {
    return calculateAtsScore(activeResumeToScore, jobDescription);
  }, [activeResumeToScore, jobDescription]);

  if (!isOpen) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return { stroke: '#10b981', text: 'text-emerald-400', bg: 'bg-emerald-950/60', border: 'border-emerald-700/60' };
    if (score >= 65) return { stroke: '#f59e0b', text: 'text-amber-400', bg: 'bg-amber-950/60', border: 'border-amber-700/60' };
    return { stroke: '#ef4444', text: 'text-red-400', bg: 'bg-red-950/60', border: 'border-red-700/60' };
  };

  const scoreTheme = getScoreColor(atsResult.totalScore);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (atsResult.totalScore / 100) * circumference;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (parsed && (parsed.personalInfo || parsed.workExperiences || parsed.sections)) {
          setUploadedResumeData(parsed as ResumeData);
          if (onImportResumeData) {
            onImportResumeData(parsed);
          }
          setActiveSubTab('audit');
        } else {
          setUploadError('Invalid resume structure in file.');
        }
      } catch (err) {
        setUploadError('Unable to parse file. Please upload a valid CraftCV JSON resume.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in no-print">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[92vh] text-slate-100">
        
        {/* Header Bar */}
        <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">ATS Resume Score & Optimizer</h2>
                <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full border ${scoreTheme.bg} ${scoreTheme.text} ${scoreTheme.border}`}>
                  {atsResult.grade} Grade
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Analyze your resume against ATS scanner rules & job keywords.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-2 gap-2 shrink-0">
          <button
            onClick={() => setActiveSubTab('audit')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition flex items-center gap-2 border-b-2 ${
              activeSubTab === 'audit'
                ? 'border-emerald-500 text-white bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>ATS Audit & Score</span>
          </button>

          <button
            onClick={() => setActiveSubTab('jd')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition flex items-center gap-2 border-b-2 ${
              activeSubTab === 'jd'
                ? 'border-indigo-500 text-white bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Search className="w-4 h-4 text-indigo-400" />
            <span>Target Job Keyword Matcher</span>
            {atsResult.keywordAnalysis && (
              <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-700/60 px-1.5 py-0.2 rounded font-mono">
                {atsResult.keywordAnalysis.matchPercentage}%
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('upload')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition flex items-center gap-2 border-b-2 ${
              activeSubTab === 'upload'
                ? 'border-purple-500 text-white bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-4 h-4 text-purple-400" />
            <span>Upload External Resume</span>
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">

          {/* TAB 1: ATS AUDIT & SCORE OVERVIEW */}
          {activeSubTab === 'audit' && (
            <div className="space-y-6">
              {/* Top Score Banner Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950/60 p-6 rounded-3xl border border-slate-800/80 items-center">
                
                {/* Score Gauge Circle */}
                <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        className="stroke-slate-800"
                        strokeWidth="10"
                        fill="transparent"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        stroke={scoreTheme.stroke}
                        strokeWidth="10"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-700 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-3xl font-black ${scoreTheme.text}`}>
                        {atsResult.totalScore}%
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        ATS Score
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 text-xs font-semibold text-slate-300">
                    Grade: <span className={`font-black ${scoreTheme.text}`}>{atsResult.grade}</span>
                  </div>
                </div>

                {/* Score Breakdown Summary Stats */}
                <div className="md:col-span-8 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      ATS Category Health Breakdown
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      {atsResult.actionVerbCount} Power Verbs • {atsResult.metricsBulletCount} Metrics
                    </span>
                  </div>

                  <div className="space-y-2">
                    {atsResult.categories.map((cat, idx) => {
                      const pct = Math.round((cat.score / cat.maxScore) * 100);
                      return (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-300">{cat.name}</span>
                            <span className="text-slate-400 font-mono">{cat.score} / {cat.maxScore} pts ({pct}%)</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444'
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Strengths & Highlights */}
              {atsResult.strengths.length > 0 && (
                <div className="bg-emerald-950/20 border border-emerald-800/40 p-4 rounded-2xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ATS Strengths ({atsResult.strengths.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {atsResult.strengths.map((str, idx) => (
                      <div key={idx} className="text-xs text-emerald-200 flex items-start gap-2 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-900/60">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actionable Improvements List */}
              {atsResult.improvements.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    Actionable ATS Recommendations ({atsResult.improvements.length})
                  </h4>

                  <div className="space-y-2.5">
                    {atsResult.improvements.map((imp) => {
                      const isCritical = imp.severity === 'critical';
                      return (
                        <div
                          key={imp.id}
                          className={`p-4 rounded-2xl border flex items-start justify-between gap-4 transition ${
                            isCritical
                              ? 'bg-red-950/30 border-red-800/60 text-red-100'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${isCritical ? 'bg-red-900/50 text-red-400' : 'bg-slate-800 text-amber-400'}`}>
                              {isCritical ? <AlertCircle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="font-bold text-xs text-white">{imp.title}</div>
                              <p className="text-xs text-slate-400 leading-snug mt-0.5">{imp.description}</p>
                            </div>
                          </div>

                          {imp.tabKey && onSelectTab && (
                            <button
                              onClick={() => {
                                onSelectTab(imp.tabKey);
                                onClose();
                              }}
                              className="shrink-0 text-xs font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-800/80 px-3 py-1.5 rounded-xl flex items-center gap-1 transition"
                            >
                              <span>Fix in Editor</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: JOB DESCRIPTION KEYWORD MATCHER */}
          {activeSubTab === 'jd' && (
            <div className="space-y-5">
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-2">
                  <Search className="w-4 h-4 text-indigo-400" />
                  Paste Target Job Description
                </label>
                <p className="text-xs text-slate-400 mb-3">
                  Paste the job posting requirements below. CraftCV will extract key skill requirements and compare them against your resume.
                </p>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste job posting text here (e.g. 'Seeking Senior Frontend Engineer with experience in React 19, TypeScript, GraphQL, Next.js, and AWS')..."
                  className="w-full h-36 bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 custom-scrollbar font-mono leading-relaxed"
                />
              </div>

              {atsResult.keywordAnalysis && (
                <div className="space-y-4">
                  {/* Match Percentage */}
                  <div className="bg-indigo-950/40 border border-indigo-800/60 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                        Job Match Compatibility Score
                      </div>
                      <div className="text-2xl font-black text-white mt-0.5">
                        {atsResult.keywordAnalysis.matchPercentage}% Keywords Matched
                      </div>
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      {atsResult.keywordAnalysis.matchedKeywords.length} Matched / {atsResult.keywordAnalysis.missingKeywords.length} Missing
                    </div>
                  </div>

                  {/* Matched Keywords */}
                  <div>
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Matched Keywords ({atsResult.keywordAnalysis.matchedKeywords.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {atsResult.keywordAnalysis.matchedKeywords.length > 0 ? (
                        atsResult.keywordAnalysis.matchedKeywords.map((kw, idx) => (
                          <span key={idx} className="text-xs bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 px-2.5 py-1 rounded-lg font-mono">
                            ✓ {kw}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500 italic">No matching keywords detected yet.</span>
                      )}
                    </div>
                  </div>

                  {/* Missing Keywords */}
                  <div>
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                      Recommended Keywords to Add ({atsResult.keywordAnalysis.missingKeywords.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {atsResult.keywordAnalysis.missingKeywords.length > 0 ? (
                        atsResult.keywordAnalysis.missingKeywords.map((kw, idx) => (
                          <span key={idx} className="text-xs bg-amber-950/40 text-amber-200 border border-amber-800/60 px-2.5 py-1 rounded-lg font-mono">
                            + {kw}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-emerald-400 font-bold">🎉 Fantastic! Your resume covers all top job keywords!</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: UPLOAD EXTERNAL RESUME FILE */}
          {activeSubTab === 'upload' && (
            <div className="space-y-4 text-center py-6">
              <div className="max-w-md mx-auto border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-3xl p-8 transition bg-slate-950/40">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mx-auto flex items-center justify-center mb-3">
                  <Upload className="w-7 h-7" />
                </div>

                <h3 className="text-sm font-bold text-white mb-1">
                  Upload Resume JSON to Audit
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Select your saved CraftCV JSON resume file to instantly inspect its ATS Score.
                </p>

                <label className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-lg shadow-indigo-600/30 transition active:scale-95">
                  <FileCode2 className="w-4 h-4" />
                  <span>Choose File...</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {uploadError && (
                <div className="max-w-md mx-auto p-3 bg-red-950/60 border border-red-800 rounded-xl text-red-200 text-xs">
                  {uploadError}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950/90 px-6 py-4 border-t border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Instant ATS Audit powered by CraftCV Engine</span>
          </div>

          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition"
          >
            Close Analyzer
          </button>
        </div>

      </div>
    </div>
  );
};
