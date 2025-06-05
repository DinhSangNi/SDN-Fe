'use client';

import MagnifyingGlass from '@/public/icons/MagnifyingGlassIcon';
import React, { ChangeEvent, useEffect, useState } from 'react';
import NavigationButton from './NavigationButton/NavigationButton';
import blogImage from '@/public/images/IMG_0400.png';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SearchedBlogCard from './SearchedBlogCard';
import Link from 'next/link';
import Bars3Icon from '@/public/icons/Bars3Icon';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

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
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  useEffect(() => {}, [searchText]);

  return (
    <>
      <div className="w-screen h-[62px] py-2 shadow-md z-50 bg-white fixed">
        <div className="md:w-[80%] w-[95%] h-full mx-auto flex justify-between item-center">
          <div className="basis-1/4 flex justify-start">
            <div className="justify-center cursor-pointer flex items-center">
              <h1 className="text-[1rem] font-bold">AiSE LAB</h1>
              <h1 className="hidden md:block text-[0.8rem] text-foreground">
                Software Engineering
              </h1>
            </div>
          </div>
          {/* Desktop + Tablet */}
          <div className="md:flex md:basis-2/4 hidden md:gap-8 gap-2 text-[0.9rem] font-bold justify-center">
            <NavigationButton>
              <Link href={'/'}>Home</Link>
            </NavigationButton>
            <NavigationButton>About</NavigationButton>
            <NavigationButton>Activity</NavigationButton>
            <NavigationButton>Blog</NavigationButton>
          </div>
          <div className="md:flex hidden basis-1/4 flex-1 items-center justify-end">
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
          {/* Mobile */}
          <div className="md:hidden flex items-center">
            <button className=" hover:opacity-60" onClick={handleOpenMenu}>
              <Bars3Icon className="w-6 h-6" />
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
              {openMenu && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '40%', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-[40%] shadow-lg flex flex-col fixed z-40 h-full right-0 bottom-0 bg-gray-100"
                >
                  <div className="flex justify-end p-6">
                    <button
                      className="hover:opacity-60"
                      onClick={handleCloseMenu}
                    >
                      <X className="w-6 h-6 text-gray-500" />
                    </button>
                  </div>
                  <div className="flex flex-col font-bold">
                    <Link
                      href="/"
                      className="py-4 px-6 hover:bg-gray-300 text-center"
                    >
                      Home
                    </Link>
                    <Link
                      href="/about"
                      className="py-4 px-6 hover:bg-gray-300 text-center"
                    >
                      About
                    </Link>
                    <Link
                      href="/activity"
                      className="py-4 px-6 hover:bg-gray-300 text-center"
                    >
                      Activity
                    </Link>
                    <Link
                      href="blog"
                      className="py-4 px-6 hover:bg-gray-300 text-center"
                    >
                      Blog
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
