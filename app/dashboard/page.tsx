"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { ConnectPrompt } from "@/components/dashboard/ConnectPrompt";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { Spinner } from "@/components/ui/Spinner";
import { useWallet } from "@/hooks/useWallet";

export default function DashboardPage() {
  const { isConnected, isConnecting } = useWallet();

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center">
        <Spinner size={32} className="text-[#2DD4BF]" />
      </div>
    );
  }

  if (!isConnected) {
    return <ConnectPrompt />;
  }

  return (
    <AuthGuard>
      <DashboardView />
    </AuthGuard>
  );
}
