import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import Link from 'next/link';

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
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col items-center justify-center min-h-screen`}
      >
        <Link href='https://daihoc.fpt.edu.vn/'>
          <div className='flex flex-row items-center justify-center gap-x-10 h-30'>
            <Image
              src={'/fpt-banner.png'}
              alt='FPT University'
              width={200} // Increased size
              height={100} // Increased size
            />

            <h1 className='text-xl font-bold'>AISE LAB</h1>
          </div>
        </Link>
        {children}
        <div className='flex flex-row items-center justify-center gap-x-10 h-30'>
          <div className='text-sm text-foreground'>© 2025 AISE LAB.</div>
          <div className='flex flex-row items-center justify-center gap-x-4'></div>
        </div>
      </body>
    </html>
  );
}
