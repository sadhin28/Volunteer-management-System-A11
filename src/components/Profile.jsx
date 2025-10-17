import { AuthContext } from "@/Provider/AuthProvider";
import { useContext } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user, open, setOpen } = useContext(AuthContext)

    return (
        <div className="py-2">
            <div className="w-24 hover:text-green-500 text-white relative top-10 left-10 font-bold  ">
                <Link className="flex  items-center gap-1 " to='/'>
                    <FaArrowAltCircleLeft />
                    <h1>back</h1>
                </Link>
            </div>
            <div className=" rounded-br-[80px]  rounded-tl-[80px] bg-gradient-to-l from-[#063F33FF] to-[#032018FF] to-[#470A8DFF] pb-7  text-white h-60 flex items-center justify-center">

                <div className="text-center">

                    <h1 className="md:text-4xl text-xl font-bold">Welcome, {user?.
                        displayName
                    }!</h1>
                    <p className="mt-2 md:text-lg text-xl">We&apos;re glad to have you back!</p>
                </div>
                {/* <div className="absolute bottom-0 left-0 w-full  bg-white "></div> */}
            </div>


            <div className="container mx-auto mt-8">
                <div className="max-w-md mx-auto border-4 border-[#2C3D4D] shadow-md hover:shadow-lg rounded-lg overflow-hidden">
                    <div className="flex justify-center items-center p-6">
                        <img
                            onClick={() => setOpen(true)}
                            src={user?.photoURL}
                            alt={`${user?.displayName}'s profile`}
                            className="cursor-pointer w-24 h-24 rounded-full object-cover border-4 border-[#2C3D4D] shadow-md"
                        />
                    </div>
                    <div className="px-6 pb-6 text-center">
                        <h2 className="text-2xl font-semibold ">{user?.displayName}</h2>
                        <p className="text-gray-800 mt-2">{user?.email}</p>
                    </div>
                    <div className="flex justify-center pb-6">
                        <Link to='/update-profile' className="bg-gradient-to-l from-[#063F33FF] to-[#032018FF] to-[#470A8DFF] text-white px-6 py-2 rounded-lg flex items-center gap-2 md:text-xl text-xs">Update Your Profile</Link>
                    </div>
                </div>

            </div>

            <div className="container mx-auto mt-10">
                <div className=" hover:shadow-xl shadow-md rounded-lg p-6 mx-2 mx-auto">
                    <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Exciting New Features</h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-green-500 text-white flex justify-center items-center rounded-full text-lg font-bold">1</div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Enhanced Security</h4>
                                <p className="text-gray-600">
                                    Your account is now secured with multi-factor authentication to keep your data safe.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-500 text-white flex justify-center items-center rounded-full text-lg font-bold">2</div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Personalized Dashboard</h4>
                                <p className="text-gray-600">
                                    View your activity summary and suggestions tailored just for you.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-purple-500 text-white flex justify-center items-center rounded-full text-lg font-bold">3</div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Interactive Challenges</h4>
                                <p className="text-gray-600">
                                    Participate in fun challenges and earn rewards along the way!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {open && open && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                        onClick={() => setOpen(false)} // Close when clicking outside
                    >
                        {/* Modal Content */}
                        <div
                            className="bg-gradient-to-b from-[#371585FF] to-[#5E0C77FF] to-[#138D0AFF]  rounded-xl p-4 relative"
                            onClick={(e) => e.stopPropagation()} // Prevent close on image click
                        >
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-2 right-2 text-red-600 hover:text-green-500 text-xl font-bold"
                            >
                                ×
                            </button>

                            <img
                                src={user.photoURL}
                                alt="Profile"
                                className="w-64 h-64 rounded-full object-cover"
                            />
                        </div>
                    </div>
                )

                }
            </div>
        </div>

    );
};

export default Profile;