import Image from 'next/image';

const Profile = () => {
  const user = {
    name: 'Tường Vi',
    age: 20,
    avatar: '/avatars/vi-avatar.png', // Replace with your avatar image path
    bio: "Hi! I'm Lily, a 20-year-old girl learning Chinese. I love exploring new cultures and languages.",
    hobbies: ['Reading', 'Traveling', 'Cooking', 'Photography'],
    languages: ['Chinese', 'English', 'Spanish'],
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-md rounded-lg p-6 max-w-md w-full'>
        <div className='flex flex-col items-center'>
          <Image
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            width={100}
            height={100}
            className='rounded-full mb-4'
          />
          <h1 className='text-2xl font-bold'>{user.name}</h1>
          <p className='text-gray-600'>{user.age} years old</p>
          <p className='text-center text-gray-700 mt-2'>{user.bio}</p>
        </div>

        {/* Heart Icon Section */}
        <div className='flex justify-center w-full mt-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='red'
            viewBox='0 0 24 24'
            className='w-full'
          >
            <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
          </svg>
        </div>

        <div className='mt-6'>
          <h2 className='text-lg font-semibold'>Hobbies</h2>
          <ul className='list-disc list-inside text-gray-700'>
            {user.hobbies.map((hobby, index) => (
              <li key={index}>{hobby}</li>
            ))}
          </ul>
        </div>

        <div className='mt-4'>
          <h2 className='text-lg font-semibold'>Languages</h2>
          <ul className='list-disc list-inside text-gray-700'>
            {user.languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
