'use client';

import MagnifyingGlass from '@/public/icons/MagnifyingGlassIcon';
import React, { ChangeEvent, useEffect, useState } from 'react';
import NavigationButton from './NavigationButton';
import blogImage from '@/public/images/IMG_0400.png';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SearchedBlogCard from './SearchedBlogCard';
import Link from 'next/link';

const blogs = [
  {
    id: '1',
    title: 'How to build an Application with modern Technology',
    description:
      'Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blandit euismod.',
    image: blogImage,
    author: {
      avartar: '',
      name: 'AiSe LAB',
    },
    categories: ['AI', 'Software'],
  },
  {
    id: '2',
    title: 'How to build an Application with modern Technology',
    description:
      'Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blandit euismod.',
    image: blogImage,
    author: {
      avartar: '',
      name: 'AiSe LAB',
    },
    categories: ['AI', 'Software'],
  },
  {
    id: '3',
    title: 'How to build an Application with modern Technology',
    description:
      'Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blandit euismod.',
    image: blogImage,
    author: {
      avartar: '',
      name: 'AiSe LAB',
    },
    categories: ['AI', 'Software'],
  },
];

const Navigation = () => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {}, [searchText]);

  return (
    <>
      <div className="w-full py-2 shadow-md z-50 bg-white fixed">
        <div className="w-[80%] mx-auto flex justify-between">
          <div className="basis-1/4 flex justify-start">
            <div className="text-center cursor-pointer">
              <h1 className="text-[1rem] font-bold">AiSE LAB</h1>
              <h1 className="text-[0.8rem] text-foreground">
                Kỹ thuật phần mềm
              </h1>
            </div>
          </div>
          <div className="flex basis-2/4 gap-8 text-[0.9rem] font-bold justify-center">
            <NavigationButton>
              <Link href={'/'}>Home</Link>
            </NavigationButton>
            <NavigationButton>About</NavigationButton>
            <NavigationButton>Activity</NavigationButton>
            <NavigationButton>Blog</NavigationButton>
          </div>
          <div className="flex basis-1/4 flex-1 items-center justify-end">
            <Dialog>
              <DialogTrigger>
                <MagnifyingGlass className="w-6 h-6" />
              </DialogTrigger>
              <DialogContent className="p-0">
                <DialogTitle className="hidden"></DialogTitle>
                <div className="flex border-[1px] gap-2 border-gray-400 p-2 rounded-sm m-4 mb-0 shadow-lg">
                  <MagnifyingGlass className="w-6 h-6" />
                  <input
                    autoFocus
                    value={searchText}
                    type="text"
                    placeholder="Search Post..."
                    className="w-full hover:border-none focus-within:outline-none"
                    onChange={handleSearchTextChange}
                  />
                </div>
                <div className="bg-gray-200 w-full min-h-[100px] max-h-[300px] overflow-y-auto px-4 py-2">
                  {searchText.length > 0 &&
                    blogs.map((blog) => (
                      <SearchedBlogCard key={blog.id} data={blog} />
                    ))}
                </div>
                <div className="w-full flex items-center pb-3">
                  {searchText.length > 0 && (
                    <p className="text-[0.8rem] px-4">3 results</p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
