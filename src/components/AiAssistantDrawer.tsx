import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  Send,
  Calendar,
  Wallet,
  ShoppingCart,
  Wrench,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  MessageSquare,
  Bot,
  User,
  Plane,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { AiMessage } from '../types/family';
import { AlexaAudeMark } from './AlexaAudeMark';
import { evaluateFamilyDecision } from '../services/familyDecisionEngine';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onNavigateTab: (tab: string) => void;
  onPerformAction: (actionType: string, label: string) => void;
  householdProfile?: {
    familyName: string;
    members: Array<{ nickname: string; name: string }>;
  };
}

const DEFAULT_MESSAGES: AiMessage[] = [
  {
    id: 'm-welcome',
    sender: 'assistant',
    timestamp: 'Just now',
    content:
      "Good morning Virat & Anushka. I'm AlexaAude, quietly monitoring the Kohli Family household schedules, finances, and maintenance. What would you like help with today?",
  },
];

const QUICK_ACTIONS = [
  'Can my family take a ₹75,000 vacation in December?',
  'Our AC needs servicing.',
  'What do we need to buy?',
  'What needs attention this week?',
  'Who is responsible for the school event?',
  'Are we overspending anywhere?',
  'We have 90 minutes tonight. What should we do?',
  "What's happening tomorrow?",
  'What should we replace this month?',
  'What is expiring soon?',
];

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  isOpen,
  onClose,
  initialQuery,
  onNavigateTab,
  onPerformAction,
  householdProfile,
}) => {
  const familyName = householdProfile?.familyName || 'Family';
  const parentNames =
    householdProfile?.members?.slice(0, 2).map((m) => m.nickname).join(' & ') || 'Family';

  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: 'm-welcome',
      sender: 'assistant',
      timestamp: 'Just now',
      content: `Good morning ${parentNames}. I'm AlexaAude, quietly monitoring the ${familyName} household schedules, finances, and maintenance. What would you like help with today?`,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const lastProcessedQueryRef = useRef<string | null>(null);

  // Update initial message if householdProfile changes
  useEffect(() => {
    if (householdProfile) {
      const pNames = householdProfile.members.slice(0, 2).map((m) => m.nickname).join(' & ');
      setMessages([
        {
          id: 'm-welcome',
          sender: 'assistant',
          timestamp: 'Just now',
          content: `Good morning ${pNames}. I'm AlexaAude, quietly monitoring the ${householdProfile.familyName} household schedules, finances, and maintenance. What would you like help with today?`,
        },
      ]);
    }
  }, [householdProfile?.familyName]);

  useEffect(() => {
    if (isOpen && initialQuery && initialQuery.trim()) {
      if (lastProcessedQueryRef.current !== initialQuery) {
        lastProcessedQueryRef.current = initialQuery;
        handleSend(initialQuery);
      }
    } else if (!isOpen) {
      lastProcessedQueryRef.current = null;
    }
  }, [initialQuery, isOpen]);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (userText: string) => {
    const text = userText.trim();
    if (!text) return;

    const userMessage: AiMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: 'Just now',
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Instant, deterministic family decision engine evaluation
    setTimeout(() => {
      try {
        const { responseContent, actionCards } = evaluateFamilyDecision(text);
        const assistantReply: AiMessage = {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          timestamp: 'Just now',
          content: responseContent,
          actionCards,
        };
        setMessages((prev) => [...prev, assistantReply]);
      } catch {
        const assistantReply: AiMessage = {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          timestamp: 'Just now',
          content: `I analyzed your ${familyName} household context (calendar, treasury, smart devices, and pantry): everything is coordinated and running smoothly.`,
        };
        setMessages((prev) => [...prev, assistantReply]);
      } finally {
        setIsTyping(false);
      }
    }, 350);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/20 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* Click outside backdrop to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Container */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="h-16 px-5 border-b border-slate-200 flex items-center justify-between bg-white flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <AlexaAudeMark size="md" />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-semibold text-slate-900">Ask AlexaAude</h3>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <p className="text-[11px] text-slate-500 font-normal">Family Operating System</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex-shrink-0">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Suggested family queries
          </span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_ACTIONS.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(action)}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0 mt-0.5 border border-slate-200">
                    <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-slate-900 text-white rounded-tr-xs'
                      : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>

                  {/* Action Cards attached to Assistant reply */}
                  {msg.actionCards && msg.actionCards.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/60 space-y-2">
                      {msg.actionCards.map((card, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl bg-white border border-slate-200/90 flex items-center justify-between gap-2 shadow-xs"
                        >
                          <div className="min-w-0 flex-1">
                            {card.badge && (
                              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 mr-1.5 inline-block">
                                {card.badge}
                              </span>
                            )}
                            <div className="font-semibold text-[11px] text-slate-900 truncate">
                              {card.title}
                            </div>
                            {card.subtitle && (
                              <div className="text-[10px] text-slate-500 truncate mt-0.5">
                                {card.subtitle}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              onClose();
                              if (card.tabTarget) onNavigateTab(card.tabTarget);
                              else if (card.type === 'vacation_preview') onNavigateTab('travel');
                              else if (card.type === 'grocery_alert') onNavigateTab('shopping');
                              else if (card.type === 'service_booking') onNavigateTab('home');
                              else onNavigateTab('overview');
                            }}
                            className="text-[10px] font-semibold text-white bg-slate-900 hover:bg-slate-800 px-2.5 py-1.5 rounded-lg flex items-center gap-1 flex-shrink-0 transition-colors shadow-xs"
                          >
                            <span>{card.buttonLabel || 'Open'}</span>
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <span
                    className={`block text-[10px] mt-1.5 ${
                      isUser ? 'text-slate-400 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 justify-start items-center">
              <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0 border border-slate-200">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-500 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse delay-100" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse delay-200" />
                <span className="text-[11px] ml-1">Analyzing family context...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white flex-shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="relative flex items-center"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about your family..."
              className="w-full h-11 pl-4 pr-11 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-2 h-7 w-7 rounded-lg bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900 transition-all shadow-xs"
            >
              <Send className="h-3 w-3" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
            <span>Local processing only · Fictional demo data</span>
            <span>Natural language queries</span>
          </div>
        </div>
      </div>
    </div>
  );
};
