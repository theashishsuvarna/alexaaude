import React, { useState } from 'react';
import {
  Clock,
  AlertCircle,
  Calendar,
  Users,
  Wallet,
  Home,
  Sparkles,
  Bell,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Wind,
  Waves,
  Refrigerator,
  Droplets,
  Wifi,
  ShieldCheck,
  Check,
  Plane,
  FileText,
  CreditCard,
  ShoppingCart,
  Cpu,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import {
  FamilyMember,
  TodayTimelineItem,
  NeedsAttentionItem,
  UpcomingEventItem,
  HomeDeviceStatus,
  AnnouncementItem,
  FinancialHealth,
  GroceryItem,
} from '../types/family';
import { MemberAvatar } from './MemberAvatar';
import { AiInsightTag, AlexaAudeMark } from './AlexaAudeMark';

interface DashboardOverviewProps {
  familyMembers: FamilyMember[];
  todayTimeline: TodayTimelineItem[];
  needsAttention: NeedsAttentionItem[];
  upcomingEvents: UpcomingEventItem[];
  homeDevices: HomeDeviceStatus[];
  announcements: AnnouncementItem[];
  financialHealth: FinancialHealth;
  groceries?: GroceryItem[];
  householdProfile?: {
    familyName: string;
    disclaimerNote: string;
  };
  onNavigateTab: (tab: string) => void;
  onOpenAssistant: (query?: string) => void;
  onActionClick: (actionType: string, itemTitle: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  familyMembers,
  todayTimeline,
  needsAttention,
  upcomingEvents,
  homeDevices,
  announcements,
  financialHealth,
  groceries = [],
  householdProfile,
  onNavigateTab,
  onOpenAssistant,
  onActionClick,
}) => {
  const [completedTimelineIds, setCompletedTimelineIds] = useState<string[]>(['tl-1', 'tl-2', 'tl-3', 'tl-4']);
  const [confirmedAttentionIds, setConfirmedAttentionIds] = useState<string[]>([]);
  const [actionToast, setActionToast] = useState<string | null>(null);

  const toggleTimelineItem = (id: string) => {
    setCompletedTimelineIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAttentionAction = (item: NeedsAttentionItem) => {
    setConfirmedAttentionIds((prev) => [...prev, item.id]);
    setActionToast(`Action recorded: ${item.actionLabel} for "${item.title}"`);
    setTimeout(() => setActionToast(null), 3000);
    onActionClick(item.actionType, item.title);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Action Toast Feedback */}
      {actionToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 text-xs shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{actionToast}</span>
        </div>
      )}

      {/* Demo Mode Notice Pill */}
      <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-900">
            {householdProfile?.familyName ? `${householdProfile.familyName} OS` : 'Household Intelligence Engine'} Active
          </span>
          <span className="text-slate-400">·</span>
          <span>Proactive scheduling, energy monitoring & predictive replenishment</span>
        </div>
        <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider hidden sm:inline-block">
          {householdProfile?.disclaimerNote || 'DEMO HOUSEHOLD DATA'}
        </span>
      </div>

      {/* ============================================================ */}
      {/* TOP ROW: SECTION 1 (TODAY TIMELINE) + SECTION 2 (NEEDS ATTENTION) */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SECTION 1 — TODAY (7 COLS) */}
        <section
          id="section-today"
          className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Today</h2>
                <p className="text-xs text-slate-500 font-normal">
                  Coordinated timeline with proactive conflict resolution
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('calendar')}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Full calendar</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Visual Timeline */}
          <div className="relative pl-2 space-y-3">
            {/* Vertical timeline rule */}
            <div className="absolute left-[24px] top-3 bottom-4 w-[2px] bg-slate-100" />

            {todayTimeline.map((item, index) => {
              const isDone = completedTimelineIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  id={`timeline-item-${item.id}`}
                  className={`relative flex items-start gap-3.5 p-2.5 rounded-xl transition-all ${
                    isDone ? 'bg-slate-50/60 opacity-80' : 'hover:bg-slate-50/80'
                  }`}
                >
                  {/* Timeline point marker */}
                  <button
                    onClick={() => toggleTimelineItem(item.id)}
                    className={`relative z-10 h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                      isDone
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                        : 'bg-white border-2 border-slate-300 text-slate-600 hover:border-blue-500 hover:text-blue-600'
                    }`}
                    title={isDone ? 'Mark uncompleted' : 'Mark completed'}
                  >
                    {isDone ? <Check className="h-3.5 w-3.5 stroke-[2.5]" /> : index + 1}
                  </button>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-900 font-mono tracking-tight">
                          {item.time}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs font-medium text-slate-800">
                          {item.title}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          item.category === 'family'
                            ? 'bg-purple-50 text-purple-700 border border-purple-100'
                            : item.category === 'health'
                            ? 'bg-rose-50 text-rose-700 border border-rose-100'
                            : item.category === 'school' || item.category === 'pickup'
                            ? 'bg-amber-50 text-amber-700 border border-amber-100'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {item.category}
                      </span>
                    </div>

                    {item.location && (
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">{item.location}</p>
                    )}

                    {/* Proactive Conflict Warning Callout */}
                    {item.conflictWarning && (
                      <div className="mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 text-xs text-amber-900">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <AiInsightTag type="family" label="FAMILY AI" />
                        </div>
                        <div className="flex items-start gap-1.5">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="leading-snug">{item.conflictWarning}</p>
                            {item.pickupAssignedTo && (
                              <span className="inline-block mt-1 font-semibold text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                                Handled by: {item.pickupAssignedTo}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2 — NEEDS YOUR ATTENTION (5 COLS) */}
        <section
          id="section-attention"
          className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertCircle className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Needs your attention</h2>
                <p className="text-xs text-slate-500 font-normal">Prioritized action queue for household</p>
              </div>
            </div>
            <span className="text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full">
              Prioritized
            </span>
          </div>

          <div className="space-y-3">
            {needsAttention.map((item) => {
              const isResolved = confirmedAttentionIds.includes(item.id);
              const lowerTitle = item.title.toLowerCase();
              const aiType = lowerTitle.includes('ac') || lowerTitle.includes('purifier')
                ? { type: 'smarthome' as const, label: 'SMART HOME AI' }
                : lowerTitle.includes('ptm') || lowerTitle.includes('pickup') || lowerTitle.includes('school')
                ? { type: 'family' as const, label: 'FAMILY AI' }
                : lowerTitle.includes('milk') || lowerTitle.includes('grocery')
                ? { type: 'shopping' as const, label: 'SHOPPING AI' }
                : lowerTitle.includes('bill') || lowerTitle.includes('electric')
                ? { type: 'treasury' as const, label: 'TREASURY AI' }
                : { type: 'insight' as const, label: 'PROACTIVE AI' };

              return (
                <div
                  key={item.id}
                  id={`attention-item-${item.id}`}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    isResolved
                      ? 'border-emerald-200 bg-emerald-50/40 text-emerald-900'
                      : 'border-slate-100 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <AiInsightTag type={aiType.type} label={aiType.label} className="text-[9px] py-0 px-1.5" />
                      <span
                        className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                          isResolved
                            ? 'bg-emerald-500'
                            : item.urgency === 'high'
                            ? 'bg-rose-500'
                            : item.urgency === 'medium'
                            ? 'bg-amber-500'
                            : 'bg-blue-500'
                        }`}
                      />
                    </div>
                    <h3
                      className={`text-xs font-semibold truncate ${
                        isResolved ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">{item.dueDateOrStatus}</p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleAttentionAction(item)}
                    disabled={isResolved}
                    className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                      isResolved
                        ? 'bg-emerald-100 text-emerald-700 cursor-default'
                        : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-xs'
                    }`}
                  >
                    {isResolved ? 'Done' : item.actionLabel}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* MIDDLE ROW: SECTION 4 (FAMILY STATUS) + SECTION 3 (UPCOMING) */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SECTION 4 — FAMILY STATUS (7 COLS) */}
        <section
          id="section-family-status"
          className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Family Status</h2>
                <p className="text-xs text-slate-500 font-normal">Real-time availability and commitments</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('family')}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View details</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {familyMembers.map((member) => (
              <div
                key={member.id}
                id={`card-family-${member.id}`}
                onClick={() => onNavigateTab('family')}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-xs transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <MemberAvatar
                    member={member}
                    size="lg"
                    showStatusIndicator
                    status={member.status}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-900">{member.nickname}</span>
                      <span className="text-[10px] text-slate-500 font-medium px-1.5 py-0.5 rounded bg-white border border-slate-100">
                        {member.statusLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium mt-1 truncate">{member.availability}</p>
                    {member.location && (
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate">{member.location}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3 — UPCOMING (5 COLS) */}
        <section
          id="section-upcoming"
          className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Upcoming</h2>
                <p className="text-xs text-slate-500 font-normal">Next key household milestones</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('calendar')}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Calendar</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between text-xs"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[10px] uppercase tracking-wider text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200/60">
                      {evt.dayLabel}
                    </span>
                    <span className="font-semibold text-slate-900 truncate">{evt.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 pl-1">
                    {evt.member} · {evt.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* LOWER ROW: SECTION 5 (MONEY) + SECTION 6 (HOME & SMART DEVICES) */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SECTION 5 — MONEY (6 COLS) */}
        <section
          id="section-money"
          className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <Wallet className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Money</h2>
                <p className="text-xs text-slate-500 font-normal">Monthly liquidity, commitments & savings</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('money')}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Finances</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
              <span className="text-[11px] font-medium text-slate-500 block">Available this month</span>
              <p className="text-lg font-bold text-slate-900 mt-0.5 tracking-tight font-mono">
                {financialHealth.currencySymbol}{financialHealth.availableThisMonth.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
              <span className="text-[11px] font-medium text-slate-500 block">Upcoming commitments</span>
              <p className="text-lg font-bold text-slate-900 mt-0.5 tracking-tight font-mono">
                {financialHealth.currencySymbol}{financialHealth.upcomingCommitments.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          {/* Savings Progress Bar */}
          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 mb-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-slate-600">Savings goal</span>
              <span className="font-bold text-slate-900 font-mono">
                {financialHealth.currencySymbol}{financialHealth.savingsGoal.toLocaleString('en-IN')} · {financialHealth.progressPercent}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-slate-900 transition-all duration-500"
                style={{ width: `${financialHealth.progressPercent}%` }}
              />
            </div>
          </div>

          {/* AI Financial Insight */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium leading-relaxed">{financialHealth.insight}</p>
            </div>
          </div>
        </section>

        {/* SECTION 6 — HOME STATUS (6 COLS) */}
        <section
          id="section-home"
          className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <Home className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Home & Devices</h2>
                <p className="text-xs text-slate-500 font-normal">Appliance health, telemetry & consumables</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('home')}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Manage home</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {homeDevices.map((dev) => (
              <div
                key={dev.id}
                onClick={() => onNavigateTab('home')}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-slate-200 hover:shadow-xs transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900">{dev.name}</span>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      dev.statusType === 'warning'
                        ? 'bg-rose-500'
                        : dev.statusType === 'attention'
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                  />
                </div>
                <div className="mt-2">
                  <span
                    className={`text-xs font-medium block ${
                      dev.statusType === 'warning'
                        ? 'text-rose-700'
                        : dev.statusType === 'attention'
                        ? 'text-amber-700'
                        : 'text-emerald-700'
                    }`}
                  >
                    {dev.statusText}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5 truncate">{dev.detail}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick link to Smart Devices view with Smart Home AI tag */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <AiInsightTag type="smarthome" label="SMART HOME AI" />
              <span className="text-slate-700 font-medium">AC usage is 34% higher than your household average.</span>
            </div>
            <button
              onClick={() => onNavigateTab('smart-devices')}
              className="font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 flex-shrink-0"
            >
              <span>Device Intelligence</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* BOTTOM ROW: SHOPPING PREDICTION + AI RECOMMENDATION + ANNOUNCEMENTS */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SECTION 7 — AI RECOMMENDATION (ALEXAAUDE INSIGHT) (7 COLS) */}
        <section
          id="section-ai-recommendation"
          className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2.5">
              <AlexaAudeMark size="md" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-slate-900">AlexaAude Insight</h2>
                  <AiInsightTag type="insight" label="ALEXAAUDE AI INSIGHT" />
                </div>
                <p className="text-xs text-slate-500 font-normal">Cross-system calendar, school schedule & savings synthesis</p>
              </div>
            </div>
            <span className="text-[11px] font-medium text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
              Feasibility confirmed
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900">
              Your family&apos;s December vacation window is available.
            </h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Your family has 6 overlapping free days (Dec 18–23), the children&apos;s school holiday matches those dates, and the planned ₹75,000 budget fits within your current savings goal pot.
            </p>

            <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-slate-200/60">
              <button
                onClick={() => onNavigateTab('travel')}
                className="text-xs font-semibold px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
              >
                Plan trip
              </button>
              <button
                onClick={() => onOpenAssistant('Can we afford a vacation in December? Show me the breakdown.')}
                className="text-xs font-medium px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                View details
              </button>
            </div>
          </div>

          {/* Grocery Replenishment Quick Bar (Section 13) */}
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-slate-700" />
                <span className="text-xs font-semibold text-slate-900">Grocery Prediction</span>
              </div>
              <button
                onClick={() => onNavigateTab('shopping')}
                className="text-[11px] font-medium text-blue-600 hover:text-blue-700"
              >
                View basket
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Milk likely to run out tomorrow · Rice in 5 days · Detergent in 8 days
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActionToast('Prepared usual order with Zepto & Blinkit staples cart.');
                  setTimeout(() => setActionToast(null), 3000);
                  onNavigateTab('shopping');
                }}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-900 hover:text-white transition-all shadow-xs"
              >
                Prepare usual order
              </button>
              <button
                onClick={() => onNavigateTab('shopping')}
                className="text-xs font-medium px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900"
              >
                Review household basket
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 8 — ANNOUNCEMENTS (5 COLS) */}
        <section
          id="section-announcements"
          className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Announcements</h2>
                <p className="text-xs text-slate-500 font-normal">Recent updates across the household</p>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">{announcements.length} total</span>
          </div>

          <div className="space-y-2">
            {announcements.map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition-colors flex items-start justify-between text-xs gap-2"
              >
                <div className="flex items-start gap-2 min-w-0 flex-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0 mt-1.5" />
                  <div>
                    <span className="font-medium text-slate-800 block leading-snug">{item.title}</span>
                    {item.detail && (
                      <span className="text-[11px] text-slate-500 block mt-0.5 leading-normal">{item.detail}</span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 flex-shrink-0">{item.timeAgo}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
