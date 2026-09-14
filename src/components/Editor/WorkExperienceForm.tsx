import React, { useState } from 'react';
import { WorkExperience } from '../../types/resume';
import { Plus, Trash2, ChevronUp, ChevronDown, MoveUp, MoveDown, Sparkles } from 'lucide-react';

interface Props {
  experiences: WorkExperience[];
  onChange: (newList: WorkExperience[]) => void;
}

export const WorkExperienceForm: React.FC<Props> = ({ experiences, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);

  const handleAdd = () => {
    const newItem: WorkExperience = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      bullets: ['Spearheaded key technical initiatives resulting in 30% performance gains.'],
    };
    onChange([...experiences, newItem]);
    setExpandedId(newItem.id);
  };

  const handleRemove = (id: string) => {
    onChange(experiences.filter((item) => item.id !== id));
  };

  const handleUpdate = (id: string, fields: Partial<WorkExperience>) => {
    onChange(
      experiences.map((item) => (item.id === id ? { ...item, ...fields } : item))
    );
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experiences.length) return;
    const updated = [...experiences];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    onChange(updated);
  };

  const handleAddBullet = (expId: string) => {
    const target = experiences.find((e) => e.id === expId);
    if (!target) return;
    handleUpdate(expId, { bullets: [...target.bullets, ''] });
  };

  const handleUpdateBullet = (expId: string, bulletIndex: number, text: string) => {
    const target = experiences.find((e) => e.id === expId);
    if (!target) return;
    const newBullets = [...target.bullets];
    newBullets[bulletIndex] = text;
    handleUpdate(expId, { bullets: newBullets });
  };

  const handleRemoveBullet = (expId: string, bulletIndex: number) => {
    const target = experiences.find((e) => e.id === expId);
    if (!target) return;
    handleUpdate(expId, { bullets: target.bullets.filter((_, idx) => idx !== bulletIndex) });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-400">Add work experiences in reverse chronological order.</span>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Experience
        </button>
      </div>

      <div className="space-y-3">
        {experiences.map((exp, index) => {
          const isExpanded = expandedId === exp.id;
          return (
            <div
              key={exp.id}
              className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-sm"
            >
              {/* Header card bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800/60">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  className="flex items-center gap-2 text-left flex-1 font-medium text-sm text-slate-100"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-indigo-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  <div>
                    <span className="font-semibold">{exp.jobTitle || 'Untitled Position'}</span>
                    {exp.company && <span className="text-slate-400 text-xs ml-2">@ {exp.company}</span>}
                  </div>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-30"
                    title="Move Up"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === experiences.length - 1}
                    className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-30"
                    title="Move Down"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(exp.id)}
                    className="p-1 text-red-400 hover:text-red-300 ml-1"
                    title="Delete Position"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Form fields body */}
              {isExpanded && (
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title</label>
                      <input
                        type="text"
                        value={exp.jobTitle}
                        onChange={(e) => handleUpdate(exp.id, { jobTitle: e.target.value })}
                        placeholder="e.g. Senior Software Engineer"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleUpdate(exp.id, { company: e.target.value })}
                        placeholder="e.g. Apex Cloud Systems"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => handleUpdate(exp.id, { location: e.target.value })}
                        placeholder="e.g. San Francisco, CA"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => handleUpdate(exp.id, { startDate: e.target.value })}
                        placeholder="e.g. 2022-03"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-semibold text-slate-300">End Date</label>
                        <label className="flex items-center gap-1 text-[11px] text-slate-400 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={exp.isCurrent}
                            onChange={(e) => handleUpdate(exp.id, { isCurrent: e.target.checked })}
                            className="rounded border-slate-700 text-indigo-600 focus:ring-0"
                          />
                          Current Job
                        </label>
                      </div>
                      <input
                        type="text"
                        disabled={exp.isCurrent}
                        value={exp.isCurrent ? 'Present' : exp.endDate}
                        onChange={(e) => handleUpdate(exp.id, { endDate: e.target.value })}
                        placeholder="e.g. 2024-05"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none disabled:opacity-40"
                      />
                    </div>
                  </div>

                  {/* Bullet points section */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-semibold text-slate-300">
                        Key Accomplishments & Bullet Points
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddBullet(exp.id)}
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
                      >
                        <Plus className="w-3 h-3" />
                        Add Bullet
                      </button>
                    </div>

                    <div className="space-y-2">
                      {exp.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2">
                          <span className="text-slate-500 mt-2 font-bold text-xs">•</span>
                          <textarea
                            rows={2}
                            value={bullet}
                            onChange={(e) => handleUpdateBullet(exp.id, bIdx, e.target.value)}
                            placeholder="Described action verb + task + quantifiable metric outcome..."
                            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveBullet(exp.id, bIdx)}
                            className="text-slate-500 hover:text-red-400 p-1 mt-1"
                            title="Remove Bullet"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
