import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safeQuery";

export const SESSION_COOKIE = "admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET environment variable is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(username: string) {
  return new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.username !== "string") return null;
    return { username: payload.username };
  } catch {
    return null;
  }
}

export async function getSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function setSessionCookie(username: string) {
  const token = await createSessionToken(username);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

type ActiveCredentials = { username: string; passwordHash: string; source: "db" | "env" };

/**
 * The admin's current username + password hash. Prefers the AdminSettings
 * database row (set once the admin changes their credentials from
 * /admin/settings) and falls back to the ADMIN_USERNAME / ADMIN_PASSWORD_HASH
 * environment variables until then.
 */
export async function getActiveCredentials(): Promise<ActiveCredentials> {
  const dbSettings = await safeQuery(() => prisma.adminSettings.findFirst(), null);
  if (dbSettings) {
    return { username: dbSettings.username, passwordHash: dbSettings.passwordHash, source: "db" };
  }

  const envUsername = process.env.ADMIN_USERNAME;
  const envHash = process.env.ADMIN_PASSWORD_HASH;
  if (!envUsername || !envHash) {
    throw new Error("Admin login isn't configured yet — set ADMIN_USERNAME and ADMIN_PASSWORD_HASH.");
  }
  return { username: envUsername, passwordHash: envHash, source: "env" };
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const active = await getActiveCredentials();
  if (username !== active.username) return false;
  return bcrypt.compare(password, active.passwordHash);
}

/**
 * Changes the admin username and/or password. Requires the current password
 * to authorize the change. Pass null for newPassword to keep it unchanged.
 */
export async function updateCredentials(
  currentPassword: string,
  newUsername: string,
  newPassword: string | null
): Promise<void> {
  const active = await getActiveCredentials();
  const valid = await bcrypt.compare(currentPassword, active.passwordHash);
  if (!valid) {
    throw new Error("Current password is incorrect.");
  }

  const passwordHash = newPassword ? await bcrypt.hash(newPassword, 10) : active.passwordHash;
  const existing = await prisma.adminSettings.findFirst();

  if (existing) {
    await prisma.adminSettings.update({
      where: { id: existing.id },
      data: { username: newUsername, passwordHash },
    });
  } else {
    await prisma.adminSettings.create({ data: { username: newUsername, passwordHash } });
  }
}
