import { useState, useEffect } from "react";
import { Search, User } from "lucide-react";

const Navbar = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full border-b shadow-sm">
      {/* 🔹 Top Utility Bar */}
      <div className="bg-gray-100 text-gray-700 text-sm flex justify-between items-center px-4 py-2">
        {/* Left: Date & Time */}
        <div>
          {dateTime.toLocaleDateString()} | {dateTime.toLocaleTimeString()}
        </div>

        {/* Center: Weather / Location (Placeholder for now) */}
        <div className="hidden md:block">📍 Chennai, 30°C</div>

        {/* Right: Profile */}
        <div className="flex items-center gap-2">
          <img
            src="https://via.placeholder.com/32"
            alt="Profile"
            className="w-8 h-8 rounded-full border"
          />
        </div>
      </div>

      {/* 🔹 Main Navbar */}
      <nav className="flex flex-col md:flex-row items-center justify-between px-4 py-3 bg-white">
        {/* Left: Logo */}
        <div className="text-2xl font-bold text-blue-600">NewsApp</div>

        {/* Center: Nav Links */}
        <ul className="flex gap-6 text-gray-700 font-medium mt-3 md:mt-0">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">World</li>
          <li className="hover:text-blue-600 cursor-pointer">Sports</li>
          <li className="hover:text-blue-600 cursor-pointer">Business</li>
          <li className="hover:text-blue-600 cursor-pointer">Technology</li>
        </ul>

        {/* Right: Search Bar */}
        <div className="flex items-center gap-2 mt-3 md:mt-0">
          <input
            type="text"
            placeholder="Search news..."
            className="border rounded-full px-4 py-1 text-sm focus:outline-none"
          />
          <Search className="text-gray-600 cursor-pointer" size={20} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;