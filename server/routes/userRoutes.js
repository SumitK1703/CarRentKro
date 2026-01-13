// import express from 'express';
// import { getUserData, loginUser, registerUser, getAllCars } from '../controllers/UserController.js';
// import { protect } from '../middleware/auth.js';

// const userRouter= express.Router();

// userRouter.post('/register',registerUser);
// userRouter.post('/login',loginUser);
// userRouter.get('/data',protect,getUserData);
// userRouter.get('/cars',getAllCars); 

// export default userRouter;

//UPDATED 3
import express from 'express';
import { getUserData, loginUser, registerUser, getAllCars, searchAvailableCars,getCarById } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', protect, getUserData);
userRouter.get('/cars', getAllCars); 
userRouter.get('/cars/search', searchAvailableCars); // ✅ Added
userRouter.get('/car/:id', getCarById);

export default userRouter;