/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { useExpense } from "@/hooks/useExpense";
import { useTrip } from "@/hooks/useTrip";
import { useAuth } from "@/context/AuthContext";
import { useWallet } from "@/hooks/useWallet";

// Mock the hooks
jest.mock("@/hooks/useExpense");
jest.mock("@/hooks/useTrip");
jest.mock("@/context/AuthContext");
jest.mock("@/hooks/useWallet");

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

// Mock simple internal components so they don't break the tests
jest.mock("@/components/dashboard/DashboardStats", () => ({
  DashboardStats: () => <div data-testid="dashboard-stats" />,
}));
jest.mock("@/components/wallet/WalletInfo", () => ({
  WalletInfo: () => <div data-testid="wallet-info" />,
}));
jest.mock("@/components/dashboard/RecentExpensesPanel", () => ({
  RecentExpensesPanel: () => <div data-testid="recent-expenses" />,
}));
jest.mock("@/components/dashboard/QuickAccessGrid", () => ({
  QuickAccessGrid: () => <div data-testid="quick-access" />,
}));
jest.mock("@/components/dashboard/DashboardNav", () => ({
  DashboardNav: () => <div data-testid="dashboard-nav" />,
}));

const mockUseExpense = useExpense as jest.Mock;
const mockUseTrip = useTrip as jest.Mock;
const mockUseAuth = useAuth as jest.Mock;
const mockUseWallet = useWallet as jest.Mock;

describe("DashboardView State Transitions", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({ user: { displayName: "Test User" } });
    mockUseWallet.mockReturnValue({ publicKey: "G12345" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders a loading spinner when data is loading", () => {
    mockUseExpense.mockReturnValue({
      expenses: [],
      isLoading: true,
      isOffline: false,
    });
    mockUseTrip.mockReturnValue({
      trips: [],
      isLoading: false,
      isOffline: false,
    });

    render(<DashboardView />);
    
    // Stats and panels should NOT be present
    expect(screen.queryByTestId("dashboard-stats")).toBeNull();
    expect(screen.queryByTestId("recent-expenses")).toBeNull();
  });

  it("renders dashboard content when not loading", () => {
    mockUseExpense.mockReturnValue({
      expenses: [],
      isLoading: false,
      isOffline: false,
    });
    mockUseTrip.mockReturnValue({
      trips: [],
      isLoading: false,
      isOffline: false,
    });

    render(<DashboardView />);
    
    expect(screen.getByTestId("dashboard-stats")).toBeTruthy();
    expect(screen.getByTestId("recent-expenses")).toBeTruthy();
  });

  it("renders the offline fallback notice when either isOffline is true", () => {
    mockUseExpense.mockReturnValue({
      expenses: [],
      isLoading: false,
      isOffline: true, // Offline mode
    });
    mockUseTrip.mockReturnValue({
      trips: [],
      isLoading: false,
      isOffline: false,
    });

    render(<DashboardView />);
    
    expect(screen.getByText(/You are currently viewing offline data/i)).toBeTruthy();
  });
});
