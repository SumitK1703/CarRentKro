// import React from 'react'
// import { assets, cityList } from '../assets/assets.js'
// import { useState } from 'react'
// import { useAppContext } from '../context/AppContext.jsx';
// const Hero = () => {
//     const {pickUpDate, dropoffDate, setPickUpDate, setDropoffDate, navigate
//     } = useAppContext;
//     const [pickupLocation, setpickupLocation] = useState("")
//     const handleSearch=(e)=>{
//         e.preventDefault();
//         // console.log("Searching for cars at:", pickupLocation);
//         navigate('/cars?pickupLocation='+pickupLocation+'&pickUpDate='+pickUpDate+'&dropoffDate='+dropoffDate);
//     }
//   return (
//     <div className='h-screen flex flex-col items-center justify-center gap-14 bg-light text-center'>
//         <h1 className='text-4xl md:text-5xl font-semibold' >Luxury cars on Rent</h1>
//         <form className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md: rounded-full w-full max-w-80 md : max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>
//             <div className='flex flex-col md:flex-row items-start md:items-center gap-10 min-md: ml-8' >
//                 <div>
//                     <select required ={pickupLocation} onChange={(e) => setpickupLocation(e.target.value)} className='border-b border-borderColor pb-2 outline-none text-gray-600'>
//                         <option value="">Pick Up Location</option>
//                         {cityList.map((city) => <option key={city} value={city}>{city}</option>)}
//                     </select>
//                     <p className='px-1 text-sm text-gray-500'>{pickupLocation ? pickupLocation : "Please select location"}</p>
//                 </div>
//                 <div className='flex flex-col items-start gap-2'>
//                     <label htmlFor="pickup-date">Pick Up Date</label>
//                     <input value={pickUpDate} onChange={e=>setPickUpDate(e.target.value)} type="date" id="pickup-date" min={new Date().toISOString().split('T')[0]} className='text-sm text-gray-500' required />
//                 </div>
//                 <div className='flex flex-col items-start gap-2'>
//                     <label htmlFor="drop-date">Drop Date</label>
//                     <input value={dropoffDate} onChange={e=>setDropoffDate(e.target.value)} type="date" id="drop-date" min={new Date().toISOString().split('T')[0]} className='text-sm text-gray-500' required />
//                 </div>
                
//             </div>
//             <button className='flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer'>
//                     <img src={assets.search_icon} alt="search" className='brightness-300' />
//                     Search
//                 </button>
//         </form>
//         <img src={assets.main_car} alt="car" className='max-h-74'/>
//     </div>
//   )
// }

// export default Hero


// // UPDATE 2
// import React from 'react'
// import { assets, cityList } from '../assets/assets.js'
// import { useState } from 'react'
// import { useAppContext } from '../context/AppContext.jsx';

// const Hero = () => {
//     // FIX 1: Add parentheses () to call the hook
//     const { pickUpDate, dropoffDate, setPickUpDate, setDropoffDate, navigate } = useAppContext();
    
//     const [pickupLocation, setpickupLocation] = useState("")

//     const handleSearch = (e) => {
//         e.preventDefault();
        
//         if (!pickupLocation) {
//             alert("Please select a location");
//             return;
//         }

//         // console.log("Searching for cars at:", pickupLocation);
//         navigate('/cars?pickupLocation=' + pickupLocation + '&pickUpDate=' + pickUpDate + '&dropoffDate=' + dropoffDate);
//     }

//     return (
//         <div className='h-screen flex flex-col items-center justify-center gap-14 bg-light text-center'>
//             <h1 className='text-4xl md:text-5xl font-semibold' >Luxury cars on Rent</h1>
            
