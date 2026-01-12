import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/Owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ManageCars = () => {
    const { isOwner, axios, currency } = useAppContext();
    const [cars, setCars] = useState([])

    const fetchOwnerCars = async () => {
        try {
            const { data } = await axios.get('/api/owner/cars');
            if (data.success) {
                setCars(data.cars);
            } else {
                toast.error("Failed to fetch cars");
            }
        } catch (error) {
            toast.error("Error fetching cars: " + error.message);
        }
    }

    const toggleAvailability = async (carId) => {
        try {
            const { data } = await axios.post('/api/owner/toggle-availability', { carId });
            
            if (data.success) {
                toast.success(data.message);
                setCars(prevCars => prevCars.map(car => 
                    car._id === carId ? { ...car, isAvailable: !car.isAvailable } : car
                ));
            } else {
                toast.error("Failed to toggle availability");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error toggling availability");
        }
    }

    const handleDelete = async (carId) => {
        if (!window.confirm("Are you sure you want to delete this car?")) return;

        try {
            const { data } = await axios.post('/api/owner/delete-car', { carId });

            if (data.success) {
                toast.success(data.message);
                setCars(prevCars => prevCars.filter(car => car._id !== carId));
            } else {
                toast.error("Failed to delete car");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting car");
        }
    }

    useEffect(() => {
        if (isOwner) {
            fetchOwnerCars();
        }
    }, [isOwner]);

    if (!isOwner) {
        return (
            <div className='px-4 pt-5 md:px-10 w-full'>
                <Title title="Access Denied" subTitle="You do not have permission to view this page." />
            </div>
        )
    }

    return (
        <div className='px-4 pt-5 md:px-10 w-full'>
            <Title title="Manage Cars" subTitle="View, edit, or remove your listed cars. Monitor bookings and availability to ensure optimal performance." />
            
            <div className='max-w-5xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
                <table className='w-full border-collapse text-left text-gray-600'>
                    <thead className='text-gray-500 bg-gray-50 border-b border-borderColor text-base'>
                        <tr>
                            <th className="p-4 font-medium">Car</th>
                            <th className="p-4 font-medium max-md:hidden">Category</th>
                            <th className="p-4 font-medium">Price</th>
                            <th className="p-4 font-medium max-md:hidden">Status</th>
                            <th className="p-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-base"> 
                        {cars.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-6 text-center text-gray-400">No cars listed yet.</td>
                            </tr>
                        ) : (
                            cars.map((car, index) => (
                                <tr key={index} className="border-t border-borderColor hover:bg-gray-50 transition-colors">
                                    <td className="p-4 flex items-center gap-4">
                                        <img src={car.image} alt="car" className='h-16 w-16 aspect-square rounded-md object-cover bg-gray-200' />
                                        <div className='max-md:hidden'>
                                            <p className='font-semibold text-gray-800 text-lg'>{car.brand} {car.model}</p>
                                            <p className='text-sm text-gray-500 mt-1'>{car.seating_Capacity} Seats • {car.transmission}</p>
                                        </div>
                                    </td>
                                    <td className='p-4 max-md:hidden'>{car.category}</td>
                                    <td className='p-4 font-medium text-lg'>{currency}{car.PricePerDay}<span className="text-sm text-gray-500 font-normal">/day</span></td>
                                    <td className='p-4 max-md:hidden'>
                                        <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${car.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {car.isAvailable ? "Available" : "Unavailable"}
                                        </span>
                                    </td>
                                    <td className='p-4'>
                                        <div className='flex items-center gap-5'>
                                            {/* ✅ UPDATED: Icons increased to w-8 h-8 (32px) */}
                                            <button 
                                                onClick={() => toggleAvailability(car._id)} 
                                                className="hover:bg-gray-200 p-2 rounded-full transition-colors cursor-pointer"
                                                title={car.isAvailable ? "Mark Unavailable" : "Mark Available"}
                                            >
                                                <img src={car.isAvailable ? assets.eye_icon : assets.eye_close_icon} alt="toggle" className='w-8 h-8' />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(car._id)} 
                                                className="hover:bg-red-100 p-2 rounded-full transition-colors cursor-pointer"
                                                title="Delete Car"
                                            >
                                                <img src={assets.delete_icon} alt="delete" className='w-8 h-8' />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageCars