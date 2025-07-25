// src/components/Sidebar.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaCog ,FaEnvelope} from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();

  const menuItems = [
    { label: 'Home', path: '/dashboard/home', icon: <FaHome /> },
    { label: 'Profile', path: '/dashboard/profile', icon: <FaUser /> },
    { label: 'Preference', path: '/dashboard/preferences', icon: <FaCog /> },
    { label: 'Email Logs', path: '/dashboard/email-logs', icon: <FaEnvelope /> }
  ];

  return (
    <aside
  className={`bg-gray-800 text-white w-64 min-h-screen p-4 
  transform transition-transform duration-300 fixed z-10 
  ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  md:translate-x-0`}
>
      <nav className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors duration-200 ${
              location.pathname === item.path ? 'bg-gray-700' : ''
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;