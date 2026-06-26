"use client";

import { CheckCircle2 } from "lucide-react";
import type { SplitShare } from "@/types/expense";

interface TripPaymentProgressBannerProps {
  shares: SplitShare[];
}

export function TripPaymentProgressBanner({ shares }: TripPaymentProgressBannerProps) {
  if (shares.length === 0) return null;

  const paidShares = shares.filter((share) => share.paid);
  const fullySettled = shares.every((share) => share.paid);

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border mb-4 ${
        fullySettled ? "bg-[#F0FFDB] border-[#2DD4BF]/50" : "bg-white border-[#E5E5E5]"
      }`}
    >
      <CheckCircle2
        size={18}
        className={fullySettled ? "text-[#134E4A] shrink-0" : "text-[#CCC] shrink-0"}
      />
      <div className="flex-1 min-w-0">
        {fullySettled ? (
          <>
            <p className="text-sm font-bold text-[#134E4A]">Your part is fully settled!</p>
            <p className="text-xs text-[#5a9400]">
              You paid all {shares.length} of your share{shares.length !== 1 ? "s" : ""} in this trip.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-bold text-[#0F0F14]">Your payment progress</p>
            <p className="text-xs text-[#888]">
              {paidShares.length} of {shares.length} share{shares.length !== 1 ? "s" : ""} paid
            </p>
          </>
        )}
      </div>
      {!fullySettled && (
        <span className="text-xs font-bold text-[#888] shrink-0">
          {shares.length - paidShares.length} remaining
        </span>
      )}
    </div>
  );
}
