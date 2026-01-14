
// import React, { useState, useEffect } from 'react'
// import Title from '../components/Title'
// import { assets } from '../assets/assets.js'
// import CarCard from '../components/CarCard.jsx'
// import { useSearchParams } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { useAppContext } from '../context/AppContext.jsx';
// import { motion } from 'motion/react';

// const Cars = () => {
//   const [searchParams] = useSearchParams();
//   const pickupLocation = searchParams.get('pickupLocation');
//   const pickUpDate = searchParams.get('pickUpDate');
//   const dropoffDate = searchParams.get('dropoffDate');

//   const { cars, axios } = useAppContext(); 

//   const isSearchData = pickupLocation && pickUpDate && dropoffDate;
  
//   // 1. Store the list of cars (either all cars or search results)
//   const [availableCars, setAvailableCars] = useState([]);
  
//   // 2. Store the text typed in the local search bar
//   const [searchTerm, setSearchTerm] = useState('');

//   // Fetch data based on URL Params (Location/Date)
//   const searchCarAvailability = async () => {
//     try {
//         const { data } = await axios.get('/api/user/cars/search', { 
//             params: { location: pickupLocation, pickUpDate, dropoffDate }
//         });
        
//         if (data.success) {
//             setAvailableCars(data.availableCars);
//             if (data.availableCars.length === 0) {
//                 toast("No cars available for these dates/location.");
//             }
//         }
//     } catch (error) {
//         console.error(error);
//         toast.error("Failed to fetch available cars");
//     }
//   }

//   // Initial Load: Either fetch specific availability OR show all cars
//   useEffect(() => {
//     if (isSearchData) {
//         searchCarAvailability();
//     } else {
//         setAvailableCars(cars || []); // Default to all cars if no URL params
//     }
//   }, [isSearchData, cars, pickupLocation, pickUpDate, dropoffDate]);

//   // 3. FILTER LOGIC: Filter 'availableCars' based on 'searchTerm'
//   const carsToDisplay = availableCars.filter(car => {
//     const term = searchTerm.toLowerCase();
    
//     // Safely access properties to handle potential naming inconsistencies
//     const brand = (car.brand || "").toLowerCase();
//     const model = (car.model || "").toLowerCase();
//     const category = (car.category || "").toLowerCase();
//     const transmission = (car.transmission || "").toLowerCase();
//     // Handle potential casing differences in DB fields
//     const fuelType = (car.fuel_Type || car.fuel_type || "").toLowerCase();
//     const location = (car.location || "").toLowerCase();

//     return (
//         brand.includes(term) || 
//         model.includes(term) ||
//         category.includes(term) ||
//         transmission.includes(term) ||
//         fuelType.includes(term) ||
//         location.includes(term)
//     );
//   });

//   return (
//     <div>
//       <motion.div 
//       initial={{ y: 30, opacity: 0 }}
//       whileInView={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className='flex flex-col items-center py-20 bg-light max-md:px-4'>
//           <Title title="Our Cars" subTitle="Explore our exclusive collection of luxury cars available for rent." align="center"/>
          
//           <motion.div 
//           initial={{ y: 20, opacity: 0 }}
//           whileInView={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow' >
//             <img src={assets.search_icon} alt="" className='w-4.5 h-4.5 mr-2'/>
            
//             <input 
//                 type="text" 
//                 placeholder='Search by Location, Brand, Model, Type...' 
//                 onChange={(e)=> setSearchTerm(e.target.value)} 
//                 value={searchTerm} 
//                 className='w-full h-full outline-none text-gray-500'
//             />
//             <img src={assets.filter_icon} alt="" className='w-4.5 h-4.5 ml-2'/>
//           </motion.div>
//       </motion.div>

//       <div className='px-6 md:px-16 lg:px-24 xl:px-32 mb-10'>
//         <motion.div 
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.6, ease: 'easeOut' }}
//         className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>
          
//           <p className='mb-4'>Showing {carsToDisplay.length} results</p>
          
