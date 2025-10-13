import React, { useState, useEffect } from 'react';
import { LayoutDashboard, CheckCircle, Package, Users, ShoppingCart, TrendingUp, AlertTriangle, Loader } from 'lucide-react';

const API_URL = 'http://localhost:3001';

export default function Home() {
  const [stats, setStats] = useState({
    totalProductos: 0,
    totalUsuarios: 0,
    usuariosActivos: 0,
    productosConStock: 0,
    productosBajoStock: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  // Cargar datos al iniciar
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Obtener usuarios
      const usersRes = await fetch(`${API_URL}/usuarios`);
      const users = await usersRes.json();
      
      // Obtener productos
      const productsRes = await fetch(`${API_URL}/productos`);
      const products = await productsRes.json();

      // Calcular estadísticas
      const usuariosActivos = users.filter(u => u.activo).length;
      const productosConStock = products.filter(p => p.stock > 10).length;
      const productosBajoStock = products.filter(p => p.stock > 0 && p.stock <= 10).length;

      setStats({
        totalProductos: products.length,
        totalUsuarios: users.length,
        usuariosActivos: usuariosActivos,
        productosConStock: productosConStock,
        productosBajoStock: productosBajoStock
      });

      // Últimos 5 usuarios creados
      const sortedUsers = users.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
      setRecentUsers(sortedUsers.slice(0, 5));

      // Productos con stock bajo (máximo 8)
      const lowStock = products
        .filter(p => p.stock > 0 && p.stock <= 10)
        .sort((a, b) => a.stock - b.stock)
        .slice(0, 8);
      setLowStockProducts(lowStock);

    } catch (error) {
      console.error('Error al cargar datos del dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="w-12 h-12 animate-spin text-blue-600" />
        <span className="ml-3 text-xl text-gray-600">Cargando dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center space-x-4">
          <LayoutDashboard className="w-10 h-10 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Panel de Control</h1>
            <p className="text-sm text-gray-500 mt-1">Resumen general del sistema</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Última actualización</p>
          <p className="text-sm font-semibold text-gray-700">{new Date().toLocaleString('es-ES')}</p>
        </div>
      </div>
      
      {/* Mensaje de Bienvenida */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0" />
          <div>
            <p className="font-semibold">¡Bienvenido, {localStorage.getItem('userName') || 'Administrador'}!</p>
            <p className="text-sm mt-1">Sistema operando correctamente. Todos los módulos están funcionando.</p>
          </div>
        </div>
      </div>

      {/* Tarjetas de Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Productos */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Total Productos</h3>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-4xl font-extrabold text-gray-900 mt-2">{stats.totalProductos.toLocaleString()}</p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">{stats.productosConStock}</span>
            <span className="text-gray-500 ml-1">con stock disponible</span>
          </div>
        </div>

        {/* Total Usuarios */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Total Usuarios</h3>
            <Users className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-4xl font-extrabold text-gray-900 mt-2">{stats.totalUsuarios}</p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">{stats.usuariosActivos}</span>
            <span className="text-gray-500 ml-1">usuarios activos</span>
          </div>
        </div>
        
        {/* Productos Bajo Stock */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Stock Bajo</h3>
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-4xl font-extrabold text-gray-900 mt-2">{stats.productosBajoStock}</p>
          <p className="text-sm text-orange-600 mt-2 font-medium">⚠️ Requieren reabastecimiento</p>
        </div>

        {/* Ventas (Placeholder) */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Ventas del Mes</h3>
            <ShoppingCart className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-4xl font-extrabold text-gray-900 mt-2">S/. 0.00</p>
          <p className="text-sm text-gray-500 mt-2">Módulo en desarrollo</p>
        </div>
      </div>

      {/* Sección Inferior: Dos Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Usuarios Recientes */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-600" />
              Usuarios Recientes
            </h2>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-semibold">
              {recentUsers.length} nuevos
            </span>
          </div>
          
          {recentUsers.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No hay usuarios registrados</p>
          ) : (
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {user.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user.nombre}</p>
                      <p className="text-xs text-gray-500">{user.correo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      user.rol === 'superadmin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {user.rol}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(user.fecha_creacion).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Productos con Stock Bajo */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-orange-600" />
              Productos con Stock Bajo
            </h2>
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-semibold">
              {lowStockProducts.length} productos
            </span>
          </div>
          
          {lowStockProducts.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <p className="text-gray-600 font-medium">¡Todo el inventario está bien!</p>
              <p className="text-sm text-gray-500">No hay productos con stock bajo</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {lowStockProducts.map((product) => (
                <div key={product.codigo} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{product.nombre}</p>
                    <p className="text-xs text-gray-500">{product.marca} - {product.codigo}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold ${
                      product.stock <= 5 ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {product.stock}
                    </span>
                    <p className="text-xs text-gray-500">{product.unidaddemedida}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Accesos Rápidos */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <TrendingUp className="w-7 h-7 mr-2" />
          Accesos Rápidos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/administrador/dashboard/productos" className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-center transition">
            <Package className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold">Productos</p>
          </a>
          <a href="/administrador/dashboard/usuarios" className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-center transition">
            <Users className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold">Usuarios</p>
          </a>
          <a href="/administrador/dashboard/ventas" className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-center transition">
            <ShoppingCart className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold">Ventas</p>
          </a>
          <a href="/administrador/dashboard/reportes" className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-center transition">
            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold">Reportes</p>
          </a>
        </div>
      </div>
    </div>
  );
}