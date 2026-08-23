import Link from "next/link";
import { Newspaper, CalendarDays, Images, Video } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safeQuery";

export default async function AdminDashboardPage() {
  const [postCount, eventCount, galleryCount, videoCount] = await Promise.all([
    safeQuery(() => prisma.post.count(), 0),
    safeQuery(() => prisma.event.count(), 0),
    safeQuery(() => prisma.galleryImage.count(), 0),
    safeQuery(() => prisma.video.count(), 0),
  ]);

  const cards = [
    { href: "/admin/posts", label: "Blog Posts", count: postCount, icon: Newspaper },
    { href: "/admin/events", label: "Events", count: eventCount, icon: CalendarDays },
    { href: "/admin/gallery", label: "Gallery Images", count: galleryCount, icon: Images },
    { href: "/admin/videos", label: "Videos", count: videoCount, icon: Video },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-stone">Manage what shows up on the Crystal Beats website.</p>

      {!process.env.DATABASE_URL && (
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          No database is connected yet (DATABASE_URL is not set), so anything you add here won&apos;t
          be saved. Connect a Postgres database in your Vercel project settings and redeploy.
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ href, label, count, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <Icon size={20} className="text-gold" />
            <div className="mt-3 text-2xl font-semibold text-ink">{count}</div>
            <div className="text-sm text-stone">{label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
