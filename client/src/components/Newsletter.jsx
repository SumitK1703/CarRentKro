
import React from 'react'
import {motion} from 'motion/react';
const Newsletter = () => {
  return (
    <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.3 }}
    className="flex flex-col items-center justify-center text-center space-y-4 px-4 py-16 bg-white">
            <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-3xl md:text-4xl font-bold text-gray-900">Never Miss a Deal!</motion.h1>
            <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="text-gray-500 text-lg max-w-xl pb-6">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts delivered straight to your inbox.
            </motion.p>
            
            <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            className="flex items-center justify-between w-full max-w-lg h-14 border border-gray-300 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                <input
                    className="flex-1 h-full px-6 text-gray-600 outline-none placeholder-gray-400"
                    type="email"
                    placeholder="Enter your email address"
                    required
                />
                <button type="submit" className="px-8 h-full bg-primary hover:bg-primary-dull text-white font-medium transition-colors cursor-pointer text-sm md:text-base">
                    Subscribe
                </button>
            </motion.form>
            <p className='text-xs text-gray-400 mt-4'>We respect your privacy. Unsubscribe at any time.</p>
    </motion.div> 
  )
}

export default Newsletter