'use client';

import React, { useState } from 'react';
import NavigationButton from './NavigationButton/NavigationButton';
import Link from 'next/link';
import Bars3Icon from '@/public/icons/Bars3Icon';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserRound, LayoutDashboard, LogOut } from 'lucide-react';
import SearchModal from './SearchModal';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/services/auth.service';
import { logout as logoutAction } from '@/store/slices/authSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Navigation = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res.status === 200) {
        dispatch(logoutAction());
        toast.success('Logout successfully', {
          position: 'top-center',
        });
        router.push('/login');
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <>
      <div className="w-screen h-[62px] py-2 shadow-md z-50 bg-white fixed">
        <div className="md:w-[80%] w-[95%] h-full mx-auto flex justify-between item-center">
          <div className="basis-1/4 flex justify-start">
            <div
              className="justify-center cursor-pointer flex flex-col items-center"
              onClick={() => router.push(`/`)}
            >
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
            <NavigationButton>
              <Link href={'/lab/calendar'}>Booking</Link>
            </NavigationButton>
            <NavigationButton>
              <Link href={'/game/'}>Game</Link>
            </NavigationButton>
          </div>
          <div className="md:flex hidden basis-1/4 flex-1 items-center justify-end gap-2">
            <SearchModal />
            {user.id ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-full">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserRound />
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex flex-col">
                    <h1 className="text-[1.1rem] font-bold">{user.fullName}</h1>
                    <p className="text-center">{user.email}</p>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  {user.role === 'admin' && (
                    <DropdownMenuItem
                      onClick={() => router.push('/admin/post')}
                    >
                      <LayoutDashboard />
                      Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button color="white" variant="ghost">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button>
                  <Link href="/login">Sign Up</Link>
                </Button>
              </>
            )}
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
                      onClick={handleCloseMenu}
                      className="py-4 px-6 hover:bg-gray-300 text-center"
                    >
                      Home
                    </Link>
                    <Link
                      href="/about"
                      onClick={handleCloseMenu}
                      className="py-4 px-6 hover:bg-gray-300 text-center"
                    >
                      About
                    </Link>
                    <Link
                      href={`/lab/calendar`}
                      onClick={handleCloseMenu}
                      className="py-4 px-6 hover:bg-gray-300 text-center"
                    >
                      Booking
                    </Link>
                    <Link
                      href={`/game`}
                      onClick={handleCloseMenu}
                      className="py-4 px-6 hover:bg-gray-300 text-center"
                    >
                      Game
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
