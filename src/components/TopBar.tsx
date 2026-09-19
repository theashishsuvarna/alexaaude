import React, { useState } from 'react';
import {
  Search,
  Bell,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Sparkles,
  ChevronDown,
  X,
  Shield,
  Home,
  Check,
  Volume2,
  Radio,
  Users,
  Mic,
  Globe,
} from 'lucide-react';
import { AnnouncementItem, FamilyMember, FamilyHouseholdProfile } from '../types/family';
import { MemberAvatar } from './MemberAvatar';

interface TopBarProps {
  familyMembers: FamilyMember[];
  announcements: AnnouncementItem[];
  unreadNotificationCount: number;
  currentHouseholdProfile: FamilyHouseholdProfile;
  householdProfileKey?: 'kohli';
  onSwitchHousehold?: (profileKey: 'kohli') => void;
  onOpenAssistant: (query?: string) => void;
  onNavigateTab: (tab: string) => void;
  onNavigateRoute?: (route: string) => void;
  onMarkNotificationsRead?: () => void;
  onTriggerMorningBriefing?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  familyMembers,
  announcements,
  unreadNotificationCount,
  currentHouseholdProfile,
  onOpenAssistant,
  onNavigateTab,
  onNavigateRoute,
  onMarkNotificationsRead,
  onTriggerMorningBriefing,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenAssistant(searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <header className="h-20 border-b border-slate-200 bg-white px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Greeting and subtitle */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Good morning, {currentHouseholdProfile.familyName}
          </h1>
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
            <Mic className="h-3 w-3 text-cyan-600 animate-pulse" />
            <span>Voice Intelligence Active · {currentHouseholdProfile.homeCity}</span>
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
          Here&apos;s what needs your attention today.
        </p>
      </div>

      {/* Right: Search, Morning Briefing Button, Notifications, Household Profile */}
      <div className="flex items-center gap-3">
        {/* Landing Page Link */}
        {onNavigateRoute && (
          <button
            onClick={() => onNavigateRoute('/')}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
            title="View AlexaAude Landing Page"
          >
            <Globe className="h-3.5 w-3.5 text-slate-500" />
            <span>Landing Page</span>
          </button>
        )}

        {/* Morning Briefing Quick Trigger (Section 20) */}
        <button
          onClick={onTriggerMorningBriefing}
          className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors"
          title="Play simulated AlexaAude morning briefing"
        >
          <Volume2 className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
          <span>&ldquo;AlexaAude, Good Morning&rdquo;</span>
        </button>

        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-64 lg:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search schedules, bills, groceries..."
            className="w-full h-9 pl-9 pr-8 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
          />
          <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </form>

        {/* Mobile Search Button */}
        <button
          onClick={() => onOpenAssistant()}
          className="md:hidden h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
          title="Search or Ask"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Notifications Button & Dropdown */}
        <div className="relative">
          <button
            id="btn-notifications"
            onClick={() => {
              setIsNotificationMenuOpen(!isNotificationMenuOpen);
              setIsProfileMenuOpen(false);
              if (!isNotificationMenuOpen && onMarkNotificationsRead) {
                onMarkNotificationsRead();
              }
            }}
            className="relative h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-blue-600 text-white text-[10px] font-semibold flex items-center justify-center">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {isNotificationMenuOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="text-xs font-semibold text-slate-900">Family Announcements</span>
                <span className="text-[11px] text-slate-400">{announcements.length} updates</span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {announcements.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-slate-800 text-xs leading-snug">{item.title}</p>
                      {!item.read && (
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-1" />
                      )}
                    </div>
                    {item.detail && (
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">{item.detail}</p>
                    )}
                    <span className="text-[10px] text-slate-400 mt-1 block">{item.timeAgo}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    setIsNotificationMenuOpen(false);
                    onNavigateTab('overview');
                  }}
                  className="text-[11px] text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all in dashboard
                </button>
                <button
                  onClick={() => setIsNotificationMenuOpen(false)}
                  className="text-[11px] text-slate-400 hover:text-slate-600"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Household Profile / Switcher Dropdown */}
        <div className="relative">
          <button
            id="btn-family-profile"
            onClick={() => {
              setIsProfileMenuOpen(!isProfileMenuOpen);
              setIsNotificationMenuOpen(false);
            }}
            className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            {/* Stacked avatars */}
            <div className="flex -space-x-1.5 overflow-hidden">
              {familyMembers.map((m) => (
                <MemberAvatar
                  key={m.id}
                  member={m}
                  size="sm"
                  className="ring-2 ring-white"
                />
              ))}
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-xs font-semibold text-slate-900 block leading-tight">
                Kohli Family
              </span>
              <span className="text-[10px] text-slate-500 block leading-tight">
                4 Members · Mumbai
              </span>
            </div>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {/* Profile Dropdown */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="pb-2.5 border-b border-slate-100 mb-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900 block">
                    {currentHouseholdProfile.familyName}
                  </span>
                  <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  {currentHouseholdProfile.residenceLabel}
                </span>
                <p className="text-[10px] text-slate-400 mt-1 font-mono uppercase tracking-wider">
                  {currentHouseholdProfile.disclaimerNote}
                </p>
              </div>

              {/* Current Family Members Preview */}
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Household Members:
              </label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {familyMembers.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onNavigateTab('family');
                    }}
                    className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <MemberAvatar member={m} size="md" />
                      <div>
                        <span className="text-xs font-medium text-slate-900 block leading-none">{m.name}</span>
                        <span className="text-[10px] text-slate-500">{m.relationship}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-slate-500">{m.statusLabel}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 mt-2 border-t border-slate-100 space-y-1">
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onNavigateTab('family');
                  }}
                  className="w-full text-center text-xs font-medium text-blue-600 hover:text-blue-700 py-1 block"
                >
                  Manage Household & Members
                </button>
                {onNavigateRoute && (
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onNavigateRoute('/');
                    }}
                    className="w-full text-center text-xs font-medium text-slate-500 hover:text-slate-900 py-1 block"
                  >
                    View AlexaAude Landing Page
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
