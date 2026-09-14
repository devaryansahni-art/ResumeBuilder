import React, { useState } from 'react';
import { Education } from '../../types/resume';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

interface Props {
  education: Education[];
  onChange: (newList: Education[]) => void;
}

export const EducationForm: React.FC<Props> = ({ education, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(education[0]?.id || null);

  const handleAdd = () => {
    const newItem: Education = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      gpa: '',
      highlights: '',
    };
    onChange([...education, newItem]);
    setExpandedId(newItem.id);
  };

  const handleRemove = (id: string) => {
    onChange(education.filter((item) => item.id !== id));
  };

  const handleUpdate = (id: string, fields: Partial<Education>) => {
    onChange(
      education.map((item) => (item.id === id ? { ...item, ...fields } : item))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-400">Add degrees, diplomas, or relevant coursework.</span>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Education
        </button>
      </div>

      <div className="space-y-3">
        {education.map((edu) => {
          const isExpanded = expandedId === edu.id;
          return (
            <div key={edu.id} className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800/60">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : edu.id)}
                  className="flex items-center gap-2 text-left flex-1 font-medium text-sm text-slate-100"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-indigo-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  <div>
                    <span className="font-semibold">{edu.degree || 'Untitled Degree'}</span>
                    {edu.institution && <span className="text-slate-400 text-xs ml-2">, {edu.institution}</span>}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleRemove(edu.id)}
                  className="p-1 text-red-400 hover:text-red-300"
                  title="Delete Degree"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {isExpanded && (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Degree / Certification</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleUpdate(edu.id, { degree: e.target.value })}
                      placeholder="e.g. B.S. in Computer Science"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">University / School</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleUpdate(edu.id, { institution: e.target.value })}
                      placeholder="e.g. UC Berkeley"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) => handleUpdate(edu.id, { location: e.target.value })}
                      placeholder="e.g. Berkeley, CA"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Graduation Date</label>
                    <input
                      type="text"
                      value={edu.endDate}
                      onChange={(e) => handleUpdate(edu.id, { endDate: e.target.value })}
                      placeholder="e.g. 2018-05"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">GPA / Score (Optional)</label>
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) => handleUpdate(edu.id, { gpa: e.target.value })}
                      placeholder="e.g. 3.85 / 4.0"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Honors & Activities (Optional)</label>
                    <input
                      type="text"
                      value={edu.highlights}
                      onChange={(e) => handleUpdate(edu.id, { highlights: e.target.value })}
                      placeholder="Dean's Honors List, Hackathon Club Lead, TA for CS61B..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
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
