import UserIcon from '@/public/icons/UserIcon';
import { Post } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  data: Post;
};

const PostCard = ({ data }: Props) => {
  const router = useRouter();
  return (
    <>
      <div
        className="w-full hover:opacity-80 transition-opacity duration-200 cursor-pointer"
        onClick={() => router.push(`/post/${data._id}`)}
      >
        <div className="w-full">
          <Image
            width={800}
            height={800}
            src={data.coverImage}
            alt="blog_card"
            className="w-full aspect-square md:h-[250px] rounded-sm"
          />
        </div>

        <div>
          {/* Title */}
          <h1 className="text-[1.2rem] py-4 font-bold">
            <p className="line-clamp-2">{data.title}</p>
          </h1>

          <div className="flex gap-4 items-center text-[0.8rem] mb-4">
            <div className="flex gap-2 items-center">
              {data?.createdBy?.avatar ? (
                <Image
                  width={800}
                  height={800}
                  src={data?.createdBy?.avatar || ''}
                  alt="author_avartar"
                  className="h-6 w-6 rounded-full"
                />
              ) : (
                <div className="w-4 h-4 flex justify-center items-center bg-gray-700 rounded-full">
                  <UserIcon className="w-3 h-3 text-white" />
                </div>
              )}
              <p>{data?.createdBy?.fullName}</p>
            </div>
            {/* <div className="flex gap-2 items-center">
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
            </div> */}
          </div>

          {/* Description */}
          <div
            dangerouslySetInnerHTML={{ __html: data.content }}
            className="line-clamp-4"
          ></div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
