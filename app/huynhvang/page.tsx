import Image from 'next/image';

export default function StudentProfile() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full text-center'>
        <div className='relative w-40 h-40 mx-auto mb-4'>
          <Image
            src='/avatars/huynhvang.jpg'
            alt='Student Profile'
            layout='fill'
            objectFit='cover'
            className='rounded-full border-4 border-blue-500'
          />
        </div>
        <h1 className='text-2xl font-bold text-gray-800'>John Doe</h1>
        <p className='text-gray-600 text-lg'>ABC High School</p>
        <p className='mt-4 text-gray-700'>
          A passionate student who loves coding and mathematics.
        </p>
        <div className='mt-6'>
          <h2 className='text-xl font-semibold text-gray-800'>Hobbies</h2>
          <p className='text-gray-600'>Coding, Chess, Basketball</p>
        </div>
      </div>
    </div>
  );
}
