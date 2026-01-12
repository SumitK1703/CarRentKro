import imagekit from '../configs/imageKit.js';
import User from '../models/User.js';
import Car from '../models/Car.js';
import Booking from '../models/Booking.js';
import sharp from 'sharp';

// ✅ 1. Change Role
export const changeRoleToOwner = async (req, res) => {
    try {
        console.log("👑 Change Role Request Received");

        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: "Unauthorized: User identity missing" });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.role = "owner";
        await user.save();
        
        res.json({ success: true, message: "Role changed to owner successfully" });

    } catch (error) {
        console.log("❌ Change Role Error:", error);
        res.status(500).json({ success: false, message: "Error changing role", error: error.message });
    }
};

// ✅ 2. Add Car (Already fixed, keeping it stable)
export const addCar = async (req, res) => {
    console.log("🚗 Add Car Request Received");
    try {
        if (!req.file) return res.status(400).json({ message: "Image file is missing" });
        if (!req.user._id) return res.status(401).json({ message: "Unauthorized" });

        const ownerId = req.user._id;
        let car;
        try {
            car = JSON.parse(req.body.carData);
        } catch (err) {
            return res.status(400).json({ message: "Invalid JSON data" });
        }

        console.log("☁️ Uploading Car Image...");
        const response = await imagekit.files.upload({
            file: req.file.buffer.toString('base64'),
            fileName: req.file.originalname,
            folder: "cars/"
        });

        const newCar = await Car.create({ ...car, owner: ownerId, image: response.url });
        
        console.log("✅ Car Saved:", newCar._id);
        res.status(201).json({ success: true, message: "Car added successfully", car: newCar });

    } catch (error) {
        console.error("❌ Add Car Error:", error);
        res.status(500).json({ success: false, message: "Error adding car", error: error.message });
    }
};

// ✅ 3. Get Owner's Cars
export const getOwnerCars = async (req, res) => {
    try {
        const ownerId = req.user._id;
        const cars = await Car.find({ owner: ownerId });
        res.status(200).json({ success: true, cars });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching cars", error: error.message });
    }
}

// ✅ 4. Toggle Availability
export const toggleCarAvailability = async (req, res) => {
    try {
        const userId = req.user._id;
        const { carId } = req.body;
        
        const car = await Car.findById(carId);
        if (!car) return res.status(404).json({ message: "Car not found" });

        // Ensure only the owner can change it
        if (car.owner.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized action" });
        }

        car.isAvailable = !car.isAvailable;
        await car.save();
        
        res.status(200).json({ success: true, message: "Car availability updated", isAvailable: car.isAvailable });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating car", error: error.message });
    } 
};

// ✅ 5. Delete Car (Soft Delete)
export const deleteCar = async (req, res) => {
    try {
        const userId = req.user._id;
        const { carId } = req.body;
        
        const car = await Car.findById(carId);
        if (!car) return res.status(404).json({ message: "Car not found" });

        if (car.owner.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized action" });
        }

        // We remove the owner so it disappears from dashboard, but keep data for records
        car.owner = null;
        car.isAvailable = false;
        await car.save();

        res.status(200).json({ success: true, message: "Car deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting car", error: error.message });
    } 
};

// ✅ 6. Get Dashboard Data (FIXED CRASH)
export const getDashboardData = async (req, res) => {
    try {
        // Fix Typo: _Id -> _id
        const { _id, role } = req.user;
        
        if (role !== 'owner') {
            return res.status(403).json({ message: "Access denied. Not an owner." });
        }

        // Fetch Data
        const cars = await Car.find({ owner: _id });
        const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 });

        // Calculations
        const pendingBookings = bookings.filter(b => b.status === 'booked').length;
        const completedBookings = bookings.filter(b => b.status === 'completed').length;
        const monthlyRevenue = bookings
            .filter(b => b.status === 'completed')
            .reduce((acc, b) => acc + (b.totalPrice || 0), 0);

        // Construct Data Object
        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings,
            completedBookings,
            monthlyRevenue,
            recentBookings: bookings.slice(0, 5),
        };

        // ✅ Send the object we just created
        res.status(200).json({ success: true, dashboardData });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching dashboard data", error: error.message });
    }
};

// ✅ 7. Update Profile Image (OPTIMIZED)
export const updateProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        console.log("⚙️ Optimizing profile image...");

        // 1. Use Sharp to resize and compress the image buffer
        // - resize: Max width of 600px (plenty for a profile pic). 'withoutEnlargement' prevents stretching small images.
        // - toFormat: Convert to JPEG (widely compatible) with 80% quality.
        const optimizedBuffer = await sharp(req.file.buffer)
            .resize({ width: 600, withoutEnlargement: true }) 
            .toFormat('jpeg', { quality: 80 }) 
            .toBuffer();

        console.log(`☁️ Uploading optimized image (${(optimizedBuffer.length / 1024).toFixed(2)} KB)...`);

        // 2. Upload the smaller, optimized buffer to ImageKit
        const response = await imagekit.files.upload({
            file: optimizedBuffer.toString('base64'), // Convert the SMALLER buffer to base64
            fileName: `profile_${req.user._id}_${Date.now()}.jpg`, // Ensure extension matches format above
            folder: "profiles/"
        });

        // 3. Update User
        const user = await User.findByIdAndUpdate(
            req.user._id, 
            { image: response.url }, 
            { new: true }
        );

        console.log("✅ Profile image updated successfully");
        res.status(200).json({ success: true, message: "Profile image updated", image: user.image });

    } catch (error) {
        console.log("❌ Profile Upload Error:", error);
        res.status(500).json({ success: false, message: "Error updating profile image", error: error.message });
    }
};