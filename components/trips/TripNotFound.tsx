"use client";

import Link from "next/link";
import { AuthGuard } from "@/components/auth/AuthGuard";

export function TripNotFound() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#F6F6F6] flex flex-col items-center justify-center gap-4">
        <p className="text-[#888]">Trip not found.</p>
        <Link href="/trips" className="text-sm font-semibold text-[#0F0F14] underline">
          Back to Trips
        </Link>
      </div>
    </AuthGuard>
  );
}
