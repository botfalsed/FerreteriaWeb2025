// Contacto.jsx
import React, { useState } from "react";

function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes conectar con tu backend o enviar el formulario (ej. vía API)
    console.log("Formulario enviado:", formData);
    alert("¡Mensaje enviado! Te contactaremos pronto.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="container mx-auto px-4 py-8 md:px-8 md:py-12 bg-gray-50">
      {/* Sección Hero */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white p-12 md:p-20 rounded-2xl shadow-2xl mb-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-opacity-30 bg-black rounded-2xl"></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in">
            Contáctanos
          </h2>
          <p className="text-lg md:text-xl mb-8 font-light">
            Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos lo antes posible.
          </p>
        </div>
      </section>

      {/* Sección Formulario y Contacto */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
        {/* Formulario */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Envíanos un mensaje
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>

        {/* Datos de Contacto */}
        <div className="p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Información de Contacto
          </h3>
          <p className="text-gray-600 mb-4">
            <strong>Email:</strong> contacto@jumelsa.com
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Teléfono:</strong> +51 123 456 789
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Dirección:</strong> Av. Principal 123, Lima, Perú
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Horario:</strong> Lunes a Sábado, 8:00 AM - 6:00 PM
          </p>
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Síguenos en redes
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 3.668.227 1.981 1.911 1.826 5.294.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.227 3.383 1.911 5.07 5.294 5.226 1.279.058 1.688.072 4.948.072s3.668-.014 4.948-.072c3.383-.227 5.07-1.911 5.226-5.294.058-1.279.072-1.688.072-4.948s-.014-3.668-.072-4.948c-.227-3.383-1.911-5.07-5.294-5.226C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contacto;