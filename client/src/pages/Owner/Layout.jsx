import React, { use , useEffect} from 'react'
import OwnerNav from '../../components/Owner/OwnerNav'
import Sidebar from '../../components/Owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
const Layout = () => {
  const {isOwner,navigate}=useAppContext();
  useEffect(()=>{
    if(isOwner===false){
        navigate('/');
    }

   },[isOwner]);
  return (
    <div className='flex flex-col'>
        <OwnerNav/>
        <div className='flex'>
            <Sidebar/>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout