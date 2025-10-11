import React from 'react';

export default function Ventas() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Órdenes y Ventas
      </h1>
      <p className="text-gray-600">
        Monitoreo y seguimiento de todas las transacciones y pedidos de clientes.
      </p>
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Registro de Órdenes</h2>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-gray-500">
            Gráficos y listado de ventas recientes.
        </div>
      </div>
    </div>
  );
}
