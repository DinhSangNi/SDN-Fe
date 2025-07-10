'use client';

import PostForm from '@/components/custom/PostForm';
import { useGetPostById } from '@/hooks/post/useGetPostById';
import { useParams } from 'next/navigation';

export default function EditPostPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: post, isLoading } = useGetPostById(id);

  if (isLoading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Post</h1>
      <div className="bg-white rounded-xl shadow p-6 border">
        <PostForm mode="edit" initialData={post} postId={id} />
      </div>
    </div>
  );
}
