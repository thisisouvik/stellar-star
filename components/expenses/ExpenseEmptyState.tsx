"use client";

import { motion } from "framer-motion";
import { Inbox, Plus } from "lucide-react";

export function ExpenseEmptyState({ onNew }: { onNew: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-[#F0F0F0] flex items-center justify-center mb-5">
        <Inbox size={24} className="text-[#CCC]" />
      </div>
      <h3 className="text-base font-bold text-[#0F0F14] mb-1">No expenses yet</h3>
      <p className="text-sm text-[#AAA] mb-6 max-w-xs">
        Create your first expense and split the bill instantly using Stellar.
      </p>
      <button
        onClick={onNew}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F0F14] text-[#2DD4BF] text-sm font-bold hover:bg-[#1A1A22] transition-all"
      >
        <Plus size={15} />
        New Expense
      </button>
    </motion.div>
  );
}
