import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { quests, type Quest } from "../data/portfolio";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const STATUS_COLOR: Record<Quest["status"], string> = {
  SHIPPED: "var(--c-mint)",
  LIVE: "var(--c-lime)",
  "IN PROGRESS": "var(--c-gold)",
};

export function Projects() {
  const [open, setOpen] = useState<string | null>(quests[0].id);

  return (
    <section id="quests" className="relative mx-auto w-[min(1100px,92vw)] py-24 md:py-36">
      <SectionHeading index="03" eyebrow="quest log" title="SHIPPED & IN-FLIGHT" />

      <div className="space-y-4">
        {quests.map((q, i) => {
          const isOpen = open === q.id;
          const color = STATUS_COLOR[q.status];
          return (
            <Reveal key={q.id} delay={i * 0.06}>
              <div className="pixel-frame bg-surface">
                <button
                  onClick={() => setOpen(isOpen ? null : q.id)}
                  className="flex w-full items-center gap-4 p-5 text-left md:p-6"
                >
                  <span className="font-display text-xs text-mint/60">{q.id}</span>
                  <span className="flex-1 font-term text-2xl leading-tight text-paper md:text-3xl">
                    {q.title}
                  </span>
                  <span className="hidden flex-col items-end gap-1.5 text-right sm:flex">
                    <span
                      className="px-2 py-[2px] font-term text-sm uppercase leading-none tracking-wider"
                      style={{ color, border: `2px solid ${color}` }}
                    >
                      {q.status}
                    </span>
                    <span className="font-term text-base text-muted">{q.year}</span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    className="font-display text-sm text-mint"
                  >
                    ▶
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t-[3px] border-ink px-5 py-6 md:px-6">
                        <p className="max-w-2xl font-mono text-sm leading-relaxed text-muted">
                          {q.summary}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {q.stack.map((s) => (
                            <span
                              key={s}
                              className="bg-bg2 px-3 py-1 font-term text-base text-mintsoft"
                              style={{ border: "2px solid var(--c-line)" }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                        <div className="mt-6 grid grid-cols-3 gap-3">
                          {q.loot.map((l) => (
                            <div
                              key={l}
                              className="bg-bg2 p-3 text-center font-term text-base text-paper"
                              style={{ border: "2px solid var(--c-ink)" }}
                            >
                              <span className="text-gold">◈</span> {l}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
