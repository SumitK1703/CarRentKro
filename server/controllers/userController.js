import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Car from '../models/Car.js';

//Generate JWT Token
const generateToken = (userId) => {
    const payload = userId;
    return jwt.sign(payload, process.env.JWT_SECRET);
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }
    if (password.length < 8) {
          return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });
    const token = generateToken(newUser._id.toString()); 
    // 2. Added success: true
    res.status(201).json({ success: true, user: newUser, token });

  } 
  catch (error) {
        console.log("❌ Error during registration:", error); // <--- Add this line
        res.status(500).json({ message: "Registration error", error: error.message });
    }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not registered" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = generateToken(user._id.toString()); 
    res.status(200).json({ success: true, user, token });
  }
    catch (error) {
    res.status(500).json({ message: "Login error", error });
    }
};

//Get user data using tokens
export const getUserData = async (req, res) => {
    try {
        const {user}= req;
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data", error });
    }
};

//get all cars for the frontend
export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find({ isAvailable: true });
        res.status(200).json({ success: true, cars });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error fetching cars", error });
    }
};
