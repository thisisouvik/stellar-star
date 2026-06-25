"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { ConnectWalletButton } from "@/components/wallet/ConnectWalletButton";

export function DashboardNav() {
  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#E5E5E5] bg-white/90 backdrop-blur-xl">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-[#2DD4BF] flex items-center justify-center">
          <Zap size={15} className="text-[#0F0F14] fill-[#0F0F14]" />
        </div>
        <span className="text-lg font-black tracking-tight text-[#0F0F14]">
          Stellar<span className="text-[#2DD4BF]">-star</span>
        </span>
      </Link>
      <div className="hidden sm:flex items-center gap-1">
        <Link href="/expenses" className="px-3 py-1.5 text-sm font-medium text-[#555] hover:text-[#0F0F14] rounded-xl hover:bg-black/5 transition-all">
          Expenses
        </Link>
        <Link href="/trips" className="px-3 py-1.5 text-sm font-medium text-[#555] hover:text-[#0F0F14] rounded-xl hover:bg-black/5 transition-all">
          Trips
        </Link>
      </div>
      <ConnectWalletButton />
    </nav>
  );
}
