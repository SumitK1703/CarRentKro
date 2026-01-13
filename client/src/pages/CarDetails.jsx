// import React from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import carsData from '../data/carsData'
// import assets from '../assets/assets.js'
// import Loader from '../components/Loader'
// const CarDetails = () => {

//     const {id} = useParams()
//     const navigate = useNavigate()
//     const [car, setCar] = useState(null)

//     useEffect(()=>{
//         setCar(carsData.find(car => car._id ===id))
//     },[id])
//     return car ? (
//         <div className='px-6 md: px-16 lg: px-24 x1:px-32 mt-16' >

//             <button onClick={()=> navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>
//                 <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65' /> Back to all cars
//             </button>
//         <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
//         <div className='lg:col-span-2'>
//             <img src={car.image} alt="" className='w-full h-auto md:max-h-100 object-cover rounded-x1 mb-6 shadow-md'/>
//             <div className='space-y-6'>
//                 <div>
//                     <h1 className='text-3x1 font-bold'>{car.brand} {car.model}</h1>
//                     <p className='text-gray-500 text-lg'>{car.category} . {car.year}</p>   
//                 </div>
//                 <hr className='border-borderColor my-6'/>
//                 <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
//                     {[
//                         {icon: assets.users_icon, text: `${car.seating_capacity} Seats`},
//                         {icon: assets.fuel_icon, text: car.fuel_type},
//                         {icon: assets.car_icon, text: car.transmission},
//                         {icon: assets.location_icon, text: car.location},
//                     ].map(({icon, text})=>(
//                         <div key={text} className='flex flex-col items-center bg-light p-4 rounded-lg'>
//                             <img src={icon} alt="" className=' h-5 mb-2'/>
//                             {text}
//                         </div>
//                     ))}
//                 </div>
//             <div>
//                 <h1 className='text-xl font-medium mb-3'>Description</h1>
//                 <p className='text-gray-500'>{car.description}</p>
//             </div>
//             <div>
//                 <h1 className='text-xl font-medium mb-3'>Features</h1>
//                 <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
//                     {
//                         ["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map((item)=>(
//                             <li key={item} className='flex items-center text-gray-500'>
//                                 <img src={assets.check_icon} className='h-4 mr-2' alt="" />
//                                 {item}
//                             </li>
//                         ))
//                     }
//                 </ul>
//             </div>
// </div>
// </div>
// </div>



// </div>
//     ): <Loader />
// }

// export default CarDetails

// UPDATED 2

// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { assets, dummyCarData } from '../assets/assets' // <--- Correct import
// import Loader from '../components/Loader'

// const CarDetails = () => {
//     const currency = import.meta.env.VITE_CURRENCY;
//     const { id } = useParams()
//     const navigate = useNavigate()
//     const [car, setCar] = useState(null)
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         alert('Booking request submitted!');
//     }
//     useEffect(() => {
//         // Use dummyCarData from assets.js
//         if (dummyCarData) {
//             const foundCar = dummyCarData.find(car => car._id === id);
//             setCar(foundCar);
//         }
//     }, [id])

//     return car ? (
//         <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16 mb-20'>

//             <button onClick={() => navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer hover:text-black transition-colors'>
//                 <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65 h-3' /> Back to all cars
//             </button>

//             <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
                
//                 {/* --- Left Column: Car Info --- */}
//                 <div className='lg:col-span-2'>
//                     {/* Fixed typo: rounded-x1 -> rounded-xl */}
//                     <img src={car.image} alt="" className='w-full h-auto md:max-h-[500px] object-cover rounded-xl mb-6 shadow-md' />
                    
//                     <div className='space-y-6'>
//                         <div>
//                             {/* Fixed typo: text-3x1 -> text-3xl */}
//                             <h1 className='text-3xl font-bold'>{car.brand} {car.model}</h1>
//                             <p className='text-gray-500 text-lg'>{car.category} • {car.year}</p>   
//                         </div>
                        
//                         <hr className='border-borderColor my-6' />
                        
//                         <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
//                             {[
//                                 { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
//                                 { icon: assets.fuel_icon, text: car.fuel_type },
//                                 { icon: assets.car_icon, text: car.transmission },
//                                 { icon: assets.location_icon, text: car.location },
//                             ].map(({ icon, text }, index) => (
//                                 <div key={index} className='flex flex-col items-center bg-gray-50 p-4 rounded-lg border border-gray-100'>
//                                     <img src={icon} alt="" className='h-6 mb-2 opacity-70' />
//                                     <span className='text-sm font-medium text-gray-600'>{text}</span>
//                                 </div>
//                             ))}
//                         </div>

//                         <div>
//                             <h1 className='text-xl font-medium mb-3'>Description</h1>
//                             <p className='text-gray-500 leading-relaxed'>{car.description}</p>
//                         </div>

