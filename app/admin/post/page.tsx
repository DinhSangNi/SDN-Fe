'use client';

import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/services/post.service';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { Post } from '@/types';
import ConfirmDeleteDialog from '@/components/custom/ConfirmDeleteDialog';
import { useTogglePostVisibility } from '@/hooks/post/useTogglePostVisibility';
import PriorityInput from '@/components/custom/PriorityInput';

export type FiltersProp = {
  page: number;
  limit: number;
};

export default function PostManagePage() {
  const [filters, setFilters] = useState<FiltersProp>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts', filters],
    queryFn: () => getPosts({ page: filters.page, limit: filters.limit }),
  });
  const router = useRouter();
  const toggleVisibilityMutation = useTogglePostVisibility();

  const posts = data?.data || [];
  const meta = data?.meta;

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const toggleVisibility = (postId: string, current: boolean) => {
    toggleVisibilityMutation.mutate({ id: postId, isVisible: !current });
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }
  if (isError) return <p>Failed to fetch post data.</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <Link href="/admin/post/create">
          <Button>Create new post</Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Cover image</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Visible</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts?.map((post: Post) => (
            <TableRow key={post._id}>
              <TableCell>
                <p className="line-clamp-2">{post.title}</p>
              </TableCell>
              <TableCell>
                {post.type === 'announcement' ? 'Announcement' : 'Post'}
              </TableCell>

              <TableCell>
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt="thumbnail"
                    width={1000}
                    height={800}
                    className="rounded-md object-cover w-[80px] aspect-square"
                  />
                )}
              </TableCell>
              <TableCell>
                <PriorityInput
                  postId={post._id}
                  initialPriority={post.priority}
                />
              </TableCell>
              <TableCell>
                <button
                  onClick={() => toggleVisibility(post._id, post.isVisible)}
                  className={`text-xs font-bold px-2 py-1 rounded-full transition-colors ${post.isVisible
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                >
                  {post.isVisible ? 'Visible' : 'Hidden'}
                </button>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => router.push(`/post/${post._id}`)}
                    >
                      👁️ View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(`/admin/post/${post._id}/edit`)
                      }
                    >
                      👁️ Edit
                    </DropdownMenuItem>
                    <ConfirmDeleteDialog type="post" id={post._id}>
                      <DropdownMenuItem
                        className="text-red-600"
                        onSelect={(e) => e.preventDefault()}
                      >
                        🗑️ Delete
                      </DropdownMenuItem>
                    </ConfirmDeleteDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end items-center mt-4 space-x-2 text-[0.8rem]">
        <Button
          disabled={filters.page <= 1}
          className="h-8 p-0 aspect-square"
          onClick={() => handlePageChange(filters.page - 1)}
        >
          <ChevronLeft />
        </Button>

        <span>
          {filters.page} / {meta?.totalPages}
        </span>

        <Button
          disabled={filters.page >= (meta?.totalPages || 1)}
          className="h-8 p-0 aspect-square"
          onClick={() => handlePageChange(filters.page + 1)}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
