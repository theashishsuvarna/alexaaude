import React, { useState } from 'react';
import {
  HOUSEHOLD_PROFILES,
  KOHLI_FAMILY_MEMBERS,
  INITIAL_SMART_DEVICES,
  INITIAL_LIFE_EVENTS,
  INITIAL_TODAY_TIMELINE,
  INITIAL_NEEDS_ATTENTION,
  INITIAL_UPCOMING_EVENTS,
  INITIAL_HOME_DEVICES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_FAMILY_TASKS,
  INITIAL_FINANCIAL_HEALTH,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_GROCERY_ITEMS,
  INITIAL_APPLIANCES,
  INITIAL_VACATION_PLAN,
  INITIAL_DOCUMENTS,
} from './data/mockFamilyData';

import {
  FamilyMember,
  TodayTimelineItem,
  NeedsAttentionItem,
  UpcomingEventItem,
  HomeDeviceStatus,
  AnnouncementItem,
  FamilyTaskItem,
  FinancialHealth,
  CalendarEvent,
  GroceryItem,
  ApplianceMaintenance,
  VacationPlan,
  FamilyDocument,
  SmartDeviceDetail,
  LifeEventPlan,
} from './types/family';

import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DashboardOverview } from './components/DashboardOverview';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { FloatingAssistantBar } from './components/FloatingAssistantBar';
import { MorningBriefingModal } from './components/MorningBriefingModal';

// Tab Views
import { FamilyView } from './components/views/FamilyView';
import { CalendarView } from './components/views/CalendarView';
import { TasksView } from './components/views/TasksView';
import { MoneyView } from './components/views/MoneyView';
import { HomeView } from './components/views/HomeView';
import { SmartDevicesView } from './components/views/SmartDevicesView';
import { ShoppingView } from './components/views/ShoppingView';
import { TravelView } from './components/views/TravelView';
import { DocumentsView } from './components/views/DocumentsView';
import { LifeEventsView } from './components/views/LifeEventsView';
import { SettingsModal } from './components/views/SettingsModal';

// Landing Page & Auth Flow Components
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';

