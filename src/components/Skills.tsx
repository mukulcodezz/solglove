import { motion } from "motion/react";
import { inventory, type Rarity } from "../data/portfolio";
import { SectionHeading } from "./ui/SectionHeading";

const RARITY: Record<Rarity, string> = {
  common: "var(--c-muted)",
  rare: "var(--c-sky)",
  epic: "var(--c-coral)",
  legendary: "var(--c-gold)",
};

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const cell = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 320, damping: 24 } },
};

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto w-[min(1100px,92vw)] py-24 md:py-36">
      <SectionHeading index="02" eyebrow="inventory" title="EQUIPPED LOADOUT" />

      {/* arcade cabinet: items glow inside a near-black case for value rhythm */}
      <div className="pixel-frame bg-[#05070f] p-4 md:p-6">
      <motion.div
        variants={grid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {inventory.map((it) => {
          const color = RARITY[it.rarity];
          return (
            <motion.div
              key={it.name}
              variants={cell}
              whileHover={{ y: -6, boxShadow: "7px 7px 0 0 var(--c-ink)" }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group relative bg-surface p-4"
              style={{ border: "3px solid var(--c-ink)", boxShadow: `4px 4px 0 0 var(--c-ink)` }}
            >
              {/* rarity corner */}
              <span
                className="absolute right-0 top-0 h-0 w-0"
                style={{ borderTop: `16px solid ${color}`, borderLeft: "16px solid transparent" }}
              />
              <div
                className="mb-3 flex h-12 w-12 items-center justify-center font-display text-base"
                style={{ border: `3px solid ${color}`, color, boxShadow: "inset 0 0 0 2px var(--c-bg)" }}
              >
                {it.name[0]}
              </div>
              <div className="font-term text-xl leading-none text-paper">{it.name}</div>
              <div className="mt-1 font-term text-base uppercase tracking-wider" style={{ color }}>
                {it.rarity} · {it.tag}
              </div>
              {/* level bar */}
              <div className="mt-3 flex gap-[2px]">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-2 flex-1"
                    style={{ background: i < Math.round(it.lvl / 10) ? color : "var(--c-line)" }}
                  />
                ))}
              </div>
              {/* hover glow */}
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ boxShadow: `inset 0 0 30px -8px ${color}` }}
              />
            </motion.div>
          );
        })}
      </motion.div>
      </div>
    </section>
  );
}
