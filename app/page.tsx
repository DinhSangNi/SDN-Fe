'use client';

import Image from 'next/image';
import imageBackground from '@/public/images/IMG_0243.png';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PostList from '@/components/custom/PostList';

export default function HomePage() {
  const user = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  return (
    <>
      <div className="w-full">
        <div className="w-full relative">
          <Image
            width={400}
            height={400}
            src={imageBackground}
            alt="background"
            className="w-screen max-h-screen object-cover"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 text-[#d4d4d8] text-center">
            <h1 className="text-[2.6rem] font-bold">AiSE LAB</h1>
            <p className="text-[1rem] text-white">
              Official website of AiSE Lab
            </p>
            <p className="text-[1rem] text-white">
              At FPT University, Quy Nhon AI Campus
            </p>
            {user?.role !== 'student' && (
              <Link href="/book-lab">
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition">
                  📅 Đặt lịch sử dụng phòng lab
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Annoucement List */}
        <div className="md:w-[80%] w-[90%] mx-auto">
          <h1 className="font-bold text-[1.5rem] text-center my-6">
            Announcement
          </h1>
          <div className="w-full">
            <PostList type="announcement" />
          </div>
        </div>

        {/* Blog List */}
        <div className="w-[90%] md:w-[80%] mx-auto">
          <h1 className="font-bold text-[1.5rem] text-center my-6">Blog</h1>
          <div className="w-full">
            <PostList type="post" />
          </div>
        </div>
      </div>
    </>
  );
}
