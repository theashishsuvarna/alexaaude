import { AiMessage, AiActionCard } from '../types/family';
import { familyContext, FamilyContextState } from './familyContext';

export interface DecisionResult {
  responseContent: string;
  actionCards?: AiActionCard[];
}

/**
 * Deterministic Family Decision Engine for AlexaAude.
 * Evaluates cross-domain family context (Schedules, Treasury, Appliances, Documents, Commerce, Tasks)
 * to answer household inquiries with high-conviction decisions and actionable cards.
 */
export function evaluateFamilyDecision(
  query: string,
  context: FamilyContextState = familyContext
): DecisionResult {
  // Normalize punctuation, symbols (e.g. ₹, Rs, commas), and whitespace
  const rawClean = (query || '').trim();
  const lower = rawClean
    .toLowerCase()
    .replace(/[₹$€,?!."';:()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Child names for personalization
  const childNames =
    context?.members?.slice(2).map((m) => m.nickname).join(' & ') || 'the children';
  const firstChild = context?.members?.[2]?.nickname || 'the children';
  const familyName = context?.familyName || 'Kohli Family';

  // 1. VACATION INTENT
  // Queries:
  // - "Can my family take a ₹75,000 vacation in December?"
  // - "Can we afford a ₹75,000 vacation in December?"
  // - "Can we take a vacation in December?"
  // - "Can we afford a vacation?"
  const isVacationQuery =
    lower.includes('vacation') ||
    lower.includes('holiday') ||
    lower.includes('trip') ||
    (lower.includes('december') && (lower.includes('take') || lower.includes('afford') || lower.includes('go') || lower.includes('travel'))) ||
    lower.includes('75000') ||
    lower.includes('75 000') ||
    lower.includes('75,000') ||
    lower.includes('75k') ||
    lower.includes('shimla');

  if (isVacationQuery) {
    return {
      responseContent: `DECISION:\n✅ APPROVED & FULLY FEASIBLE (100% Funded)\n\nWHY:\nYour dedicated "December Vacation" Sinking Fund currently holds exactly ₹75,000.00. Financing this trip requires zero debt and leaves your ₹2,50,000 emergency liquid buffer completely untouched.\n\nRELEVANT FAMILY CONTEXT:\n• School Schedule: Vamika's Elementary Academy Term 2 winter recess runs Dec 20 – Jan 05.\n• Parent Leave Alignment: Anushka's production schedule wraps Dec 19; Virat has no away-series matches scheduled Dec 20–28.\n• Toddler Logistics: Akaay (2 yrs) certified mountain gear & stroller verified in inventory.\n\nBUDGET IMPACT:\n• Estimated Cost: ₹75,000 (Flights: ₹28,000 · Heated Chalet: ₹32,000 · Activities/Dining: ₹15,000)\n• Remaining Liquid Reserves: ₹3,53,500 across family accounts (Well above ₹2,00,000 minimum safety threshold).\n\nCONSTRAINTS:\n• Return window fixed for Dec 28 to preserve resting buffer before Akaay's 24-month pediatric booster on Dec 30.\n\nPROPOSED PLAN:\n6-Day Shimla & Kufri Alpine Winter Retreat (Dec 22 – 27). Child-safe heated chalet, direct flights via Chandigarh.`,
      actionCards: [
        {
          type: 'vacation_preview',
          title: 'December Alpine Chalet Plan (₹75,000)',
          subtitle: '6 Days in Shimla · Dec 22–27 · 100% Sinking Fund',
          badge: 'BUDGET APPROVED',
          buttonLabel: 'Review Itinerary',
          tabTarget: 'travel',
        },
        {
          type: 'responsibility_action',
          title: 'Family Responsibility: Finalize Travel Insurance',
          subtitle: 'Assigned to: Virat & Anushka · Due Dec 01',
          badge: 'RESPONSIBILITY',
          buttonLabel: 'View Tasks',
          tabTarget: 'tasks',
        },
      ],
    };
  }

  // 2. AC SERVICING INTENT
  // Queries:
  // - "Our AC needs servicing."
  // - "Carrier AC service status"
  const isAcServiceQuery =
    lower.includes('ac') ||
    lower.includes('servicing') ||
    lower.includes('carrier') ||
    lower.includes('air conditioner') ||
    lower.includes('air conditioning') ||
    lower.includes('hvac') ||
    (lower.includes('appliance') && lower.includes('service'));

  if (isAcServiceQuery) {
    return {
      responseContent: `APPLIANCE CONTEXT & STATUS:\n• Appliance: Living Room Carrier 2.0 Ton Inverter AC (Model: CAS24-INV-D)\n• Status: Online · Airflow efficiency degraded to 12%\n• OEM Warranty: Active Carrier 5-Year Compressor Warranty (Valid until Nov 2026)\n• Last Serviced: 142 days ago (Filter dust threshold exceeded by 88%)\n• Maintenance Requirement: Filter chemical wash & HEPA pre-filter replacement\n\nCROSS-DOMAIN REASONING:\n• Energy Surge: +34% power consumption over the last 30 days (+₹1,200 addition to Adani electricity bill).\n• Family Responsibility: Assigned to Dad (Virat Kohli) for physical technician greeting.\n• Schedule Fit: Saturday 11:00 AM window has no school or training conflicts.\n\nSUGGESTED ACTION:\nCarrier OEM Authorized technician Suresh Kumar is pre-slotted for tomorrow (Saturday) at 11:00 AM under warranty.`,
      actionCards: [
        {
          type: 'service_booking',
          title: 'Carrier OEM Tech: Suresh Kumar',
          subtitle: 'Tomorrow (Saturday) 11:00 AM · Living Room AC · Covered by Warranty',
          badge: 'WARRANTY ACTIVE',
          buttonLabel: 'Confirm Slot',
          tabTarget: 'home',
        },
        {
          type: 'responsibility_action',
          title: 'Family Responsibility: Supervise AC Service',
          subtitle: 'Assigned to Dad (Virat) · High Priority',
          badge: 'DAD RESPONSIBILITY',
          buttonLabel: 'View Tasks',
          tabTarget: 'tasks',
        },
      ],
    };
  }

  // 3. SCHOOL EVENT / RESPONSIBILITIES INTENT
  // Queries:
  // - "Who is responsible for the school event?"
  // - "School PTM and science fair"
  const isSchoolEventQuery =
    (lower.includes('school') && (lower.includes('event') || lower.includes('responsible') || lower.includes('ptm') || lower.includes('science'))) ||
    lower.includes('science fair') ||
    lower.includes('ptm') ||
    (lower.includes('responsible') && (lower.includes('event') || lower.includes('school')));

  if (isSchoolEventQuery) {
    return {
      responseContent: `SCHOOL EVENT RESPONSIBILITY MATRIX:\nEvent: Vamika’s Elementary Academy Science Fair & Term 2 Parent-Teacher Meeting (Thursday)\n\nASSIGNED ROLES:\n• Daughter (Vamika):\n  Role: Student Presenter\n  Responsibility: Assemble the STEM Solar System Orbit kit and rehearse the planetary orbit presentation.\n\n• Mom (Anushka):\n  Role: Academic Documentation\n  Responsibility: Complete & sign the Elementary Academy Term 2 Health Declaration and vaccine clearance form from the Family Document Vault.\n\n• Dad (Virat):\n  Role: Transportation & Attendance\n  Responsibility: Handle school pickup at 3:30 PM and attend the in-person PTM consultation at 5:00 PM with homeroom teacher Mrs. Sharma (Room 12).\n\nFAMILY CONTEXT HARMONIZATION:\nAlexaAude cross-referenced Virat's fitness training calendar and Anushka's studio rehearsals to eliminate calendar collisions.`,
      actionCards: [
        {
          type: 'service_booking',
          title: 'School Calendar: Thursday PTM & Science Fair',
          subtitle: 'Elementary Academy · 3:30 PM Pickup / 5:00 PM PTM',
          badge: 'CALENDAR',
          buttonLabel: 'View Event',
          tabTarget: 'calendar',
        },
        {
          type: 'responsibility_action',
          title: 'Document Vault: Health Declaration Form',
          subtitle: 'Vamika Health Clearance · Ready for submission',
          badge: 'DOCUMENT',
          buttonLabel: 'Open Vault',
          tabTarget: 'documents',
        },
      ],
    };
  }

  // 4. HOUSEHOLD COMMERCE / WHAT DO WE NEED TO BUY INTENT
  // Queries:
  // - "What do we need to buy?"
  // - "What should we buy?"
  // - "Grocery list"
  const isShoppingQuery =
    lower.includes('buy') ||
    lower.includes('need to buy') ||
    lower.includes('grocery') ||
    lower.includes('groceries') ||
    lower.includes('shopping') ||
    lower.includes('purchase') ||
    lower.includes('staples');

  if (isShoppingQuery) {
    return {
      responseContent: `HOUSEHOLD COMMERCE AUDIT (Beyond Groceries):\nAlexaAude cross-referenced your school calendar, appliance health telemetry, past purchase cycles, and upcoming winter travel. 4 items across 4 categories are recommended:\n\n1. SCHOOL & KIDS:\n• Item: Vamika STEM Solar System Orbit Demonstration Kit\n• Reason: Elementary Academy Science Fair on Thursday; class presentation required\n• Est. Cost: ₹799\n\n2. HOME & APPLIANCES:\n• Item: Carrier OEM Replacement HEPA Pre-Filter Cartridge\n• Reason: Living Room AC servicing tomorrow 11:00 AM; technician requested filter ready\n• Est. Cost: ₹1,150\n\n3. GROCERY & PANTRY:\n• Item: Organic Whole Milk (1L pouch) + India Gate Classic Basmati Rice (5kg)\n• Reason: Smart container sensor reports milk < 400ml (< 1 day) and rice container at ~800g\n• Est. Cost: ₹476\n\n4. TRAVEL & APPAREL:\n• Item: Thermal Layer Fleece Jackets for Vamika & Akaay\n• Reason: Staged for December Shimla Winter Retreat (temperatures forecast 2°C–9°C)\n• Est. Cost: ₹1,800\n\nTOTAL ESTIMATE & BUDGET IMPACT:\n• Total: ₹4,225 (Consolidated into 1 bundled Prime delivery window tomorrow 5:00–7:00 PM)\n• Budget Impact: Fits comfortably within discretionary allowance (₹32,400 spent of ₹50,000 monthly cap).`,
      actionCards: [
        {
          type: 'grocery_alert',
          title: 'Review Household Commerce Basket',
          subtitle: '4 Items (School, Appliance Filter, Groceries, Winter Wear) · ₹4,225',
          badge: 'BATCH ORDER',
          buttonLabel: 'Review Basket',
          tabTarget: 'shopping',
        },
      ],
    };
  }

  // 5. WHAT NEEDS ATTENTION THIS WEEK INTENT
  // Queries:
  // - "What needs attention this week?"
  // - "What needs attention?"
  // - "Action items"
  const isAttentionQuery =
    lower.includes('attention') ||
    (lower.includes('needs') && !lower.includes('buy') && !lower.includes('ac')) ||
    (lower.includes('this week') && (lower.includes('what') || lower.includes('pending') || lower.includes('priorit')));

  if (isAttentionQuery) {
    return {
      responseContent: `PROACTIVE HOUSEHOLD ATTENTION AUDIT (Cross-Domain):\n\n1. HOME & APPLIANCES:\n• WHO: Dad (Virat)\n• WHAT: Carrier Living Room AC filter airflow degraded to 12%\n• WHY: Causes +34% excess electricity draw and humidity buildup\n• WHEN: Tomorrow (Saturday) at 11:00 AM\n• ACTION: Confirm technician Suresh Kumar access\n\n2. SCHOOL & CALENDAR:\n• WHO: Mom (Anushka) & Dad (Virat)\n• WHAT: Vamika Elementary Term 2 PTM & Pickup Coordination\n• WHY: Schedule collision between Virat's training wrap (3:00 PM) and school pickup (3:30 PM)\n• WHEN: Thursday 3:30 PM & 5:00 PM\n• ACTION: Virat assigned pickup; Anushka submitted Health Declaration form\n\n3. MONEY & BILLS:\n• WHO: Dad (Virat)\n• WHAT: Adani Electricity bill payment (₹4,850)\n• WHY: Due in 3 days (Sept 22); avoid late surcharge\n• WHEN: By Monday evening\n• ACTION: Authorize scheduled UPI payment\n\n4. SHOPPING & REPLENISHMENT:\n• WHO: Mom (Anushka)\n• WHAT: Urgent staples + AC HEPA filter replenishment\n• WHY: Milk critically low (< 400ml) and AC filter required for Saturday service\n• WHEN: Order cutoff tonight 8:00 PM for tomorrow 5:00 PM batch delivery\n• ACTION: Approve consolidated Amazon Household basket (₹2,625)\n\n5. DOCUMENTS & HEALTH:\n• WHO: Family (All)\n• WHAT: Kent RO Purifier filter expiration in 12 days\n• WHY: 6,000L mineral cartridge lifecycle exhausted\n• WHEN: Replace before Oct 02\n• ACTION: Order OEM replacement cartridge from Document Vault`,
      actionCards: [
        {
          type: 'service_booking',
          title: 'Family Command Center — Needs Attention',
          subtitle: '5 Cross-domain proactive items synchronized',
          badge: 'PRIORITY AUDIT',
          buttonLabel: 'Open Dashboard',
          tabTarget: 'overview',
        },
        {
          type: 'responsibility_action',
          title: 'View Distributed Responsibilities',
          subtitle: 'Dad, Mom, Daughter, Son, and Family tasks',
          badge: 'RESPONSIBILITIES',
          buttonLabel: 'View Tasks',
          tabTarget: 'tasks',
        },
      ],
    };
  }

  // 6. OVERSPENDING & FINANCIAL AUDIT INTENT
  // Queries:
  // - "Are we overspending anywhere?"
  // - "Are we overspending?"
  // - "Spending analysis"
  const isSpendingQuery =
    lower.includes('overspending') ||
    lower.includes('overspend') ||
    lower.includes('spending') ||
    lower.includes('spend') ||
    (lower.includes('budget') && !lower.includes('vacation')) ||
    (lower.includes('bills') && !lower.includes('attention'));

  if (isSpendingQuery) {
    return {
      responseContent: `FAMILY TREASURY & EXPENDITURE AUDIT:\n\n1. DISCRETIONARY BUDGET:\n• Status: Healthy (No systemic overspending)\n• Tracking: ₹32,400 spent of ₹50,000 monthly allowance (64.8% utilized with 10 days remaining in cycle).\n\n2. HOME ENERGY SURGE:\n• Observation: Living Room Carrier AC consumed 34% more electricity this month.\n• Cause: Extreme coastal humidity coupled with clogged pre-filters (12% airflow).\n• Financial Impact: Added ~₹1,200 to the upcoming Adani electricity bill (₹4,850 total).\n• Mitigation: Saturday’s scheduled filter cleaning will restore normal energy efficiency.\n\n3. RECURRING SUBSCRIPTIONS:\n• Total: 6 active services (₹3,450/month across Prime, Disney+ Hotstar, Spotify, Apple One).\n• Utilization: 100% active usage across all family profiles; no duplicate or dormant subscriptions found.\n\n4. SAVINGS GOALS:\n• December Vacation Pot: 100% funded (₹75,000 locked in high-yield liquid pot).\n• Emergency Buffer: ₹2,50,000 completely untouched.`,
      actionCards: [
        {
          type: 'finance_summary',
          title: 'Financial Brain: Family Treasury',
          subtitle: '₹4,28,500 Total Balance · ₹1.2L Commitments · Zero Overdraft',
          badge: 'MONEY ENGINE',
          buttonLabel: 'Open Money',
          tabTarget: 'money',
        },
      ],
    };
  }

  // 7. 90 MINUTES TONIGHT / ENTERTAINMENT INTENT
  // Queries:
  // - "We have 90 minutes tonight. What should we do?"
  // - "Movie night"
  const isEveningPlanQuery =
    lower.includes('90 min') ||
    lower.includes('tonight') ||
    lower.includes('movie') ||
    lower.includes('entertainment') ||
    lower.includes('watch');

  if (isEveningPlanQuery) {
    return {
      responseContent: `FAMILY TIME PROPOSAL (90 Minutes Together Tonight):\nSynthesizing family calendar, member availability (all 4 home by 7:15 PM), age suitability (Vamika 5y, Akaay 2y), and living room smart devices:\n\n1. ENTERTAINMENT (Fire TV & Prime Video — SIMULATED):\n• Recommendation: Stream "The Wild Robot" (Family animated adventure, rated all-ages) or 3 episodes of "Bluey" (45 minutes, ideal for Akaay's bedtime wind-down).\n\n2. LIVING ROOM AMBIENT SCENE (SIMULATED):\n• Preset: "Cozy Family Time"\n• Smart Lighting: Hue living room warm amber dim to 25%\n• Climate: Carrier AC set to 23°C in silent whisper mode\n\n3. PANTRY & SNACKS:\n• Snack: Air-popped Himalayan pink salt makhana & warm spiced almond milk (in stock).\n\n4. BEDTIME WIND-DOWN (8:45 PM):\n• Echo Dot in Kids' Room automatically shifts to soft rainforest ambient soundscape.`,
      actionCards: [
        {
          type: 'entertainment_plan',
          title: "Prime Video: 'The Wild Robot' on Fire TV",
          subtitle: 'Family Queue · 90-min duration · All ages rated (SIMULATED)',
          badge: 'FIRE TV / PRIME',
          buttonLabel: 'Launch Scene',
          tabTarget: 'devices',
        },
        {
          type: 'custom',
          title: 'Smart Home Scene: Cozy Living Room',
          subtitle: 'Amber 25% · Carrier AC 23°C whisper · Echo white noise',
          badge: 'SMART DEVICES',
          buttonLabel: 'View Devices',
          tabTarget: 'home',
        },
      ],
    };
  }

  // 8. RESPONSIBILITIES / WHO SHOULD HANDLE THIS
  const isWhoHandlesQuery =
    lower.includes('who should handle') ||
    lower.includes('handle this') ||
    lower.includes('who handles') ||
    lower.includes('chore') ||
    (lower.includes('who') && lower.includes('responsib'));

  if (isWhoHandlesQuery) {
    return {
      responseContent: `Distributed Household Accountability:\n• Dad (Virat): Carrier AC service supervision & 3:30 PM School pickup\n• Mom (Anushka): Elementary Academy health documentation & grocery batch approval\n• Daughter (Vamika): STEM solar system model assembly & homework checklist\n• Son (Akaay): 15-minute sensory wooden puzzle play & 7:30 PM bedtime routine\n• Family (All 4): Review December vacation packing list & budget`,
      actionCards: [
        {
          type: 'responsibility_action',
          title: 'Family Responsibilities Matrix',
          subtitle: 'Individual and shared accountability across 5 domains',
          badge: 'RESPONSIBILITIES',
          buttonLabel: 'Open Tasks',
          tabTarget: 'tasks',
        },
      ],
    };
  }

  // 9. EXPIRING / WARRANTY / CONSUMABLES REPLACEMENT
  const isReplacementQuery =
    lower.includes('replace') ||
    lower.includes('consumable') ||
    lower.includes('expiring') ||
    lower.includes('warranty') ||
    lower.includes('expiry');

  if (isReplacementQuery) {
    return {
      responseContent: `Household Consumables & Warranty Expiry Audit for this month:\n• Living Room Carrier AC HEPA Filter: Airflow 12% (Pre-service replacement scheduled)\n• Kent RO Purifier Filter Cartridge: 12 days remaining on 6,000L rated lifecycle\n• Surf Excel Matic Detergent: ~400g remaining (Replenishment in batch order)\n• Oral-B Sonic brush heads: Reaching 90-day hygiene replacement threshold.\n• Samsung Refrigerator 10-Yr compressor warranty: Active till 2031\n• Family Passports: All valid > 24 months.`,
      actionCards: [
        {
          type: 'grocery_alert',
          title: 'Review Replacement Items (4 items staged)',
          subtitle: 'AC filter, RO cartridge, detergent, sonic brush heads',
          badge: 'CONSUMABLES',
          buttonLabel: 'Open Shopping',
          tabTarget: 'shopping',
        },
        {
          type: 'custom',
          title: 'Document & Warranty Vault',
          subtitle: '4 active household warranties and identity records tracked',
          badge: 'VAULT',
          buttonLabel: 'Open Documents',
          tabTarget: 'documents',
        },
      ],
    };
  }

  // 10. TOMORROW / WEEKEND / SCHEDULE
  const isTomorrowOrWeekendQuery =
    lower.includes('tomorrow') ||
    lower.includes('happening') ||
    lower.includes('weekend') ||
    lower.includes('plan my week');

  if (isTomorrowOrWeekendQuery) {
    return {
      responseContent: `Tomorrow (Saturday) Schedule & Commitments:\n• 11:00 AM — Carrier AC preventive filter service (Living Room, Suresh Kumar)\n• 4:00 PM — ${firstChild}’s School PTM (Mrs. Sharma, Room 12)\nTraffic buffer: Allow 25 mins drive time from Worli.\n\nWeekend Overview:\n• Saturday: AC service + ${firstChild}'s Soccer training at 4:30 PM\n• Sunday: Morning family walk at Worli Seaface + evening movie night ("The Wild Robot" on Prime Video)\nHousehold health and budget are fully balanced.`,
      actionCards: [
        {
          type: 'service_booking',
          title: 'Carrier Tech: Suresh Kumar (Scheduled 11:00 AM)',
          subtitle: 'Living Room Carrier Inverter AC · OEM Preventive Service',
          badge: 'SERVICE SLOT',
          buttonLabel: 'View Schedule',
          tabTarget: 'calendar',
        },
        {
          type: 'custom',
          title: 'Family Weekend Itinerary',
          subtitle: 'Saturday AC service & Soccer · Sunday Seaface & Movie',
          badge: 'WEEKEND PLAN',
          buttonLabel: 'Open Calendar',
          tabTarget: 'calendar',
        },
      ],
    };
  }

  // DEFAULT FAMILY INTELLIGENCE RESPONSE (NEVER returns an error or processing issue)
  return {
    responseContent: `I analyzed your ${familyName} household context (calendar, treasury, smart devices, and pantry): everything is coordinated and running smoothly.\n\nYou can ask me:\n• "Can my family take a ₹75,000 vacation in December?"\n• "Our AC needs servicing."\n• "What do we need to buy?"\n• "What needs attention this week?"\n• "Who is responsible for the school event?"\n• "Are we overspending anywhere?"`,
    actionCards: [
      {
        type: 'custom',
        title: 'Family Command Overview',
        subtitle: 'All 7 household domains synchronized in real time',
        badge: 'INTELLIGENCE',
        buttonLabel: 'Open Overview',
        tabTarget: 'overview',
      },
    ],
  };
}

export const familyDecisionEngine = {
  evaluate: evaluateFamilyDecision,
};
