import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronRight,
  Plus,
  Home,
  GraduationCap,
  Sparkle,
  Truck,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { LifeEventPlan } from '../../types/family';

interface LifeEventsViewProps {
  lifeEvents: LifeEventPlan[];
  onOpenAssistant: (query?: string) => void;
}

export const LifeEventsView: React.FC<LifeEventsViewProps> = ({
  lifeEvents,
  onOpenAssistant,
}) => {
  const [plans, setPlans] = useState<LifeEventPlan[]>(lifeEvents);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(lifeEvents[0]?.id || '');
  const [actionToast, setActionToast] = useState<string | null>(null);

  const activePlan = plans.find((p) => p.id === selectedPlanId) || plans[0];

  const toggleTask = (planId: string, taskId: string) => {
    setPlans((prev) =>
      prev.map((plan) => {
        if (plan.id !== planId) return plan;
        const updatedTasks = plan.tasks.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        );
        const completedCount = updatedTasks.filter((t) => t.completed).length;
        const progress = Math.round((completedCount / updatedTasks.length) * 100);
        return {
          ...plan,
          tasks: updatedTasks,
          progressPercent: progress,
        };
      })
    );
  };

  const getPlanIcon = (category: LifeEventPlan['category']) => {
    switch (category) {
      case 'school_year':
        return <GraduationCap className="h-5 w-5 text-blue-600" />;
      case 'festival':
        return <Sparkles className="h-5 w-5 text-amber-500" />;
      case 'moving':
        return <Truck className="h-5 w-5 text-emerald-600" />;
      case 'renovation':
        return <Home className="h-5 w-5 text-purple-600" />;
      default:
        return <Target className="h-5 w-5 text-slate-700" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast */}
      {actionToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 text-xs shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{actionToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Household Orchestration Engine
            </span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              COORDINATED CHECKLISTS
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Major Life Event Planning</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            AlexaAude automatically generates multi-week synchronized checklists for relocations, school terms, and festivals.
          </p>
        </div>

        <button
          onClick={() => onOpenAssistant('Help us plan our upcoming festival celebration with a synchronized family checklist.')}
          className="text-xs font-semibold px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs flex items-center gap-1.5 self-start md:self-auto"
        >
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span>New Coordinated Event</span>
        </button>
      </div>

      {/* Event Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const isSelected = plan.id === activePlan.id;
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-slate-900 bg-white shadow-xs ring-1 ring-slate-900'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  {getPlanIcon(plan.category)}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
                  {plan.targetDate}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-slate-900">{plan.title}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{plan.description}</p>

              {/* Progress bar */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-500 font-medium">Readiness</span>
                  <span className="font-bold text-slate-900">{plan.progressPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-900 rounded-full transition-all duration-300"
                    style={{ width: `${plan.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Event Coordinated Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
              {getPlanIcon(activePlan.category)}
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">{activePlan.title}</h3>
              <p className="text-xs text-slate-500">{activePlan.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
              {activePlan.tasks.filter((t) => t.completed).length} of {activePlan.tasks.length} Completed
            </span>
          </div>
        </div>

        {/* Task List grouped by phase */}
        <div className="space-y-3">
          {activePlan.tasks.map((task) => {
            return (
              <div
                key={task.id}
                onClick={() => toggleTask(activePlan.id, task.id)}
                className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                  task.completed
                    ? 'border-emerald-100 bg-emerald-50/40 text-slate-500'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all ${
                      task.completed
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white hover:border-slate-400'
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <span
                      className={`text-xs font-medium block ${
                        task.completed ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {task.title}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                      <span>Phase: {task.phase}</span>
                      <span className="text-slate-300">·</span>
                      <span className="font-semibold text-slate-700">Assigned: {task.assignedTo}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                    {task.dueDate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
