import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";
import Home from "../components/Home";
import AllVolunteerNeed from "../components/AllVolunteerNeed";
import Contact from "../components/Contact";
import AuthForm from "../components/AuthForm";
import ForgatePassword from "../components/ForgatePassword";

const router = createBrowserRouter([
{
   path:'/',
   element:<Root/>,
   children:[
    {
      path:'/',
      element:<Home/>

    },
    {
        path:'/allvolunteerneedposts',
        element:<AllVolunteerNeed/>
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
    }
]
}])
export default router;
