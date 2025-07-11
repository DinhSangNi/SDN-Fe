import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/custom/Navigation';
import Footer from '@/components/custom/Footer';
import { ReduxProvider } from './ReduxProvider';
import { ReactQueryProvider } from './ReactQueryProvider';
import AuthLoader from './AuthLoader ';
import { Toaster } from 'react-hot-toast';
import { TooltipProvider } from '@/components/ui/tooltip';

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
        <ReactQueryProvider>
          <ReduxProvider>
            <AuthLoader />
            <Toaster position="top-right" />
            <TooltipProvider>
              <Navigation />
              <main className="w-full min-h-screen pt-[62px]">{children}</main>
              <Footer />
            </TooltipProvider>
          </ReduxProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
