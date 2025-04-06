/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";

export default function Profile() {
    const informations = [
        {
            avatar: '/avatars/thanhdanh.jpg',
            position: `Học sinh trung học phổ thông`,
            description: `Tôi là một học sinh trung học phổ thông, đang trong giai đoạn quan trọng để phát triển bản thân và 
            định hướng tương lai. Với tinh thần ham học hỏi và luôn cố gắng không ngừng, tôi không chỉ nỗ lực trong việc học 
            tập các môn văn hóa mà còn tích cực tham gia các hoạt động ngoại khóa, câu lạc bộ và các cuộc thi do trường tổ chức. 
            Tôi đặc biệt yêu thích các môn học như Toán, Tin học và Tiếng Anh, bởi chúng giúp tôi rèn luyện tư duy logic, 
            khả năng sáng tạo và giao tiếp toàn cầu. Ngoài giờ học, tôi dành thời gian để khám phá công nghệ, đọc sách, học thêm
            kỹ năng mềm và phát triển các sở thích cá nhân như thiết kế, viết lách hoặc chơi thể thao. Tôi tin rằng bản thân đang 
            từng bước hoàn thiện để trở thành một người học sinh toàn diện, có trách nhiệm, biết quan tâm đến cộng đồng và sẵn 
            sàng học hỏi để chuẩn bị tốt nhất cho hành trình học tập và nghề nghiệp trong tương lai.`,
            name: 'Thanh Danh',
            age: 18,
            address: 'An Nhon'
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