import React, { useRef } from 'react';
import { ShieldCheck, Download, Upload, FileJson, Sparkles, RotateCcw, FileText, Layout } from 'lucide-react';
import { LinkedInIcon } from './Icons';
import confetti from 'canvas-confetti';
import { ResumeData } from '../types/resume';

interface Props {
  onPrint: () => void;
  onLoadSample: (preset: 'engineer' | 'pm' | 'creative' | 'executive' | 'empty') => void;
  onExportJSON: () => void;
  onImportJSON: (data: ResumeData) => void;
  onOpenLinkedInModal: () => void;
  onOpenTemplateModal: () => void;
}

export const Header: React.FC<Props> = ({
  onPrint,
  onLoadSample,
  onExportJSON,
  onImportJSON,
  onOpenLinkedInModal,
  onOpenTemplateModal,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadPDF = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    onPrint();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.personalInfo) {
          onImportJSON(parsed);
        } else {
          alert('Invalid resume JSON format.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Branding & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-white tracking-tight">
                Craft<span className="text-indigo-400">CV</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                100% Private & Free
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Fastest client-side ATS resume builder. Zero server tracking.
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Template & Theme Choice Button */}
          <button
            onClick={onOpenTemplateModal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-900/90 to-indigo-900/90 hover:from-purple-800 hover:to-indigo-800 text-purple-200 border border-purple-700/60 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md"
          >
            <Layout className="w-4 h-4 text-purple-300" />
            <span>Choose Resume Theme</span>
          </button>

          {/* Sample Presets Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700/80 transition">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Load Sample</span>
            </button>
            <div className="absolute right-0 mt-1 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-1 hidden group-hover:block z-50 animate-fade-in">
              <button
                onClick={() => onLoadSample('engineer')}
                className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 hover:text-white font-medium transition"
              >
                💻 Software Engineer
              </button>
              <button
                onClick={() => onLoadSample('pm')}
                className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 hover:text-white font-medium transition"
              >
                📊 Product Manager
              </button>
              <button
                onClick={() => onLoadSample('creative')}
                className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 hover:text-white font-medium transition"
              >
                🎨 UX / Product Designer
              </button>
              <button
                onClick={() => onLoadSample('executive')}
                className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 hover:text-white font-medium transition"
              >
                💼 Executive / COO
              </button>
              <button
                onClick={() => onLoadSample('empty')}
                className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-slate-800 font-medium transition flex items-center gap-1.5 border-t border-slate-800 mt-1"
              >
                <RotateCcw className="w-3 h-3" />
                Clear All Fields
              </button>
            </div>
          </div>

          {/* LinkedIn Import Trigger */}
          <button
            onClick={onOpenLinkedInModal}
            className="flex items-center gap-1.5 bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-800/80 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
          >
            <LinkedInIcon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">LinkedIn Import</span>
          </button>

          {/* Backup / Restore JSON */}
          <button
            onClick={onExportJSON}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-750 text-slate-300 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-700/80 transition"
            title="Export Data as JSON Backup"
          >
            <FileJson className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden lg:inline">Backup</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-750 text-slate-300 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-700/80 transition"
            title="Restore from JSON File"
          >
            <Upload className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden lg:inline">Restore</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Primary Action - Download PDF */}
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};

