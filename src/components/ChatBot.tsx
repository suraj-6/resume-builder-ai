import { useState, useRef, useEffect } from 'react';
import type { ResumeFormData } from '../types';

interface ChatMessage {
  id: string;
  role: 'bot' | 'user';
  content: string;
  timestamp: number;
}

interface ChatBotProps {
  onComplete: (data: ResumeFormData) => void;
}

export function ChatBot({ onComplete }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [formData, setFormData] = useState<Partial<ResumeFormData>>({
    fullName: '', email: '', phone: '', address: '', linkedIn: '', github: '', 
    portfolio: '', codingProfiles: '', tagline: '', careerObjective: '', skills: '',
    education: '', experience: '', projects: '', certifications: '', roles: '',
    activities: '', achievements: '', references: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sections = [
  { key: 'fullName', name: 'Full Name', prompt: 'What is your full name? (e.g., "Anubhav Singh")', validator: (val: string) => val.trim().length > 0, errorMsg: 'Please enter your name.' },

  { key: 'email', name: 'Email', prompt: 'What is your email address? (e.g., "abc@mail.com")', validator: (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), errorMsg: 'Valid email required.' },

  { key: 'phone', name: 'Phone', prompt: 'Phone number (optional)? (e.g., "+91-9876543210")', validator: () => true, isOptional: true },

  { key: 'address', name: 'Address', prompt: 'Where are you located? (optional) (e.g., "Kolkata, India")', validator: () => true, isOptional: true },

  { key: 'linkedIn', name: 'LinkedIn', prompt: 'LinkedIn URL (optional)? (e.g., "https://linkedin.com/in/username")', validator: () => true, isOptional: true },

  { key: 'github', name: 'GitHub', prompt: 'GitHub URL (optional)? (e.g., "https://github.com/username")', validator: () => true, isOptional: true },

  { key: 'portfolio', name: 'Portfolio', prompt: 'Portfolio URL (optional)? (e.g., "https://myportfolio.com")', validator: () => true, isOptional: true },

  { key: 'tagline', name: 'Tagline', prompt: 'Professional tagline (optional)? (e.g., "Software Engineer | ML Enthusiast")', validator: () => true, isOptional: true },

  { key: 'careerObjective', name: 'Career Objective', prompt: 'Career objective (optional)? (e.g., "To leverage my skills in..."). Leave blank for auto-generation.', validator: () => true, isOptional: true },

  { key: 'skills', name: 'Skills', prompt: 'List your skills (e.g., "Languages: Python, JavaScript")', validator: (val: string) => val.trim().length > 0, errorMsg: 'Please enter at least one skill.' },

  { key: 'education', name: 'Education', prompt: 'Education: Degree, Institution, Year, Marks, Coursework (e.g., "B.Tech IT, NSEC, 2016-2020, 7.2 GPA")', validator: (val: string) => val.trim().length > 0, errorMsg: 'Please enter education.' },

  { key: 'experience', name: 'Experience', prompt: 'Work experience (optional)? (e.g., "Google, Developer, 2019-2020, Built REST APIs")', validator: () => true, isOptional: true },

  { key: 'projects', name: 'Projects', prompt: 'Projects (optional)? (e.g., "AI Traffic Control – Built RL model to reduce traffic")', validator: () => true, isOptional: true },

  { key: 'certifications', name: 'Certifications', prompt: 'Certifications (optional)? (e.g., "AWS Developer Associate – Score: 749")', validator: () => true, isOptional: true },

  { key: 'roles', name: 'Leadership', prompt: 'Leadership roles (optional)? (e.g., "Community Lead at DSC – Trained 3000 students")', validator: () => true, isOptional: true },

  { key: 'activities', name: 'Activities', prompt: 'Extra-curricular activities (optional)? (e.g., "Write blogs viewed by 20K+ users")', validator: () => true, isOptional: true },

  { key: 'achievements', name: 'Achievements', prompt: 'Honors and achievements (optional)? (e.g., "Intel Software Innovator – 2019")', validator: () => true, isOptional: true },

  { key: 'references', name: 'References', prompt: 'References (optional)? (e.g., "Dr. Rajesh – Professor at NSEC – rajesh@nsec.ac.in")', validator: () => true, isOptional: true },
];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      addBotMessage(`Welcome to AI Resume Builder Bot! I will help you create a professional resume.

Type 'skip' for optional sections or 'back' to go back.

${sections[0].prompt}`);
    }
  }, []);

  const addMessage = (role: 'bot' | 'user', content: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), role, content, timestamp: Date.now() }]);
  };

  const addBotMessage = (content: string) => addMessage('bot', content);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    const userInput = inputValue.trim();
    addMessage('user', userInput);
    setInputValue('');
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    if (userInput.toLowerCase() === 'back') {
      if (currentSectionIdx > 0) {
        setCurrentSectionIdx(prev => prev - 1);
        const prevSection = sections[currentSectionIdx - 1];
        addBotMessage(`Back to ${prevSection.name}. ${prevSection.prompt}`);
      } else {
        addBotMessage('Already at first section!');
      }
      setIsProcessing(false);
      return;
    }

    const currentSection = sections[currentSectionIdx];
    const isSkip = userInput.toLowerCase() === 'skip';

    if (!isSkip && !currentSection.validator(userInput)) {
      addBotMessage(`${currentSection.errorMsg} ${currentSection.prompt}`);
      setIsProcessing(false);
      return;
    }

    if (isSkip && currentSection.isOptional) {
      setFormData(prev => ({ ...prev, [currentSection.key]: '' }));
      addBotMessage('Skipped.');
    } else if (userInput) {
      setFormData(prev => ({ ...prev, [currentSection.key]: userInput }));
      addBotMessage('Got it!');
    }

    if (currentSectionIdx < sections.length - 1) {
      const nextSection = sections[currentSectionIdx + 1];
      setCurrentSectionIdx(prev => prev + 1);
      addBotMessage(nextSection.prompt);
    } else {
      addBotMessage('Processing with Unified NLP Engine... This will parse, extract keywords, and generate your professional resume.');
      setShowSummary(true);
    }

    setIsProcessing(false);
  };

  const handleGenerateResume = () => {
    onComplete(formData as ResumeFormData);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-md">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span>🤖</span> AI Resume Builder Bot
        </h2>
        <p className="text-xs text-blue-100 mt-1">Interactive guided resume with Unified NLP Engine</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2.5 rounded-2xl text-sm ${msg.role === 'bot' ? 'bg-white text-gray-800 border border-blue-100' : 'bg-indigo-600 text-white'}`}>
              <div className="whitespace-pre-line leading-relaxed">{msg.content}</div>
            </div>
          </div>
        ))}
        {showSummary && (
          <div className="bg-white border border-green-200 rounded-xl p-4">
            <h3 className="font-bold text-green-700 mb-2">Resume Data Ready!</h3>
            <button onClick={handleGenerateResume} className="w-full py-2 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:opacity-90 transition text-sm">
              Generate Resume Now
            </button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {!showSummary && (
        <form onSubmit={handleSubmit} className="bg-white border-t border-blue-100 p-4 space-y-2">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Type your answer..."
            disabled={isProcessing}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isProcessing}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isProcessing ? 'Processing...' : 'Send'}
          </button>
        </form>
      )}
    </div>
  );
}
