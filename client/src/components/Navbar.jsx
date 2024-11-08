import React from 'react'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-br from-pink-200 to-purple-300 text-pink-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or title */}
        <Link to="/" className="font-bold text-2xl hover:text-pink-700 cursor-pointer">
          Makeup Studio
        </Link>
        {/* Navigation links */}
        <div className="space-x-6">
          <Link 
            to="/book" 
            className="hover:text-pink-700 cursor-pointer transition duration-300">
            Book Now
          </Link>
          <Link 
            to="/dashboard" 
            className="hover:text-pink-700 cursor-pointer transition duration-300">
            Dashboard
          </Link>
          <Link 
            to="/calendar" 
            className="hover:text-pink-700 cursor-pointer transition duration-300">
            Calendar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
