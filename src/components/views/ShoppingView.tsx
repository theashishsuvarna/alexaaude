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
} from 'lucide-react';
import { GroceryItem } from '../../types/family';

interface ShoppingViewProps {
  groceries: GroceryItem[];
  onOpenAssistant: (query?: string) => void;
}

export const ShoppingView: React.FC<ShoppingViewProps> = ({
  groceries: initialGroceries,
  onOpenAssistant,
}) => {
  const [groceries, setGroceries] = useState<GroceryItem[]>(initialGroceries);
  const [orderToast, setOrderToast] = useState<string | null>(null);

  const toggleInCart = (id: string) => {
    setGroceries((prev) =>
      prev.map((g) => (g.id === id ? { ...g, inShoppingList: !g.inShoppingList } : g))
    );
  };

  const criticalItems = groceries.filter((g) => g.status === 'critical' || g.status === 'low');
  const cartItems = groceries.filter((g) => g.inShoppingList);
  const cartTotal = cartItems.reduce((acc, curr) => acc + curr.estimatedCost, 0);

  const handlePlaceOrder = () => {
    setOrderToast(
      `Pantry replenishment order placed for ${cartItems.length} items (₹${cartTotal}). Scheduled delivery to Worli residence today at 6:30 PM.`
    );
    setTimeout(() => setOrderToast(null), 4000);
  };

  const handlePrepareUsualOrder = () => {
    setGroceries((prev) =>
      prev.map((g) =>
        g.status === 'critical' || g.status === 'low' ? { ...g, inShoppingList: true } : g
      )
    );
    setOrderToast('Prepared usual order basket with Milk, Rice, Detergent and Eggs.');
    setTimeout(() => setOrderToast(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {orderToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 text-xs shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{orderToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pantry Intelligence</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              DEMO SHOPPING PATTERNS
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Grocery Prediction & Replenishment</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Analyzes previous order cadence and household consumption to predict stock replenishment dates.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handlePrepareUsualOrder}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-xs"
          >
            Prepare usual order
          </button>
          <button
            onClick={handlePlaceOrder}
            disabled={cartItems.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-xs"
          >
            <ShoppingBag className="h-4 w-4 text-emerald-400" />
            <span>Order Basket (₹{cartTotal})</span>
          </button>
        </div>
      </div>

      {/* Section 13 Specific Callout: Milk, Rice, Detergent running low */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-amber-900">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Replenishment Prediction</h3>
          </div>
          <span className="text-[11px] font-medium text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
            Immediate Attention
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-slate-900">Milk (Amul Gold 500ml)</span>
              <span className="font-mono text-xs font-bold text-slate-900">₹136</span>
            </div>
            <p className="text-xs text-rose-600 mt-1 font-semibold">Likely to run out tomorrow</p>
            <p className="text-[11px] text-slate-500 mt-0.5 font-mono">&lt; 1 packet in refrigerator</p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-slate-900">Rice (India Gate 5kg)</span>
              <span className="font-mono text-xs font-bold text-slate-900">₹540</span>
            </div>
            <p className="text-xs text-amber-700 mt-1 font-semibold">Likely to run out in 5 days</p>
            <p className="text-[11px] text-slate-500 mt-0.5 font-mono">~800g remaining in container</p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-slate-900">Detergent (Surf Excel 4kg)</span>
              <span className="font-mono text-xs font-bold text-slate-900">₹890</span>
            </div>
            <p className="text-xs text-amber-700 mt-1 font-semibold">Likely to run out in 8 days</p>
            <p className="text-[11px] text-slate-500 mt-0.5 font-mono">~400g remaining in utility box</p>
          </div>
        </div>
      </div>

      {/* Full Pantry Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Household Basket & Stock Estimate</h3>
            <p className="text-xs text-slate-500">Tracked consumption rhythms, store preferences, and replenishment cycles</p>
          </div>
        </div>

        <div className="space-y-3">
          {groceries.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => toggleInCart(item.id)}
                  className={`h-5 w-5 rounded-md flex items-center justify-center transition-all ${
                    item.inShoppingList
                      ? 'bg-slate-900 text-white'
                      : 'border-2 border-slate-300 hover:border-slate-400 bg-white'
                  }`}
                  title={item.inShoppingList ? 'Remove from basket' : 'Add to basket'}
                >
                  {item.inShoppingList && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
                </button>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{item.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-600">
                      {item.brandOrStore}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    Stock: {item.quantityEst} · Order Frequency: Every {item.purchaseFrequencyAvgDays} days
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right">
                  <span className="font-bold text-slate-900 block font-mono">₹{item.estimatedCost}</span>
                  <span
                    className={`text-[10px] font-medium ${
                      item.status === 'critical'
                        ? 'text-rose-600'
                        : item.status === 'low'
                        ? 'text-amber-600'
                        : 'text-slate-500'
                    }`}
                  >
                    {item.predictedRunOutDate}
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
