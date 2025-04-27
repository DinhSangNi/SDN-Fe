/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { FaInstagramSquare, FaFacebook } from 'react-icons/fa';
import { AiFillTikTok } from 'react-icons/ai';

export default function SimpleProfile() {
  const info = {
    avatar: '/images/avt.jpg',
    position: 'Khôi đang học lập trình ',
    description: 'Coder .',
    name: 'Tôn Hoàng Khôi',
    age: 18,
    address: 'Quảng Ngãi',
    email: 'tonhoangkhoi14032007@gmail.com',
    phone: '0775596894',
    hobbies: ['Lập trình', 'Chụp Ảnh', 'Du lịch'],
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 p-4'>
      <div className='bg-white shadow-2xl rounded-2xl overflow-hidden max-w-lg w-full p-8 space-y-6'>
        {/* Avatar và tên */}
        <div className='text-center'>
          <img
            src={info.avatar}
            alt='Ảnh đại diện'
            className='w-32 h-32 mx-auto rounded-full border-4 border-blue-200 hover:scale-110 transition-transform duration-300'
          />
          <h1 className='text-3xl font-bold mt-4 text-blue-800'>{info.name}</h1>
          <span className='text-blue-600 block mt-1'>{info.position}</span>
        </div>
        {/* Mô tả */}
        <p className='text-gray-700 text-sm text-center leading-relaxed'>
          {info.description}
        </p>
        {/* Thông tin chi tiết */}
        <div className='grid grid-cols-2 gap-4 text-sm text-gray-700'>
          <div>
            <strong>Tuổi:</strong> {info.age} tuổi
          </div>
          <div>
            <strong>Địa chỉ:</strong> {info.address}
          </div>
          <div>
            <strong>Email:</strong> {info.email}
          </div>
          <div>
            <strong>Điện thoại:</strong> {info.phone}
          </div>
        </div>
        {/* Sở thích */}
        <div className='text-sm text-gray-700'>
          <h3 className='font-bold mb-2 text-blue-800'>Sở thích:</h3>
          <div className='flex flex-wrap gap-2 justify-center'>
            {info.hobbies.map((hobby, index) => (
              <span
                key={index}
                className='bg-blue-200 text-blue-800 px-3 py-1 rounded-lg text-xs'
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>
        {/* Mạng xã hội */}
        <div className='flex justify-center gap-6 text-2xl text-gray-700'>
          <Link href='https://www.facebook.com/doan.hieu.468525?mibextid=ZbWKwL'>
            <FaFacebook className='hover:text-blue-600 transition-colors' />
          </Link>
          <FaInstagramSquare className='hover:text-pink-500 transition-colors' />
          <AiFillTikTok className='hover:text-black transition-colors' />
        </div>
      </div>
    </div>
  );
}
