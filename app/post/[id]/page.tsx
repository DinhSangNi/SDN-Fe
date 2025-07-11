'use client';

import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { useGetPostById } from '@/hooks/post/useGetPostById';
import { BackButton } from '@/components/custom/BackButton';

export default function PostDetailPage() {
  const { id } = useParams() as { id: string };

  const { data: post, isLoading, isError } = useGetPostById(id);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-10 space-y-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="max-w-3xl mx-auto py-10 text-center text-red-500">
        Unable to load article. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <div className="mb-2">
        <BackButton />
      </div>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div>
        <p className="text-sm text-muted-foreground">
          Publish at {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-muted-foreground">
          By {post.createdBy.fullName}
        </p>
      </div>

      {post.coverImage && (
        <Image
          src={post.coverImage}
          alt="Cover"
          width={1000}
          height={600}
          className="rounded-md w-full h-auto object-cover"
        />
      )}

      <div
        className="tinymce-content prose max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
