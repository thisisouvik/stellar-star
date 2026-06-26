"use client";

import { Zap } from "lucide-react";

interface ExpenseFormActionsProps {
  submitting: boolean;
  onCancel?: () => void;
}

export function ExpenseFormActions({ submitting, onCancel }: ExpenseFormActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#F0F0F0]">
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-[#555] hover:text-[#0F0F14] hover:bg-[#F0F0F0] transition-colors"
        >
          Cancel
        </button>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F0F14] text-[#2DD4BF] text-sm font-bold hover:bg-[#1A1A22] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      >
        <Zap size={14} className="fill-[#2DD4BF]" />
        {submitting ? "Saving..." : "Create Expense"}
      </button>
    </div>
  );
}