//             {/* FIX 2: Add onSubmit={handleSearch} here */}
//             <form 
//                 onSubmit={handleSearch} 
//                 className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md: rounded-full w-full max-w-80 md : max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'
//             >
//                 <div className='flex flex-col md:flex-row items-start md:items-center gap-10 min-md: ml-8' >
//                     <div>
//                         <select 
//                             value={pickupLocation} // Changed required={variable} to value={variable}
//                             onChange={(e) => setpickupLocation(e.target.value)} 
//                             className='border-b border-borderColor pb-2 outline-none text-gray-600'
//                             required // Add standard html required attribute
//                         >
//                             <option value="">Pick Up Location</option>
//                             {cityList.map((city) => <option key={city} value={city}>{city}</option>)}
//                         </select>
//                         <p className='px-1 text-sm text-gray-500'>{pickupLocation ? pickupLocation : "Please select location"}</p>
//                     </div>
//                     <div className='flex flex-col items-start gap-2'>
//                         <label htmlFor="pickup-date">Pick Up Date</label>
//                         <input value={pickUpDate} onChange={e => setPickUpDate(e.target.value)} type="date" id="pickup-date" min={new Date().toISOString().split('T')[0]} className='text-sm text-gray-500' required />
//                     </div>
//                     <div className='flex flex-col items-start gap-2'>
//                         <label htmlFor="drop-date">Drop Date</label>
//                         <input value={dropoffDate} onChange={e => setDropoffDate(e.target.value)} type="date" id="drop-date" min={new Date().toISOString().split('T')[0]} className='text-sm text-gray-500' required />
//                     </div>

//                 </div>
                
//                 {/* The button type defaults to "submit" inside a form, which triggers the form's onSubmit */}
//                 <button className='flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer'>
//                     <img src={assets.search_icon} alt="search" className='brightness-300' />
//                     Search
//                 </button>
//             </form>
//             <img src={assets.main_car} alt="car" className='max-h-74' />
//         </div>
//     )
// }

// export default Hero


// // UPDATE 3
import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets.js'
import { useAppContext } from '../context/AppContext.jsx';
import {motion} from 'motion/react';

const Hero = () => {
    // 1. Get ONLY navigate from Context (removed missing date states)
    const { navigate } = useAppContext();
    
    // 2. Define Local State for the form fields
    const [pickupLocation, setPickupLocation] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [dropoffDate, setDropoffDate] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        
        if (!pickupLocation) {
            alert("Please select a pickup location");
            return;
        }

        // 3. Navigate with the local state values
        // Note: 'pickUpDate' (camelCase) matches what Cars.jsx expects
        navigate(`/cars?pickupLocation=${pickupLocation}&pickUpDate=${pickupDate}&dropoffDate=${dropoffDate}`);
    }

    return (
        <motion.div
        initial={{opacity: 0 }}
        animate={{opacity: 1 }}
        transition={{ duration: 0.8 }}

         className='h-screen flex flex-col items-center justify-center gap-14 bg-light text-center'>
            <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
             className='text-4xl md:text-5xl font-semibold' >Luxury cars on Rent</motion.h1>
            
            <motion.form 
            initial={{ scale: 0.95, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSearch} className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md: rounded-full w-full max-w-80 md : max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>
                <div className='flex flex-col md:flex-row items-start md:items-center gap-10 min-md: ml-8' >
                    <div>
                        <select 
                            value={pickupLocation} 
                            onChange={(e) => setPickupLocation(e.target.value)} 
                            className='border-b border-borderColor pb-2 outline-none text-gray-600'
                            required
                        >
                            <option value="">Pick Up Location</option>
                            {cityList.map((city) => <option key={city} value={city}>{city}</option>)}
                        </select>
                    </div>
                    
                    <div className='flex flex-col items-start gap-2'>
                        <label htmlFor="pickup-date">Pick Up Date</label>
                        <input 
                            type="date" 
                            id="pickup-date" 
                            min={new Date().toISOString().split('T')[0]} 
                            className='text-sm text-gray-500' 
                            required 
                            value={pickupDate || ""} 
                            onChange={(e) => setPickupDate(e.target.value)}
                        />
                    </div>
                    
                    <div className='flex flex-col items-start gap-2'>
                        <label htmlFor="drop-date">Drop Date</label>
                        <input 
                            type="date" 
                            id="drop-date" 
                            min={new Date().toISOString().split('T')[0]} 
                            className='text-sm text-gray-500' 
                            required 
                            value={dropoffDate || ""}
                            onChange={(e) => setDropoffDate(e.target.value)}
                        />
                    </div>
                </div>
                
                <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                type="submit" className='flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer'>
                    <img src={assets.search_icon} alt="search" className='brightness-300' />
                    Search
                </motion.button>
            </motion.form>
            <motion.img
             initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}

             src={assets.main_car} alt="car" className='max-h-74'/>
        </motion.div>
    )
}

export default Hero