// import React, { useEffect, useState } from 'react'
// import { dummyMyBookingsData } from '../../assets/assets';
// import Title from '../../components/Owner/Title';

// const ManageBookings = () => {
//     // Fixed: Matches the variable name in your .env file
//     const currency = import.meta.env.VITE_CURRENCY || "$";
//     const [bookings, setBookings] = useState([]);

//     const fetchOwnerBookings = async () => {
//         setBookings(dummyMyBookingsData)
//     }

//     useEffect(() => {
//         fetchOwnerBookings();
//     }, []);

//     return (
//         <div className='px-4 pt-5 md:px-10 w-full'>
//             <Title title="Manage Bookings" subTitle="Track all customer bookings, approve or cancel requests and manage booking statuses" />

//             <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
//                 <table className='w-full border-collapse text-left text-sm text-gray-600' >
//                     <thead className='text-gray-500' >
//                         <tr>
//                             <th className="p-3 font-medium">Car</th>
//                             <th className="p-3 font-medium max-md:hidden">Date Range</th>
//                             <th className="p-3 font-medium">Total</th>
//                             <th className="p-3 font-medium max-md:hidden">Payment</th>
//                             <th className="p-3 font-medium">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bookings.map((booking, index) => (
//                             <tr key={index} className="border-t border-borderColor text-gray-500">
//                                 <td className='p-3 flex items-center gap-3'>
//                                     <img src={booking.car.image} alt="" className='h-12 w-12 aspect-square rounded-md object-cover' />
//                                     {/* Fixed: Removed space in 'max-md:hidden' */}
//                                     <p className='font-medium max-md:hidden'>{booking.car.brand} {booking.car.model}</p>
//                                 </td>
//                                 <td className='p-3 max-md:hidden'>
//                                     {booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}
//                                 </td>
//                                 <td className='p-3'>{currency}{booking.price}</td>
//                                 {/* Fixed: Removed space in 'max-md:hidden' */}
//                                 <td className='p-3 max-md:hidden' >
//                                     <span className='bg-gray-100 px-3 py-1 rounded-full text-xs'>Offline</span>
//                                 </td>
//                                 <td className='p-3'>
//                                     {booking.status === 'pending' ? (
//                                         <select defaultValue={booking.status} className='px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none'>
//                                             <option value="pending">Pending</option>
//                                             <option value="cancelled">Cancelled</option>
//                                             <option value="confirmed">Confirmed</option>
//                                         </select>
//                                     ) : (
//                                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
//                                             {booking.status}
//                                         </span>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }

// export default ManageBookings
import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets';
import Title from '../../components/Owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ManageBookings = () => {
    const { axios, currency, isOwner } = useAppContext();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Fetch Real Bookings from Backend
    const fetchOwnerBookings = async () => {
        try {
            // Ensure your route matches: bookingRoutes.js -> '/owner-bookings'
            const { data } = await axios.get('/api/booking/owner-bookings');
            
            if (data.success) {
                setBookings(data.bookings);
            } else {
                toast.error("Failed to fetch bookings");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error fetching bookings");
        } finally {
            setLoading(false);
        }
    }

    // 2. Handle Status Change (Approve/Cancel)
    const changeBookingStatus = async (bookingId, newStatus) => {
        try {
            // Ensure your route matches: bookingRoutes.js -> '/change-status'
            const { data } = await axios.post('/api/booking/change-status', { bookingId, status: newStatus });
            
            if (data.success) {
                toast.success(data.message);
                // Update UI immediately without re-fetching
                setBookings(prev => prev.map(booking => 
                    booking._id === bookingId ? { ...booking, status: newStatus } : booking
                ));
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error updating status");
        }
    }

    useEffect(() => {
        if (isOwner) {
            fetchOwnerBookings();
        }
    }, [isOwner]);

    if (!isOwner) {
        return (
            <div className='px-4 pt-5 md:px-10 w-full'>
                <Title title="Access Denied" subTitle="You do not have permission to view this page." />
            </div>
        )
    }

    return (
        <div className='px-4 pt-5 md:px-10 w-full'>
            <Title title="Manage Bookings" subTitle="Track all customer bookings, approve or cancel requests and manage booking statuses" />

            <div className='max-w-5xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
                <table className='w-full border-collapse text-left text-gray-600' >
                    <thead className='text-gray-500 bg-gray-50 border-b border-borderColor text-base' >
                        <tr>
                            <th className="p-4 font-medium">Car & Customer</th>
                            <th className="p-4 font-medium max-md:hidden">Date Range</th>
                            <th className="p-4 font-medium">Total</th>
                            <th className="p-4 font-medium max-md:hidden">Status</th>
                            <th className="p-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-base">
                        {loading ? (
                            <tr><td colSpan="5" className="p-6 text-center text-gray-400">Loading bookings...</td></tr>
                        ) : bookings.length === 0 ? (
                            <tr><td colSpan="5" className="p-6 text-center text-gray-400">No bookings found.</td></tr>
                        ) : (
                            bookings.map((booking, index) => (
                                <tr key={index} className="border-t border-borderColor hover:bg-gray-50 transition-colors">
                                    <td className='p-4 flex items-center gap-4'>
                                        {/* Large Car Image */}
                                        <img src={booking.car?.image || assets.car_icon} alt="" className='h-16 w-16 aspect-square rounded-md object-cover bg-gray-200' />
                                        <div>
                                            <p className='font-semibold text-gray-800 text-lg'>{booking.car?.brand} {booking.car?.model}</p>
                                            <p className='text-sm text-gray-500 mt-1'>User: <span className="font-medium text-gray-700">{booking.user?.name || "Guest"}</span></p>
                                        </div>
                                    </td>
                                    <td className='p-4 max-md:hidden'>
                                        <div className="flex flex-col text-base">
                                            <span className="font-medium">From: {new Date(booking.startDate).toLocaleDateString()}</span>
                                            <span className="text-gray-400">To: {new Date(booking.endDate).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className='p-4 font-medium text-lg'>{currency}{booking.totalPrice}</td>
                                    <td className='p-4 max-md:hidden' >
                                        <span className={`px-3 py-1.5 rounded-full text-sm font-medium 
                                            ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                                              booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 
                                              booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                              'bg-orange-100 text-orange-700'}`}>
                                            {/* Capitalize first letter */}
                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className='p-4'>
                                        <select 
                                            onChange={(e) => changeBookingStatus(booking._id, e.target.value)} 
                                            value={booking.status}
                                            className={`px-3 py-2 rounded border outline-none cursor-pointer text-sm font-medium w-32
                                                ${booking.status === 'confirmed' ? 'border-green-200 text-green-700 bg-green-50' : 
                                                  booking.status === 'cancelled' ? 'border-red-200 text-red-700 bg-red-50' : 
                                                  'border-orange-200 text-orange-700 bg-orange-50'}`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirm</option>
                                            <option value="cancelled">Cancel</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageBookings