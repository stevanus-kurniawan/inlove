"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { revokeApproval } from "@/app/admin/actions";
import { X } from "lucide-react";

function formatDate(value) {
  try {
    const d = new Date(value);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

export function ApprovedWishesAdmin({ wishes }) {
  const [detail, setDetail] = useState(null);

  if (wishes.length === 0) {
    return (
      <p className="px-6 py-12 text-center text-sm text-slate-500">
        No approved wishes yet. Approve submissions from the pending list above.
      </p>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] table-fixed text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-3 font-medium">Received</th>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Message</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {wishes.map((w) => (
              <tr key={w.id} className="align-top">
                <td className="w-36 whitespace-nowrap px-6 py-8 align-top text-slate-500">
                  {formatDate(w.created_at)}
                </td>
                <td className="max-w-[10rem] px-6 py-8 align-top font-medium text-slate-900">
                  {w.sender_name}
                </td>
                <td className="min-w-0 px-6 py-8 align-top">
                  <button
                    type="button"
                    onClick={() => setDetail(w)}
                    className="w-full text-left text-slate-600 transition hover:text-slate-900"
                  >
                    <span className="line-clamp-3 cursor-pointer whitespace-pre-wrap text-sm leading-relaxed">
                      {w.message}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-slate-500">
                      View full message
                    </span>
                  </button>
                </td>
                <td className="w-40 shrink-0 px-6 py-8 align-top">
                  <form action={revokeApproval.bind(null, w.id)}>
                    <button
                      type="submit"
                      className="w-full min-w-[6.5rem] rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900 shadow-sm transition hover:bg-amber-100 sm:w-auto"
                    >
                      Revoke to pending
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {detail ? (
          <motion.div
            key={detail.id}
            role="dialog"
            aria-modal="true"
            aria-labelledby="approved-wish-detail-title"
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]"
              aria-label="Close"
              onClick={() => setDetail(null)}
            />
            <motion.div
              className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-100 bg-white p-6 shadow-xl"
              initial={{ opacity: 0, scale: 0.98, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 6 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setDetail(null)}
                className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                Approved — visible on site
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                {formatDate(detail.created_at)}
              </p>
              <h2
                id="approved-wish-detail-title"
                className="mt-2 text-xl font-semibold text-slate-900"
              >
                {detail.sender_name}
              </h2>
              <p className="mt-4 whitespace-pre-wrap text-base leading-relaxed text-slate-600">
                {detail.message}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
