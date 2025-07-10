import PostForm from '@/components/custom/PostForm';

export default function CreatePostPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create Post</h1>

      <div className="bg-white rounded-xl shadow p-6 border">
        <PostForm />
      </div>
    </div>
  );
}
