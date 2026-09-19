import React, { useState } from 'react';
import {
  Cpu,
  Wind,
  Waves,
  Refrigerator,
  Droplets,
  Tv,
  Lightbulb,
  Lock,
  Wifi,
  Zap,
  Power,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Volume2,
  RefreshCw,
  Sun,
  Moon,
} from 'lucide-react';
import { SmartDeviceDetail } from '../../types/family';
import { AiInsightTag } from '../AlexaAudeMark';

interface SmartDevicesViewProps {
  smartDevices: SmartDeviceDetail[];
  onToggleDevicePower?: (id: string) => void;
  onOpenAssistant: (query?: string) => void;
}

export const SmartDevicesView: React.FC<SmartDevicesViewProps> = ({
  smartDevices,
  onToggleDevicePower,
  onOpenAssistant,
}) => {
  const [deviceList, setDeviceList] = useState<SmartDeviceDetail[]>(smartDevices);
  const [activeRoutine, setActiveRoutine] = useState<string | null>(null);
  const [routineToast, setRoutineToast] = useState<string | null>(null);

  const togglePower = (id: string) => {
    setDeviceList((prev) =>
      prev.map((dev) =>
        dev.id === id ? { ...dev, isPowerOn: !dev.isPowerOn } : dev
      )
    );
    if (onToggleDevicePower) onToggleDevicePower(id);
  };

  const triggerRoutine = (routineName: string, description: string) => {
    setActiveRoutine(routineName);
    setRoutineToast(`Executing routine: "${routineName}" — ${description}`);
    setTimeout(() => {
      setRoutineToast(null);
      setActiveRoutine(null);
    }, 4000);
  };

  const getDeviceIcon = (type: SmartDeviceDetail['type']) => {
    switch (type) {
      case 'ac':
        return <Wind className="h-5 w-5 text-blue-600" />;
      case 'washing_machine':
        return <Waves className="h-5 w-5 text-cyan-600" />;
      case 'water_purifier':
        return <Droplets className="h-5 w-5 text-emerald-600" />;
      case 'tv':
        return <Tv className="h-5 w-5 text-purple-600" />;
      case 'lights':
        return <Lightbulb className="h-5 w-5 text-amber-500" />;
      case 'security':
        return <Lock className="h-5 w-5 text-slate-800" />;
      case 'router':
        return <Wifi className="h-5 w-5 text-indigo-600" />;
      default:
        return <Cpu className="h-5 w-5 text-slate-700" />;
    }
  };

  const totalEnergyINR = deviceList.reduce((acc, dev) => acc + dev.energyImpactMonthly, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Feedback */}
      {routineToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 text-xs shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{routineToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              IoT Telemetry & Household Automation
            </span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              DEMO DEVICE DATA ACTIVE
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Smart Devices Intelligence</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time energy tracking, predictive consumable lifespans, and ambient household routines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenAssistant('Analyze our household energy consumption and recommend optimizations.')}
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span>Energy Audit</span>
          </button>
        </div>
      </div>

      {/* Top Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Monitored Impact</span>
            <Zap className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2 font-mono">
            ₹{totalEnergyINR.toLocaleString('en-IN')}<span className="text-xs text-slate-400 font-sans font-normal"> / month</span>
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-amber-800">
            <AiInsightTag type="smarthome" label="SMART HOME AI" />
            <span className="font-medium">AC usage is 34% higher than your household average.</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Action Required</span>
            <AlertTriangle className="h-4 w-4 text-rose-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2 font-mono">2 Devices</p>
          <p className="text-xs text-slate-500 mt-2">
            AC service due tomorrow (11 AM) · Water Purifier filter in 12 days
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Mesh Connectivity</span>
            <Wifi className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2 font-mono">940 Mbps</p>
          <p className="text-xs text-emerald-700 mt-2 font-medium">
            All 4 mesh points synchronized · 16 connected devices
          </p>
        </div>
      </div>

      {/* Household Automation Routines (Section 20) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-900">AlexaAude Ambient Routines</h3>
          </div>
          <span className="text-[11px] text-slate-400">1-Click Voice Simulation</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                  <Sun className="h-4 w-4 text-amber-500" />
                  Morning Briefing
                </span>
                <span className="text-[10px] font-mono text-slate-500">6:30 AM Auto</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Speaks today&apos;s weather (Mumbai 31°C), school pickups, bills due, and turns off hallway nightlights.
              </p>
            </div>
            <button
              onClick={() => triggerRoutine('Morning Briefing', 'Spoken briefing initiated. Living room nightlights turned off.')}
              className="mt-3 text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-900 hover:text-white transition-all w-full text-center"
            >
              Trigger &ldquo;Good Morning&rdquo;
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                  <Moon className="h-4 w-4 text-indigo-500" />
                  Evening Routine
                </span>
                <span className="text-[10px] font-mono text-slate-500">10:30 PM Auto</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dims living room lights to 20%, arms balcony motion sensors, locks Yale main door, and sets AC to 24°C eco.
              </p>
            </div>
            <button
              onClick={() => triggerRoutine('Evening Routine', 'Balcony sensors armed. Master bedroom AC set to 24°C eco.')}
              className="mt-3 text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-900 hover:text-white transition-all w-full text-center"
            >
              Trigger &ldquo;Start Evening Routine&rdquo;
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                  <RefreshCw className="h-4 w-4 text-emerald-600" />
                  All Away Eco Mode
                </span>
                <span className="text-[10px] font-mono text-slate-500">Geo-Fence</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Detected everyone departed for school and BKC/Goregaon offices. Verifies zero idle power drain.
              </p>
            </div>
            <button
              onClick={() => triggerRoutine('All Away Eco Mode', 'Idle lights switched off. Door lock verified.')}
              className="mt-3 text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-900 hover:text-white transition-all w-full text-center"
            >
              Trigger &ldquo;Goodbye AlexaAude&rdquo;
            </button>
          </div>
        </div>
      </div>

      {/* Individual Devices Grid (Section 12 details) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deviceList.map((device) => {
          return (
            <div
              key={device.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      {getDeviceIcon(device.type)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{device.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-slate-500">{device.room}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-[11px] font-mono text-slate-600">{device.usageMetric}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => togglePower(device.id)}
                    className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all ${
                      device.isPowerOn
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                    title={device.isPowerOn ? 'Power Off' : 'Power On'}
                  >
                    <Power className="h-4 w-4" />
                  </button>
                </div>

                {/* Insight Callout */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {device.insightNote}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="h-3 w-3" />
                  <span>{device.lastActive}</span>
                </div>
                <div className="font-medium text-slate-700">
                  Impact: <strong className="font-semibold text-slate-900 font-mono">₹{device.energyImpactMonthly}</strong>/mo
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
