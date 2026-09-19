import React, { useState } from 'react';
import {
  Clock,
  AlertCircle,
  Calendar,
  Users,
  Wallet,
  Home,
  Bell,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Check,
  ShoppingCart,
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

// ── Shared card wrapper ──────────────────────────────────────────────────────
const Card: React.FC<{ id?: string; className?: string; children: React.ReactNode }> = ({
  id,
  className = '',
  children,
}) => (
  <section
    id={id}
    className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}
  >
    {children}
  </section>
);

// ── Shared card header ───────────────────────────────────────────────────────
const CardHeader: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}> = ({ icon, title, subtitle, right }) => (
  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
    <div className="flex items-center gap-2.5">
      <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-semibold text-slate-900 leading-tight">{title}</h2>
        {subtitle && (
          <p className="text-[11px] text-slate-400 font-normal leading-tight mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
    {right && <div className="flex-shrink-0">{right}</div>}
  </div>
);

// ── Nav link ─────────────────────────────────────────────────────────────────
const NavLink: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-0.5 transition-colors"
  >
    {label}
    <ChevronRight className="h-3.5 w-3.5" />
  </button>
);

// ─────────────────────────────────────────────────────────────────────────────

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  familyMembers,
  todayTimeline,
  needsAttention,
  upcomingEvents,
  homeDevices,
  announcements,
  financialHealth,
  householdProfile,
  onNavigateTab,
  onOpenAssistant,
  onActionClick,
}) => {
  const [completedTimelineIds, setCompletedTimelineIds] = useState<string[]>([
    'tl-1', 'tl-2', 'tl-3', 'tl-4',
  ]);
  const [confirmedAttentionIds, setConfirmedAttentionIds] = useState<string[]>([]);
  const [actionToast, setActionToast] = useState<string | null>(null);

  const toggleTimelineItem = (id: string) => {
    setCompletedTimelineIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAttentionAction = (item: NeedsAttentionItem) => {
    setConfirmedAttentionIds((prev) => [...prev, item.id]);
    setActionToast(`Recorded: ${item.actionLabel} — "${item.title}"`);
    setTimeout(() => setActionToast(null), 3000);
    onActionClick(item.actionType, item.title);
  };

  const attentionAiType = (title: string): 'smarthome' | 'family' | 'shopping' | 'treasury' | 'insight' => {
    const t = title.toLowerCase();
    if (t.includes('ac') || t.includes('purifier')) return 'smarthome';
    if (t.includes('ptm') || t.includes('pickup') || t.includes('school')) return 'family';
    if (t.includes('milk') || t.includes('grocery')) return 'shopping';
    if (t.includes('bill') || t.includes('electric')) return 'treasury';
    return 'insight';
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-16">

      {/* ── Toast ── */}
      {actionToast && (
        <div className="fixed bottom-24 right-6 z-50 flex items-center gap-2 rounded-lg bg-slate-900 text-white px-4 py-3 text-xs shadow-xl border border-slate-700">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
          <span>{actionToast}</span>
        </div>
      )}

      {/* ── Status bar ── */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-slate-900">
            {householdProfile?.familyName
              ? `${householdProfile.familyName} OS`
              : 'Household OS'}{' '}
            Active
          </span>
          <span className="text-slate-300 hidden sm:inline">·</span>
          <span className="text-slate-500 hidden sm:inline">
            Scheduling, energy monitoring &amp; predictive replenishment
          </span>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider hidden sm:block">
          {householdProfile?.disclaimerNote ?? 'DEMO DATA'}
        </span>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          ROW 1 — Today  +  Needs Attention
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

        {/* ── Today timeline (7 cols) ── */}
        <Card id="section-today" className="lg:col-span-7">
          <CardHeader
            icon={<Clock className="h-4 w-4" />}
            title="Today"
            subtitle="Coordinated timeline with conflict resolution"
            right={<NavLink label="Full calendar" onClick={() => onNavigateTab('calendar')} />}
          />
          <div className="px-5 py-4">
            <div className="relative pl-1 space-y-1">
              {/* Vertical rule */}
              <div className="absolute left-[22px] top-4 bottom-4 w-px bg-slate-100" />

              {todayTimeline.map((item, index) => {
                const isDone = completedTimelineIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    id={`timeline-item-${item.id}`}
                    className={`relative flex items-start gap-3 px-2 py-2.5 rounded-lg transition-colors ${
                      isDone ? 'opacity-60' : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* Step marker */}
                    <button
                      onClick={() => toggleTimelineItem(item.id)}
                      className={`relative z-10 h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0 transition-all ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border-2 border-slate-200 text-slate-500 hover:border-blue-400 hover:text-blue-600'
                      }`}
                      title={isDone ? 'Mark incomplete' : 'Mark complete'}
                    >
                      {isDone ? <Check className="h-3.5 w-3.5 stroke-[2.5]" /> : index + 1}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-slate-500 font-mono">
                            {item.time}
                          </span>
                          <span className="text-slate-200">·</span>
                          <span className="text-xs font-medium text-slate-900">
                            {item.title}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${
                            item.category === 'family'
                              ? 'bg-purple-50 text-purple-700 border-purple-100'
                              : item.category === 'health'
                              ? 'bg-rose-50 text-rose-700 border-rose-100'
                              : item.category === 'school' || item.category === 'pickup'
                              ? 'bg-amber-50 text-amber-700 border-amber-100'
                              : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>

                      {item.location && (
                        <p className="text-[11px] text-slate-400 mt-0.5 truncate">{item.location}</p>
                      )}

                      {item.conflictWarning && (
                        <div className="mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                          <div className="flex items-center gap-1.5 mb-1">
                            <AiInsightTag type="family" label="FAMILY" />
                          </div>
                          <div className="flex items-start gap-1.5">
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="leading-snug">{item.conflictWarning}</p>
                              {item.pickupAssignedTo && (
                                <span className="inline-block mt-1 text-[10px] font-semibold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
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
          </div>
        </Card>

        {/* ── Needs Attention (5 cols) ── */}
        <Card id="section-attention" className="lg:col-span-5">
          <CardHeader
            icon={<AlertCircle className="h-4 w-4 text-amber-600" />}
            title="Needs Attention"
            subtitle="Prioritised action queue"
            right={
              <span className="text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                Prioritised
              </span>
            }
          />
          <div className="px-5 py-4 space-y-2.5">
            {needsAttention.map((item) => {
              const isResolved = confirmedAttentionIds.includes(item.id);
              const aiType = attentionAiType(item.title);

              return (
                <div
                  key={item.id}
                  id={`attention-item-${item.id}`}
                  className={`p-3 rounded-lg border transition-colors flex items-center justify-between gap-3 ${
                    isResolved
                      ? 'border-emerald-200 bg-emerald-50/40'
                      : 'border-slate-100 bg-slate-50/60 hover:border-slate-200'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <AiInsightTag type={aiType} />
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
                      className={`text-xs font-semibold leading-snug ${
                        isResolved ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">{item.dueDateOrStatus}</p>
                  </div>

                  <button
                    onClick={() => handleAttentionAction(item)}
                    disabled={isResolved}
                    className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                      isResolved
                        ? 'bg-emerald-100 text-emerald-700 cursor-default'
                        : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900'
                    }`}
                  >
                    {isResolved ? 'Done' : item.actionLabel}
                  </button>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          ROW 2 — Family Status  +  Upcoming
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

        {/* ── Family Status (7 cols) ── */}
        <Card id="section-family-status" className="lg:col-span-7">
          <CardHeader
            icon={<Users className="h-4 w-4" />}
            title="Family Status"
            subtitle="Availability and commitments"
            right={<NavLink label="View details" onClick={() => onNavigateTab('family')} />}
          />
          <div className="px-5 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {familyMembers.map((member) => (
                <div
                  key={member.id}
                  id={`card-family-${member.id}`}
                  onClick={() => onNavigateTab('family')}
                  className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <MemberAvatar
                      member={member}
                      size="lg"
                      showStatusIndicator
                      status={member.status}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-semibold text-slate-900 truncate">
                          {member.nickname}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium px-1.5 py-0.5 rounded bg-white border border-slate-100 flex-shrink-0">
                          {member.statusLabel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 mt-1 truncate">{member.availability}</p>
                      {member.location && (
                        <p className="text-[10px] text-slate-400 mt-0.5 truncate">{member.location}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* ── Upcoming (5 cols) ── */}
        <Card id="section-upcoming" className="lg:col-span-5">
          <CardHeader
            icon={<Calendar className="h-4 w-4" />}
            title="Upcoming"
            subtitle="Next household milestones"
            right={<NavLink label="Calendar" onClick={() => onNavigateTab('calendar')} />}
          />
          <div className="px-5 py-4 space-y-2">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-3 text-xs"
              >
                <div className="flex-shrink-0 text-center">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                    {evt.dayLabel}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-slate-900 block truncate">{evt.title}</span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    {evt.member} · {evt.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          ROW 3 — Money  +  Home & Devices
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

        {/* ── Money ── */}
        <Card id="section-money">
          <CardHeader
            icon={<Wallet className="h-4 w-4" />}
            title="Money"
            subtitle="Liquidity, commitments & savings"
            right={<NavLink label="Finances" onClick={() => onNavigateTab('money')} />}
          />
          <div className="px-5 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-500 block">Available this month</span>
                <p className="text-base font-bold text-slate-900 mt-1 tracking-tight font-mono">
                  {financialHealth.currencySymbol}
                  {financialHealth.availableThisMonth.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-500 block">Upcoming commitments</span>
                <p className="text-base font-bold text-slate-900 mt-1 tracking-tight font-mono">
                  {financialHealth.currencySymbol}
                  {financialHealth.upcomingCommitments.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* Savings bar */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-medium text-slate-600">Savings goal</span>
                <span className="font-bold text-slate-900 font-mono">
                  {financialHealth.currencySymbol}
                  {financialHealth.savingsGoal.toLocaleString('en-IN')}{' '}
                  <span className="text-slate-400 font-normal">·</span>{' '}
                  {financialHealth.progressPercent}%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-slate-900 transition-all duration-500"
                  style={{ width: `${financialHealth.progressPercent}%` }}
                />
              </div>
            </div>

            {/* AI insight */}
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-xs text-emerald-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">{financialHealth.insight}</p>
            </div>
          </div>
        </Card>

        {/* ── Home & Devices ── */}
        <Card id="section-home">
          <CardHeader
            icon={<Home className="h-4 w-4" />}
            title="Home & Devices"
            subtitle="Appliance health & consumables"
            right={<NavLink label="Manage home" onClick={() => onNavigateTab('home')} />}
          />
          <div className="px-5 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {homeDevices.map((dev) => (
                <div
                  key={dev.id}
                  onClick={() => onNavigateTab('home')}
                  className="p-3 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-slate-900 truncate">{dev.name}</span>
                    <span
                      className={`h-2 w-2 rounded-full flex-shrink-0 ml-1 ${
                        dev.statusType === 'warning'
                          ? 'bg-rose-500'
                          : dev.statusType === 'attention'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[11px] font-medium block ${
                      dev.statusType === 'warning'
                        ? 'text-rose-700'
                        : dev.statusType === 'attention'
                        ? 'text-amber-700'
                        : 'text-emerald-700'
                    }`}
                  >
                    {dev.statusText}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5 truncate">{dev.detail}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <AiInsightTag type="smarthome" label="SMART HOME" />
                <span className="text-slate-600">AC usage is 34% above average.</span>
              </div>
              <button
                onClick={() => onNavigateTab('smart-devices')}
                className="font-medium text-blue-600 hover:text-blue-700 flex items-center gap-0.5 flex-shrink-0 ml-2 transition-colors"
              >
                <span>Devices</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          ROW 4 — AI Insight  +  Announcements
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

        {/* ── AlexaAude Insight (7 cols) ── */}
        <Card id="section-ai-recommendation" className="lg:col-span-7">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <AlexaAudeMark size="md" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-slate-900">AlexaAude Insight</h2>
                  <AiInsightTag type="insight" label="AI INSIGHT" />
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Calendar, school schedule &amp; savings synthesis
                </p>
              </div>
            </div>
            <span className="text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full flex-shrink-0">
              Feasibility confirmed
            </span>
          </div>

          <div className="px-5 py-4 space-y-3">
            {/* Primary insight card */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                Your family&apos;s December vacation window is available.
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                6 overlapping free days (Dec 18–23), school holidays align, and the planned ₹75,000
                budget fits within your current savings goal.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => onNavigateTab('travel')}
                  className="text-xs font-semibold px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                >
                  Plan trip
                </button>
                <button
                  onClick={() =>
                    onOpenAssistant(
                      'Can we afford a vacation in December? Show me the breakdown.'
                    )
                  }
                  className="text-xs font-medium px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  View details
                </button>
              </div>
            </div>

            {/* Grocery prediction */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-slate-600" />
                  <span className="text-xs font-semibold text-slate-900">Grocery Prediction</span>
                </div>
                <button
                  onClick={() => onNavigateTab('shopping')}
                  className="text-[11px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  View basket
                </button>
              </div>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                Milk likely to run out tomorrow · Rice in 5 days · Detergent in 8 days
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActionToast('Prepared usual order via Zepto &amp; Blinkit.');
                    setTimeout(() => setActionToast(null), 3000);
                    onNavigateTab('shopping');
                  }}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-900 hover:text-white transition-all"
                >
                  Prepare usual order
                </button>
                <button
                  onClick={() => onNavigateTab('shopping')}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Review basket
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* ── Announcements (5 cols) ── */}
        <Card id="section-announcements" className="lg:col-span-5">
          <CardHeader
            icon={<Bell className="h-4 w-4" />}
            title="Announcements"
            subtitle="Recent household updates"
            right={
              <span className="text-[10px] text-slate-400 font-medium">
                {announcements.length} total
              </span>
            }
          />
          <div className="px-5 py-4 space-y-2">
            {announcements.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 transition-colors flex items-start justify-between gap-2"
              >
                <div className="flex items-start gap-2 min-w-0 flex-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300 flex-shrink-0 mt-1.5" />
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-slate-800 block leading-snug">
                      {item.title}
                    </span>
                    {item.detail && (
                      <span className="text-[11px] text-slate-500 block mt-0.5 leading-normal">
                        {item.detail}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 flex-shrink-0 mt-0.5">
                  {item.timeAgo}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
