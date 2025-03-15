export default function UserProfile() {
  return (
    <div className='max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 text-center'>
      <img
        src='/avatars/profile1.jpg'
        alt='User Avatar'
        className='w-24 h-24 rounded-full mx-auto border-4 border-indigo-500'
      />
      <h2 className='mt-4 text-2xl font-bold text-gray-900'>NGUYỄN VĂN A</h2>
      <p className='text-gray-600'>Học Lớp 12 | Trường TPHT Lê Quý Đôn</p>
      <p className='text-gray-600'>Đam mê công nghệ | Thích đi du lịch</p>
      <p className='mt-2 text-sm text-gray-500'>
        Tôi thích khám phá những công nghệ mới và chia sẻ kiến thức qua việc
        viết lách.
      </p>
      <p className='mt-2 text-sm text-gray-500'>
        Thích lập trình, cờ vua và trí tuệ nhân tạo.
      </p>
      <button className='mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600'>
        Kết nối với tôi
      </button>
    </div>
  );
}
