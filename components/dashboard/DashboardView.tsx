"use client";

import Link from "next/link";
import { Map, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useExpense } from "@/hooks/useExpense";
import { useTrip } from "@/hooks/useTrip";
import { useWallet } from "@/hooks/useWallet";
import { WalletInfo } from "@/components/wallet/WalletInfo";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { QuickAccessGrid } from "@/components/dashboard/QuickAccessGrid";
import { RecentExpensesPanel } from "@/components/dashboard/RecentExpensesPanel";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { getDashboardFeatures } from "@/data/dashboard";

export function DashboardView() {
  const { publicKey } = useWallet();
  const { user } = useAuth();
  const { expenses } = useExpense();
  const { trips } = useTrip();
  const features = getDashboardFeatures(expenses.length, trips.length);

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <DashboardNav />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <WelcomeBanner displayName={user?.displayName} publicKey={publicKey} />
        <DashboardStats expenses={expenses} trips={trips} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <WalletInfo />
          </div>
          <RecentExpensesPanel expenses={expenses} />
        </div>

        <QuickAccessGrid features={features} />

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/expenses"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F0F14] text-[#2DD4BF] text-sm font-bold hover:bg-[#1A1A22] transition-all"
          >
            <Plus size={14} />
            New Expense
          </Link>
          <Link
            href="/trips"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E5E5E5] text-[#555] text-sm font-bold hover:bg-[#F0F0F0] transition-all"
          >
            <Map size={14} />
            View Trips
          </Link>
        </div>
      </main>
    </div>
  );
}
