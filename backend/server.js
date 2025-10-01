const express = require("express");
const cors = require("cors"); // 1. Importamos CORS
const db = require("./config/db"); // Asegúrate de que esta ruta sea correcta
const app = express();
const PORT = 3001; // El puerto al que apunta el frontend

// 2. Habilitamos CORS para todas las solicitudes
app.use(cors()); 

app.use(express.json()); 


// Ruta para obtener productos
app.get("/productos", async (req, res) => {
  try {
    // Consulta a la base de datos PostgreSQL
    const result = await db.query("SELECT * FROM productosJF LIMIT 20");
    
    res.json(result.rows); 
    
  } catch (err) {
    console.error("Error en la consulta a la base de datos:", err.message);
    // Si hay un error de DB, lo reportamos claramente
    res.status(500).json({ error: "Error interno del servidor al consultar la DB.", details: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  console.log("✅ CORS Habilitado. El frontend debería poder conectarse.");
});