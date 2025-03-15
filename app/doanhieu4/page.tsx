/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FaInstagramSquare, FaFacebook } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";

export default function ProfileCard() {
    const info = {
        avatar: '/avatars/doanhieu.jpg',
        name: 'Lê Doãn Hiếu',
        position: 'Frontend Developer',
        bio: 'Tôi là một lập trình viên frontend với đam mê tạo ra những giao diện người dùng trực quan và mượt mà. Tôi luôn tìm kiếm cơ hội học hỏi và cải thiện kỹ năng của mình.',
        contact: {
            email: 'ledoanhieu@example.com',
            phone: '0123 456 789',
            address: '02 Nguyễn Huệ',
        },
        socialLinks: {
            facebook: 'https://www.facebook.com/doan.hieu.468525?mibextid=ZbWKwL',
            instagram: '#',
            tiktok: '#',
        },
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-4">
            <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-sm w-full transform hover:scale-105 transition-transform duration-300">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-28"></div>
                {/* Avatar */}
                <div className="relative -mt-16 flex justify-center">
                    <img src={info.avatar} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-white shadow-lg" />
                </div>
                {/* Thông tin cơ bản */}
                <div className="text-center p-6">
                    <h1 className="text-2xl font-bold text-gray-800">{info.name}</h1>
                    <p className="text-purple-500 text-sm mt-1">{info.position}</p>
                    <p className="text-gray-600 mt-4 text-sm leading-relaxed">{info.bio}</p>
                </div>
                {/* Liên hệ */}
                <div className="bg-gray-100 px-6 py-4 rounded-lg mx-4 shadow-inner">
                    <h3 className="text-gray-700 font-bold mb-2 text-center">Liên hệ</h3>
                    <p className="text-sm text-gray-600">📧 {info.contact.email}</p>
                    <p className="text-sm text-gray-600">📞 {info.contact.phone}</p>
                    <p className="text-sm text-gray-600">📍 {info.contact.address}</p>
                </div>
                {/* Mạng xã hội */}
                <div className="flex justify-center gap-6 text-2xl text-gray-600 py-6">
                    <Link href={info.socialLinks.facebook}><FaFacebook className="hover:text-blue-600 transition-colors" /></Link>
                    <Link href={info.socialLinks.instagram}><FaInstagramSquare className="hover:text-pink-500 transition-colors" /></Link>
                    <Link href={info.socialLinks.tiktok}><AiFillTikTok className="hover:text-black transition-colors" /></Link>
                </div>
            </div>
        </div>
    );
}