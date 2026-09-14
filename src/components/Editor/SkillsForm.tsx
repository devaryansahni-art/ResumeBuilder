import React, { useState } from 'react';
import { SkillCategory } from '../../types/resume';
import { Plus, Trash2, X, Tag } from 'lucide-react';

interface Props {
  skillCategories: SkillCategory[];
  onChange: (newList: SkillCategory[]) => void;
}

export const SkillsForm: React.FC<Props> = ({ skillCategories, onChange }) => {
  const [tagInputs, setTagInputs] = useState<Record<string, string>>({});

  const handleAddCategory = () => {
    const newCat: SkillCategory = {
      id: `skill-${Date.now()}`,
      category: 'Technologies',
      items: ['React', 'TypeScript', 'Node.js'],
    };
    onChange([...skillCategories, newCat]);
  };

  const handleRemoveCategory = (id: string) => {
    onChange(skillCategories.filter((cat) => cat.id !== id));
  };

  const handleUpdateCategoryName = (id: string, name: string) => {
    onChange(
      skillCategories.map((cat) => (cat.id === id ? { ...cat, category: name } : cat))
    );
  };

  const handleAddTag = (catId: string) => {
    const rawVal = tagInputs[catId]?.trim();
    if (!rawVal) return;
    const tagsToAdd = rawVal.split(',').map((t) => t.trim()).filter(Boolean);
    
    onChange(
      skillCategories.map((cat) => {
        if (cat.id === catId) {
          const uniqueItems = Array.from(new Set([...cat.items, ...tagsToAdd]));
          return { ...cat, items: uniqueItems };
        }
        return cat;
      })
    );
    setTagInputs((prev) => ({ ...prev, [catId]: '' }));
  };

  const handleRemoveTag = (catId: string, itemToRemove: string) => {
    onChange(
      skillCategories.map((cat) => {
        if (cat.id === catId) {
          return { ...cat, items: cat.items.filter((item) => item !== itemToRemove) };
        }
        return cat;
      })
    );
  };

  const handleKeyDown = (catId: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag(catId);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-400">Organize skills into categories and enter tags (press Enter or comma).</span>
        <button
          type="button"
          onClick={handleAddCategory}
          className="flex items-center gap-1 bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Category
        </button>
      </div>

      <div className="space-y-4">
        {skillCategories.map((cat) => (
          <div key={cat.id} className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <input
                type="text"
                value={cat.category}
                onChange={(e) => handleUpdateCategoryName(cat.id, e.target.value)}
                placeholder="Category Name (e.g. Languages & Tools)"
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold text-indigo-300 placeholder-slate-500 focus:border-indigo-500 focus:outline-none flex-1"
              />
              <button
                type="button"
                onClick={() => handleRemoveCategory(cat.id)}
                className="text-slate-500 hover:text-red-400 p-1"
                title="Remove Category"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tag List */}
            <div className="flex flex-wrap gap-1.5 min-h-[32px] items-center p-2 bg-slate-950 rounded-lg border border-slate-800/80">
              {cat.items.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-indigo-950/80 text-indigo-200 border border-indigo-700/50 text-xs px-2.5 py-0.5 rounded-md flex items-center gap-1 font-medium group"
                >
                  <Tag className="w-3 h-3 text-indigo-400" />
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(cat.id, item)}
                    className="text-indigo-400 hover:text-red-400 ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              <div className="flex items-center gap-1 flex-1 min-w-[140px] ml-1">
                <input
                  type="text"
                  value={tagInputs[cat.id] || ''}
                  onChange={(e) => setTagInputs({ ...tagInputs, [cat.id]: e.target.value })}
                  onKeyDown={(e) => handleKeyDown(cat.id, e)}
                  placeholder="Type skill & press Enter..."
                  className="bg-transparent text-xs text-slate-100 placeholder-slate-600 focus:outline-none w-full"
                />
                <button
                  type="button"
                  onClick={() => handleAddTag(cat.id)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-0.5 rounded font-medium shrink-0"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
