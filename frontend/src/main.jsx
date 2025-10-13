import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./assets/css/index.css"; 

// Componentes Públicos (Tienda)
import App from "./App.jsx";

// Componentes de Autenticación y Dashboard
// Importación corregida a mayúscula 'L' para evitar problemas:
import Login from "./auth/Login.jsx"; 
import Dashboard from "./dashboard/Dashboard.jsx"; 

// Páginas del Dashboard
import Home from "./dashboard/pages/Home.jsx";
import Productos from "./dashboard/pages/Productos.jsx";
import Ventas from "./dashboard/pages/Ventas.jsx";
import Proveedores from "./dashboard/pages/Proveedores.jsx";
import Usuarios from "./dashboard/pages/Usuarios.jsx";
import Reportes from "./dashboard/pages/Reportes.jsx";


// Componente para proteger rutas privadas
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; 

  if (!isAuthenticated) {
    // Si no está autenticado, siempre va a la ruta de login
    return <Navigate to="/administrador/login" replace />;
  }

  return children;
};


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        
        {/* Rutas Públicas */}
        <Route path="/" element={<App />} />

        {/* Ruta de Login para Administrador */}
        <Route path="/administrador/login" element={<Login />} />

        {/* Redirección: /administrador va a /administrador/login */}
        {/* Esto es útil si alguien escribe solo /administrador */}
        <Route path="/administrador" element={<Navigate to="/administrador/login" replace />} />

        {/* RUTAS DEL DASHBOARD (PROTEGIDAS) */}
        <Route
          path="/administrador/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Rutas anidadas */}
          <Route path="home" element={<Home />} />
          <Route path="productos" element={<Productos />} />
          <Route path="ventas" element={<Ventas />} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="reportes" element={<Reportes />} />
          
          {/* Redirección por defecto: /administrador/dashboard -> /administrador/dashboard/home */}
          <Route index element={<Navigate to="home" replace />} />
        </Route>
        
        {/* Manejo de rutas no encontradas */}
        <Route path="*" element={<h1 className="text-3xl p-10 text-red-600">404 | Página no encontrada</h1>} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);