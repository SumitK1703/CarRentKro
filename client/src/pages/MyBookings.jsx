// import React from 'react'
// import { useState, useEffect } from 'react'
// import { dummyMyBookingsData,assets } from '../assets/assets';
// import Title from '../components/Title.jsx';
// const MyBookings = () => {
//   const currency = import.meta.env.VITE_CURRENCY_SYMBOL || '$';
//   const [bookings, setBookings] = useState([]);
//   const fetchBookings = async () => {
//     setBookings(dummyMyBookingsData);
//   };
//   useEffect(() => {
//     fetchBookings();
//   }, []);
//   return (
//     <div className='px-6 md: px-16 1g: px-24 x1:px-32 2x1: px-48 mt-16 text-sm max-w-7x1'>
//       <Title title='My Bookings' subTitle='View and manage your all car bookings' align="left"/>
//       <div>
//         {bookings.map((booking, index)=>(
//           <div key={booking.id} className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12'>
//             <div className='md:col-span-1'>
//               <div className='rounded-md overflow-hidden mb-3'>
//                 <img src={booking.car.image} alt="Car" className='w-full h-auto aspect-video object-cover'/>
//               </div>
//               <p className='text-lg font-medium mt-2'>
//                 {booking.car.brand} {booking.car.model}
//               </p>
//               <p className='text-gray-500'>
//                 {booking.car.year} . {booking.car.category} . {booking.car.location}
//               </p>
//             </div>
//             {/* Booking Info */}
//             <div className='md:col-span-2'>
//               <div className='flex items-center gap-2'>
//                 <p className='px-3 py-1.5 bg-light rounded'>Booking #{index+1}</p>
//                 <p className={`px-3 py-1 text-xs rounded-full ${booking.status ==='confirmed' ? 'bg-green-400/15 text-green-600' : 'bg-red-400/15 text-red-600'}`}>{booking.status}</p>
//               </div>
//               <div className='flex items-start gap-2 mt-3'>
//                 <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 mt-1'/>
//                 <div>
//                   <p className='font-medium'>Rental Period</p>
//                   <p>{booking.pickupDate.split('T')[0]} To {booking.returnDate.split('T')[0]}</p>
//                 </div>
//               </div>
//               <div className='flex items-start gap-2 mt-3'>
//                 <img src={assets.location_icon_colored} alt="" className='w-4 h-4 mt-1'/>
//                 <div>
//                   <p className='font-medium'>Pickup Location</p>
//                   <p>{booking.car.location}</p>
//                 </div>
//               </div>
//             </div>
//             <div className='md:col-span-1 flex flex-col justify-between gap-6'>
//               <div className='text-sm text-gray-500 text-right'>
//                 <p>Total Price</p>
//                 <h1 className='text-2x1 font-semibold text-primary'>{currency}
//                   {booking.price}
//                 </h1>
//                 <p>Booked on {booking.createdAt.split('T')[0]}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default MyBookings

// UPDATED 3

import React, { useState, useEffect } from 'react'
import Title from '../components/Title.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';
import { assets } from '../assets/assets'; 
import {motion} from 'motion/react';

const MyBookings = () => {
  const { currency, axios, token } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
        const { data } = await axios.get('/api/booking/my-bookings', {
            headers: { token: localStorage.getItem('token') }
        });
        if (data.success) {
            setBookings(data.bookings);
        }
    } catch (error) {
        console.log(error);
        toast.error("Failed to load bookings");
    }
  };

  useEffect(() => {
    if (token) fetchBookings();
  }, [token]);

  return (
    <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.3 }}
    className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl'>
      <Title title='My Bookings' subTitle='View and manage your all car bookings' align="left"/>
      <div>
        {bookings.map((booking, index)=>(
          <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          key={index} className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12'>
            <div className='md:col-span-1'>
              <div className='rounded-md overflow-hidden mb-3'>
                <img src={booking.car?.image || assets.car_icon} alt="Car" className='w-full h-auto aspect-video object-cover'/>
              </div>
              <p className='text-lg font-medium mt-2'>
                {booking.car?.brand} {booking.car?.model}
              </p>
              <p className='text-gray-500'>
                {booking.car?.year} . {booking.car?.category} . {booking.car?.location}
              </p>
            </div>
            {/* Booking Info */}
            <div className='md:col-span-2'>
              <div className='flex items-center gap-2'>
                <p className='px-3 py-1.5 bg-light rounded'>Booking #{index+1}</p>
                <p className={`px-3 py-1 text-xs rounded-full ${booking.status ==='confirmed' ? 'bg-green-400/15 text-green-600' : 'bg-red-400/15 text-red-600'}`}>{booking.status}</p>
              </div>
              <div className='flex items-start gap-2 mt-3'>
                <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 mt-1'/>
                <div>
                  <p className='font-medium'>Rental Period</p>
                  <p>{new Date(booking.startDate).toLocaleDateString()} To {new Date(booking.endDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className='flex items-start gap-2 mt-3'>
                <img src={assets.location_icon_colored} alt="" className='w-4 h-4 mt-1'/>
                <div>
                  <p className='font-medium'>Pickup Location</p>
                  <p>{booking.car?.location}</p>
                </div>
              </div>
            </div>
            <div className='md:col-span-1 flex flex-col justify-between gap-6'>
              <div className='text-sm text-gray-500 text-right'>
                <p>Total Price</p>
                <h1 className='text-2x1 font-semibold text-primary'>{currency}
                  {booking.totalPrice}
                </h1>
                <p>Booked on {new Date(booking.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default MyBookings