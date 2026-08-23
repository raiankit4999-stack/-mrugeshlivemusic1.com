import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safeQuery";
import { buttonVariants } from "@/components/ui/button";
import DeleteButton from "@/components/admin/DeleteButton";
import { deletePostAction } from "./actions";

export default async function AdminPostsPage() {
  const posts = await safeQuery(
    () => prisma.post.findMany({ orderBy: { publishedAt: "desc" } }),
    []
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-ink">Blog Posts</h1>
        <Link href="/admin/posts/new" className={buttonVariants({ variant: "default" })}>
          <Plus size={16} />
          New post
        </Link>
      </div>
      <p className="mt-1 text-sm text-stone">
        The 11 existing guides are part of the site&apos;s codebase and aren&apos;t editable here. Posts you
        add below appear on <code>/blog</code> alongside them.
      </p>

      <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {posts.length === 0 && (
          <p className="p-5 text-sm text-stone">No posts yet — click &quot;New post&quot; to add one.</p>
        )}
        {posts.map((post) => (
          <div key={post.id} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <p className="truncate font-medium text-ink">{post.title}</p>
              <p className="truncate text-sm text-stone">
                /blog/{post.slug} {post.published ? "" : "· (draft)"}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/admin/posts/${post.id}/edit`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Edit
              </Link>
              <DeleteButton action={deletePostAction.bind(null, post.id)} confirmMessage={`Delete "${post.title}"?`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
