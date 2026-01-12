import React from 'react'
import Navbar from './components/Navbar'
import { Route, useLocation } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Home from './pages/Home'
import Cars from './pages/Cars'
import CarDetails from './pages/CarDetails'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'
import Layout from './pages/Owner/Layout';
import Dashboard from './pages/Owner/Dashboard';
import ManageCars from './pages/Owner/ManageCars';
import ManageBookings from './pages/Owner/ManageBookings';
import AddCar from './pages/Owner/AddCar';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';

function App() {
  const {showLogin} = useAppContext();
  const isOwnerPath=useLocation().pathname.startsWith('/owner');
  return (
    <>
      <Toaster/>
      {showLogin && <Login/>}
      {!isOwnerPath && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/car-details/:id' element={<CarDetails />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/owner' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='manage-cars' element={<ManageCars />} />
          <Route path='manage-bookings' element={<ManageBookings />} />
          <Route path='add-car' element={<AddCar />} />
        </Route>
      </Routes>
      {!isOwnerPath && <Footer />}
    </>
  )
}

export default App