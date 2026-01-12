import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='bg-white text-gray-600 pt-16 pb-8 px-6 md:px-16 lg:px-24 xl:px-32'>
        {/* --- Top Section: 4 Columns --- */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
            
            {/* Column 1: Logo, Description & Socials */}
            <div className='flex flex-col gap-4'>
                <img src={assets.logo} alt="Car Rental Logo" className='h-8 w-auto self-start' />
                <p className='text-sm leading-relaxed text-gray-500'>
                    Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
                </p>
                <div className='flex gap-4 mt-2'>
                    {/* Facebook Icon */}
                    <svg className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                    {/* Instagram Icon */}
                    <svg className="w-5 h-5 cursor-pointer hover:text-pink-600 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    {/* Twitter/X Icon */}
                    <svg className="w-5 h-5 cursor-pointer hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
                    {/* Mail Icon */}
                    <svg className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
                <h3 className='font-bold text-gray-900 mb-4'>QUICK LINKS</h3>
                <ul className='flex flex-col gap-2 text-sm text-gray-500'>
                    <li><a href="/" className='hover:text-black transition-colors'>Home</a></li>
                    <li><a href="/cars" className='hover:text-black transition-colors'>Browse Cars</a></li>
                    <li><a href="#" className='hover:text-black transition-colors'>List Your Car</a></li>
                    <li><a href="#" className='hover:text-black transition-colors'>About Us</a></li>
                </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
                <h3 className='font-bold text-gray-900 mb-4'>RESOURCES</h3>
                <ul className='flex flex-col gap-2 text-sm text-gray-500'>
                    <li><a href="#" className='hover:text-black transition-colors'>Help Center</a></li>
                    <li><a href="#" className='hover:text-black transition-colors'>Terms of Service</a></li>
                    <li><a href="#" className='hover:text-black transition-colors'>Privacy Policy</a></li>
                    <li><a href="#" className='hover:text-black transition-colors'>Insurance</a></li>
                </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
                <h3 className='font-bold text-gray-900 mb-4'>CONTACT</h3>
                <ul className='flex flex-col gap-2 text-sm text-gray-500'>
                    <li>1234 Luxury Drive</li>
                    <li>San Francisco, CA 94107</li>
                    <li>+1 234 567 890</li>
                    <li>info@example.com</li>
                </ul>
            </div>
        </div>

        {/* --- Bottom Section: Copyright & Links --- */}
        <div className='border-t border-gray-200 mt-12 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500'>
            <p>© {new Date().getFullYear()} CarRental. All rights reserved.</p>
            <div className='flex gap-6 mt-4 md:mt-0'>
                <a href="#" className='hover:text-black'>Privacy</a>
                <span className="text-gray-300">|</span>
                <a href="#" className='hover:text-black'>Terms</a>
                <span className="text-gray-300">|</span>
                <a href="#" className='hover:text-black'>Cookies</a>
            </div>
        </div>
    </div>
  )
}

export default Footer