import Link from "next/link";
import {
  LayoutDashboard,
  Newspaper,
  CalendarDays,
  Images,
  Video,
  Quote,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Blog Posts", icon: Newspaper },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/videos", label: "Videos", icon: Video },
  { href: "/admin/testimonials", label: "Reviews", icon: Quote },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminNav() {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-border bg-card px-4 py-4 md:h-screen md:w-56 md:border-b-0 md:border-r md:px-3 md:py-6">
      <div className="px-2 text-sm font-semibold text-ink">Crystal Beats Admin</div>
      <nav className="mt-4 flex flex-1 flex-row flex-wrap gap-1 md:flex-col">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-stone transition-colors hover:bg-muted hover:text-foreground"
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="mt-4 flex flex-col gap-1 border-t border-border pt-4 md:mt-auto">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-stone transition-colors hover:bg-muted hover:text-foreground"
        >
          <ExternalLink size={16} />
          View site
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-stone transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </form>
        <a
          href="https://www.rivavya.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 pt-2 text-xs text-stone/70 hover:text-gold transition-colors"
        >
          Built by Rivavya Create and Trade LLP
        </a>
      </div>
    </aside>
  );
}
