import Image from 'next/image';

export default function StudentProfile() {
  return (
    <div className='flex flex-col items-center bg-gray-100 p-4'>
      {/* Profile Card */}
      <div className='bg-white shadow-lg rounded-2xl p-6 md:p-8 max-w-2xl w-full text-center'>
        <div className='relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4'>
          <Image
            src='/avatars/trieu.JPG'
            alt='Student Profile'
            layout='fill'
            objectFit='cover'
            className='rounded-full border-4 border-blue-500'
          />
        </div>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
          Chi Trieu
        </h1>
        <p className='text-gray-600 text-lg md:text-xl'>ABC High School</p>
        <p className='mt-4 text-gray-700 text-sm md:text-base'>
          A passionate student who loves coding and mathematics. Always eager to
          learn new things and explore the world of technology.
        </p>

        <div className='mt-6'>
          <h2 className='text-xl md:text-2xl font-semibold text-gray-800'>
            Hobbies
          </h2>
          <p className='text-gray-600 text-sm md:text-base'>
            Coding, Chess, Basketball, Reading Sci-Fi Novels
          </p>
        </div>

        <div className='mt-6 p-4 bg-blue-100 rounded-lg'>
          <p className='text-blue-700 text-lg md:text-xl font-medium'>
            Welcome to my profile! Let learn and grow together. Excited to
            connect with like-minded individuals! Welcome to my profile! Let
            learn and grow together. Excited to connect with like-minded
            individuals!
          </p>
        </div>
      </div>
    </div>
  );
}
