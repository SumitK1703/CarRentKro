// import React from 'react'
// import Navbar from './components/Navbar'
// import { Route, useLocation } from 'react-router-dom';
// import { Routes } from 'react-router-dom';
// import Home from './pages/Home'
// import Cars from './pages/Cars'
// import CarDetails from './pages/CarDetails'
// import MyBookings from './pages/MyBookings'
// import Footer from './components/Footer'
// import Layout from './pages/Owner/Layout';
// import Dashboard from './pages/Owner/Dashboard';
// import ManageCars from './pages/Owner/ManageCars';
// import ManageBookings from './pages/Owner/ManageBookings';
// import AddCar from './pages/Owner/AddCar';
// import Login from './components/Login';
// import { Toaster } from 'react-hot-toast';
// import { useAppContext } from './context/AppContext';
// import ProtectedRoute from './components/ProtectedRoute';
// function App() {
//   const {showLogin} = useAppContext();
//   const isOwnerPath=useLocation().pathname.startsWith('/owner');
//   return (
//     <>
//     <Toaster/>
//       {showLogin && <Login/>}
//       {!isOwnerPath && <Navbar/>}
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/cars' element={<Cars />} />
//         <Route path='/car-details/:id' element={<CarDetails />} />
        
//         {/* ✅ SECURED: My Bookings */}
//         <Route path='/my-bookings' element={
//           <ProtectedRoute>
//             <MyBookings />
//           </ProtectedRoute>
//         } />

//         {/* ✅ SECURED: Owner Routes (Double protection with Layout) */}
//         <Route path='/owner' element={
//           <ProtectedRoute>
//             <Layout />
//           </ProtectedRoute>
//         }>
//           <Route index element={<Dashboard />} />
//           <Route path='manage-cars' element={<ManageCars />} />
//           <Route path='manage-bookings' element={<ManageBookings />} />
//           <Route path='add-car' element={<AddCar />} />
//         </Route>
//       </Routes>
//       {!isOwnerPath && <Footer />}
//     </>
//   )
// }

// export default App

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
// 👇 IMPORT THE GUARD (Ensure this matches your actual filename)
import ProtectedRoute from './components/ProtectedRoutes'; 

function App() {
  const {showLogin} = useAppContext();
  const isOwnerPath = useLocation().pathname.startsWith('/owner');
  
  return (
    <>
      <Toaster/>
      {showLogin && <Login/>}
      {!isOwnerPath && <Navbar/>}
      <Routes>
        {/* PUBLIC ROUTES (Accessible by anyone) */}
        <Route path='/' element={<Home />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/car-details/:id' element={<CarDetails />} />
        
        {/* 🔒 SECURED ROUTES (Login Required) */}
        {/* We wrap <MyBookings /> inside <ProtectedRoute> */}
        <Route path='/my-bookings' element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        } />

        {/* 🔒 OWNER ROUTES (Login Required) */}
        <Route path='/owner' element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
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