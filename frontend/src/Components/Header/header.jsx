import React, { useState, useEffect } from 'react';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Efecto para detectar scroll y cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", searchQuery);
  };

  const categories = [
    "Herramientas Manuales",
    "Herramientas Eléctricas",
    "Fontanería",
    "Materiales Eléctricos",
    "Pinturas y Accesorios",
    "Fijaciones y Adhesivos",
    "Jardinería y Exterior",
    "Seguridad y Protección",
    "Construcción",
    "Iluminación",
    "Cerraduras y Llaves",
    "Tornillería",
    "Herrajes",
    "Almacenamiento",
    "Limpieza y Mantenimiento"
  ];

  const brands = [
    "DeWalt", "Stanley", "Bosch", "Makita", "3M", 
    "Steren", "Truper", "Klaus", "Viper", "Skil",
    "Black & Decker", "Irwin", "Lenox", "Craftsman"
  ];

  // Determinar si es móvil
  const isMobile = windowWidth <= 768;

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Banner de oferta */}
      <div className="offer-banner">
        <div className="container">
          <p>🚚 Envío gratis en compras superiores a $300 | ⚡ Entrega en 24/48h | 🛡️ Garantía de devolución</p>
        </div>
      </div>

      {/* Main header con logo y buscador */}
      <div className="main-header">
        <div className="container">
          <div className="logo">
            <div className="logo-icon">🔧</div>
            <div className="logo-text">
              <h1>HERRAMIENTAS</h1>
              <span>FERRETERÍA INDUSTRIAL</span>
            </div>
          </div>

          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-group">
                <input
                  type="text"
                  placeholder="Buscar herramientas, materiales, suministros..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-btn">
                  <span className="search-icon">🔍</span>
                  {!isMobile && <span>Buscar</span>}
                </button>
              </div>
            </form>
          </div>

          {!isMobile && (
            <div className="header-contact">
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-info">
                  <span className="contact-label">Asesoramiento</span>
                  <span className="contact-value">(01) 234-5678</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🕒</div>
                <div className="contact-info">
                  <span className="contact-label">Horario</span>
                  <span className="contact-value">Lun-Sab: 8am-7pm</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navegación principal */}
      <nav className="main-nav">
        <div className="container">
          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Abrir menú">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-list ${isMenuOpen ? 'nav-list-open' : ''}`}>
            <li className="nav-item">
              <a href="#inicio" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                <span className="nav-icon">🏠</span>
                Inicio
              </a>
            </li>
            
            <li className="nav-item category-menu">
              <a href="#categorias" className="nav-link">
                <span className="nav-icon">📦</span>
                Categorías
                <span className="dropdown-arrow">▼</span>
              </a>
              <div className="mega-menu">
                <div className="mega-menu-content">
                  <div className="mega-menu-section">
                    <h3>Categorías de Productos</h3>
                    <div className="category-grid">
                      {categories.map((category, index) => (
                        <a 
                          key={index} 
                          href={`#${category.toLowerCase().replace(/\s/g, '-')}`} 
                          className="category-link"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {category}
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mega-menu-section">
                    <h3>Marcas Destacadas</h3>
                    <div className="brands-grid">
                      {brands.map((brand, index) => (
                        <a 
                          key={index} 
                          href={`#marca-${brand.toLowerCase()}`} 
                          className="brand-link"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {brand}
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mega-menu-section">
                    <div className="promo-card">
                      <h3>Oferta Especial</h3>
                      <p>25% de descuento en herramientas eléctricas</p>
                      <span className="promo-code">Código: HERRAMIENTAS25</span>
                      <a href="#ofertas" className="promo-btn" onClick={() => setIsMenuOpen(false)}>Ver Ofertas</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            
            <li className="nav-item">
              <a href="#ofertas" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                <span className="nav-icon">🔥</span>
                Ofertas
              </a>
            </li>
            <li className="nav-item">
              <a href="#nuevo" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                <span className="nav-icon">🆕</span>
                Nuevos Productos
              </a>
            </li>
            <li className="nav-item">
              <a href="#servicios" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                <span className="nav-icon">🛠️</span>
                Servicios Técnicos
              </a>
            </li>
            <li className="nav-item">
              <a href="#proyectos" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                <span className="nav-icon">📐</span>
                Proyectos
              </a>
            </li>
            <li className="nav-item">
              <a href="#contacto" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                <span className="nav-icon">📞</span>
                Contacto
              </a>
            </li>
          </ul>

          {/* Carrito unificado - siempre visible en la navegación */}
          <div className="nav-cart-container">
            <a href="#carrito" className="nav-cart-btn">
              <span className="cart-icon">🛒</span>
              {!isMobile && <span className="cart-text">Carrito</span>}
              <span className="cart-count">0</span>
            </a>
          </div>

          {isMobile && (
            <a href="tel:012345678" className="mobile-contact-btn">
              <span className="contact-icon">📞</span>
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;