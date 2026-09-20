export type FamilyMemberRole =
  | 'father'
  | 'mother'
  | 'son'
  | 'daughter'
  | 'grandfather'
  | 'grandmother'
  | 'spouse'
  | 'child'
  | 'parent'
  | 'grandparent'
  | 'relative';

export interface FamilyMember {
  id: string;
  name: string;
  nickname: string;
  role: FamilyMemberRole;
  relationship: string;
  avatar: string;
  status: 'working' | 'client_meeting' | 'school' | 'at_home' | 'free' | 'busy';
  statusLabel: string;
  availability: string;
  workplaceOrSchool?: string;
  typicalHours?: string;
  location?: string;
  battery?: number;
  currentTask?: string;
  upcomingEvent?: string;
  notes?: string;
  allergiesOrDiet?: string[];
  medications?: string[];
}

export interface TodayTimelineItem {
  id: string;
  time: string;
  member: string;
  memberId: string;
  title: string;
  location?: string;
  category: 'work' | 'school' | 'family' | 'health' | 'pickup';
  completed?: boolean;
  conflictWarning?: string;
  pickupAssignedTo?: string;
}

export interface NeedsAttentionItem {
  id: string;
  title: string;
  category: 'home' | 'groceries' | 'school' | 'bills' | 'health' | 'travel';
  urgency: 'high' | 'medium' | 'low';
  actionLabel: 'Schedule' | 'Confirm' | 'Review order' | 'Review' | 'View' | 'Pay' | string;
  actionType:
    | 'schedule_ac'
    | 'confirm_ptm'
    | 'review_groceries'
    | 'review_bill'
    | 'view_doctor'
    | 'pay_electricity'
    | string;
  dueDateOrStatus: string;
  details?: string;
}

export interface UpcomingEventItem {
  id: string;
  dayLabel: string; // "Tomorrow", "Thursday", "Friday", "Saturday"
  title: string;
  time: string;
  category: string;
  member: string;
  location?: string;
}

export interface HomeDeviceStatus {
  id: string;
  name: string;
  statusText: string;
  statusType: 'warning' | 'healthy' | 'attention';
  detail: string;
  iconName: string;
  room?: string;
  energyImpact?: string;
  usageChangePercent?: number;
  cyclesThisMonth?: number;
  replacementDays?: number;
}

export interface SmartDeviceDetail {
  id: string;
  name: string;
  type:
    | 'ac'
    | 'washing_machine'
    | 'refrigerator'
    | 'water_purifier'
    | 'tv'
    | 'lights'
    | 'plug'
    | 'thermostat'
    | 'sensor'
    | 'security'
    | 'energy_meter'
    | 'router';
  room: string;
  status: 'active' | 'standby' | 'attention_needed' | 'offline';
  usageMetric: string;
  energyImpactMonthly: number; // in INR
  energyImpactChangePercent?: number;
  insightNote: string;
  lastActive: string;
  iconName: string;
  isPowerOn: boolean;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  category: 'school' | 'bills' | 'delivery' | 'health' | 'work' | 'insurance' | 'home';
  timeAgo: string;
  read?: boolean;
  detail?: string;
}

export interface FamilyTaskItem {
  id: string;
  title: string;
  assignedTo: string;
  dueDate: string;
  completed: boolean;
  priority: 'high' | 'normal' | 'low';
  category: 'chores' | 'school' | 'errands' | 'home' | 'health' | 'finance';
}

export interface FinancialHealth {
  monthlyHouseholdIncome: number; // ₹5,80,000
  availableThisMonth: number; // ₹4,28,500
  upcomingCommitments: number; // ₹1,20,000
  monthlyPlannedSpending: number; // ₹3,10,000
  savingsGoal: number; // ₹10,00,000
  currentSavings: number; // ₹4,28,000
  progressPercent: number; // 42.8%
  insight: string;
  discretionaryInsight: string;
  currencySymbol: string;
  savingsGoals: SavingsGoal[];
  upcomingBills: RecurringBill[];
}

