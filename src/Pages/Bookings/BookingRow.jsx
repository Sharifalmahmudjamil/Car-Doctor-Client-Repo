/* eslint-disable react/prop-types */


const BookingRow = ({booking,handleDelete,handleConfirm}) => {
    const {_id,customerName,email,date,service,price,img,status} = booking;

  
    return (
        <div>
            {/* row 1 */}
            <tr>
                <th>
                    <label>
                    <button onClick={()=>handleDelete(_id)} className="btn btn-circle btn-outline">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
</button>
                    </label>
                </th>
                <td>
                    
                        <div className="avatar">
                            <div className="rounded w-24 h-24">
                               {
                                img&& <img src={img} alt="Avatar Tailwind CSS Component" />
                               }
                            </div>
                        </div>
                      
                   
                </td>
                <td>
                   {customerName}
                </td>
                <td>
                   {service}
                </td>
                <td>{email}</td>
                <td>${price}</td>
                <td>{date}</td>
                <th>
                    { 
                     status === 'confirm' ? <span className="font-bold text-orange-600">Confirmed</span>:
                        <button onClick={()=>handleConfirm(_id)} className="btn btn-ghost btn-xs">Please confirm</button>}
                </th>
            </tr>
        </div>
    );
};

export default BookingRow;