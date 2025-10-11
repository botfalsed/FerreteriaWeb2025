import React from 'react';

export default function Proveedores() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Gestión de Proveedores
      </h1>
      <p className="text-gray-600">
        Control de los contactos, historial de pedidos y acuerdos con los proveedores.
      </p>
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Lista de Contactos</h2>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-gray-500">
            Formulario para añadir o editar proveedores.
        </div>
      </div>
    </div>
  );
}
