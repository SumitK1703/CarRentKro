// import Car from '../models/Car.js';
// import Booking from '../models/Booking.js';

// export const getAvailableCars = async (req, res) => {
//     try {
//         const { startDate, endDate } = req.body;
//         const requestedFrom = new Date(startDate);
//         const requestedTo = new Date(endDate);
//         const cars = await Car.find().populate('bookings');
//         const availableCars = cars.filter(car => {
//             return car.isAvailable && checkBookingAvailability(car, requestedFrom, requestedTo);
//         });
//         res.status(200).json(availableCars);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };



// const checkBookingAvailability = async (car, startDate, endDate) => {
//     const bookings = await Booking.find({ car, startDate: { $lt: endDate }, endDate: { $gt: startDate } });
//     return bookings.length === 0;
// };

// export const getAvailabilityOfCar = async (req, res) => {
//     try {
//         const {location, startDate, endDate} = req.body;

//         const cars = await Car.find({ location: location, isAvailable: true });

//         const availableCarsPromise=cars.map(async(car)=>{
//             const isAvailable=await checkBookingAvailability(car._id,startDate,endDate);
//             return {...car._doc,isAvailable:isAvailable};
//         });
//         let availableCars=await Promise.all(availableCarsPromise);
//         availableCars=availableCars.filter(car=>car.isAvailable===true);
//         res.status(200).json(availableCars);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const booking=async(req,res)=>{
//     try {
//         const {_id}=req.user;
//         const {carId,startDate,endDate}=req.body;
//         const car=await Car.findById(carId);
//         if(!car){
//             return res.status(404).json({message:"Car not found"});
//         }
//         const isAvailable=await checkBookingAvailability(carId,startDate,endDate);
//         if(!isAvailable){
//             return res.status(400).json({message:"Car is not available"});
//         }
//         const pickedStartDate=new Date(startDate);
//         const pickedEndDate=new Date(endDate);
//         const timeDiff=Math.abs(pickedEndDate.getTime()-pickedStartDate.getTime());
//         const diffDays=Math.ceil(timeDiff/(1000*3600*24))+1;
//         const totalPrice=diffDays*car.PricePerDay;
//         const booking=new Booking({
//             car:carId,
//             user:_id,
//             owner:car.owner,
//             startDate:pickedStartDate,
//             endDate:pickedEndDate,
//             totalPrice:totalPrice,
//         });
//         await booking.save();
//         res.status(201).json({message:"Booking successful",booking});
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const getUserBookings=async(req,res)=>{
//     try {
//         const {_id}=req.user;
//         const bookings=await Booking.find({user:_id}).populate('car').sort({createdAt:-1});
//         res.status(200).json(bookings);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const getOwnerBookings=async(req,res)=>{
//     try {
//         const {_id}=req.user;
//         if(req.user.role!=='owner'){
//             return res.status(403).json({message:"Access denied"});
//         }
//         const bookings=await Booking.find({owner:_id}).populate('car').populate('user').select("-user.password").sort({createdAt:-1});
//         res.status(200).json(bookings);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const updateBookingStatus=async(req,res)=>{
//     try {
//         const {_id}=req.user;
//         if(req.user.role!=='owner'){
//             return res.status(403).json({message:"Access denied"});
//         }
//         const {bookingId,status}=req.body;
//         const booking=await Booking.findById(bookingId);
//         if(!booking){
//             return res.status(404).json({message:"Booking not found"});
//         }
//         if(booking.owner.toString()!==_id){
//             return res.status(403).json({message:"Unauthorized action"});
//         }
//         booking.status=status;
//         await booking.save();
//         res.status(200).json({message:"Booking status updated",booking});
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

import Car from '../models/Car.js';
import Booking from '../models/Booking.js';

// Helper: Check overlap logic
const checkBookingAvailability = async (car, startDate, endDate) => {
    // Logic: (StartA < EndB) and (EndA > StartB)
    const bookings = await Booking.find({
        car,
        startDate: { $lt: endDate },
        endDate: { $gt: startDate },
        status: { $nin: ['cancelled'] } // Don't count cancelled bookings as blocked
    });
    return bookings.length === 0;
};

export const getAvailabilityOfCar = async (req, res) => {
    try {
        const { location, startDate, endDate } = req.body;

        const cars = await Car.find({ location: location, isAvailable: true });

        // Check availability for each car found in that location
        const availableCarsPromise = cars.map(async (car) => {
            const isAvailable = await checkBookingAvailability(car._id, startDate, endDate);
            // Return car object only if available, else null
            return isAvailable ? car : null;
        });

        const resolvedCars = await Promise.all(availableCarsPromise);
        // Filter out nulls
        const availableCars = resolvedCars.filter(car => car !== null);

        res.status(200).json({ success: true, cars: availableCars });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const booking = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId, startDate, endDate } = req.body;

        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }

        const isAvailable = await checkBookingAvailability(carId, startDate, endDate);
        if (!isAvailable) {
            return res.status(400).json({ success: false, message: "Car is not available for these dates" });
        }

        const pickedStartDate = new Date(startDate);
        const pickedEndDate = new Date(endDate);
        const timeDiff = Math.abs(pickedEndDate.getTime() - pickedStartDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 to include start day
        const totalPrice = diffDays * car.PricePerDay;

        const newBooking = new Booking({
            car: carId,
            user: _id,
            owner: car.owner,
            startDate: pickedStartDate,
            endDate: pickedEndDate,
            totalPrice: totalPrice,
            status: 'pending' // Initial status
        });

        await newBooking.save();
        res.status(201).json({ success: true, message: "Booking successful", booking: newBooking });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user;
        const bookings = await Booking.find({ user: _id }).populate('car').sort({ createdAt: -1 });
        // ✅ FIX: Send object with success: true
        res.status(200).json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getOwnerBookings = async (req, res) => {
    try {
        const { _id } = req.user;
        // Role check is good practice
        if (req.user.role !== 'owner') {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        const bookings = await Booking.find({ owner: _id })
            .populate('car')
            .populate('user', '-password') // Exclude password safely
            .sort({ createdAt: -1 });

        // ✅ FIX: Send object with success: true (Matches Frontend)
        res.status(200).json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const { _id } = req.user;
        const { bookingId, status } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        // Verify ownership
        if (booking.owner.toString() !== _id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized action" });
        }

        booking.status = status;
        await booking.save();

        res.status(200).json({ success: true, message: "Booking status updated", booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};