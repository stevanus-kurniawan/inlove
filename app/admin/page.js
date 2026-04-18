import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAdmin } from "@/app/admin/actions";
import { ApprovedWishesAdmin } from "@/components/admin/ApprovedWishesAdmin";
import { PendingWishesAdmin } from "@/components/admin/PendingWishesAdmin";
import { isAdminSessionValid } from "@/lib/auth";
import { pool } from "@/lib/db";
import { LayoutDashboard, LogOut } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin",
};

async function getPendingWishes() {
  try {
    const result = await pool.query(
      `SELECT * FROM wishes WHERE status = 'pending' ORDER BY created_at ASC`
    );
    return result.rows;
  } catch (e) {
    console.error("[getPendingWishes]", e);
    return [];
  }
}

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

export default async function AdminDashboardPage() {
  if (!(await isAdminSessionValid())) {
    redirect("/admin/login");
  }

  const pending = await getPendingWishes();
  const approved = await getApprovedWishes();

  return (
    <main className="mx-auto min-h-screen max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-slate-900">
          <LayoutDashboard className="h-6 w-6" aria-hidden />
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline"
          >
            View site
          </Link>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Log out
            </button>
          </form>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Pending wishes
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Approve to show on the home page, or reject to hide. Click a
            message to read it in full.
          </p>
        </div>

        <PendingWishesAdmin wishes={pending} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Approved wishes
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            These appear on the public page. Use “Revoke to pending” to remove
            them from the site until you approve again.
          </p>
        </div>

        <ApprovedWishesAdmin wishes={approved} />
      </div>
    </main>
  );
}
