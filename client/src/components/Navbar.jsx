
// import React, { useState } from 'react'
// import { assets, menuLinks } from '../assets/assets'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { useAppContext } from '../context/AppContext'
// import toast from 'react-hot-toast';
// import {motion} from 'motion/react';
// function Navbar() {
//     const [navSearch, setNavSearch] = useState('');
//     const {setShowLogin, user, logout, isOwner, axios, setIsOwner} = useAppContext();
//     const location = useLocation();
//     const [open, setOpen] = useState(false);
//     const navigate = useNavigate();
//     const changeRole = async () => {
//         try {
//             const { data } = await axios.post('/api/owner/change-to-owner');
//             if (data.success) {
//                 setIsOwner(!isOwner);
//                 toast.success("Role changed successfully");
//             }
//         } catch (error) {
//             toast.error("Failed to change role", error.message);
//         }
//     }
//     const handleSearch = () => {
//         if (navSearch.trim()) {
//             navigate(`/cars?search=${encodeURIComponent(navSearch.trim())}`);
//             setNavSearch('');
//         }
//     }

//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             handleSearch();
//         }
//     }
//     return (
//         <motion.div 
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         duration={0.5}
//         className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all duration-300 bg-white z-50 ${location.pathname==="/"&&"max-sm:bg-white max-sm:translate-x-0"}`}>
//             <Link to="/">
//             <motion.img
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: "spring", stiffness: 300 }}
//             src={assets.logo} alt="logo" className='h-8' /></Link>
//             <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 bg-white sm:bg-transparent ${open ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"} sm:translate-x-0`}>
//                 {menuLinks.map((link,index)=>(
//                     <Link key={index} to={link.path} className='mx-4'>{link.name}</Link>
//                 ))}
                
//                 {/* 4. Update Search Input Section */}
//                 <div className='hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56'>
//                     <input 
//                         type="text" 
//                         className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" 
//                         placeholder='Search cars...' 
//                         value={navSearch}
//                         onChange={(e) => setNavSearch(e.target.value)}
//                         onKeyDown={handleKeyDown}
//                     />
//                     <img 
//                         src={assets.search_icon} 
//                         alt="search" 
//                         className="cursor-pointer hover:scale-110 transition-transform"
//                         onClick={handleSearch}
//                     />
//                 </div>

//                 <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>
//                     <button onClick={() => isOwner ? navigate('/owner'): changeRole()} className="cursor-pointer">{isOwner ? "Dashboard" : "List Cars"}</button>
    
//                     <button onClick={()=>{user ? logout() : setShowLogin(true)}} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg">{user ? "Logout" : "Login"}</button>
//                 </div>
//             </div>
//             <button className='sm:hidden cursor-pointer' aria-label="Menu" onClick={()=> setOpen(!open)}>
//                 <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
//             </button>
//         </motion.div>
//     )
// }
// export default Navbar

import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

function Navbar() {
    const {setShowLogin, user, logout, isOwner, axios, setIsOwner} = useAppContext();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    
    // 1. State for the search input
    const [navSearch, setNavSearch] = useState('');

   const changeRole = async () => {
    try {
        // ✅ CORRECT: This route is defined in ownerRouter
        const { data } = await axios.post('/api/owner/change-to-owner'); 
        if (data.success) {
            setIsOwner(!isOwner);
            toast.success("Role changed successfully");
        }
    } catch (error) {
        toast.error("Failed to change role", error.message);
    }
}

    // 2. The Search Action: Redirects to /cars with the query
    const handleSearch = () => {
        if (navSearch.trim()) {
            navigate(`/cars?search=${encodeURIComponent(navSearch.trim())}`);
            setOpen(false); // Close mobile menu if open
        }
    }

    // 3. Trigger search on 'Enter' key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        duration={0.5}
        className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all duration-300 bg-white z-50 ${location.pathname==="/"&&"max-sm:bg-white max-sm:translate-x-0"}`}>
            <Link to="/">
            <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            src={assets.logo} alt="logo" className='h-8' /></Link>
            
            <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 bg-white sm:bg-transparent ${open ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"} sm:translate-x-0`}>
                {menuLinks.map((link,index)=>(
                    <Link key={index} to={link.path} className='mx-4'>{link.name}</Link>
                ))}
                
                {/* 4. Search Input Field */}
                <div className='hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56'>
                    <input 
                        type="text" 
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" 
                        placeholder='Search cars...' 
                        value={navSearch}
                        onChange={(e) => setNavSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <img 
                        src={assets.search_icon} 
                        alt="search" 
                        className="cursor-pointer hover:scale-110 transition-transform"
                        onClick={handleSearch}
                    />
                </div>

                <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>
                    <button onClick={() => isOwner ? navigate('/owner'): changeRole()} className="cursor-pointer">{isOwner ? "Dashboard" : "List Cars"}</button>
                    <button onClick={()=>{user ? logout() : setShowLogin(true)}} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg">{user ? "Logout" : "Login"}</button>
                </div>
            </div>
            <button className='sm:hidden cursor-pointer' aria-label="Menu" onClick={()=> setOpen(!open)}>
                <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
            </button>
        </motion.div>
    )
}
export default Navbar