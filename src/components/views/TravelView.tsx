import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  Wallet,
  MapPin,
  CheckCircle2,
  Plane,
  ShieldCheck,
  AlertCircle,
  Users,
  Sparkles,
  ArrowRight,
  Clock,
  Sun,
  Shield,
  Hotel,
} from 'lucide-react';
import { VacationPlan } from '../../types/family';
import { AlexaAudeMark, AiInsightTag } from '../AlexaAudeMark';

interface TravelViewProps {
  vacationPlan: VacationPlan;
  onOpenAssistant: (query?: string) => void;
}

export const TravelView: React.FC<TravelViewProps> = ({ vacationPlan, onOpenAssistant }) => {
  const [activeDay, setActiveDay] = useState(1);
  const [bookedToast, setBookedToast] = useState<string | null>(null);

  const handleBookResort = () => {
    setBookedToast('Taj Exotica Resort & Spa reservation hold requested for Dec 18–23, 2026!');
    setTimeout(() => setBookedToast(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {bookedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 text-xs shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{bookedToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Family Vacation Blueprint
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              DEMO VACATION PLAN
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">December Vacation: {vacationPlan.destination}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{vacationPlan.targetWindow} · 5-Day Multi-generational Family Trip</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenAssistant('Plan a 5-day family vacation.')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-500" />
            <span>AI Re-plan</span>
          </button>
          <button
            onClick={handleBookResort}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 shadow-xs"
          >
            Hold Resort Rooms
          </button>
        </div>
      </div>

      {/* AI Recommendation Highlight Card (Section 14 & 15) */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4 text-xs text-slate-800">
        <AlexaAudeMark size="md" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-slate-900">Your family&apos;s December vacation window is available.</span>
            <AiInsightTag type="insight" label="ALEXAAUDE AI INSIGHT" />
          </div>
          <p className="mt-1 leading-relaxed text-slate-600">{vacationPlan.aiAffordabilityNote}</p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 self-start font-mono">
          Budget: ₹{vacationPlan.estimatedCost.toLocaleString('en-IN')}
        </span>
      </div>

      {/* Flight & Logistical Feasibility Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Flight Duration</span>
            <Plane className="h-4 w-4 text-blue-600" />
          </div>
          <p className="text-xl font-bold text-slate-900 mt-2 font-mono">1 hr 15 mins</p>
          <p className="text-xs text-slate-500 mt-1">Non-stop BOM → GOX (Indigo/Air India)</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Accommodation</span>
            <Hotel className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 mt-2">South Goa Beach Resort</p>
          <p className="text-xs text-slate-500 mt-1">Spacious family villa with kids play club for Vamika & Akaay</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">School Vacation Match</span>
            <Calendar className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-xl font-bold text-slate-900 mt-2">100% Free Days</p>
          <p className="text-xs text-emerald-700 mt-1 font-medium">Dec 18–23 aligns with Bombay Scottish winter break</p>
        </div>
      </div>

      {/* Budget Breakdown & Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Budget Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h3 className="text-base font-semibold text-slate-900 mb-1">Trip Budget Allocation</h3>
          <p className="text-xs text-slate-500 mb-4">Total planned cost: ₹{vacationPlan.estimatedCost.toLocaleString('en-IN')}</p>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="font-medium text-slate-700">Flights (6 Family Members Return)</span>
              <span className="font-bold text-slate-900 font-mono">₹{vacationPlan.budgetBreakdown.flights.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="font-medium text-slate-700">Resort Villa Stay (2 Interconnecting Rooms)</span>
              <span className="font-bold text-slate-900 font-mono">₹{vacationPlan.budgetBreakdown.stay.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="font-medium text-slate-700">Family Coastal Dining & Breakfasts</span>
              <span className="font-bold text-slate-900 font-mono">₹{vacationPlan.budgetBreakdown.dining.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="font-medium text-slate-700">Dolphin Cruise & Spice Plantation Tour</span>
              <span className="font-bold text-slate-900 font-mono">₹{vacationPlan.budgetBreakdown.activities.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <span className="font-medium text-slate-700">Emergency & Local Cab Contingency</span>
              <span className="font-bold text-slate-900 font-mono">₹{vacationPlan.budgetBreakdown.contingency.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h3 className="text-base font-semibold text-slate-900 mb-1">Vacation Highlights</h3>
          <p className="text-xs text-slate-500 mb-4">Curated activities for Virat, Anushka, Vamika & Akaay</p>

          <div className="space-y-2.5 text-xs">
            {vacationPlan.highlights.map((h, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{h}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Looking for custom dates or alternatives?</span>
            <button
              onClick={() => onOpenAssistant('What other destinations work well for our family in December under ₹1,00,000?')}
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Ask AlexaAude
            </button>
          </div>
        </div>
      </div>

      {/* Day-by-Day Itinerary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-base font-semibold text-slate-900">5-Day Multi-Generational Itinerary</h3>
            <p className="text-xs text-slate-500">Balanced pacing with downtime for grandparents and fun for the kids</p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {vacationPlan.itineraryDays.map((item) => (
              <button
                key={item.dayNumber}
                onClick={() => setActiveDay(item.dayNumber)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  activeDay === item.dayNumber
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Day {item.dayNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Day View */}
        {(() => {
          const currentDay =
            vacationPlan.itineraryDays.find((i) => i.dayNumber === activeDay) ||
            vacationPlan.itineraryDays[0];
          if (!currentDay) return null;
          return (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Day {currentDay.dayNumber}: {currentDay.title}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  Est. Cost: ₹{currentDay.costEst.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-3">{currentDay.summary}</p>
              <div className="space-y-2">
                {currentDay.activities.map((act: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/60">
                    <Clock className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
