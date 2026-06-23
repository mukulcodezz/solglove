import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { profile, stats } from "../data/portfolio";
import { PixelButton } from "./ui/PixelButton";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const spriteY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="hero" ref={ref} className="relative flex min-h-[100dvh] items-center overflow-hidden pt-28">
      {/* parallax pixel grid */}
      <motion.div style={{ y: reduce ? 0 : gridY }} className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(70% 60% at 50% 40%, transparent 30%, var(--c-bg) 100%)" }}
        />
      </motion.div>

      {/* floating pixel confetti */}
      {!reduce &&
        [
          { c: "var(--c-coral)", l: "12%", t: "26%", d: 0 },
          { c: "var(--c-gold)", l: "82%", t: "30%", d: 0.6 },
          { c: "var(--c-sky)", l: "74%", t: "68%", d: 1.1 },
          { c: "var(--c-lime)", l: "18%", t: "70%", d: 1.6 },
        ].map((p, i) => (
          <motion.span
            key={i}
            className="absolute hidden h-3 w-3 -z-10 sm:block"
            style={{ left: p.l, top: p.t, background: p.c }}
            animate={{ y: [0, -16, 0], rotate: [0, 90, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: p.d }}
          />
        ))}

      <motion.div
        style={{ opacity: fade }}
        className="mx-auto grid w-[min(1100px,92vw)] grid-cols-1 items-center gap-12 md:grid-cols-[1.1fr_0.9fr]"
      >
        {/* left: copy */}
        <div>
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="eyebrow"
          >
            ● {profile.status}
          </motion.span>

          <h1 className="mt-5 font-display leading-[1.15] txt-pix">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="block text-3xl text-paper sm:text-4xl md:text-5xl"
            >
              SOL<span className="txt-spectrum txt-spectrum--pan">GLOVE</span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 block font-term text-2xl normal-case tracking-normal text-mintsoft sm:text-3xl"
              style={{ textShadow: "2px 2px 0 var(--c-ink)" }}
            >
              {profile.class}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-6 max-w-md font-mono text-sm leading-relaxed text-paper/85"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <PixelButton href="#quests" icon="▶">VIEW QUESTS</PixelButton>
            <PixelButton href="#contact" variant="ghost" icon="✉">CONTACT</PixelButton>
          </motion.div>

          {/* mini XP HUD */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
          >
            {stats.slice(0, 3).map((s) => (
              <div key={s.label} className="font-term text-base text-paper">
                <span className="text-muted">{s.label}</span>{" "}
                <span style={{ color: s.color }}>{s.value}</span>
                <span className="text-muted">/100</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* right: avatar sprite in arcade frame */}
        <motion.div style={{ y: reduce ? 0 : spriteY }} className="relative mx-auto w-full max-w-[340px]">
          <SpriteCard />
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-display text-[9px] tracking-[0.3em] text-mint">SCROLL</span>
        <motion.span
          aria-hidden
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="text-lg text-mint"
        >
          ▼
        </motion.span>
      </motion.div>
    </section>
  );
}

function SpriteCard() {
  const reduce = useReducedMotion();
  return (
    <div className="pixel-frame pixel-frame--mint relative bg-bg2 p-4">
      {/* corner registration ticks */}
      <span className="absolute -left-1 -top-1 h-2 w-2 bg-mint" />
      <span className="absolute -right-1 -top-1 h-2 w-2 bg-mint" />
      <span className="absolute -bottom-1 -left-1 h-2 w-2 bg-mint" />
      <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-mint" />

      <div className="pixel-inset relative overflow-hidden bg-mintsoft/10">
        <motion.img
          src="/avatar.png"
          alt="SOLGLOVE pixel avatar — a developer in a green cap with a rainbow visor"
          width={320}
          height={320}
          className="block w-full"
          animate={reduce ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* periodic RGB glitch slice */}
        {!reduce && (
          <motion.div
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{ background: "linear-gradient(transparent 46%, rgba(95,200,238,0.5) 47%, transparent 49%)" }}
            animate={{ y: ["-100%", "120%"] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4.5, ease: "linear" }}
          />
        )}
      </div>

      {/* nameplate */}
      <div className="mt-4 flex items-center justify-between font-term text-base">
        <span className="text-paper">LV.{profile.level}</span>
        <span className="text-mint">@{profile.handle.toLowerCase()}</span>
        <span className="text-muted">{profile.location}</span>
      </div>
    </div>
  );
}
