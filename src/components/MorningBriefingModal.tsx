import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Sun,
  Calendar,
  AlertCircle,
  Wind,
  CheckCircle2,
  Play,
  Pause,
  MapPin,
} from 'lucide-react';
import { FamilyHouseholdProfile } from '../types/family';
import { AlexaAudeMark, AiInsightTag } from './AlexaAudeMark';

interface MorningBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  householdProfile: FamilyHouseholdProfile;
  onNavigateTab: (tab: string) => void;
}

export const MorningBriefingModal: React.FC<MorningBriefingModalProps> = ({
  isOpen,
  onClose,
  householdProfile,
  onNavigateTab,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const fatherName = householdProfile.members[0]?.nickname || 'Virat';
  const motherName = householdProfile.members[1]?.nickname || 'Anushka';
  const firstChildName = householdProfile.members[2]?.nickname || 'Vamika';

  const briefingPoints = [
    {
      title: 'Weather & Commute',
      detail: `${householdProfile.homeCity} is 31°C with 82% humidity and light monsoon showers. Expect typical 35-minute transit for morning routines.`,
      icon: <Sun className="h-4 w-4 text-amber-500" />,
    },
    {
      title: 'School Pickups & Coordination',
      detail: `${firstChildName} finishes school at 2:30 PM. Since ${motherName} has afternoon studio sessions and ${fatherName} has training, home staff and security transport are assigned.`,
      icon: <Calendar className="h-4 w-4 text-blue-500" />,
    },
    {
      title: 'Appliances & Maintenance',
      detail: 'Carrier AC technician Suresh Kumar arrives tomorrow at 11:00 AM. Water purifier filter has 12 days remaining.',
      icon: <Wind className="h-4 w-4 text-cyan-600" />,
    },
    {
      title: 'Treasury & Groceries',
      detail: 'Household spending is well within the monthly plan. Milk and fresh fruit basket are ready for morning approval.',
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
    },
  ];

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setCurrentStep(0);
      return;
    }
    setIsPlaying(true);
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < briefingPoints.length - 1 ? prev + 1 : prev));
    }, 3500);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <AlexaAudeMark size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">AlexaAude Morning Briefing</h3>
                <AiInsightTag type="orchestrator" label="DAILY DIGEST" />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {householdProfile.familyName} · {householdProfile.homeCity}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Executive Digest Controls */}
        <div className="my-5 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-7 w-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs hover:bg-slate-800"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
            </button>
            <span className="text-xs text-slate-700 font-medium">
              {isPlaying ? 'Stepping through household summary...' : 'Paused'}
            </span>
          </div>

          {/* Clean Step Progress Indicator */}
          <div className="flex items-center gap-1.5">
            {briefingPoints.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentStep
                    ? 'w-6 bg-slate-900'
                    : i < currentStep
                    ? 'w-2 bg-slate-400'
                    : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Briefing Steps */}
        <div className="space-y-3">
          {briefingPoints.map((pt, idx) => {
            const isActive = idx === currentStep;
            const isPassed = idx < currentStep;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border transition-all ${
                  isActive
                    ? 'border-blue-500 bg-blue-50/50 shadow-xs'
                    : isPassed
                    ? 'border-slate-200 bg-slate-50/60 opacity-80'
                    : 'border-slate-100 bg-white opacity-40'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5">{pt.icon}</div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900">{pt.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{pt.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onNavigateTab('overview');
            }}
            className="text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            Dismiss
          </button>

          <button
            onClick={() => {
              onClose();
              onNavigateTab('calendar');
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 shadow-xs transition-colors"
          >
            View Full Day Schedule
          </button>
        </div>
      </div>
    </div>
  );
};
