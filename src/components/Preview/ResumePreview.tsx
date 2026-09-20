import React, { useState, useRef } from 'react';
import { ResumeData } from '../../types/resume';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ModernSidebarTemplate } from './templates/ModernSidebarTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { CompactTemplate } from './templates/CompactTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { TechnicalTemplate } from './templates/TechnicalTemplate';
import { ExecutiveProTemplate } from './templates/ExecutiveProTemplate';
import { InfographicTemplate } from './templates/InfographicTemplate';
import { EditorialTemplate } from './templates/EditorialTemplate';
import { BoldHeadlineTemplate } from './templates/BoldHeadlineTemplate';
import { TimelineTemplate } from './templates/TimelineTemplate';
import { AcademicTemplate } from './templates/AcademicTemplate';
import { StartupTemplate } from './templates/StartupTemplate';
import { ZoomIn, ZoomOut, RotateCcw, Printer, FileText } from 'lucide-react';

interface Props {
  data: ResumeData;
  onPrint: () => void;
}

export const ResumePreview: React.FC<Props> = ({ data, onPrint }) => {
  const [zoom, setZoom] = useState<number>(0.9);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 1.4));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoom(0.9);

  const renderSelectedTemplate = () => {
    switch (data.theme.template) {
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'modern':
        return <ModernSidebarTemplate data={data} />;
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'compact':
        return <CompactTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'technical':
        return <TechnicalTemplate data={data} />;
      case 'executive-pro':
        return <ExecutiveProTemplate data={data} />;
      case 'infographic':
        return <InfographicTemplate data={data} />;
      case 'editorial':
        return <EditorialTemplate data={data} />;
      case 'bold-headline':
        return <BoldHeadlineTemplate data={data} />;
      case 'timeline':
        return <TimelineTemplate data={data} />;
      case 'academic':
        return <AcademicTemplate data={data} />;
      case 'startup':
        return <StartupTemplate data={data} />;
      default:
        return <MinimalTemplate data={data} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/80 rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl backdrop-blur-md">
      {/* Top Toolbar */}
      <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-2 text-slate-300 font-medium text-xs">
          <FileText className="w-4 h-4 text-indigo-400" />
          <span>Live Resume Preview</span>
          <span className="bg-slate-800 text-indigo-300 text-[10px] px-2 py-0.5 rounded-full font-mono uppercase">
            {data.theme.template}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700/60 text-slate-300">
            <button
              onClick={handleZoomOut}
              className="p-1 hover:bg-slate-700 hover:text-white rounded transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono w-12 text-center select-none font-semibold">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 hover:bg-slate-700 hover:text-white rounded transition"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1 hover:bg-slate-700 hover:text-white rounded transition ml-1 border-l border-slate-700"
              title="Reset Zoom (90%)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Print Button */}
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Main Preview Scrollable Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto p-6 md:p-10 flex justify-center items-start bg-slate-950/60 custom-scrollbar print:p-0 print:m-0 print:bg-transparent print:overflow-visible"
      >
        <div 
          className="transition-transform duration-150 origin-top shadow-2xl print:transform-none print:shadow-none print:w-full print:min-h-0 print:p-0 print:m-0"
          style={{
            transform: `scale(${zoom})`,
            width: '794px', // Standard A4 pixel width at 96 DPI
            minHeight: '1123px', // Standard A4 pixel height at 96 DPI
          }}
        >
          <div id="printable-resume" className="bg-white rounded-sm text-slate-900 print:rounded-none print:border-none overflow-hidden border border-slate-300/40">
            {renderSelectedTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};
