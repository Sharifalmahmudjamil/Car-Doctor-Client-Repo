// import { useEffect } from "react";
// import { useState } from "react";
import useServices from "../../../Hooks/useServices";
import ServiceCard from "./ServiceCard";


const Services = () => {

    const  services= useServices();
    // const [services,SetServices]=useState([]);

    // useEffect(()=>{
    //     fetch('https://car-doctor-server-mu-seven.vercel.app/services')
    //     .then(res=>res.json())
    //     .then(data=> SetServices(data))
    // },[])
    return (
        <div className="mt-5">
            <div className="text-center space-y-5">
                <h3 className="text-3xl text-orange-500 font-bold">Services</h3>
                <h3 className="text-4xl font-bold ">Our Service Area</h3>
                <p className="text-base font-medium text-[#737373]">the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    services.map(service=><ServiceCard
                    key={service._id}
                    service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;