import FPTLogo from '@/public/fpt-banner.png';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillTikTok } from 'react-icons/ai';
import { FaFacebookSquare } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
import { SiZalo } from 'react-icons/si';

const Footer = () => {
  return (
    <>
      <div className="w-full py-10 bg-gray-300 text-gray-600">
        <div className="w-[80%] mx-auto">
          <div className="flex items-center">
            <div className="flex basis-1/4 gap-4 items-center">
              <div className="text-center cursor-pointer">
                <h1 className="text-[0.9rem] font-bold">AiSE LAB</h1>
                <h1 className="text-[0.7rem] text-foreground">
                  Software Engineering
                </h1>
              </div>
              <Image
                width={800}
                height={800}
                src={FPTLogo}
                alt="FPT_logo"
                className="w-[150px]"
              />
            </div>
            <div className="flex basis-2/4 gap-6 text-[0.9rem] justify-center">
              <button className="hover:opacity-60 transition-opacity duration-200">
                Home
              </button>
              <button className="hover:opacity-60 transition-opacity duration-200">
                About
              </button>
              <button className="hover:opacity-60 transition-opacity duration-200">
                Privacy Policy
              </button>
            </div>
            <div className="flex basis-1/4 flex-row items-center justify-end gap-x-10 py-4">
              <div className="flex flex-row items-center justify-center gap-x-2">
                <Link href="https://www.facebook.com/daihocfpt">
                  <FaFacebookSquare size={30} />
                </Link>
                <Link href="https://www.youtube.com/FPTUniversityChanel">
                  <IoLogoYoutube size={30} />
                </Link>
                <Link href="https://zalo.me/daihocfpt">
                  <SiZalo size={30} />
                </Link>
                <Link href="https://www.tiktok.com/@fptuniversity">
                  <AiFillTikTok size={30} />
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-between text-[0.9rem] mt-6">
            <div className="">
              <p>
                Address: An Phu Thinh Urban Area, Nhon Binh Ward, Quy Nhon City
              </p>
              <p>Email: ohmlab-fpthcm@gmail.com</p>
            </div>
            <div className="text-sm">© 2025 AiSE LAB.</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
