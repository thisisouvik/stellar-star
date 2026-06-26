"use client";

import { AlertCircle, Map, ReceiptText, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import type { Expense } from "@/types/expense";
import type { Trip } from "@/types/trip";

interface DashboardStatsProps {
  expenses: Expense[];
  trips: Trip[];
}

export function DashboardStats({ expenses, trips }: DashboardStatsProps) {
  const totalXLM = expenses.reduce((sum, expense) => sum + parseFloat(expense.totalAmount), 0);
  const pendingShares = expenses.flatMap((expense) => expense.shares).filter((share) => !share.paid).length;
  const settledExpenses = expenses.filter((expense) => expense.settled).length;
  const settledTrips = trips.filter((trip) => trip.settled).length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <StatCard icon={ReceiptText} label="Total Expenses" value={expenses.length} sub={`${settledExpenses} settled`} />
      <StatCard icon={TrendingUp} label="Total XLM Spent" value={totalXLM.toFixed(2)} sub="across all bills" accent />
      <StatCard icon={AlertCircle} label="Pending Shares" value={pendingShares} sub="awaiting payment" />
      <StatCard icon={Map} label="Trips" value={trips.length} sub={`${settledTrips} settled`} />
    </div>
  );
}
