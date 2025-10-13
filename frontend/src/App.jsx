import React, { useState } from "react";
import ProductosPublicos from "./Publico/ProductosPublicos";
import Nosotros from "./Publico/nosotros";
import Contacto from "./Publico/conctatos";
import { Search, ClipboardList, BookOpen, User, Menu, X, ShoppingCart } from "lucide-react";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]); // Estado para el carrito
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para el panel del carrito

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Función para añadir al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.codigo === product.codigo);
      if (existingItem) {
        return prevCart.map((item) =>
          item.codigo === product.codigo
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Función para eliminar del carrito
  const removeFromCart = (codigo) => {
    setCart((prevCart) => prevCart.filter((item) => item.codigo !== codigo));
  };

  // Función para actualizar la cantidad
  const updateQuantity = (codigo, quantity) => {
    if (quantity <= 0) {
      removeFromCart(codigo);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.codigo === codigo ? { ...item, quantity } : item
        )
      );
    }
  };

  // Calcular subtotal
  const calculateSubtotal = () => {
    return cart
      .reduce((total, item) => total + item.precio_venta * item.quantity, 0)
      .toFixed(2);
  };

  const renderHomePage = () => (
    <main className="container mx-auto px-4 py-8 md:px-8 md:py-12">
      {/* Sección Hero */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white p-12 md:p-20 rounded-2xl shadow-2xl mb-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-opacity-30 bg-black rounded-2xl"></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in">
            Bienvenido a Ferretería JUMELSA
          </h2>
          <p className="text-lg md:text-xl mb-8 font-light">
            Encuentra herramientas y materiales de calidad en un solo lugar.
          </p>
          <button
            className="bg-yellow-400 text-gray-900 font-bold py-3 px-10 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 transform hover:scale-105"
            onClick={() => handleNavigation("productos")}
          >
            Explorar Inventario
          </button>
        </div>
      </section>

      {/* Sección Productos Destacados */}
      <section className="py-12">
        <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8 border-b-4 border-blue-600 pb-3 text-center">
          Productos Destacados
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, index) => {
            const mockProduct = {
              codigo: `DESTACADO${index + 1}`,
              nombre: `Producto Destacado ${index + 1}`,
              descripcion: "Descripción breve del producto.",
              precio_venta: 15.0,
              existencias: 10,
              unidaddemedida: "Unidad",
            };
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <img
                  src={`https://placehold.co/250x150/007bff/ffffff?text=Producto${index + 1}`}
                  alt="Producto destacado"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {mockProduct.nombre}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {mockProduct.descripcion}
                  </p>
                  <p className="text-xl font-extrabold text-blue-600 mb-4">
                    S/ {mockProduct.precio_venta.toFixed(2)}
                  </p>
                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={() => addToCart(mockProduct)}
                    disabled={mockProduct.existencias <= 0}
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );

  const navLinkClass =
    "py-2 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition duration-200";
  const activeLinkClass =
    "py-2 px-4 rounded-lg font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition duration-200";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-20">
        <div className="container mx-auto flex items-center justify-between p-4 flex-wrap gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/jumelsagod2.png"
              alt="Logo JUMELSA"
              className="h-12 w-auto transition-transform duration-300 hover:scale-105"
            />
            <span className="text-xl font-bold text-gray-800">JUMELSA</span>
          </div>

          {/* Menú Hamburguesa (Móvil) */}
          <button
            className="lg:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 transition"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex space-x-6">
              {["home", "productos", "nosotros", "contacto"].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => handleNavigation(page)}
                    className={
                      currentPage === page ||
                      (page === "productos" && currentPage === "agregarProducto")
                        ? activeLinkClass
                        : navLinkClass
                    }
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Búsqueda e Íconos */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos"
                className="pl-10 pr-4 py-2 text-sm bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 md:w-64 transition-all duration-300"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            <div className="flex space-x-3">
              <button
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition"
                title="Lista de Compras"
              >
                <ClipboardList size={24} />
              </button>
              <button
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition"
                title="Manuales"
              >
                <BookOpen size={24} />
              </button>
              <button
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition"
                title="Mi Cuenta"
              >
                <User size={24} />
              </button>
              <button
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition relative"
                title="Carrito"
                onClick={toggleCart}
              >
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menú Móvil */}
        {isMenuOpen && (
          <nav className="lg:hidden bg-white shadow-md p-4">
            <ul className="flex flex-col space-y-2">
              {["home", "productos", "nosotros", "contacto"].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => handleNavigation(page)}
                    className={
                      currentPage === page ||
                      (page === "productos" && currentPage === "agregarProducto")
                        ? activeLinkClass
                        : navLinkClass
                    }
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Contenido */}
      <div className="flex-1">
        {currentPage === "home" && renderHomePage()}
        {currentPage === "productos" && (
          <ProductosPublicos
            onNavigate={handleNavigation}
            addToCart={addToCart}
            cart={cart}
          />
        )}
        {currentPage === "nosotros" && <Nosotros />}
        {currentPage === "contacto" && <Contacto />}
      </div>

      {/* Botón Flotante de WhatsApp */}
      <a
        href="https://linktr.ee/Ferresol"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:flex fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-2xl items-center space-x-2 z-30 hover:bg-green-600 transition duration-300 transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="white"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-whatsapp"
        >
          <path d="M17 21l-1.5-3.5L12 16l-3.5 1.5L5 21z" />
          <path d="M12 2c-3.1 0-5.7 1.4-7.5 3.5C2.7 7.7 2 10 2 12c0 1.2.3 2.3.8 3.4l-1 4 4.1-1.2c1.1.5 2.3.8 3.5.8 4.4 0 8-3.6 8-8s-3.6-8-8-8zM17 15l-1.5-3.5L12 10l-3.5 1.5L7 15z" />
        </svg>
        <span className="whatsapp-text">CONSULTAS EN LÍNEA</span>
      </a>

      {/* Panel Lateral del Carrito */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Tu Carrito</h2>
            <button
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
              onClick={toggleCart}
            >
              <X size={24} />
            </button>
          </div>
          {cart.length === 0 ? (
            <p className="text-gray-600 text-center">El carrito está vacío</p>
          ) : (
            <div className="flex-1 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.codigo}
                  className="flex items-center justify-between p-2 border-b border-gray-200"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                      {item.nombre}
                    </h3>
                    <p className="text-xs text-gray-500">
                      S/ {item.precio_venta.toFixed(2)} x {item.quantity}
                    </p>
                    <div className="flex items-center mt-1">
                      <button
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                        onClick={() => updateQuantity(item.codigo, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                        onClick={() => updateQuantity(item.codigo, item.quantity + 1)}
                        disabled={item.quantity >= item.existencias}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFromCart(item.codigo)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
          {cart.length > 0 && (
            <div className="mt-4">
              <p className="text-lg font-bold text-gray-800">
                Subtotal: S/ {calculateSubtotal()}
              </p>
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-2"
                onClick={() => {
                  alert("¡Compra realizada! (Funcionalidad pendiente)");
                  setCart([]);
                  setIsCartOpen(false);
                }}
              >
                Realizar Compra
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">Sobre JUMELSA</h4>
            <p className="text-sm text-gray-300">
              Somos tu ferretería de confianza, ofreciendo herramientas y materiales
              de alta calidad para tus proyectos.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {["home", "productos", "nosotros", "contacto"].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => handleNavigation(page)}
                    className="hover:text-yellow-400 transition"
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Contacto</h4>
            <p className="text-sm text-gray-300 mb-2">
              Email: contacto@jumelsa.com
            </p>
            <p className="text-sm text-gray-300 mb-2">Teléfono: +51 123 456 789</p>
            <p className="text-sm text-gray-300">
              Dirección: Av. Principal 123, Lima, Perú
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2025 Ferretería JUMELSA. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;