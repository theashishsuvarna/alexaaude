import React, { useState } from 'react';
import { X, ShieldCheck, Bell, Users, Globe, CheckCircle2 } from 'lucide-react';
import { FamilyMember } from '../../types/family';
import { MemberAvatar } from '../MemberAvatar';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyMembers: FamilyMember[];
  householdProfile?: {
    familyName: string;
    residenceLabel: string;
  };
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  familyMembers,
  householdProfile,
}) => {
  const [householdName, setHouseholdName] = useState(
    householdProfile?.familyName || 'Kohli Family'
  );
  const [residence, setResidence] = useState(
    householdProfile?.residenceLabel || 'Worli Sky Villa, Mumbai'
  );
  const [currency, setCurrency] = useState('₹ (INR)');
  const [quietHoursStart, setQuietHoursStart] = useState('22:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState('07:00');
  const [savedToast, setSavedToast] = useState(false);

  React.useEffect(() => {
    if (householdProfile) {
      setHouseholdName(householdProfile.familyName);
      setResidence(householdProfile.residenceLabel);
    }
  }, [householdProfile?.familyName, householdProfile?.residenceLabel]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-900">AlexaAude Household Settings</h3>
            <p className="text-xs text-slate-500">Configure family preferences, quiet hours & currency</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        {savedToast && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Settings successfully updated for the {householdName} household.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Household Title</label>
            <input
              type="text"
              value={householdName}
              onChange={(e) => setHouseholdName(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Primary Residence</label>
              <input
                type="text"
                value={residence}
                onChange={(e) => setResidence(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Currency Standard</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900"
              >
                <option value="₹ (INR)">₹ (INR) — Rupees</option>
                <option value="$ (USD)">$ (USD) — Dollars</option>
                <option value="€ (EUR)">€ (EUR) — Euros</option>
                <option value="£ (GBP)">£ (GBP) — Pounds</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Quiet Hours (Mutes non-critical appliance alerts)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="time"
                value={quietHoursStart}
                onChange={(e) => setQuietHoursStart(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900"
              />
              <input
                type="time"
                value={quietHoursEnd}
                onChange={(e) => setQuietHoursEnd(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900"
              />
            </div>
          </div>

          <div className="pt-2">
            <span className="font-semibold text-slate-700 block mb-2">Registered Household Members</span>
            <div className="space-y-1.5">
              {familyMembers.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100"
                >
                  <div className="flex items-center gap-2">
                    <MemberAvatar member={m} size="xs" />
                    <span className="font-medium text-slate-800">{m.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 capitalize">{m.relationship}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg border border-slate-200 text-slate-700 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 shadow-xs"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
