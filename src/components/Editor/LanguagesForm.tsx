import React from 'react';
import { Language } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  languages: Language[];
  onChange: (newList: Language[]) => void;
}

export const LanguagesForm: React.FC<Props> = ({ languages, onChange }) => {
  const handleAdd = () => {
    const newItem: Language = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Native / Bilingual',
    };
    onChange([...languages, newItem]);
  };

  const handleRemove = (id: string) => {
    onChange(languages.filter((item) => item.id !== id));
  };

  const handleUpdate = (id: string, fields: Partial<Language>) => {
    onChange(
      languages.map((item) => (item.id === id ? { ...item, ...fields } : item))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-400">Add spoken/written languages and proficiency level.</span>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Language
        </button>
      </div>

      <div className="space-y-2.5">
        {languages.map((lang) => (
          <div key={lang.id} className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-xl p-3">
            <input
              type="text"
              value={lang.language}
              onChange={(e) => handleUpdate(lang.id, { language: e.target.value })}
              placeholder="e.g. English, Spanish, French"
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none flex-1"
            />

            <select
              value={lang.proficiency}
              onChange={(e) => handleUpdate(lang.id, { proficiency: e.target.value })}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
            >
              <option value="Native / Bilingual">Native / Bilingual</option>
              <option value="Fluent">Fluent</option>
              <option value="Professional Working">Professional Working</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Elementary">Elementary</option>
            </select>

            <button
              type="button"
              onClick={() => handleRemove(lang.id)}
              className="text-slate-500 hover:text-red-400 p-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
