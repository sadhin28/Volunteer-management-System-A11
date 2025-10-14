import {  useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const location = useLocation()
    if(loading){
        return<div className="flex justify-center items-center mt-20">
            <span className="loading loading-bars loading-md"></span>
        </div>
    }
    if(user && user?.email){
        return children
    }
    return (
       <Navigate to='/login' state={location.pathname}/>
    );
};

export default PrivateRoute;