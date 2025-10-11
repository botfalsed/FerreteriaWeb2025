import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('🔐 Intentando login con:', correo);

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, password }),
      });

      console.log('📨 Respuesta del servidor:', response.status);

      const data = await response.json();

      if (response.ok) {
        // Login exitoso
        console.log('✅ Login exitoso:', data);
        
        // Guardar información en localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userName', data.user.nombre);
        localStorage.setItem('userRole', data.user.rol);
        
        // Redirigir al dashboard
        navigate('/administrador/dashboard');
      } else {
        // Error de autenticación
        setError(data.message || 'Credenciales inválidas');
      }
    } catch (err) {
      console.error('❌ Error al hacer login:', err);
      setError('Error de conexión. Verifica que el servidor esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Iniciar Sesión - Administrador
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@ejemplo.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Olvidaste tu contraseña? <a href="#" className="text-blue-600 hover:underline">Recuperar</a>
        </p>
      </div>
    </div>
  );
}