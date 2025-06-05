import Image from 'next/image';
import imageBackground from '@/public/images/IMG_0243.png';
import blogImage from '@/public/images/IMG_0400.png';
import BlogCard, { BlogType } from '@/components/custom/BlogCard';

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

const activities = [
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
    categories: ['Activity'],
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
    categories: ['Activity'],
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
    categories: ['Activity'],
  },
];

export default function HomePage() {
  return (
    <>
      <div className="w-full">
        {/* <CarouselPlugin></CarouselPlugin> */}
        <div className="w-full relative">
          <Image
            width={800}
            height={800}
            src={imageBackground}
            alt="background"
            className="w-full max-h-screen object-cover"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 text-[#d4d4d8] text-center">
            <h1 className="text-[2.6rem] font-bold">AiSE LAB</h1>
            <p className="text-[1rem] text-white">
              Official website of Ohm Lab
            </p>
            <p className="text-[1rem] text-white">
              At FPT University Ho Chi Minh City
            </p>
          </div>
        </div>

        {/* Blogs List */}
        <div className="w-[80%] mx-auto">
          <h1 className="font-bold text-[1.5rem] text-center my-6">Blog</h1>
          <div className="w-full flex gap-4">
            {blogs.map((blog) => (
              <div key={blog.id}>
                <BlogCard data={blog} />
              </div>
            ))}
          </div>
          <div className="flex justify-center py-8">
            <button className="py-1 px-2 border-[1px] text-[0.8rem] font-bold rounded-sm border-black hover:text-white hover:bg-black transition-colors duration-150">
              Read More
            </button>
          </div>
        </div>

        {/* Activity List */}
        <div className="w-[80%] mx-auto">
          <h1 className="font-bold text-[1.5rem] text-center my-6">Activity</h1>
          <div className="w-full flex gap-4">
            {activities.map((act) => (
              <div key={act.id}>
                <BlogCard type={BlogType.ACTIVITY} data={act} />
              </div>
            ))}
          </div>
          <div className="flex justify-center py-8">
            <button className="py-1 px-2 border-[1px] text-[0.8rem] font-bold rounded-sm border-black hover:text-white hover:bg-black transition-colors duration-150">
              Read More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
