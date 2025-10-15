import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";
import Home from "../components/Home";
import AllVolunteerNeed from "../components/AllVolunteerNeed";
import Contact from "../components/Contact";
import AuthForm from "../components/AuthForm";
import ForgatePassword from "../components/ForgatePassword";
import Errorpage from "../components/Errorpage";
import PrivateRoute from "./PrivateRoute";
import AddVolunteer from "../components/AddVolunteer";
import ManageMyPosts from "../components/ManageMyPosts";
import PrivacyPolicy from "../components/PrivacyPolicy";
import TermsAndCondition from "../components/TermsAndCondition";

const router = createBrowserRouter([
{
   path:'/',
   element:<Root/>,
   errorElement:<Errorpage/>,
   children:[
    {
      path:'/',
      element:<Home/>

    },
    {
        path:'/allvolunteerneedposts',
        element:<PrivateRoute><AllVolunteerNeed/></PrivateRoute>
    },
    {
        path:'/login',
        element:<AuthForm/>
    },
    {
        path:'/forgotPassword',
        element:<ForgatePassword/>
    },
    {
        path:'/contact',
        element:<Contact/>
    },
    {
        path:'/add-post',
        element:<PrivateRoute><AddVolunteer/></PrivateRoute>
    },
    {
        path:"/my-posts",
        element:<PrivateRoute><ManageMyPosts/></PrivateRoute>
    },
    {
        path:"/privacy-policy",
        element:<PrivacyPolicy/>
    },
    {
        path:"/terms-and-conditions",
        element:<TermsAndCondition/>
    }
]
}])
export default router;
