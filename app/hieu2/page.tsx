import Image from 'next/image';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { AiFillTikTok } from 'react-icons/ai';
import Link from 'next/link';
export default function StudentProfile() {
  return (
    <div className='flex flex-col items-center bg-gray-100 p-4'>
      {/* Profile Card */}
      <div className='bg-white shadow-lg rounded-2xl p-6 md:p-8 max-w-2xl w-full text-center'>
        <div className='relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4'>
          <Image
            src='/avatars/hieu2.jpg'
            alt='Student Profile'
            layout='fill'
            objectFit='cover'
            className='rounded-full border-4 border-blue-500'
          />
        </div>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
          LÊ DOÃN HIẾU
        </h1>
        <p className='text-gray-600 text-lg md:text-xl'>Đại học FPT Quy Nhơn</p>
        <p className='mt-4 text-gray-700 text-sm md:text-base'>
          Một sinh viên tò mò và có động lực, thích giải quyết vấn đề thông qua
          lập trình và toán học, luôn háo hức khám phá và đổi mới trong thế giới
          công nghệ.
        </p>

        <div className='mt-6'>
          <h2 className='text-xl md:text-2xl font-semibold text-gray-800'>
            Sở thích
          </h2>
          <p className='text-gray-600 text-sm md:text-base'>
            Lập trình, Cờ vua, Công nghệ & Trí tuệ nhân tạo, Hoạt động tình
            nguyện, Thiền định
          </p>
        </div>

        <div className='mt-6 p-4 bg-blue-100 rounded-lg'>
          <p className='text-blue-700 text-lg md:text-xl font-medium'>
            Chào mừng đến với hồ sơ của tôi! Hãy cùng học hỏi và phát triển cùng
            nhau. Rất mong được kết nối với những người có cùng chí hướng!
          </p>
        </div>
        <div className='flex items-center gap-x-4 justify-center mt-[20px]'>
          <Link href='https://www.facebook.com/doan.hieu.468525?mibextid=ZbWKwL'>
            {' '}
            <FaFacebook className='text-[1.2rem]' />
          </Link>
          <FaInstagramSquare className='text-[1.2rem]' />
          <AiFillTikTok className='text-[1.2rem]' />
        </div>
      </div>
    </div>
  );
}
