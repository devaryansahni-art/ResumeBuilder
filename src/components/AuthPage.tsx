import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, LogIn, UserPlus, AlertCircle, FileText, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Cloud, Layout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Props {
  onContinueAsGuest: () => void;
}

export const AuthPage: React.FC<Props> = ({ onContinueAsGuest }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        if (!name.trim()) {
          setError('Full name is required');
          setLoading(false);
          return;
        }
        await register(email, password, name);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Navigation Bar */}
      <header className="px-6 py-4 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">
              Craft<span className="text-indigo-400">CV</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">ATS Resume Builder & Cloud Suite</p>
          </div>
        </div>

        <button
          onClick={onContinueAsGuest}
          className="text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5"
        >
          <span>Try Demo as Guest</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Side: Product Showcase */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-950/80 text-indigo-300 border border-indigo-800/80 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Next-Gen Career Platform</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Build ATS-Ready Resumes <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">In Minutes.</span>
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed max-w-lg">
            Create professional, recruiters-approved resumes with 13 unique template designs, live preview, real-time PDF generation, and secure cloud storage.
          </p>

          <div className="space-y-3 pt-2">
            {[
              '13 Unique ATS-Optimized Resume Layout Templates',
              'Cloud Storage & History with SQLite Database',
              'Real-Time High Quality Vector PDF Downloads',
              'LinkedIn Profile JSON & Preset Importer',
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>JWT Authentication</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cloud className="w-4 h-4 text-purple-400" />
              <span>Cloud Sync</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layout className="w-4 h-4 text-emerald-400" />
              <span>100% Free Demo</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login / Register Form Card */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md">
            {/* Tab Header */}
            <div className="flex border-b border-slate-800 bg-slate-950/60 p-2">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
                className={`flex-1 py-3 text-xs font-bold rounded-2xl transition flex items-center justify-center gap-2 ${
                  mode === 'login'
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setError('');
                }}
                className={`flex-1 py-3 text-xs font-bold rounded-2xl transition flex items-center justify-center gap-2 ${
                  mode === 'register'
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-extrabold text-white">
                  {mode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {mode === 'login' 
                    ? 'Enter your credentials to access your cloud resumes.' 
                    : 'Get started with cloud backup & personalized resume management.'}
                </p>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3.5 bg-red-950/80 border border-red-800 rounded-xl text-red-200 text-xs">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : mode === 'login' ? (
                  'Sign In & Open App'
                ) : (
                  'Create Account & Start'
                )}
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={onContinueAsGuest}
                  className="text-xs text-slate-400 hover:text-indigo-400 font-medium transition"
                >
                  Or continue without logging in →
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-slate-800/80 bg-slate-950/80 text-center text-xs text-slate-500 z-10">
        CraftCV — Privacy First Resume Builder & Cloud Backend • 2026
      </footer>
    </div>
  );
};
