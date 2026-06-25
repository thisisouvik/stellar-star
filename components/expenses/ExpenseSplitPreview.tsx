"use client";

import { SplitCalculator } from "@/components/expenses/SplitCalculator";
import type { Member, SplitShare } from "@/types/expense";

interface ExpenseSplitPreviewProps {
  shares: SplitShare[];
  namedMembers: Member[];
  payerName: string;
  totalAmount: string;
}

export function ExpenseSplitPreview({
  shares,
  namedMembers,
  payerName,
  totalAmount,
}: ExpenseSplitPreviewProps) {
  if (shares.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-[#444] uppercase tracking-wide">Split preview</p>
        {namedMembers.some((member) => !member.walletAddress?.trim()) && (
          <p className="text-[10px] text-amber-500 font-medium">
            Fill wallet addresses to enable payments
          </p>
        )}
      </div>
      <SplitCalculator shares={shares} payerName={payerName} totalAmount={totalAmount} disablePay />
    </div>
  );
}
