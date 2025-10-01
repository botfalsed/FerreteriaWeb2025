import React, { useState, useEffect } from 'react';

/**
 * Componente que muestra el listado de productos obtenidos del backend en una tabla simple.
 * @param {function} onNavigate Función para volver a la página de inicio.
 */
function Productos({ onNavigate }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(null); 

  useEffect(() => {
    const API_URL = "http://localhost:3001/productos"; 
    
    const fetchData = async () => {
        try {
            const res = await fetch(API_URL);

            if (!res.ok) {
                // Esto manejaría errores HTTP (404, 500)
                throw new Error(`Error HTTP: ${res.status} al consultar la base de datos.`);
            }
            const data = await res.json();
            
            // Si la conexión es exitosa, limpiamos cualquier error anterior
            setConnectionError(null); 
            setProductos(data);
            
        } catch (err) {
            // Esto captura 'Failed to fetch' (servidor apagado/CORS) o el error HTTP lanzado arriba.
            console.error("Error al obtener productos:", err.message);
            setConnectionError(`No se pudo conectar o consultar los productos. Verifique: 
                    1. El estado de la base de datos (PostgreSQL).
                    2. El nombre de la tabla 'productosJF'.
                    Detalle: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
  }, []);

  // --- Estilos de la tabla en línea (compatibles con tu CSS) ---
  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    backgroundColor: 'white',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
  };
  const thTdStyles = {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    fontFamily: 'Arial, Helvetica, sans-serif'
  };
  // ------------------------------------------------------------------

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '1.2em', color: '#0066cc' }}>Cargando productos...</p>
      </div>
    );
  }

  if (connectionError) {
    return (
      <div style={{ padding: '20px', margin: '20px auto', maxWidth: '600px', backgroundColor: '#fdd', border: '1px solid #c00', borderRadius: '4px', textAlign: 'left', whiteSpace: 'pre-wrap' }}>
        <p style={{ fontWeight: 'bold', color: '#c00', marginBottom: '10px', fontSize: '1.1em' }}>🔴 ERROR EN LA CARGA DE DATOS</p>
        <p>{connectionError}</p>
        <button
          onClick={() => onNavigate('home')}
          className="btn" 
          style={{ marginTop: '15px', backgroundColor: '#c00' }}
        >
          Volver a Inicio
        </button>
      </div>
    );
  }
  
  if (productos.length === 0) {
     return (
        <div style={{ padding: '20px', margin: '20px auto', maxWidth: '600px', backgroundColor: '#ffc', border: '1px solid #cc0', borderRadius: '4px', textAlign: 'center' }}>
            <p style={{ fontWeight: 'bold', color: '#aa0', marginBottom: '10px' }}>⚠️ Tabla Vacía</p>
            <p style={{ fontSize: '0.9em' }}>La conexión es exitosa, pero la tabla `productosJF` en PostgreSQL no contiene registros.</p>
             <button
                onClick={() => onNavigate('home')}
                className="btn"
                style={{ marginTop: '15px', backgroundColor: '#aa0' }}
            >
                Volver a Inicio
            </button>
        </div>
    );
  }

  // 3. Mostrar la TABLA
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Listado de Productos</h2>
        <button
          onClick={() => onNavigate('home')}
          className="btn"
          style={{ backgroundColor: '#555' }}
        >
          ← Regresar
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyles}>
          <thead>
            <tr style={{ backgroundColor: '#eee' }}>
              {/* Encabezado: Usamos CÓDIGO */}
              <th style={thTdStyles}>CÓDIGO</th> 
              <th style={thTdStyles}>Nombre</th>
              <th style={thTdStyles}>Descripción</th>
              {/* Encabezado: Usamos PRECIO AL PÚBLICO */}
              <th style={thTdStyles}>Precio al Público (S/)</th> 
            </tr>
          </thead>
          <tbody>
            {productos.map((prod, index) => (
              <tr key={prod.codigo || index} style={{ borderBottom: '1px solid #eee' }}>
                {/* DATO: Mostramos prod.codigo (ej: COD001) */}
                <td style={thTdStyles}>{prod.codigo || 'N/A'}</td> 
                
                <td style={thTdStyles}>{prod.nombre || 'N/A'}</td>
                <td style={thTdStyles}>{prod.descripcion || 'Sin descripción'}</td>
                
                {/* DATO: Mostramos prod.precioalpublico */}
                <td style={{ ...thTdStyles, fontWeight: 'bold', color: '#0066cc' }}>
                  {/* El valor de 'precioalpublico' ya viene formateado como "S/ 32.00" desde PostgreSQL (tipo MONEY), 
                     así que lo mostramos directamente sin intentar parsear como número. */}
                  {prod.precioalpublico || '0.00'} 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Productos;