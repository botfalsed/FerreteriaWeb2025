import React from 'react';
import { LayoutDashboard, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <LayoutDashboard className="w-10 h-10 text-blue-600" />
        <h1 className="text-4xl font-extrabold text-gray-800">
          BIENVENIDO AL DASHBOARD
        </h1>
      </div>
      
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-lg">
        <div className="flex items-center">
          <CheckCircle className="w-6 h-6 mr-2" />
          <p className="font-semibold">¡Login Exitoso y Redirección Funcionando!</p>
        </div>
        <p className="text-sm mt-1">Este contenido se cargó correctamente en el área de Outlet del Dashboard.</p>
      </div>

      <p className="text-gray-600 text-lg">
        Ahora puedes empezar a construir los Widgets, Gráficos y Tablas para esta vista.
      </p>
    </div>
  );
}
