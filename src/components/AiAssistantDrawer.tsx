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
  'Can we afford a vacation?',
  "What's happening tomorrow?",
  'What do we need to buy?',
  'What needs attention?',
  'Plan my week',
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
    if (initialQuery && isOpen) {
      handleSend(initialQuery);
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

    // Simulate quiet, instant family AI response
    setTimeout(() => {
      const lower = text.toLowerCase();
      let responseContent = '';
      let actionCards: AiMessage['actionCards'] = undefined;

      const childNames =
        householdProfile?.members?.slice(2).map((m) => m.nickname).join(' & ') || 'the children';
      const firstChild = householdProfile?.members?.[2]?.nickname || 'the children';

      if (lower.includes('vacation') || lower.includes('afford')) {
        responseContent =
          `Yes, a December vacation looks feasible. Both parents' leave windows align with ${childNames}'s school holidays (Dec 22–28). Your savings goal has ₹75,000 allocated, and current discretionary liquidity stands at ₹4,28,500.`;
        actionCards = [
          {
            type: 'vacation_preview',
            title: 'December Alpine Chalet Plan (₹75,000)',
          },
        ];
      } else if (lower.includes('tomorrow') || lower.includes('happening')) {
        responseContent =
          `Tomorrow (Saturday) has 2 primary commitments:\n• 11:00 AM — Carrier AC preventive filter service\n• 4:00 PM — ${firstChild}’s School PTM (Mrs. Sharma, Room 12)`;
        actionCards = [
          {
            type: 'service_booking',
            title: 'Carrier Tech: Suresh Kumar (Scheduled 11:00 AM)',
          },
        ];
      } else if (lower.includes('buy') || lower.includes('grocery') || lower.includes('shopping')) {
        responseContent =
          'Based on consumption cycles, 3 essentials are running low:\n• Organic Whole Milk (< 1 day remaining)\n• Pasture-Raised Brown Eggs (3 remaining)\n• Artisanal Sourdough Bread (2 slices remaining)';
        actionCards = [
          {
            type: 'grocery_alert',
            title: 'Instant Replenishment: 3 items (₹335 est)',
          },
        ];
      } else if (lower.includes('attention') || lower.includes('needs')) {
        responseContent =
          `Here are the 5 top priorities needing family action:\n1. Confirm Carrier AC Service slot tomorrow\n2. Review low groceries (Milk, Eggs, Bread)\n3. Confirm ${firstChild}’s PTM for Thursday 5:00 PM\n4. Pay Electricity Bill (₹4,850 due in 3 days)\n5. Review flight fare alert for December trip`;
      } else if (lower.includes('plan my week') || lower.includes('week')) {
        responseContent =
          `Your family week at a glance:\n• Monday–Wednesday: Standard school & work routines\n• Thursday: ${firstChild}’s PTM at 5:00 PM (both parents)\n• Friday: Family Dinner at home at 7:30 PM\n• Saturday: Carrier AC service at 11:00 AM + soccer practice\nOverall household balance looks steady and on budget.`;
      } else {
        responseContent = `I looked across your ${familyName} schedule, household appliances, and bank accounts: everything is in order. Would you like me to adjust any appointments, review upcoming bills, or check the grocery list?`;
      }

      const assistantReply: AiMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        timestamp: 'Just now',
        content: responseContent,
        actionCards,
      };

      setMessages((prev) => [...prev, assistantReply]);
      setIsTyping(false);
    }, 500);
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
              <p className="text-[11px] text-slate-500 font-normal">AI + Voice · Family Operating System</p>
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
                          className="p-2 rounded-lg bg-white border border-slate-200 flex items-center justify-between gap-2"
                        >
                          <span className="font-semibold text-[11px] text-slate-900 truncate">
                            {card.title}
                          </span>
                          <button
                            onClick={() => {
                              onClose();
                              if (card.type === 'vacation_preview') onNavigateTab('travel');
                              else if (card.type === 'grocery_alert') onNavigateTab('shopping');
                              else if (card.type === 'service_booking') onNavigateTab('home');
                              else onNavigateTab('overview');
                            }}
                            className="text-[10px] font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 flex-shrink-0"
                          >
                            <span>Open</span>
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
            <span>Encrypted with Mitchell family KMS</span>
            <span>Natural language queries</span>
          </div>
        </div>
      </div>
    </div>
  );
};
