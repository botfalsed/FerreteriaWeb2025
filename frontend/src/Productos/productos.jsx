import React from 'react';

/**
 * Componente de la página de Productos.
 */
function Productos({ onNavigate }) {
  // Simulación de datos
  const productData = [
    { codigo: 'COD001', nombre: 'ACCESORIO PARA RECTIFICADORA CHICA 121PCS', marca: 'TRUPER', stock: 1, precio: 'S/ 32.00' },
    { codigo: 'COD002', nombre: 'ACCESORIOS PARA DREMEL', marca: 'TRUPER', stock: 0, precio: 'S/ 30.00' },
    { codigo: 'COD006', nombre: 'ACEITE 3 EN 1 30ML CHICO', marca: 'TRUPER', stock: 21, precio: 'S/ 4.00' },
  ];

  return (
    <div className="productos-page">
      <header className="productos-header">
        <h2>Inventario de Productos</h2>
        <button 
            className="btn"
            onClick={() => onNavigate('agregarProducto')} 
        >
            + Agregar Nuevo Producto
        </button>
      </header>
    {/* ... (el resto del código de la tabla no cambia) ... */}
      <main className="productos-main">
        {productData.length > 0 ? (
          <table className="products-table">
            <thead>
              <tr>
                <th>CÓDIGO</th>
                <th>NOMBRE</th>
                <th>MARCA</th>
                <th>STOCK</th>
                <th>PRECIO VENTA</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((product, index) => (
                <tr key={index}>
                  <td>{product.codigo}</td>
                  <td>{product.nombre}</td>
                  <td>{product.marca}</td>
                  <td style={{ color: product.stock <= 0 ? 'red' : 'green', fontWeight: 'bold' }}>
                    {product.stock}
                  </td>
                  <td>{product.precio}</td>
                  <td>
                    <button className="btn btn-small">Editar</button>
                    <button className="btn btn-small btn-delete">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Cargando productos...</p>
        )}
      </main>
      
      {/* Estilos mínimos para la tabla, ya que no queremos un archivo CSS extra. */}
      <style jsx>{`
        .productos-page {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .productos-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #ddd;
            padding-bottom: 10px;
        }
        .productos-header h2 {
            font-size: 24px;
            color: #333;
        }
        .products-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background-color: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .products-table th, .products-table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
            font-size: 14px;
        }
        .products-table th {
            background-color: #f2f2f2;
            font-weight: bold;
            text-transform: uppercase;
            color: #555;
        }
        .products-table tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .products-table tr:hover {
            background-color: #f1f1f1;
        }
        .btn-small {
            padding: 5px 10px;
            font-size: 12px;
            margin-right: 5px;
            background-color: #007bff;
        }
        .btn-delete {
            background-color: #dc3545;
        }
        .btn-delete:hover {
            background-color: #c82333;
        }
      `}</style>
    </div>
  );
}

export default Productos;