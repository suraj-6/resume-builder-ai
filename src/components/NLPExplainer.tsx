import { useState } from 'react';

export function NLPExplainer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenSection(prev => prev === id ? null : id);
  };

  const sections = [
    {
      id: 'rule',
      icon: '📝',
      title: 'Engine A: Rule-Based NLG',
      color: 'border-blue-300 bg-blue-50',
      content: [
        {
          subtitle: 'What is Template-Based NLG?',
          text: 'Natural Language Generation (NLG) creates human-readable text from structured data. The simplest form is Template-Based NLG where you define sentence structures with placeholders and fill them with user data.',
        },
        {
          subtitle: 'How It Works Here',
          text: '1. Tokenize user input (split by commas, newlines)\n2. Parse into structured objects (SkillCategory, EducationEntry, etc.)\n3. Select templates based on what data exists\n4. Fill templates: "{{name}} is skilled in {{skills}}"',
        },
        {
          subtitle: 'Key Concepts',
          text: '• String Tokenization — splitting text into meaningful units\n• Pattern Matching — using regex and string methods\n• Conditional NLG — different templates for different inputs\n• No training required — pure deterministic logic',
        },
      ],
    },
    {
      id: 'tfidf',
      icon: '📊',
      title: 'Engine B: TF-IDF Keyword Extraction',
      color: 'border-purple-300 bg-purple-50',
      content: [
        {
          subtitle: 'What is TF-IDF?',
          text: 'TF-IDF = Term Frequency × Inverse Document Frequency.\n\nTF(t) = count(t) / total_terms → How often does this word appear?\nIDF(t) = log(N / docs_containing_t) → How unique is this word?\n\nHigh TF-IDF = word is frequent AND unique = important keyword.',
        },
        {
          subtitle: 'How It Works Here',
          text: '1. Each form field (skills, projects, etc.) is a "document"\n2. All words are tokenized and stop words removed\n3. TF computed for each word across all text\n4. IDF computed using each field as a separate document\n5. TF × IDF = importance score\n6. Top keywords mapped to domains (ML, Web Dev, etc.)\n7. Domain-specific summary generated',
        },
        {
          subtitle: 'Key Concepts',
          text: '• Stop Words — common words like "the", "is" that carry no meaning\n• Tokenization — splitting text into words\n• Laplace Smoothing — adding 1 to avoid log(0)\n• Lexicon-Based Classification — mapping words to categories\n• Bag of Words model — treating text as word frequencies',
        },
      ],
    },
    {
      id: 'pattern',
      icon: '🔍',
      title: 'Engine C: Pattern-Based NLP',
      color: 'border-orange-300 bg-orange-50',
      content: [
        {
          subtitle: 'What is Pattern-Based NLP?',
          text: 'Instead of counting word frequencies, this engine looks at the STRUCTURE of text. It identifies linguistic patterns like action verbs, technical acronyms, quantified achievements, and word pairs (bigrams).',
        },
        {
          subtitle: 'How It Works Here',
          text: '1. Scan for Action Verbs: "developed", "built", "deployed"\n2. Extract Tech Terms via regex: API, REST, AWS, CI/CD\n3. Find Quantifiers: "3 years", "5+ projects"\n4. Extract Bigrams: "machine learning", "full stack"\n5. Classify role: Full-Stack Dev, ML Engineer, etc.\n6. Detect experience level: senior/mid/junior/entry\n7. Compose summary from all extracted patterns',
        },
        {
          subtitle: 'Key Concepts',
          text: '• POS Tagging (simplified) — identifying verbs, nouns\n• Named Entity Recognition — detecting proper nouns\n• N-grams — word sequences (bigrams = 2-word phrases)\n• Regex Patterns — structured text extraction\n• Role Classification — lexicon-based categorization\n• Experience Level Detection — heuristic analysis',
        },
      ],
    },
    {
      id: 'compare',
      icon: '⚖️',
      title: 'Comparing the Engines',
      color: 'border-green-300 bg-green-50',
      content: [
        {
          subtitle: 'Rule-Based vs TF-IDF vs Pattern-Based',
          text: '• Rule-Based: Predictable, template output. Good for structured input.\n• TF-IDF: Data-driven keyword focus. Adapts to user\'s domain.\n• Pattern-Based: Structure-aware. Detects roles, experience levels.\n\nReal NLP systems combine all three approaches!',
        },
        {
          subtitle: 'Why Not Deep Learning?',
          text: 'Deep Learning (BERT, GPT) requires massive datasets and compute. For structured tasks like resume generation, rule-based + statistical methods are often more reliable, interpretable, and efficient. Understanding these fundamentals is essential before moving to DL.',
        },
      ],
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
        <span>🧠</span> How the NLP Engines Work
      </h3>
      {sections.map(section => (
        <div key={section.id} className={`border rounded-xl overflow-hidden transition-all ${section.color}`}>
          <button
            onClick={() => toggle(section.id)}
            className="w-full flex items-center justify-between px-4 py-3 text-left"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <span>{section.icon}</span>
              {section.title}
            </span>
            <span className={`text-gray-500 transition-transform ${openSection === section.id ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {openSection === section.id && (
            <div className="px-4 pb-4 space-y-3">
              {section.content.map((block, i) => (
                <div key={i}>
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">{block.subtitle}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{block.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
