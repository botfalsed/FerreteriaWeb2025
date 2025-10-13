const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const app = express();
const PORT = 3001;

// IMPORTANTE: Middlewares ANTES de las rutas
app.use(cors());
app.use(express.json());
const bcrypt = require('bcryptjs');
console.log("🔄 Iniciando servidor...");

// =================================================================
// RUTAS
// =================================================================

// Ruta raíz
app.get("/", (req, res) => {
    res.json({ message: "✅ Servidor funcionando" });
});



// 1. POST - Crear nuevo producto
app.get("/productos/next-code", async (req, res) => {
    console.log("🔢 GET /productos/next-code - Generar siguiente código");
    
    try {
        // Buscar el último código que empiece con "COD" seguido de números
        const result = await db.query(`
            SELECT codigo FROM productosjf 
            WHERE codigo ~ '^COD[0-9]+$'
            ORDER BY LENGTH(codigo) DESC, codigo DESC
            LIMIT 1
        `);

        let nextNumber = 1;
        
        if (result.rows.length > 0) {
            const lastCode = result.rows[0].codigo;
            console.log(`📋 Último código encontrado: ${lastCode}`);
            
            // Extraer el número después de "COD"
            const match = lastCode.match(/COD(\d+)/);
            if (match) {
                nextNumber = parseInt(match[1]) + 1;
            }
        } else {
            console.log("⚠️ No se encontraron códigos COD, empezando desde 1");
        }

        const nextCode = `COD${nextNumber}`;
        console.log(`✅ Siguiente código generado: ${nextCode}`);
        
        res.json({ 
            nextCode: nextCode,
            lastFound: result.rows[0]?.codigo || 'ninguno' 
        });

    } catch (err) {
        console.error("❌ Error al generar código:", err.message);
        res.status(500).json({ 
            error: "Error al generar el código",
            details: err.message 
        });
    }
});

// 1. POST - Crear nuevo producto
app.get("/productos", async (req, res) => {
    const searchTerm = req.query.search;
    let queryText;
    let queryParams = [];

    try {
        if (searchTerm) {
            queryText = `
                SELECT 
                    codigo, 
                    nombre, 
                    descripcion, 
                    marca, 
                    modelo, 
                    ubicacion, 
                    medida, 
                    stock, 
                    unidaddemedida, 
                    precioalpublico,
                    categoria_id
                FROM productosjf
                WHERE 
                    CAST(codigo AS TEXT) ILIKE $1 OR
                    CAST(nombre AS TEXT) ILIKE $1 OR
                    CAST(marca AS TEXT) ILIKE $1 OR
                    CAST(modelo AS TEXT) ILIKE $1 OR
                    CAST(ubicacion AS TEXT) ILIKE $1
                ORDER BY nombre ASC
            `;
            queryParams = [`%${searchTerm}%`];
            console.log(`🔍 Buscando productos que coincidan con: ${searchTerm}`);
        } else {
            queryText = `
                SELECT 
                    codigo, 
                    nombre, 
                    descripcion, 
                    marca, 
                    modelo, 
                    ubicacion, 
                    medida, 
                    stock, 
                    unidaddemedida, 
                    precioalpublico,
                    categoria_id
                FROM productosjf 
                ORDER BY nombre ASC
            `;
            console.log("📦 Listando todos los productos");
        }

        const result = queryParams.length > 0
            ? await db.query(queryText, queryParams)
            : await db.query(queryText);

        console.log(`✅ ${result.rows.length} productos encontrados.`);
        res.json(result.rows);

    } catch (err) {
        console.error("❌ Error al consultar productos:", err.message);
        res.status(500).json({
            error: "Error interno del servidor al consultar la DB.",
            details: err.message,
        });
    }
});

