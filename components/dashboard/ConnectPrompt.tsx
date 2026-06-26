"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Layers, Shield, Zap } from "lucide-react";
import { ConnectWalletButton } from "@/components/wallet/ConnectWalletButton";

const walletBenefits = [
  { icon: Shield, label: "Non-custodial" },
  { icon: Clock, label: "<5s finality" },
  { icon: Layers, label: "On-chain receipts" },
];

export function ConnectPrompt() {
  return (
    <div className="min-h-screen bg-[#F6F6F6] flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5] bg-white">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#2DD4BF] flex items-center justify-center">
            <Zap size={15} className="text-[#0F0F14] fill-[#0F0F14]" />
          </div>
          <span className="text-lg font-black tracking-tight text-[#0F0F14]">
            Stellar<span className="text-[#2DD4BF]">-star</span>
          </span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium text-[#555] hover:text-[#0F0F14] transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-3xl border border-[#E5E5E5] shadow-[0_4px_40px_-8px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#2DD4BF] to-transparent" />
            <div className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-[#2DD4BF] flex items-center justify-center mb-6 shadow-[0_4px_20px_-4px_rgba(185,255,102,0.5)]">
                <Zap size={24} className="text-[#0F0F14] fill-[#0F0F14]" />
              </div>
              <h1 className="text-2xl font-black text-[#0F0F14] mb-2">Connect your wallet</h1>
              <p className="text-[#666] text-sm leading-relaxed mb-8">
                Stellar-star uses the{" "}
                <a
                  href="https://freighter.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0F0F14] underline underline-offset-2"
                >
                  Freighter
                </a>{" "}
                browser wallet to sign Stellar transactions. No account or password needed - just your keys.
              </p>
              <ConnectWalletButton className="w-full justify-center py-3 text-base rounded-2xl" />
              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-[#E5E5E5]">
                {walletBenefits.map(({ icon: Icon, label }) => (
                  <div key={label} className="text-center">
                    <Icon size={14} className="text-[#2DD4BF] mx-auto mb-1" />
                    <p className="text-[10px] font-medium text-[#888]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-[#AAA] mt-4">
            Don&apos;t have Freighter?{" "}
            <a
              href="https://freighter.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#555] hover:text-[#0F0F14] underline"
            >
              Install it free -&gt;
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
