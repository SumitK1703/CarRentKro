// import { createContext,use,useContext } from "react";
// import axios from "axios";
// import {toast} from "react-hot-toast";
// import { useState,useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {

//     const navigate=useNavigate();
//     const currency=import.meta.env.VITE_CURRENCY;
//     const [token,setToken]=useState(null);
//     const [user,setUser]=useState(null);
//     const [showLogin,setShowLogin]=useState(false);
//     const [isOwner,setIsOwner]=useState(null);
//     const [pickupDate,setPickupDate]=useState(null);
//     const [dropoffDate,setDropoffDate]=useState(null);
//     const [cars,setCars]=useState([]);

//     const fetchUser=async()=>{
//         try{
//             const {data}=await axios.get('/api/user/data')
//             if(data?.success){
//                 setUser(data.user);
//                 setIsOwner(data.user.role==='owner');
//             }
//             else{
//                 navigate('/');
//             }
//         }
//         catch(error){
//             console.log("Error fetching user:",error);
//             toast.error("Failed to fetch user data");
//         }
//     }

//     const fetchCars=async()=>{
//         try{
//             const {data}=await axios.get('/api/user/cars');
//             if(data?.success){
//                 setCars(data.cars);
//             }
//             else{
//                 toast.error("Failed to fetch cars");
//             }
//         } catch(error){
//             console.log("Error fetching cars:",error);
//             toast.error("Failed to fetch cars",error.message);
//         }
//     }

//     const logout=()=>{
//         localStorage.removeItem('token');
//         setToken(null);
//         setUser(null);
//         setIsOwner(false);
//         navigate('/');

//         axios.defaults.headers.common['Authorization']='';
//         toast.success("Logged out successfully");
//     }

//     //useEffect to retrieve tokens from localStorage
//     useEffect(()=>{
//         const token=localStorage.getItem('token');
//         setToken(token);
//         fetchCars();
//     },[]);

//     //useEffect to fetch user data when token is available
//     useEffect(()=>{
//         if(token){
//             axios.defaults.headers.common['Authorization']=token;
//             fetchUser();
//             fetchCars();
//         }
//     },[token]);

//     const value = {
//         navigate,currency,token,user,showLogin,isOwner,setToken,setUser,setShowLogin,pickupDate,setPickupDate,dropoffDate,setDropoffDate,cars,setCars,axios,logout,setIsOwner, fetchUser
        
//     }


//     return (
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//     )
// }

// export const useAppContext = () => {
//     return useContext(AppContext);
// }

//UPDATE 2


// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//     const navigate = useNavigate();
//     const currency = import.meta.env.VITE_CURRENCY;
//     const [token, setToken] = useState(null);
//     const [user, setUser] = useState(null);
//     const [showLogin, setShowLogin] = useState(false);
//     const [isOwner, setIsOwner] = useState(false); // Default to false
    
//     // ✅ FIX 1: Initialize with "" to prevent uncontrolled input errors
//     // ✅ FIX 2: Renamed to pickUpDate (capital U) to match Cars.jsx query params
//     const [pickUpDate, setPickUpDate] = useState("");
//     const [dropoffDate, setDropoffDate] = useState("");
    
//     const [cars, setCars] = useState([]);

//     const fetchUser = async () => {
//         try {
//             const { data } = await axios.get('/api/user/data');
//             if (data?.success) {
//                 setUser(data.user);
//                 setIsOwner(data.user.role === 'owner');
//             } else {
//                 // Handle invalid token case logic if needed
//             }
//         } catch (error) {
//             console.log("Error fetching user:", error);
//             // toast.error("Failed to fetch user data");
//         }
//     }

//     const fetchCars = async () => {
//         try {
//             const { data } = await axios.get('/api/user/cars');
//             if (data?.success) {
//                 setCars(data.cars);
//             } else {
//                 toast.error("Failed to fetch cars");
//             }
//         } catch (error) {
//             console.log("Error fetching cars:", error);
//             toast.error("Failed to fetch cars");
//         }
//     }

//     const logout = () => {
//         localStorage.removeItem('token');
//         setToken(null);
//         setUser(null);
//         setIsOwner(false);
//         navigate('/');
//         delete axios.defaults.headers.common['Authorization'];
//         toast.success("Logged out successfully");
//     }

//     useEffect(() => {
//         const storedToken = localStorage.getItem('token');
//         if (storedToken) {
//             setToken(storedToken);
//             axios.defaults.headers.common['Authorization'] = storedToken;
//             fetchUser();
//         }
//         fetchCars();
//     }, []);

//     // Only re-fetch user if token changes
//     useEffect(() => {
//         if (token) {
//             axios.defaults.headers.common['Authorization'] = token;
//             fetchUser();
//         }
//     }, [token]);

//     const value = {
//         navigate, currency, token, user, showLogin, isOwner, 
//         setToken, setUser, setShowLogin, setIsOwner,
//         // ✅ Exporting the fixed date states
//         pickUpDate, setPickUpDate, 
//         dropoffDate, setDropoffDate, 
//         cars, setCars, axios, logout, fetchUser
//     };

//     return (
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//     )
// }

// export const useAppContext = () => {
//     return useContext(AppContext);
// }


//UPDATE 3
// ... imports
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY;
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    
    // ✅ Search States (Initialized as empty strings to fix controlled input errors)
    const [pickUpDate, setPickUpDate] = useState("");
    const [dropoffDate, setDropoffDate] = useState("");
    
    const [cars, setCars] = useState([]);

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/data');
            if (data?.success) {
                setUser(data.user);
                setIsOwner(data.user.role === 'owner');
            } else {
                // navigate('/');
            }
        } catch (error) {
            console.log("Error fetching user:", error);
        }
    }

    const fetchCars = async () => {
        try {
            const { data } = await axios.get('/api/user/cars');
            if (data?.success) {
                setCars(data.cars);
            } else {
                toast.error("Failed to fetch cars");
            }
        } catch (error) {
            console.log("Error fetching cars:", error);
            toast.error("Failed to fetch cars");
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsOwner(false);
        navigate('/');
        delete axios.defaults.headers.common['Authorization'];
        toast.success("Logged out successfully");
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.common['Authorization'] = storedToken;
            fetchUser();
        }
        fetchCars();
    }, []);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = token;
            fetchUser();
        }
    }, [token]);

    const value = {
        navigate, currency, token, user, showLogin, isOwner, 
        setToken, setUser, setShowLogin, setIsOwner,
        // ✅ Exporting Date States
        pickUpDate, setPickUpDate, 
        dropoffDate, setDropoffDate, 
        cars, setCars, axios, logout, fetchUser
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}