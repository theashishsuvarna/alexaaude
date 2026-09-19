import React, { useState } from 'react';
import {
  Users,
  MapPin,
  BatteryCharging,
  Phone,
  MessageSquare,
  Clock,
  Shield,
  Plus,
  CheckCircle2,
  Calendar,
  Sparkles,
  Briefcase,
  GraduationCap,
  HeartPulse,
  BookOpen,
} from 'lucide-react';
import { FamilyMember } from '../../types/family';
import { MemberAvatar } from '../MemberAvatar';
import { AiInsightTag } from '../AlexaAudeMark';

interface FamilyViewProps {
  familyMembers: FamilyMember[];
  familyName?: string;
  onOpenAssistant: (query?: string) => void;
}

export const FamilyView: React.FC<FamilyViewProps> = ({
  familyMembers,
  familyName = 'Kohli Family',
  onOpenAssistant,
}) => {
  const [selectedMember, setSelectedMember] = useState<FamilyMember>(familyMembers[0]);
  const [statusUpdatedToast, setStatusUpdatedToast] = useState<string | null>(null);

  // Keep selected member synced if family changes
  const activeMember = familyMembers.find((m) => m.id === selectedMember?.id) || familyMembers[0];

  const handleUpdateStatus = (member: FamilyMember, newStatusLabel: string) => {
    setStatusUpdatedToast(`Updated ${member.nickname}'s status to: ${newStatusLabel}`);
    setTimeout(() => setStatusUpdatedToast(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {statusUpdatedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 text-xs shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{statusUpdatedToast}</span>
        </div>
      )}

      {/* Header banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {familyName} Household
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-500">{familyMembers.length} Active Members</span>
            <AiInsightTag type="family" label="FAMILY AI COORDINATION" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Family Members & Household Context</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Coordination of work schedules, school hours, elderly care, pickup responsibilities, and preferences.
          </p>
        </div>
        <button
          onClick={() => onOpenAssistant('Who is picking up the kids from school today and what are everyone&apos;s evening hours?')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors self-start sm:self-auto shadow-xs"
        >
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span>Ask about schedules</span>
        </button>
      </div>

      {/* Grid of Family Members (responsive grid for 4 to 6 members) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {familyMembers.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedMember(member)}
            className={`bg-white rounded-2xl border p-5 transition-all cursor-pointer shadow-xs ${
              activeMember.id === member.id
                ? 'border-slate-900 ring-2 ring-slate-900/10'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <MemberAvatar
                member={member}
                size="2xl"
                rounded="2xl"
                showStatusIndicator
                status={member.status}
              />
              <div className="text-right">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {member.statusLabel}
                </span>
                {member.battery && (
                  <div className="flex items-center gap-1 justify-end text-[11px] text-slate-400 mt-1.5 font-mono">
                    <BatteryCharging className="h-3 w-3 text-slate-400" />
                    <span>{member.battery}%</span>
                  </div>
                )}
              </div>
            </div>

            <h3 className="font-semibold text-sm text-slate-900">{member.name}</h3>
            <p className="text-xs text-slate-500 font-normal">{member.relationship}</p>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                <span className="font-medium text-slate-900">{member.availability}</span>
              </div>
              {member.workplaceOrSchool && (
                <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                  <Briefcase className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{member.workplaceOrSchool}</span>
                </div>
              )}
              {member.location && (
                <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{member.location}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Member Detail & Daily Routine */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <MemberAvatar
              member={activeMember}
              size="xl"
              rounded="xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">{activeMember.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {activeMember.relationship}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Current Activity: <strong className="text-slate-800">{activeMember.currentTask || activeMember.statusLabel}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleUpdateStatus(activeMember, 'At home · Available')}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Set Available
            </button>
            <button
              onClick={() =>
                onOpenAssistant(`What are ${activeMember.nickname}'s commitments and reminders for this week?`)
              }
              className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors"
            >
              Member Digest
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
          {/* Work / School Hours */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Typical Schedule
            </span>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-900 block font-mono">
                {activeMember.typicalHours || 'Flexible / Household Routine'}
              </span>
              <p className="text-xs text-slate-500 mt-1">
                {activeMember.workplaceOrSchool || 'Home & Community'}
              </p>
            </div>
          </div>

          {/* Location & Transit */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Location & Transit
            </span>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-900 block">
                {activeMember.location || 'Worli Sky Villa'}
              </span>
              <p className="text-xs text-slate-500 mt-1">{activeMember.notes || 'Normal routine logged'}</p>
            </div>
          </div>

          {/* Healthcare or Special Notes */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Reminders & Notes
            </span>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              {activeMember.medications && activeMember.medications.length > 0 ? (
                <div>
                  <div className="flex items-center gap-1.5 text-rose-700 text-xs font-semibold mb-1">
                    <HeartPulse className="h-3.5 w-3.5" />
                    <span>Medications:</span>
                  </div>
                  {activeMember.medications.map((m, idx) => (
                    <span key={idx} className="text-xs text-slate-700 block">
                      • {m}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-600">
                  {activeMember.upcomingEvent || 'No immediate calendar conflicts'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section 21: Family Memory & Preferences */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
          <BookOpen className="h-4 w-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-slate-900">Household Memory & Preferences</h3>
          <span className="text-[10px] text-slate-400 ml-auto">Learned Patterns</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h4 className="font-semibold text-slate-900 mb-1">Travel & Vacation Habits</h4>
            <p className="text-slate-600 leading-relaxed">
              The {familyName} usually travels during seasonal school breaks and prefers destinations with convenient flights and family-friendly accommodations for the whole household.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h4 className="font-semibold text-slate-900 mb-1">Groceries & Dietary Preferences</h4>
            <p className="text-slate-600 leading-relaxed">
              Prefers organic cow milk, whole grain staples, and clean, wholesome nutrition. Typical household grocery replenishment cycle is 28–30 days for dry pantry essentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
