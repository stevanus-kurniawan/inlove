import { Hero } from "@/components/Hero";
import { TributeWishExperience } from "@/components/TributeWishExperience";
import { pool } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getApprovedWishes() {
  try {
    const result = await pool.query(
      `SELECT * FROM wishes WHERE status = 'approved' ORDER BY created_at DESC`
    );
    return result.rows;
  } catch (e) {
    console.error("[getApprovedWishes]", e);
    return [];
  }
}

export default async function Home() {
  const wishes = await getApprovedWishes();

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-12">
        <Hero />
        <TributeWishExperience wishes={wishes} />
      </div>
    </main>
  );
}
