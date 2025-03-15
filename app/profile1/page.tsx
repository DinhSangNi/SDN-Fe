export default function UserProfile() {
  return (
    <div className='max-w-sm mx-auto bg-white shadow-lg rounded-2xl p-6'>
      <div className='flex flex-col items-center'>
        <img
          src='/avatars/profile1.jpg'
          alt='User Avatar'
          className='w-24 h-24 rounded-full border-4 border-blue-500'
        />
        <h2 className='mt-4 text-xl font-semibold text-gray-800'>
          Nguyen Van A
        </h2>
        <p className='text-gray-500'>
          Học sinh lớp 12 | Trường TPHT Lê Quý Đôn
        </p>
        <p className='mt-2 text-center text-gray-600'>
          Đam mê lập trình, cờ vua và trí tuệ nhân tạo. Luôn học hỏi và phát
          triển! Rất vui được làm quen với các bạn.
        </p>
        <p className='mt-2 text-center text-gray-600'>
          Chào mừng các bạn đến với đại học FPT Quy Nhơn
        </p>
      </div>
    </div>
  );
}
