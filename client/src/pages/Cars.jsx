// import React, { use } from 'react'
// import Title from '../components/Title'
// import { assets, dummyCarData } from '../assets/assets.js'
// import { useState, useEffect } from 'react'
// import CarCard from '../components/CarCard.jsx'
// import { useSearchParams } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { useAppContext } from '../context/AppContext.jsx';
// const Cars = () => {
//   const [searchParams]=useSearchParams();
//   const pickupLocation=searchParams.get('pickupLocation');
//   const pickUpDate=searchParams.get('pickUpDate');
//   const dropoffDate=searchParams.get('dropoffDate');

//   const {cars,axios}=useAppContext();

//   const isSearchData= pickupLocation && pickUpDate && dropoffDate;
//   const [filteredCars, setFilteredCars] = useState();

//   const searchCarAvailability=async()=>{
//     const {data}=await axios.get('/api/user/cars/search',{location:pickupLocation,pickUpDate,dropoffDate});
//     if(data.success){
//       setFilteredCars(data.availableCars);
//       if(data.availableCars.length===0){
//         toast("No cars available for the selected criteria.");
//       }
//       return null;
//     }
//     toast.error("Failed to fetch available cars");
//   }

//   useEffect(()=>{
//     isSearchData && searchCarAvailability();
//   },[])
//   const [searchTerm, setSearchTerm] = useState('');
//   return (
//     <div>
//       <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
//           <Title title="Our Cars" subTitle="Explore our exclusive collection of luxury cars available for rent." align="center"/>
//           <div className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow' >
//             <img src={assets.search_icon} alt="" className='w-4.5 h-4.5 mr-2'/>
//             <input type="text" placeholder='Search by Make, Model or Features ' onClick={(e)=> setSearchTerm(e.target.value)} value={searchTerm} className='w-full h-full outline-none text-gray-500'/>
//             <img src={assets.filter_icon} alt="" className='w-4.5 h-4.5 ml-2'/>
//           </div>
//       </div>
//       <div className='px-6 md:px-16 lg:px-24 xl:px-32 mb-10'>
//         <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>
//           Showing {filteredCars.length} results
//           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
//             {
//               filteredCars.map((car,index)=> ( 
//                   <div key={index}>
//                     <CarCard car={car}/>
//                   </div>
//                 ))
//             }

//           </div>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Cars

//UPDATED 2
import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets.js'
import CarCard from '../components/CarCard.jsx'
import { useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext.jsx';
import {motion} from 'motion/react';

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('pickupLocation');
  const pickUpDate = searchParams.get('pickUpDate');
  const dropoffDate = searchParams.get('dropoffDate');

  const { cars, axios } = useAppContext(); // Get all cars from context

  const isSearchData = pickupLocation && pickUpDate && dropoffDate;
  
  // 1. Store the list of cars we got from Backend (or Context)
  const [availableCars, setAvailableCars] = useState([]);
  
  // 2. Store the text typed in the search bar
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data based on URL Params (Location/Date)
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

  // Initial Load: Either fetch specific availability OR show all cars
  useEffect(() => {
    if (isSearchData) {
        searchCarAvailability();
    } else {
        setAvailableCars(cars || []); // Default to all cars if no search params
    }
  }, [isSearchData, cars, pickupLocation, pickUpDate, dropoffDate]);

  // 3. FILTER LOGIC: Filter the 'availableCars' based on 'searchTerm'
  const carsToDisplay = availableCars.filter(car => 
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            
            {/* ✅ FIX: Changed onClick to onChange */}
            <input 
                type="text" 
                placeholder='Search by Make, Model...' 
                onChange={(e)=> setSearchTerm(e.target.value)} 
                value={searchTerm} 
                className='w-full h-full outline-none text-gray-500'
            />
            <img src={assets.filter_icon} alt="" className='w-4.5 h-4.5 ml-2'/>
          </motion.div>
      </motion.div>

      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mb-10'>
        <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' ,duration: 0.6 }}
        className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>
          
          <p className='mb-4'>Showing {carsToDisplay.length} results</p>
          
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:px-20 max-w-7xl mx-auto'>
            {/* ✅ FIX: Map over the FILTERED list, not the raw list */}
            {carsToDisplay.length > 0 ? (
                carsToDisplay.map((car, index)=> ( 
                  <motion.div 
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  whileInView={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.2 }}
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