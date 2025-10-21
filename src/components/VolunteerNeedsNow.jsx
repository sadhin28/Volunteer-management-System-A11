import { AuthContext } from "@/Provider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spiner from "./Spiner";
import AOS from 'aos';
import 'aos/dist/aos.css';


const VolunteerNeedsNow = () => {
  const [volunteerPosts, setVolunteerPosts] = useState([]);
  const { user } = useContext(AuthContext)
  useEffect(() => {
    // Fetch local JSON data
    fetch(`${import.meta.env.VITE_API}/upcoming-deadline`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setVolunteerPosts(data); // show only 6
      })
      .catch((error) => console.error("Error loading volunteer posts:", error));
  }, []);
      useEffect(() => {
           AOS.init({
               duration: 1000,
               once: false,
           });
           AOS.refresh();
       }, []);
  return (
    <div className="my-10">
      {/* Section Heading */}
      <div className="text-center text-xl font-bold md:text-4xl justify-center flex items-center gap-2  mb-10">
        <FaHeart className="text-red-500" />
        <p className=" text-[#511AB7FF]">
          <span className="text-green-500 ">Volunteer</span> Hub
        </p>
      </div>

      {/* Cards Grid */}
      {volunteerPosts.length>0?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {volunteerPosts.map((post) => (
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

                <div className="pt-3">
                  <Link
                    to={`/volunteer/${post._id}`}
                    className="inline-block w-full text-center bg-[#511AB7FF] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#3a0d8a] transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div> :
        <div className="text-center text-gray-400">
          <Spiner/>
        </div>
      }

      {/* See All Button */}
      {volunteerPosts.length>0 && <div className="flex justify-center mt-10">
        <Link
          to="/allvolunteerneedposts"
          className="bg-[#511AB7FF] hover:bg-[#3a0d8a] text-white font-semibold py-3 px-8 rounded-xl transition-all"
        >
          See All
        </Link>
      </div>}
    </div>
  );
};

export default VolunteerNeedsNow;
