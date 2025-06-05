import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/custom/Navigation';
import Footer from '@/components/custom/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AISE LAB - FPT University Quy Nhon AI Campus',
  description:
    'ĐH FPT AI Quy Nhơn nằm trong dự án Tổ hợp giáo dục – Trí tuệ nhân tạo quy mô lớn của Tổ chức Giáo dục FPT. Không chỉ là nơi đào tạo chuyên sâu về trí tuệ nhân tạo AI, campus thứ 5 của FPT Edu còn là nơi để sinh viên trải nghiệm đời sống nội trú đáng nhớ.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full min-h-screen`}
      >
        {/* <Link href='https://daihoc.fpt.edu.vn/'>
          <div className='flex flex-row items-center justify-center gap-x-10 px-2'>
            <Image
              src={'/fpt-banner.png'}
              alt='FPT University'
              width={200} // Increased size
              height={100} // Increased size
            />
            <div className='flex flex-col items-center justify-center py-4'>
              <h1 className='text-xl font-bold'>AiSE LAB</h1>
              <h1 className='text-sm text-foreground md:text-lg'>
                Kỹ thuật phần mềm
              </h1>
            </div>
          </div>
        </Link>
        {children}
        <div className='flex flex-row items-center justify-center gap-x-10 py-4'>
          <div className='text-sm text-foreground'>© 2025 AiSE LAB.</div>
          <div className='flex flex-row items-center justify-center gap-x-2'>
            <Link href='https://www.facebook.com/daihocfpt'>
              <FaFacebookSquare size={30} />
            </Link>
            <Link href='https://www.youtube.com/FPTUniversityChanel'>
              <IoLogoYoutube size={30} />
            </Link>
            <Link href='https://zalo.me/daihocfpt'>
              <SiZalo size={30} />
            </Link>
            <Link href='https://www.tiktok.com/@fptuniversity'>
              <AiFillTikTok size={30} />
            </Link>
          </div>
        </div> */}
        <Navigation />
        <main className="w-full pt-[62px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
