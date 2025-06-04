import { FolderIcon } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

type Props = {
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

const SearchedBlogCard = ({ data }: Props) => {
  return (
    <>
      <div className="flex gap-3 justify-center p-3 bg-white mb-2 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer">
        <Image
          width={800}
          height={800}
          src={data.image}
          alt="blog-image"
          className="w-24 h-24"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-[1rem] font-bold">{data.title}</h1>
          <p className="text-[0.8rem] line-clamp-2">{data.description}</p>
          <div className="flex gap-2 items-center text-[0.8rem] text-gray-400">
            <FolderIcon className="w-4 h-4 text-inherit" />
            {data.categories.map((cate, index) => (
              <p
                className="mr-1"
                key={cate}
              >{`${cate}${index === 0 ? ', ' : ''}`}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchedBlogCard;
