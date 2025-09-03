import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al obtener productos:", err));
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Ferretería San José</h1>
        <nav>
          <ul className="nav">
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Ofertas</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <main className="main">
        <section className="hero">
          <h2>Bienvenido a nuestra ferretería</h2>
          <p>Encuentra todo lo que necesitas en un solo lugar.</p>
          <button className="btn">Ver Productos</button>
        </section>

        <section className="cards">
          {productos.length > 0 ? (
            productos.map((prod) => (
              <div className="card" key={prod.id}>
                <img
                  src={prod.imagen || "https://via.placeholder.com/200"}
                  alt={prod.nombre}
                />
                <h3>{prod.nombre}</h3>
                <p>{prod.descripcion}</p>
                <p><strong>S/ {prod.precio}</strong></p>
                <button className="btn">Comprar</button>
              </div>
            ))
          ) : (
            <p>Cargando productos...</p>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Ferretería San José. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
