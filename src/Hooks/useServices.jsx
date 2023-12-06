import { useEffect, useState } from "react";


const useServices = () => {
    const [services,SetServices]=useState([]);

    useEffect(()=>{
        fetch('https://car-doctor-server-mu-seven.vercel.app/services')
        .then(res=>res.json())
        .then(data=> SetServices(data))
    },[])

    return services;
};

export default useServices;