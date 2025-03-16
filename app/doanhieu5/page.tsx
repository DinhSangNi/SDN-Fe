/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";

export default function Profile() {
    const informations = [
        {
            avatar: '/avatars/doanhieu.jpg',
            position: `I'm a Frontend Developer`,
            description: `A Frontend Developer is responsible for building the user interface and user experience of web or mobile applications.
                        Their work involves designing and developing visual and interactive components, ensuring aesthetics, performance optimization, and cross-device compatibility.
                        A skilled Frontend Developer should have a solid understanding of technologies like HTML, CSS, JavaScript, and popular libraries
                        or frameworks such as React, Angular, or Vue.js. Additionally, they collaborate closely with Backend Developers and UX/UI Designers
                        to deliver polished, intuitive, and user-friendly products.`,
            name: 'Le Doan Hieu',
            age: 21,
            address: '02 Nguyen Hue'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl shadow-xl max-w-4xl w-full overflow-hidden transform hover:scale-105 transition-transform duration-500">
                {/* Background Decorative Element */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-3xl"></div>

                {/* Main Content */}
                <div className="relative z-10 pt-20 px-6 pb-10">
                    {/* Avatar */}
                    <div className="flex justify-center mb-6">
                        <img
                            src={informations[0].avatar}
                            alt="Avatar"
                            className="w-32 h-32 rounded-full border-4 border-white shadow-lg transform hover:scale-110 transition-transform duration-300"
                        />
                    </div>

                    {/* Greeting and Position */}
                    <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-2">Hello!</h1>
                    <p className="text-center text-lg text-indigo-600 font-medium mb-8">{informations[0].position}</p>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* About Me Section */}
                        <div className="bg-gray-50 p-6 rounded-xl shadow-md">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Me</h2>
                            <p className="text-gray-600 text-sm leading-relaxed">{informations[0].description}</p>
                        </div>

                        {/* Details Section */}
                        <div className="bg-gray-50 p-6 rounded-xl shadow-md">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Details</h2>
                            <div className="space-y-3 text-gray-700">
                                <p><span className="font-bold">Name:</span> {informations[0].name}</p>
                                <p><span className="font-bold">Age:</span> {informations[0].age} years</p>
                                <p><span className="font-bold">Location:</span> {informations[0].address}</p>
                            </div>
                            {/* Social Icons */}
                            <div className="flex gap-4 mt-6">
                                <Link href="https://www.facebook.com/doan.hieu.468525?mibextid=ZbWKwL" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                                    <FaFacebook className="text-2xl" />
                                </Link>
                                <FaInstagramSquare className="text-2xl text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer" />
                                <AiFillTikTok className="text-2xl text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}