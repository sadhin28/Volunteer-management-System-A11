import { AuthContext } from "@/Provider/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProfile = () => {
    const navigate = useNavigate();
    const { updateUserProfile } =useContext(AuthContext)
      const handleUpdate = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const photo = event.target.photo.value;
        updateUserProfile(name, photo)
            .then(() => {
               
                navigate("/my-profile");
                toast.success("Profile updated successfully")
            })


    };
    return (
         <div className="min-h-[calc(100vh-320px)]  flex justify-center items-center">
           
            <div className="border-4 border-[#DA78E3FF]/20 hover:shadow-lg p-10 rounded-xl shadow-lg w-full max-w-lg">
                <h2 className="text-center text-2xl font-bold mb-4">Update Profile</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="url"
                            placeholder="Enter photo URL"
                            className="w-full mb-4 px-4 py-2 border rounded-lg bg-gradient-to-r from-[#E5E2ECFF] to-[#C4AACDFF] to-[#E4E4F9FF]  focus:outline-none focus:ring-2 focus:ring-[#62299CFF]"
                            name="photo"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            className="w-full mb-4 px-4 py-2 border rounded-lg bg-gradient-to-r from-[#E5E2ECFF] to-[#C4AACDFF] to-[#E4E4F9FF]  focus:outline-none focus:ring-2 focus:ring-[#62299CFF]"
                            name="name"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-gradient-to-l from-[#063F33FF] to-[#032018FF] to-[#470A8DFF] text-white p-3 rounded-lg  items-center gap-2 md:text-xl  w-full"
                        >
                            Update Information
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;