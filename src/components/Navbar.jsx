import { useState } from "react";
import { Menu, X, Search, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function NavbarMSNStyle() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    const q = e.target.search.value.trim();
    if (q) navigate(`/search?query=${encodeURIComponent(q)}`);
  };

  const links = ["Home", "World", "Tech", "Business", "Sports"];

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            LiveNews
          </Link>

          {/* Center: Nav links */}
          <div className="hidden md:flex space-x-6">
            {links.map((label) => (
              <Link
                key={label}
                to={`/${label.toLowerCase()}`}
                className="text-gray-700 hover:text-gray-900"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right: Search & Profile */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="flex items-center border rounded-full px-2">
              <input
                name="search"
                type="text"
                placeholder="Search"
                className="px-2 py-1 focus:outline-none"
              />
              <button type="submit">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </form>
            <Link to="/profile">
              <User className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            </Link>

            {/* Mobile toggle */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="flex flex-col md:hidden py-2 space-y-2">
            {links.map((label) => (
              <Link
                key={label}
                to={`/${label.toLowerCase()}`}
                className="block text-gray-700 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}