-- =============================================
-- SCRIPT DE INICIALIZACIÓN - FERRETERÍA JUMELSA
-- =============================================

-- Crear la base de datos (ejecutar esto primero como usuario postgres)
-- CREATE DATABASE Ferreteria_bd;

-- Conectarse a la base de datos
-- \c Ferreteria_bd

-- =============================================
-- TABLA: usuarios_admin
-- =============================================
CREATE TABLE IF NOT EXISTS usuarios_admin (
    id SERIAL PRIMARY KEY,
    correo VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL DEFAULT 'admin',
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuario administrador por defecto
-- IMPORTANTE: En producción, usar bcrypt para hashear contraseñas
INSERT INTO usuarios_admin (correo, password_hash, nombre, rol) 
VALUES 
    ('admin@ferreteria.com', 'admin123', 'Administrador Principal', 'admin'),
    ('ventas@ferreteria.com', 'ventas123', 'Usuario Ventas', 'vendedor')
ON CONFLICT (correo) DO NOTHING;

-- =============================================
-- TABLA: productosJF
-- =============================================
CREATE TABLE IF NOT EXISTS productosjf (
    codigo VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    marca VARCHAR(100),
    modelo VARCHAR(100),
    ubicacion VARCHAR(100),
    medida VARCHAR(50),
    stock INTEGER NOT NULL DEFAULT 0,
    unidaddemedida VARCHAR(20),
    precioalpublico DECIMAL(10, 2)
);

-- =============================================
-- NOTA: Los datos de productos se importan desde
-- el archivo productos_data.sql o productos.csv
-- =============================================
-- Para importar ejecuta:
-- psql -U postgres -d Ferreteria_bd -f backend/database/productos_data.sql
-- O:
-- \COPY productosjf FROM 'backend/database/productos.csv' DELIMITER ',' CSV HEADER

-- =============================================
-- TABLA: proveedores
-- =============================================
CREATE TABLE IF NOT EXISTS proveedores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    contacto VARCHAR(255),
    telefono VARCHAR(20),
    email VARCHAR(255),
    direccion TEXT,
    ruc VARCHAR(20) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABLA: ventas
-- =============================================
CREATE TABLE IF NOT EXISTS ventas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios_admin(id),
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    metodo_pago VARCHAR(50),
    estado VARCHAR(50) DEFAULT 'completada'
);

-- =============================================
-- TABLA: detalle_ventas
-- =============================================
CREATE TABLE IF NOT EXISTS detalle_ventas (
    id SERIAL PRIMARY KEY,
    venta_id INTEGER REFERENCES ventas(id) ON DELETE CASCADE,
    producto_id INTEGER REFERENCES productosJF(id),
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL
);

-- =============================================
-- ÍNDICES para mejorar performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_productos_nombre ON productosjf(nombre);
CREATE INDEX IF NOT EXISTS idx_productos_marca ON productosjf(marca);
CREATE INDEX IF NOT EXISTS idx_ventas_fecha ON ventas(fecha_venta);
CREATE INDEX IF NOT EXISTS idx_ventas_usuario ON ventas(usuario_id);

-- =============================================
-- VISTAS ÚTILES
-- =============================================

-- Vista de productos con bajo stock
CREATE OR REPLACE VIEW productos_bajo_stock AS
SELECT codigo, nombre, stock, marca, ubicacion
FROM productosjf
WHERE stock < 10
ORDER BY stock ASC;

-- =============================================
-- FIN DEL SCRIPT
-- =============================================
COMMENT ON DATABASE Ferreteria_bd IS 'Base de datos del sistema de ferretería JUMELSA';