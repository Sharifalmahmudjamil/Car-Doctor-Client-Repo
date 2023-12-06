/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { Navigate, useLocation,  } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const {user, loading}= useContext(AuthContext);
    
    const location= useLocation();
    // console.log(location.pathname);

    if(loading){
        return <span className="loading loading-spinner text-warning"></span>
    }

    if(user?.email){
        return children;
    }

    return <Navigate state={location.pathname} to='/login' replace> </Navigate>
};

export default PrivateRoute;