const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "TU_CONTRASEÑA_AQUI", // ⚠️ CAMBIAR
  database: "Ferreteria_bd",
  port: 5432
});

module.exports = pool;