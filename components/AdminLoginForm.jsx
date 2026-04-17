"use client";

import { useFormState } from "react-dom";
import { loginAdmin } from "@/app/admin/actions";

const initialState = { error: null };

export function AdminLoginForm() {
  const [state, formAction] = useFormState(loginAdmin, initialState);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-5">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-slate-700"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-slate-900/10"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-700"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-slate-900/10"
        />
      </div>
      {state?.error ? (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
      >
        Sign in
      </button>
    </form>
  );
}
