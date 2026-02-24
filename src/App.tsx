import { useState, useRef } from 'react';
import type { ResumeFormData, ResumeOutput, TemplateType } from './types';
import { generateResume } from './nlp';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { NLPExplainer } from './components/NLPExplainer';
import { ChatBot } from './components/ChatBot';

export function App() {
  const [mode, setMode] = useState<'form' | 'chat'>('form');
  const [resume, setResume] = useState<ResumeOutput | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleGenerate = (data: ResumeFormData) => {
    setIsGenerating(true);
    console.log('[App] Generate triggered with data:', data);
    setTimeout(() => {
      const result = generateResume(data);
      setResume(result);
      setIsGenerating(false);
      setTimeout(() => {
        resumeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 800);
  };

  const handleDownload = () => {
    window.print();
  };

  const TEMPLATES: { id: TemplateType; label: string }[] = [
    { id: 'classic', label: '📋 Classic' },
    { id: 'professional', label: '💼 Professional' },
    { id: 'modern', label: '🎨 Modern' },
    { id: 'minimal', label: '⚡ Minimal' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-indigo-50">
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white text-lg">📄</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 tracking-tight leading-tight">NLP Resume Builder</h1>
              <p className="text-[10px] text-gray-500">Unified NLP Engine · 4 Templates · AI Chat Mode</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode(mode === 'form' ? 'chat' : 'form')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${mode === 'chat' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {mode === 'chat' ? '📋 Form' : '🤖 Chat'}
            </button>
            <button
              onClick={() => setShowExplainer(!showExplainer)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${showExplainer ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              🧠 {showExplainer ? 'Hide' : 'NLP'} Docs
            </button>
            {resume && (
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:opacity-90 transition shadow-sm flex items-center gap-1.5"
              >
                ⬇️ PDF
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {showExplainer && (
          <div className="mb-6 print:hidden">
            <NLPExplainer />
          </div>
        )}

        {mode === 'chat' ? (
          /* Chat Mode */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="print:hidden">
              <ChatBot onComplete={handleGenerate} />
            </div>
            <div ref={resumeRef}>
              {resume ? (
                <div className="space-y-3">
                  <div className="bg-white rounded-xl shadow-md border border-gray-100 p-3 print:hidden">
                    <p className="text-[10px] font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                      Switch Template:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {TEMPLATES.map(t => (
                        <button
                          key={t.id}
                          onClick={() => setActiveTemplate(t.id)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                            activeTemplate === t.id
                              ? 'bg-indigo-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {isGenerating ? (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 flex flex-col items-center justify-center gap-4">
                      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                      <p className="text-sm text-gray-500 font-medium">Generating...</p>
                    </div>
                  ) : (
                    <ResumePreview resume={resume} template={activeTemplate} />
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 flex flex-col items-center justify-center text-center min-h-[500px]">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-5">
                    <span className="text-4xl">🤖</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Chat with AI Resume Bot</h3>
                  <p className="text-sm text-gray-500 max-w-sm">Answer the questions on the left to build your resume. Your answers will be processed by the Unified NLP Engine.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Form Mode */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="print:hidden">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
                <div className="mb-4">
                  <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-lg">✍️</span> Build Your Resume
                  </h2>
                  <p className="text-[10.5px] text-gray-500 mt-0.5">
                    Choose a template → Fill your details → Generate with unified NLP
                  </p>
                </div>
                <ResumeForm
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                  selectedTemplate={activeTemplate}
                  onTemplateChange={setActiveTemplate}
                />
              </div>
            </div>
            <div ref={resumeRef}>
              {resume ? (
                <div className="space-y-3">
                  <div className="bg-white rounded-xl shadow-md border border-gray-100 p-3 print:hidden">
                    <p className="text-[10px] font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                      Switch Template:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {TEMPLATES.map(t => (
                        <button
                          key={t.id}
                          onClick={() => setActiveTemplate(t.id)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                            activeTemplate === t.id
                              ? 'bg-indigo-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {isGenerating ? (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 flex flex-col items-center justify-center gap-4">
                      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                      <p className="text-sm text-gray-500 font-medium">Processing with Unified NLP Engine...</p>
                      <p className="text-xs text-gray-400">Rule-Based → TF-IDF → Pattern Analysis → Output</p>
                    </div>
                  ) : (
                    <ResumePreview resume={resume} template={activeTemplate} />
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 flex flex-col items-center justify-center text-center min-h-[500px]">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-5">
                    <span className="text-4xl">📄</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Your Resume Appears Here</h3>
                  <p className="text-sm text-gray-500 max-w-sm mb-5">
                    Fill in the form, choose your template style, then click Generate.
                  </p>
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 w-full max-w-sm">
                    <h4 className="font-bold text-indigo-700 mb-2 text-sm">🧠 Unified NLP Engine</h4>
                    <div className="text-xs text-gray-600 space-y-1 text-left">
                      <p>✅ <strong>Rule-Based NLG</strong> — Parses input into structured data</p>
                      <p>✅ <strong>TF-IDF</strong> — Extracts keywords and classifies domains</p>
                      <p>✅ <strong>Pattern-Based NLP</strong> — Detects roles, verbs, and levels</p>
                      <p className="text-indigo-600 font-medium pt-1">All three combined for best results!</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-10 print:hidden">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>🏗️</span> Unified NLP Architecture
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
              <ArchCard title="1. Input Layer" color="bg-blue-50 border-blue-200" items={[
                'Form or Chat Input',
                'TypeScript Validation',
                'Data Structure Mapping',
              ]} />
              <ArchCard title="2. Rule-Based NLG" color="bg-green-50 border-green-200" items={[
                'Tokenization',
                'Structured Parsing',
                'Template Extraction',
              ]} />
              <ArchCard title="3. TF-IDF + Pattern" color="bg-purple-50 border-purple-200" items={[
                'Keyword Extraction',
                'Domain Classification',
                'Role & Level Detection',
              ]} />
              <ArchCard title="4. Output" color="bg-orange-50 border-orange-200" items={[
                '4 Resume Templates',
                'Summary Generation',
                'PDF Export Support',
              ]} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {['🔡 Tokenization', '📊 TF-IDF', '🔍 Patterns', '🎯 Role Detection', '📝 Templates', '🖨️ PDF Export'].map(c => (
                <span key={c} className="px-2.5 py-1 bg-white border border-gray-200 rounded-full text-[10px] text-gray-600 shadow-sm">{c}</span>
              ))}
            </div>
          </div>
        </div>

        <footer className="mt-6 text-center print:hidden pb-8">
          <p className="text-[10px] text-gray-400">
            Unified NLP Resume Builder — Rule-Based + TF-IDF + Pattern Matching
          </p>
        </footer>
      </main>
    </div>
  );
}

function ArchCard({ title, color, items }: { title: string; color: string; items: string[] }) {
  return (
    <div className={`rounded-xl border p-4 ${color}`}>
      <h4 className="text-sm font-bold text-gray-700 mb-2">{title}</h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
            <span className="text-gray-400 mt-0.5 shrink-0">▸</span>{item}
          </li>
        ))}
      </ul>
    </div>
  );
}
