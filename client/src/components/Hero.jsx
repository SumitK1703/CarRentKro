
// // UPDATE 3
import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets.js'
import { useAppContext } from '../context/AppContext.jsx';
import {motion} from 'motion/react';
import { toast } from 'react-hot-toast';
const Hero = () => {
    // 1. Get ONLY navigate from Context (removed missing date states)
    const { navigate } = useAppContext();
    
    // 2. Define Local State for the form fields
    const [pickupLocation, setPickupLocation] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [dropoffDate, setDropoffDate] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        
        if (pickupDate && dropoffDate) {
            if (new Date(dropoffDate) < new Date(pickupDate)) {
                toast.error("Drop-off date cannot be earlier than pick-up date");
                return;
            }
        }

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


// // New
// import React, { useState, Suspense } from 'react'
// import { assets, cityList } from '../assets/assets.js'
// import { useAppContext } from '../context/AppContext.jsx';
// import { motion } from 'motion/react';

// // --- 3D Imports ---
// import { Canvas } from '@react-three/fiber'
// import { useGLTF, Stage, PresentationControls, OrbitControls } from '@react-three/drei'

// // --- 3D Model Component ---
// // function CarModel() {
// //   // 1. Load the new .glb file
// //   // 2. The 'true' argument enables the Draco decoder automatically
// //   const { scene } = useGLTF('/3d-car/car.glb', true) 
  
// //   // 3. Adjust scale if needed (GLB files sometimes have different scales than GLTF)
// //   return <primitive object={scene} scale={0.01} position={[0, -1, 0]} /> 
// // }

// const Hero = () => {
//     const { navigate } = useAppContext();
    
//     // Local State for form
//     const [pickupLocation, setPickupLocation] = useState("");
//     const [pickupDate, setPickupDate] = useState("");
//     const [dropoffDate, setDropoffDate] = useState("");

//     const handleSearch = (e) => {
//         e.preventDefault();
//         if (!pickupLocation) {
//             alert("Please select a pickup location");
//             return;
//         }
//         if (pickupDate && dropoffDate) {
//             if (new Date(dropoffDate) < new Date(pickupDate)) {
//                 toast.error("Drop-off date cannot be earlier than pick-up date");
//                 return;
//             }
//         }
//         navigate(`/cars?pickupLocation=${pickupLocation}&pickUpDate=${pickupDate}&dropoffDate=${dropoffDate}`);
//     }

//     return (
//         <motion.div
//             initial={{opacity: 0 }}
//             animate={{opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className='min-h-screen flex flex-col items-center justify-center gap-10 bg-light text-center pt-20 pb-10 overflow-hidden'
//         >
//             <motion.h1
//                 initial={{ y: 50, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className='text-4xl md:text-5xl font-semibold' 
//             >
//                 Luxury cars on Rent
//             </motion.h1>
            
//             {/* --- Search Form --- */}
//             <motion.form 
//                 initial={{ scale: 0.95, opacity: 0, y: 50 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//                 onSubmit={handleSearch} 
//                 className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-sm md:max-w-4xl bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)] z-10'
//             >
//                 <div className='flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 md:ml-8 w-full' >
//                     <div className='w-full md:w-auto'>
//                         <select 
//                             value={pickupLocation} 
//                             onChange={(e) => setPickupLocation(e.target.value)} 
//                             className='w-full border-b border-borderColor pb-2 outline-none text-gray-600 bg-transparent'
//                             required
//                         >
//                             <option value="">Pick Up Location</option>
//                             {cityList.map((city) => <option key={city} value={city}>{city}</option>)}
//                         </select>
//                     </div>
                    
//                     <div className='flex flex-col items-start gap-2 w-full md:w-auto'>
//                         <label htmlFor="pickup-date" className='text-xs text-gray-400'>Pick Up Date</label>
//                         <input 
//                             type="date" 
//                             id="pickup-date" 
//                             min={new Date().toISOString().split('T')[0]} 
//                             className='text-sm text-gray-600 w-full outline-none' 
//                             required 
//                             value={pickupDate || ""} 
//                             onChange={(e) => setPickupDate(e.target.value)}
//                         />
//                     </div>
                    
//                     <div className='flex flex-col items-start gap-2 w-full md:w-auto'>
//                         <label htmlFor="drop-date" className='text-xs text-gray-400'>Drop Date</label>
//                         <input 
//                             type="date" 
//                             id="drop-date" 
//                             min={new Date().toISOString().split('T')[0]} 
//                             className='text-sm text-gray-600 w-full outline-none' 
//                             required 
//                             value={dropoffDate || ""}
//                             onChange={(e) => setDropoffDate(e.target.value)}
//                         />
//                     </div>
//                 </div>
                
//                 <motion.button
//                     whileHover={{scale: 1.05}}
//                     whileTap={{scale: 0.95}}
//                     type="submit" 
//                     className='w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 mt-4 md:mt-0 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer transition-all'
//                 >
//                     <img src={assets.search_icon} alt="search" className='brightness-0 invert w-5' />
//                     Search
//                 </motion.button>
//             </motion.form>

//             {/* --- 3D Model Section --- */}
//             <motion.div
//                 initial={{ y: 100, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 1, delay: 0.5 }}
//                 className='w-full h-[400px] md:h-[500px] cursor-grab active:cursor-grabbing relative z-0'
//             >
//                 <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }} style={{ position: "absolute", top: 0 }}>
//                     <color attach="background" args={['#F1F5F9']} /> {/* Matches bg-light */}
                    
//                     {/* PresentationControls allow the user to rotate the car slightly */}
//                     <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
                        
//                         {/* Stage creates a professional studio lighting environment automatically */}
//                         <Stage environment="city" intensity={0.6} contactShadow={false}>
//                             <Suspense fallback={null}>
//                                 <CarModel />
//                             </Suspense>
//                         </Stage>
                        
//                     </PresentationControls>
//                 </Canvas>
//             </motion.div>

//             {/* --- Credits (Required by License) --- */}
//             <p className='text-[10px] text-gray-400 mt-[-20px] z-10'>
//                 3D Model: "Car Name" by Author (via Sketchfab)
//             </p>
//         </motion.div>
//     )
// }

// export default Hero