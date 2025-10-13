import React, { useState, useEffect } from 'react';
import { Package, Search, PlusCircle, Loader, XCircle, Edit, Trash2, Save, X } from 'lucide-react';

const API_URL = 'http://localhost:3001/productos';

// Modal para Crear/Editar Producto
const ProductModal = ({ isOpen, onClose, onSave, product, isLoading, error }) => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    marca: '',
    modelo: '',
    ubicacion: '',
    medida: '',
    stock: 0,
    unidaddemedida: 'unidad',
    precioalpublico: 0
  });
  const [loadingCode, setLoadingCode] = useState(false);

  // Cargar el siguiente código automáticamente al crear
  useEffect(() => {
    if (isOpen && !product) {
      // Solo cargar código si estamos CREANDO (no editando)
      fetchNextCode();
    }
  }, [isOpen, product]);

  const fetchNextCode = async () => {
    setLoadingCode(true);
    try {
      const response = await fetch('http://localhost:3001/productos/next-code');
      const data = await response.json();
      setFormData(prev => ({ ...prev, codigo: data.nextCode }));
    } catch (err) {
      console.error('Error al obtener código:', err);
      setFormData(prev => ({ ...prev, codigo: 'COD1' }));
    } finally {
      setLoadingCode(false);
    }
  };

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        codigo: '',
        nombre: '',
        descripcion: '',
        marca: '',
        modelo: '',
        ubicacion: '',
        medida: '',
        stock: 0,
        unidaddemedida: 'unidad',
        precioalpublico: 0
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-3xl my-8">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800">
            {product ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <XCircle className="w-7 h-7" />
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
            <p className="font-semibold">Error:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Código */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Código *</label>
              <input
                type="text"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                required
                disabled={!!product}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
            </div>

            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Marca */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Marca</label>
              <input
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Modelo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Modelo</label>
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Unidad de Medida */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Unidad de Medida</label>
              <input
                type="text"
                name="unidaddemedida"
                value={formData.unidaddemedida}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Precio */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Precio al Público</label>
              <input
                type="number"
                name="precioalpublico"
                value={formData.precioalpublico}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Ubicación */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Ubicación</label>
              <input
                type="text"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Medida */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Medida</label>
              <input
                type="text"
                name="medida"
                value={formData.medida}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex justify-center items-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
              {isLoading ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente Principal
export default function Productos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalError, setModalError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Obtener productos
  const fetchProducts = async (term = '') => {
    setLoading(true);
    setError(null);
    let url = API_URL;
    if (term) url = `${API_URL}?search=${encodeURIComponent(term)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error:', err);
      setError(`Error de conexión: ${err.message}`);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTerm.length >= 3 || searchTerm.length === 0) {
        fetchProducts(searchTerm);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  // Crear o Actualizar producto
  const handleSaveProduct = async (productData) => {
    setIsSaving(true);
    setModalError(null);

    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const url = editingProduct ? `${API_URL}/${editingProduct.codigo}` : API_URL;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      const result = await response.json();

      if (!response.ok) {
        setModalError(result.error || 'Error al guardar');
        throw new Error(result.error);
      }

      setIsModalOpen(false);
      setEditingProduct(null);
      setModalError(null);
      fetchProducts();

    } catch (err) {
      console.error('Error al guardar:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Eliminar producto
  const handleDelete = async (codigo) => {
    if (!window.confirm(`¿Eliminar el producto ${codigo}?`)) return;

    try {
      const response = await fetch(`${API_URL}/${codigo}`, { method: 'DELETE' });
      const result = await response.json();

      if (!response.ok) {
        alert(result.error || 'Error al eliminar');
        return;
      }

      fetchProducts();
    } catch (err) {
      console.error('Error al eliminar:', err);
      alert('Error de conexión al eliminar');
    }
  };

  // Abrir modal para editar
  const handleEdit = (product) => {
    setEditingProduct(product);
    setModalError(null);
    setIsModalOpen(true);
  };

  // Abrir modal para crear
  const handleCreate = () => {
    setEditingProduct(null);
    setModalError(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center space-x-3">
          <Package className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Inventario de Productos</h1>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Nuevo Producto
        </button>
      </div>

      {/* Buscador */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
          placeholder="Buscar por código, nombre o marca..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 border border-red-500 text-red-700 p-4 rounded-lg flex items-center">
          <XCircle className="w-5 h-5 mr-3" />
          <p>{error}</p>
        </div>
      )}

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-2xl overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['CÓDIGO', 'NOMBRE', 'MARCA', 'MODELO', 'STOCK', 'PRECIO', 'ACCIONES'].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading && (
              <tr>
                <td colSpan="7" className="py-8 text-center">
                  <Loader className="w-6 h-6 animate-spin mx-auto text-blue-600" />
                </td>
              </tr>
            )}
            {!loading && products.length === 0 && (
              <tr>
                <td colSpan="7" className="py-8 text-center text-gray-500">
                  No se encontraron productos
                </td>
              </tr>
            )}
            {!loading && products.map((p) => (
              <tr key={p.codigo} className="hover:bg-blue-50">
                <td className="px-6 py-4 text-sm font-medium text-blue-600">{p.codigo}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{p.nombre}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{p.marca}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{p.modelo || '-'}</td>
                <td className={`px-6 py-4 text-sm font-semibold ${p.stock <= 5 ? 'text-red-500' : 'text-green-600'}`}>
                  {p.stock}
                </td>
                <td className="px-6 py-4 text-sm font-bold">S/ {parseFloat(p.precioalpublico || 0).toFixed(2)}</td>
                <td className="px-6 py-4 text-sm">
                  <button onClick={() => handleEdit(p)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(p.codigo)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
        isLoading={isSaving}
        error={modalError}
      />
    </div>
  );
}