import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "../data/portfolio";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const LINES = [
  { p: "$", t: "whoami", out: `${profile.handle.toLowerCase()} — ${profile.class}` },
  { p: "$", t: "cat status.txt", out: profile.status + " · " + profile.location },
  { p: "$", t: "./connect --with-me", out: "pick a channel below ↓" },
];

const CHANNELS = [
  { label: "GITHUB", cmd: "git remote", href: profile.links.github },
  { label: "TWITTER / X", cmd: "post gm", href: profile.links.x },
  { label: "EMAIL", cmd: "mail -s hi", href: profile.links.email },
  { label: "DISCORD", cmd: "join voice", href: profile.links.discord },
];

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto w-[min(1100px,92vw)] py-24 md:py-36">
      <SectionHeading index="04" eyebrow="press start" title="OPEN A CHANNEL" />

      <Reveal>
        <div className="pixel-frame pixel-frame--mint bg-bg2">
          {/* title bar — arcade coin slot instead of the macOS dot cliché */}
          <div className="flex items-center gap-3 border-b-[3px] border-ink bg-surface px-4 py-3">
            <motion.span
              aria-hidden
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="font-display text-[9px] tracking-widest text-gold"
            >
              ◉ INSERT COIN
            </motion.span>
            <span className="ml-auto font-term text-base text-muted">
              guest@solglove: ~/contact
            </span>
          </div>

          <div className="p-6 font-term text-lg md:p-8">
            <Terminal />

            {/* channel buttons styled as terminal output */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CHANNELS.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ x: 4 }}
                  className="group flex items-center justify-between bg-surface px-4 py-3"
                  style={{ border: "3px solid var(--c-ink)" }}
                >
                  <span>
                    <span className="text-mint">➜</span>{" "}
                    <span className="text-paper transition-colors group-hover:text-mint">{c.label}</span>
                  </span>
                  <span className="text-muted group-hover:text-paper">{c.cmd} ↗</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Terminal() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? LINES.length : 0);
  const [typed, setTyped] = useState(reduce ? "" : "");

  useEffect(() => {
    if (reduce || step >= LINES.length) return;
    const full = LINES[step].t;
    if (typed.length < full.length) {
      const id = setTimeout(() => setTyped(full.slice(0, typed.length + 1)), 45);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setStep((s) => s + 1);
      setTyped("");
    }, 500);
    return () => clearTimeout(id);
  }, [typed, step, reduce]);

  return (
    <div className="space-y-1.5">
      {LINES.map((l, i) => {
        if (i > step) return null;
        const typing = i === step && !reduce;
        return (
          <div key={i}>
            <div className="text-paper">
              <span className="text-mint">{l.p}</span>{" "}
              <span>{typing ? typed : l.t}</span>
              {typing && <span className="caret text-mint">█</span>}
            </div>
            {i < step && <div className="pl-4 text-muted">{l.out}</div>}
          </div>
        );
      })}
    </div>
  );
}
