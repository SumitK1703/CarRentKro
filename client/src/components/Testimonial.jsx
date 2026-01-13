// import React from 'react'

// const Testimonial = () => {
//   return (
//     <div className="flex flex-col items-center text-center">
//             <h1 className="text-4xl font-bold max-w-[740px] mb-[72px]">Trusted by <span className="text-blue-600">30k+</span> world class companies & design teams</h1>
//             <div className="flex flex-wrap items-center justify-center gap-4">
//                 <div className="flex flex-col items-center bg-white px-3 py-8 rounded-lg border border-gray-300/80 max-w-[272px] text-sm text-center text-gray-500">
//                     <div className="relative mb-4">
//                         <img className="h-16 w-16 rounded-full" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png" alt="userImage1" />
//                         <svg className="absolute top-0 -right-2" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="10.5" cy="10.5" r="8.5" fill="#2563EB"/>
//                             <path d="m11.584 13.872 1.752-3.288 1.104-.288a2.7 2.7 0 0 1-.432.576.76.76 0 0 1-.552.24q-.672 0-1.248-.576t-.576-1.464q0-.936.624-1.584.648-.672 1.584-.672.888 0 1.536.672.672.648.672 1.584 0 .384-.168.912-.144.504-.576 1.296l-1.92 3.552zm-5.4 0 1.752-3.288 1.08-.288a2.2 2.2 0 0 1-.408.576.76.76 0 0 1-.552.24q-.696 0-1.272-.576t-.576-1.464q0-.936.624-1.584.648-.672 1.584-.672.888 0 1.536.672.672.648.672 1.584 0 .384-.144.912-.144.504-.576 1.296L7.96 14.832z" fill="#fff"/>
//                         </svg>
//                     </div>
//                     <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud  aliquip”</p>
//                     <p className="text-lg text-gray-800 font-medium mt-5">Donald Jackman</p>
//                     <p className="text-xs">Content Creator</p>
//                 </div>
//                 <div className="flex flex-col items-center bg-white px-3 py-8 rounded-lg border border-gray-300/80 max-w-[272px] text-sm text-center text-gray-500">
//                     <div className="relative mb-4">
//                         <img className="h-16 w-16 rounded-full" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage2.png" alt="userImage2" />
//                         <svg className="absolute top-0 -right-2" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="10.5" cy="10.5" r="8.5" fill="#2563EB"/>
//                             <path d="m11.584 13.872 1.752-3.288 1.104-.288a2.7 2.7 0 0 1-.432.576.76.76 0 0 1-.552.24q-.672 0-1.248-.576t-.576-1.464q0-.936.624-1.584.648-.672 1.584-.672.888 0 1.536.672.672.648.672 1.584 0 .384-.168.912-.144.504-.576 1.296l-1.92 3.552zm-5.4 0 1.752-3.288 1.08-.288a2.2 2.2 0 0 1-.408.576.76.76 0 0 1-.552.24q-.696 0-1.272-.576t-.576-1.464q0-.936.624-1.584.648-.672 1.584-.672.888 0 1.536.672.672.648.672 1.584 0 .384-.144.912-.144.504-.576 1.296L7.96 14.832z" fill="#fff"/>
//                         </svg>
//                     </div>
//                     <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud  aliquip”</p>
//                     <p className="text-lg text-gray-800 font-medium mt-5">Richard Nelson</p>
//                     <p className="text-xs">Content Writer</p>
//                 </div>
//                 <div className="flex flex-col items-center bg-white px-3 py-8 rounded-lg border border-gray-300/80 max-w-[272px] text-sm text-center text-gray-500">
//                     <div className="relative mb-4">
//                         <img className="h-16 w-16 rounded-full" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage3.png" alt="userImage3" />
//                         <svg className="absolute top-0 -right-2" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="10.5" cy="10.5" r="8.5" fill="#2563EB"/>
//                             <path d="m11.584 13.872 1.752-3.288 1.104-.288a2.7 2.7 0 0 1-.432.576.76.76 0 0 1-.552.24q-.672 0-1.248-.576t-.576-1.464q0-.936.624-1.584.648-.672 1.584-.672.888 0 1.536.672.672.648.672 1.584 0 .384-.168.912-.144.504-.576 1.296l-1.92 3.552zm-5.4 0 1.752-3.288 1.08-.288a2.2 2.2 0 0 1-.408.576.76.76 0 0 1-.552.24q-.696 0-1.272-.576t-.576-1.464q0-.936.624-1.584.648-.672 1.584-.672.888 0 1.536.672.672.648.672 1.584 0 .384-.144.912-.144.504-.576 1.296L7.96 14.832z" fill="#fff"/>
//                         </svg>
//                     </div>
//                     <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud  aliquip”</p>
//                     <p className="text-lg text-gray-800 font-medium mt-5">James Washington</p>
//                     <p className="text-xs">Content Marketing</p>
//                 </div>
//             </div>
//         </div>
//   )
// }

// export default Testimonial
import React from 'react'
import {motion} from 'motion/react';
const Testimonial = () => {
    const testimonials = [
        {
            name: "Emma Rodriguez",
            location: "Barcelona, Spain",
            image: "https://randomuser.me/api/portraits/women/44.jpg", // Placeholder or use assets
            text: "We rented cars from various companies, but the experience with CarRental was exceptional. The booking process was smooth and the car was in perfect condition.",
            rating: 5
        },
        {
            name: "John Smith",
            location: "New York, USA",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            text: "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic! Highly recommended for business trips.",
            rating: 5
        },
        {
            name: "Ava Johnson",
            location: "Sydney, Australia",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            text: "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service. Will definitely use them again.",
            rating: 5
        }
    ];

  return (
    <div className="flex flex-col items-center text-center py-16 px-6 bg-white">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h1>
            <p className="text-gray-500 max-w-2xl mb-12 text-lg">
                Discover why discerning travelers choose CarRental for their luxury accommodations around the world.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
                {testimonials.map((item, index) => (
                    <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.3 }}
                    key={index} className="bg-white rounded-xl shadow-[0px_10px_40px_rgba(0,0,0,0.05)] p-8 border border-gray-100 text-left hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <img className="h-14 w-14 rounded-full object-cover border-2 border-gray-100" src={item.image} alt={item.name} />
                            <div>
                                <h3 className="font-bold text-gray-900">{item.name}</h3>
                                <p className="text-xs text-gray-500">{item.location}</p>
                            </div>
                        </div>
                        
                        <div className="flex gap-1 mb-4">
                            {[...Array(item.rating)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            ))}
                        </div>

                        <p className="text-gray-600 leading-relaxed text-sm">"{item.text}"</p>
                    </motion.div>
                ))}
            </div>
    </div>
  )
}

export default Testimonial