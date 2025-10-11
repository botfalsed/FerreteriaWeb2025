import React, { useState } from 'react';

function AgregarProducto({ onNavigate }) {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    marca: '',
    stock: '',
    precioVenta: '',
    categoria: '', // Nuevo campo
    descripcion: '' // Nuevo campo
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('Enviando datos...');

    // NOTA: La URL del API debe ser la que uses para tu backend (ej: http://localhost:4000/api/productos)
    try {
      // Por ahora, solo simulamos el envío ya que el backend aún no está conectado.
      console.log("Datos a enviar:", formData);
      
      // Simulación de respuesta exitosa después de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMensaje('✅ Producto registrado exitosamente.');
      setFormData({
        codigo: '',
        nombre: '',
        marca: '',
        stock: '',
        precioVenta: '',
        categoria: '',
        descripcion: ''
      });
      
    } catch (error) {
      setMensaje('❌ Error al registrar el producto.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-page">
      <header className="form-header">
        <h2>Registro de Nuevo Producto</h2>
        <button className="btn" onClick={() => onNavigate('productos')}>
          Volver al Inventario
        </button>
      </header>

      <main className="form-main">
        <form className="producto-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="codigo">Código:</label>
            <input
              type="text"
              id="codigo"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Nombre del Producto:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="marca">Marca:</label>
            <input
              type="text"
              id="marca"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoría:</label>
            <input
              type="text"
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock Inicial:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="precioVenta">Precio de Venta (S/):</label>
            <input
              type="number"
              id="precioVenta"
              name="precioVenta"
              value={formData.precioVenta}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="descripcion">Descripción:</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>

          <button type="submit" className="btn submit-btn full-width">
            Registrar Producto
          </button>
          
          {mensaje && <p className="form-message">{mensaje}</p>}
        </form>
      </main>

      {/* Estilos del Formulario */}
      <style jsx>{`
        .form-page {
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        }
        .form-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #ffcc00;
            padding-bottom: 10px;
        }
        .form-main {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .producto-form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        .form-group {
            display: flex;
            flex-direction: column;
        }
        .form-group label {
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
        }
        .form-group input, .form-group textarea {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
        }
        .full-width {
            grid-column: 1 / -1;
        }
        .submit-btn {
            background-color: #0066cc;
            color: white;
            padding: 12px;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.3s;
        }
        .submit-btn:hover {
            background-color: #004c99;
        }
        .form-message {
            grid-column: 1 / -1;
            padding: 10px;
            border-radius: 4px;
            text-align: center;
            font-weight: bold;
            margin-top: 10px;
            background-color: #e6ffe6;
            color: green;
        }
      `}</style>
    </div>
  );
}

export default AgregarProducto;