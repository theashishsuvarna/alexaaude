import React, { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  Sparkles,
  Info,
} from 'lucide-react';
import { FinancialHealth, RecurringBill, SavingsGoal } from '../../types/family';

interface MoneyViewProps {
  financialHealth: FinancialHealth;
  onOpenAssistant: (query?: string) => void;
}

export const MoneyView: React.FC<MoneyViewProps> = ({ financialHealth, onOpenAssistant }) => {
  const [bills, setBills] = useState<RecurringBill[]>(financialHealth.upcomingBills);
  const [paidToast, setPaidToast] = useState<string | null>(null);

  const handlePayBill = (billId: string, name: string, amount: number) => {
    setBills((prev) =>
      prev.map((b) => (b.id === billId ? { ...b, status: 'paid' as const } : b))
    );
    setPaidToast(`Payment confirmed: ₹${amount.toLocaleString('en-IN')} paid to ${name}`);
    setTimeout(() => setPaidToast(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {paidToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 text-xs shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{paidToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Household Treasury & Liquidity
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              DEMO FINANCIAL DATA
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Financial Health & Savings Goals</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Holistic view of monthly income, planned expenditures, commitments, and protected savings pots.
          </p>
        </div>

        <button
          onClick={() => onOpenAssistant('Can we afford a vacation in December? Show me the impact on our savings.')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors self-start sm:self-auto shadow-xs"
        >
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span>Check Affordability</span>
        </button>
      </div>

      {/* Top 4 Financial Metric Cards (Section 10) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs font-medium text-slate-500 block">Monthly Household Income</span>
          <p className="text-2xl font-bold text-slate-900 mt-1 tracking-tight font-mono">
            ₹{financialHealth.monthlyHouseholdIncome.toLocaleString('en-IN')}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2">
            <span>Dual income (Amazon + JPMorgan)</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs font-medium text-slate-500 block">Available This Month</span>
          <p className="text-2xl font-bold text-slate-900 mt-1 tracking-tight font-mono">
            ₹{financialHealth.availableThisMonth.toLocaleString('en-IN')}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 mt-2 font-medium">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Liquid cash buffer healthy</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs font-medium text-slate-500 block">Upcoming Commitments</span>
          <p className="text-2xl font-bold text-slate-900 mt-1 tracking-tight font-mono">
            ₹{financialHealth.upcomingCommitments.toLocaleString('en-IN')}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2">
            <span>Home Loan EMI, Electricity, Star Health</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-500">Savings Goal Progress</span>
            <span className="text-slate-900 font-mono">{financialHealth.progressPercent}%</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-1 tracking-tight font-mono">
            ₹{financialHealth.currentSavings.toLocaleString('en-IN')}
            <span className="text-xs text-slate-400 font-sans font-normal"> / ₹{financialHealth.savingsGoal.toLocaleString('en-IN')}</span>
          </p>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden mt-2.5">
            <div
              className="h-full rounded-full bg-slate-900"
              style={{ width: `${financialHealth.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* AI Financial Insights (Section 10 requirements) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3 text-xs text-emerald-900">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">Monthly Plan Tracking</span>
            <p className="mt-0.5 leading-relaxed">{financialHealth.insight}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3 text-xs text-blue-900">
          <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">Discretionary Spend Guardrail</span>
            <p className="mt-0.5 leading-relaxed">{financialHealth.discretionaryInsight}</p>
          </div>
        </div>
      </div>

      {/* Savings Goals Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Dedicated Savings Pots</h3>
            <p className="text-xs text-slate-500">Milestone accounts protected from routine debit card sweeps</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {financialHealth.savingsGoals.map((pot) => {
            const pct = Math.min(100, Math.round((pot.currentAmount / pot.targetAmount) * 100));
            return (
              <div key={pot.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900 block truncate">{pot.title}</span>
                    <span className="text-[10px] font-mono text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {pot.targetDate}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-base font-bold text-slate-900 font-mono">
                      ₹{pot.currentAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 font-medium font-mono">
                      of ₹{pot.targetAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden mt-2">
                    <div
                      className="h-full rounded-full bg-slate-900 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-200/60">
                  <span>Monthly Contribution:</span>
                  <span className="font-semibold text-slate-900 font-mono">₹{pot.monthlyContribution.toLocaleString('en-IN')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recurring Bills & Commitments */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Upcoming Bills & EMIs</h3>
            <p className="text-xs text-slate-500">Pre-authorized autopays and manual approval cues</p>
          </div>
        </div>

        <div className="space-y-3">
          {bills.map((bill) => {
            const isPaid = bill.status === 'paid';
            return (
              <div
                key={bill.id}
                className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                  isPaid ? 'border-emerald-100 bg-emerald-50/30 text-slate-500' : 'border-slate-100 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-slate-900">{bill.name}</span>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        isPaid
                          ? 'bg-emerald-100 text-emerald-800'
                          : bill.status === 'due_soon'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {isPaid ? 'Paid' : bill.status === 'due_soon' ? 'Due soon' : 'Autopay scheduled'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {bill.provider} · Due: {bill.dueDate}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-900 font-mono">
                    ₹{bill.amount.toLocaleString('en-IN')}
                  </span>
                  {!isPaid && (
                    <button
                      onClick={() => handlePayBill(bill.id, bill.name, bill.amount)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
