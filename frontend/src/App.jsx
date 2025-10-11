import React, { useState } from "react";
// Asegúrate que las rutas sean correctas para tus componentes
import Productos from './Productos/productos.jsx'; 
import AgregarProducto from './Productos/AgregarProducto.jsx'; 

import { Search, ClipboardList, BookOpen, User } from 'lucide-react'; 


function App() {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [searchTerm, setSearchTerm] = useState('');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const renderHomePage = () => (
    <>
      <main className="container mx-auto p-4 md:p-8">
        
        {/* Sección Hero / Bienvenida (Reemplaza .hero) */}
        <section className="bg-blue-700 text-white p-10 md:p-16 rounded-xl shadow-xl mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
            Bienvenido a nuestra ferretería
          </h2>
          <p className="text-xl mb-6 font-light">
            Encuentra todo lo que necesitas en un solo lugar.
          </p>
          <button 
            // Reemplaza .btn
            className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 transform hover:scale-105"
            onClick={() => handleNavigation('productos')}
          >
            Ver Inventario
          </button>
        </section>

        {/* Sección Cards (Reemplaza .cards) */}
        <section className="py-6">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
                Productos Destacados
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Ejemplo estático de card (Reemplaza .card) */}
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden">
                    <img src="https://placehold.co/250x150" alt="Ejemplo de producto" className="w-full h-40 object-cover" />
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Producto Destacado</h3>
                        <p className="text-sm text-gray-600 mb-3">Descripción breve.</p>
                        <p className="text-xl font-extrabold text-blue-600 mb-3"><strong>S/ 15.00</strong></p>
                        <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition">Comprar</button>
                    </div>
                </div>
            </div>
        </section>
      </main>
    </>
  );

  // Clases compartidas para botones de navegación
  const navLinkClass = "py-2 px-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition duration-150";
  const activeLinkClass = "py-2 px-3 rounded-lg font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition duration-150";

  return (
    // Reemplaza .container
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="container mx-auto flex items-center justify-between p-4 flex-wrap gap-4">
          
          {/* Logo Section (Reemplaza .logo-section) */}
          <div className="flex items-center space-x-3">
            {/* Si la imagen está en public, la ruta es correcta */}
            <img src="./public/jumelsagod2.png" alt="Logo JUMELSA" className="h-10 w-auto" />
          </div>
          
          {/* Navegación Desktop (Reemplaza .nav-desktop) */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex space-x-4">
              {['home', 'productos', 'nosotros', 'contacto', 'marcas'].map(page => (
                <li key={page}>
                  <button 
                    onClick={() => handleNavigation(page)}
                    // Reemplaza .nav-link .active
                    className={currentPage === page || (page === 'productos' && currentPage === 'agregarProducto') ? activeLinkClass : navLinkClass}
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Búsqueda e Íconos (Reemplaza .search-and-icons) */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block"> {/* Reemplaza .search-box */}
              <input 
                type="text" 
                placeholder="Buscar productos" 
                // Reemplaza .search-input
                className="pl-10 pr-4 py-2 text-sm bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 md:w-56 transition" 
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {/* Reemplaza .search-button */}
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="flex space-x-2"> {/* Reemplaza .header-icons */}
              {/* Reemplaza .icon-btn */}
              <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition" title="Lista de Compras"><ClipboardList size={24} /></button>
              <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition" title="Manuales"><BookOpen size={24} /></button>
              <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition" title="Mi Cuenta"><User size={24} /></button>
            </div>
          </div>
          
          {/* Botón Flotante de WhatsApp (Reemplaza .whatsapp-float) */}
          <a href="https://linktr.ee/Ferresol" target="_blank" rel="noopener noreferrer" 
             className="hidden lg:flex fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-2xl items-center space-x-2 z-30 hover:bg-green-600 transition duration-300 transform hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-whatsapp"><path d="M17 21l-1.5-3.5L12 16l-3.5 1.5L5 21z"/><path d="M12 2c-3.1 0-5.7 1.4-7.5 3.5C2.7 7.7 2 10 2 12c0 1.2.3 2.3.8 3.4l-1 4 4.1-1.2c1.1.5 2.3.8 3.5.8 4.4 0 8-3.6 8-8s-3.6-8-8-8zM17 15l-1.5-3.5L12 10l-3.5 1.5L7 15z"/></svg>
            <span className="whatsapp-text">CONSULTAS EN LÍNEA</span>
          </a>
          
        </div>
      </header>

      {/* Contenido */}
      <div className="flex-1">
        {currentPage === 'home' && renderHomePage()}
        {currentPage === 'productos' && <Productos onNavigate={handleNavigation} />} 
        {currentPage === 'agregarProducto' && <AgregarProducto onNavigate={handleNavigation} />}
      </div>

      {/* Footer (Reemplaza .footer) */}
      <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
        <p className="text-sm">&copy; 2025 Ferretería JUMELSA. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;