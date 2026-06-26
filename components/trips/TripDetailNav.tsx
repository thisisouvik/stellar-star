"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ConnectWalletButton } from "@/components/wallet/ConnectWalletButton";

interface TripDetailNavProps {
  tripName: string;
}

export function TripDetailNav({ tripName }: TripDetailNavProps) {
  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between gap-2 px-4 sm:px-6 py-3 border-b border-[#E5E5E5] bg-white/90 backdrop-blur-xl">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <Link
          href="/trips"
          className="flex items-center gap-1.5 text-sm text-[#888] hover:text-[#0F0F14] transition-colors shrink-0"
        >
          <ArrowLeft size={14} />
          <span className="hidden sm:inline">Trips</span>
        </Link>
        <span className="text-[#E5E5E5] hidden sm:inline">/</span>
        <span className="text-sm font-bold text-[#0F0F14] max-w-[120px] sm:max-w-[220px] truncate">
          {tripName}
        </span>
      </div>
      <ConnectWalletButton className="shrink-0" />
    </nav>
  );
}
