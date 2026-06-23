import { motion, useReducedMotion } from "motion/react";
import { profile, stats } from "../data/portfolio";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function About() {
  return (
    <section id="about" className="relative mx-auto w-[min(1100px,92vw)] py-24 md:py-36">
      <SectionHeading index="01" eyebrow="character sheet" title="WHO IS BEHIND THE VISOR" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* bio panel */}
        <Reveal>
          <div className="pixel-frame h-full bg-surface p-7 md:p-9">
            <p className="font-mono text-base leading-relaxed text-paper/90">
              {profile.blurb}
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 font-term text-lg">
              <Field k="CLASS" v={profile.class} />
              <Field k="GUILD" v="Solana" accent />
              <Field k="BASE" v={profile.location} />
              <Field k="STATUS" v={profile.status} accent />
            </dl>
          </div>
        </Reveal>

        {/* stat bars */}
        <Reveal delay={0.1}>
          <div className="pixel-frame h-full bg-surface p-7 md:p-9">
            <div className="mb-6 font-display text-[11px] tracking-widest text-mint">
              ⚔ ABILITY SCORES
            </div>
            <div className="space-y-6">
              {stats.map((s, i) => (
                <StatBar key={s.label} label={s.label} value={s.value} color={s.color} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div>
      <dt className="text-muted text-sm">{k}</dt>
      <dd className={accent ? "text-mint" : "text-paper"}>{v}</dd>
    </div>
  );
}

function StatBar({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) {
  const reduce = useReducedMotion();
  const cells = 20;
  const filled = Math.round((value / 100) * cells);
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between font-term text-base">
        <span className="text-paper">{label}</span>
        <span style={{ color }}>{value}</span>
      </div>
      <div className="flex gap-[3px]">
        {Array.from({ length: cells }).map((_, i) => (
          <motion.span
            key={i}
            className="h-4 flex-1"
            style={{
              background: i < filled ? color : "var(--c-line)",
              boxShadow: i < filled ? "inset 0 2px 0 rgba(255,255,255,0.28)" : "none",
            }}
            initial={reduce ? {} : { opacity: 0, scaleY: 0.2 }}
            whileInView={reduce ? {} : { opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + i * 0.02, duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}
