import { useEffect, useState } from "react";
import { motion, useSpring, useReducedMotion, AnimatePresence } from "motion/react";

/** Fixed CRT texture stack — scanlines, grain, vignette. */
export function Overlays() {
  return (
    <>
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
      <div className="scanlines" aria-hidden />
    </>
  );
}

/** One-shot CRT power-on sweep. */
export function CrtBoot() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (reduce) return setDone(true);
    const id = setTimeout(() => setDone(true), 950);
    return () => clearTimeout(id);
  }, [reduce]);
  if (done) return null;
  return <div className="crt-boot" aria-hidden />;
}

/** Custom pixel crosshair cursor (desktop pointer only, motion allowed). */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [down, setDown] = useState(false);
  const x = useSpring(0, { stiffness: 1100, damping: 50, mass: 0.3 });
  const y = useSpring(0, { stiffness: 1100, damping: 50, mass: 0.3 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("cursor-custom");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", d);
    window.addEventListener("pointerup", u);
    return () => {
      document.body.classList.remove("cursor-custom");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", d);
      window.removeEventListener("pointerup", u);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div aria-hidden style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[70]">
      <div
        style={{
          transform: `translate(-50%, -50%) scale(${down ? 0.8 : 1})`,
          transition: "transform 90ms steps(2)",
        }}
        className="relative"
      >
        <span className="absolute left-1/2 top-1/2 h-[3px] w-5 -translate-x-1/2 -translate-y-1/2 bg-mint" />
        <span className="absolute left-1/2 top-1/2 h-5 w-[3px] -translate-x-1/2 -translate-y-1/2 bg-mint" />
        <span className="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 border-2 border-coral" />
      </div>
    </motion.div>
  );
}

const SEQ = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];

/** Konami code → "CHEAT ENABLED" toast. The detail that says a human built this. */
export function Konami() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      i = k === SEQ[i] ? i + 1 : k === SEQ[0] ? 1 : 0;
      if (i === SEQ.length) {
        i = 0;
        setShow(true);
        setTimeout(() => setShow(false), 3200);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="pixel-frame pixel-frame--mint fixed bottom-6 left-1/2 z-[75] -translate-x-1/2 bg-bg2 px-6 py-4"
        >
          <span className="font-display text-xs txt-spectrum">★ CHEAT ENABLED</span>
          <span className="ml-3 font-term text-base text-paper">+99 RIZZ · GG</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
