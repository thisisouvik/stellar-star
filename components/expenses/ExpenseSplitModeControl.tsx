"use client";

import type { SplitMode } from "@/types/expense";

interface ExpenseSplitModeControlProps {
  value: SplitMode;
  onChange: (mode: SplitMode) => void;
}

export function ExpenseSplitModeControl({ value, onChange }: ExpenseSplitModeControlProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#444] uppercase tracking-wide">
        Split mode
      </label>
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F0F0F0] rounded-xl">
        {(["equal", "custom"] as SplitMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => onChange(mode)}
            className={`py-2 rounded-lg text-xs font-bold capitalize transition-all ${
              value === mode ? "bg-white text-[#0F0F14] shadow-sm" : "text-[#888] hover:text-[#555]"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  );
}
