import { getActiveCredentials } from "@/lib/auth";
import SettingsForm from "./SettingsForm";

export default async function AdminSettingsPage() {
  const active = await getActiveCredentials();

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">Settings</h1>
      <p className="mt-1 text-sm text-stone">Change your admin login username and password.</p>
      <div className="mt-6">
        <SettingsForm currentUsername={active.username} />
      </div>
    </div>
  );
}
