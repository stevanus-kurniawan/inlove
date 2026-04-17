import { Heart } from "lucide-react";
import { WishCard } from "@/components/WishCard";

/** Approved wishes only (query in page must filter `status = 'approved'`). */
export function WishesFeed({ wishes }) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <Heart className="h-5 w-5 text-rose-400" aria-hidden />
        <h2 className="text-xl font-semibold text-slate-900">Ucapan & Doa</h2>
      </div>

      <div className="max-h-[520px] overflow-y-auto pr-1">
        {wishes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white/80 p-10 text-center text-slate-500 shadow-sm">
            Belum ada ucapan. Jadilah orang pertama yang meninggalkan pesan.
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {wishes.map((w) => (
              <WishCard key={w.id} wish={w} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
