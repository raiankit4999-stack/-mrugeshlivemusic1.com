"use server";

import { redirect } from "next/navigation";
import { verifyCredentials, setSessionCookie } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  let valid = false;
  try {
    valid = await verifyCredentials(username, password);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Login is not configured." };
  }

  if (!valid) {
    return { error: "Invalid username or password." };
  }

  await setSessionCookie(username);
  redirect("/admin");
}
