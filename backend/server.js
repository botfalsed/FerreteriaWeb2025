const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// RUTA DE PRUEBA
app.get("/api", (req, res) => {
  res.json({ message: "Servidor backend funcionando " });
});

// Ruta para obtener productos
app.get("/api/productos", (req, res) => {
  db.query("SELECT * FROM productos", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener productos" });
    }
    res.json(results);
  });
});

// Levantar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
