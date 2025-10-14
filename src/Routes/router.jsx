import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";
import Home from "../components/Home";
import Login from "../components/Login";
import AllVolunteerNeed from "../components/AllVolunteerNeed";

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
        element:<Login/>
    }
]
}])
export default router;
