import React, { useState } from 'react';
import { AlexaAudeMark, AiInsightTag } from '../AlexaAudeMark';
import {
  Users,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Wallet,
  Home,
  ShoppingCart,
  Plane,
  Zap,
  FileText,
  Plus,
  Trash2,
  Check,
} from 'lucide-react';

interface OnboardingFlowProps {
  onNavigate: (route: string) => void;
  onComplete: () => void;
  initialName?: string;
  initialFamilyName?: string;
}

interface MemberInput {
  id: string;
  name: string;
  role: string;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  onNavigate,
  onComplete,
  initialName = 'Virat Kohli',
  initialFamilyName = 'Kohli Family',
}) => {
  const [step, setStep] = useState<number>(1);

  // Step 1: Family members
  const [members, setMembers] = useState<MemberInput[]>([
    { id: '1', name: initialName || 'Virat Kohli', role: 'Household Head / Parent' },
    { id: '2', name: 'Anushka', role: 'Partner / Parent' },
    { id: '3', name: 'Vamika', role: 'Daughter (Grade 1)' },
    { id: '4', name: 'Akaay', role: 'Son (Toddler)' },
  ]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Child');

  // Step 2: Location & residence
  const [homeCity, setHomeCity] = useState('Mumbai (Worli Sea Face)');
  const [residenceType, setResidenceType] = useState('High-Rise Apartment');
  const [smartHomeBrand, setSmartHomeBrand] = useState('Amazon Alexa + Matter & HomeKit');

  // Step 3: Priority domains
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([
    'Family schedules',
    'Money',
    'Home',
    'Shopping',
    'Travel',
    'Smart devices',
  ]);

  const priorityOptions = [
    { id: 'Family schedules', icon: Calendar, desc: 'School drop-offs, meetings, and shared household calendar' },
    { id: 'Money', icon: Wallet, desc: 'Upcoming commitments, utility bills, and holiday savings pots' },
    { id: 'Home', icon: Home, desc: 'Appliance servicing, water filters, and technician bookings' },
    { id: 'Shopping', icon: ShoppingCart, desc: 'Predictive grocery replenish for milk, coffee & essentials' },
    { id: 'Travel', icon: Plane, desc: 'Coordinate leave days, school vacations & holiday budgets' },
    { id: 'Smart devices', icon: Zap, desc: 'Monitor AC humidity surge, power draw & IoT telemetry' },
    { id: 'Documents', icon: FileText, desc: 'Passports, vaccination charts, vehicle insurance & warranties' },
    { id: 'Life events', icon: Sparkles, desc: 'Milestone birthdays, school admissions, festivals & home moves' },
  ];

  const handleTogglePriority = (id: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleAddMember = () => {
    if (!newMemberName.trim()) return;
    setMembers((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newMemberName.trim(),
        role: newMemberRole,
      },
    ]);
    setNewMemberName('');
  };

  const handleRemoveMember = (id: string) => {
    if (members.length <= 1) return;
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header bar */}
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-200">
        <div
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <AlexaAudeMark size="md" />
          <span className="text-base font-bold text-slate-900 tracking-tight">AlexaAude</span>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s === step
                  ? 'w-8 bg-slate-900'
                  : s < step
                  ? 'w-3 bg-cyan-500'
                  : 'w-3 bg-slate-200'
              }`}
            />
          ))}
          <span className="ml-2 text-xs font-mono font-medium text-slate-500">
            Step {step} of 4
          </span>
        </div>
      </div>

      {/* Center Onboarding Card */}
      <div className="max-w-2xl mx-auto w-full my-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        {/* =========================================================================
            STEP 1: "Who's in your family?"
            ========================================================================= */}
        {step === 1 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded border border-cyan-200">
                Step 1
              </span>
              <span className="text-xs text-slate-500">Household Members</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Who&apos;s in your family?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              AlexaAude personalizes morning briefings, pickup duty coordination, and calendar overlaps for everyone under your roof.
            </p>

            {/* Current Member List */}
            <div className="mt-6 space-y-2.5">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-slate-900 text-white font-mono font-semibold text-xs flex items-center justify-center">
                      {m.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">{m.name}</div>
                      <div className="text-[11px] text-slate-500">{m.role}</div>
                    </div>
                  </div>

                  {members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(m.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors cursor-pointer"
                      title="Remove member"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Member inline form */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                placeholder="Add member name..."
                className="w-full sm:flex-1 px-3.5 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              <select
                value={newMemberRole}
                onChange={(e) => setNewMemberRole(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="Partner">Partner</option>
                <option value="Child">Child</option>
                <option value="Grandparent">Grandparent</option>
                <option value="Household staff">Household staff</option>
              </select>
              <button
                type="button"
                onClick={handleAddMember}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>

            {/* Navigation Button */}
            <div className="mt-8 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm cursor-pointer"
              >
                <span>Continue to Home Context</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 2: "Where does your family live?"
            ========================================================================= */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                Step 2
              </span>
              <span className="text-xs text-slate-500">Geography & Climate Context</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Where does your family live?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Location informs local weather, school holiday calendars, power tariff tiers, and regional appliance maintenance cycles.
            </p>

            <div className="mt-6 space-y-4">
              {/* Home City */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Residence City / Neighborhood
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    value={homeCity}
                    onChange={(e) => setHomeCity(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50"
                    placeholder="e.g. Mumbai, New Delhi, Bengaluru"
                  />
                </div>
              </div>

              {/* Residence Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Residence Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'High-Rise Apartment',
                    'Independent Villa / Bungalow',
                    'Gated Society Townhouse',
                    'Multi-Floor Home',
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setResidenceType(type)}
                      className={`p-3 text-left rounded-xl border text-xs font-medium transition-all ${
                        residenceType === type
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Connected Ecosystem */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Smart Home & Voice Ecosystem
                </label>
                <input
                  type="text"
                  value={smartHomeBrand}
                  onChange={(e) => setSmartHomeBrand(e.target.value)}
                  className="block w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50"
                  placeholder="e.g. Amazon Alexa, Google Home, Apple Home"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Back
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm cursor-pointer"
              >
                <span>Continue to Priorities</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 3: "What should AlexaAude help with?"
            ========================================================================= */}
        {step === 3 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                Step 3
              </span>
              <span className="text-xs text-slate-500">Autonomous Domains</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              What should AlexaAude help with?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Select the capabilities you want active in your family operating system. You can change these anytime.
            </p>

            {/* Multi-Select Interactive Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {priorityOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedPriorities.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleTogglePriority(opt.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50/70 text-slate-800 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-slate-800 text-cyan-300' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">{opt.id}</div>
                        <div
                          className={`text-[11px] leading-tight mt-0.5 ${
                            isSelected ? 'text-slate-300' : 'text-slate-500'
                          }`}
                        >
                          {opt.desc}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 border ${
                        isSelected
                          ? 'bg-cyan-400 border-cyan-400 text-slate-950'
                          : 'border-slate-300 bg-white text-transparent'
                      }`}
                    >
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Back
              </button>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm cursor-pointer"
              >
                <span>Finalize Setup</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 4: "You're ready."
            ========================================================================= */}
        {step === 4 && (
          <div className="text-center py-4">
            <AlexaAudeMark size="xl" className="mx-auto mb-4" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-semibold border border-emerald-200 mb-4">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>Household Model Ready</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              You&apos;re ready.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
              AlexaAude will start building your family&apos;s context.
            </p>

            {/* Summary Box */}
            <div className="mt-6 max-w-md mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Family Members</span>
                <span className="font-semibold text-slate-900">{members.length} members configured</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Residence</span>
                <span className="font-semibold text-slate-900">{homeCity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Active Domains</span>
                <span className="font-semibold text-slate-900">{selectedPriorities.length} modules enabled</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="text-slate-500">Ambient AI</span>
                <span className="font-mono text-[11px] font-semibold text-emerald-700">Online & Synthesizing</span>
              </div>
            </div>

            {/* Launch Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onComplete}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <span>Open Family Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Trust line footer */}
      <div className="text-center text-xs text-slate-400 font-mono">
        All context is isolated to your household • Fully encrypted end-to-end
      </div>
    </div>
  );
};
