import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/dashboard/home")}
        >
          LiveNews
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/dashboard/home" className="hover:text-black">Home</Link>
          <Link to="/dashboard/preferences" className="hover:text-black">Preferences</Link>
          <Link to="/dashboard/email-logs" className="hover:text-black">Email Logs</Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="hidden md:block px-3 py-1 border rounded-lg focus:outline-none"
          />
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="bg-black text-white px-4 py-2 rounded-full"
              >
                {user.name?.split(" ")[0] || "Profile"}
              </button>
              {profileOpen && (
                <div className="absolute right-0 bg-white shadow-lg rounded-md mt-2 py-2 w-40">
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard/edit-profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    Edit Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-black text-white px-4 py-2 rounded-lg">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden ml-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-3">
          <Link to="/dashboard/home" className="block">Home</Link>
          <Link to="/dashboard/preferences" className="block">Preferences</Link>
          <Link to="/dashboard/email-logs" className="block">Email Logs</Link>
          {user ? (
            <>
              <Link to="/dashboard/profile" className="block">Profile</Link>
              <Link to="/dashboard/edit-profile" className="block">Edit Profile</Link>
              <button onClick={handleLogout} className="block">Logout</button>
            </>
          ) : (
            <Link to="/login" className="block">Login</Link>
          )}
        </div>
      )}
    </header>
  );
}