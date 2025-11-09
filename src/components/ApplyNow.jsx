import React, { useContext, useState, useRef } from "react";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "@/Provider/AuthProvider";
import { toast } from "react-toastify";

const ApplyNow = () => {
  useTitle("Apply Now");
  const { user } = useContext(AuthContext);
  const fileInputRef = useRef(null);

  const initialFormState = {
    photo: "",
    fullName: "",
    coverletter: "",
    Category: "",
    Location: "",
    dateOfBirth: "",
    Organizer_name: user?.displayName || "",
    Organizer_email: user?.email || "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, Thumbnail: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const categories = [
    "Healthcare",
    "Education",
    "Social Service",
    "Animal Welfare",
    "Environment",
    "Disaster Relief",
    "Community Development",
    "Fundraising",
    "Blood Donation",
    "Elderly Care",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.Post_Title || !formData.Description || !formData.Category) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API}/addVolunteer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");

      const data = await res.json();
      toast.success(`✅ Volunteer post added successfully by ${user?.displayName}`);

      // Clear all form fields
      setFormData(initialFormState);

      // Clear file input preview
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Submission failed. Check console.");
    }
  };

  return (
    <div className="max-w-7xl my-16 mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-[#6C4197FF]/20 border-2 p-10 rounded-lg shadow-2xl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#62299CFF]">
          Apply For This Post
        </h2>

        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {/* Thumbnail */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Enter Your Photo
            </label>
            <input
              required
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#62299CFF]"
            />
            {formData.photo && (
              <img
                src={formData.photo}
                alt="preview"
                className="mt-3 w-32 h-32 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Post Title */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Full Name
            </label>
            <input
              required
              type="text"
              name="fullName"
              placeholder="Enter Post Title"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#62299CFF]"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900">
                Cover Letter
            </label>
            <textarea
              required
              name="coverletter"
              rows="4"
              placeholder="Write details about this volunteer post"
              value={formData.coverletter}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#62299CFF]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Category
            </label>
            <select
              required
              name="Category"
              value={formData.Category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#62299CFF]"
            >
              <option value="">Select a Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Location
            </label>
            <input
              type="text"
              name="Location"
              placeholder="Enter Location"
              value={formData.Location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#62299CFF]"
            />
          </div>


          {/* Deadline */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#62299CFF]"
            />
          </div>
        </div>

        {/* Organizer Info */}
        <div className="mb-6 grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Applicant Name
            </label>
            <input
              type="text"
              name="applicant_name"
              value={formData.Organizer_name}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Applicant Email
            </label>
            <input
              type="email"
              name="applicant_email"
              value={formData.applicant_email}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-[#62299CFF] hover:bg-[#4f1f7d] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-6 py-2.5"
        >
          Submit
        </button>
      </form>
    </div>
  );
};



export default ApplyNow;