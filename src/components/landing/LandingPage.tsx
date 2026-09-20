import React, { useState } from 'react';
import { LandingNavbar } from './LandingNavbar';
import { AlexaAudeMark, AiInsightTag } from '../AlexaAudeMark';
import {
  Users,
  Sparkles,
  Home,
  Calendar,
  Wallet,
  ShoppingCart,
  Plane,
  Radio,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Zap,
  ShieldCheck,
  Search,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  TrendingUp,
  Cpu,
  RefreshCw,
  BellRing,
  Layers,
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (route: string) => void;
  onOpenDashboardTab?: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenDashboardTab,
}) => {
  // Interactive state for proactive intelligence sample actions
  const [activeActions, setActiveActions] = useState<Record<string, boolean>>({});
  const [activeDemoPill, setActiveDemoPill] = useState<string>('all');

  const handleActionClick = (id: string) => {
    setActiveActions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleGoToDashboard = (tab?: string) => {
    if (tab && onOpenDashboardTab) {
      onOpenDashboardTab(tab);
    }
    onNavigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-100 selection:text-cyan-900 font-sans">
      {/* Top Navigation */}
      <LandingNavbar
        onNavigate={onNavigate}
        onExploreDemo={() => handleGoToDashboard('overview')}
      />

      {/* =========================================================================
          SECTION 1 — HERO
          ========================================================================= */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-50">
        {/* Subtle background acoustic grid & ambient glow */}
        <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center opacity-40">
          <div className="w-[800px] h-[500px] bg-gradient-to-tr from-cyan-100/40 via-blue-100/30 to-slate-100/20 rounded-full blur-3xl transform -translate-y-12" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Tagline / Brand pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-mono font-medium shadow-xs mb-6">
              <AlexaAudeMark size="sm" />
              <span>Your family&apos;s AI. Your life&apos;s operating system.</span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 text-balance leading-[1.1]">
              One AI that keeps your family running.
            </h1>

            {/* Hero Description */}
            <p className="mt-6 text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto text-balance">
              AlexaAude understands your family&apos;s schedules, finances, home, shopping, travel and everyday responsibilities — then helps you plan, coordinate and act on what matters.
            </p>

            {/* Hero Subtext */}
            <p className="mt-3 text-xs sm:text-sm text-slate-500 font-normal max-w-2xl mx-auto">
              From tomorrow&apos;s schedule to next month&apos;s vacation, AlexaAude connects the pieces of family life and helps you handle what comes next.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => onNavigate('/signup')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('how-it-thinks');
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-slate-800 text-sm font-semibold hover:bg-slate-100 transition-colors border border-slate-300/80 shadow-xs cursor-pointer"
              >
                <span>See how it works</span>
              </button>

              <button
                onClick={() => handleGoToDashboard('overview')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-50 text-blue-700 text-sm font-semibold hover:bg-blue-100 transition-colors border border-blue-200 cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span>Explore Live Demo OS</span>
              </button>
            </div>

            {/* Trust line */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
              <Radio className="h-3.5 w-3.5 text-cyan-600 animate-pulse" />
              <span>Family intelligence • Smart home • Planning • Automation</span>
            </div>
          </div>

          {/* =========================================================================
              HERO SUBTLE AI / VOICE VISUAL
              Representing: Family, AI, Smart Home, Calendar, Money, Shopping, Travel
              ========================================================================= */}
          <div className="mt-14 relative max-w-5xl mx-auto">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-slate-200/90 shadow-xl backdrop-blur-sm">
              {/* Top ambient status line */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700">
                    Live Context Synthesis Engine
                  </span>
                  <AiInsightTag type="orchestrator" label="FAMILY INTELLIGENCE" />
                </div>
                <div className="text-xs font-mono text-slate-500">
                  7 Household Domains Connected in Real Time
                </div>
              </div>

              {/* Central Orbit Network Visual */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
                {/* 1. Family */}
                <div
                  onClick={() => handleGoToDashboard('family')}
                  className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer text-center group"
                >
                  <div className="h-10 w-10 mx-auto rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Family</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">4 Members & Roles</div>
                </div>

                {/* 2. AI */}
                <div
                  onClick={() => handleGoToDashboard('overview')}
                  className="p-3.5 rounded-2xl border border-cyan-300/80 bg-cyan-50/50 hover:bg-white hover:border-cyan-400 hover:shadow-sm transition-all cursor-pointer text-center group ring-1 ring-cyan-200"
                >
                  <div className="h-10 w-10 mx-auto rounded-xl bg-slate-900 text-cyan-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <AlexaAudeMark size="sm" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">AI Core</div>
                  <div className="text-[10px] text-cyan-700 font-medium mt-0.5">Context Synthesis</div>
                </div>

                {/* 3. Smart Home */}
                <div
                  onClick={() => handleGoToDashboard('smart-devices')}
                  className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer text-center group"
                >
                  <div className="h-10 w-10 mx-auto rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Home className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Smart Home</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Appliances & Energy</div>
                </div>

                {/* 4. Calendar */}
                <div
                  onClick={() => handleGoToDashboard('calendar')}
                  className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer text-center group"
                >
                  <div className="h-10 w-10 mx-auto rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Calendar</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Overlap Detection</div>
                </div>

                {/* 5. Money */}
                <div
                  onClick={() => handleGoToDashboard('money')}
                  className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer text-center group"
                >
                  <div className="h-10 w-10 mx-auto rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Money</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Pots & Commitments</div>
                </div>

                {/* 6. Shopping */}
                <div
                  onClick={() => handleGoToDashboard('shopping')}
                  className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer text-center group"
                >
                  <div className="h-10 w-10 mx-auto rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Shopping</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Replenishment</div>
                </div>

                {/* 7. Travel */}
                <div
                  onClick={() => handleGoToDashboard('travel')}
                  className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer text-center group col-span-2 sm:col-span-1"
                >
                  <div className="h-10 w-10 mx-auto rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Plane className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Travel</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Holiday Alignment</div>
                </div>
              </div>

              {/* Dynamic live simulation preview */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 font-mono text-xs">
                    08:00
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-100 flex items-center gap-2">
                      <span>Proactive Coordination Briefing</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <p className="text-xs text-slate-400">
                      Vamika&apos;s school PTM + Anushka&apos;s production meeting + AC humidity surge handled.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleGoToDashboard('overview')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white text-slate-900 hover:bg-slate-100 transition-colors flex-shrink-0"
                >
                  <span>Launch Live Family OS</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — THE PROBLEM
          ========================================================================= */}
      <section id="problem" className="py-20 sm:py-28 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              The Modern Household Dilemma
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Family life is spread across too many places.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Every day, families try to coordinate life through nine separate silos that never talk to each other.
            </p>
          </div>

          {/* 9 Fragmented Experiences Grid */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                title: 'Calendar',
                pain: 'Clashing appointments, untracked school pickup times, and double-booked weekends.',
                icon: Calendar,
                tag: 'Scattered events',
              },
              {
                title: 'Banking',
                pain: 'Savings goals in one app, credit cards in another, and monthly household commitments forgotten.',
                icon: Wallet,
                tag: 'Blind spending',
              },
              {
                title: 'Shopping',
                pain: 'Milk runs out unexpectedly. Three family members buy duplicate essentials without knowing.',
                icon: ShoppingCart,
                tag: 'Last-minute panic',
              },
              {
                title: 'School',
                pain: 'PTM notices buried in circular PDFs, exam timetables lost in chat groups, fees due unexpectedly.',
                icon: Users,
                tag: 'PDF & circular chaos',
              },
              {
                title: 'Bills',
                pain: 'Electricity, piped gas, broadband, and society maintenance scattered across separate portals.',
                icon: Zap,
                tag: 'Late fee traps',
              },
              {
                title: 'Home Appliances',
                pain: 'Water purifier filters expire unaddressed; ACs run inefficiently with monsoon humidity surges.',
                icon: Home,
                tag: 'Silent breakdown',
              },
              {
                title: 'Travel',
                pain: 'Never knowing if leave days, school holidays, and holiday budgets actually align until it’s too late.',
                icon: Plane,
                tag: 'Uncoordinated plans',
              },
              {
                title: 'Reminders',
                pain: 'Sticky notes, fragmented reminders on phones that family members forget to share.',
                icon: BellRing,
                tag: 'Mental exhaustion',
              },
              {
                title: 'Documents',
                pain: 'Passports, immunization records, vehicle insurance, and birth certificates scattered in physical drawers.',
                icon: FileText,
                tag: 'Scrambling during emergencies',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/70 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-9 w-9 rounded-xl bg-slate-200/80 text-slate-700 flex items-center justify-center">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-200 text-slate-600">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{item.pain}</p>
                </div>
              );
            })}
          </div>

          {/* Transition Card */}
          <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <AlexaAudeMark size="sm" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300">
                    The Synthesis Breakthrough
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  AlexaAude brings the context together.
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Instead of checking nine apps, AlexaAude constructs a single, secure mental model of your family. It reasons across every domain so you make decisions with complete clarity.
                </p>
              </div>

              <button
                onClick={() => onNavigate('/signup')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-slate-900 font-semibold text-xs sm:text-sm hover:bg-slate-100 transition-colors flex-shrink-0 cursor-pointer"
              >
                <span>Experience Unified Intelligence</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — HOW ALEXAAUDE THINKS
          ========================================================================= */}
      <section id="how-it-thinks" className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
              Core Product Philosophy
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              How AlexaAude thinks.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              No silent or rogue automation. A disciplined, transparent 5-step cognitive framework.
            </p>
          </div>

          {/* 5-Step Visual Pipeline */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                step: '01',
                title: 'UNDERSTAND',
                sub: 'Your family and its context',
                desc: 'Maps household members, recurring routines, home appliances, savings pots, and commitments.',
                color: 'border-blue-300 bg-blue-50/40 text-blue-900',
                badge: 'Active Context',
              },
              {
                step: '02',
                title: 'PREDICT',
                sub: 'What is likely to happen next',
                desc: 'Anticipates grocery depletion, energy consumption spikes, scheduling overlaps, and maintenance due dates.',
                color: 'border-indigo-300 bg-indigo-50/40 text-indigo-900',
                badge: 'Proactive Model',
              },
              {
                step: '03',
                title: 'PLAN',
                sub: 'Find the best way forward',
                desc: 'Computes optimal multi-variable solutions (e.g. matching school vacations with work leave and vacation pots).',
                color: 'border-cyan-300 bg-cyan-50/40 text-cyan-900',
                badge: 'Feasibility Engine',
              },
              {
                step: '04',
                title: 'ASK',
                sub: 'Get permission when an action matters',
                desc: 'Transparently prompts family heads before spending money, dispatching technician bookings, or shifting events.',
                color: 'border-amber-300 bg-amber-50/40 text-amber-900',
                badge: 'Family Consent',
              },
              {
                step: '05',
                title: 'EXECUTE',
                sub: 'Handle the task',
                desc: 'Sends confirmation circulars, orders groceries, triggers smart home routines, and files payment receipts.',
                color: 'border-emerald-300 bg-emerald-50/40 text-emerald-900',
                badge: 'Automated Action',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border ${step.color} bg-white shadow-xs relative flex flex-col justify-between transition-all hover:shadow-md`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-400">{step.step}</span>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold tracking-tight text-slate-900">{step.title}</h3>
                  <div className="text-xs font-semibold text-slate-700 mt-0.5">{step.sub}</div>
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
                  <span>Step {idx + 1} of 5</span>
                  {idx < 4 && <ArrowRight className="h-3.5 w-3.5 text-slate-400 hidden md:block" />}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-200">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Zero action without explicit family authorization. Built for total trust.</span>
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — PRODUCT CAPABILITIES
          ========================================================================= */}
      <section id="capabilities" className="py-20 sm:py-28 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Complete Household Suite
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Engineered for every corner of family life.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Eight dedicated intelligence modules harmonized under one unified interface.
            </p>
          </div>

          {/* 8 Premium Feature Cards */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                id: 'family',
                tab: 'family',
                title: 'FAMILY',
                subtitle: 'Schedules, responsibilities and coordination',
                desc: 'Track availability, who is taking the kids to school, parent pickups, and daily responsibilities across every member.',
                icon: Users,
                meta: '4 Profiles Active',
              },
              {
                id: 'money',
                tab: 'money',
                title: 'MONEY',
                subtitle: 'Spending, commitments and savings goals',
                desc: 'Unified visibility into upcoming household bills, automated savings pots, and budget safety margins before major spending.',
                icon: Wallet,
                meta: '3 Savings Pots',
              },
              {
                id: 'home',
                tab: 'home',
                title: 'HOME',
                subtitle: 'Appliances, maintenance and smart-home intelligence',
                desc: 'Never forget an AC filter cleaning or water purifier cartridge. Service schedules booked with trusted technicians.',
                icon: Home,
                meta: '6 Appliances Tracked',
              },
              {
                id: 'shopping',
                tab: 'shopping',
                title: 'SHOPPING',
                subtitle: 'Predictive household replenishment',
                desc: 'Calculates consumption velocity for milk, rice, diapers, and coffee. Auto-generates weekly replenishment carts before you run out.',
                icon: ShoppingCart,
                meta: 'Daily Prediction',
              },
              {
                id: 'travel',
                tab: 'travel',
                title: 'TRAVEL',
                subtitle: 'Plan around leave, school holidays and budget',
                desc: 'Calculates true travel windows by intersecting parents’ calendar free days, school term breaks, and holiday savings pots.',
                icon: Plane,
                meta: 'Vacation Window Finder',
              },
              {
                id: 'ai-assistant',
                tab: 'overview',
                title: 'AI ASSISTANT',
                subtitle: 'Ask AlexaAude anything about your family',
                desc: 'Ask complex contextual queries like "Are we free this Saturday evening?" or "How much have we spent on utilities this quarter?"',
                icon: Sparkles,
                meta: 'Voice + Text Enabled',
              },
              {
                id: 'smart-devices',
                tab: 'smart-devices',
                title: 'SMART DEVICES',
                subtitle: 'Understand device usage and household energy patterns',
                desc: 'Monitors living room & bedroom IoT devices, alerting you to abnormal monsoon humidity energy surges and vampire draw.',
                icon: Zap,
                meta: 'IoT Telemetry',
              },
              {
                id: 'life-events',
                tab: 'life-events',
                title: 'LIFE EVENTS',
                subtitle: 'Coordinate birthdays, moves, school years, festivals and major purchases',
                desc: 'Multi-week project timelines for school admissions, Diwali celebrations, apartment re-painting, and milestone birthdays.',
                icon: Calendar,
                meta: 'Milestone Manager',
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => handleGoToDashboard(card.tab)}
                  className="p-6 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-10 w-10 rounded-2xl bg-slate-900 text-cyan-300 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {card.meta}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
                      {card.title}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                      {card.subtitle}
                    </h3>
                    <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                    <span>Explore in Demo OS</span>
                    <ChevronRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — REAL-LIFE EXAMPLE
          ========================================================================= */}
      <section id="example" className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Cross-Domain Intelligence in Action
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              A real-life conversation.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              See how AlexaAude synthesizes four distinct household systems to answer one simple question.
            </p>
          </div>

          {/* Interactive Conversational Scenario Container */}
          <div className="mt-12 max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Window bar */}
            <div className="h-12 px-6 bg-slate-900 text-slate-300 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <AlexaAudeMark size="sm" />
                <span className="text-xs font-mono font-medium text-slate-200">
                  AlexaAude Family Operating System · Vacation Synthesis
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-mono text-slate-400">Context Live</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* User Query Message Bubble */}
              <div className="flex items-start justify-end gap-3">
                <div className="max-w-lg bg-slate-900 text-white p-4 rounded-2xl rounded-tr-xs shadow-xs">
                  <div className="text-[10px] font-mono text-slate-400 mb-1">Virat Kohli (Household Head)</div>
                  <p className="text-sm font-medium">
                    &ldquo;Can we take a family vacation in December?&rdquo;
                  </p>
                </div>
              </div>

              {/* Context Extraction Breakdown (Visually obvious multi-signal synthesis) */}
              <div className="my-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-blue-600" />
                  <span>AlexaAude Autonomous Context Synthesis Process</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs">
                    <div className="flex items-center gap-1.5 text-blue-700 font-semibold mb-0.5">
                      <Calendar className="h-3 w-3" />
                      <span>Parents&apos; Work Calendar</span>
                    </div>
                    <span className="text-slate-600 text-[11px]">6 overlapping free days (Dec 18–23)</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs">
                    <div className="flex items-center gap-1.5 text-amber-700 font-semibold mb-0.5">
                      <Users className="h-3 w-3" />
                      <span>Kids&apos; School Schedule</span>
                    </div>
                    <span className="text-slate-600 text-[11px]">Scottish High winter break matches</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mb-0.5">
                      <Wallet className="h-3 w-3" />
                      <span>Vacation Savings Pot</span>
                    </div>
                    <span className="text-slate-600 text-[11px]">₹1,20,000 balance available</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs">
                    <div className="flex items-center gap-1.5 text-purple-700 font-semibold mb-0.5">
                      <Zap className="h-3 w-3" />
                      <span>Upcoming Commitments</span>
                    </div>
                    <span className="text-slate-600 text-[11px]">Q4 insurance & bills accounted for</span>
                  </div>
                </div>
              </div>

              {/* AlexaAude Response Bubble */}
              <div className="flex items-start gap-3.5">
                <AlexaAudeMark size="md" />
                <div className="max-w-2xl bg-white border border-slate-200 p-5 rounded-2xl rounded-tl-xs shadow-xs text-slate-900">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-900">AlexaAude</span>
                    <AiInsightTag type="insight" label="ALEXAAUDE AI INSIGHT" />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">
                    &ldquo;Your family has 6 overlapping free days during the school holiday. Based on your planned savings and upcoming commitments, a ₹75,000 trip fits your current household plan.&rdquo;
                  </p>

                  {/* Interactive Action Buttons */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => handleGoToDashboard('travel')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Plane className="h-3.5 w-3.5" />
                      <span>Plan trip</span>
                    </button>
                    <button
                      onClick={() => handleGoToDashboard('travel')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors border border-slate-200 cursor-pointer"
                    >
                      <span>View details</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — SMART HOME
          ========================================================================= */}
      <section id="smart-home" className="py-20 sm:py-28 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Household IoT & Energy Intelligence
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Your home has a story too.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Connected appliances and smart meters shouldn&apos;t just show raw numbers. AlexaAude turns device telemetry into practical household decisions.
            </p>
          </div>

          {/* 4 Demo Telemetry Cards */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. AC */}
            <div className="p-6 rounded-3xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-md transition-all relative">
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-600 absolute top-4 right-4">
                DEMO DATA
              </span>
              <div className="h-10 w-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <span className="text-xs font-mono text-slate-500 font-semibold uppercase">Air Conditioning</span>
              <div className="text-2xl font-bold text-slate-900 mt-1">34% higher usage</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Triggered by high Mumbai monsoon humidity in Master Bedroom.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center gap-1.5 text-[11px] text-amber-700 font-medium">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>Optimal setpoint suggested: 25°C</span>
              </div>
            </div>

            {/* 2. Water Purifier */}
            <div className="p-6 rounded-3xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-md transition-all relative">
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-600 absolute top-4 right-4">
                DEMO DATA
              </span>
              <div className="h-10 w-10 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center mb-4">
                <RefreshCw className="h-5 w-5" />
              </div>
              <span className="text-xs font-mono text-slate-500 font-semibold uppercase">Water Purifier</span>
              <div className="text-2xl font-bold text-slate-900 mt-1">Filter replacement soon</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Cartridge efficiency at 14%. 12 days remaining based on daily consumption.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center gap-1.5 text-[11px] text-cyan-700 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Kent RO cartridge on shopping list</span>
              </div>
            </div>

            {/* 3. Washing Machine */}
            <div className="p-6 rounded-3xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-md transition-all relative">
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-600 absolute top-4 right-4">
                DEMO DATA
              </span>
              <div className="h-10 w-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
                <Home className="h-5 w-5" />
              </div>
              <span className="text-xs font-mono text-slate-500 font-semibold uppercase">Washing Machine</span>
              <div className="text-2xl font-bold text-slate-900 mt-1">18 cycles this month</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Drum cleaning cycle recommended after 20 washes. Detergent stock sufficient.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center gap-1.5 text-[11px] text-indigo-700 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Optimal tub maintenance ready</span>
              </div>
            </div>

            {/* 4. Energy */}
            <div className="p-6 rounded-3xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-md transition-all relative">
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-600 absolute top-4 right-4">
                DEMO DATA
              </span>
              <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Wallet className="h-5 w-5" />
              </div>
              <span className="text-xs font-mono text-slate-500 font-semibold uppercase">Energy Telemetry</span>
              <div className="text-2xl font-bold text-slate-900 mt-1">₹1,850 estimated</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Projected additional electricity spend this billing cycle.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Comfortably within utility budget pot</span>
              </div>
            </div>
          </div>

          {/* Conclusion bar */}
          <div className="mt-10 p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlexaAudeMark size="md" />
              <div>
                <h3 className="text-sm font-semibold text-white">
                  AlexaAude turns device activity into useful household decisions.
                </h3>
                <p className="text-xs text-slate-400">
                  Connect smart plugs, thermostats, and appliances with end-to-end local privacy.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleGoToDashboard('smart-devices')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-semibold hover:bg-slate-100 transition-colors flex-shrink-0 cursor-pointer"
            >
              <span>Explore Device View</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — PROACTIVE INTELLIGENCE
          ========================================================================= */}
      <section id="proactive" className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Zero Mental Load
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Don&apos;t wait for your family to remember.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Proactive alerts resolve issues before they become household crises.
            </p>
          </div>

          {/* 5 Proactive Cards with Small Action Buttons */}
          <div className="mt-14 max-w-3xl mx-auto space-y-3.5">
            {[
              {
                id: 'ac-service',
                title: 'Your AC service is due tomorrow.',
                context: 'Urban Company certified technician slot scheduled for 10:00 AM.',
                btnText: 'Schedule service',
                doneText: 'Service Confirmed (10 AM)',
                icon: Home,
                type: 'smarthome',
                tab: 'home',
              },
              {
                id: 'milk-replenish',
                title: 'Milk is likely to run out tomorrow.',
                context: 'Estimated 0.4L remaining based on family morning consumption.',
                btnText: 'Add to cart',
                doneText: 'Added to BigBasket Basket',
                icon: ShoppingCart,
                type: 'shopping',
                tab: 'shopping',
              },
              {
                id: 'insurance-renewal',
                title: 'Your insurance renewal is approaching.',
                context: 'HDFC Ergo Family Floiter due in 11 days. ₹42,000 allocated in treasury.',
                btnText: 'Review policy',
                doneText: 'Policy Verified & Set',
                icon: Wallet,
                type: 'treasury',
                tab: 'money',
              },
              {
                id: 'ptm-pending',
                title: 'A school PTM confirmation is pending.',
                context: 'Vamika’s Class 1 conference with Mrs. Sharma. 2:30 PM slot open.',
                btnText: 'Confirm attendance',
                doneText: 'Confirmed with Scottish High',
                icon: Users,
                type: 'family',
                tab: 'overview',
              },
              {
                id: 'travel-window',
                title: 'Your family’s December travel window is available.',
                context: '6 overlapping free days (Dec 18–23) with matching school term break.',
                btnText: 'Explore flights',
                doneText: 'Flight Options Loaded',
                icon: Plane,
                type: 'travel',
                tab: 'travel',
              },
            ].map((item) => {
              const Icon = item.icon;
              const isDone = !!activeActions[item.id];
              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isDone
                      ? 'bg-emerald-50/60 border-emerald-200'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-900 text-cyan-300'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                        <AiInsightTag type={item.type as any} className="text-[9px]" />
                      </div>
                      <p className="text-xs text-slate-500">{item.context}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                    <button
                      onClick={() => handleActionClick(item.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      {isDone ? item.doneText : item.btnText}
                    </button>
                    <button
                      onClick={() => handleGoToDashboard(item.tab)}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors"
                      title="Inspect in Live OS"
                    >
                      Open
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 — FINAL CTA
          ========================================================================= */}
      <section className="py-24 sm:py-32 bg-white border-t border-slate-200 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AlexaAudeMark size="xl" className="mx-auto mb-6" />

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 text-balance leading-tight">
            Let your family focus on life.
            <br />
            <span className="text-slate-500 font-normal">AlexaAude can handle what&apos;s next.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Begin with your family schedule, connected home, or savings goals. AlexaAude learns your routines and builds trusted context every single day.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/signup')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 text-white text-base font-semibold hover:bg-slate-800 transition-all shadow-lg active:scale-98 cursor-pointer"
            >
              <span>Create your family</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => handleGoToDashboard('overview')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-100 text-slate-800 text-base font-semibold hover:bg-slate-200 transition-colors border border-slate-200 cursor-pointer"
            >
              <span>Explore AlexaAude</span>
            </button>
          </div>

          <p className="mt-6 text-xs text-slate-400 font-mono">
            Zero advertising tracking • Private family sandboxing • End-to-end encrypted
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <AlexaAudeMark size="md" />
            <div>
              <span className="text-sm font-bold text-white tracking-tight">AlexaAude</span>
              <p className="text-xs text-slate-400">Family Operating System</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors">
              Home
            </button>
            <button onClick={() => handleGoToDashboard('overview')} className="hover:text-white transition-colors">
              Live Demo
            </button>
            <button onClick={() => onNavigate('/login')} className="hover:text-white transition-colors">
              Log In
            </button>
            <button onClick={() => onNavigate('/signup')} className="hover:text-white transition-colors">
              Create Account
            </button>
          </div>

          <div className="text-xs text-slate-400 text-center md:text-right">
            © {new Date().getFullYear()} AlexaAude Technologies. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
