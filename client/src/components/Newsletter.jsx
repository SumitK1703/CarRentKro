// import React from 'react'
// const Newsletter = () => {
//   return (
//     <div className="flex flex-col items-center justify-center text-center space-y-2 max-md: px-4 my-10 mb-40">
//             <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Deal!</h1>
//             <p className="md:text-lg text-gray-500/70 pb-8">
//                 Subscribe to get the latest offers, new arrivals, and exclusive discounts
//             </p>
//             <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
//                 <input
//                     className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
//                     type="text"
//                     placeholder="Enter your email id"
//                     required
//                 />
//                 <button type="submit" className="md:px-12 px-8 h-full text-white bg-primary hover:bg-indigo-600 transition-all cursor-pointer rounded-md rounded-l-none">
//                     Subscribe
//                 </button>
//             </form>
//         </div> 
//   )
// }
// export default Newsletter
import React from 'react'

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 px-4 py-16 bg-white">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Never Miss a Deal!</h1>
            <p className="text-gray-500 text-lg max-w-xl pb-6">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts delivered straight to your inbox.
            </p>
            
            <form className="flex items-center justify-between w-full max-w-lg h-14 border border-gray-300 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                <input
                    className="flex-1 h-full px-6 text-gray-600 outline-none placeholder-gray-400"
                    type="email"
                    placeholder="Enter your email address"
                    required
                />
                <button type="submit" className="px-8 h-full bg-primary hover:bg-primary-dull text-white font-medium transition-colors cursor-pointer text-sm md:text-base">
                    Subscribe
                </button>
            </form>
            <p className='text-xs text-gray-400 mt-4'>We respect your privacy. Unsubscribe at any time.</p>
    </div> 
  )
}

export default Newsletter