import React, { useState } from 'react';
import { SectionConfig } from '../../types/resume';
import { Eye, EyeOff, MoveUp, MoveDown, GripVertical, Layers } from 'lucide-react';

interface Props {
  sections: SectionConfig[];
  onChange: (sections: SectionConfig[]) => void;
  onToggleVisibility: (sectionId: string) => void;
}

export const SectionManager: React.FC<Props> = ({ sections, onChange, onToggleVisibility }) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    const updated = [...sections];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    onChange(updated);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const updated = [...sections];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, moved);
    setDraggedIndex(index);
    onChange(updated);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-3">
      <div className="text-xs text-slate-400 flex items-center gap-1.5">
        <Layers className="w-3.5 h-3.5 text-indigo-400" />
        <span>Drag items or use arrows to reorder. Click the eye icon to hide/show sections.</span>
      </div>

      <div className="space-y-2">
        {sections.map((sec, index) => {
          if (sec.id === 'personal') return null; // Personal info always stays at header

          return (
            <div
              key={sec.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                draggedIndex === index
                  ? 'bg-indigo-950/80 border-indigo-500 scale-[1.02] shadow-lg'
                  : sec.enabled
                  ? 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
                  : 'bg-slate-950/50 border-slate-900 text-slate-500 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="cursor-grab active:cursor-grabbing text-slate-500 hover:text-slate-300">
                  <GripVertical className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold">{sec.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleMove(index, 'up')}
                  disabled={index <= 1} // Keep after personal info
                  className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-20"
                  title="Move Up"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, 'down')}
                  disabled={index === sections.length - 1}
                  className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-20"
                  title="Move Down"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onToggleVisibility(sec.id)}
                  className={`p-1.5 rounded-lg border transition ${
                    sec.enabled
                      ? 'bg-indigo-950/60 border-indigo-700/50 text-indigo-300'
                      : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                  }`}
                  title={sec.enabled ? 'Hide Section' : 'Show Section'}
                >
                  {sec.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
