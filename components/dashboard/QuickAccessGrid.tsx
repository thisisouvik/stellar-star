"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { DashboardFeature } from "@/data/dashboard";

export function QuickAccessGrid({ features }: { features: DashboardFeature[] }) {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#AAA] mb-3">Quick Access</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {features.map((feature) => (
          <Link
            key={feature.title}
            href={feature.href}
            className="bg-white rounded-2xl border border-[#E5E5E5] p-4 hover:border-[#2DD4BF]/50 hover:shadow-[0_4px_20px_-4px_rgba(185,255,102,0.15)] transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#2DD4BF]/10 flex items-center justify-center">
                <feature.icon size={15} className="text-[#134E4A]" />
              </div>
              <span className="text-[10px] font-bold text-[#134E4A] bg-[#2DD4BF]/20 px-2 py-0.5 rounded-full">
                {feature.badge}
              </span>
            </div>
            <p className="text-sm font-bold text-[#0F0F14] mb-0.5">{feature.title}</p>
            <p className="text-[11px] text-[#888] leading-relaxed">{feature.desc}</p>
            <div className="flex items-center gap-1 mt-3 text-[11px] font-semibold text-[#134E4A] group-hover:gap-2 transition-all">
              Open <ArrowRight size={10} />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
