import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { MdEmail } from "react-icons/md";
const ViewDetails = () => {
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
    <div className="max-w-7xl mx-auto my-10 p-4">
      <Card className="shadow-lg rounded-2xl border border-gray-200">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl md:text-4xl font-bold text-gray-800">
            {details.Post_Title}
          </CardTitle>
          <CardDescription className="text-gray-500">
            Posted by: {details.Organizer_name}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="w-full flex justify-center">
            <img
              src={details.Thumbnail}
              alt={details.Post_Title}
              className="w-full md:w-2/4 lg:w-2/6 rounded-xl object-cover shadow-md"
            />
          </div>

          <div className="space-y-2 text-gray-700 text-base md:text-lg">
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
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-all"
            onClick={() => alert("Application feature coming soon!")}
          >
            Apply Now
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewDetails;
