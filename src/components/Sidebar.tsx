import React from 'react';
import { AlexaAudeMark } from './AlexaAudeMark';
import {
  LayoutDashboard,
  Users,
  Calendar,
  CheckSquare,
  Wallet,
  Home,
  Cpu,
  ShoppingCart,
  Compass,
  FileText,
  Sparkles,
  Settings,
  ChevronRight,
  Target,
  Globe,
  Network,
  Share2,
  Server,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAssistant: (initialQuery?: string) => void;
  onOpenSettings: () => void;
  onNavigateRoute?: (route: string) => void;
  attentionCount?: number;
  homeCity?: string;
  familyName?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenAssistant,
  onOpenSettings,
  onNavigateRoute,
  attentionCount = 5,
  homeCity = 'Mumbai',
  familyName = 'Kohli Family',
}) => {
  const primaryNavItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'tasks', label: 'Responsibilities', icon: CheckSquare, badge: '5' },
    { id: 'money', label: 'Money', icon: Wallet },
    { id: 'home', label: 'Home', icon: Home, badge: '1' },
    { id: 'smart-devices', label: 'Smart Devices', icon: Cpu },
    { id: 'shopping', label: 'Shopping', icon: ShoppingCart, badge: '3' },
    { id: 'travel', label: 'Travel', icon: Compass },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'life-events', label: 'Life Events', icon: Target },
  ];

  const systemNavItems = [
    { id: 'digital-twin', label: 'Family Digital Twin', icon: Network },
    { id: 'ecosystem', label: 'Connected Ecosystem', icon: Share2, badge: 'Amazon+' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col justify-between select-none h-screen sticky top-0 overflow-y-auto">
      {/* Brand & Top Header */}
      <div>
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <AlexaAudeMark size="lg" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-900 tracking-tight text-base">AlexaAude</span>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider bg-slate-900 text-sky-300 px-1.5 py-0.5 rounded">
                  OS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-normal">Family Operating System</p>
            </div>
          </div>
        </div>

        {/* Primary Navigation List */}
        <nav className="p-3 space-y-1">
          <div className="px-2 pb-1 pt-0.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Household
          </div>
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && !isActive && (
                  <span className="h-4 min-w-4 px-1.5 flex items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600 border border-slate-200">
                    {item.badge}
                  </span>
                )}
                {item.id === 'overview' && attentionCount > 0 && !isActive && (
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                )}
              </button>
            );
          })}

          <div className="px-2 pt-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            System & Integrations
          </div>
          {systemNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && !isActive && (
                  <span className="h-4 min-w-4 px-1.5 flex items-center justify-center rounded-full bg-blue-50 text-[10px] font-semibold text-blue-700 border border-blue-200">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Dedicated AI Assistant Button */}
          <div className="pt-2">
            <button
              id="nav-item-ai-assistant"
              onClick={() => onOpenAssistant()}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium bg-slate-50 border border-slate-200 text-slate-900 hover:bg-slate-100 transition-colors shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-5 w-5 rounded-md bg-slate-900 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="h-3 w-3 text-sky-400" />
                </div>
                <div className="text-left">
                  <span className="font-semibold block text-slate-900">Ask AlexaAude</span>
                </div>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </div>
        </nav>
      </div>

      {/* Household Status & Settings at the Bottom */}
      <div className="p-3 border-t border-slate-100 space-y-2">
        {/* Household Sync Indicator */}
        <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 truncate">
            <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
            <span className="font-medium text-slate-700 truncate">{familyName}</span>
          </div>
          <span className="flex-shrink-0 text-slate-500 font-medium">{homeCity}</span>
        </div>

        {/* Landing Page link */}
        {onNavigateRoute && (
          <button
            id="btn-landing-page"
            onClick={() => onNavigateRoute('/')}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Globe className="h-3.5 w-3.5 text-slate-400" />
              <span>Landing Page</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">/</span>
          </button>
        )}

        {/* Settings button */}
        <button
          id="btn-settings"
          onClick={onOpenSettings}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <Settings className="h-4 w-4 text-slate-400" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};
