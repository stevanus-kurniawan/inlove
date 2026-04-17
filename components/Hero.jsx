"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";

const DEFAULT_IMAGE = "/Image/tribute-hero.png";

export function Hero({ title = "Dalam kenangan penuh kasih", subtitle, imageSrc = DEFAULT_IMAGE }) {
  const alt = subtitle ? `${title}. ${subtitle}` : title;
  const [previewOpen, setPreviewOpen] = useState(false);

  const closePreview = useCallback(() => setPreviewOpen(false), []);

  useEffect(() => {
    if (!previewOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closePreview();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [previewOpen, closePreview]);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <h1 className="sr-only">{title}</h1>
      <button
        type="button"
        onClick={() => setPreviewOpen(true)}
        className="group relative block w-full cursor-zoom-in rounded-none border-0 bg-transparent p-0 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
        aria-label="Buka pratinjau gambar banner dalam ukuran besar"
      >
        <div className="relative aspect-[16/9] min-h-[200px] w-full max-h-[min(70vh,560px)] sm:min-h-[240px]">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            className="object-cover object-center transition group-hover:brightness-[0.97]"
            sizes="100vw"
            priority
          />
        </div>
      </button>

      {previewOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau gambar banner"
          onClick={closePreview}
        >
          <button
            type="button"
            onClick={closePreview}
            className="absolute right-3 top-3 z-[101] inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/35 transition hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 sm:right-5 sm:top-5"
            aria-label="Tutup pratinjau"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
          <div
            className="relative mx-auto h-[min(90vh,920px)] w-full max-w-[min(100vw-2rem,1280px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imageSrc}
              alt={alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 1280px"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
