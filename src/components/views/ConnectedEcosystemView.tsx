import React, { useState } from 'react';
import {
  Share2,
  CheckCircle2,
  Clock,
  Sparkles,
  Shield,
  Layers,
  ArrowUpRight,
  RefreshCw,
  ExternalLink,
  Sliders,
  Tv,
  BookOpen,
  Music,
  Camera,
  Wifi,
  ShoppingBag,
  Bell,
  Calendar,
  CreditCard,
  Home,
  FileText,
  Compass,
} from 'lucide-react';
import { AiInsightTag } from '../AlexaAudeMark';

interface ConnectedEcosystemViewProps {
  onOpenAssistant: (query?: string) => void;
}

interface IntegrationItem {
  id: string;
  name: string;
  group: 'amazon' | 'household' | 'external';
  category: string;
  status: 'CONNECTED' | 'SIMULATED' | 'CONCEPT';
  description: string;
  telemetryOrAction: string;
  lastSync: string;
}

export const ConnectedEcosystemView: React.FC<ConnectedEcosystemViewProps> = ({
  onOpenAssistant,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'amazon' | 'household' | 'external'>('all');

  const integrations: IntegrationItem[] = [
    // Amazon Ecosystem
    {
      id: 'int-alexaplus',
      name: 'Alexa+ Intelligence Layer',
      group: 'amazon',
      category: 'Conversational Layer',
      status: 'SIMULATED',
      description: 'Underlying multi-modal natural voice and ambient intelligence backbone across household rooms.',
      telemetryOrAction: 'Contextual reasoning active · Voice profile: Kohli Family Household',
      lastSync: 'Real-time',
    },
    {
      id: 'int-echo',
      name: 'Echo Hub & Echo Show 15',
      group: 'amazon',
      category: 'Smart Display / Hub',
      status: 'SIMULATED',
      description: 'Kitchen countertop & hallway persistent family display dashboard and tactile widgets.',
      telemetryOrAction: 'Worli Sky Villa Main Hub online · Ambient display active',
      lastSync: '2 mins ago',
    },
    {
      id: 'int-ring',
      name: 'Ring Video Doorbell & Security',
      group: 'amazon',
      category: 'Household Safety',
      status: 'SIMULATED',
      description: 'Front entryway motion sensor, 2-way audio, and package delivery detection feed.',
      telemetryOrAction: 'Front door locked · 1 delivery detected (1:45 PM)',
      lastSync: '10 mins ago',
    },
    {
      id: 'int-blink',
      name: 'Blink Outdoor Cameras',
      group: 'amazon',
      category: 'Perimeter Safety',
      status: 'SIMULATED',
      description: 'Balcony and driveway cameras for evening safety and child perimeter boundaries.',
      telemetryOrAction: 'Terrace perimeter armed · Battery 92%',
      lastSync: '15 mins ago',
    },
    {
      id: 'int-eero',
      name: 'eero Pro 6E Mesh WiFi',
      group: 'amazon',
      category: 'Home Network',
      status: 'SIMULATED',
      description: 'Whole-villa connectivity, kid bedtime device pausing, and secure IoT device isolation.',
      telemetryOrAction: '32 Connected devices · Low latency 12ms · Bedtime pause active for nursery',
      lastSync: 'Just now',
    },
    {
      id: 'int-firetv',
      name: 'Fire TV 4K Max & Prime Video',
      group: 'amazon',
      category: 'Family Entertainment',
      status: 'SIMULATED',
      description: 'Family movie night orchestration, educational documentaries, and bedtime viewing limits.',
      telemetryOrAction: 'Recommended: "The Wild Robot" & "Bluey" (90-min family window tonight)',
      lastSync: '1 hr ago',
    },
    {
      id: 'int-kindle',
      name: 'Kindle Paperwhite Kids',
      group: 'amazon',
      category: 'Learning & Reading',
      status: 'SIMULATED',
      description: 'Vamika reading milestone tracker, vocabulary builder, and bedtime reading streak.',
      telemetryOrAction: 'Goal: 20 mins/day · Current streak: 8 days (Roald Dahl)',
      lastSync: 'Today 7:45 AM',
    },
    {
      id: 'int-music',
      name: 'Amazon Music HD Family',
      group: 'amazon',
      category: 'Audio & Routines',
      status: 'SIMULATED',
      description: 'Morning wake-up instrumental acoustic routines, workout audio for Virat, and nursery lullabies.',
      telemetryOrAction: 'Active Routine: Evening Calm playlist (Queued 7:30 PM)',
      lastSync: '3 hrs ago',
    },
    {
      id: 'int-shopping',
      name: 'Amazon Shopping & Fresh',
      group: 'amazon',
      category: 'Household Commerce',
      status: 'SIMULATED',
      description: 'Predictive household replenishment, staples auto-consolidation, and one-tap parental approval.',
      telemetryOrAction: '4 items staged: Milk, AC filter, STEM kit, Basmati rice (₹4,225)',
      lastSync: '12 mins ago',
    },
    {
      id: 'int-prime',
      name: 'Amazon Prime Benefits',
      group: 'amazon',
      category: 'Delivery & Perks',
      status: 'SIMULATED',
      description: 'Consolidated single-window delivery scheduling to minimize courier interruptions at home.',
      telemetryOrAction: 'Next consolidated delivery: Tomorrow 5:00 PM – 7:00 PM',
      lastSync: 'Today 9:30 AM',
    },
    {
      id: 'int-photos',
      name: 'Amazon Photos Family Vault',
      group: 'amazon',
      category: 'Family Memories',
      status: 'SIMULATED',
      description: 'Secure, private shared album displaying family holiday milestones on Echo Show screens.',
      telemetryOrAction: 'Syncing: "Switzerland 2024" & "Akaay 1st Birthday" albums (Echo Show screen saver)',
      lastSync: 'Yesterday',
    },

    // Household Ecosystem
    {
      id: 'int-cal',
      name: 'Family Multi-Calendar Harmonization',
      group: 'household',
      category: 'Calendar',
      status: 'CONNECTED',
      description: 'Bi-directional synchronization of parent work commitments, training schedules, and school calendar.',
      telemetryOrAction: '4 calendars aggregated · Next: Thursday 3:30 PM pickup & 5:00 PM PTM',
      lastSync: 'Live sync',
    },
    {
      id: 'int-school',
      name: 'Elementary Academy Portal',
      group: 'household',
      category: 'School',
      status: 'SIMULATED',
      description: 'Direct ingestion of school notices, PTM scheduling, and Science Fair kit requirements.',
      telemetryOrAction: 'Indexed: Term 2 Health Declaration form & Solar System kit presentation',
      lastSync: 'Today 6:00 AM',
    },
    {
      id: 'int-banking',
      name: 'Family Treasury & Sinking Funds',
      group: 'household',
      category: 'Finance',
      status: 'SIMULATED',
      description: 'Read-only financial telemetry, automated bill detection, and vacation sinking fund earmarks.',
      telemetryOrAction: 'Discretionary: ₹32,400/₹50,000 spent · Vacation Pot: ₹75,000 (100% funded)',
      lastSync: 'Today 8:00 AM',
    },
    {
      id: 'int-hvac',
      name: 'Carrier, Samsung & Kent RO Telemetry',
      group: 'household',
      category: 'Appliances',
      status: 'CONNECTED',
      description: 'Compressor health diagnostics, air filter airflow status, and water purifier cartridge lifecycle.',
      telemetryOrAction: 'Living Room AC: 12% filter airflow · Technician Suresh Kumar slotted Saturday 11 AM',
      lastSync: '10 mins ago',
    },
    {
      id: 'int-smarthome',
      name: 'Philips Hue & Smart Scene Controllers',
      group: 'household',
      category: 'Smart Home',
      status: 'CONNECTED',
      description: 'Circadian lighting rhythms, warm amber dinner scenes, and automated nursery bedtime dimming.',
      telemetryOrAction: 'Evening Scene "Cozy Family Time" primed for 7:15 PM dinner',
      lastSync: 'Live sync',
    },
    {
      id: 'int-travel',
      name: 'December Alpine Chalet & Flight Watch',
      group: 'household',
      category: 'Travel',
      status: 'CONCEPT',
      description: 'Family holiday alignment, school vacation match, and heated chalet availability watch.',
      telemetryOrAction: 'Shimla Alpine Chalet (Dec 22–27) within ₹75,000 budget · 100% funded',
      lastSync: 'Today 9:00 AM',
    },
    {
      id: 'int-docs',
      name: 'Family Document Vault & Warranties',
      group: 'household',
      category: 'Documents',
      status: 'CONNECTED',
      description: 'Encrypted storage for passports, medical records, pediatric immunizations, and appliance AMCs.',
      telemetryOrAction: '4 active warranties · RO filter AMC expires in 12 days',
      lastSync: 'Today 7:00 AM',
    },
    {
      id: 'int-resp',
      name: 'Family Responsibilities Engine',
      group: 'household',
      category: 'Responsibilities',
      status: 'CONNECTED',
      description: 'Distributed household accountability assigning tasks across Dad, Mom, Daughter, Son, and Family.',
      telemetryOrAction: '5 active items tracked · Dad (AC service), Mom (PTM form), Daughter (STEM kit)',
      lastSync: 'Live sync',
    },
  ];

  const filteredIntegrations = integrations.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.group === activeFilter;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <AiInsightTag type="smarthome" label="CONNECTED ECOSYSTEM" />
              <span className="text-xs font-mono text-slate-500">INTEROPERABILITY LAYER</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              Household Digital Ecosystem & Amazon Product Alignment
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
              AlexaAude acts as a unified coordinator sitting above existing device ecosystems. It bridges Amazon hardware, third-party appliances, school portals, and personal finances into a coherent operational layer.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenAssistant('What is the status of our connected ecosystem?')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-medium transition-colors flex items-center gap-2 shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              <span>Query Ecosystem State</span>
            </button>
          </div>
        </div>

        {/* Integration Status Legend & Disclaimer */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-700">Status Legend:</span>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-[11px] text-slate-600">CONNECTED (Live Mock)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="font-mono text-[11px] text-slate-600">SIMULATED (Demo Telemetry)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              <span className="font-mono text-[11px] text-slate-600">CONCEPT (Architectural Target)</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">
            Amazon ecosystem inspiration for hackathon demonstration
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'all', label: `All Integrations (${integrations.length})` },
          { id: 'amazon', label: `Amazon Ecosystem (${integrations.filter((i) => i.group === 'amazon').length})` },
          { id: 'household', label: `Household Systems (${integrations.filter((i) => i.group === 'household').length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeFilter === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIntegrations.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900 mt-0.5">{item.name}</h3>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold uppercase ${
                    item.status === 'CONNECTED'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : item.status === 'SIMULATED'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-purple-50 text-purple-700 border border-purple-200'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="p-2 rounded-lg bg-slate-50 text-[11px] font-medium text-slate-700 mb-2.5">
                <span className="text-slate-400 block text-[9px] font-mono uppercase">Live Telemetry:</span>
                {item.telemetryOrAction}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Updated: {item.lastSync}</span>
                <button
                  onClick={() => onOpenAssistant(`Simulate telemetry refresh for ${item.name}`)}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <span>Sync status</span>
                  <RefreshCw className="h-2.5 w-2.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
