import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FloatingAssistantBarProps {
  onOpenAssistant: (query?: string) => void;
}

const QUICK_PROMPTS = [
  { label: 'Vacation budget?', query: 'Can we afford a vacation?' },
  { label: "Tomorrow's plan?", query: "What's happening tomorrow?" },
  { label: 'Pending bills?', query: 'What bills are due this week?' },
];

export const FloatingAssistantBar: React.FC<FloatingAssistantBarProps> = ({ onOpenAssistant }) => {
  const [quickInput, setQuickInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenAssistant(quickInput.trim() || undefined);
    setQuickInput('');
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-4 pointer-events-none">
      <div className="pointer-events-auto bg-white rounded-xl border border-slate-200 shadow-lg p-1.5 transition-shadow hover:shadow-xl">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">

          {/* Brand button */}
          <button
            type="button"
            onClick={() => onOpenAssistant()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex-shrink-0"
            title="Open AlexaAude assistant"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span className="hidden sm:inline">Ask AlexaAude</span>
            <span className="sm:hidden">Ask</span>
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-slate-100 flex-shrink-0" />

          {/* Text input */}
          <input
            type="text"
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
            placeholder="Ask anything about your family…"
            className="flex-1 h-9 px-2 text-xs bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none min-w-0"
          />

          {/* Quick-prompt chips — desktop only */}
          <div className="hidden md:flex items-center gap-1 flex-shrink-0">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => onOpenAssistant(p.query)}
                className="text-[11px] font-medium px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors whitespace-nowrap"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="h-8 w-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-colors flex-shrink-0"
            title="Send"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
