import { useState } from "react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "ghost";
  icon?: ReactNode;
  onClick?: () => void;
};

const press = {
  whileHover: { x: -1, y: -1 },
  whileTap: { x: 5, y: 5, boxShadow: "0px 0px 0 0 var(--c-ink)" },
  transition: { type: "spring" as const, stiffness: 600, damping: 22 },
};

/** Arcade button: hard offset shadow that "presses" into the page on tap,
    with a one-frame white flash for coin-op feedback. */
export function PixelButton({ children, href, variant = "solid", icon, onClick }: Props) {
  const [flash, setFlash] = useState(0);
  const cls = `btn-pix relative ${variant === "ghost" ? "btn-pix--ghost" : ""}`;
  const fire = () => {
    setFlash((f) => f + 1);
    onClick?.();
  };
  const inner = (
    <>
      {children}
      {icon && <span aria-hidden>{icon}</span>}
      {flash > 0 && (
        <motion.span
          key={flash}
          aria-hidden
          initial={{ opacity: 0.85 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute inset-0 bg-white"
        />
      )}
    </>
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <motion.a
        href={href}
        onClick={fire}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={cls}
        {...press}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={fire} className={cls} {...press}>
      {inner}
    </motion.button>
  );
}
