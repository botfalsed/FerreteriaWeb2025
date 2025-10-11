// src/dashboard/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { Home, Package, ShoppingCart, Truck, Users, FileText, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    navigate('/administrador/login');
  };

  // Función para verificar si la ruta está activa
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: "/administrador/dashboard/home", icon: Home, label: "Inicio / Resumen" },
    { path: "/administrador/dashboard/productos", icon: Package, label: "Gestión de Productos" },
    { path: "/administrador/dashboard/ventas", icon: ShoppingCart, label: "Órdenes y Ventas" },
    { path: "/administrador/dashboard/proveedores", icon: Truck, label: "Proveedores" },
    { path: "/administrador/dashboard/usuarios", icon: Users, label: "Usuarios / Roles" },
    { path: "/administrador/dashboard/reportes", icon: FileText, label: "Reportes y Analítica" },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-xl">
      {/* Logo / Título */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-blue-400">ADMINISTRADOR</h1>
        <p className="text-sm text-gray-400 mt-1">JUMELSA</p>
      </div>

      {/* Menú de Navegación */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Botón de Cerrar Sesión */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}