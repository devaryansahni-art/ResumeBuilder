import React from 'react';
import { PersonalInfo } from '../../types/resume';
import { User, Briefcase, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '../Icons';

interface Props {
  data: PersonalInfo;
  onChange: (fields: Partial<PersonalInfo>) => void;
}

export const PersonalInfoForm: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-indigo-400" />
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            placeholder="e.g. Alex Vance"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            Job Title / Target Role *
          </label>
          <input
            type="text"
            name="jobTitle"
            value={data.jobTitle}
            onChange={handleChange}
            placeholder="e.g. Senior Full Stack Engineer"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="alex.vance@example.com"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-indigo-400" />
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="+1 (555) 234-5678"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            Location (City, Country)
          </label>
          <input
            type="text"
            name="location"
            value={data.location}
            onChange={handleChange}
            placeholder="San Francisco, CA"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            Portfolio / Website
          </label>
          <input
            type="text"
            name="website"
            value={data.website}
            onChange={handleChange}
            placeholder="https://alexvance.dev"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <LinkedInIcon className="w-3.5 h-3.5 text-indigo-400" />
            LinkedIn Profile
          </label>
          <input
            type="text"
            name="linkedIn"
            value={data.linkedIn}
            onChange={handleChange}
            placeholder="linkedin.com/in/alexvance"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <GitHubIcon className="w-3.5 h-3.5 text-indigo-400" />
            GitHub Profile
          </label>
          <input
            type="text"
            name="github"
            value={data.github}
            onChange={handleChange}
            placeholder="github.com/alexvance"
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>
      </div>
    </div>
  );
};
