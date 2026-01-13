// import React from 'react'
// import Title from './Title.jsx'
// import { useNavigate } from 'react-router-dom';
// import { assets, dummyCarData } from '../assets/assets.js';
// import CarCard from './CarCard.jsx';
// import { useAppContext } from '../context/AppContext.jsx';
// const FeaturedSection = () => {
//     const navigate = useNavigate();
//     const {axios, cars} =  useAppContext();
//   return (
//     <div className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32' >
//         <div>
//             <Title title="Featured Cars" subTitle="Discover our premium selection of luxury vehicles." align="center"/>
//         </div>
//         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'> 
// {
//             cars.slice(0,6).map((car)=> ( 
//                 <div key={car._id}>
//                     <CarCard car={car}/>
//                 </div>
//             ))
//             }
//         </div>
//         <button onClick={()=>{
//             navigate('cars/'); scrollto(0,0)
//         }}
//         className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'>
//             Explore all cars <img src={assets.arrow_icon} alt="arrow" />
//         </button>
//     </div>
//   )
// }

// export default FeaturedSection

// UPDATE 3

import React, { useContext } from 'react'
import Title from './Title.jsx'
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import CarCard from './CarCard.jsx';
import { AppContext } from '../context/AppContext.jsx'; // 1. Import Context
import {motion} from 'motion/react';

const FeaturedSection = () => {
    const navigate = useNavigate();
    // 2. Get real 'cars' from the context
    const { cars } = useContext(AppContext);

    return (
        <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32' >
            <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1,delay:0.5 }}>
                <Title title="Featured Cars" subTitle="Discover our premium selection of luxury vehicles." align="center"/>
            </motion.div>
            
            <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'> 
                {/* 3. Check if cars exist, then slice and map the REAL cars */}
                {cars && cars.length > 0 ? (
                    cars.slice(0, 6).map((car) => ( 
                        <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 /** cars.indexOf(car)*/ }}
                        
                        key={car._id}>
                            <CarCard car={car}/>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-center col-span-3 text-gray-500">No featured cars available at the moment.</p>
                )}
            </motion.div>

            <motion.button 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            onClick={()=>{
                navigate('/cars'); scrollTo(0,0)
            }}
            className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'>
                Explore all cars <img src={assets.arrow_icon} alt="arrow" />
            </motion.button>
        </motion.div>
    )
}

export default FeaturedSection