import Link from "next/link";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { Lock } from "lucide-react";

export const metadata = {
  title: "Admin login",
};

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-2 text-slate-900">
          <Lock className="h-5 w-5" aria-hidden />
          <h1 className="text-xl font-semibold">Admin</h1>
        </div>
        <p className="text-sm text-slate-600">
          Sign in with the credentials from your environment variables.
        </p>
        <AdminLoginForm />
        <p className="mt-6 text-center text-sm text-slate-500">
          <Link href="/" className="font-medium text-slate-700 hover:underline">
            ← Back to site
          </Link>
        </p>
      </div>
    </main>
  );
}
