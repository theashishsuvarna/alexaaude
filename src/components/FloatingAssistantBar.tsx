import React, { useState } from 'react';
import { Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';
import { AlexaAudeMark } from './AlexaAudeMark';

interface FloatingAssistantBarProps {
  onOpenAssistant: (query?: string) => void;
}

export const FloatingAssistantBar: React.FC<FloatingAssistantBarProps> = ({ onOpenAssistant }) => {
  const [quickInput, setQuickInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickInput.trim()) {
      onOpenAssistant(quickInput);
      setQuickInput('');
    } else {
      onOpenAssistant();
    }
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-4 pointer-events-none">
      <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-xl p-2 sm:p-2.5 transition-all hover:border-slate-300">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          {/* Brand pill */}
          <button
            type="button"
            onClick={() => onOpenAssistant()}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex-shrink-0"
          >
            <AlexaAudeMark size="sm" />
            <span className="hidden sm:inline">Ask AlexaAude</span>
            <span className="sm:hidden">Ask</span>
          </button>

          {/* Quick Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder="Ask anything about your family..."
              className="w-full h-9 px-3 text-xs bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* Action pills & enter icon */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={() => onOpenAssistant('Can we afford a vacation?')}
              className="hidden md:inline-flex text-[11px] font-medium px-2 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200/80 transition-colors whitespace-nowrap"
            >
              Vacation?
            </button>
            <button
              type="button"
              onClick={() => onOpenAssistant("What's happening tomorrow?")}
              className="hidden lg:inline-flex text-[11px] font-medium px-2 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200/80 transition-colors whitespace-nowrap"
            >
              Tomorrow?
            </button>

            <button
              type="submit"
              className="h-8 w-8 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-colors"
              title="Send to AlexaAude"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
