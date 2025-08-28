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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();
    if (query) {
      navigate(`/dashboard/search?query=${encodeURIComponent(query)}`);
      e.target.reset();
    }
  };

  return (
    <header className="w-full border-b bg-blue-900 text-white shadow-md sticky top-0 z-50">
      {/* Top Bar Logo */}
      <div className="flex justify-around items-center py-2">
        <div
          className="text-2xl font-bold cursor-pointer text-center tracking-wide"
          onClick={() => navigate("/dashboard/home")}
        >
          LiveNews
          </div>
        {/* Search Box */}
        <form
            onSubmit={handleSearchSubmit}
            className="flex items-center space-x-2 bg-white rounded-lg px-2 py-1"
          >
            <input
              type="text"
              name="search"
              placeholder="Search news..."
              className="px-2 py-1 w-35 md:w-40 text-black focus:outline-none"
            />
            <button
              type="submit"
              className=" text-white px-3 py-1 rounded-lg hover:bg-blue-500"
            >
              🔍
            </button>
          </form>
          
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto flex justify-between items-center  px-6 bg-blue-800">
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <Link to="/dashboard/home" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/dashboard/preferences" className="hover:text-gray-200">
            Preferences
          </Link>
          <Link to="/dashboard/email-logs" className="hover:text-gray-200">
            Email Logs
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          

          {/* Profile */}
          {user ? (
            <div className="relative">
               <img
            src={`https://ui-avatars.com/api/?name=${user.name}`}
            alt="Profile"
            className=" w-10 rounded-full  border"
            onClick={() => setProfileOpen(!profileOpen)}
            />
              
              {profileOpen && (
                <div className="absolute right-0 bg-white text-black shadow-lg rounded-md mt-2 py-2  px-4 w-44">
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
            <Link
              to="/login"
              className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden ml-4 text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 text-white border-t px-6 py-4 space-y-3">
          <Link to="/dashboard/home" className="block">
            Home
          </Link>
          <Link to="/dashboard/preferences" className="block">
            Preferences
          </Link>
          <Link to="/dashboard/email-logs" className="block">
            Email Logs
          </Link>
          {user ? (
            <>
              <Link to="/dashboard/profile" className="block">
                Profile
              </Link>
              <Link to="/dashboard/edit-profile" className="block">
                Edit Profile
              </Link>
              <button onClick={handleLogout} className="block">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block">
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}