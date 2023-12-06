import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import BookingRow from "./BookingRow";

import useAxiosSecure from "../../Hooks/useAxiousSecure";




const Bookings = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure= useAxiosSecure();
    const [bookings, setBookings] = useState([]);

    // const url = `https://car-doctor-server-mu-seven.vercel.app/bookings?email=${user?.email}`
    const url = `/bookings?email=${user?.email}`

    useEffect(()=>{

        axiosSecure.get(url)
        .then(res=> setBookings(res.data))

        // axios.get(url , {withCredentials:true})
        // .then(res=>{
        //     setBookings(res.data)
        // })

        // fetch(url)
        // .then(res => res.json())
        // .then(data => {
        //     setBookings(data);
        // })
    },[url , axiosSecure])

    

        const handleDelete = id=>{
            const proceed= confirm('Are you sure You Want to Delete');
            if(proceed){
                fetch(`https://car-doctor-server-mu-seven.vercel.app/bookings/${id}`,{
                    method:"DELETE"
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
                    if(data.deletedCount>0){
                        alert('deleted successfully');
                        const remaining = bookings.filter(booking=> booking.id !== id);
                        setBookings(remaining);
                    }
                })
            }
        }

        const handleConfirm= id =>{
            fetch(`https://car-doctor-server-mu-seven.vercel.app/bookings/${id}`,{
                method:"PATCH",
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify({status: 'confirm'})
            })
            .then(res=>res.json())
            .then (data=>{
                console.log(data);
                if(data.modifiedCount>0){
                   
                    const remaining= bookings.filter(booking=>booking._id !== id);
                    const updated= bookings.find(booking=>booking._id !== id);
                    updated.status='confirm';
                    const newBookings= [updated, ...remaining];
                    setBookings(newBookings);
                }
            })
        }

    return (
        <div>
            <h2 className="text-5xl">Your Bookings: {bookings.length}</h2>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>price</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                     
                     {
                        bookings.map(booking=> <BookingRow
                             key={booking._id}
                             booking={booking}
                             handleDelete={handleDelete}
                             handleConfirm={handleConfirm}
                             ></BookingRow>)
                     }  
                    </tbody>
                  

                </table>
            </div>
        </div>
    );
};

export default Bookings;