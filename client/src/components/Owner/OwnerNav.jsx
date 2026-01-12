import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const OwnerNav = () => {
    const {user}= useAppContext();
  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all'>
        <Link to='/' className='text-2xl font-semibold text-primary'>
            <img src={assets.logo} alt="" className='h-7'/>
        </Link>
        <p>Welcome, {user?.name || "Owner"}</p>
    </div>
  )
}

export default OwnerNav