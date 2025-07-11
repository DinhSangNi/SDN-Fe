'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { usePost } from '@/hooks/post/usePost';
import MagnifyingGlass from '@/public/icons/MagnifyingGlassIcon';
import { getPosts } from '@/services/post.service';
import { Post } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import SearchedBlogCard from './SearchedBlogCard';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  className?: string;
  textTrigger?: ReactNode;
};

export type SearchParams = {
  keyword: string;
  page: number;
  limit: number;
};

const SearchModal = ({ className, textTrigger }: Props) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    keyword: '',
    page: 1,
    limit: 5,
  });
  const [searchedPosts, setSearchedPosts] = useState<Post[]>([]);
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      return await getPosts(searchParams);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['posts', searchParams], data.data);
    },
  });

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => ({
      ...prev,
      keyword: e.target.value,
    }));
  };

  const handleOnEnter = () => {
    const queryString = new URLSearchParams({
      keyword: searchParams.keyword,
    }).toString();
    router.push(`/post/?${queryString}`);
    setIsOpen(false);
  };

  useEffect(() => {
    if (searchParams.keyword.length === 0) {
      setSearchedPosts([]);
      return;
    }

    const searchDebounce = setTimeout(async () => {
      const res = await mutateAsync();
      setSearchedPosts(res.data);
    }, 300);

    return () => {
      clearTimeout(searchDebounce);
    };
  }, [searchParams]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger onClick={() => setIsOpen(true)}>
          {textTrigger ?? <MagnifyingGlass className="w-6 h-6" />}
        </DialogTrigger>
        <DialogContent className="p-0">
          <DialogTitle className="hidden"></DialogTitle>

          <div className="flex border-[1px] gap-2 border-gray-400 p-2 rounded-sm m-4 mb-0 shadow-lg">
            <MagnifyingGlass className="w-6 h-6" />
            <input
              autoFocus
              value={searchParams.keyword}
              type="text"
              placeholder="Search Post..."
              className="w-full hover:border-none focus-within:outline-none"
              onChange={handleSearchTextChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleOnEnter();
                }
              }}
            />
          </div>
          <div className="bg-gray-200 w-full min-h-[100px] max-h-[300px] overflow-y-auto px-4 py-2">
            {!isPending ? (
              searchedPosts &&
              searchedPosts.length > 0 &&
              searchedPosts.map((post) => (
                <SearchedBlogCard
                  key={post._id}
                  data={post}
                  onClick={() => {
                    router.push(`/post/${post._id}`);
                    setIsOpen(false);
                  }}
                />
              ))
            ) : (
              <div className="h-full flex items-center justify-center">
                <Loader2Icon className="animate-spin" />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchModal;
