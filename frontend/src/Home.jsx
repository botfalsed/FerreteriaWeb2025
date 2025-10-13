import React, { useState, useEffect, useCallback } from 'react';
import { Wrench, PaintBrush, Zap, Warehouse, Phone, MapPin, Loader2, ArrowRight, Eye } from 'lucide-react';

// URL base de la API (se usa para simular productos destacados)
const API_BASE_URL = 'http://localhost:3001'; 

// ====================================================================
// COMPONENTE CARD DE PRODUCTO DESTACADO (Reutilizado del Catálogo)
// ====================================================================
const FeaturedProductCard = ({ producto, onNavigate }) => {
    const existencias = parseFloat(producto.existencias) || 0; 
    const isAgotado = existencias <= 0;

    const imagePlaceholder = `https://placehold.co/250x150/007bff/ffffff?text=${encodeURIComponent(producto.nombre.slice(0, 15))}`;

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 transform hover:scale-[1.02] cursor-pointer">
            
            <div className="relative">
                <img 
                    src={imagePlaceholder}
                    alt={`Imagen de ${producto.nombre}`} 
                    className="w-full h-36 object-cover bg-blue-500" 
                />
                {isAgotado && (
                    <div className="absolute top-2 right-2 px-3 py-1 text-xs font-bold rounded-full bg-red-500 text-white shadow-md">
                        AGOTADO
                    </div>
                )}
            </div>

            <div className="p-4">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1 block">
                    {producto.categoria_nombre || 'General'}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight line-clamp-2">
                    {producto.nombre}
                </h3>
                
                <p className="text-sm font-extrabold text-green-600 mt-2">
                    S/ {parseFloat(producto.precio_venta || 0).toFixed(2)}
                </p>

                <button
                    onClick={() => onNavigate('catalogo')}
                    className="mt-3 w-full text-sm flex items-center justify-center font-semibold text-white bg-blue-500 hover:bg-blue-600 py-2 rounded-lg transition duration-200"
                >
                    <Eye size={16} className="mr-2"/> Ver en Catálogo
                </button>
            </div>
        </div>
    );
};

// ====================================================================
// COMPONENTE PRINCIPAL HOME
// ====================================================================
const Home = ({ onNavigate }) => {
    // Corregimos la inicialización de estado para evitar errores
    const [productosDestacados, setProductosDestacados] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null); 

    // Fetch para productos destacados (solo 6 para el home)
    const fetchProductosDestacados = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/api/publico/productos`); 
            if (!response.ok) throw new Error('Error al cargar datos del catálogo.');

            const data = await response.json();
            
            // Tomamos los primeros 6 productos como "Destacados" o "Novedades"
            setProductosDestacados(data.slice(0, 6)); 
        } catch (err) {
            console.error("Error fetching featured products:", err);
            setError(`Error al cargar productos destacados: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProductosDestacados();
    }, [fetchProductosDestacados]);
    
    // Categorías de ejemplo para el Home
    const categoriasPopulares = [
        { name: 'Herramientas Manuales', icon: Wrench, color: 'bg-yellow-500', target: 'catalogo' },
        { name: 'Materiales Eléctricos', icon: Zap, color: 'bg-red-500', target: 'catalogo' },
        { name: 'Pinturas y Acabados', icon: PaintBrush, color: 'bg-green-500', target: 'catalogo' },
        { name: 'Seguridad Industrial', icon: Warehouse, color: 'bg-gray-500', target: 'catalogo' },
    ];

    return (
        <div className="font-inter">
            
            {/* 1. BANNER PRINCIPAL (HERO) */}
            <section className="bg-blue-700 text-white pt-16 pb-20 shadow-xl">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                        Tu Ferretería de Confianza
                    </h1>
                    <p className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto opacity-90">
                        Encuentra todo lo que necesitas para tu proyecto, desde el tornillo más pequeño hasta la maquinaria más robusta.
                    </p>
                    <button 
                        onClick={() => onNavigate('catalogo')}
                        className="inline-flex items-center text-lg font-bold bg-yellow-400 text-gray-900 py-3 px-8 rounded-full shadow-2xl hover:bg-yellow-500 transform hover:scale-105 transition duration-300"
                    >
                        Ver Catálogo Completo <ArrowRight size={20} className="ml-2" />
                    </button>
                </div>
            </section>

            {/* 2. CATEGORÍAS DESTACADAS */}
            <section className="py-12 bg-white -mt-10 rounded-t-3xl shadow-inner">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                        Explora por Categoría
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categoriasPopulares.map((cat, index) => (
                            <button
                                key={index}
                                onClick={() => onNavigate(cat.target)}
                                className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:bg-gray-50 border border-gray-100 transform hover:-translate-y-1 ${cat.color} text-white`}
                            >
                                <cat.icon size={36} className="mb-2" />
                                <span className="text-sm md:text-base font-bold text-center">{cat.name}</span>
                                <p className="text-xs opacity-80 mt-1">Ver todo</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. PRODUCTOS DESTACADOS (NOVEDADES) */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-yellow-500 pb-2 inline-block">
                        ✨ Productos Destacados
                    </h2>

                    {isLoading && (
                        <div className="flex justify-center items-center h-48">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        </div>
                    )}
                    
                    {error && (
                        <div className="text-center p-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
                            <p className="font-bold">Error de Conexión</p>
                            <p className="text-sm">No se pudieron cargar los productos destacados.</p>
                        </div>
                    )}

                    {!isLoading && productosDestacados.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                            {productosDestacados.map(producto => (
                                <FeaturedProductCard 
                                    key={producto.codigo} 
                                    producto={producto} 
                                    onNavigate={onNavigate} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
            
            {/* 4. CONTACTO RÁPIDO Y UBICACIÓN */}
            <section className="py-16 bg-blue-100">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                    <div className="p-6 bg-white rounded-xl shadow-xl">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <Phone size={24} className="mr-3 text-blue-600" />
                            Contáctanos Rápidamente
                        </h3>
                        <p className="mb-4 text-gray-600">Estamos listos para atender tus consultas y pedidos.</p>
                        <ul className="space-y-3">
                            <li className="text-lg font-semibold text-gray-700">
                                📞 Ventas: <span className="text-blue-600">999 999 999</span>
                            </li>
                            <li className="text-lg font-semibold text-gray-700">
                                📧 Correo: <span className="text-blue-600">contacto@ferremas.com</span>
                            </li>
                            <li>
                                <a href="https://wa.me/999999999" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition">
                                    Enviar WhatsApp Directo
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow-xl">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <MapPin size={24} className="mr-3 text-red-600" />
                            Nuestra Ubicación
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Av. Central #1234, Zona Industrial, [Tu Ciudad].
                        </p>
                        
                        <div className="h-48 w-full bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center border border-gray-300">
                            {/* Simulacro de Mapa */}
                            <p className="text-gray-500 font-medium">
                                [Imagen de mapa con chincheta en una ferretería]
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
