"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { submitWish } from "@/app/actions/wishes";
import { PetalRain } from "@/components/PetalRain";
import { Send } from "lucide-react";

const initialState = { error: null };

const handledSuccessKeys = new Set();

export function WishForm() {
  const formRef = useRef(null);
  const [state, formAction] = useFormState(submitWish, initialState);
  const [isAnimating, setIsAnimating] = useState(false);
  const [petalSession, setPetalSession] = useState(0);

  useEffect(() => {
    if (!state?.success || !state.key) return;
    if (handledSuccessKeys.has(state.key)) return;
    handledSuccessKeys.add(state.key);
    if (handledSuccessKeys.size > 200) handledSuccessKeys.clear();

    setPetalSession((s) => s + 1);
    setIsAnimating(true);
    const done = setTimeout(() => setIsAnimating(false), 7000);

    toast.info(
      "Pesan Anda akan kami tinjau terlebih dahulu sebelum ditampilkan.",
      { duration: 5000 }
    );

    formRef.current?.reset();

    return () => clearTimeout(done);
  }, [state]);

  return (
    <>
      <PetalRain active={isAnimating} session={petalSession} />
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-xl font-semibold tracking-wide text-slate-900">
        Sampaikan Ucapan & Doa
      </h2>
      <p className="mt-2 text-sm text-slate-600">
      Terima kasih telah berbagi kenangan
      </p>
      <form ref={formRef} action={formAction} className="mt-6 flex flex-col gap-5">
        <div>
          <label
            htmlFor="sender_name"
            className="block text-sm font-medium text-slate-700"
          >
            Nama Anda
          </label>
          <input
            id="sender_name"
            name="sender_name"
            type="text"
            required
            maxLength={255}
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10"
            placeholder="Nama atau panggilan"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-slate-700"
          >
            Ungkapan Anda
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10"
            placeholder="Kenangan, terima kasih, atau beberapa kata hangat…"
          />
        </div>
        {state?.error ? (
          <p className="text-sm text-red-600" role="alert">
            {state.error}
          </p>
        ) : null}
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          <Send className="h-4 w-4" aria-hidden />
          Kirim ucapan
        </button>
      </form>
    </div>
    </>
  );
}
