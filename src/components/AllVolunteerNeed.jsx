import { FaHeart, FaSearch } from "react-icons/fa";
import useTitle from "../hooks/useTitle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Spiner from "./Spiner";
import AOS from "aos";
import "aos/dist/aos.css";

const AllVolunteerNeed = () => {
  useTitle("All Volunteer Need");

  const [volunteerPosts, setVolunteerPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔄 Fetch all volunteers from backend once
  useEffect(() => {
    const fetchVolunteers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/addVolunteer`);
        const data = await res.json();
        setVolunteerPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Error loading volunteer posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVolunteers();
  }, []);

  // 🧩 Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  // 🔍 Filter posts on search term change
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(volunteerPosts);
    } else {
      const filtered = volunteerPosts.filter((post) =>
        post.Post_Title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, volunteerPosts]);

  return (
    <div className="my-20">
      {/* Header */}
      <div className="text-center   font-bold md:text-3xl justify-center flex items-center gap-2 mb-10">
        <FaHeart className="text-red-500" />
        <p className="text-[#511AB7FF]">
          <span className="text-green-500">All Posted</span> Volunteer
        </p>
      </div>

      {/* 🔍 Search Bar */}
      <div className="max-w-md mx-auto mb-10 flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm">
        <input
          type="text"
          placeholder="Search by post title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 outline-none text-gray-700"
        />
        <button
          type="button"
          className="bg-[#511AB7FF] text-white px-5 py-2 hover:bg-[#3a0d8a] transition-all"
        >
          <FaSearch />
        </button>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="text-center text-gray-400">
          <Spiner />
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              data-aos="zoom-in"
              key={post._id}
              className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <img
                src={post.Thumbnail}
                alt={post.Post_Title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {post?.Post_Title}
                </h3>
                <p className="text-sm text-gray-500">
                  Category:{" "}
                  <span className="text-[#511AB7FF] font-medium">
                    {post?.Category}
                  </span>
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
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No volunteer posts found.
        </p>
      )}
    </div>
  );
};

export default AllVolunteerNeed;
