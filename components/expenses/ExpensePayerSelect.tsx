"use client";

import { ChevronDown } from "lucide-react";
import type { Member } from "@/types/expense";

interface ExpensePayerSelectProps {
  members: Member[];
  value: string;
  onChange: (memberId: string) => void;
}

export function ExpensePayerSelect({ members, value, onChange }: ExpensePayerSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#444] uppercase tracking-wide">
        Who paid the bill?
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-xl border border-[#E5E5E5] px-3.5 py-2.5 text-sm text-[#0F0F14] bg-white outline-none appearance-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 transition-all pr-9"
        >
          {members
            .filter((member) => member.name.trim())
            .map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAA] pointer-events-none"
        />
      </div>
      <p className="text-[10px] text-[#AAA]">
        All members are included in the split. Choose who paid upfront.
      </p>
    </div>
  );
}
