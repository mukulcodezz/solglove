// Content lives here so copy is editable in one place.
// EXP/projects are placeholders — swap for real history later.

export const profile = {
  handle: "SOLGLOVE",
  realName: "Player One", // TODO: real name
  class: "On-chain Engineer",
  tagline: "I ship Solana programs that survive mainnet.",
  blurb:
    "Solana developer building low-latency on-chain programs and the dApps that talk to them. Rust where it counts, TypeScript where it ships. I care about lamports, compute units, and never trusting client input.",
  location: "Remote / Solana Beach",
  status: "OPEN TO QUESTS", // available
  level: 27,
  links: {
    github: "https://github.com/",
    x: "https://x.com/",
    email: "mailto:gm@solglove.dev",
    discord: "https://discord.com/",
  },
} as const;

export type Stat = { label: string; value: number; color: string };

// Character-sheet XP bars (0-100)
export const stats: Stat[] = [
  { label: "RUST", value: 88, color: "var(--c-orange)" },
  { label: "SOLANA / ANCHOR", value: 93, color: "var(--c-mint)" },
  { label: "FRONTEND", value: 84, color: "var(--c-sky)" },
  { label: "SECURITY", value: 79, color: "var(--c-coral)" },
];

export type Item = { name: string; tag: string; lvl: number; rarity: Rarity };
export type Rarity = "common" | "rare" | "epic" | "legendary";

// Inventory grid (tech stack as loot)
export const inventory: Item[] = [
  { name: "Rust", tag: "LANG", lvl: 88, rarity: "legendary" },
  { name: "Anchor", tag: "FRAMEWORK", lvl: 90, rarity: "legendary" },
  { name: "solana-web3.js", tag: "SDK", lvl: 86, rarity: "epic" },
  { name: "SPL Token", tag: "PROGRAM", lvl: 82, rarity: "epic" },
  { name: "Metaplex", tag: "NFT", lvl: 77, rarity: "rare" },
  { name: "TypeScript", tag: "LANG", lvl: 89, rarity: "epic" },
  { name: "React", tag: "UI", lvl: 85, rarity: "rare" },
  { name: "Helius / RPC", tag: "INFRA", lvl: 80, rarity: "rare" },
  { name: "Jupiter", tag: "DEFI", lvl: 74, rarity: "rare" },
  { name: "Pyth", tag: "ORACLE", lvl: 71, rarity: "common" },
  { name: "Wallet Adapter", tag: "AUTH", lvl: 83, rarity: "rare" },
  { name: "Foundry / CI", tag: "DEVOPS", lvl: 68, rarity: "common" },
];

export type Quest = {
  id: string;
  title: string;
  status: "SHIPPED" | "LIVE" | "IN PROGRESS";
  year: string;
  stack: string[];
  summary: string;
  loot: string[]; // outcomes — placeholder numbers
};

// Projects as quest log — placeholder content
export const quests: Quest[] = [
  {
    id: "Q-01",
    title: "Trustless Escrow Program",
    status: "SHIPPED",
    year: "2025",
    stack: ["Rust", "Anchor", "PDA"],
    summary:
      "On-chain escrow with PDA-held vaults, atomic settlement, and a refund path. Audited account constraints, zero unchecked CPI.",
    loot: ["12k+ txns settled", "0 exploits", "~0.9s finality"],
  },
  {
    id: "Q-02",
    title: "Candy-Free NFT Mint",
    status: "LIVE",
    year: "2025",
    stack: ["Metaplex", "TypeScript", "React"],
    summary:
      "Gasless-feel mint UX with compressed NFTs (cNFTs) and a Merkle-tree backed allowlist. Wallet adapter + optimistic UI.",
    loot: ["8,888 cNFTs", "$0.001 / mint", "sold out 14m"],
  },
  {
    id: "Q-03",
    title: "Swap Router Aggregator",
    status: "LIVE",
    year: "2024",
    stack: ["Jupiter", "web3.js", "Next.js"],
    summary:
      "Best-route swap UI on top of Jupiter quotes with slippage guards, priority fees, and a simulated-before-send safety net.",
    loot: ["$2.4M routed", "37 token pairs", "p95 < 600ms"],
  },
  {
    id: "Q-04",
    title: "Wallet X-Ray Dashboard",
    status: "IN PROGRESS",
    year: "2026",
    stack: ["Helius", "Rust", "React"],
    summary:
      "Real-time portfolio + PnL view streaming Helius webhooks into a typed event pipeline. Pixel charts, no lag.",
    loot: ["live webhooks", "sub-second feed", "open beta"],
  },
];

export const nav = [
  { id: "hero", label: "HOME" },
  { id: "about", label: "STATS" },
  { id: "skills", label: "INVENTORY" },
  { id: "quests", label: "QUESTS" },
  { id: "contact", label: "CONTACT" },
] as const;
