import React from 'react';
import { Bell, FileText, Home } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const unreadNotifications = 3; // Esto puede venir de un estado global o props

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre */}
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <div className="h-8 w-20 flex items-center justify-center">
                <span className="text-blue-900 font-bold text-xl">SURA</span>
              </div>
            </div>
            <span className="text-xl font-bold hidden md:inline">Portal de Pólizas</span>
          </div>

          {/* Menú de navegación */}
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                currentPage === 'home' 
                  ? 'bg-white text-blue-900 shadow-md' 
                  : 'hover:bg-blue-800 hover:shadow-md'
              }`}
            >
              <Home size={20} />
              <span className="hidden md:inline font-medium">Inicio</span>
            </button>

            <button
              onClick={() => setCurrentPage('notifications')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 relative ${
                currentPage === 'notifications' 
                  ? 'bg-white text-blue-900 shadow-md' 
                  : 'hover:bg-blue-800 hover:shadow-md'
              }`}
            >
              <Bell size={20} />
              <span className="hidden md:inline font-medium">Notificaciones</span>
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
                  {unreadNotifications}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentPage('policies')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                currentPage === 'policies' 
                  ? 'bg-white text-blue-900 shadow-md' 
                  : 'hover:bg-blue-800 hover:shadow-md'
              }`}
            >
              <FileText size={20} />
              <span className="hidden md:inline font-medium">Pólizas</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;