import React from 'react';
import { Certification } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  certifications: Certification[];
  onChange: (newList: Certification[]) => void;
}

export const CertificationsForm: React.FC<Props> = ({ certifications, onChange }) => {
  const handleAdd = () => {
    const newItem: Certification = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      link: '',
    };
    onChange([...certifications, newItem]);
  };

  const handleRemove = (id: string) => {
    onChange(certifications.filter((item) => item.id !== id));
  };

  const handleUpdate = (id: string, fields: Partial<Certification>) => {
    onChange(
      certifications.map((item) => (item.id === id ? { ...item, ...fields } : item))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-400">Add industry certifications & licenses.</span>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Certification
        </button>
      </div>

      <div className="space-y-3">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-300">Certification Item</span>
              <button
                type="button"
                onClick={() => handleRemove(cert.id)}
                className="text-slate-500 hover:text-red-400 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Certification Name</label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => handleUpdate(cert.id, { name: e.target.value })}
                  placeholder="AWS Solutions Architect"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Issuing Body</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => handleUpdate(cert.id, { issuer: e.target.value })}
                  placeholder="Amazon Web Services"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Date Issued</label>
                <input
                  type="text"
                  value={cert.date}
                  onChange={(e) => handleUpdate(cert.id, { date: e.target.value })}
                  placeholder="e.g. 2023-06"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Verification URL (Optional)</label>
                <input
                  type="text"
                  value={cert.link}
                  onChange={(e) => handleUpdate(cert.id, { link: e.target.value })}
                  placeholder="aws.amazon.com/verify/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
