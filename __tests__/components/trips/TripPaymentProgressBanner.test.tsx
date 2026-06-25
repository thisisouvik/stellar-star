/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { TripPaymentProgressBanner } from "@/components/trips/TripPaymentProgressBanner";
import type { SplitShare } from "@/types/expense";

describe("TripPaymentProgressBanner", () => {
  it("shows remaining share count for partial progress", () => {
    render(<TripPaymentProgressBanner shares={makeShares(false)} />);

    expect(screen.getByText("Your payment progress")).toBeTruthy();
    expect(screen.getByText("1 of 2 shares paid")).toBeTruthy();
    expect(screen.getByText("1 remaining")).toBeTruthy();
  });

  it("shows a settled message when all shares are paid", () => {
    render(<TripPaymentProgressBanner shares={makeShares(true)} />);

    expect(screen.getByText("Your part is fully settled!")).toBeTruthy();
    expect(screen.getByText(/You paid all 2/)).toBeTruthy();
  });
});

function makeShares(allPaid: boolean): SplitShare[] {
  return [
    { memberId: "member-1", name: "Asha", amount: "5.0000000", paid: true },
    { memberId: "member-2", name: "Ravi", amount: "5.0000000", paid: allPaid },
  ];
}
