'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';

import { usePost } from '@/hooks/post/usePost';
import { Post } from '@/types';
import PostCard from '@/components/custom/PostCard';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2Icon } from 'lucide-react';
import { BackButton } from '@/components/custom/BackButton';

function AllPostsContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') as 'post' | 'announcement' | null;
  const keyword = searchParams.get('keyword') as string | null;

  const [filters, setFilters] = useState({
    type: typeParam ?? undefined,
    isVisible: true,
    sort: 'latest' as 'latest' | 'oldest',
    page: 1,
    limit: 3,
    keyword: keyword ?? undefined,
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      type: typeParam ?? undefined,
      keyword: keyword ?? undefined,
    }));
  }, [searchParams]);

  const { data, isLoading, isError } = usePost(filters);

  const sortedPosts = useMemo(() => {
    if (!data?.data) return [];
    const posts = [...data.data];
    return posts.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return filters.sort === 'latest' ? dateB - dateA : dateA - dateB;
    });
  }, [data, filters.sort]);

  const handleSortChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      sort: value as 'latest' | 'oldest',
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const totalPages = data?.meta?.totalPages || 1;

  if (isLoading)
    return (
      <div className="min-h-screen py-8 space-y-6 w-[80%] mx-auto flex justify-center items-center">
        <Loader2Icon className="animate-spin h-10 w-10" />
      </div>
    );
  if (isError) return <p>Failed to fetch {typeParam}.</p>;

  return (
    <div className="container py-8 space-y-6 w-[80%] mx-auto">
      <div className="mb-2">
        <BackButton />
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {filters.type === 'post' ? 'All Blog Posts' : 'All Announcements'}
        </h1>
        <Select value={filters.sort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Lastest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {sortedPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sortedPosts.map((post: Post) => (
              <PostCard key={post._id} data={post} />
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 space-x-2 text-sm">
            <Button
              variant="outline"
              size="icon"
              disabled={filters.page <= 1}
              onClick={() => handlePageChange(filters.page - 1)}
            >
              <ChevronLeft />
            </Button>
            <span>
              {filters.page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={filters.page >= totalPages}
              onClick={() => handlePageChange(filters.page + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

const AllPostsPage = () => {
  return (
    <Suspense
      fallback={<div className="py-8 w-[80%] mx-auto h-full">Loading...</div>}
    >
      <AllPostsContent />
    </Suspense>
  );
};

export default AllPostsPage;
