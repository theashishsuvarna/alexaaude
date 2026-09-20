import React, { useState } from 'react';
import {
  Network,
  Users,
  Calendar,
  Wallet,
  Home,
  Cpu,
  ShoppingCart,
  FileText,
  Target,
  ArrowRight,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  Activity,
  ShieldCheck,
  CheckSquare,
} from 'lucide-react';
import { AiInsightTag } from '../AlexaAudeMark';

interface FamilyDigitalTwinViewProps {
  onOpenAssistant: (query?: string) => void;
  onNavigateTab?: (tab: string) => void;
}

interface TwinDomainNode {
  id: string;
  name: string;
  category: 'people' | 'schedule' | 'responsibilities' | 'finance' | 'home' | 'devices' | 'shopping' | 'documents';
  icon: any;
  status: 'optimal' | 'attention' | 'syncing';
  headline: string;
  activeVariables: { key: string; value: string }[];
  connections: string[];
}

export const FamilyDigitalTwinView: React.FC<FamilyDigitalTwinViewProps> = ({
  onOpenAssistant,
  onNavigateTab,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-schedule');
  const [activeSimulation, setActiveSimulation] = useState<string | null>('sim-pickup-conflict');

  const domainNodes: TwinDomainNode[] = [
    {
      id: 'node-people',
      name: 'Family Members',
      category: 'people',
      icon: Users,
      status: 'optimal',
      headline: '4 Active Identities · Virat, Anushka, Vamika, Akaay',
      activeVariables: [
        { key: 'Virat (Father)', value: 'Conditioning, BKC · Energy 90% · Home at 5:30 PM' },
        { key: 'Anushka (Mother)', value: 'Studio review, Bandra · Energy 86% · Wrap 4:15 PM' },
        { key: 'Vamika (Daughter)', value: 'Elementary Academy · Energy 94% · Pickup 3:30 PM' },
        { key: 'Akaay (Son)', value: 'Worli Nursery · Energy 98% · Sleep 7:30 PM' },
      ],
      connections: ['node-schedule', 'node-responsibilities', 'node-home', 'node-documents'],
    },
    {
      id: 'node-responsibilities',
      name: 'Responsibilities',
      category: 'responsibilities',
      icon: CheckSquare,
      status: 'attention',
      headline: 'Distributed household tasks anchored to family members',
      activeVariables: [
        { key: 'Dad (Virat)', value: 'Carrier AC service greeting (Tomorrow 11:00 AM)' },
        { key: 'Mom (Anushka)', value: 'Vamika Term 2 Health Declaration (PTM Thursday)' },
        { key: 'Daughter (Vamika)', value: 'STEM Solar System model & rehearsal (Wednesday)' },
        { key: 'Son (Akaay)', value: 'Bedtime tactile wooden puzzle routine (Daily 7:30 PM)' },
        { key: 'Family (All)', value: 'Shimla Vacation packing & budget lock (Sunday)' },
      ],
      connections: ['node-people', 'node-schedule', 'node-home', 'node-documents', 'node-finance'],
    },
    {
      id: 'node-schedule',
      name: 'Events & Calendar',
      category: 'schedule',
      icon: Calendar,
      status: 'attention',
      headline: 'Real-time multi-calendar coordination across all 4 profiles',
      activeVariables: [
        { key: 'Thursday 3:30 PM', value: 'Vamika school pickup · Auto-assigned to Virat' },
        { key: 'Thursday 5:00 PM', value: 'Elementary PTM (Mrs. Sharma, Room 12)' },
        { key: 'Saturday 11:00 AM', value: 'Carrier AC technician Suresh Kumar' },
        { key: 'Dec 22 – 27', value: 'Shimla Alpine Chalet Winter Retreat' },
      ],
      connections: ['node-people', 'node-responsibilities', 'node-home', 'node-finance'],
    },
    {
      id: 'node-home',
      name: 'Home Operations',
      category: 'home',
      icon: Home,
      status: 'attention',
      headline: 'Worli Sky Villa · 6 Zones · 1 Maintenance alert',
      activeVariables: [
        { key: 'Living Room AC', value: 'Airflow 12% · Technician slotted tomorrow 11:00 AM' },
        { key: 'Kent RO Purifier', value: 'Filter cartridge expiring in 12 days' },
        { key: 'Samsung Refrigerator', value: 'Sensor zones optimal (3°C / -18°C)' },
      ],
      connections: ['node-devices', 'node-responsibilities', 'node-finance', 'node-schedule'],
    },
    {
      id: 'node-documents',
      name: 'Document Vault',
      category: 'documents',
      icon: FileText,
      status: 'optimal',
      headline: 'Encrypted records, identity, warranties & medical',
      activeVariables: [
        { key: 'Carrier AC Warranty', value: '5-Yr compressor valid till Nov 2026' },
        { key: 'School Clearance', value: 'Vamika Term 2 Health Declaration ready' },
        { key: 'Pediatric Records', value: 'Akaay 24-month vaccination booster due Dec 30' },
        { key: 'Passports', value: '4 active (valid > 24 months)' },
      ],
      connections: ['node-home', 'node-responsibilities', 'node-people'],
    },
    {
      id: 'node-finance',
      name: 'Financial Brain',
      category: 'finance',
      icon: Wallet,
      status: 'optimal',
      headline: '₹4,28,500 Available · 100% Vacation Goal Funded',
      activeVariables: [
        { key: 'Vacation Reserve', value: '₹75,000 Sinking Fund fully allocated' },
        { key: 'Discretionary Spend', value: '₹32,400 spent of ₹50,000 monthly allowance' },
        { key: 'Electricity Bill', value: '₹4,850 due in 3 days (Adani Energy)' },
        { key: 'Emergency Buffer', value: '₹2,50,000 completely untouched' },
      ],
      connections: ['node-shopping', 'node-home', 'node-schedule', 'node-responsibilities'],
    },
    {
      id: 'node-devices',
      name: 'Smart Devices',
      category: 'devices',
      icon: Cpu,
      status: 'optimal',
      headline: '14 Connected devices · Amazon Echo, Ring, Fire TV, Hue',
      activeVariables: [
        { key: 'Echo Hub / Show', value: 'Living room command screen active' },
        { key: 'Ring Video Doorbell', value: 'Front door locked · 1 delivery detected' },
        { key: 'Fire TV 4K Max', value: 'Prime Video queue ready for tonight' },
        { key: 'Philips Hue', value: 'Circadian lighting scene primed' },
      ],
      connections: ['node-home', 'node-people'],
    },
    {
      id: 'node-shopping',
      name: 'Household Commerce',
      category: 'shopping',
      icon: ShoppingCart,
      status: 'optimal',
      headline: 'Predictive replenishment & consolidated Prime deliveries',
      activeVariables: [
        { key: 'Critical Staples', value: 'Organic Milk (< 400ml) & Basmati Rice' },
        { key: 'Maintenance Pre-order', value: 'Carrier OEM HEPA Filter Cartridge' },
        { key: 'School Supplies', value: 'STEM Solar System Orbit Demonstration Kit' },
        { key: 'Consolidated Order', value: '4 items (₹4,225) · Tomorrow 5–7 PM' },
      ],
      connections: ['node-finance', 'node-schedule', 'node-responsibilities'],
    },
  ];

  const selectedNode = domainNodes.find((n) => n.id === selectedNodeId) || domainNodes[1];

  const rippleSimulations = [
    {
      id: 'sim-pickup-conflict',
      title: 'Mother Production Shoot Overrun (2:00 PM)',
      trigger: "Anushka's creative slate preview extended by 45 minutes",
      ripples: [
        { domain: 'Schedule', impact: 'Detected collision with Vamika 2:30 PM school pickup at Gate 1.' },
        { domain: 'Family', impact: 'Evaluated Virat training schedule in BKC; free window confirmed.' },
        { domain: 'Responsibilities', impact: 'Reassigned pickup duty to Virat; sent notification confirmation.' },
        { domain: 'Home / Ring', impact: 'Adjusted smart lock arrival window for 3:15 PM entry.' },
      ],
    },
    {
      id: 'sim-ac-failure',
      title: 'Carrier Split AC Filter Degradation',
      trigger: 'Airflow drop detected by sensor; filter health dropped to 12%',
      ripples: [
        { domain: 'Home Ops', impact: 'Flagged preventative servicing before compressor strains.' },
        { domain: 'Finance', impact: 'Verified Carrier 5-year warranty document; zero diagnostic cost.' },
        { domain: 'Schedule', impact: 'Cross-checked technician Suresh Kumar with family calendar: Tomorrow 11:00 AM.' },
        { domain: 'Shopping', impact: 'Queued genuine Carrier replacement filter in household cart (₹1,150).' },
      ],
    },
    {
      id: 'sim-vacation-plan',
      title: 'December Alpine Winter Vacation (₹75,000)',
      trigger: 'Family inquiry for 6-day holiday in December',
      ripples: [
        { domain: 'Calendar', impact: 'Synced school holiday (Dec 20–28) with Virat match break and Anushka film hiatus.' },
        { domain: 'Treasury', impact: 'Validated ₹4,28,500 liquidity; confirmed safe budget allocation from ₹75,000 sinking fund.' },
        { domain: 'Documents', impact: 'Verified domestic travel ID and health cards for all 4 family members in Document Vault.' },
        { domain: 'Commerce', impact: 'Prepared winter thermal gear checklist for Vamika & Akaay in Amazon Household basket.' },
      ],
    },
  ];

  const activeRipple = rippleSimulations.find((s) => s.id === activeSimulation) || rippleSimulations[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <AiInsightTag type="orchestrator" label="FAMILY DIGITAL TWIN" />
              <span className="text-xs font-mono text-slate-500">SYNCHRONIZED STATE GRAPH</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              Household Digital Twin & Cross-Domain Synthesis
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
              AlexaAude maintains a living, multi-dimensional model of the household. When something shifts in one domain (a delayed meeting, a blocked filter, or an upcoming vacation), the system computes real-time ripple effects across schedules, finances, and home operations.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onOpenAssistant('Simulate cross-domain impact on our household')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-medium transition-colors flex items-center gap-2 shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              <span>Simulate Ripple Event</span>
            </button>
          </div>
        </div>
      </div>

      {/* Domain Node Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {domainNodes.map((node) => {
          const Icon = node.icon;
          const isSelected = selectedNodeId === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`h-7 w-7 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-slate-800 text-sky-400' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span
                  className={`h-2 w-2 rounded-full ${
                    node.status === 'optimal' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                  }`}
                />
              </div>
              <p className={`text-xs font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                {node.name}
              </p>
              <p className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                {node.status === 'optimal' ? 'Optimal sync' : 'Action pending'}
              </p>
            </button>
          );
        })}
      </div>

      {/* Node Detail & Cross-Domain Connectors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Selected Node Active State (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <selectedNode.icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">{selectedNode.name} Domain</h2>
                <p className="text-xs text-slate-500">{selectedNode.headline}</p>
              </div>
            </div>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold uppercase ${
                selectedNode.status === 'optimal'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {selectedNode.status}
            </span>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-2.5">
              Live State Telemetry
            </label>
            <div className="space-y-2">
              {selectedNode.activeVariables.map((v, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3 text-xs"
                >
                  <span className="font-semibold text-slate-700">{v.key}</span>
                  <span className="font-medium text-slate-900 text-right">{v.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-2">
              Connected Inter-Domain Vectors
            </label>
            <div className="flex flex-wrap gap-1.5">
              {selectedNode.connections.map((connId) => {
                const connNode = domainNodes.find((n) => n.id === connId);
                if (!connNode) return null;
                return (
                  <button
                    key={connId}
                    onClick={() => setSelectedNodeId(connId)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                  >
                    <connNode.icon className="h-3 w-3 text-slate-500" />
                    <span>{connNode.name}</span>
                    <ArrowRight className="h-2.5 w-2.5 text-slate-400" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Real-time Ripple Simulator (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-600" />
                <h2 className="text-base font-semibold text-slate-900">Multi-Signal Ripple Engine</h2>
              </div>
              <p className="text-xs text-slate-500">
                Observe how AlexaAude propagates adjustments across family constraints
              </p>
            </div>

            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
              {rippleSimulations.map((sim) => (
                <button
                  key={sim.id}
                  onClick={() => setActiveSimulation(sim.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    activeSimulation === sim.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {sim.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Trigger Event Banner */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs">
            <span className="font-mono text-[10px] font-semibold text-blue-700 uppercase tracking-wider block mb-0.5">
              PRIMARY EVENT DETECTED:
            </span>
            <p className="font-semibold text-slate-900 text-sm">{activeRipple.title}</p>
            <p className="text-slate-600 mt-0.5">{activeRipple.trigger}</p>
          </div>

          {/* Cascade steps */}
          <div className="space-y-3">
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
              Autonomous Synthesis Cascade
            </label>
            {activeRipple.ripples.map((rip, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="h-6 w-6 rounded-full bg-slate-900 text-sky-400 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900 font-mono uppercase">
                      {rip.domain}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-[10px] text-emerald-600 font-medium">Reconciled</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">{rip.impact}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span className="text-slate-700">Autonomous resolution adheres to parental boundaries.</span>
            </div>
            <button
              onClick={() => onOpenAssistant(`Explain cross-domain logic for "${activeRipple.title}"`)}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              View Decision Trace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
