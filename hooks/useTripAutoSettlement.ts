"use client";

import { useEffect } from "react";
import type { Expense } from "@/types/expense";
import type { Trip } from "@/types/trip";

export function useTripAutoSettlement(
  trip: Trip | undefined,
  expenses: Expense[],
  settleTrip: (id: string) => void,
) {
  useEffect(() => {
    if (!trip || trip.settled) return;

    const linkedExpenses = expenses.filter((expense) => trip.expenseIds.includes(expense.id));
    if (linkedExpenses.length > 0 && linkedExpenses.every((expense) => expense.settled)) {
      settleTrip(trip.id);
    }
  }, [expenses, trip, settleTrip]);
}
