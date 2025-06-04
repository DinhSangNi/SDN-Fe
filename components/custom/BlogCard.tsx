import UserIcon from '@/public/icons/UserIcon';
import { FolderIcon } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';

export enum BlogType {
  ACTIVITY = 'activity',
}

type Props = {
  type?: BlogType;
  data: {
    id: string;
    title: string;
    description: string;
    image: StaticImageData;
    author: {
      avartar: string;
      name: string;
    };
    categories: string[];
  };
};

const BlogCard = ({ type, data }: Props) => {
  return (
    <>
      <div className="w-full  hover:opacity-80 transition-opacity duration-200 cursor-pointer">
        <div className="w-full">
          <Image
            width={800}
            height={800}
            src={data.image}
            alt="blog_card"
            className="w-full h-[250px] rounded-sm"
          />
        </div>

        <div>
          {/* Title */}
          <h1 className="text-[1.2rem] py-4 font-bold">{data.title}</h1>

          <div className="flex gap-4 items-center text-[0.8rem] mb-4">
            <div className="flex gap-2 items-center">
              {data.author.avartar.length ? (
                <Image
                  width={800}
                  height={800}
                  src={data.author.avartar}
                  alt="author_avartar"
                  className="h-6 w-6 rounded-full"
                />
              ) : (
                <div className="w-4 h-4 flex justify-center items-center bg-gray-700 rounded-full">
                  <UserIcon className="w-3 h-3 text-white" />
                </div>
              )}
              <p>{data.author.name}</p>
            </div>
            <div className="flex gap-2 items-center">
              <FolderIcon className="w-4 h-4 text-black" />
              {type === BlogType.ACTIVITY ? (
                <p>{type}</p>
              ) : (
                data.categories.map((cate, index) => (
                  <p
                    className="mr-1"
                    key={cate}
                  >{`${cate}${index === 0 ? ', ' : ''}`}</p>
                ))
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <p>{data.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
