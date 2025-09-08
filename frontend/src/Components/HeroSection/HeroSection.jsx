import React from 'react';
import './HeroSection.css';

const HeroSection = ({ onScrollToProducts }) => {
  return (
    <section id="inicio" className="hero">
      <div className="hero-background">
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Descubre la 
            <span className="highlight"> Nueva Era </span>
            del Shopping
          </h1>
          <p className="hero-subtitle">
            Productos únicos, calidad premium y experiencias excepcionales 
            te esperan en nuestra colección cuidadosamente seleccionada.
          </p>
          <div className="hero-actions">
            <button 
              className="btn-primary btn-large"
              onClick={onScrollToProducts}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Explorar Productos
            </button>
            <button className="btn-secondary btn-large">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 011.5 2.5M15 10h-1.5a2.5 2.5 0 00-1.5 2.5m0 0V12m0 0v2.5" />
              </svg>
              Ver Video
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Productos</span>
            </div>
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Clientes Felices</span>
            </div>
            <div className="stat">
              <span className="stat-number">99%</span>
              <span className="stat-label">Satisfacción</span>
            </div>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="hero-card">
            <div className="card-glow"></div>
            <div className="product-showcase">
              <div className="showcase-item item-1">
                <div className="item-image">📱</div>
                <div className="item-info">
                  <span className="item-name">Tech</span>
                  <span className="item-price">$299</span>
                </div>
              </div>
              <div className="showcase-item item-2">
                <div className="item-image">👕</div>
                <div className="item-info">
                  <span className="item-name">Fashion</span>
                  <span className="item-price">$89</span>
                </div>
              </div>
              <div className="showcase-item item-3">
                <div className="item-image">🏠</div>
                <div className="item-info">
                  <span className="item-name">Home</span>
                  <span className="item-price">$159</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="floating-elements">
            <div className="floating-element element-1">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="floating-element element-2">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="floating-element element-3">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-arrow">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;