export interface SavingsGoal {
  id: string;
  title: string;
  category: 'travel' | 'education' | 'emergency' | 'home';
  currentAmount: number;
  targetAmount: number;
  targetDate: string;
  color: string;
  iconName: string;
  monthlyContribution: number;
}

export interface RecurringBill {
  id: string;
  name: string;
  category: 'utilities' | 'streaming' | 'mortgage' | 'insurance' | 'education' | 'wellness';
  amount: number;
  dueDate: string;
  status: 'paid' | 'due_soon' | 'autopay_scheduled';
  frequency: 'monthly' | 'quarterly' | 'annual';
  provider: string;
  isSubscription?: boolean;
}

export type CalendarEventCategory =
  | 'work'
  | 'school'
  | 'ptm'
  | 'health'
  | 'family'
  | 'home_service'
  | 'sports'
  | 'entertainment';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  memberIds: string[];
  startTime: string;
  endTime: string;
  dateStr: string;
  category: CalendarEventCategory;
  location?: string;
  isHighPriority?: boolean;
  notes?: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  category: 'dairy' | 'produce' | 'bakery' | 'pantry' | 'household';
  lastPurchasedDate: string;
  typicalLifespanDays: number;
  daysRemainingEst: number;
  status: 'critical' | 'low' | 'adequate' | 'stocked';
  purchaseFrequencyAvgDays: number;
  quantityEst: string;
  inShoppingList: boolean;
  predictedRunOutDate: string;
  brandOrStore: string;
  estimatedCost: number;
  urgencyNote?: string;
}

export interface ApplianceMaintenance {
  id: string;
  name: string;
  location: string;
  model: string;
  purchaseDate: string;
  warrantyExpiry: string;
  isUnderWarranty: boolean;
  lastServiced: string;
  nextRecommendedService: string;
  filterOrConsumableLifePercent: number;
  healthScore: number;
  urgency: 'normal' | 'service_soon' | 'urgent';
  assignedTechnician?: string;
  manualDocId?: string;
  notes?: string;
}

export interface VacationPlan {
  id: string;
  destination: string;
  country: string;
  theme: string;
  targetWindow: string;
  durationDays: number;
  estimatedCost: number;
  affordabilityStatus: 'approved' | 'stretch' | 'requires_savings_allocation';
  aiAffordabilityNote: string;
  highlights: string[];
  itineraryDays: {
    dayNumber: number;
    title: string;
    summary: string;
    activities: string[];
    costEst: number;
  }[];
  budgetBreakdown: {
    flights: number;
    stay: number;
    dining: number;
    activities: number;
    contingency: number;
  };
}

export interface FamilyDocument {
  id: string;
  title: string;
  category: 'identity' | 'medical' | 'property' | 'warranty' | 'school' | 'insurance';
  ownerMemberId?: string;
  expiryDate?: string;
  fileType: 'pdf' | 'jpg' | 'doc';
  fileSize: string;
  secureLevel: 'vault_encrypted' | 'standard';
  tags: string[];
  lastUpdated: string;
  downloadUrl?: string;
}

export interface LifeEventTask {
  id: string;
  title: string;
  category: string;
  assignedTo: string;
  dueDate: string;
  completed: boolean;
  phase: string;
}

export interface LifeEventPlan {
  id: string;
  title: string;
  description: string;
  category: 'moving' | 'school_year' | 'festival' | 'vacation' | 'renovation' | 'purchase';
  targetDate: string;
  status: 'active' | 'planning' | 'completed';
  progressPercent: number;
  tasks: LifeEventTask[];
}

export interface FamilyHouseholdProfile {
  id: 'kohli';
  familyName: string;
  displayGreeting: string;
  homeCity: string;
  residenceLabel: string;
  members: FamilyMember[];
  disclaimerNote: string;
}

export type AiActionCard = {
  type: 'finance_summary' | 'vacation_preview' | 'grocery_alert' | 'service_booking' | 'upcoming_bills' | 'responsibility_action' | 'entertainment_plan' | 'custom';
  data?: any;
  title: string;
  subtitle?: string;
  badge?: string;
  buttonLabel?: string;
  tabTarget?: string;
};

export interface AiMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  actionCards?: AiActionCard[];
}
