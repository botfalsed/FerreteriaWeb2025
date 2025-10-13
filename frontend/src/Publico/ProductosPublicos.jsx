import React, { useState, useEffect, useCallback } from "react";
import { Search, ChevronDown, Filter, Loader2, Zap, ShoppingCart, X, Eye } from "lucide-react";

// URL base de la API
const API_BASE_URL = "http://localhost:3001";

// Componente para manejar el estado de carga y error
const StatusDisplay = ({ isLoading, error, children }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12 col-span-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="ml-3 text-lg font-medium text-gray-600">Cargando productos...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center p-12 col-span-full bg-red-100 border-l-4 border-red-500 text-red-700 rounded-xl">
        <p className="font-bold">Error al cargar el inventario</p>
        <p className="text-sm">{error}</p>
        <p className="text-xs mt-2">Asegúrate que el backend esté corriendo en {API_BASE_URL}</p>
      </div>
    );
  }
  return children;
};

// Componente para el Modal de Detalle del Producto
const ProductDetailModal = ({ producto, onClose, addToCart }) => {
  if (!producto) return null;

  const existencias = parseFloat(producto.existencias) || 0;
  const isAgotado = existencias <= 0;
  const isPocoStock = existencias > 0 && existencias <= 5;

  let stockTagColor = "bg-green-500";
  let whatsappButtonClass = "bg-green-500 hover:bg-green-600";

  if (isAgotado) {
    stockTagColor = "bg-red-500";
    whatsappButtonClass = "bg-gray-400 text-gray-700 cursor-not-allowed";
  } else if (isPocoStock) {
    stockTagColor = "bg-yellow-400 text-gray-900";
    whatsappButtonClass = "bg-orange-500 hover:bg-orange-600";
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isAgotado) {
      addToCart(producto);
      alert(`${producto.nombre} añadido al carrito`);
    }
  };

  const imagePlaceholder = `https://placehold.co/400x300/007bff/ffffff?text=${encodeURIComponent(
    producto.nombre.slice(0, 25)
  )}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-100 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 z-10 transition"
          aria-label="Cerrar detalles del producto"
        >
          <X size={20} />
        </button>
        <img
          src={imagePlaceholder}
          alt={`Imagen de ${producto.nombre}`}
          className="w-full h-48 object-cover rounded-t-xl bg-blue-500"
        />
        <div className="p-6">
          <div className="flex justify-between items-start mb-3 border-b pb-3">
            <h2 className="text-2xl font-extrabold text-gray-900 pr-4 leading-tight">
              {producto.nombre}
            </h2>
            <div
              className={`flex-shrink-0 px-3 py-1 text-sm font-bold rounded-full text-white shadow-md ${stockTagColor}`}
            >
              {isAgotado ? "AGOTADO" : isPocoStock ? `STOCK BAJO: ${existencias}` : `Stock: ${existencias}`}
            </div>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            {producto.descripcion || "Este producto no tiene una descripción detallada. Consulte vía WhatsApp para más información."}
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div className="space-y-1">
              <p className="font-semibold text-gray-700">Código:</p>
              <p className="text-gray-500 bg-gray-100 p-1 rounded inline-block">{producto.codigo}</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-gray-700">Marca:</p>
              <p className="text-gray-500">{producto.marca || "N/A"}</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-gray-700">Modelo:</p>
              <p className="text-gray-500">{producto.modelo || "N/A"}</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-gray-700">Ubicación:</p>
              <p className="text-gray-500">{producto.ubicacion || "Almacén principal"}</p>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <p className="text-3xl font-extrabold text-green-600 mb-4">
              S/ {parseFloat(producto.precio_venta || 0).toFixed(2)}
              <span className="text-base font-medium text-gray-500 ml-2">/{producto.unidaddemedida}</span>
            </p>
            <button
              onClick={handleAddToCart}
              disabled={isAgotado}
              className={`w-full inline-flex justify-center items-center text-white py-3 rounded-lg font-bold transition duration-300 shadow-lg mb-3 ${
                isAgotado ? "bg-red-500 opacity-80 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <ShoppingCart size={22} className="mr-2" />
              {isAgotado ? "AGOTADO" : "Añadir al Carrito"}
            </button>
            <a
              href={
                isAgotado
                  ? "#"
                  : `https://wa.me/999999999?text=Hola,%20estoy%20interesado%20en%20el%20producto%20*${encodeURIComponent(
                      producto.nombre
                    )}%20(Código:%20${producto.codigo})%20y%20me%20gustaría%20saber%20si%20pueden%20ayudarme%20con%20la%20compra.`
              }
              target={isAgotado ? "_self" : "_blank"}
              rel="noopener noreferrer"
              onClick={(e) => {
                if (isAgotado) {
                  e.preventDefault();
                }
              }}
              className={`w-full inline-flex justify-center items-center text-white py-3 rounded-lg font-bold transition duration-200 shadow-lg ${whatsappButtonClass} ${
                isAgotado ? "opacity-50" : ""
              }`}
            >
              Consultar Vía WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para la Card de Producto
const ProductCard = ({ producto, onOpenDetail, addToCart }) => {
  const existencias = parseFloat(producto.existencias) || 0;
  const isAgotado = existencias <= 0;
  const isPocoStock = existencias > 0 && existencias <= 5;

  let stockTag = null;
  if (isAgotado) {
    stockTag = { text: "AGOTADO", color: "bg-red-500 text-white" };
  } else if (isPocoStock) {
    stockTag = { text: `STOCK BAJO`, color: "bg-yellow-400 text-gray-900" };
  }

  const imagePlaceholder = `https://placehold.co/250x150/007bff/ffffff?text=${encodeURIComponent(
    producto.nombre.slice(0, 15)
  )}`;

  return (
    <div
      onClick={() => onOpenDetail(producto)}
      className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1 cursor-pointer ${
        isAgotado ? "opacity-70 grayscale hover:opacity-100 hover:grayscale-0" : "group"
      }`}
    >
      <div className="relative">
        <img
          src={imagePlaceholder}
          alt={`Imagen de ${producto.nombre}`}
          className="w-full h-40 object-cover bg-blue-500"
        />
        {stockTag && (
          <div
            className={`absolute top-2 right-2 px-3 py-1 text-xs font-bold rounded-full shadow-md flex items-center ${stockTag.color}`}
          >
            {stockTag.text === "AGOTADO" ? null : <Zap size={14} className="mr-1" />}
            {stockTag.text}
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="flex items-center text-white font-bold text-lg bg-blue-600 p-2 px-4 rounded-full shadow-lg">
            <Eye size={20} className="mr-2" />
            Ver Detalles
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col h-full">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          {producto.categoria_nombre || "Sin Categoría"}
        </span>
        <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight line-clamp-2">
          {producto.nombre}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-3 h-14">
          {producto.descripcion || "Sin descripción disponible."}
        </p>
        <div className="mt-auto pt-3 border-t border-gray-100">
          <p className="text-xl font-extrabold text-green-600 mb-2">
            S/ {parseFloat(producto.precio_venta || 0).toFixed(2)}
          </p>
          <button
            className={`w-full inline-flex justify-center items-center text-white py-2 rounded-lg font-semibold transition duration-300 shadow-lg ${
              isAgotado ? "bg-red-500 opacity-80 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={(e) => {
              e.stopPropagation(); // Evita que se abra el modal al hacer clic en el botón
              if (!isAgotado) {
                addToCart(producto);
                alert(`${producto.nombre} añadido al carrito`);
              }
            }}
            disabled={isAgotado}
          >
            <ShoppingCart size={18} className="mr-2" />
            {isAgotado ? "AGOTADO" : "Añadir al Carrito"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente Principal
const PublicProductCatalog = ({ onNavigate, addToCart, cart }) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenDetail = (producto) => {
    const existencias = parseFloat(producto.existencias) || 0;
    if (existencias > 0) {
      setSelectedProduct(producto);
    } else {
      console.log(`El producto ${producto.nombre} está agotado. No se muestra el modal de compra.`);
    }
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  const fetchProductos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const maxRetries = 3;
      let response = null;
      let errorDetails = null;

      for (let i = 0; i < maxRetries; i++) {
        try {
          response = await fetch(`${API_BASE_URL}/api/publico/productos`);
          if (response.ok) {
            break;
          }
          const statusText = response.statusText || "Error desconocido";
          errorDetails = `Error ${response.status}: ${statusText}`;
        } catch (err) {
          errorDetails = `Error de conexión: ${err.message}`;
        }

        if (i < maxRetries - 1) {
          const delay = Math.pow(2, i) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }

      if (!response || !response.ok) {
        throw new Error(errorDetails || "Fallo en la respuesta del servidor");
      }

      const data = await response.json();
      setProductos(data);

      const uniqueCategories = data
        .reduce((acc, current) => {
          const id = current.categoria_id;
          const nombre = current.categoria_nombre;

          if (
            id &&
            nombre &&
            nombre !== "Sin Categoría" &&
            !acc.some((cat) => cat.id === id)
          ) {
            acc.push({ id, nombre });
          }
          return acc;
        }, [])
        .sort((a, b) => a.nombre.localeCompare(b.nombre));

      setCategorias(uniqueCategories);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(`Error de conexión o de datos: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  const productosFiltrados = productos.filter((producto) => {
    const matchesSearch = searchTerm
      ? producto.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.codigo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesCategory =
      filtroCategoria !== null ? parseInt(producto.categoria_id) === filtroCategoria : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen pt-12 pb-16 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 p-6 bg-white rounded-xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-gray-800 border-b-4 border-blue-500 pb-2 inline-block">
            Catálogo de Productos
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Explora nuestro inventario completo de herramientas y materiales de ferretería.
          </p>
        </header>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <aside className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="bg-white p-6 rounded-xl shadow-lg lg:sticky lg:top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-blue-500" />
                Filtrar Resultados
              </h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar por nombre, código o descripción
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Escribe para buscar (Ej: 'cla', 'mart', 'COD001')"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                <div className="relative">
                  <select
                    value={filtroCategoria === null ? "" : filtroCategoria}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFiltroCategoria(value === "" ? null : parseInt(value));
                    }}
                    className="w-full appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todas las Categorías</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
              {(searchTerm || filtroCategoria !== null) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFiltroCategoria(null);
                  }}
                  className="w-full mt-4 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 py-2 rounded-lg transition duration-200"
                >
                  Limpiar Filtros
                </button>
              )}
            </div>
          </aside>
          <main className="lg:col-span-3">
            <div className="mb-6 pb-4 border-b border-gray-200">
              {isLoading ? (
                <h2 className="text-2xl font-bold text-gray-800">Cargando Resultados...</h2>
              ) : (
                <h2 className="text-2xl font-bold text-gray-800">
                  <span className="text-blue-600">{productosFiltrados.length}</span> Resultado
                  {productosFiltrados.length !== 1 ? "s" : ""}
                  {filtroCategoria !== null && (
                    <span className="text-gray-600">
                      {" "}
                      en: {categorias.find((c) => c.id === filtroCategoria)?.nombre || ""}
                    </span>
                  )}
                </h2>
              )}
            </div>
            <StatusDisplay isLoading={isLoading} error={error}>
              {productosFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productosFiltrados.map((producto) => (
                    <ProductCard
                      key={producto.codigo}
                      producto={producto}
                      onOpenDetail={handleOpenDetail}
                      addToCart={addToCart}
                    />
                  ))}
                </div>
              ) : (
                !isLoading && (
                  <div className="text-center p-16 bg-white rounded-xl shadow-lg">
                    <h3 className="text-2xl font-semibold text-gray-700">
                      No se encontraron productos
                    </h3>
                    <p className="text-gray-500 mt-2">
                      Intenta ajustar tus filtros o buscar con un término diferente.
                    </p>
                  </div>
                )
              )}
            </StatusDisplay>
          </main>
        </div>
      </div>
      <ProductDetailModal producto={selectedProduct} onClose={handleCloseDetail} addToCart={addToCart} />
    </div>
  );
};

export default PublicProductCatalog;