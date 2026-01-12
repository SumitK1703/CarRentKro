import React, { useState } from 'react';
import { assets } from '../../assets/assets.js';
import Title from '../../components/Title.jsx';
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';

const AddCar = () => {
    const { axios, currency } = useAppContext();
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // ✅ FIXED: State keys now match Backend Mongoose Schema exactly
    const [car, setCar] = useState({
        brand: '',
        model: '',
        year: 0,
        PricePerDay: 0,      // Matched Backend (Capital P)
        category: '',
        transmission: '',
        fuel_Type: '',       // Matched Backend (Capital T)
        seating_Capacity: 0, // Matched Backend (Capital C)
        location: '',
        description: '',
    });

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        if (isLoading) return;
        
        // Basic Validation
        if (!image) {
            toast.error("Please upload a car image");
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('carData', JSON.stringify(car));

            const { data } = await axios.post('/api/owner/add-car', formData, {
                 headers: { token: localStorage.getItem('token') }
            });

            if (data?.success) {
                toast.success("Car added successfully");
                // Reset form
                setCar({
                    brand: '',
                    model: '',
                    year: 0,
                    PricePerDay: 0,
                    category: '',
                    transmission: '',
                    fuel_Type: '',
                    seating_Capacity: 0,
                    location: '',
                    description: '',
                });
                setImage(null);
            } else {
                toast.error(data?.message || "Failed to add car");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error adding car: " + (error.response?.data?.message || error.message));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='px-4 py-10 md:px-10 flex-1'>
            <Title title="Add New Car" subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications." />
            
            <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>
                
                {/* Image Upload */}
                <div className='flex items-center gap-2 w-full'>
                    <label htmlFor="car-image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="Car" className='h-14 rounded cursor-pointer object-cover' />
                        <input type="file" id="car-image" accept="image/*" hidden onChange={e => setImage(e.target.files[0])} />
                    </label>
                    <p className='text-sm text-gray-500'>Upload a picture of your car</p>
                </div>

                {/* Row 1: Brand & Model */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='flex flex-col w-full'>
                        <label>Brand</label>
                        <input type="text" placeholder="e.g. BMW" required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' 
                            value={car.brand} onChange={e => setCar({ ...car, brand: e.target.value })} />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label>Model</label>
                        <input type="text" placeholder="e.g. X5" required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' 
                            value={car.model} onChange={e => setCar({ ...car, model: e.target.value })} />
                    </div>
                </div>

                {/* Row 2: Year, Price, Category */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    <div className='flex flex-col w-full'>
                        <label>Year</label>
                        <input type="number" placeholder="2026" required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' 
                            value={car.year} onChange={e => setCar({ ...car, year: e.target.value })} />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label>Price Per Day ({currency})</label>
                        {/* ✅ FIXED: Key is PricePerDay */}
                        <input type="number" placeholder="100" required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' 
                            value={car.PricePerDay} onChange={e => setCar({ ...car, PricePerDay: e.target.value })} />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label>Category</label>
                        <select onChange={e => setCar({ ...car, category: e.target.value })} value={car.category} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                            <option value="">Select Category</option>
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Van">Van</option>
                        </select>
                    </div>
                </div>

                {/* Row 3: Transmission, Fuel, Seats */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    <div className='flex flex-col w-full'>
                        <label>Transmission</label>
                        <select onChange={e => setCar({ ...car, transmission: e.target.value })} value={car.transmission} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                            <option value="">Select Transmission</option>
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Semi-Automatic">Semi-Automatic</option>
                        </select>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label>Fuel Type</label>
                        {/* ✅ FIXED: Key is fuel_Type */}
                        <select onChange={e => setCar({ ...car, fuel_Type: e.target.value })} value={car.fuel_Type} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                            <option value="">Select Fuel</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label>Seating Capacity</label>
                        {/* ✅ FIXED: Key is seating_Capacity */}
                        <input type="number" placeholder="4" required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' 
                            value={car.seating_Capacity} onChange={e => setCar({ ...car, seating_Capacity: e.target.value })} />
                    </div>
                </div>

                {/* Location & Description */}
                <div className='flex flex-col w-full'>
                    <label>Location</label>
                    <select onChange={e => setCar({ ...car, location: e.target.value })} value={car.location} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                        <option value="">Select Location</option>
                        <option value="New York">New York</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Chicago">Chicago</option>
                        <option value="Las Vegas">Las Vegas</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                    </select>
                </div>
                <div className='flex flex-col w-full'>
                    <label>Description</label>
                    <textarea rows={5} placeholder="Enter car description" required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' 
                        value={car.description} onChange={e => setCar({ ...car, description: e.target.value })} />
                </div>

                <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer disabled:bg-gray-400' disabled={isLoading}>
                    <img src={assets.tick_icon} alt="" className="w-4" />
                    {isLoading ? "Adding..." : "List Your Car"}
                </button>
            </form>
        </div>
    );
};

export default AddCar;