import React, { useState, useEffect } from 'react';
import { Users, PlusCircle, Loader, XCircle, Edit, Trash2, Key, CheckCircle, XOctagon } from 'lucide-react';
// ¡Línea de bcrypt ELIMINADA! El hasheo solo se hace en el backend.

const API_URL = 'http://localhost:3001/usuarios'; 

// Componente para la tabla de usuarios
const UserTable = ({ users, onEdit, onDelete }) => (
    <div className="bg-white rounded-xl shadow-2xl overflow-x-auto mt-6">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    {['ID', 'CORREO', 'NOMBRE', 'ROL', 'ESTADO', 'CREACIÓN', 'ACCIONES'].map((header) => (
                        <th
                            key={header}
                            className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50 transition duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{user.correo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 rounded-full ${
                                user.rol === 'superadmin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                            }`}>
                                {user.rol}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.activo ? (
                                <CheckCircle className="w-5 h-5 text-green-500" title="Activo" />
                            ) : (
                                <XOctagon className="w-5 h-5 text-red-500" title="Inactivo" />
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                            {new Date(user.fecha_creacion).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                                className="text-indigo-600 hover:text-indigo-900 mr-3 p-1"
                                onClick={() => onEdit(user)}
                                title="Editar Usuario"
                            >
                                <Edit className="w-5 h-5" />
                            </button>
                            <button 
                                className="text-red-600 hover:text-red-900 p-1"
                                onClick={() => onDelete(user.id)}
                                title="Eliminar Usuario"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// Componente Modal para crear un nuevo usuario
const CreateUserModal = ({ isOpen, onClose, onSave, error, isLoading }) => {
    const [formData, setFormData] = useState({
        correo: '',
        password: '',
        nombre: '',
        rol: 'admin',
        activo: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all scale-100">
                <div className="flex justify-between items-center mb-6 border-b pb-3">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center"><Key className="w-6 h-6 mr-2 text-blue-600" /> Crear Nuevo Usuario</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
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
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input
                            type="email"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña (Mínimo 6 caracteres)</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">Rol</label>
                            <select
                                name="rol"
                                value={formData.rol}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="admin">Administrador</option>
                                <option value="superadmin">Super Administrador</option>
                            </select>
                        </div>

                        <div className="w-1/2 flex items-center pt-6">
                            <input
                                id="activo-check"
                                type="checkbox"
                                name="activo"
                                checked={formData.activo}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="activo-check" className="ml-2 text-sm font-medium text-gray-700">Usuario Activo</label>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white transition duration-150 ${
                                isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                                    Guardando...
                                </>
                            ) : (
                                'Guardar Usuario'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Componente Principal
export default function Usuarios() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createError, setCreateError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // 1. Cargar la lista de usuarios
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            console.error("Error al obtener usuarios:", err);
            setError(`Error de conexión o de datos: ${err.message}. Verifica que el backend tenga la ruta /usuarios corriendo.`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // 2. Función para crear un nuevo usuario (POST)
    const handleSaveUser = async (userData) => {
        setIsSaving(true);
        setCreateError(null);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (!response.ok) {
                // Si el backend devuelve un 409 (Conflicto), se maneja el mensaje de error específico
                setCreateError(result.error || 'No se pudo crear el usuario.');
                throw new Error(result.error || 'Error al guardar');
            }

            // Éxito: cerrar modal, limpiar errores y actualizar la lista de usuarios
            setIsModalOpen(false);
            setCreateError(null);
            fetchUsers(); 
            
        } catch (err) {
             // Si hay un error de conexión, el error ya se muestra en el modal por la línea de arriba
             console.error("Error al guardar:", err);
        } finally {
            setIsSaving(false);
        }
    };
    
    // 3. Funciones de placeholder para acciones futuras (Editar, Eliminar)
    const handleEdit = (user) => {
        console.log("Acción: Editar usuario", user.id);
        // Aquí se abriría un modal de edición en el futuro
    };

    const handleDelete = (userId) => {
        console.log("Acción: Eliminar usuario", userId);
        if (window.confirm(`¿Estás seguro de eliminar el usuario ID: ${userId}?`)) {
            // Lógica de DELETE API aquí
            console.log("Eliminando...");
        }
    };


    return (
        <div className="space-y-6">
            
            {/* Encabezado y Botón de Acción */}
            <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-3">
                    <Users className="w-8 h-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>
                </div>
                <button
                    className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 focus:ring-2 focus:ring-blue-500"
                    onClick={() => {
                        setCreateError(null); // Limpiar errores previos al abrir
                        setIsModalOpen(true);
                    }}
                >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Crear Nuevo Usuario
                </button>
            </div>

            {/* Mensaje de Error General */}
            {error && (
                <div className="bg-red-100 border border-red-500 text-red-700 p-4 rounded-lg flex items-center shadow-md">
                    <XCircle className="w-5 h-5 mr-3" />
                    <p>{error}</p>
                </div>
            )}

            {/* Carga y Contenido */}
            {loading ? (
                 <div className="py-12 text-center text-gray-500">
                    <Loader className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-500" />
                    Cargando lista de usuarios...
                </div>
            ) : (
                <UserTable 
                    users={users} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                />
            )}
            
            {/* Modal para Crear Usuario */}
            <CreateUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveUser}
                error={createError}
                isLoading={isSaving}
            />

        </div>
    );
}