import React, { useEffect, useState } from 'react';
import { X, Cloud, Trash2, FolderOpen, Plus, Calendar, AlertCircle } from 'lucide-react';
import { api, ResumeSummary } from '../services/api';
import { ResumeData } from '../types/resume';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectResume: (data: ResumeData) => void;
  currentResumeData: ResumeData;
}

export const MyResumesModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectResume,
  currentResumeData,
}) => {
  const [resumes, setResumes] = useState<ResumeSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'save'>('list');

  const fetchResumes = async () => {
    setLoading(true);
    setError('');
    try {
      const list = await api.getResumes();
      setResumes(list);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch saved resumes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchResumes();
      const defaultName = `${currentResumeData.personalInfo.fullName || 'My Resume'} - ${new Date().toLocaleDateString()}`;
      setNewTitle(defaultName);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveCurrent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setSaving(true);
    setError('');
    try {
      await api.createResume(newTitle, currentResumeData);
      setNewTitle('');
      setActiveTab('list');
      await fetchResumes();
    } catch (err: any) {
      setError(err.message || 'Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  const handleLoadResume = async (id: string) => {
    try {
      const detail = await api.getResume(id);
      onSelectResume(detail.data);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to load resume');
    }
  };

  const handleDeleteResume = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await api.deleteResume(id);
      setResumes((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete resume');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in no-print">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Cloud Saved Resumes</h2>
              <p className="text-xs text-slate-400">Manage your saved resumes on SQLite database</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Header */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 p-1">
          <button
            onClick={() => setActiveTab('list')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              activeTab === 'list'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Saved Resumes ({resumes.length})
          </button>
          <button
            onClick={() => setActiveTab('save')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              activeTab === 'save'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            + Save Current Resume to Cloud
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'save' ? (
            <form onSubmit={handleSaveCurrent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Resume Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Senior Frontend Developer CV - 2026"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
                />
              </div>

              <div className="p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl text-xs space-y-1 text-slate-300">
                <p className="font-semibold text-purple-300">Summary of data being saved:</p>
                <p>• Name: {currentResumeData.personalInfo.fullName || 'Untitled'}</p>
                <p>• Role: {currentResumeData.personalInfo.jobTitle || 'Not specified'}</p>
                <p>• Experience Entries: {currentResumeData.workExperiences.length}</p>
                <p>• Skill Badges: {currentResumeData.skillCategories.length}</p>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              >
                {saving ? 'Saving...' : 'Confirm Cloud Save'}
              </button>
            </form>
          ) : loading ? (
            <div className="py-12 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-slate-500 border-t-purple-400 rounded-full animate-spin" />
              Loading saved resumes...
            </div>
          ) : resumes.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm space-y-3">
              <Cloud className="w-12 h-12 mx-auto text-slate-600 stroke-[1.5]" />
              <p>No cloud saved resumes found.</p>
              <button
                onClick={() => setActiveTab('save')}
                className="inline-flex items-center gap-1.5 bg-purple-600/20 text-purple-300 border border-purple-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-purple-600/30 transition"
              >
                <Plus className="w-3.5 h-3.5" /> Save your current resume now
              </button>
            </div>
          ) : (
            <div className="grid gap-3">
              {resumes.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-800 rounded-xl hover:border-purple-500/50 transition group"
                >
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {new Date(item.updatedAt).toLocaleDateString()} at{' '}
                        {new Date(item.updatedAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLoadResume(item.id)}
                      className="flex items-center gap-1 bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-md"
                    >
                      <FolderOpen className="w-3.5 h-3.5" /> Load
                    </button>
                    <button
                      onClick={() => handleDeleteResume(item.id, item.title)}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition"
                      title="Delete Resume"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
