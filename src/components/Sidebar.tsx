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
  const navItems = [
    { id: 'overview',      label: 'Overview',      icon: LayoutDashboard },
    { id: 'family',        label: 'Family',        icon: Users },
    { id: 'calendar',      label: 'Calendar',      icon: Calendar },
    { id: 'tasks',         label: 'Tasks',         icon: CheckSquare },
    { id: 'money',         label: 'Money',         icon: Wallet },
    { id: 'home',          label: 'Home',          icon: Home,          badge: '1' },
    { id: 'smart-devices', label: 'Smart Devices', icon: Cpu,           badge: 'On' },
    { id: 'shopping',      label: 'Shopping',      icon: ShoppingCart,  badge: '3' },
    { id: 'travel',        label: 'Travel',        icon: Compass },
    { id: 'documents',     label: 'Documents',     icon: FileText },
    { id: 'life-events',   label: 'Life Events',   icon: Target },
  ];

  return (
    <aside className="w-60 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col justify-between select-none h-screen sticky top-0 overflow-y-auto">

      {/* ── Brand ── */}
      <div>
        <div className="px-4 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <AlexaAudeMark size="lg" />
            <div>
              <span className="font-semibold text-slate-900 tracking-tight text-sm block leading-tight">
                AlexaAude
              </span>
              <p className="text-[10px] text-slate-400 font-normal leading-tight mt-0.5">
                Family Operating System
              </p>
            </div>
          </div>
        </div>

        {/* ── Primary Navigation ── */}
        <nav className="px-3 py-3 space-y-0.5">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 px-2 pb-1.5 pt-1">
            Navigation
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`h-[15px] w-[15px] flex-shrink-0 ${
                      isActive ? 'text-blue-400' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Attention dot for overview */}
                  {item.id === 'overview' && attentionCount > 0 && !isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                  )}
                  {/* Badge for items with counts */}
                  {item.badge && !isActive && (
                    <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-500 border border-slate-200 leading-none">
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            );
          })}

          {/* ── Ask AlexaAude ── */}
          <div className="pt-2">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 px-2 pb-1.5">
              Assistant
            </p>
            <button
              id="nav-item-ai-assistant"
              onClick={() => onOpenAssistant()}
              className="w-full flex items-center justify-between px-2.5 py-2.5 rounded-lg text-[13px] font-medium bg-slate-50 border border-slate-200 text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-5 w-5 rounded-md bg-slate-900 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-3 w-3 text-blue-400" />
                </div>
                <span className="font-semibold">Ask AlexaAude</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </div>
        </nav>
      </div>

      {/* ── Footer ── */}
      <div className="px-3 pb-4 space-y-1 border-t border-slate-100 pt-3">
        {/* Household status chip */}
        <div className="px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
            <span className="text-[11px] font-medium text-slate-700 truncate">{familyName}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium flex-shrink-0 ml-2">{homeCity}</span>
        </div>

        {/* Landing page */}
        {onNavigateRoute && (
          <button
            id="btn-landing-page"
            onClick={() => onNavigateRoute('/')}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Globe className="h-3.5 w-3.5 text-slate-400" />
            <span>Landing Page</span>
          </button>
        )}

        {/* Settings */}
        <button
          id="btn-settings"
          onClick={onOpenSettings}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <Settings className="h-3.5 w-3.5 text-slate-400" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};
