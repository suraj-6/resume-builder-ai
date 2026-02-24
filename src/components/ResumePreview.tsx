import type { ResumeOutput, TemplateType } from '../types';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';

interface ResumePreviewProps {
  resume: ResumeOutput;
  template: TemplateType;
}

export function ResumePreview({ resume, template }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case 'classic': return <ClassicTemplate resume={resume} />;
      case 'professional': return <ProfessionalTemplate resume={resume} />;
      case 'modern': return <ModernTemplate resume={resume} />;
      case 'minimal': return <MinimalTemplate resume={resume} />;
      default: return <ClassicTemplate resume={resume} />;
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2.5 flex items-center justify-between border-b border-gray-200 print:hidden">
        <span className="text-[11px] text-gray-500 font-medium">Resume Preview</span>
        <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700">
          🧠 Unified NLP Engine
        </span>
      </div>

      {/* Resume — Single-page A4 constraint */}
      <div
        id="resume-content"
        className="bg-white overflow-hidden"
        style={{ minHeight: '900px' }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
}
