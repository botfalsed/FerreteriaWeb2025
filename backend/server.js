const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const app = express();
const PORT = 3001;

// IMPORTANTE: Middlewares ANTES de las rutas
app.use(cors());
app.use(express.json());

console.log("🔄 Iniciando servidor...");

// =================================================================
// RUTAS
// =================================================================

// Ruta raíz
app.get("/", (req, res) => {
    res.json({ message: "✅ Servidor funcionando" });
});

// Productos
app.get("/productos", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM productosJF LIMIT 20");
        res.json(result.rows);
    } catch (err) {
        console.error("Error productos:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// LOGIN - LA RUTA MÁS IMPORTANTE
app.post("/auth/login", async (req, res) => {
    console.log("\n🔐 POST /auth/login recibido");
    console.log("📦 Body:", req.body);

    const { correo, password } = req.body;

    if (!correo || !password) {
        console.log("❌ Faltan datos");
        return res.status(400).json({ message: "Faltan datos" });
    }

    try {
        console.log("🔍 Buscando usuario:", correo);
        
        const userResult = await db.query(
            "SELECT id, correo, password_hash, nombre, rol FROM usuarios_admin WHERE correo = $1",
            [correo]
        );

        const user = userResult.rows[0];

        if (!user) {
            console.log("❌ Usuario no existe");
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        console.log("✅ Usuario encontrado:", user.nombre);
        console.log("🔑 Comparando contraseñas...");
        console.log("   Recibida:", password);
        console.log("   En DB:", user.password_hash);

        if (password === user.password_hash) {
            console.log("✅ ¡LOGIN EXITOSO!\n");
            return res.json({
                message: "Autenticación exitosa",
                user: { id: user.id, nombre: user.nombre, rol: user.rol },
                token: "TOKEN_12345"
            });
        } else {
            console.log("❌ Contraseña incorrecta\n");
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

    } catch (err) {
        console.error("❌ Error en login:", err.message);
        return res.status(500).json({ error: err.message });
    }
});

// =================================================================
// INICIAR SERVIDOR
// =================================================================
async function startServer() {
    try {
        await db.query('SELECT NOW()');
        console.log('✅ PostgreSQL conectado\n');

        app.listen(PORT, () => {
            console.log("╔════════════════════════════════╗");
            console.log("║  🚀 SERVIDOR INICIADO         ║");
            console.log("║  📍 http://localhost:3001     ║");
            console.log("╚════════════════════════════════╝\n");
        });

    } catch (error) {
        console.error('❌ Error al iniciar:', error.message);
        process.exit(1);
    }
}

startServer();