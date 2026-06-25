"use client";

import Link from "next/link";
import { ArrowRight, Plus, ReceiptText } from "lucide-react";
import { RecentExpenseRow } from "@/components/dashboard/RecentExpenseRow";
import type { Expense } from "@/types/expense";

export function RecentExpensesPanel({ expenses }: { expenses: Expense[] }) {
  const recentExpenses = expenses.slice(0, 5);

  return (
    <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#F5F5F5]">
        <div className="flex items-center gap-2">
          <ReceiptText size={14} className="text-[#2DD4BF]" />
          <p className="text-sm font-bold text-[#0F0F14]">Recent Expenses</p>
        </div>
        <Link href="/expenses" className="text-xs font-semibold text-[#555] hover:text-[#0F0F14] transition-colors">
          View all -&gt;
        </Link>
      </div>

      {recentExpenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#F0F0F0] flex items-center justify-center mb-3">
            <ReceiptText size={18} className="text-[#CCC]" />
          </div>
          <p className="text-sm font-semibold text-[#555] mb-1">No expenses yet</p>
          <p className="text-xs text-[#AAA] mb-4">Create your first expense to get started</p>
          <Link
            href="/expenses"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F0F14] text-[#2DD4BF] text-xs font-bold hover:bg-[#1A1A22] transition-all"
          >
            <Plus size={12} />
            New Expense
          </Link>
        </div>
      ) : (
        <div className="p-2">
          {recentExpenses.map((expense) => (
            <RecentExpenseRow key={expense.id} expense={expense} />
          ))}
          {expenses.length > 5 && (
            <Link
              href="/expenses"
              className="flex items-center justify-center gap-1.5 py-2.5 mt-1 rounded-xl text-xs font-semibold text-[#888] hover:text-[#0F0F14] hover:bg-[#F6F6F6] transition-colors"
            >
              +{expenses.length - 5} more expenses
              <ArrowRight size={11} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
