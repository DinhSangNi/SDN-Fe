/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";

export default function Profile() {
  const informations = [
    {
      avatar: '/avatars/xuanhien.jpg',
      position: `I'm a .Net Developer`,
      description: `A .NET Developer is a software developer who works with Microsoft’s .NET platform. They are responsible for designing, building, 
                    and maintaining applications that run on the .NET environment, covering web applications, desktop software, and backend services. 
                    Their work typically involves programming languages such as C#, VB.NET, and F#, along with technologies like ASP.NET, Entity Framework, and Azure. 
                    A skilled .NET Developer is not only proficient in technical aspects but also capable of analyzing requirements, solving problems, and collaborating 
                    effectively to deliver high-quality software solutions.`,
      name: 'Bui Xuan Hien',
      age: 21,
      address: '02 Ghenh Rang'
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
                  <img src={items.avatar} alt="" className="rounded-lg hover:scale-105 duration-500 transition-transform w-full h-full" />
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
                    <Link href='https://www.facebook.com/xuan.hien.430327'> <FaFacebook className='text-[1.2rem]' /></Link>
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