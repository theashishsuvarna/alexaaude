import { AiMessage } from '../types/family';
import {
  INITIAL_FINANCIAL_HEALTH,
  INITIAL_GROCERY_ITEMS,
  INITIAL_APPLIANCES,
  INITIAL_VACATION_PLAN,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_FAMILY_MEMBERS,
} from '../data/mockFamilyData';

export async function processFamilyAiQuery(query: string): Promise<AiMessage> {
  const normalized = query.toLowerCase().trim();

  // Natural brief processing
  await new Promise((resolve) => setTimeout(resolve, 400));

  // 1. "Can we afford a vacation in December?"
  if (
    normalized.includes('afford') ||
    normalized.includes('vacation') ||
    normalized.includes('trip')
  ) {
    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      timestamp: 'Just now',
      content:
        "December vacation looks feasible. Both parents' leave windows overlap with Emma and Alex's school holidays (Dec 22–28). Based on your current savings plan, a ₹75,000 trip fits within the planned budget with ₹4,28,500 available liquidity this month.",
      actionCards: [
        {
          type: 'vacation_preview',
          title: 'December Alpine Chalet (₹75,000)',
        },
      ],
    };
  }

  // 2. "Plan a 5-day family vacation"
  if (normalized.includes('plan') && (normalized.includes('vacation') || normalized.includes('5-day'))) {
    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      timestamp: 'Just now',
      content:
        'Here is a recommended 5-day winter itinerary:\n• Day 1: Mountain arrival & ski equipment fitting\n• Day 2: Beginner ski lessons for Emma & Alex\n• Day 3: Lake Louise ice magic & sleigh ride\n• Day 4: Gondola ascent & scenic mountain summit\n• Day 5: Village crafts & celebratory dinner\nAll activities fit inside the ₹75,000 budget pot.',
      actionCards: [
        {
          type: 'vacation_preview',
          title: '5-Day Alpine Ski Itinerary',
        },
      ],
    };
  }

  // 3. "What groceries are we likely to run out of?"
  if (normalized.includes('grocer') || normalized.includes('buy') || normalized.includes('run out')) {
    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      timestamp: 'Just now',
      content:
        'Based on previous household order cycles, 3 essentials are running low:\n1. Organic Whole Milk (< 1 day remaining)\n2. Pasture-Raised Brown Eggs (3 eggs remaining)\n3. Artisanal Sourdough Bread (2 slices remaining)\nEstimated replenishment total: ₹335.',
      actionCards: [
        {
          type: 'grocery_alert',
          title: 'Replenish 3 Low Staples (₹335)',
        },
      ],
    };
  }

  // 4. "Our AC needs servicing"
  if (normalized.includes('ac') || normalized.includes('servicing') || normalized.includes('hvac')) {
    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      timestamp: 'Just now',
      content:
        'Carrier AC split unit has an airflow restriction warning (filter at 12% life). Certified technician Suresh Kumar is available tomorrow at 11:00 AM. Warranty covers the diagnostic and coil inspection.',
      actionCards: [
        {
          type: 'service_booking',
          title: 'Carrier Tech Window: Tomorrow 11:00 AM',
        },
      ],
    };
  }

  // 5. "What bills are coming up?"
  if (normalized.includes('bill') || normalized.includes('pay')) {
    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      timestamp: 'Just now',
      content:
        'Upcoming household bills for late September:\n• Electricity Bill: ₹4,850 (Due in 3 days · Sept 22)\n• Broadband Fiber: ₹1,499 (Autopay scheduled Sept 28)\n• Mortgage EMI: ₹85,000 (Autopay scheduled Oct 01)',
      actionCards: [
        {
          type: 'upcoming_bills',
          title: 'Electricity Bill Due: ₹4,850',
        },
      ],
    };
  }

  // Fallback natural assistant response
  return {
    id: 'msg-' + Date.now(),
    sender: 'assistant',
    timestamp: 'Just now',
    content:
      'I checked across your family calendar, finances, and home devices. Everything is on schedule. You can ask me to plan vacations, check grocery replenishment, review upcoming bills, or inspect home maintenance.',
  };
}
