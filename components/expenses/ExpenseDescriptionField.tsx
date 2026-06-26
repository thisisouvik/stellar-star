"use client";

import { Textarea } from "@/components/ui/Input";

interface ExpenseDescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function ExpenseDescriptionField({ value, onChange }: ExpenseDescriptionFieldProps) {
  const counterClass =
    value.length >= 100 ? "text-red-500" : value.length >= 80 ? "text-amber-500" : "text-[#CCC]";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#444] uppercase tracking-wide">
          Description
        </label>
        <span className={`text-[10px] font-medium tabular-nums ${counterClass}`}>
          {value.length}/100
        </span>
      </div>
      <Textarea
        placeholder="Add a short note about this expense..."
        value={value}
        maxLength={100}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
