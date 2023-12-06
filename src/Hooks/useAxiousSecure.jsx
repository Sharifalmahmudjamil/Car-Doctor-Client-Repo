import axios from "axios";
import { useEffect } from "react";
import useAuth from "./UseAuth";
import { useNavigate } from "react-router-dom";


const axiosSecure= axios.create({
    baseURL: 'https://car-doctor-server-mu-seven.vercel.app',
    withCredentials:true
})

const useAxiosSecure = () => {
    const {logout}= useAuth();
    const navigate= useNavigate();
 
    useEffect(()=>{
        axiosSecure.interceptors.response.use( res=>{
            return res
        } , error=>{
            console.log('error tracked in the interceptors', error.response);
            if(error.response.status===401 ||error.response.status===403 ){
                console.log('log out the user ')
                logout()
                .then(()=>{ 
                    navigate('/login')
                })
                .catch(error=>console.log(error));
            }
        }
        )
    },[logout,navigate])

   return axiosSecure;

};

export default useAxiosSecure;