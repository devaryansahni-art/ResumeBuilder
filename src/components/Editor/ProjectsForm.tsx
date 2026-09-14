import React, { useState } from 'react';
import { Project } from '../../types/resume';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

interface Props {
  projects: Project[];
  onChange: (newList: Project[]) => void;
}

export const ProjectsForm: React.FC<Props> = ({ projects, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(projects[0]?.id || null);

  const handleAdd = () => {
    const newItem: Project = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      technologies: [],
      link: '',
      startDate: '',
      endDate: '',
    };
    onChange([...projects, newItem]);
    setExpandedId(newItem.id);
  };

  const handleRemove = (id: string) => {
    onChange(projects.filter((item) => item.id !== id));
  };

  const handleUpdate = (id: string, fields: Partial<Project>) => {
    onChange(
      projects.map((item) => (item.id === id ? { ...item, ...fields } : item))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-400">Highlight key open source projects or side endeavors.</span>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Project
        </button>
      </div>

      <div className="space-y-3">
        {projects.map((proj) => {
          const isExpanded = expandedId === proj.id;
          return (
            <div key={proj.id} className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800/60">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : proj.id)}
                  className="flex items-center gap-2 text-left flex-1 font-medium text-sm text-slate-100"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-indigo-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  <div>
                    <span className="font-semibold">{proj.name || 'Untitled Project'}</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleRemove(proj.id)}
                  className="p-1 text-red-400 hover:text-red-300"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {isExpanded && (
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name</label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => handleUpdate(proj.id, { name: e.target.value })}
                        placeholder="e.g. StreamPulse Dashboard"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Project Link / URL</label>
                      <input
                        type="text"
                        value={proj.link}
                        onChange={(e) => handleUpdate(proj.id, { link: e.target.value })}
                        placeholder="github.com/username/project"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => handleUpdate(proj.id, { description: e.target.value })}
                      placeholder="Brief overview of what the project does and key outcomes achieved..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Technologies Used (comma separated)</label>
                    <input
                      type="text"
                      value={proj.technologies ? proj.technologies.join(', ') : ''}
                      onChange={(e) =>
                        handleUpdate(proj.id, {
                          technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                        })
                      }
                      placeholder="React, Rust, WebSockets, Docker"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none font-mono"
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
