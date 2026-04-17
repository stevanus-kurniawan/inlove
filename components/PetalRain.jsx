"use client";

import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const MOBILE_QUERY = "(max-width: 768px)";

function rand(a, b) {
  return a + Math.random() * (b - a);
}

function getIsMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_QUERY).matches;
}

/**
 * Full viewport: fixed, inset-0, 100vw × 100dvh, overflow hidden, pointer-events none.
 * z-50 — above backdrop; toasts z-[200]. Mobile: 60–80 particles; desktop: 100–150.
 */
export function PetalRain({ active, session = 0 }) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    setIsMobile(getIsMobileViewport());
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(() => {
    if (!active) return [];
    const min = isMobile ? 60 : 100;
    const max = isMobile ? 80 : 150;
    const count = Math.floor(rand(min, max + 1));
    return Array.from({ length: count }, (_, i) => {
      const large = Math.random() > 0.45;
      const sizePx = large ? rand(14, 18) : rand(6, 10);
      const tint = Math.random() > 0.5 ? "light" : "soft";
      return {
        id: `${session}-${i}`,
        left: `${rand(0, 100)}%`,
        size: sizePx,
        tint,
        duration: rand(4, 6),
        delay: rand(0, 1.1),
        sway: rand(-56, 56),
        midSway: rand(-32, 32),
      };
    });
  }, [active, session, isMobile]);

  if (!mounted || !active || particles.length === 0) return null;

  const layer = (
    <div
      className="pointer-events-none fixed inset-0 z-50 box-border overflow-hidden"
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: "100dvh",
      }}
      aria-hidden
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={
            p.tint === "light"
              ? "absolute rounded-full bg-white/85 shadow-[0_0_14px_rgba(255,255,255,0.45)] blur-[1px]"
              : "absolute rounded-full bg-slate-100/90 shadow-[0_0_12px_rgba(148,163,184,0.35)] blur-[1px]"
          }
          style={{
            left: p.left,
            top: "-20px",
            width: p.size,
            height: p.size * 1.06,
          }}
          initial={{ opacity: 0 }}
          animate={{
            y: ["0vh", "32vh", "58vh", "100vh"],
            x: [0, p.midSway * 0.55, p.sway * -0.42, p.sway * 0.38],
            opacity: [0, 0.92, 0.78, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.2, 0.03, 0.28, 1],
            times: [0, 0.3, 0.65, 1],
          }}
        />
      ))}
    </div>
  );

  return createPortal(layer, document.body);
}
