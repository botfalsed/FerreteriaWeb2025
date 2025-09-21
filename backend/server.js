const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db"); // Asegúrate de que esta ruta sea correcta

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// RUTA PRINCIPAL (OPCIONAL)
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Ferretería San José");
});

// Ruta para obtener todos los productos de la base de datos
app.get("/api/productos", (req, res) => {
  // Consulta a la tabla 'productos' en MySQL
  db.query("SELECT * FROM productos", (err, results) => {
    if (err) {
      // Si hay un error en la consulta, lo registramos y enviamos una respuesta de error
      console.error("❌ Error al obtener productos:", err);
      return res.status(500).json({ error: "Error interno del servidor al obtener productos." });
    }
    // Si la consulta es exitosa, enviamos los resultados como JSON
    res.json(results);
  });
});

// Levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});