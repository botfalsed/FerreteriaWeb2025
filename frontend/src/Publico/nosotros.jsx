// Nosotros.jsx
import React from "react";

function Nosotros() {
  return (
    <main className="container mx-auto px-4 py-8 md:px-8 md:py-12 bg-gray-50">
      {/* Sección Hero */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white p-12 md:p-20 rounded-2xl shadow-2xl mb-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-opacity-30 bg-black rounded-2xl"></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in">
            Sobre Ferretería JUMELSA
          </h2>
          <p className="text-lg md:text-xl mb-8 font-light">
            Conoce nuestra historia, compromiso y pasión por ofrecerte lo mejor en herramientas y materiales.
          </p>
        </div>
      </section>

      {/* Sección Historia */}
      <section className="py-12">
        <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8 text-center">
          Nuestra Historia
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Fundada en 2010, Ferretería JUMELSA nació con la visión de ser el aliado número uno de los constructores, carpinteros y aficionados al bricolaje en Lima, Perú. Desde nuestros inicios, nos hemos dedicado a ofrecer productos de calidad y un servicio excepcional, convirtiéndonos en un referente en el sector.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mt-4">
              Con más de una década de experiencia, seguimos creciendo gracias a la confianza de nuestros clientes y nuestro compromiso con la innovación.
            </p>
          </div>
          <img
            src="https://placehold.co/500x300"
            alt="Equipo JUMELSA"
            className="w-full h-64 object-cover rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Sección Misión y Visión */}
      <section className="py-12 bg-white rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6">
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Nuestra Misión</h4>
            <p className="text-gray-600">
              Proveer herramientas y materiales de alta calidad que permitan a nuestros clientes llevar a cabo sus proyectos con éxito, ofreciendo un servicio personalizado y precios competitivos.
            </p>
          </div>
          <div className="p-6">
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Nuestra Visión</h4>
            <p className="text-gray-600">
              Ser la ferretería líder en el Perú, reconocida por nuestra innovación, calidad y compromiso con la satisfacción del cliente.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Nosotros;