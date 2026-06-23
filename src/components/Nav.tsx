import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { nav } from "../data/portfolio";
import { Wordmark } from "./Logo";

export function Nav() {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* top scroll-progress bar — rainbow spectrum */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        className="fixed left-0 top-0 z-[65] h-[5px] w-full"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(90deg,var(--c-sky),var(--c-lime),var(--c-gold),var(--c-coral),var(--c-orange),var(--c-mint))",
          }}
        />
      </motion.div>

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[min(1100px,92vw)] items-center justify-between gap-4"
      >
        <a
          href="#hero"
          className="pixel-frame pixel-notch flex items-center bg-bg2 px-4 py-3"
        >
          <Wordmark />
        </a>

        {/* desktop links */}
        <nav className="pixel-frame pixel-notch hidden items-center gap-1 bg-bg2 px-2 py-2 md:flex">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`relative px-3 py-2 font-display text-[10px] tracking-wider transition-colors ${
                active === n.id ? "text-ink" : "text-muted hover:text-paper"
              }`}
            >
              {active === n.id && (
                <motion.span
                  layoutId="navpill"
                  className="absolute inset-0 -z-10 bg-mint"
                  transition={{ type: "spring", stiffness: 500, damping: 34 }}
                />
              )}
              {n.label}
            </a>
          ))}
        </nav>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="pixel-frame pixel-notch flex h-12 w-12 items-center justify-center bg-bg2 md:hidden"
        >
          <div className="relative h-4 w-5">
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="absolute left-0 top-0 h-[3px] w-5 bg-mint"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="absolute left-0 top-[6px] h-[3px] w-5 bg-mint"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="absolute bottom-0 left-0 h-[3px] w-5 bg-mint"
            />
          </div>
        </button>
      </motion.header>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-3 bg-bg/95 md:hidden"
          >
            {nav.map((n, i) => (
              <motion.a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="font-display text-lg text-paper txt-pix"
              >
                {n.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
