// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema({
//     car: {
//         type: mongoose.Schema.Types.ObjectId, // Standardize ObjectId syntax
//         ref: 'Car',
//         required: true,
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
//     owner: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
//     startDate: {
//         type: Date,
//         required: true,
//     },
//     endDate: {
//         type: Date,
//         required: true,
//     },
//     status: {
//         type: String,
//         // ✅ FIX: Added 'pending' and 'confirmed' to match Frontend
//         enum: ['pending', 'confirmed', 'booked', 'completed', 'cancelled'],
//         default: 'pending', // Default to pending so owners can approve it
//     },
//     totalPrice: {
//         type: Number,
//         required: true,
//     },

// }, { timestamps: true });

// const Booking = mongoose.model("Booking", bookingSchema);
// export default Booking;
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId, // Standardize ObjectId syntax
        ref: 'Car',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        // ✅ FIX: Added 'pending' and 'confirmed' to match Frontend
        enum: ['pending', 'confirmed', 'booked', 'completed', 'cancelled'],
        default: 'pending', // Default to pending so owners can approve it
    },
    totalPrice: {
        type: Number,
        required: true,
    },

}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;