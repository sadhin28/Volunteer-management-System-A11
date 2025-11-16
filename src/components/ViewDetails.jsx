import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { MdEmail } from "react-icons/md";
import { AuthContext } from "@/Provider/AuthProvider";
const ViewDetails = () => {
  const {user}=useContext(AuthContext);
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/addVolunteer/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading volunteer post details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-lg font-semibold">
        Loading details...
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-red-500 font-semibold">
        Details not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-4">
      <Card className="shadow-lg rounded-2xl border border-gray-200">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-xl md:text-3xl font-bold text-gray-800">
            {details.Post_Title}
          </CardTitle>
          <CardDescription className="text-gray-500">
            <span className="text-green-500">Posted by:</span> {details.Organizer_name}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col md:flex-row items-start  py-6">
          <div className="w-full flex md:justify-start">
            <img
              src={details.Thumbnail}
              alt={details.Post_Title}
              className="w-full  lg:w-2/4 rounded-xl object-cover shadow-md"
            />
          </div>

          <div className="space-y-2  text-gray-700 text-base md:text-lg w-2/4 border-l-0 md:border-l md:pl-6 mt-6 md:mt-0">
            <p>
              <strong>Category:</strong> {details.Category}
            </p>
            <p>
              <strong>Deadline:</strong> {details.Deadline}
            </p>
            <p>
              <strong>Description:</strong> {details.Description}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-4">
          <p className="flex items-center gap-2 text-gray-600 text-sm md:text-base">
            <MdEmail/> Contact: {details.Organizer_email}
          </p>
         {details.Organizer_email !== user.email && <Link
              className="inline-block  text-center bg-[#511AB7FF] text-white font-medium py-2 px-4 rounded-lg hover:bg-white hover:text-[#511AB7FF] hover:border-2 hover:border-[#511AB7FF] border  transition-all"            to={`/Apply-Now`}
          >
            Apply Now
          </Link>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewDetails;
