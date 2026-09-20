import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CraftCV App Error Captured:', error, errorInfo);
  }

  private handleReset = () => {
    localStorage.removeItem('craftcv_resume_data');
    localStorage.removeItem('craftcv_auth_token');
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-red-950/80 text-red-400 border border-red-800/80 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Something Went Wrong</h2>
              <p className="text-xs text-slate-400 mt-1">
                An unexpected error occurred while loading the application.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-left text-[11px] font-mono text-red-300 overflow-x-auto max-h-32">
                {this.state.error.message}
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset State & Reload App</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
