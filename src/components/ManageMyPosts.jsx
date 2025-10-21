import React, { useContext, useEffect, useState } from 'react';
import useTitle from '../hooks/useTitle';
import { AuthContext } from '@/Provider/AuthProvider';
import Spiner from './Spiner';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { AiTwotoneDelete } from "react-icons/ai";
import Swal from 'sweetalert2';

const ManageMyPosts = () => {
    useTitle("Manage My Posts")
    const { user } = useContext(AuthContext)
    const [myPosts, setMyposts] = useState([])
    console.log(myPosts)
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API}/my-post?email=${user.email}`)
            .then(res => res.json())
            .then(data => setMyposts(data))
            .catch(err => console.error(err));
    }, [user.email]);
    //use aos animate
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
        AOS.refresh();
    }, []);
    //handel delete
    const handelDelete=(id,post)=>{
     
      Swal.fire({
      title: `Click? Yes Then Delete ${post.Post_Title} Post`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        
        fetch(`${import.meta.env.VITE_API}/addVolunteer/${id}`, {
          method: "DELETE",
          
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setMyposts((prev) => prev.filter((e) => e._id !== id));
              Swal.fire({
                title: `${post.Post_Title}`,
                text: "Post has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
    }
    return (
         <div className='my-6'>
            {/* header */}
            <div>
                <div className="text-center py-10 text-xl font-bold md:text-4xl justify-center flex items-center gap-2  mb-10">
                    <FaHeart className="text-red-500" />
                    <p className=" text-[#511AB7FF]">
                        <span className="text-green-500 ">Manage My</span> Posts
                    </p>
                </div>
            </div>
            {/* Card */}
            {myPosts.length > 0 ?
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myPosts.map((post) => (

                        <div
                            data-AOS="zoom-in"
                            key={post._id}
                            className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                        >
                            <img
                                src={post.Thumbnail}
                                alt={post.Title}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-5 space-y-2">
                                <h3 className="text-xl font-semibold text-gray-800">{post?.Post_Title}</h3>
                                <p className="text-sm text-gray-500">
                                    Category:{" "}
                                    <span className="text-[#511AB7FF] font-medium">{post?.Category}</span>
                                </p>
                                <p className="text-sm text-gray-500">
                                    Deadline:{" "}
                                    <span className="font-medium text-red-500">
                                        {new Date(post?.Deadline).toLocaleDateString()}
                                    </span>
                                </p>

                                <div className="flex items-center py-2 justify-between">
                                    <Link
                                        to={`/view-Detail-post/${post._id}`}
                                        className=" h-10 px-2 flex items-center bg-[#511AB7FF]  text-white font-medium  rounded-lg hover:bg-[#3a0d8a] transition-all"
                                    >
                                        View Details
                                    </Link>
                                   
                                    <Link
                                        to={`/Update-my-posts/${post._id}`}
                                        className=" h-10 px-2 flex items-center bg-[#b7471a] text-white font-medium  rounded-lg hover:bg-[#822c07] transition-all"
                                    >
                                       Update
                                    </Link>
                                     <Link
                                        onClick={()=>handelDelete(post._id,post)}
                                        className="h-10  flex items-center hover:bg-[#078e10] text-white  font-medium   px-4 rounded-lg bg-[#1caf32] transition-all"
                                    >
                                        X
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> :
                <div className="text-center text-gray-400">
                    <Spiner />
                </div>
            }
        </div>
    );
};

export default ManageMyPosts;