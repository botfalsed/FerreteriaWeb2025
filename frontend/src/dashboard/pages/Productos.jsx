import React from 'react';

export default function Productos() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Gestión de Productos
      </h1>
      <p className="text-gray-600">
        Aquí se añadirán, editarán y gestionarán todos los artículos de la ferretería.
      </p>
      {/* Tu tabla de productos iría aquí */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Inventario Actual</h2>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-gray-500">
            Tabla de datos de productos (ej. taladros, tornillos, pintura).
        </div>
      </div>
    </div>
  );
}
