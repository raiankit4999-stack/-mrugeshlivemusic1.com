import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  const debug = {
    ADMIN_USERNAME_set: Boolean(process.env.ADMIN_USERNAME),
    ADMIN_USERNAME_length: process.env.ADMIN_USERNAME?.length ?? 0,
    ADMIN_PASSWORD_HASH_set: Boolean(process.env.ADMIN_PASSWORD_HASH),
    ADMIN_PASSWORD_HASH_length: process.env.ADMIN_PASSWORD_HASH?.length ?? 0,
    ADMIN_PASSWORD_HASH_prefix: process.env.ADMIN_PASSWORD_HASH?.slice(0, 4) ?? "",
    SESSION_SECRET_set: Boolean(process.env.SESSION_SECRET),
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-luxury">
        <h1 className="text-2xl font-semibold text-ink">Crystal Beats Admin</h1>
        <p className="mt-1 text-sm text-stone">Sign in to manage the site.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
        <pre className="mt-6 overflow-x-auto rounded-lg bg-muted p-3 text-[10px] text-stone">
          {JSON.stringify(debug, null, 2)}
        </pre>
      </div>
    </div>
  );
}
