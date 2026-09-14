import React from 'react';
import { X, Upload, Sparkles } from 'lucide-react';
import { LinkedInIcon } from '../Icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoadSample: () => void;
}

export const LinkedInImportModal: React.FC<Props> = ({ isOpen, onClose, onLoadSample }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <LinkedInIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Import from LinkedIn PDF</h3>
            <p className="text-xs text-slate-400">Quickly extract profile details from your LinkedIn PDF export.</p>
          </div>
        </div>

        {/* Drag Drop Box Placeholder */}
        <div 
          onClick={() => {
            onLoadSample();
            onClose();
          }}
          className="border-2 border-dashed border-slate-700 hover:border-indigo-500/60 bg-slate-950/60 hover:bg-slate-950 p-6 rounded-xl text-center cursor-pointer transition group"
        >
          <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <div className="text-xs font-bold text-slate-200">Drop your LinkedIn PDF export here</div>
          <div className="text-[11px] text-slate-500 mt-1">or click to simulate smart profile auto-fill</div>
        </div>

        <div className="bg-indigo-950/40 border border-indigo-900/60 rounded-xl p-3.5 space-y-1 text-xs text-indigo-200">
          <div className="font-semibold flex items-center gap-1.5 text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Instant Demo Feature
          </div>
          <p className="text-[11px] text-indigo-200/80 leading-relaxed">
            Clicking the box above will load our pre-formatted executive profile into your editor without losing local state!
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
