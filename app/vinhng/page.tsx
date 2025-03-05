import Image from 'next/image';

const Profile = () => {
  const student = {
    avatar: '/avatars/huynhvang.jpg', // Replace with your avatar image path
    name: 'John Doe',
    school: 'Springfield High School',
    class: '10th Grade',
    description: 'A passionate learner with a love for science and technology.',
    testimonials: [
      'John is a dedicated student who always strives for excellence.',
      'He has a great attitude and is always willing to help others.',
    ],
    hobbies: ['Reading', 'Coding', 'Basketball'],
    keyCharacteristics: ['Curious', 'Hardworking', 'Team Player'],
  };

  return (
    <div className='flex flex-col items-center p-6 bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-lg flex flex-col'>
        <div className='flex flex-col items-center'>
          <Image
            src={student.avatar}
            alt='Avatar'
            width={150} // Increased size
            height={150} // Increased size
            className='rounded-full mb-4 border-4 border-blue-500' // Added border
          />
          <h1 className='text-3xl font-bold text-gray-800'>{student.name}</h1>
          <p className='text-gray-600'>{student.school}</p>
          <p className='text-gray-600'>{student.class}</p>
          <p className='mt-2 text-center text-gray-700'>
            {student.description}
          </p>
        </div>

        <div className='mt-8'>
          <h2 className='text-2xl font-semibold text-gray-800'>Testimonials</h2>
          <div className='mt-4 space-y-4'>
            {student.testimonials.map((testimonial, index) => (
              <blockquote
                key={index}
                className='border-l-4 border-blue-500 pl-4 italic text-gray-600'
              >
                &quot;{testimonial}&quot;
              </blockquote>
            ))}
          </div>
        </div>

        <div className='mt-8'>
          <h2 className='text-2xl font-semibold text-gray-800'>Hobbies</h2>
          <ul className='list-disc list-inside mt-2'>
            {student.hobbies.map((hobby, index) => (
              <li key={index} className='text-gray-600'>
                {hobby}
              </li>
            ))}
          </ul>
        </div>

        <div className='mt-8'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            Key Characteristics
          </h2>
          <ul className='list-disc list-inside mt-2'>
            {student.keyCharacteristics.map((characteristic, index) => (
              <li key={index} className='text-gray-600'>
                {characteristic}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
