Here is a comprehensive README.md file tailored for the CarRentKro project, based on the code provided.

🚗 CarRentKro - Luxury Car Rental Platform
CarRentKro is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). It serves as a marketplace where users can browse and book luxury vehicles, while car owners can list their cars, manage availability, and track bookings.

🌟 Features
For Users (Renters)
Browse & Search: View a catalog of luxury cars with filtering by brand, model, and availability.

Check Availability: Search cars based on specific pickup locations and date ranges.

Bookings: streamlined booking process without upfront credit card requirements.

Booking History: View past and upcoming trips in the "My Bookings" section.

Responsive Design: Optimized for desktop, tablet, and mobile viewing.

For Car Owners
Owner Dashboard: Analytics overview (Total Cars, Revenue, Pending/Confirmed Bookings).

Car Management: Add new cars with details (images, transmission, fuel type, price).

Inventory Control: Toggle car availability or delete listings.

Booking Management: Approve, cancel, or complete booking requests from users.

Role Switching: Users can easily upgrade their account to an "Owner" account.

🛠️ Tech Stack
Frontend
Framework: React.js (via Vite)

Styling: Tailwind CSS

Animations: Framer Motion

Routing: React Router DOM

HTTP Client: Axios

Notifications: React Hot Toast

Backend
Runtime: Node.js & Express.js

Database: MongoDB (via Mongoose)

Authentication: JWT (JSON Web Tokens) & Bcrypt

Image Storage: ImageKit.io

File Handling: Multer & Sharp (Image optimization)

🚀 Getting Started
Follow these instructions to set up the project locally.

Prerequisites
Node.js (v14 or higher)

npm or yarn

A MongoDB connection string (Atlas or Local)

An ImageKit account (for image uploads)

1. Clone the Repository
Bash

git clone https://github.com/your-username/carrentkro.git
cd carrentkro
2. Backend Setup
Navigate to the server directory and install dependencies:

Bash

cd server
npm install
Create a .env file in the server directory and add the following variables:

Code snippet

PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_for_jwt
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
Start the backend server:

Bash

npm run server
# Server will run on http://localhost:3000
3. Frontend Setup
Open a new terminal, navigate to the client directory, and install dependencies:

Bash

cd client
npm install
Create a .env file in the client directory:

Code snippet

VITE_BASE_URL=http://localhost:3000
VITE_CURRENCY=$
Start the React development server:

Bash

npm run dev
# Frontend will run on http://localhost:5173 (or similar)
📂 Project Structure
Plaintext

CarRentKro/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── assets/         # Images and Icons
│   │   ├── components/     # Reusable UI components (Navbar, CarCard, etc.)
│   │   ├── context/        # App Context (Auth & Global State)
│   │   ├── pages/          # Full pages (Home, Cars, Owner Dashboard)
│   │   └── ...
│   └── ...
│
├── server/                 # Backend (Node + Express)
│   ├── configs/            # DB and ImageKit configurations
│   ├── controllers/        # Logic for User, Owner, and Booking routes
│   ├── middleware/         # Auth (JWT protection) and Multer (Uploads)
│   ├── models/             # Mongoose Schemas (User, Car, Booking)
│   ├── routes/             # API Endpoints
│   └── server.js           # Entry point
│
└── ...
🔌 API Endpoints
User Routes (/api/user)
POST /register - Create a new account.

POST /login - Login user.

GET /data - Get current user profile.

GET /cars - Get all available cars.

GET /cars/search - Search cars by location and date.

Owner Routes (/api/owner)
POST /change-to-owner - Upgrade user role to owner.

POST /add-car - Add a new vehicle listing (Requires Image).

GET /cars - Get cars belonging to the logged-in owner.

GET /dashboard - Get analytics data.

POST /toggle-availability - specific car availability.

POST /delete-car - Soft delete a car.

Booking Routes (/api/booking)
POST /create - Create a new booking request.

GET /my-bookings - Get booking history for a user.

GET /owner-bookings - Get booking requests for an owner.

POST /change-status - Update booking status (Confirm/Cancel/Complete).
