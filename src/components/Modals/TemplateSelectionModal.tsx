import React, { useState } from 'react';
import { TemplateId, FontFamily } from '../../types/resume';
import { ACCENT_COLOR_PRESETS } from '../../utils/theme';
import { 
  X, 
  Check, 
  Sparkles, 
  Layout, 
  Briefcase, 
  Palette, 
  ArrowRight,
  ShieldCheck,
  FileCode2,
  Columns,
  GraduationCap,
  Sparkle
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentTemplate: TemplateId;
  currentAccentColor: string;
  onApplyThemeAndPreset: (template: TemplateId, accentColor: string, preset: 'engineer' | 'pm' | 'empty' | 'creative' | 'executive') => void;
}

export const TEMPLATE_CARDS: {
  id: TemplateId;
  title: string;
  badge: string;
  description: string;
  bestFor: string;
  fontDefault: FontFamily;
  previewClass: string;
  features: string[];
}[] = [
  {
    id: 'minimal',
    title: 'Minimal Clean (ATS Favorite)',
    badge: 'Popular',
    description: 'Single-column, ultra-readable layout prioritized by corporate ATS scanners and HR recruiters.',
    bestFor: 'Engineering, Data Science, Operations, Legal',
    fontDefault: 'inter',
    previewClass: 'border-l-4 border-indigo-500 bg-slate-800/40',
    features: ['100% ATS Parser Safe', 'Clean Linear Flow', 'Accent Divider Lines'],
  },
  {
    id: 'modern',
    title: 'Modern Sidebar',
    badge: 'Two-Column',
    description: 'Sleek split layout featuring a colored left sidebar for skills, contact, and education.',
    bestFor: 'Tech Leads, Product Managers, Consultants, Marketing',
    fontDefault: 'jakarta',
    previewClass: 'bg-gradient-to-r from-indigo-900/60 to-slate-800/40',
    features: ['Visual Hierarchy', 'Sidebar Contact & Skills', 'High Information Density'],
  },
  {
    id: 'classic',
    title: 'Executive Classic',
    badge: 'Traditional',
    description: 'Elegant serif typography with centered header designed for senior leaders and traditional corporate roles.',
    bestFor: 'C-Suite, Finance, Healthcare, Academia, Law',
    fontDefault: 'merriweather',
    previewClass: 'border-t-4 border-amber-500 bg-slate-800/40',
    features: ['Executive Serif Design', 'Centered Contact Bar', 'Formal Section Headers'],
  },
  {
    id: 'compact',
    title: 'Compact Single-Page',
    badge: 'High-Density',
    description: 'Optimized grid spacing specifically crafted to fit extensive work history onto 1 printed page.',
    bestFor: 'Experienced Engineers, Multidisciplinary Specialists',
    fontDefault: 'inter',
    previewClass: 'border-r-4 border-emerald-500 bg-slate-800/40',
    features: ['Fits Maximum Content', 'Grid Bullet Layouts', 'Compact Line Spacing'],
  },
  {
    id: 'creative',
    title: 'Creative Banner',
    badge: 'Contemporary',
    description: 'Eye-catching header block with modern skills pills for creative professionals and tech innovators.',
    bestFor: 'UI/UX Designers, Creative Directors, Media, Startups',
    fontDefault: 'outfit',
    previewClass: 'border-b-4 border-purple-500 bg-slate-800/40',
    features: ['Bold Banner Header', 'Skill Badge Pills', 'Modern Typography'],
  },
];

