import {
  INITIAL_FAMILY_MEMBERS,
  INITIAL_FINANCIAL_HEALTH,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_FAMILY_TASKS,
  INITIAL_APPLIANCES,
  INITIAL_DOCUMENTS,
  INITIAL_GROCERY_ITEMS,
  INITIAL_SMART_DEVICES,
  INITIAL_VACATION_PLAN,
} from '../data/mockFamilyData';
import {
  FamilyMember,
  FinancialHealth,
  CalendarEvent,
  FamilyTaskItem,
  ApplianceMaintenance,
  FamilyDocument,
  GroceryItem,
  SmartDeviceDetail,
  VacationPlan,
} from '../types/family';

export interface FamilyContextState {
  familyName: string;
  homeCity: string;
  members: FamilyMember[];
  financialHealth: FinancialHealth;
  calendarEvents: CalendarEvent[];
  tasks: FamilyTaskItem[];
  appliances: ApplianceMaintenance[];
  documents: FamilyDocument[];
  groceryItems: GroceryItem[];
  smartDevices: SmartDeviceDetail[];
  vacationPlan: VacationPlan;
}

export const familyContext: FamilyContextState = {
  familyName: 'Kohli Family',
  homeCity: 'Mumbai',
  members: INITIAL_FAMILY_MEMBERS,
  financialHealth: INITIAL_FINANCIAL_HEALTH,
  calendarEvents: INITIAL_CALENDAR_EVENTS,
  tasks: INITIAL_FAMILY_TASKS,
  appliances: INITIAL_APPLIANCES,
  documents: INITIAL_DOCUMENTS,
  groceryItems: INITIAL_GROCERY_ITEMS,
  smartDevices: INITIAL_SMART_DEVICES,
  vacationPlan: INITIAL_VACATION_PLAN,
};

export function getFamilyContext(): FamilyContextState {
  return familyContext;
}
