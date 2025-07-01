import React, { useState, useEffect } from 'react';

export default function GaleriaAventuras() {
  const imagenes = [
    'https://picsum.photos/800/400?random=1',
    'https://picsum.photos/800/400?random=2',
    'https://picsum.photos/800/400?random=3',
  ];

   // Estado para controlar el índice actual de la imagen principal
  const [index, setIndex] = useState(0);

  // useEffect para rotar automáticamente las imágenes cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagenes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [imagenes.length]);

// Calcula las 3 imágenes que se mostrarán en orden
  const rotacion = [
    imagenes[(index + 0) % imagenes.length],
    imagenes[(index + 1) % imagenes.length],
    imagenes[(index + 2) % imagenes.length],
  ];

  return (
    <section className="bg-[#1B171D] py-20 px-4 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-6">
        {/* Contenido izquierdo (texto y pequeñas) */}
        <div className="relative flex-1 w-full md:w-[55%] flex-col md:flex gap-4 items-end hidden">
          {/* Texto sobre imágenes pequeñas solo en desktop */}
          <div className="relative md:absolute z-10 md:top-[-12rem] left-0 right-0 px-4 md:px-6 text-center md:text-left">
            <h2
              className="text-white text-3xl md:text-5xl font-bold uppercase tracking-wider"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              GALERÍA DE AVENTURAS
            </h2>
            <button className="mt-4 inline-flex items-center gap-2 bg-[#BE1818] hover:bg-red-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition">
              Ver galería
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Imágenes pequeñas en escritorio */}
          <div className="flex flex-row gap-4">
            {rotacion.slice(0, 2).map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Secundaria ${i + 1}`}
                className="h-44 w-1/2 object-cover rounded-2xl shadow-md opacity-90 transition-all duration-700"
              />
            ))}
          </div>
        </div>

        {/* Imagen principal con texto visible en móvil y desktop */}
        <div className="w-full md:w-[45%] flex flex-col items-center md:items-end">
          
          <div className="md:hidden text-center mb-6">
            <h2
              className="text-white text-3xl font-bold uppercase tracking-wider"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              GALERÍA DE AVENTURAS
            </h2>
            <button className="mt-4 inline-flex items-center gap-2 bg-[#BE1818] hover:bg-red-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition">
              Ver galería
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Imagen principal visible en todos los tamaños */}
          <img
            src={rotacion[2]}
            alt="Imagen principal"
            className="h-96 w-full object-cover rounded-2xl shadow-xl transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
}
