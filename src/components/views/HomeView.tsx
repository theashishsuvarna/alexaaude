import React, { useState } from 'react';
import {
  Home as HomeIcon,
  Wind,
  Sparkles,
  Wifi,
  Utensils,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  Phone,
  FileText,
  Waves,
  Refrigerator,
  Droplets,
  Lock,
} from 'lucide-react';
import { ApplianceMaintenance, HomeDeviceStatus } from '../../types/family';

interface HomeViewProps {
  appliances: ApplianceMaintenance[];
  homeDevices: HomeDeviceStatus[];
  onNavigateTab: (tab: string) => void;
  onOpenAssistant: (query?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  appliances,
  homeDevices,
  onNavigateTab,
  onOpenAssistant,
}) => {
  const [scheduledToast, setScheduledToast] = useState<string | null>(null);

  const handleConfirmAc = () => {
    setScheduledToast('Carrier AC service confirmed for Tomorrow 11:00 AM (Technician: Suresh Kumar).');
    setTimeout(() => setScheduledToast(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {scheduledToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 text-xs shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{scheduledToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Worli Sky Villa, Mumbai</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              DEMO HOME INFRASTRUCTURE
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Home Appliances, Maintenance & Warranties</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated monitoring for HVAC, water purifiers, smart locks, fiber mesh, and warranty coverage.
          </p>
        </div>

        <button
          onClick={() => onOpenAssistant('Our AC needs servicing.')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors self-start sm:self-auto shadow-xs"
        >
          <Wind className="h-3.5 w-3.5 text-blue-400" />
          <span>Diagnose AC issue</span>
        </button>
      </div>

      {/* Section 11 Specific Home Status Grid (6 core items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* AC */}
        <div className="bg-white rounded-2xl border border-amber-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-900">AC (Living + Master)</span>
            </div>
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          </div>
          <p className="text-xs font-semibold text-amber-700 mt-2">Service due tomorrow (11 AM)</p>
          <p className="text-[11px] text-slate-500 mt-1">Carrier Authorized Technician Suresh Kumar</p>
          <button
            onClick={handleConfirmAc}
            className="w-full mt-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100 text-xs font-semibold transition-colors"
          >
            Confirm Tomorrow 11 AM
          </button>
        </div>

        {/* Washing Machine */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Waves className="h-4 w-4 text-cyan-600" />
              <span className="text-xs font-bold text-slate-900">Washing Machine</span>
            </div>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </div>
          <p className="text-xs font-semibold text-emerald-700 mt-2">Healthy</p>
          <p className="text-[11px] text-slate-500 mt-1">LG AI Direct Drive 9kg · Warranty active till Nov 2026</p>
          <div className="mt-3 py-1.5 px-2.5 rounded-lg bg-slate-50 text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>10-Yr Inverter Motor Warranty</span>
          </div>
        </div>

        {/* Refrigerator */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Refrigerator className="h-4 w-4 text-purple-600" />
              <span className="text-xs font-bold text-slate-900">Refrigerator</span>
            </div>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </div>
          <p className="text-xs font-semibold text-emerald-700 mt-2">Healthy</p>
          <p className="text-[11px] text-slate-500 mt-1">Samsung French Door 580L · Digital Inverter (10 yrs)</p>
          <div className="mt-3 py-1.5 px-2.5 rounded-lg bg-slate-50 text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Optimum cooling: 3°C Fridge / -18°C Freezer</span>
          </div>
        </div>

        {/* Water Purifier */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-900">Water Purifier</span>
            </div>
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          </div>
          <p className="text-xs font-semibold text-amber-700 mt-2">Filter replacement in 12 days</p>
          <p className="text-[11px] text-slate-500 mt-1">Kent Grand Plus RO+UV+UF · Kent Genuine Cartridge</p>
          <button
            onClick={() => {
              setScheduledToast('Kent RO replacement cartridge added to household order queue.');
              setTimeout(() => setScheduledToast(null), 3000);
            }}
            className="w-full mt-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            Reorder Filter Cartridge (₹1,450)
          </button>
        </div>

        {/* Internet */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-900">Internet Fiber Mesh</span>
            </div>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </div>
          <p className="text-xs font-semibold text-emerald-700 mt-2">Healthy (940 Mbps active)</p>
          <p className="text-[11px] text-slate-500 mt-1">Airtel Xstream Fiber 1 Gbps · 4 nodes synced</p>
          <div className="mt-3 py-1.5 px-2.5 rounded-lg bg-slate-50 text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>0 packet loss in last 48 hours</span>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-slate-800" />
              <span className="text-xs font-bold text-slate-900">Security & Access</span>
            </div>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </div>
          <p className="text-xs font-semibold text-emerald-700 mt-2">All sensors active</p>
          <p className="text-[11px] text-slate-500 mt-1">Yale Smart Lock + Balcony Sensors (Battery 84%)</p>
          <div className="mt-3 py-1.5 px-2.5 rounded-lg bg-slate-50 text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Armed for night mode automatically</span>
          </div>
        </div>
      </div>

      {/* Appliances Registry Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Registered Appliances & Warranties</h3>
            <p className="text-xs text-slate-500">Service cadence, service partner numbers, and warranty certificates</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {appliances.map((app) => (
            <div
              key={app.id}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-slate-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{app.name}</span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {app.location} · Model: {app.model}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      app.urgency === 'urgent'
                        ? 'bg-rose-100 text-rose-800'
                        : app.urgency === 'service_soon'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {app.urgency === 'service_soon' ? 'Service Due' : app.urgency === 'urgent' ? 'Urgent' : 'Healthy'}
                  </span>
                </div>

                <div className="mt-3 text-xs space-y-1 text-slate-600">
                  <p>
                    <strong className="text-slate-700">Last Serviced:</strong> {app.lastServiced} (Next: {app.nextRecommendedService})
                  </p>
                  <p>
                    <strong className="text-slate-700">Warranty:</strong> {app.isUnderWarranty ? 'Covered' : 'Expired'} (Exp: {app.warrantyExpiry})
                  </p>
                  <p>
                    <strong className="text-slate-700">Technician:</strong> {app.assignedTechnician || 'Authorized Service'}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">Consumable: {app.filterOrConsumableLifePercent}% life</span>
                <button
                  onClick={() =>
                    onOpenAssistant(`When was our ${app.name} last serviced and what is its warranty status?`)
                  }
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
