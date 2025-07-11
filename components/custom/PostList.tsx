'use client';

import { usePost } from '@/hooks/post/usePost';
import { Post } from '@/types';
import BlogCard from './PostCard';
import { Inbox } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  type: 'post' | 'announcement';
};

export default function PostList({ type }: Props) {
  const { data, isLoading, isError } = usePost({
    page: 1,
    limit: 3,
    type,
    isVisible: true,
  });
  const router = useRouter();

  const posts = data?.data || [];

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Failed to load posts.</p>;
  if (posts.length === 0)
    return (
      <p className="w-full text-center text-gray-300">
        <Inbox className="w-12 h-12 mx-auto  mb-2" />
        There are currently no {type}s available.
      </p>
    );

  return (
    <div>
      <div className="w-full grid lg:grid-cols-3 lg:gap-x-4">
        {posts.map((post: Post) => (
          <BlogCard key={post._id} data={post} />
        ))}
      </div>
      {posts.length >= 3 && (
        <div className="w-full flex justify-center py-8">
          <button
            className="py-1 px-2 border-[1px] text-[0.8rem] font-bold rounded-sm border-black hover:text-white hover:bg-black transition-colors duration-150"
            onClick={() => router.push(`/post/?type=${type}`)}
          >
            Read More
          </button>
        </div>
      )}
    </div>
  );
}