// 2. PUT - Actualizar producto existente
app.put("/productos/:codigo", async (req, res) => {
    console.log(`\n✏️ PUT /productos/${req.params.codigo} - Actualizar producto`);

    const codigoOriginal = req.params.codigo;
    const { nombre, descripcion, marca, modelo, ubicacion, medida, stock, unidaddemedida, precioalpublico } = req.body;

    try {
        // Verificar que el producto existe
        const productExists = await db.query(
            "SELECT codigo FROM productosjf WHERE codigo = $1",
            [codigoOriginal]
        );

        if (productExists.rows.length === 0) {
            console.log("❌ Producto no encontrado");
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        // Actualizar producto
        const result = await db.query(
            `UPDATE productosjf 
             SET nombre = $1, descripcion = $2, marca = $3, modelo = $4, 
                 ubicacion = $5, medida = $6, stock = $7, unidaddemedida = $8, precioalpublico = $9
             WHERE codigo = $10
             RETURNING *`,
            [nombre, descripcion, marca, modelo, ubicacion, medida, stock, unidaddemedida, precioalpublico, codigoOriginal]
        );

        console.log("✅ Producto actualizado:", result.rows[0].codigo);
        res.json({
            message: "Producto actualizado exitosamente",
            product: result.rows[0]
        });

    } catch (err) {
        console.error("❌ Error al actualizar producto:", err.message);
        res.status(500).json({ 
            error: "Error interno al actualizar el producto",
            details: err.message 
        });
    }
});

// 3. DELETE - Eliminar producto
app.delete("/productos/:codigo", async (req, res) => {
    console.log(`\n🗑️ DELETE /productos/${req.params.codigo} - Eliminar producto`);

    const codigo = req.params.codigo;

    try {
        const result = await db.query(
            "DELETE FROM productosjf WHERE codigo = $1 RETURNING codigo, nombre",
            [codigo]
        );

        if (result.rows.length === 0) {
            console.log("❌ Producto no encontrado");
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        console.log("✅ Producto eliminado:", result.rows[0].codigo);
        res.json({ 
            message: "Producto eliminado exitosamente",
            product: result.rows[0]
        });

    } catch (err) {
        console.error("❌ Error al eliminar producto:", err.message);
        res.status(500).json({ 
            error: "Error interno al eliminar el producto",
            details: err.message 
        });
    }
});

app.get("/api/publico/productos", async (req, res) => {
    const queryText = `
        SELECT 
            p.codigo, 
            p.nombre, 
            p.descripcion, 
            p.marca,
            p.modelo,
            p.ubicacion,
            p.medida,
            p.stock AS existencias, 
            p.unidaddemedida,
            p.precioalpublico AS precio_venta,
            
            -- 🔥 IMPORTANTE: convertir el id a entero para evitar errores de tipo
            CAST(p.categoria_id AS INTEGER) AS categoria_id,
            
            -- Si no hay categoría, se pone "Sin Categoría"
            COALESCE(c.nombre, 'Sin Categoría') AS categoria_nombre,
            COALESCE(c.descripcion, '') AS categoria_descripcion

        FROM productosjf p
        LEFT JOIN categorias c ON p.categoria_id = c.id_categoria
        ORDER BY p.nombre ASC;
    `;

    try {
        const result = await db.query(queryText);

        console.log(`[PUBLICO] ✅ ${result.rows.length} productos servidos correctamente.`);
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Error al consultar productos públicos:", err.message);
        res.status(500).json({
            error: "Error interno del servidor al consultar el catálogo de productos.",
            details: err.message
        });
    }
});

app.get("/usuarios", async (req, res) => {
    console.log("📋 GET /usuarios - Obteniendo lista de usuarios");
    
    try {
        const result = await db.query(
            "SELECT id, correo, nombre, rol, activo, fecha_creacion FROM usuarios_admin ORDER BY id ASC"
        );
        
        console.log(`✅ ${result.rows.length} usuarios encontrados`);
        res.json(result.rows);
        
    } catch (err) {
        console.error("❌ Error al obtener usuarios:", err.message);
        res.status(500).json({ 
            error: "Error interno del servidor al consultar usuarios.",
            details: err.message 
        });
    }
});

// 2. POST - Crear un nuevo usuario
app.post("/usuarios", async (req, res) => {
    console.log("\n➕ POST /usuarios - Crear nuevo usuario");
    console.log("📦 Datos recibidos:", req.body);
    
    const { correo, password, nombre, rol, activo } = req.body;

    // Validaciones básicas
    if (!correo || !password || !nombre || !rol) {
        console.log("❌ Faltan campos requeridos");
        return res.status(400).json({ 
            error: "Faltan campos requeridos: correo, password, nombre, rol" 
        });
    }

    if (password.length < 6) {
        console.log("❌ Contraseña muy corta");
        return res.status(400).json({ 
            error: "La contraseña debe tener al menos 6 caracteres" 
        });
    }

    try {
        // Verificar si el correo ya existe
        const existingUser = await db.query(
            "SELECT id FROM usuarios_admin WHERE correo = $1",
            [correo]
        );

        if (existingUser.rows.length > 0) {
            console.log("❌ El correo ya está registrado:", correo);
            return res.status(409).json({ 
                error: "El correo electrónico ya está registrado" 
            });
        }

        // Insertar el nuevo usuario
        // NOTA: Por ahora usamos password en texto plano (CAMBIAR A BCRYPT EN PRODUCCIÓN)
        const result = await db.query(
            `INSERT INTO usuarios_admin (correo, password_hash, nombre, rol, activo) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id, correo, nombre, rol, activo, fecha_creacion`,
            [correo, password, nombre, rol, activo !== undefined ? activo : true]
        );

        const newUser = result.rows[0];
        console.log("✅ Usuario creado exitosamente:", newUser.id);

        res.status(201).json({
            message: "Usuario creado exitosamente",
            user: newUser
        });

    } catch (err) {
        console.error("❌ Error al crear usuario:", err.message);
        res.status(500).json({ 
            error: "Error interno del servidor al crear el usuario",
            details: err.message 
        });
    }
});

// 3. PUT - Actualizar un usuario existente
app.put("/usuarios/:id", async (req, res) => {
    console.log(`\n✏️ PUT /usuarios/${req.params.id} - Actualizar usuario`);
    
    const userId = req.params.id;
    const { correo, nombre, rol, activo } = req.body;

    try {
        // Verificar que el usuario existe
        const userExists = await db.query(
            "SELECT id FROM usuarios_admin WHERE id = $1",
            [userId]
        );

        if (userExists.rows.length === 0) {
            console.log("❌ Usuario no encontrado");
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Actualizar usuario
        const result = await db.query(
            `UPDATE usuarios_admin 
             SET correo = $1, nombre = $2, rol = $3, activo = $4
             WHERE id = $5
             RETURNING id, correo, nombre, rol, activo, fecha_creacion`,
            [correo, nombre, rol, activo, userId]
        );

        console.log("✅ Usuario actualizado:", result.rows[0].id);
        res.json({
            message: "Usuario actualizado exitosamente",
            user: result.rows[0]
        });

    } catch (err) {
        console.error("❌ Error al actualizar usuario:", err.message);
        res.status(500).json({ 
            error: "Error interno del servidor al actualizar usuario",
            details: err.message 
        });
    }
});

// 4. DELETE - Eliminar un usuario
app.delete("/usuarios/:id", async (req, res) => {
    console.log(`\n🗑️ DELETE /usuarios/${req.params.id} - Eliminar usuario`);
    
    const userId = req.params.id;

    try {
        const result = await db.query(
            "DELETE FROM usuarios_admin WHERE id = $1 RETURNING id",
            [userId]
        );

        if (result.rows.length === 0) {
            console.log("❌ Usuario no encontrado");
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        console.log("✅ Usuario eliminado:", userId);
        res.json({ message: "Usuario eliminado exitosamente" });

    } catch (err) {
        console.error("❌ Error al eliminar usuario:", err.message);
        res.status(500).json({ 
            error: "Error interno del servidor al eliminar usuario",
            details: err.message 
        });
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