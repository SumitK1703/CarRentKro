import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ownerMenuLinks } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const {user,setUser,axios, fetchUser} = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState("");

  const updateImage = async () => {
    try {
      if (!image) return;

      const formData = new FormData();
      formData.append('image', image);

      toast.loading("Updating profile...");

      const { data } = await axios.post('/api/owner/update-image', formData, {
         headers: { token: localStorage.getItem('token') }
      });

      if (data.success) {
        toast.dismiss();
        toast.success("Image updated successfully!");
        
        // Update global user state
        setUser(prev => ({ ...prev, image: data.image }));
        setImage("");
      }
    } catch (error) {
      toast.dismiss();
      console.log(error);
      toast.error("Failed to update image");
    }
  };

  return (
    // 1. Fixed width classes: changed 'max-w' to 'w-' for fixed width
    // 2. Fixed syntax: removed space in 'md:w-64'
    <div className="relative min-h-screen flex flex-col items-center pt-8 w-16 md:w-64 border-r border-borderColor text-sm transition-all duration-300 bg-white">
      <div className="group relative">
        <label htmlFor="image" className="cursor-pointer">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300" // 3. Fixed URL space
            }
            alt="Profile"
            className="h-10 w-10 md:h-16 md:w-16 object-cover rounded-full mx-auto"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          {/* 4. Fixed 'roundedfull' typo and 'group-hover:' syntax */}
          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/30 rounded-full group-hover:flex items-center justify-center cursor-pointer transition-all">
            <img src={assets.edit_icon} alt="Edit" className="w-4" />
          </div>
        </label>
      </div>

      {image && (
        <button
          onClick={updateImage}
          className="absolute top-2 right-2 flex p-1.5 gap-1 bg-primary/10 text-primary rounded shadow-sm z-10"
        >
          <span className="text-xs font-medium">Save</span>
          <img
            src={assets.check_icon}
            width={12}
            alt="save"
          />
        </button>
      )}

      {/* 5. Fixed 'max-md:hidden' syntax */}
      <p className="mt-3 text-base font-medium max-md:hidden">{user?.name}</p>

      <div className="w-full mt-8">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-3 w-full py-3 px-4 mb-1 transition-colors ${
              link.path === location.pathname
                ? "bg-primary/10 text-primary border-r-4 border-primary"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <img
              src={
                link.path === location.pathname ? link.coloredIcon : link.icon
              }
              alt={link.name}
              className="w-5 h-5 min-w-5" // Ensure icons don't shrink
            />
            {/* 6. Fixed 'max-md:hidden' syntax */}
            <span className="max-md:hidden whitespace-nowrap">{link.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;