import PostForm from "../PostForm";
import { createPostAction } from "../actions";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">New Blog Post</h1>
      <div className="mt-6">
        <PostForm action={createPostAction} submitLabel="Publish post" />
      </div>
    </div>
  );
}
