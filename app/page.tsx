// 'use client';

// import Image from 'next/image';
// import imageBackground from '@/public/images/IMG_0243.png';
// import PostList from '@/components/custom/PostList';

// export default function HomePage() {
//   return (
//     <>
//       <div className="w-full">
//         <div className="w-full relative">
//           <Image
//             width={400}
//             height={400}
//             src={imageBackground}
//             alt="background"
//             className="w-screen max-h-screen object-cover"
//           />
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 text-[#d4d4d8] text-center">
//             <h1 className="text-[2.6rem] font-bold">AiSE LAB</h1>
//             <p className="text-[1rem] text-white">
//               Official website of AiSE Lab
//             </p>
//             <p className="text-[1rem] text-white">
//               At FPT University, Quy Nhon AI Campus
//             </p>
//           </div>
//         </div>

//         {/* Annoucement List */}
//         <div className="md:w-[80%] w-[90%] mx-auto">
//           <h1 className="font-bold text-[1.5rem] text-center my-6">
//             Announcement
//           </h1>
//           <div className="w-full">
//             <PostList type="announcement" />
//           </div>
//         </div>

//         {/* Blog List */}
//         <div className="w-[90%] md:w-[80%] mx-auto">
//           <h1 className="font-bold text-[1.5rem] text-center my-6">Blog</h1>
//           <div className="w-full">
//             <PostList type="post" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import imageBackground1 from '@/public/images/IMG_0243.png';
import imageBackground2 from '../public/images/IMG_0436.png';
import PostList from '@/components/custom/PostList';
import { CustomCarousel } from '@/components/custom/CustomCarousel';

const carouselItems = [
  {
    url: imageBackground1,
  },
  {
    url: imageBackground2,
  },
];

const missionCards = [
  {
    title: 'Advance AI Research',
    description:
      'Conduct cutting-edge research in AI and Software Engineering to push technological boundaries.',
    icon: '🧠',
  },
  {
    title: 'Educate Future Leaders',
    description:
      'Provide top-tier education and hands-on training in AI and SE at FPT University.',
    icon: '🎓',
  },
  {
    title: 'Industry Collaboration',
    description:
      'Partner with industries to apply AI solutions to real-world problems.',
    icon: '🤝',
  },
  {
    title: 'Community Engagement',
    description:
      'Promote AI literacy and ethical practices within the community.',
    icon: '🌐',
  },
];

export default function HomePage() {
  return (
    <div className="w-full bg-gray-100">
      {/* Hero Section with Background Image */}
      <div className="w-full h-[calc(100vh-62px)] relative">
        <CustomCarousel
          className="w-[100vw] h-[calc(100vh-62px)]"
          autoPlay
          delay={3000}
          items={carouselItems.map((item) => (
            <Image
              width={1000}
              height={1000}
              src={item.url}
              alt="hero-background"
              className="w-full h-full object-cover"
            />
          ))}
        />
        <motion.div
          initial={{ opacity: 0, y: '50%', x: '-50%' }}
          animate={{ opacity: 1, y: '-50%', x: '-50%' }}
          transition={{ duration: 1 }}
          className="absolute w-fit top-1/2 left-1/2"
        >
          <div className=" text-center text-gray-200">
            <h1 className="text-[2rem] md:text-[3rem] font-bold drop-shadow-lg">
              AISE Lab
            </h1>
            <p className="text-[1rem] md:text-[1.2rem] mt-2">
              Official Website of AiSE Lab
            </p>
            <p className="text-[1rem] md:text-[1.2rem]">
              At FPT University, Quy Nhon AI Campus
            </p>
          </div>
        </motion.div>
      </div>

      {/* Mission Cards Section */}
      <div className="w-[90%] md:w-[80%] mx-auto my-12">
        <h1 className="font-bold text-[2rem] text-center mb-8">Our Mission</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {missionCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
            >
              <span className="text-4xl mb-4">{card.icon}</span>
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-600">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Announcement List */}
      <div className="w-[90%] md:w-[80%] mx-auto my-12">
        <h1 className="font-bold text-[2rem] text-center mb-8">
          Announcements
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <PostList type="announcement" />
        </motion.div>
      </div>

      {/* Blog List */}
      <div className="w-[90%] md:w-[80%] mx-auto">
        <h1 className="font-bold text-[2rem] text-center mb-8">Blog</h1>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <PostList type="post" />
        </motion.div>
      </div>
    </div>
  );
}
