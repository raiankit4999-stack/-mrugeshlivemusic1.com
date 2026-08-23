import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminNav />
      <main className="flex-1 overflow-x-hidden p-4 md:p-8">{children}</main>
    </div>
  );
}
