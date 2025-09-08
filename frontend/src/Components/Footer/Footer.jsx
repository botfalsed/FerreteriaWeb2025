import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Mi Tienda Online</h3>
          <p>Ofrecemos los mejores productos con la mejor calidad y al mejor precio del mercado.</p>
        </div>
        
        <div className="footer-section">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/productos">Productos</a></li>
            <li><a href="/ofertas">Ofertas</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Categorías</h4>
          <ul>
            <li><a href="/categoria/electronica">Electrónica</a></li>
            <li><a href="/categoria/ropa">Ropa</a></li>
            <li><a href="/categoria/hogar">Hogar</a></li>
            <li><a href="/categoria/deportes">Deportes</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>📧 info@mitienda.com</p>
          <p>📞 +1 (123) 456-7890</p>
          <div className="social-icons">
            <a href="#"><span>📱</span></a>
            <a href="#"><span>💬</span></a>
            <a href="#"><span>📸</span></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2023 Mi Tienda Online. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;