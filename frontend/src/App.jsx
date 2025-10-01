import React, { useState } from "react";
import Productos from './Productos/productos.jsx'; 
import "./styles.css";

/**
 * Componente principal de la aplicación.
 * Implementa una navegación simple basada en estado.
 */
function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderHomePage = () => (
    <>
      <main className="main">
        <section className="hero">
          <h2>Bienvenido a nuestra ferretería</h2>
          <p>Encuentra todo lo que necesitas en un solo lugar.</p>
          <button 
            className="btn"
            onClick={() => handleNavigation('productos')}
          >
            Ver Productos
          </button>
        </section>

        <section className="cards">
            {/* Ejemplo estático de card */}
            <div className="card">
                <img src="https://placehold.co/250x150" alt="Ejemplo de producto" />
                <h3>Producto Destacado</h3>
                <p>Descripción breve.</p>
                <p><strong>S/ 15.00</strong></p>
                <button className="btn">Comprar</button>
            </div>
        </section>
      </main>
    </>
  );

  return (
    <div className="container">
      <header className="header">
        <h1>Ferretería JUMELSA</h1>
        <nav>
          <ul className="nav">
            <li>
              <button 
                onClick={() => handleNavigation('home')}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', textDecoration: currentPage === 'home' ? 'underline' : 'none' }}
              >
                Inicio
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('productos')}
                className="nav-link"
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', textDecoration: currentPage === 'productos' ? 'underline' : 'none' }}
              >
                Productos
              </button>
            </li>
            <li><a href="#">Ofertas</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </nav>
      </header>

      {currentPage === 'home' && renderHomePage()}
      {currentPage === 'productos' && <Productos onNavigate={handleNavigation} />}

      <footer className="footer">
        <p>&copy; 2025 Ferretería San José. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;