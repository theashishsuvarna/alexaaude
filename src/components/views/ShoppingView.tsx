import React, { useState } from 'react';
import {
  ShoppingCart,
  Plus,
  Check,
  AlertCircle,
  CheckCircle2,
  TrendingDown,
  ShoppingBag,
  Clock,
  Sparkles,
  Store,
  Package,
  ShieldCheck,
  Layers,
  Wrench,
  BookOpen,
  Heart,
  Tag,
  Truck,
  Users,
} from 'lucide-react';
import { GroceryItem } from '../../types/family';
import { AiInsightTag } from '../AlexaAudeMark';

interface ShoppingViewProps {
  groceries: GroceryItem[];
  onOpenAssistant: (query?: string) => void;
}

interface HouseholdProductItem {
  id: string;
  name: string;
  category: 'grocery' | 'appliance_parts' | 'school_kids' | 'seasonal_travel' | 'wellness';
  brandOrSource: string;
  estimatedCost: number;
  urgency: 'critical' | 'low' | 'normal' | 'wishlist';
  inShoppingList: boolean;
  notes: string;
  requestedBy?: string;
  needsApproval?: boolean;
  priceDrop?: string;
}

export const ShoppingView: React.FC<ShoppingViewProps> = ({
  groceries: initialGroceries,
  onOpenAssistant,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [orderToast, setOrderToast] = useState<string | null>(null);

  // Extended Household Catalog beyond groceries
  const [householdItems, setHouseholdItems] = useState<HouseholdProductItem[]>([
    // Groceries
    {
      id: 'shop-1',
      name: 'Organic Whole Milk (Amul Gold 500ml × 4)',
      category: 'grocery',
      brandOrSource: 'Amazon Fresh / Local Dairy',
      estimatedCost: 136,
      urgency: 'critical',
      inShoppingList: true,
      notes: '< 1 packet remaining in refrigerator',
    },
    {
      id: 'shop-2',
      name: 'Basmati Rice (India Gate 5kg)',
      category: 'grocery',
      brandOrSource: 'Amazon Pantry',
      estimatedCost: 540,
      urgency: 'low',
      inShoppingList: true,
      notes: '~800g remaining in pantry container',
      priceDrop: '₹60 off regular price',
    },
    {
      id: 'shop-3',
      name: 'Eco Dishwashing Pods & Surf Detergent (4kg)',
      category: 'grocery',
      brandOrSource: 'Amazon Prime',
      estimatedCost: 890,
      urgency: 'low',
      inShoppingList: false,
      notes: '~400g remaining in utility box',
    },
    {
      id: 'shop-4',
      name: 'Pasture-Raised Brown Eggs (Pack of 12)',
      category: 'grocery',
      brandOrSource: 'Amazon Fresh',
      estimatedCost: 160,
      urgency: 'low',
      inShoppingList: true,
      notes: '3 eggs remaining · Weekly family staple',
    },

    // Appliance Parts & Home Maintenance
    {
      id: 'shop-5',
      name: 'Carrier Split AC Replacement HEPA Filter',
      category: 'appliance_parts',
      brandOrSource: 'Carrier OEM Store / Amazon',
      estimatedCost: 1150,
      urgency: 'critical',
      inShoppingList: true,
      notes: 'Living Room split AC filter at 12% health; service tomorrow 11 AM',
      priceDrop: '10% Amazon coupon applied',
    },
    {
      id: 'shop-6',
      name: 'Bosch Dishwasher Regenerating Salt (2kg)',
      category: 'appliance_parts',
      brandOrSource: 'Bosch Official',
      estimatedCost: 450,
      urgency: 'normal',
      inShoppingList: false,
      notes: 'Water hardness set to 3; auto-replenish in 14 days',
    },

    // Kids & School Supplies
    {
      id: 'shop-7',
      name: "Solar System STEM Experiment Kit (Vamika's Fair)",
      category: 'school_kids',
      brandOrSource: 'Amazon Prime Next-Day',
      estimatedCost: 799,
      urgency: 'low',
      inShoppingList: true,
      notes: 'Required for Elementary Academy Science Fair by Thursday',
      requestedBy: 'Vamika',
      needsApproval: false,
    },
    {
      id: 'shop-8',
      name: 'Akaay Montessori Wooden Tactile Shapes',
      category: 'school_kids',
      brandOrSource: 'Amazon Kids',
      estimatedCost: 650,
      urgency: 'wishlist',
      inShoppingList: false,
      notes: 'Sensory nursery development milestone recommendation',
      requestedBy: 'Anushka',
    },

    // Seasonal & Travel Essentials
    {
      id: 'shop-9',
      name: 'Thermal Merino Wool Base Layer Set (Kids)',
      category: 'seasonal_travel',
      brandOrSource: 'Decathlon / Amazon Prime',
      estimatedCost: 2200,
      urgency: 'normal',
      inShoppingList: false,
      notes: 'Planned for December Swiss Alps 5-day holiday',
      priceDrop: 'Seasonal winter deal alert',
    },

    // Wellness & Family Health
    {
      id: 'shop-10',
      name: 'Electrolyte Hydration Sachets & Vitamin D3 Drops',
      category: 'wellness',
      brandOrSource: 'Apollo Pharmacy / Amazon Pharmacy',
      estimatedCost: 420,
      urgency: 'low',
      inShoppingList: true,
      notes: 'Virat post-training conditioning & Akaay pediatric booster',
    },
  ]);

  const toggleInCart = (id: string) => {
    setHouseholdItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, inShoppingList: !item.inShoppingList } : item
      )
    );
  };

  const filteredItems = householdItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const cartItems = householdItems.filter((item) => item.inShoppingList);
  const cartTotal = cartItems.reduce((acc, curr) => acc + curr.estimatedCost, 0);

  const handlePlaceBatchedOrder = () => {
    setOrderToast(
      `Batched Household Order scheduled: ${cartItems.length} items (₹${cartTotal}). Consolidated delivery window tomorrow between 5:00 PM – 7:00 PM to eliminate separate packaging.`
    );
    setTimeout(() => setOrderToast(null), 4500);
  };

  const handlePrepareStaples = () => {
    setHouseholdItems((prev) =>
      prev.map((i) =>
        i.urgency === 'critical' || i.urgency === 'low' ? { ...i, inShoppingList: true } : i
      )
    );
    setOrderToast('Added all critical household staples and AC replacement filter to batch.');
    setTimeout(() => setOrderToast(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {orderToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 text-xs shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{orderToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <AiInsightTag type="shopping" label="HOUSEHOLD COMMERCE BRAIN" />
            <span className="text-xs font-mono text-slate-500">BATCHED CONSOLIDATION</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Household Buying Brain & Predictive Commerce
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Coordinates groceries, appliance maintenance filters, school supplies, and seasonal travel gear. Batches household purchases into consolidated delivery windows to eliminate packaging waste and excess trips.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-shrink-0">
          <button
            onClick={handlePrepareStaples}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-xs"
          >
            Stage Urgent Staples
          </button>
          <button
            onClick={handlePlaceBatchedOrder}
            disabled={cartItems.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-xs"
          >
            <Truck className="h-4 w-4 text-emerald-400" />
            <span>Batch Order (₹{cartTotal})</span>
          </button>
        </div>
      </div>

      {/* Urgent Replenishment & Cross-Domain Needs Banner */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-amber-900">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Cross-Domain Replenishment Alerts
            </h3>
          </div>
          <span className="text-[11px] font-medium text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
            Immediate Attention
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Card 1: Milk */}
          <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-slate-900">Organic Whole Milk (500ml × 4)</span>
              <span className="font-mono text-xs font-bold text-slate-900">₹136</span>
            </div>
            <p className="text-xs text-rose-600 mt-1 font-semibold">Pantry depletion: Tomorrow morning</p>
            <p className="text-[11px] text-slate-500 mt-0.5">&lt; 1 packet in refrigerator</p>
          </div>

          {/* Card 2: Carrier AC Filter */}
          <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-slate-900">Carrier Split AC Filter</span>
              <span className="font-mono text-xs font-bold text-slate-900">₹1,150</span>
            </div>
            <p className="text-xs text-amber-700 mt-1 font-semibold">Home Maintenance sync: Airflow 12%</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Technician booked tomorrow 11 AM</p>
          </div>

          {/* Card 3: School Science Kit */}
          <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-slate-900">Vamika STEM Science Kit</span>
              <span className="font-mono text-xs font-bold text-slate-900">₹799</span>
            </div>
            <p className="text-xs text-amber-700 mt-1 font-semibold">School project due Thursday</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Approved for Amazon Prime Next-Day</p>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { id: 'all', label: 'All Household Items (10)' },
          { id: 'grocery', label: 'Groceries & Pantry (4)' },
          { id: 'appliance_parts', label: 'Appliances & Parts (2)' },
          { id: 'school_kids', label: 'Kids & School Supplies (2)' },
          { id: 'seasonal_travel', label: 'Travel & Seasonal (1)' },
          { id: 'wellness', label: 'Health & Wellness (1)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Master Household Catalog */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Household Staging & Re-order Grid</h3>
            <p className="text-xs text-slate-500">
              Select items to include in the consolidated household batch delivery. Zero automatic credit charges without parental approval.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
            {cartItems.length} Staged in Cart
          </span>
        </div>

        <div className="space-y-2.5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-colors flex items-center justify-between gap-3 text-xs ${
                item.inShoppingList
                  ? 'bg-blue-50/40 border-blue-200'
                  : 'bg-slate-50/60 border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => toggleInCart(item.id)}
                  className={`h-5 w-5 rounded-md flex items-center justify-center transition-all flex-shrink-0 ${
                    item.inShoppingList
                      ? 'bg-slate-900 text-white'
                      : 'border-2 border-slate-300 hover:border-slate-400 bg-white'
                  }`}
                  title={item.inShoppingList ? 'Remove from batch' : 'Include in batch'}
                >
                  {item.inShoppingList && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
                </button>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-900">{item.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700 font-mono">
                      {item.brandOrSource}
                    </span>
                    {item.priceDrop && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 font-medium">
                        <Tag className="h-2.5 w-2.5" />
                        <span>{item.priceDrop}</span>
                      </span>
                    )}
                    {item.requestedBy && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-medium">
                        Requested by {item.requestedBy}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    {item.notes}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0 text-right">
                <div>
                  <span className="font-bold text-slate-900 block font-mono text-sm">
                    ₹{item.estimatedCost}
                  </span>
                  <span
                    className={`text-[10px] font-semibold uppercase font-mono ${
                      item.urgency === 'critical'
                        ? 'text-rose-600'
                        : item.urgency === 'low'
                        ? 'text-amber-600'
                        : item.urgency === 'wishlist'
                        ? 'text-purple-600'
                        : 'text-slate-500'
                    }`}
                  >
                    {item.urgency}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
