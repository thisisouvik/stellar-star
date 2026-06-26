import { Shield, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const heroMockMembers = [
  { name: "Rahul", amount: "300", status: "paid" },
  { name: "Aman", amount: "300", status: "pending" },
  { name: "Kiran", amount: "300", status: "pending" },
  { name: "You", amount: "300", status: "paid" },
];

export const heroAvatars = [
  { label: "R", backgroundColor: "#2DD4BF", color: "#0F0F14" },
  { label: "A", backgroundColor: "#0F0F14", color: "white" },
  { label: "K", backgroundColor: "#0D9488", color: "#0F0F14" },
  { label: "S", backgroundColor: "#333", color: "white" },
];

export const heroTrustLogos = [
  { name: "Stellar", abbr: "STL" },
  { name: "Freighter", abbr: "FRT" },
  { name: "Horizon", abbr: "HRZ" },
  { name: "Testnet", abbr: "TST" },
  { name: "XLM", abbr: "XLM" },
];

export interface HeroProofLabel {
  icon: LucideIcon;
  text: string;
}

export const heroProofLabels: HeroProofLabel[] = [
  { icon: Shield, text: "Non-custodial" },
  { icon: Zap, text: "~5s finality" },
];
