// import React from 'react'
// import { assets } from '../assets/assets.js'
// const Banner = () => {
//   return (
//     <div className='flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6x1 mx-3 md:mx-auto rounded-2x1 overflow-hidden'>
//         <div className='text-white'>
//             <h2 className='text-3x1 font-medium'>Do You Own a Luxury Car ?</h2>
//             <p className='mt-2'>Monetize your vehicle effortlessly by listing it on CarRental .</p>
//             <p className='max-w-130'>We take care of insurance, driver verification and secure payments - so you can earn passive income, stress-free . </p>         
//             <button className='px-6 py-2 bg-white hover:bg-slate-100 transition-all text-primary rounded-lg text-sm mt-4 cursor-pointer'>
//                 List your car
//             </button>
//         </div>
//         <img src={assets.banner_car_image} alt="car" className='max-h-45 mt-10'/>
//     </div>
//     )
// }

// export default Banner 
import React from 'react'
import { assets } from '../assets/assets.js'

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row md:items-start items-center justify-between px-6 md:px-14 py-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-4 md:mx-auto rounded-2xl overflow-hidden my-16'>
        <div className='text-white flex flex-col items-center md:items-start text-center md:text-left'>
            <h2 className='text-3xl md:text-4xl font-medium font-outfit'>Do You Own a Luxury Car?</h2>
            <p className='mt-2 text-lg opacity-90'>Monetize your vehicle effortlessly by listing it on CarRental.</p>
            <p className='max-w-[500px] mt-1 opacity-80 text-sm'>We take care of insurance, driver verification and secure payments - so you can earn passive income, stress-free.</p>         
            <button className='px-8 py-2.5 bg-white hover:bg-slate-100 transition-all text-primary font-medium rounded-lg text-sm mt-6 cursor-pointer shadow-lg'>
                List Your Car
            </button>
        </div>
        <img src={assets.banner_car_image} alt="car" className='w-full max-w-md md:max-w-sm object-contain mt-8 md:mt-0 hover:scale-105 transition-transform duration-500'/>
    </div>
  )
}

export default Banner