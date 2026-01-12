import express from 'express';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import { 
    changeRoleToOwner, 
    addCar, 
    getOwnerCars, 
    deleteCar, 
    toggleCarAvailability, 
    getDashboardData, 
    updateProfileImage 
} from '../controllers/ownerController.js';

const ownerRouter = express.Router();

// 1. Change Role
ownerRouter.post('/change-to-owner', protect, changeRoleToOwner);

// 2. Add Car (Middleware order: Protect FIRST, then Upload)
ownerRouter.post('/add-car', protect, upload.single('image'), addCar);

// 3. Get Cars
ownerRouter.get('/cars', protect, getOwnerCars);

// 4. Dashboard
ownerRouter.get('/dashboard', protect, getDashboardData);

// 5. Delete & Toggle (Removed ':carId' to match controller's req.body)
ownerRouter.post('/delete-car', protect, deleteCar);
ownerRouter.post('/toggle-availability', protect, toggleCarAvailability);

// 6. Update Profile Image
// ⚠️ Fixed route name to match Sidebar.jsx ('/update-image')
// ⚠️ Swapped middleware order (Protect -> Upload)
ownerRouter.post('/update-image', protect, upload.single('image'), updateProfileImage);

export default ownerRouter;