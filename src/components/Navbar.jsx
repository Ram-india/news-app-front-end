

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/Authcontext';
import { FaUser, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center bg-blue-800 text-white px-6 py-4 shadow z-20 relative">
  
      <button 
       className="md:hidden"
      onClick={() => setIsSidebarOpen((prev) => !prev)}>
        <FaBars />
      </button>
      <h1 className="text-xl font-bold">NEWS APP</h1>

      <div className="relative" ref={dropdownRef}>
        <img
          src={`https://ui-avatars.com/api/?name=${user?.name || "User"}`}
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          alt="Profile"
        />
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
            <ul className="py-2">
              <li
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  navigate("/dashboard/profile");
                  setDropdownOpen(false);
                }}
              >
                <FaUser /> Profile
              </li>
              <li
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  navigate("/dashboard/preferences");
                  setDropdownOpen(false);
                }}
              >
                <FaCog /> Preferences
              </li>
              <li
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;