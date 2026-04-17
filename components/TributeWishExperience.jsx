"use client";

import { useCallback } from "react";
import { PenLine } from "lucide-react";
import { WishForm } from "@/components/WishForm";
import { WishesFeed } from "@/components/WishesFeed";

const WISH_FORM_SECTION_ID = "wish-form-section";

export function TributeWishExperience({ wishes }) {
  const scrollToWishForm = useCallback(() => {
    document.getElementById(WISH_FORM_SECTION_ID)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.setTimeout(() => {
      document.getElementById("sender_name")?.focus({ preventScroll: true });
    }, 450);
  }, []);

  return (
    <div className="relative grid gap-8 lg:grid-cols-2 lg:items-start">
      <button
        type="button"
        onClick={scrollToWishForm}
        className="fixed bottom-6 right-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-lg ring-1 ring-slate-900/5 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 lg:hidden"
        aria-label="Ke bagian tulis doa dan ucapan"
      >
        <PenLine className="h-5 w-5" aria-hidden />
      </button>

      <div
        id={WISH_FORM_SECTION_ID}
        className="order-2 scroll-mt-6 lg:order-1"
      >
        <WishForm />
      </div>
      <div className="order-1 lg:order-2">
        <WishesFeed wishes={wishes} />
      </div>
    </div>
  );
}
