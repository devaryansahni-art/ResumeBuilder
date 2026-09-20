import React from 'react';
import { ResumeTheme, TemplateId, FontFamily, FontSize, SpacingSize } from '../../types/resume';
import { ACCENT_COLOR_PRESETS } from '../../utils/theme';
import { Palette, Type, LayoutGrid, Check, SlidersHorizontal } from 'lucide-react';

interface Props {
  theme: ResumeTheme;
  onChange: (theme: Partial<ResumeTheme>) => void;
  onOpenTemplateModal?: () => void;
}

export const ThemePicker: React.FC<Props> = ({ theme, onChange, onOpenTemplateModal }) => {
  const templates: { id: TemplateId; name: string; desc: string; badge: string }[] = [
    {
      id: 'minimal',
      name: 'Minimal Clean',
      desc: 'Single column, ultra readable ATS favorite with accent lines.',
      badge: 'Popular',
    },
    {
      id: 'modern',
      name: 'Modern Sidebar',
      desc: 'Two-column layout with left dark/colored sidebar.',
      badge: 'Recommended',
    },
    {
      id: 'classic',
      name: 'Executive Classic',
      desc: 'Serif typography with centered executive header.',
      badge: 'Traditional',
    },
    {
      id: 'compact',
      name: 'Compact Single-Page',
      desc: 'High-density grid layout to fit heavy experience into 1 page.',
      badge: 'High-Density',
    },
    {
      id: 'creative',
      name: 'Creative Banner',
      desc: 'Contemporary header block & matrix grid for creative leads.',
      badge: 'Modern',
    },
    {
      id: 'technical',
      name: 'Terminal Tech / Code',
      desc: 'Dark IDE style terminal layout with monospace code accents.',
      badge: 'Developer',
    },
    {
      id: 'executive-pro',
      name: 'Executive Pro Banner',
      desc: 'Full-bleed top accent bar with golden timeline accents.',
      badge: 'Leadership',
    },
    {
      id: 'infographic',
      name: 'Infographic Visual',
      desc: 'Skill progress bar pills and visual metric callouts.',
      badge: 'Data-Driven',
    },
    {
      id: 'editorial',
      name: 'Editorial Magazine',
      desc: 'High-end luxury editorial layout with quotes and serif headers.',
      badge: 'Luxury',
    },
    {
      id: 'bold-headline',
      name: 'Bold Impact Headline',
      desc: 'Oversized title header with split section grid and pill tags.',
      badge: 'Impact',
    },
    {
      id: 'timeline',
      name: 'Chronological Timeline',
      desc: 'Node graph timeline connecting career milestone entries.',
      badge: 'Milestone',
    },
    {
      id: 'academic',
      name: 'Academic Research CV',
      desc: 'Publication & citation friendly multi-column research format.',
      badge: 'Scholar',
    },
    {
      id: 'startup',
      name: 'Startup Founder',
      desc: 'Neomorphic card boxes with tech stack pills and product vision.',
      badge: 'Founder',
    },
  ];

  const fonts: { id: FontFamily; name: string; style: string }[] = [
    { id: 'inter', name: 'Inter (Sans)', style: 'font-sans' },
    { id: 'merriweather', name: 'Merriweather (Serif)', style: 'font-serif' },
    { id: 'playfair', name: 'Playfair Display (Serif)', style: 'font-serif font-bold' },
    { id: 'outfit', name: 'Outfit (Modern Modern)', style: 'font-sans tracking-wide' },
    { id: 'jakarta', name: 'Plus Jakarta Sans', style: 'font-sans' },
  ];

  return (
    <div className="space-y-6">
      {onOpenTemplateModal && (
        <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border border-indigo-700/50 p-4 rounded-xl flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <LayoutGrid className="w-4 h-4 text-indigo-400" />
              Template & Preset Gallery
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Browse templates, accent colors, and sample presets side-by-side.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenTemplateModal}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 transition"
          >
            Launch Gallery
          </button>
        </div>
      )}

      {/* Templates Switcher */}
      <div>
        <label className="block text-xs font-bold text-slate-300 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
          <LayoutGrid className="w-4 h-4 text-indigo-400" />
          Choose Template Layout (13 Unique Styles)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {templates.map((tpl) => {
            const isSelected = theme.template === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => onChange({ template: tpl.id })}
                className={`text-left p-3.5 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-950/70 border-indigo-500 ring-2 ring-indigo-500/40 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-slate-100">{tpl.name}</span>
                    <span className="text-[10px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded-full font-mono">
                      {tpl.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">{tpl.desc}</p>
                </div>
                {isSelected && (
                  <div className="mt-2 text-xs font-semibold text-indigo-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Active Template
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accent Color Palette */}
      <div>
        <label className="block text-xs font-bold text-slate-300 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
          <Palette className="w-4 h-4 text-indigo-400" />
          Accent Color Theme
        </label>
        <div className="flex flex-wrap items-center gap-3">
          {ACCENT_COLOR_PRESETS.map((color) => {
            const isSelected = theme.accentColor === color.value;
            return (
              <button
                key={color.value}
                type="button"
                onClick={() => onChange({ accentColor: color.value })}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110 shadow-lg' : 'hover:scale-105 opacity-85 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
              </button>
            );
          })}
          {/* Custom color input */}
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-slate-800">
            <input
              type="color"
              value={theme.accentColor}
              onChange={(e) => onChange({ accentColor: e.target.value })}
              className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
              title="Custom Hex Color"
            />
            <span className="text-xs font-mono text-slate-400">{theme.accentColor}</span>
          </div>
        </div>
      </div>

      {/* Font Family Picker */}
      <div>
        <label className="block text-xs font-bold text-slate-300 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
          <Type className="w-4 h-4 text-indigo-400" />
          Font Pairings
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {fonts.map((f) => {
            const isSelected = theme.fontFamily === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onChange({ fontFamily: f.id })}
                className={`p-2.5 rounded-lg border text-left text-xs transition ${
                  isSelected
                    ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className={f.style}>{f.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Font Size & Spacing Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
            Font Size
          </label>
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-1">
            {(['sm', 'md', 'lg'] as FontSize[]).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => onChange({ fontSize: sz })}
                className={`flex-1 py-1 rounded text-xs font-semibold uppercase transition ${
                  theme.fontSize === sz ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
            Layout Spacing
          </label>
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-1">
            {(['compact', 'normal', 'spacious'] as SpacingSize[]).map((sp) => (
              <button
                key={sp}
                type="button"
                onClick={() => onChange({ spacing: sp })}
                className={`flex-1 py-1 rounded text-xs font-semibold capitalize transition ${
                  theme.spacing === sp ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
