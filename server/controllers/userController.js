// import User from '../models/User.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import Car from '../models/Car.js';

// //Generate JWT Token
// const generateToken = (userId) => {
//     const payload = userId;
//     return jwt.sign(payload, process.env.JWT_SECRET);
// }

// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
    
//     if (!name || !email || !password) {
//             return res.status(400).json({ success: false, message: "Please provide all required fields" });
//     }
//     if (password.length < 8) {
//           return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({ name, email, password: hashedPassword, role });
//     const token = generateToken(newUser._id.toString()); 
//     // 2. Added success: true
//     res.status(201).json({ success: true, user: newUser, token });

//   } 
//   catch (error) {
//         console.log("❌ Error during registration:", error); // <--- Add this line
//         res.status(500).json({ message: "Registration error", error: error.message });
//     }
// };

// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if(!email || !password ) {
//       return res.status(400).json({ message: "Please provide all required fields" });
//     }
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not registered" });
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid password" });
//     }
//     const token = generateToken(user._id.toString()); 
//     res.status(200).json({ success: true, user, token });
//   }
//     catch (error) {
//     res.status(500).json({ message: "Login error", error });
//     }
// };

// //Get user data using tokens
// export const getUserData = async (req, res) => {
//     try {
//         const {user}= req;
//         res.status(200).json({ user });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching user data", error });
//     }
// };

// //get all cars for the frontend
// export const getAllCars = async (req, res) => {
//     try {
//         const cars = await Car.find({ isAvailable: true });
//         res.status(200).json({ success: true, cars });
//     }
//     catch (error) {
//         res.status(500).json({ success: false, message: "Error fetching cars", error });
//     }
// };


//UPDATE 3
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Car from '../models/Car.js';
import Booking from '../models/Booking.js'; 

const generateToken = (userId) => {
    // ✅ Change: Sign an object { id: userId } instead of just the string
    // ✅ Change: Add 'expiresIn' (1d, 7d, 1h, etc.)
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: "Please provide all required fields" });
    if (password.length < 8) return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });
    const token = generateToken(newUser._id.toString()); 
    res.status(201).json({ success: true, user: newUser, token });
  } catch (error) {
        console.log("❌ Error during registration:", error); 
        res.status(500).json({ message: "Registration error", error: error.message });
    }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ) return res.status(400).json({ message: "Please provide all required fields" });
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not registered" });
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid password" });
    
    const token = generateToken(user._id.toString()); 
    res.status(200).json({ success: true, user, token });
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
};

export const getUserData = async (req, res) => {
    try {
        const {user}= req;
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data", error });
    }
};

export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find({ isAvailable: true });
        res.status(200).json({ success: true, cars });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching cars", error });
    }
};

// ✅ SEARCH LOGIC
export const searchAvailableCars = async (req, res) => {
    try {
        const { location, pickUpDate, dropoffDate } = req.query;

        if (!location || !pickUpDate || !dropoffDate) {
            return res.status(400).json({ success: false, message: "Missing search parameters" });
        }

        const start = new Date(pickUpDate);
        const end = new Date(dropoffDate);

        // 1. Find cars in location
        const carsInLocation = await Car.find({ location: location, isAvailable: true });

        // 2. Filter out booked cars
        const availableCars = await Promise.all(carsInLocation.map(async (car) => {
            const bookings = await Booking.find({
                car: car._id,
                $or: [
                    { startDate: { $lt: end }, endDate: { $gt: start } } 
                ],
                status: { $ne: 'cancelled' }
            });
            return bookings.length === 0 ? car : null;
        }));

        res.json({ success: true, availableCars: availableCars.filter(c => c !== null) });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Search failed" });
    }
};
export const getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id).populate('owner', 'name email image'); // Optional: populate owner details if needed

        if (!car) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }

        res.status(200).json({ success: true, car });
    } catch (error) {
        console.error("Error fetching car:", error);
        res.status(500).json({ success: false, message: "Error fetching car details", error: error.message });
    }
};