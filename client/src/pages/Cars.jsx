import React from 'react'
import Title from '../components/Title'
import { assets, dummyCarData } from '../assets/assets.js'
import { useState } from 'react'
import CarCard from '../components/CarCard.jsx'
const Cars = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div>
      <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
          <Title title="Our Cars" subTitle="Explore our exclusive collection of luxury cars available for rent." align="center"/>
          <div className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow' >
            <img src={assets.search_icon} alt="" className='w-4.5 h-4.5 mr-2'/>
            <input type="text" placeholder='Search by Make, Model or Features ' onClick={(e)=> setSearchTerm(e.target.value)} value={searchTerm} className='w-full h-full outline-none text-gray-500'/>
            <img src={assets.filter_icon} alt="" className='w-4.5 h-4.5 ml-2'/>
          </div>
      </div>
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mb-10'>
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>
          Showing {dummyCarData.length} results
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
            {
              dummyCarData.map((car,index)=> ( 
                  <div key={index}>
                    <CarCard car={car}/>
                  </div>
                ))
            }

          </div>
        </p>
      </div>
    </div>
  )
}

export default Cars