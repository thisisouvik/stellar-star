"use client";

import { ReceiptText, Scale } from "lucide-react";

export type TripTab = "expenses" | "settle";

interface TripTabsProps {
  activeTab: TripTab;
  onChange: (tab: TripTab) => void;
}

export function TripTabs({ activeTab, onChange }: TripTabsProps) {
  return (
    <div className="flex gap-1 p-1 bg-[#EBEBEB] rounded-xl mb-5">
      {(["expenses", "settle"] as TripTab[]).map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === tab
              ? "bg-white text-[#0F0F14] shadow-sm"
              : "text-[#888] hover:text-[#0F0F14]"
          }`}
        >
          {tab === "expenses" ? (
            <>
              <ReceiptText size={13} />
              Expenses
            </>
          ) : (
            <>
              <Scale size={13} />
              Settle Up
            </>
          )}
        </button>
      ))}
    </div>
  );
}