export const PRESET_OPTIONS: {
  id: 'engineer' | 'pm' | 'creative' | 'executive' | 'empty';
  title: string;
  icon: React.ReactNode;
  subtitle: string;
}[] = [
  {
    id: 'engineer',
    title: 'Software & Tech',
    icon: <FileCode2 className="w-4 h-4 text-indigo-400" />,
    subtitle: 'Sample data tailored for engineers & developers',
  },
  {
    id: 'pm',
    title: 'Product & Business',
    icon: <Briefcase className="w-4 h-4 text-emerald-400" />,
    subtitle: 'Sample data for PMs, Analysts & Managers',
  },
  {
    id: 'creative',
    title: 'Design & Creative',
    icon: <Sparkles className="w-4 h-4 text-purple-400" />,
    subtitle: 'Sample data for UI/UX & Designers',
  },
  {
    id: 'executive',
    title: 'Executive & Finance',
    icon: <Columns className="w-4 h-4 text-amber-400" />,
    subtitle: 'Sample data for Directors & Executives',
  },
  {
    id: 'empty',
    title: 'Blank Resume',
    icon: <Sparkle className="w-4 h-4 text-slate-400" />,
    subtitle: 'Start with empty fields from scratch',
  },
];

export const TemplateSelectionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentTemplate,
  currentAccentColor,
  onApplyThemeAndPreset,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(currentTemplate);
  const [selectedAccentColor, setSelectedAccentColor] = useState<string>(currentAccentColor);
  const [selectedPreset, setSelectedPreset] = useState<'engineer' | 'pm' | 'creative' | 'executive' | 'empty'>('engineer');

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyThemeAndPreset(selectedTemplate, selectedAccentColor, selectedPreset);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in no-print">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Choose Resume Template & Type</h2>
                <span className="bg-indigo-950 text-indigo-300 border border-indigo-800/80 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  Step 1 of 2
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Select your preferred resume layout, accent color, and starting content preset.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6 flex-1">
          {/* 1. Template Layout Grid */}
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Layout className="w-4 h-4 text-indigo-400" />
              1. Choose Resume Layout Theme (5 Distinct Styles)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {TEMPLATE_CARDS.map((tpl) => {
                const isSelected = selectedTemplate === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all relative flex flex-col justify-between ${tpl.previewClass} ${
                      isSelected
                        ? 'border-indigo-500 ring-2 ring-indigo-500/50 bg-indigo-950/40 text-white shadow-lg'
                        : 'border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-sm text-slate-100 flex items-center gap-2">
                          {tpl.title}
                        </span>
                        <span className="text-[10px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded-full font-mono">
                          {tpl.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">{tpl.description}</p>
                      
                      {/* Features list */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {tpl.features.map((feat, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-900/80 text-slate-300 border border-slate-750 px-2 py-0.5 rounded">
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 italic">Best for: {tpl.bestFor}</span>
                      {isSelected ? (
                        <span className="text-indigo-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Selected
                        </span>
                      ) : (
                        <span className="text-slate-400 hover:text-slate-200">Click to Select</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Color Palette */}
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-indigo-400" />
              2. Select Primary Accent Color
            </h3>
            <div className="flex flex-wrap items-center gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              {ACCENT_COLOR_PRESETS.map((color) => {
                const isSelected = selectedAccentColor === color.value;
                return (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setSelectedAccentColor(color.value)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110 shadow-lg'
                        : 'hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                  </button>
                );
              })}
              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-slate-800">
                <input
                  type="color"
                  value={selectedAccentColor}
                  onChange={(e) => setSelectedAccentColor(e.target.value)}
                  className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                  title="Custom Hex Color"
                />
                <span className="text-xs font-mono text-slate-400">{selectedAccentColor}</span>
              </div>
            </div>
          </div>

          {/* 3. Starting Preset Content */}
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              3. Starting Content Preset
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {PRESET_OPTIONS.map((pst) => {
                const isSelected = selectedPreset === pst.id;
                return (
                  <button
                    key={pst.id}
                    type="button"
                    onClick={() => setSelectedPreset(pst.id)}
                    className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-indigo-950/80 border-indigo-500 text-white ring-1 ring-indigo-500/40'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0 p-1.5 rounded-lg bg-slate-800/80">{pst.icon}</div>
                    <div>
                      <div className="font-bold text-xs text-slate-100">{pst.title}</div>
                      <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{pst.subtitle}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950/90 px-6 py-4 border-t border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>You can change themes and content anytime later.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
            >
              <span>Create My Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
