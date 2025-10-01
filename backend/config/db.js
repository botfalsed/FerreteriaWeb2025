const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "solsolperez",
  database: "Ferreteria_bd",
  port: 5432
});

client.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch(err => console.error("❌ Error al conectar a PostgreSQL:", err));

module.exports = client;
