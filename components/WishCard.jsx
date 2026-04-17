"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CHAR_LIMIT = 150;

function shouldTruncate(message) {
  if (!message) return false;
  if (message.length > CHAR_LIMIT) return true;
  const lines = message.split(/\r?\n/);
  if (lines.length > 3) return true;
  return false;
}

function formatDate(value) {
  try {
    const d = new Date(value);
    return d.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export function WishCard({ wish }) {
  const { sender_name, message, created_at } = wish;
  const [expanded, setExpanded] = useState(false);
  const needsToggle = shouldTruncate(message);

  const collapsedContent =
    message.length > CHAR_LIMIT
      ? `${message.slice(0, CHAR_LIMIT).trimEnd()}…`
      : message;

  return (
    <motion.li
      layout
      className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
      transition={{ layout: { duration: 0.28, ease: [0.22, 0.05, 0.25, 1] } }}
    >
      <p className="text-sm font-medium text-slate-500">{formatDate(created_at)}</p>
      <p className="mt-2 text-base font-semibold text-slate-900">{sender_name}</p>

      <motion.div layout className="mt-3 min-h-0">
        <AnimatePresence initial={false} mode="wait">
          {expanded || !needsToggle ? (
            <motion.p
              key="full"
              layout
              initial={{ opacity: 0.92 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.92 }}
              transition={{ duration: 0.18 }}
              className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600"
            >
              {message}
            </motion.p>
          ) : (
            <motion.div
              key="collapsed"
              layout
              initial={{ opacity: 0.92 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.92 }}
              transition={{ duration: 0.18 }}
            >
              {message.length > CHAR_LIMIT ? (
                <p className="text-sm leading-relaxed text-slate-600">
                  {collapsedContent}
                </p>
              ) : (
                <p className="line-clamp-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
                  {message}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {needsToggle ? (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-3 self-start text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-2 transition hover:text-blue-700 hover:decoration-blue-300"
        >
          {expanded ? "Tampilkan lebih sedikit" : "Baca selengkapnya"}
        </button>
      ) : null}
    </motion.li>
  );
}
