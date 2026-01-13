// import express from 'express';
// import { booking, getUserBookings, getOwnerBookings, getAvailabilityOfCar,updateBookingStatus } from '../controllers/bookingController.js';

// const bookingRouter=express.Router();
// bookingRouter.post('/create',booking);
// bookingRouter.post('/car-availability',getAvailabilityOfCar);
// bookingRouter.get('/user/:userId',getUserBookings);
// bookingRouter.get('/owner/:ownerId',getOwnerBookings);
// bookingRouter.post('/change-booking-status',updateBookingStatus);
// export default bookingRouter;

// // UPDATE 2

// import express from 'express';
// import { protect } from '../middleware/auth.js'; // 👈 Import Middleware
// import { 
//     booking, 
//     getUserBookings, 
//     getOwnerBookings, 
//     getAvailabilityOfCar, 
//     updateBookingStatus 
// } from '../controllers/bookingController.js';

// const bookingRouter = express.Router();

// // Public Routes (Anyone can check availability)
// bookingRouter.post('/car-availability', getAvailabilityOfCar);

// // Protected Routes (Must be logged in)
// bookingRouter.post('/create', protect, booking);

// // Removed ':userId' - Controller uses req.user._id
// bookingRouter.get('/my-bookings', protect, getUserBookings); 

// // Removed ':ownerId' - Controller uses req.user._id
// bookingRouter.get('/owner-bookings', protect, getOwnerBookings);

// bookingRouter.post('/change-status', protect, updateBookingStatus);

// export default bookingRouter;

// UPDATED 
import express from 'express';
import { 
    booking, 
    getUserBookings, 
    getOwnerBookings, 
    getAvailabilityOfCar, 
    updateBookingStatus 
} from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const bookingRouter = express.Router();

// Public Route
bookingRouter.post('/car-availability', getAvailabilityOfCar);

// Protected Routes (Require Token)
bookingRouter.post('/create', protect, booking);
bookingRouter.get('/my-bookings', protect, getUserBookings); 
bookingRouter.get('/owner-bookings', protect, getOwnerBookings);
bookingRouter.post('/change-status', protect, updateBookingStatus);

export default bookingRouter;