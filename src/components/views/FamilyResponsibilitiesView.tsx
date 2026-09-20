import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Check,
  Calendar,
  User,
  Filter,
  CheckCircle2,
  Trash2,
  X,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Tag,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { FamilyTaskItem } from '../../types/family';
import { AiInsightTag } from '../AlexaAudeMark';

export interface FamilyResponsibility {
  id: string;
  owner: 'Dad' | 'Mom' | 'Daughter' | 'Son' | 'Family';
  ownerName: string;
  title: string;
  category: 'Home' | 'Documents' | 'School' | 'Learning' | 'Travel + Money' | 'Finance' | 'Shopping';
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'pending' | 'in_progress' | 'completed';
  relatedEntity: string;
  reason: string;
  suggestedAction: string;
  actionExecuted?: boolean;
}

interface FamilyResponsibilitiesViewProps {
  tasks?: FamilyTaskItem[];
  onToggleTask?: (taskId: string) => void;
  onAddTask?: (task: FamilyTaskItem) => void;
  onOpenAssistant?: (query?: string) => void;
}

export const FamilyResponsibilitiesView: React.FC<FamilyResponsibilitiesViewProps> = ({
  onOpenAssistant,
}) => {
  const [responsibilities, setResponsibilities] = useState<FamilyResponsibility[]>([
    {
      id: 'resp-1',
      owner: 'Dad',
      ownerName: 'Virat',
      title: 'Schedule AC servicing',
      category: 'Home',
      dueDate: 'Tomorrow (Saturday 11:00 AM)',
      priority: 'High',
      status: 'pending',
      relatedEntity: 'Living Room Carrier 2.0 Ton Inverter AC',
      reason: 'Filter airflow sensor at 12% capacity; technician Suresh Kumar pre-slotted under OEM warranty',
      suggestedAction: 'Confirm technician access window tomorrow morning',
    },
    {
      id: 'resp-2',
      owner: 'Mom',
      ownerName: 'Anushka',
      title: 'Prepare school document',
      category: 'Documents',
      dueDate: 'Thursday (PTM 5:00 PM)',
      priority: 'Medium',
      status: 'pending',
      relatedEntity: 'Vamika Elementary Academy Term 2 Health Declaration',
      reason: 'Annual medical update and immunization clearance form required by homeroom teacher Mrs. Sharma',
      suggestedAction: 'Verify pediatric wellness clearance from Family Document Vault',
    },
    {
      id: 'resp-3',
      owner: 'Daughter',
      ownerName: 'Vamika',
      title: 'Prepare school event material',
      category: 'School',
      dueDate: 'Wednesday evening',
      priority: 'Medium',
      status: 'in_progress',
      relatedEntity: 'Science Fair: Solar System & Planetary Orbits Demonstration',
      reason: 'Elementary Academy Science Exhibition on Thursday; STEM kit arrives tomorrow via Amazon Prime',
      suggestedAction: 'Assemble motor orbiter model and test LED sun lamp',
    },
    {
      id: 'resp-4',
      owner: 'Son',
      ownerName: 'Akaay',
      title: 'Reading goal & sensory puzzle play',
      category: 'Learning',
      dueDate: 'Daily (7:30 PM routine)',
      priority: 'Low',
      status: 'pending',
      relatedEntity: 'Montessori Wooden Tactile Shapes & Picture Board',
      reason: '15-minute cognitive sensory routine before bedtime calming sequence',
      suggestedAction: 'Complete animal shape matching book with bedtime routine',
    },
    {
      id: 'resp-5',
      owner: 'Family',
      ownerName: 'All Household',
      title: 'Review December vacation budget',
      category: 'Travel + Money',
      dueDate: 'Sunday Family Meeting',
      priority: 'High',
      status: 'pending',
      relatedEntity: 'Shimla & Kufri Winter Retreat (Dec 18 – 23)',
      reason: '6-day school holiday & production hiatus alignment; ₹75,000 vacation pot fully funded',
      suggestedAction: 'Lock flight connection times and chalet nursery arrangements',
    },
    {
      id: 'resp-6',
      owner: 'Dad',
      ownerName: 'Virat',
      title: 'Pay Adani Electricity bill',
      category: 'Finance',
      dueDate: 'Sept 22 (In 3 days)',
      priority: 'High',
      status: 'pending',
      relatedEntity: 'Adani Electricity Meter #98214 (Worli Villa)',
      reason: 'Monthly bill ₹4,850 ready; 34% rise due to continuous monsoon humidity cycle',
      suggestedAction: 'Authorize pre-scheduled UPI auto-pay transaction',
    },
    {
      id: 'resp-7',
      owner: 'Mom',
      ownerName: 'Anushka',
      title: 'Authorize consolidated household batch order',
      category: 'Shopping',
      dueDate: 'Tomorrow 5:00 PM',
      priority: 'Medium',
      status: 'pending',
      relatedEntity: 'Amazon Household Cart (4 items · ₹2,625)',
      reason: 'Milk critically low (< 400ml), AC HEPA filter needed for service, Basmati rice staple depleted',
      suggestedAction: 'Approve single combined delivery window to eliminate excess packaging',
    },
    {
      id: 'resp-8',
      owner: 'Dad',
      ownerName: 'Virat',
      title: 'Replace RO water purifier filter cartridge',
      category: 'Home',
      dueDate: 'In 12 days (Oct 02)',
      priority: 'Low',
      status: 'pending',
      relatedEntity: 'Kent Grand Plus RO Mineral Purifier',
      reason: 'Sediment and carbon block nearing 6,000L filtration limit; replacement cartridge staged',
      suggestedAction: 'Review 10-minute DIY twist-lock replacement guide',
    },
  ]);

  const [filterOwner, setFilterOwner] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [actionToast, setActionToast] = useState<string | null>(null);

  const toggleComplete = (id: string) => {
    setResponsibilities((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: r.status === 'completed' ? 'pending' : 'completed',
            }
          : r
      )
    );
  };

  const handleExecuteAction = (resp: FamilyResponsibility) => {
    setResponsibilities((prev) =>
      prev.map((r) =>
        r.id === resp.id
          ? { ...r, actionExecuted: true, status: 'completed' }
          : r
      )
    );
    setActionToast(`Executed action for "${resp.title}": ${resp.suggestedAction}`);
    setTimeout(() => setActionToast(null), 4000);
  };

  const completedCount = responsibilities.filter((r) => r.status === 'completed').length;
  const progressPercent = Math.round((completedCount / (responsibilities.length || 1)) * 100);

  const filtered = responsibilities.filter((r) => {
    const matchOwner =
      filterOwner === 'All' ||
      r.owner.toLowerCase() === filterOwner.toLowerCase() ||
      (filterOwner === 'Parents' && (r.owner === 'Dad' || r.owner === 'Mom'));
    const matchCategory = filterCategory === 'All' || r.category === filterCategory;
    return matchOwner && matchCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {actionToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 text-xs shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{actionToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <AiInsightTag type="orchestrator" label="SHARED ACCOUNTABILITY" />
            <span className="text-xs font-mono text-slate-500">AUTONOMOUS ORCHESTRATION</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Family Responsibilities
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Not a basic todo list. Every responsibility is anchored to a real household entity (appliances, school calendars, documents, financial obligations, or travel pots) with clear ownership and verified reasoning.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto flex-shrink-0">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block">Household Completion</span>
            <span className="text-sm font-mono font-bold text-slate-900">
              {completedCount} / {responsibilities.length} ({progressPercent}%)
            </span>
          </div>
          <button
            onClick={() => onOpenAssistant?.('Who should handle pending responsibilities this week?')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            <span>AI Workload Balance</span>
          </button>
        </div>
      </div>

      {/* Progress Bar Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-slate-900">Weekly Household Balance & Completion</span>
          <span className="font-mono font-bold text-slate-700">{progressPercent}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-slate-900 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filters Bar: Owner Tabs */}
      <div className="flex items-center justify-between gap-4 flex-wrap pb-1 border-b border-slate-200">
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'All', label: 'All Family' },
            { id: 'Dad', label: 'Dad (Virat)' },
            { id: 'Mom', label: 'Mom (Anushka)' },
            { id: 'Daughter', label: 'Daughter (Vamika)' },
            { id: 'Son', label: 'Son (Akaay)' },
            { id: 'Family', label: 'Whole Family' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterOwner(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filterOwner === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px]">
          {['All', 'Home', 'Documents', 'School', 'Learning', 'Travel + Money', 'Finance', 'Shopping'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filterCategory === cat
                  ? 'bg-slate-200 text-slate-900 font-semibold'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Responsibilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((resp) => {
          const isDone = resp.status === 'completed';
          return (
            <div
              key={resp.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isDone
                  ? 'bg-slate-50/70 border-slate-200 text-slate-400 opacity-80'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                {/* Top meta: Owner + Category + Priority */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 text-[11px] font-semibold">
                      {resp.owner} ({resp.ownerName})
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                      {resp.category}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                      resp.priority === 'High'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : resp.priority === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {resp.priority.toUpperCase()} PRIORITY
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`text-base font-semibold text-slate-900 mb-1.5 ${
                    isDone ? 'line-through text-slate-400' : ''
                  }`}
                >
                  {resp.title}
                </h3>

                {/* Related Entity */}
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono mb-2 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Related:</span>
                  <span className="text-slate-800 font-medium truncate">{resp.relatedEntity}</span>
                </div>

                {/* Reason */}
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  <strong className="text-slate-700 font-medium">Why: </strong>
                  {resp.reason}
                </p>
              </div>

              {/* Bottom: Suggested Action + Status Controls */}
              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <div className="flex items-start gap-2 text-xs text-blue-900 bg-blue-50/60 p-2.5 rounded-xl border border-blue-100">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-mono font-semibold text-blue-700 block">
                      Recommended Action
                    </span>
                    <span className="text-slate-700 text-xs font-medium">{resp.suggestedAction}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span>Due: {resp.dueDate}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleComplete(resp.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        isDone
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {isDone ? 'Completed' : 'Mark Done'}
                    </button>

                    {!isDone && (
                      <button
                        type="button"
                        onClick={() => handleExecuteAction(resp)}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs flex items-center gap-1"
                      >
                        <span>Execute</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
