// src/dashboard/components/Navbar.jsx
import { Bell, UserCircle, Search, LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Administrador';
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    // Limpiar toda la información de autenticación
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    
    // Redirigir al login
    navigate('/administrador/login');
  };

  return (
    // Navbar: Fija en la parte superior, fondo blanco con sombra sutil
    <nav className="sticky top-0 z-10 w-full bg-white shadow-md flex items-center justify-between px-6 py-3">
      
      {/* 1. Barra de Búsqueda (Opcional, pero útil) */}
      <div className="relative flex-1 max-w-lg hidden md:block">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar productos, ventas o reportes..."
          className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 border border-transparent rounded-full focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
        />
      </div>
      
      {/* Título solo visible en pantallas pequeñas */}
      <h1 className="text-xl font-semibold text-gray-800 md:hidden">Panel</h1>

      {/* 2. Iconos de Usuario y Notificaciones */}
      <div className="flex items-center gap-4">
        
        {/* Botón de Notificaciones */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition duration-150">
          <Bell className="w-6 h-6 text-gray-600" />
          {/* Indicador de notificación (punto rojo) */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* Perfil del Usuario con Menú Desplegable */}
        <div className="relative">
          <div 
            className="flex items-center p-1 rounded-full cursor-pointer hover:bg-gray-100 transition duration-150"
            onClick={() => setShowMenu(!showMenu)}
          >
            <UserCircle className="w-8 h-8 text-blue-600" />
            <span className="hidden sm:block text-gray-700 font-medium ml-2 mr-1">
              {userName}
            </span>
          </div>

          {/* Menú Desplegable */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-700">{userName}</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition duration-150"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}