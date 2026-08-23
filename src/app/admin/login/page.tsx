import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-luxury">
        <h1 className="text-2xl font-semibold text-ink">Crystal Beats Admin</h1>
        <p className="mt-1 text-sm text-stone">Sign in to manage the site.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
