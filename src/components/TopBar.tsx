import React, { useState } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  X,
  Globe,
  MapPin,
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
    <header className="h-16 border-b border-slate-200 bg-white px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">

      {/* Left: Greeting */}
      <div>
        <h1 className="text-base font-semibold tracking-tight text-slate-900 leading-tight">
          Good morning, {currentHouseholdProfile.familyName}
        </h1>
        <p className="text-[11px] text-slate-400 font-normal leading-tight mt-0.5 flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {currentHouseholdProfile.homeCity}
          <span className="text-slate-300">·</span>
          <span>Here&apos;s what needs your attention today</span>
        </p>
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-2.5">

        {/* Landing page link */}
        {onNavigateRoute && (
          <button
            onClick={() => onNavigateRoute('/')}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-xs font-medium transition-colors"
            title="View landing page"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>Landing</span>
          </button>
        )}

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-60 lg:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or ask anything…"
            className="w-full h-8 pl-8 pr-7 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-400 focus:outline-none transition-all"
          />
          <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </form>

        {/* Mobile search */}
        <button
          onClick={() => onOpenAssistant()}
          className="md:hidden h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
          title="Search"
        >
          <Search className="h-3.5 w-3.5" />
        </button>

        {/* Notifications */}
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
            className="relative h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
            title="Notifications"
          >
            <Bell className="h-3.5 w-3.5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-slate-900 text-white text-[9px] font-semibold flex items-center justify-center leading-none">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {isNotificationMenuOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white border border-slate-200 shadow-xl p-3 z-50">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-2.5">
                <span className="text-xs font-semibold text-slate-900">Announcements</span>
                <span className="text-[10px] text-slate-400">{announcements.length} updates</span>
              </div>
              <div className="space-y-1.5 max-h-72 overflow-y-auto">
                {announcements.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-medium text-slate-800 leading-snug">{item.title}</p>
                      {!item.read && (
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-1" />
                      )}
                    </div>
                    {item.detail && (
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">{item.detail}</p>
                    )}
                    <span className="text-[10px] text-slate-400 mt-1 block">{item.timeAgo}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    setIsNotificationMenuOpen(false);
                    onNavigateTab('overview');
                  }}
                  className="text-[11px] text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all
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

        {/* Household profile */}
        <div className="relative">
          <button
            id="btn-family-profile"
            onClick={() => {
              setIsProfileMenuOpen(!isProfileMenuOpen);
              setIsNotificationMenuOpen(false);
            }}
            className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <div className="flex -space-x-1.5">
              {familyMembers.slice(0, 3).map((m) => (
                <MemberAvatar key={m.id} member={m} size="sm" className="ring-2 ring-white" />
              ))}
              {familyMembers.length > 3 && (
                <div className="h-6 w-6 rounded-full bg-slate-100 ring-2 ring-white flex items-center justify-center text-[9px] font-semibold text-slate-600">
                  +{familyMembers.length - 3}
                </div>
              )}
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-xs font-semibold text-slate-900 block leading-tight">
                {currentHouseholdProfile.familyName}
              </span>
              <span className="text-[10px] text-slate-400 block leading-tight">
                {familyMembers.length} members
              </span>
            </div>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white border border-slate-200 shadow-xl p-3 z-50">
              <div className="pb-2.5 border-b border-slate-100 mb-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900">
                    {currentHouseholdProfile.familyName}
                  </span>
                  <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 px-1.5 py-0.5 rounded">
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

              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Household Members
              </p>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {familyMembers.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onNavigateTab('family');
                    }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <MemberAvatar member={m} size="md" />
                      <div>
                        <span className="text-xs font-medium text-slate-900 block leading-none">{m.name}</span>
                        <span className="text-[10px] text-slate-500 mt-0.5 block">{m.relationship}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">{m.statusLabel}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2.5 mt-2.5 border-t border-slate-100 space-y-1">
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onNavigateTab('family');
                  }}
                  className="w-full text-center text-xs font-medium text-blue-600 hover:text-blue-700 py-1 block transition-colors"
                >
                  Manage Household
                </button>
                {onNavigateRoute && (
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onNavigateRoute('/');
                    }}
                    className="w-full text-center text-xs font-medium text-slate-500 hover:text-slate-900 py-1 block transition-colors"
                  >
                    Landing Page
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
