/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";

export default function Profile() {
  const informations = [
    {
      avatar: '/avatars/ngocvi.jpg',
      position: `I'm a Fontend Developer`,
      description: `A Frontend Developer is responsible for building the user interface and user experience of web or mobile applications.
                        Their work involves designing and developing visual and interactive components, ensuring aesthetics, performance optimization, and cross-device compatibility.
                        A skilled Frontend Developer should have a solid understanding of technologies like HTML, CSS, JavaScript, and popular libraries
                        or frameworks such as React, Angular, or Vue.js. Additionally, they collaborate closely with Backend Developers and UX/UI Designers
                        to deliver polished, intuitive, and user-friendly products.`,
      name: 'Nguyen Trinh Ngoc Vy',
      age: 18,
      address: 'Tuy Phuoc'
    }
  ]
  return (
    <>
      <div className="flex justify-center items-center py-[4rem] px-[2rem] md:px-[14rem]">
        <div className="bg-white shadow-2xl p-5 rounded-lg md:pb-[5rem]">
          {informations.map((items, index) => (
            <div className="flex flex-col " key={index}>
              <h1 className="text-[4rem] font-bold text-center">Hello!</h1>
              <span className="text-center mb-[2rem] md:mb-[4rem]">{items.position}</span>
              <div className="flex flex-col gap-y-4 text-[0.9rem] gap-x-5 md:flex-row ">
                <div className="w-full">
                  <img src={items.avatar} alt="" className="rounded-lg hover:scale-105 duration-500 transition-transform w-full" />
                </div>
                <div className="w-full">
                  <h2 className="text-[1.2rem] font-bold mb-4">About me</h2>
                  <p>{items.description}</p>
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <h2 className="text-[1.2rem] font-bold my-4">Detail</h2>
                  <span className="font-bold">Name:</span>
                  <span>{items.name}</span>
                  <span className="font-bold">Age:</span>
                  <span>{items.age} year</span>
                  <span className="font-bold">Location:</span>
                  <span>{items.address}</span>
                  <div className='flex items-center gap-x-4 mt-4'>
                    <Link href='https://www.facebook.com/doan.hieu.468525?mibextid=ZbWKwL'> <FaFacebook className='text-[1.2rem]' /></Link>
                    <FaInstagramSquare className='text-[1.2rem]' />
                    <AiFillTikTok className='text-[1.2rem]' />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}