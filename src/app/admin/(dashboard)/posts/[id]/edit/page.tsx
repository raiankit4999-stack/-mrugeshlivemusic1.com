import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostForm from "../../PostForm";
import { updatePostAction } from "../../actions";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  const boundUpdate = updatePostAction.bind(null, post.id);

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">Edit Post</h1>
      <div className="mt-6">
        <PostForm
          action={boundUpdate}
          submitLabel="Save changes"
          defaults={{
            title: post.title,
            slug: post.slug,
            metaTitle: post.metaTitle ?? "",
            metaDescription: post.metaDescription ?? "",
            excerpt: post.excerpt,
            bodyMarkdown: post.bodyMarkdown,
            coverAlt: post.coverAlt,
            coverImage: post.coverImage,
            tags: post.tags.join(", "),
            published: post.published,
          }}
        />
      </div>
    </div>
  );
}
