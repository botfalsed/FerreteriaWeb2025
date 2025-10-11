const { Pool } = require("pg");

// Cambiar de Client a Pool para manejar múltiples peticiones
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "solsolperez",
  database: "Ferreteria_bd",
  port: 5432
});

pool.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch(err => console.error("❌ Error al conectar a PostgreSQL:", err));

module.exports = pool;