"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { pool } from "@/lib/db";
import {
  clearAdminSession,
  createAdminSession,
  isAdminSessionValid,
  verifyAdminCredentials,
} from "@/lib/auth";

export async function loginAdmin(prevState, formData) {
  const username = formData.get("username")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!verifyAdminCredentials(username, password)) {
    return { error: "Invalid credentials." };
  }

  try {
    await createAdminSession();
  } catch (e) {
    console.error("[loginAdmin]", e);
    return {
      error:
        "Session could not be created. Set ADMIN_SESSION_SECRET in your environment.",
    };
  }

  redirect("/admin");
}

export async function logoutAdmin(formData) {
  void formData;
  await clearAdminSession();
  redirect("/admin/login");
}

export async function approveWish(id, formData) {
  void formData;
  if (!(await isAdminSessionValid())) {
    return { error: "Unauthorized." };
  }
  const num = Number(id);
  if (!Number.isInteger(num) || num < 1) {
    return { error: "Invalid wish." };
  }
  try {
    await pool.query(`UPDATE wishes SET status = $1 WHERE id = $2`, [
      "approved",
      num,
    ]);
  } catch (e) {
    console.error("[approveWish]", e);
    return { error: "Update failed." };
  }
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function rejectWish(id, formData) {
  void formData;
  if (!(await isAdminSessionValid())) {
    return { error: "Unauthorized." };
  }
  const num = Number(id);
  if (!Number.isInteger(num) || num < 1) {
    return { error: "Invalid wish." };
  }
  try {
    await pool.query(`UPDATE wishes SET status = $1 WHERE id = $2`, [
      "rejected",
      num,
    ]);
  } catch (e) {
    console.error("[rejectWish]", e);
    return { error: "Update failed." };
  }
  revalidatePath("/admin");
  revalidatePath("/");
}
