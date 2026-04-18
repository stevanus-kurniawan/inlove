import { createHmac, timingSafeEqual } from "crypto";
import { unstable_noStore as noStore } from "next/cache";
import { cookies, headers } from "next/headers";

const COOKIE_NAME = "tribute_admin_session";

/** Fallback when `cookies()` is empty in some Server Action / proxy setups. */
function getTokenFromCookieHeader(cookieHeader) {
  if (!cookieHeader) return undefined;
  const prefix = `${COOKIE_NAME}=`;
  for (const segment of cookieHeader.split(";")) {
    const t = segment.trim();
    if (t.startsWith(prefix)) {
      const raw = t.slice(prefix.length);
      try {
        return decodeURIComponent(raw);
      } catch {
        return raw;
      }
    }
  }
  return undefined;
}

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "";
}

/** Production defaults to Secure cookies; set COOKIE_SECURE=false if the app is served over HTTP (not recommended). */
function getSecureCookieFlag() {
  if (process.env.COOKIE_SECURE === "false") return false;
  if (process.env.COOKIE_SECURE === "true") return true;
  return process.env.NODE_ENV === "production";
}

function signPayload(payload) {
  const secret = getSecret();
  if (!secret) return null;
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const sig = createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function verifyToken(token) {
  const secret = getSecret();
  if (!secret || !token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  const expected = createHmac("sha256", secret).update(body).digest("base64url");
  const a = Buffer.from(sig, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const json = Buffer.from(body, "base64url").toString("utf8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export async function isAdminSessionValid() {
  noStore();

  const store = await cookies();
  let token = store.get(COOKIE_NAME)?.value;
  if (!token) {
    token = getTokenFromCookieHeader(headers().get("cookie") ?? "");
  }

  const payload = verifyToken(token);
  if (!payload || typeof payload.exp !== "number") return false;
  return payload.exp > Date.now();
}

export async function createAdminSession() {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const token = signPayload({ exp, v: 1 });
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: getSecureCookieFlag(),
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export function verifyAdminCredentials(username, password) {
  const u = process.env.ADMIN_USER || "admin";
  const p = process.env.ADMIN_PASSWORD || "changeme";
  return username === u && password === p;
}