export default function App() {
  // Top-Level Route State: '/' | '/login' | '/signup' | '/onboarding' | '/dashboard'
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (['/login', '/signup', '/onboarding', '/dashboard'].includes(path)) {
        return path;
      }
      const hash = window.location.hash.replace('#', '');
      if (['/login', '/signup', '/onboarding', '/dashboard'].includes(hash)) {
        return hash;
      }
    }
    return '/';
  });

  // Listen to browser forward/back buttons
  React.useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (['/', '/login', '/signup', '/onboarding', '/dashboard'].includes(path)) {
        setCurrentRoute(path);
      } else {
        const hash = window.location.hash.replace('#', '');
        if (['/', '/login', '/signup', '/onboarding', '/dashboard'].includes(hash)) {
          setCurrentRoute(hash);
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', route);
    }
  };

  // Household Profile State (Kohli Family)
  const [householdKey, setHouseholdKey] = useState<'kohli'>('kohli');
  const currentHousehold = HOUSEHOLD_PROFILES[householdKey];

  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Core Data State
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(currentHousehold.members);
  const [todayTimeline, setTodayTimeline] = useState<TodayTimelineItem[]>(INITIAL_TODAY_TIMELINE);
  const [needsAttention, setNeedsAttention] = useState<NeedsAttentionItem[]>(INITIAL_NEEDS_ATTENTION);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEventItem[]>(INITIAL_UPCOMING_EVENTS);
  const [homeDevices] = useState<HomeDeviceStatus[]>(INITIAL_HOME_DEVICES);
  const [smartDevices, setSmartDevices] = useState<SmartDeviceDetail[]>(INITIAL_SMART_DEVICES);
  const [lifeEvents, setLifeEvents] = useState<LifeEventPlan[]>(INITIAL_LIFE_EVENTS);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(INITIAL_ANNOUNCEMENTS);
  const [familyTasks, setFamilyTasks] = useState<FamilyTaskItem[]>(INITIAL_FAMILY_TASKS);
  const [financialHealth, setFinancialHealth] = useState<FinancialHealth>(INITIAL_FINANCIAL_HEALTH);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(INITIAL_CALENDAR_EVENTS);
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(INITIAL_GROCERY_ITEMS);
  const [appliances] = useState<ApplianceMaintenance[]>(INITIAL_APPLIANCES);
  const [vacationPlan] = useState<VacationPlan>(INITIAL_VACATION_PLAN);
  const [documents] = useState<FamilyDocument[]>(INITIAL_DOCUMENTS);

  // Drawer & Modal State
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantInitialQuery, setAssistantInitialQuery] = useState<string | undefined>(undefined);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMorningBriefingOpen, setIsMorningBriefingOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  // Switch Household profile
  const handleSwitchHousehold = (key: 'kohli') => {
    setHouseholdKey(key);
    setFamilyMembers(HOUSEHOLD_PROFILES[key].members);
  };

  // Handler for triggering AI Assistant
  const handleOpenAssistant = (query?: string) => {
    setAssistantInitialQuery(query);
    setIsAssistantOpen(true);
  };

  // Handler for dashboard action button clicks
  const handleDashboardAction = (actionType: string, itemTitle: string) => {
    if (actionType === 'schedule_ac') {
      setActiveTab('home');
    } else if (actionType === 'review_groceries') {
      setActiveTab('shopping');
    } else if (actionType === 'confirm_ptm') {
      setNeedsAttention((prev) =>
        prev.map((item) =>
          item.actionType === 'confirm_ptm'
            ? { ...item, dueDateOrStatus: 'Confirmed with Mrs. Sharma (Scottish High)' }
            : item
        )
      );
    } else if (actionType === 'pay_electricity') {
      setActiveTab('money');
    } else if (actionType === 'view_flights') {
      setActiveTab('travel');
    }
  };

  const handleAddCalendarEvent = (newEvent: CalendarEvent) => {
    setCalendarEvents((prev) => [newEvent, ...prev]);
  };

  const handleMarkNotificationsRead = () => {
    setUnreadNotifications(0);
    setAnnouncements((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  // 1. Landing Page View
  if (currentRoute === '/') {
    return (
      <LandingPage
        onNavigate={navigate}
        onOpenDashboardTab={(tab) => {
          setActiveTab(tab);
          navigate('/dashboard');
        }}
      />
    );
  }

  // 2. Authentication: Login View
  if (currentRoute === '/login') {
    return (
      <LoginPage
        onNavigate={navigate}
        onLoginSuccess={() => navigate('/dashboard')}
      />
    );
  }

  // 3. Authentication: Signup View
  if (currentRoute === '/signup') {
    return (
      <SignupPage
        onNavigate={navigate}
        onSignupSuccess={() => navigate('/onboarding')}
      />
    );
  }

  // 4. Household Onboarding Flow View
  if (currentRoute === '/onboarding') {
    return (
      <OnboardingFlow
        onNavigate={navigate}
        onComplete={() => navigate('/dashboard')}
        initialName={currentHousehold.members[0]?.name}
        initialFamilyName={currentHousehold.familyName}
      />
    );
  }

  // 5. Existing AlexaAude Family OS Dashboard View (/dashboard or default)
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-row font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onOpenAssistant={handleOpenAssistant}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onNavigateRoute={navigate}
          attentionCount={needsAttention.length}
          homeCity={currentHousehold.homeCity}
          familyName={currentHousehold.familyName}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <TopBar
          familyMembers={familyMembers}
          announcements={announcements}
          unreadNotificationCount={unreadNotifications}
          currentHouseholdProfile={currentHousehold}
          householdProfileKey={householdKey}
          onSwitchHousehold={handleSwitchHousehold}
          onOpenAssistant={handleOpenAssistant}
          onNavigateTab={setActiveTab}
          onNavigateRoute={navigate}
          onMarkNotificationsRead={handleMarkNotificationsRead}
          onTriggerMorningBriefing={() => setIsMorningBriefingOpen(true)}
        />

        {/* Mobile Navigation Bar */}
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'family', label: 'Family' },
            { id: 'calendar', label: 'Calendar' },
            { id: 'tasks', label: 'Tasks' },
            { id: 'money', label: 'Money' },
            { id: 'home', label: 'Home' },
            { id: 'smart-devices', label: 'Devices' },
            { id: 'shopping', label: 'Shopping' },
            { id: 'travel', label: 'Travel' },
            { id: 'documents', label: 'Docs' },
            { id: 'life-events', label: 'Life Events' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* View Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'overview' && (
            <DashboardOverview
              familyMembers={familyMembers}
              todayTimeline={todayTimeline}
              needsAttention={needsAttention}
              upcomingEvents={upcomingEvents}
              homeDevices={homeDevices}
              announcements={announcements}
              financialHealth={financialHealth}
              groceries={groceryItems}
              householdProfile={currentHousehold}
              onNavigateTab={setActiveTab}
              onOpenAssistant={handleOpenAssistant}
              onActionClick={handleDashboardAction}
            />
          )}

          {activeTab === 'family' && (
            <FamilyView
              familyMembers={familyMembers}
              familyName={currentHousehold.familyName}
              onOpenAssistant={handleOpenAssistant}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarView
              events={calendarEvents}
              familyMembers={familyMembers}
              onAddEvent={handleAddCalendarEvent}
            />
          )}

          {activeTab === 'tasks' && (
            <TasksView
              tasks={familyTasks}
              onToggleTask={(id) => {
                setFamilyTasks((prev) =>
                  prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
                );
              }}
              onAddTask={(newTask) => {
                setFamilyTasks((prev) => [newTask, ...prev]);
              }}
            />
          )}

          {activeTab === 'money' && (
            <MoneyView
              financialHealth={financialHealth}
              onOpenAssistant={handleOpenAssistant}
            />
          )}

          {activeTab === 'home' && (
            <HomeView
              appliances={appliances}
              homeDevices={homeDevices}
              onNavigateTab={setActiveTab}
              onOpenAssistant={handleOpenAssistant}
            />
          )}

          {activeTab === 'smart-devices' && (
            <SmartDevicesView
              smartDevices={smartDevices}
              onOpenAssistant={handleOpenAssistant}
            />
          )}

          {activeTab === 'shopping' && (
            <ShoppingView
              groceries={groceryItems}
              onOpenAssistant={handleOpenAssistant}
            />
          )}

          {activeTab === 'travel' && (
            <TravelView
              vacationPlan={vacationPlan}
              onOpenAssistant={handleOpenAssistant}
            />
          )}

          {activeTab === 'documents' && (
            <DocumentsView
              documents={documents}
              onOpenAssistant={handleOpenAssistant}
            />
          )}

          {activeTab === 'life-events' && (
            <LifeEventsView
              lifeEvents={lifeEvents}
              onOpenAssistant={handleOpenAssistant}
            />
          )}
        </main>
      </div>

      {/* Floating Assistant Launcher Bar (Section 9) */}
      <FloatingAssistantBar onOpenAssistant={handleOpenAssistant} />

      {/* AI Assistant Drawer Panel */}
      <AiAssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        initialQuery={assistantInitialQuery}
        onNavigateTab={setActiveTab}
        onPerformAction={handleDashboardAction}
        householdProfile={currentHousehold}
      />

      {/* Morning Briefing Modal */}
      <MorningBriefingModal
        isOpen={isMorningBriefingOpen}
        onClose={() => setIsMorningBriefingOpen(false)}
        householdProfile={currentHousehold}
        onNavigateTab={setActiveTab}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        familyMembers={familyMembers}
        householdProfile={currentHousehold}
      />
    </div>
  );
}
