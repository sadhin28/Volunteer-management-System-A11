import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Provider/AuthProvider";

const MyApplications = () => {
  const { user } = useContext(AuthContext); // get logged-in user info
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`${import.meta.env.VITE_API}/my-application?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="mt-16 px-5">
      <h2 className="text-2xl font-bold text-center mb-5">
        My  Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-600">
          No applications found for <b>{user?.email}</b>
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg divide-y divide-gray-200">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Full Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Location</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app, index) => (
                <tr
                  key={app._id}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{app.fullName || "N/A"}</td>
                  <td className="py-2 px-4">{app.applycant_email || "N/A"}</td>
                  <td className="py-2 px-4">{app.Location || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
