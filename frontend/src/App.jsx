import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './Components/Footer/Footer';
import './App.css';

function App() {
  const [productos] = useState([
    {
      id: 1,
      nombre: "Taladro Percutor 750W",
      descripcion: "Taladro percutor profesional con 3 funciones",
      precio: 89.99,
      imagen: "https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Taladro",
      categoria: "herramientas-electricas",
      stock: 15,
      destacado: true
    },
    {
      id: 2,
      nombre: "Juego de Llaves Mixtas",
      descripcion: "Set de 10 llaves mixtas de acero cromo-vanadio",
      precio: 45.50,
      imagen: "https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Llaves",
      categoria: "herramientas-manuales",
      stock: 8,
      destacado: true
    },
    {
      id: 3,
      nombre: "Pintura Latex Blanco 4L",
      descripcion: "Pintura latex para interior, acabado mate",
      precio: 32.75,
      imagen: "https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Pintura",
      categoria: "pinturas",
      stock: 20,
      destacado: true
    },
    {
      id: 4,
      nombre: "Caja de Herramientas",
      descripcion: "Caja organizadora de herramientas con 56 compartimentos",
      precio: 67.90,
      imagen: "https://via.placeholder.com/300x200/795548/FFFFFF?text=Caja+Herramientas",
      categoria: "organizacion",
      stock: 6,
      destacado: true
    },
    {
      id: 5,
      nombre: "Destornillador Phillips",
      descripcion: "Destornillador profesional con mango antideslizante",
      precio: 8.25,
      imagen: "https://via.placeholder.com/300x200/607D8B/FFFFFF?text=Destornillador",
      categoria: "herramientas-manuales",
      stock: 25,
      oferta: true
    },
    {
      id: 6,
      nombre: "Cinta Métrica 5m",
      descripcion: "Cinta métrica profesional con freno automático",
      precio: 12.99,
      imagen: "https://via.placeholder.com/300x200/E91E63/FFFFFF?text=Cinta+Métrica",
      categoria: "medicion",
      stock: 18,
      oferta: true
    }
  ]);

  const [categorias] = useState([
    { id: 1, nombre: "Herramientas Eléctricas", icono: "⚡" },
    { id: 2, nombre: "Herramientas Manuales", icono: "🔧" },
    { id: 3, nombre: "Fontanería", icono: "🚰" },
    { id: 4, nombre: "Electricidad", icono: "💡" },
    { id: 5, nombre: "Pinturas", icono: "🎨" },
    { id: 6, nombre: "Fijaciones y Adhesivos", icono: "📌" }
  ]);

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero ferreteria-hero">
          <div className="hero-content">
            <h1>Ferretería <span className="brand-name">HerrramientasPlus</span></h1>
            <p>Todo lo que necesitas para tus proyectos de bricolaje, construcción y reparación</p>
            <div className="hero-buttons">
              <button className="btn btn-primary">Ver Productos</button>
              <button className="btn btn-secondary">Ofertas Especiales</button>
            </div>
          </div>
        </section>

        {/* Categorías */}
        <section className="categorias-section">
          <div className="container">
            <h2>Categorías Populares</h2>
            <div className="categorias-grid">
              {categorias.map(categoria => (
                <div key={categoria.id} className="categoria-card">
                  <div className="categoria-icon">{categoria.icono}</div>
                  <h3>{categoria.nombre}</h3>
                  <button className="btn-categoria">Explorar</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Productos Destacados */}
        <section className="products destacados-section">
          <div className="container">
            <h2>Productos Destacados</h2>
            <div className="product-grid">
              {productos.filter(p => p.destacado).map(producto => (
                <div key={producto.id} className="product-card">
                  <div className="product-image">
                    <img src={producto.imagen} alt={producto.nombre} />
                    {producto.oferta && <span className="oferta-badge">OFERTA</span>}
                  </div>
                  <div className="product-info">
                    <h3>{producto.nombre}</h3>
                    <p>{producto.descripcion}</p>
                    <p className="price">${producto.precio.toFixed(2)}</p>
                    <button className="btn-add-cart">Agregar al carrito</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Banner de Ofertas */}
        <section className="ofertas-banner">
          <div className="container">
            <div className="banner-content">
              <h2>Ofertas de la Semana</h2>
              <p>Hasta 30% de descuento en herramientas seleccionadas</p>
              <button className="btn btn-white">Ver Ofertas</button>
            </div>
          </div>
        </section>

        {/* Todos los Productos */}
        <section className="products todos-productos">
          <div className="container">
            <h2>Todos Nuestros Productos</h2>
            <div className="product-grid">
              {productos.map(producto => (
                <div key={producto.id} className="product-card">
                  <div className="product-image">
                    <img src={producto.imagen} alt={producto.nombre} />
                    {producto.oferta && <span className="oferta-badge">OFERTA</span>}
                  </div>
                  <div className="product-info">
                    <h3>{producto.nombre}</h3>
                    <p>{producto.descripcion}</p>
                    <p className="price">${producto.precio.toFixed(2)}</p>
                    <button className="btn-add-cart">Agregar al carrito</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section className="servicios-section">
          <div className="container">
            <h2>Nuestros Servicios</h2>
            <div className="servicios-grid">
              <div className="servicio-item">
                <div className="servicio-icon">🚚</div>
                <h3>Envío Gratis</h3>
                <p>En compras superiores a $100</p>
              </div>
              <div className="servicio-item">
                <div className="servicio-icon">🔧</div>
                <h3>Asesoramiento Técnico</h3>
                <p>Expertos en resolver tus dudas</p>
              </div>
              <div className="servicio-item">
                <div className="servicio-icon">↩️</div>
                <h3>Devoluciones</h3>
                <p>30 días para devoluciones</p>
              </div>
              <div className="servicio-item">
                <div className="servicio-icon">🏭</div>
                <h3>Venta al por Mayor</h3>
                <p>Descuentos para contratistas</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;