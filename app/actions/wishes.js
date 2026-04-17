"use server";

import { randomUUID } from "crypto";

import { revalidatePath } from "next/cache";
import { pool } from "@/lib/db";

export async function submitWish(prevState, formData) {
  const sender_name = formData.get("sender_name")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  if (!sender_name || !message) {
    return { error: "Harap isi nama dan pesan Anda." };
  }

  if (sender_name.length > 255) {
    return { error: "Name is too long." };
  }

  try {
    await pool.query(
      `INSERT INTO wishes (sender_name, message) VALUES ($1, $2)`,
      [sender_name, message]
    );
  } catch (e) {
    console.error("[submitWish]", e);
    return {
      error:
        "Ucapan tidak dapat disimpan. Periksa koneksi basis data lalu coba lagi.",
    };
  }

  revalidatePath("/");

  return {
    success: true,
    sender_name,
    message,
    key: randomUUID(),
  };
}
