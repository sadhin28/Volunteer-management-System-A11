import { useContext, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup,} from "firebase/auth";


import { toast } from "react-toastify";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import app from "../firebase/firebase.config";
export default function AuthForm() {
  const { login, CreateNewUser ,user,setuser,updateUserProfile} = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [name, setname] = useState("");
  const auth = getAuth(app);
  const location = useLocation()
  const navigate = useNavigate()
  const from =location.state || "/"
  const handleSubmit = async () => {
    
    try {
      if (isRegister) {
        CreateNewUser(email, password)
         .then((result) => {
       
        const user = result.user;
        setuser(user);
        toast.success("Successfully Registered", {
          position: "top-center",
          autoClose: 2000,
        });
        
        updateUserProfile(name,photoURL)
          .then(() => {

             result.user && navigate(from)
            
          })

      });

        toast.success("registered successfully");
        user && navigate(from)
        
      } else {
        await 
        login(email, password)
        .then(async (result) => {
              const user = result.user;
               const tokenResult = await user.getIdTokenResult();
               const role = tokenResult.claims.role || "user";
               result && toast.success(`${role} login successful`);
               result.user && navigate(from)
            })
            .catch(error => {
                toast.error(error.message)
            })
        
        
        user && navigate(from)
      }
    } catch (err) {
      toast.error(err.message);
    }  
  };
 const provider = new GoogleAuthProvider();
   const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then(res => {
                setuser(res.user)
               res.user && navigate(from)
                res.user  && toast.success(`Google login successful`);
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
  return (
    <div className=" flex items-center justify-center  px-1 min-h-[calc(100vh-100px)]">
      <div className="border-2  border-[#511AB7FF]/20 hover:shadow-2xl shadow-lg bg-gray-100/20 p-8 rounded-2xl shadow-lg w-full max-w-2xl ">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 uppercase">
          {isRegister ? "Register" : "Login"}
        </h2>
        {/* name */}
       {isRegister&& <input
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) =>setname(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg bg-gradient-to-r from-[#E5E2ECFF] to-[#C4AACDFF] to-[#E4E4F9FF]  focus:outline-none focus:ring-2 focus:ring-[#62299CFF]"
        />}
        {/* Email */}
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) =>setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg bg-gradient-to-r from-[#E5E2ECFF] to-[#C4AACDFF] to-[#E4E4F9FF]  focus:outline-none focus:ring-2 focus:ring-[#62299CFF]"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg bg-gradient-to-r from-[#E5E2ECFF] to-[#C4AACDFF] to-[#E4E4F9FF]  focus:outline-none focus:ring-2 focus:ring-[#62299CFF]"
        />

        {/* Forgot password */}
        {!isRegister && (
          <div
           
            className="w-25 text-sm text-[#097C7DFF] hover:text-red-500 cursor-pointer hover:underline mb-4"
          >
            <NavLink 
            state={{ email: email }}
            to="/forgotPassword"
            >Forgot Password?</NavLink>
           
          </div>
        )}

        {/* Photo URL (only in register mode) */}
        {isRegister && (
          <input
            type="text"
            placeholder="Enter photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg bg-gradient-to-r from-[#E5E2ECFF] to-[#C4AACDFF] to-[#E4E4F9FF]  focus:outline-none focus:ring-2 focus:ring-[#62299CFF]"
          />
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-[#2E1D5AFF] to-[#742F85FF] to-[#08B5A4FF] text-white p-2 rounded-lg  items-center gap-2 md:text-xl  w-full"
        >
          {isRegister ? "Register" : "Login"}
        </button>

        {/* Google login */}
        <div className="my-4  flex items-center">
          <hr className="flex-grow border-[#097C7DFF]" />
          <span className="mx-2 font-bold text-[#097C7DFF] text-sm">or</span>
          <hr className=" flex-grow  border-[#097C7DFF]" />
        </div>
        <button
          onClick={handleGoogleLogin}
          className="bg-gradient-to-r from-[#2E1D5AFF] to-[#742F85FF] to-[#08B5A4FF] text-white p-2 rounded-lg  items-center gap-2 flex justify-center md:text-xl  w-full"
        >
        <FaGoogle className="mr-1 "/> Login with Google
        </button>

        {/* Switch login/register */}
       {<p
          className="mt-4 text-center text-sm text-[#0E000DFF] cursor-pointer "
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? <p className="">Already have an account?  <span className="hover:underline text-red-500">Login now</span></p>
            :<p>Don't have an account? <span className="hover:underline text-red-500">Register</span></p>}
        </p>}
      </div>
    </div>
  );
}
