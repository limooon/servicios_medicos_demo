import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ handleLogout }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-white text-lg font-semibold">
          Dashboard
        </Link>
        <div>
          {/* Puedes agregar más enlaces aquí si lo necesitas */}
          <Link 
            to="/consulta" 
            className="text-white ml-6 hover:text-gray-300"
          >
            Consultas
          </Link>
          <button 
            onClick={handleLogout}
            className="text-white ml-6 bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
