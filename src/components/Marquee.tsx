import { motion, useReducedMotion } from "motion/react";

const WORDS = [
  "RUST",
  "ANCHOR",
  "SOLANA",
  "WEB3.JS",
  "SPL",
  "METAPLEX",
  "PDA",
  "CPI",
  "HELIUS",
  "JUPITER",
  "PYTH",
  "cNFT",
];

export function Marquee() {
  const reduce = useReducedMotion();
  const row = [...WORDS, ...WORDS];
  return (
    <div className="relative border-y-[3px] border-ink bg-bg2 py-4 overflow-hidden">
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap"
        animate={reduce ? {} : { x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-sm">
            <span className={i % 2 ? "text-mint" : "text-paper/70"}>{w}</span>
            <span className="text-coral">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
