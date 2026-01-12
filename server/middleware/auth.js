import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export const protect =async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const userId = jwt.verify(token, process.env.JWT_SECRET);
        if (!userId) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user=await User.findById(userId).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
        console.log(error);
        
    }
}; 