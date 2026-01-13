// server/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    const token = req.headers.authorization; // Or req.headers.token depending on your frontend setup

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // ✅ Change: Access .id from the decoded object
        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: "Invalid token structure" });
        }

        req.user = await User.findById(decoded.id).select('-password');
        
        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }

        next();
    } catch (error) {
        console.log("Auth Error:", error.message);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};