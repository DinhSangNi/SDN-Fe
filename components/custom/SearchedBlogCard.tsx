import { Post } from '@/types';
import { FolderIcon } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  data: Post;
  onClick?: () => void;
};

const SearchedBlogCard = ({ data, onClick }: Props) => {
  const router = useRouter();
  return (
    <>
      <div
        className="flex gap-3 justify-center p-3 bg-white mb-2 hover:bg-gray-300  transition-colors duration-200 cursor-pointer"
        onClick={onClick}
      >
        <Image
          width={1000}
          height={1000}
          src={data.coverImage}
          alt="blog-image"
          className="w-24 aspect-square object-cover"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-[1rem] font-bold line-clamp-2">{data.title}</h1>
          <div
            className="text-[0.8rem] line-clamp-2"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default SearchedBlogCard;
