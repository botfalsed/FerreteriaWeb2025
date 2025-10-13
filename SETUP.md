# 🚀 Instalación del Proyecto - FerreSol

## 📋 Requisitos Previos
- Node.js (v16 o superior)
- PostgreSQL (v12 o superior)
- Git

## 🔧 Pasos de Instalación

### 1. Clonar el Repositorio
```bash
git clone [URL_DEL_REPO]
cd FerreteriaWeb2025
```

### 2. Instalar Dependencias

#### Backend:
```bash
cd backend
npm install
```

#### Frontend:
```bash
cd frontend
npm install
```

### 3. Configurar PostgreSQL

#### Opción A: Desde pgAdmin o línea de comandos
```sql
-- Abrir psql o pgAdmin y ejecutar:
CREATE DATABASE Ferreteria_bd;
```

Luego importar el script:
```bash
psql -U postgres -d Ferreteria_bd -f backend/database/setup.sql
```

#### Opción B: Desde la terminal (Windows)
```powershell
# 1. Crear la base de datos
createdb -U postgres Ferreteria_bd

# 2. Importar el schema
psql -U postgres -d Ferreteria_bd -f backend/database/setup.sql
```

### 4. Configurar Variables de Entorno

Crea un archivo `backend/config/db.js` con tus credenciales:

```javascript
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "TU_CONTRASEÑA_AQUI", // ⚠️ CAMBIAR
  database: "Ferreteria_bd",
  port: 5432
});

module.exports = pool;
```

> ⚠️ **IMPORTANTE**: No subir contraseñas a Git. Usa variables de entorno o `.env` files.

### 5. Iniciar el Proyecto

#### Terminal 1 - Backend:
```bash
cd backend
node server.js
```
Deberías ver: `🚀 SERVIDOR INICIADO en http://localhost:3001`

#### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```
Deberías ver: `Local: http://localhost:5173`

## 👤 Usuarios de Prueba

| Correo | Contraseña | Rol |
|--------|-----------|-----|
| admin@ferreteria.com | admin123 | Administrador |
| ventas@ferreteria.com | ventas123 | Vendedor |

## 🌐 URLs del Sistema

- **Frontend (Tienda)**: http://localhost:5173
- **Panel Admin**: http://localhost:5173/administrador
- **Backend API**: http://localhost:3001

## 📦 Estructura del Proyecto

```
FerreteriaWeb2025/
├── backend/
│   ├── config/
│   │   └── db.js          # Configuración de PostgreSQL
│   ├── database/
│   │   └── setup.sql      # Script de inicialización
│   ├── server.js          # Servidor Express
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── auth/
    │   │   └── login.jsx
    │   ├── dashboard/
    │   │   ├── Dashboard.jsx
    │   │   ├── components/
    │   │   └── pages/
    │   └── main.jsx
    └── package.json
```

## ❓ Solución de Problemas

### Error: "Cannot connect to database"
- Verifica que PostgreSQL esté corriendo
- Confirma usuario y contraseña en `db.js`
- Verifica que la base de datos `Ferreteria_bd` exista

### Error: "Port 3001 already in use"
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID [número] /F

# Linux/Mac
lsof -ti:3001 | xargs kill -9
```

### Error: "Module not found"
```bash
# Reinstalar dependencias
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contribuir

1. Crear una rama: `git checkout -b feature/nueva-funcionalidad`
2. Hacer commit: `git commit -m "Agregar nueva funcionalidad"`
3. Push: `git push origin feature/nueva-funcionalidad`
4. Crear Pull Request

## 📧 Contacto

Si tienes problemas, contacta al equipo de desarrollo.