//           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:px-20 max-w-7xl mx-auto'>
//             {carsToDisplay.length > 0 ? (
//                 carsToDisplay.map((car, index)=> ( 
//                   <motion.div 
//                   initial={{ scale: 0.95, opacity: 0, y: 20 }}
//                   whileInView={{ scale: 1, opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
//                   key={index}>
//                     <CarCard car={car}/>
//                   </motion.div>
//                 ))
//             ) : (
//                 <p className="col-span-full text-center py-10">No cars found matching "{searchTerm}"</p>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// export default Cars

import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets.js'
import CarCard from '../components/CarCard.jsx'
import { useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext.jsx';
import { motion } from 'motion/react';

const Cars = () => {
  const [searchParams] = useSearchParams();
  
  // 1. Get query params
  const pickupLocation = searchParams.get('pickupLocation');
  const pickUpDate = searchParams.get('pickUpDate');
  const dropoffDate = searchParams.get('dropoffDate');
  const globalSearch = searchParams.get('search'); // Capture 'honda' from URL

  const { cars, axios } = useAppContext(); 

  const isSearchData = pickupLocation && pickUpDate && dropoffDate;
  
  const [availableCars, setAvailableCars] = useState([]);
  
  // 2. Set initial search term from URL
  const [searchTerm, setSearchTerm] = useState(globalSearch || '');

  // 3. Keep local state in sync with URL changes
  useEffect(() => {
    if (globalSearch) {
        setSearchTerm(globalSearch);
    }
  }, [globalSearch]);

  const searchCarAvailability = async () => {
    try {
        const { data } = await axios.get('/api/user/cars/search', { 
            params: { location: pickupLocation, pickUpDate, dropoffDate }
        });
        
        if (data.success) {
            setAvailableCars(data.availableCars);
            if (data.availableCars.length === 0) {
                toast("No cars available for these dates/location.");
            }
        }
    } catch (error) {
        console.error(error);
        toast.error("Failed to fetch available cars");
    }
  }

  // 4. Load Data Logic
  useEffect(() => {
    if (isSearchData) {
        searchCarAvailability();
    } else {
        // If not date searching, show all cars (filtering happens below)
        setAvailableCars(cars || []);
    }
  }, [isSearchData, cars, pickupLocation, pickUpDate, dropoffDate]);

  // 5. The Filter Logic (Applies to the 'availableCars')
  const carsToDisplay = availableCars.filter(car => {
    const term = searchTerm.toLowerCase();
    
    const brand = (car.brand || "").toLowerCase();
    const model = (car.model || "").toLowerCase();
    const category = (car.category || "").toLowerCase();
    const transmission = (car.transmission || "").toLowerCase();
    const fuelType = (car.fuel_Type || car.fuel_type || "").toLowerCase();
    const location = (car.location || "").toLowerCase();

    return (
        brand.includes(term) || 
        model.includes(term) ||
        category.includes(term) ||
        transmission.includes(term) ||
        fuelType.includes(term) ||
        location.includes(term)
    );
  });

  return (
    <div>
      <motion.div 
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='flex flex-col items-center py-20 bg-light max-md:px-4'>
          <Title title="Our Cars" subTitle="Explore our exclusive collection of luxury cars available for rent." align="center"/>
          
          <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow' >
            <img src={assets.search_icon} alt="" className='w-4.5 h-4.5 mr-2'/>
            
            <input 
                type="text" 
                placeholder='Search by Location, Brand, Model, Type...' 
                onChange={(e)=> setSearchTerm(e.target.value)} 
                value={searchTerm} // Displays "Honda" in the input box
                className='w-full h-full outline-none text-gray-500'
            />
            <img src={assets.filter_icon} alt="" className='w-4.5 h-4.5 ml-2'/>
          </motion.div>
      </motion.div>

      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mb-10'>
        <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>
          
          <p className='mb-4'>Showing {carsToDisplay.length} results</p>
          
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:px-20 max-w-7xl mx-auto'>
            {carsToDisplay.length > 0 ? (
                carsToDisplay.map((car, index)=> ( 
                  <motion.div 
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  whileInView={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                  key={index}>
                    <CarCard car={car}/>
                  </motion.div>
                ))
            ) : (
                <p className="col-span-full text-center py-10">No cars found matching "{searchTerm}"</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Cars