import React from 'react';
import { Sparkles } from 'lucide-react';

interface Props {
  summary: string;
  onChange: (summary: string) => void;
}

export const SummaryForm: React.FC<Props> = ({ summary, onChange }) => {
  const wordCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;

  const suggestions = [
    'Results-oriented Software Engineer with experience scaling high-throughput microservices and web apps...',
    'Versatile Product Manager adept at leading cross-functional teams, roadmap execution, and customer discovery...',
    'Detail-driven Data Analyst skilled in Python, SQL, and building predictive business models...',
  ];

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>Write a concise 2–4 sentence summary highlighting key skills & career achievements.</span>
        <span className="font-mono text-indigo-400 font-medium">{wordCount} words</span>
      </div>

      <textarea
        rows={4}
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Passionate Full Stack Engineer with 7+ years of experience crafting high-throughput web applications..."
        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition leading-relaxed"
      />

      {/* Suggestion Chips */}
      <div>
        <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          Click a starter template to insert:
        </div>
        <div className="space-y-1.5">
          {suggestions.map((text, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(text)}
              className="text-left w-full text-[11px] bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white p-2 rounded-lg border border-slate-800 transition truncate"
            >
              "{text}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
