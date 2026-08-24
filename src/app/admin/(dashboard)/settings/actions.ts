"use server";

import { revalidatePath } from "next/cache";
import { updateCredentials } from "@/lib/auth";

export type SettingsFormState = { error?: string; success?: string };

export async function updateSettingsAction(
  _prev: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newUsername = String(formData.get("newUsername") ?? "").trim();
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!currentPassword) return { error: "Enter your current password." };
  if (!newUsername) return { error: "Username can't be empty." };
  if (newPassword && newPassword !== confirmPassword) return { error: "New passwords don't match." };
  if (newPassword && newPassword.length < 6) {
    return { error: "New password must be at least 6 characters." };
  }

  try {
    await updateCredentials(currentPassword, newUsername, newPassword || null);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not update settings." };
  }

  revalidatePath("/admin/settings");
  return { success: "Login details updated." };
}
