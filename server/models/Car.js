import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const carSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
    brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
    year: {
    type: Number,
    required: true,
  },
    PricePerDay: {
    type: Number,
    required: true,
    },
    seating_Capacity: {
    type: Number,
    required: true,
  },    
  fuel_Type: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
    isAvailable: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true }
);
const Car = mongoose.model("Car", carSchema);
export default Car; 