//                         <div>
//                             <h1 className='text-xl font-medium mb-3'>Features</h1>
//                             <ul className='grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4'>
//                                 {["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map((item) => (
//                                     <li key={item} className='flex items-center text-gray-500 text-sm'>
//                                         <img src={assets.check_icon} className='h-4 mr-2 opacity-60' alt="" />
//                                         {item}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- Right Column: Booking Card --- */}
//                 {/* <div className='bg-white rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.06)] border border-gray-100 p-6 h-fit sticky top-24'>
//                     <h2 className='text-2xl font-bold mb-1'>${car.pricePerDay} <span className='text-base font-normal text-gray-500'>/ day</span></h2>
//                     <p className='text-green-600 text-sm mb-6'>Available for pickup</p>
//                     <button className='w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dull transition-colors cursor-pointer shadow-md'>
//                         Book this Car
//                     </button>
//                     <p className='text-xs text-center text-gray-400 mt-4'>No credit card required for booking request</p>
//                 </div> */}
//                 <form className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500' onSubmit={handleSubmit} >
//                     <p className='flex items-center justify-between text-2x1 text-gray-800 font-semibold'>
//                         {currency}{car.pricePerDay} <span className='text-base text-gray-400 font-normal'>per day</span>
//                     </p>
//                     <hr className='border-borderColor my-6' /> 
//                     <div className='flex flex-col gap-2'>
//                         <label htmlFor="pickup-date">Pickup Date</label>
//                         <input type="date" className='border border-borderColor px-3 py-2 rounded-lg' required id='pickup-date' min={new Date().toISOString().split('T')[0]}/>
//                     </div>
//                     <div className='flex flex-col gap-2'>
//                         <label htmlFor="dropoff-date">Dropoff Date</label>
//                         <input type="date" className='border border-borderColor px-3 py-2 rounded-lg' required id='dropoff-date' min={new Date().toISOString().split('T')[0]}/>
//                     </div>
//                     <button className='w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-x1 cursor-pointer'>
//                         Book Now
//                     </button>
//                     <p className='text-center text-sm'>No credit card required to reserve</p>
//                 </form>
//                 </div>
//         </div>
//     ) : <Loader />
// }

// export default CarDetails

// UPDATED 3
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import {motion} from 'motion/react';

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { axios, currency } = useAppContext()
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    
    // Local state for booking dates
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const fetchCarDetails = async () => {
        try {
            setLoading(true);
            // Now fetching only the specific car
            const { data } = await axios.get(`/api/user/car/${id}`);
            
            if (data.success) {
                setCar(data.car);
            } else {
                toast.error("Car not found");
                navigate('/cars');
            }
        } catch (error) {
            console.error(error);
            toast.error("Error fetching details");
            navigate('/cars');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { 
        if (id) fetchCarDetails(); 
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!startDate || !endDate) return toast.error("Please select dates");

        try {
            const { data } = await axios.post('/api/booking/create', {
                carId: car._id,
                startDate,
                endDate
            }, {
                headers: { token: localStorage.getItem('token') } 
            });

            if (data.success) {
                toast.success("Booking Request Sent!");
                navigate('/my-bookings');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Booking Failed");
        }
    }

    if (loading) return <Loader />

    return car ? (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16 mb-20'>
            <button onClick={() => navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer hover:text-black transition-colors'>
                <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65 h-3' /> Back to all cars
            </button>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
                {/* Car Details Left Side */}
                <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}

                className='lg:col-span-2'>
                    <motion.img 
                    initial={{ opacity: 0, scale: 0.95 ,}}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    src={car.image} alt="" className='w-full h-auto md:max-h-125 object-cover rounded-xl mb-6 shadow-md' />
                    <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    className='space-y-6'>
                        <div>
                            <h1 className='text-3xl font-bold'>{car.brand} {car.model}</h1>
                            <p className='text-gray-500 text-lg'>{car.category} • {car.year}</p>   
                        </div>
                        <hr className='border-borderColor my-6' />
                        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                            {[
                                { icon: assets.users_icon, text: `${car.seating_Capacity || car.seating_capacity} Seats` },
                                { icon: assets.fuel_icon, text: car.fuel_Type || car.fuel_type },
                                { icon: assets.car_icon, text: car.transmission },
                                { icon: assets.location_icon, text: car.location },
                            ].map((item, index) => (
                                <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 + index * 0.1 }}
                                key={index} className='flex flex-col items-center bg-gray-50 p-4 rounded-lg border border-gray-100'>
                                    <img src={item.icon} alt="" className='h-6 mb-2 opacity-70' />
                                    <span className='text-sm font-medium text-gray-600'>{item.text}</span>
                                </motion.div>
                            ))}
                        </div>
                        <div>
                            <h1 className='text-xl font-medium mb-3'>Description</h1>
                            <p className='text-gray-500 leading-relaxed'>{car.description}</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Booking Form Right Side */}
                <motion.form 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                className='shadow-lg h-max sticky top-24 rounded-xl p-6 space-y-6 text-gray-500 border border-gray-100' onSubmit={handleSubmit} >
                    <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>
                        {currency}{car.PricePerDay || car.pricePerDay} <span className='text-base text-gray-400 font-normal'>/ day</span>
                    </p>
                    <hr className='border-borderColor' /> 
                    <div className='flex flex-col gap-2'>
                        <label className="font-medium text-gray-700">Pickup Date</label>
                        <input type="date" className='border border-borderColor px-3 py-2 rounded-lg outline-primary' required 
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setStartDate(e.target.value)} value={startDate}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className="font-medium text-gray-700">Dropoff Date</label>
                        <input type="date" className='border border-borderColor px-3 py-2 rounded-lg outline-primary' required 
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setEndDate(e.target.value)} value={endDate}
                        />
                    </div>
                    <motion.button 
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' , delay: 0.2 }}
                    className='w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-lg cursor-pointer shadow-md'>
                        Book Now
                    </motion.button>
                    <p className='text-center text-xs text-gray-400'>No credit card required for reservation request</p>
                </motion.form>
            </div>
        </div>
    ) : <div className='h-[50vh] flex items-center justify-center'>Car not found</div>
}

export default CarDetails