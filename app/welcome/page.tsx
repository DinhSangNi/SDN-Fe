import Image from 'next/image';
const HomePage = async () => {
  return (
    <section className=''>
      <h3 className='font-bold mt-8 text-2xl mb-4'>
        Các chuyên gia của chúng tôi
      </h3>

      <div className='flex flex-col items-center md:flex-row mt-2'>
        <article className='group relative'>
          <div className='relative h-[500px] mb-2 overflow-hidden rounded-md'>
            <Image
              src={'/avatars/huynhvang.jpg'}
              fill
              sizes='(max-width: 768px) 100vw, 50vw'
              alt={'Huynh Vang'}
              className='rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500'
            />
          </div>
          <div className='flex justify-between items-center'>
            <h3 className='text-sm font-semibold mt-1 px-2'>{'Huỳnh Vang'}</h3>
          </div>
          <p className='text-sm mt-1 font-semibold px-2'>{'Giảng viên IT'}</p>
          <div className='flex justify-between items-center mt-1 mb-2 px-2'>
            <p className='text-sm mt-1'>
              <span className='text-muted-foreground px-2'>
                {'Giúp đỡ các bạn sinh viên hoàn thành các công việc code'}{' '}
              </span>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default HomePage;
