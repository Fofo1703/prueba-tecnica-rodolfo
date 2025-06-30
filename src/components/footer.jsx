import React, { useState, useRef } from 'react';

const images = [
  "https://picsum.photos/800/400?random=1",
  "https://picsum.photos/800/400?random=2",
  "https://picsum.photos/800/400?random=3",
  "https://picsum.photos/800/400?random=4",
  "https://picsum.photos/800/400?random=5"
];

const CircularImageGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef(null);
  const isDragging = useRef(false);

  const rotate = (direction) => {
    setActiveIndex((prev) =>
      direction === 'left'
        ? (prev - 1 + images.length) % images.length
        : (prev + 1) % images.length
    );
  };

  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || dragStartX.current === null) return;

    const deltaX = e.clientX - dragStartX.current;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        rotate('left');
      } else {
        rotate('right');
      }
      isDragging.current = false;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    dragStartX.current = null;
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Contenedor de las imágenes y el texto */}
      <div
        className="relative w-full lg:w-[70%] h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] overflow-hidden flex items-end justify-end px-4 mx-auto"
        onMouseDown={handleMouseDown}
      >

        {/* Texto fijo dentro del contenedor de las imágenes */}
        <div className="absolute left-4 bottom-[calc(22.5vh+16px)] z-30 text-left max-w-[60%]">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase">
            GALERÍA DE AVENTURAS
          </h2>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-lg transition">
            Ver galería
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>


        {images.map((src, index) => {
          const position = (index - activeIndex + images.length) % images.length;
          const isActive = index === activeIndex;

          const commonClasses = `
            absolute transition-all duration-500 ease-in-out
            object-cover rounded-lg shadow-lg cursor-grab
          `;

          const sizeClass = isActive
            ? 'h-[28vh] w-[50vw] sm:h-[45vh] sm:w-[45vw] md:h-[50vh] md:w-[35vw]'
            : 'h-[14vh] w-[24vw] sm:h-[22.5vh] sm:w-[25vw] md:h-[22.5vh] md:w-[20vw]';




          const zIndex = isActive ? 'z-20' : 'z-10';
          const opacity = isActive ? 'opacity-100' : 'opacity-60';

          let translateX = 'translate-x-0';
          if (position === -1 || position === images.length - 1)
            translateX = 'translate-x-[-35vw] sm:translate-x-[-26vw]';
          if (position === -2 || position === images.length - 2)
            translateX = 'translate-x-[-65vw] sm:translate-x-[-52vw]';
          if (position === 1 || position === -images.length + 1)
            translateX = 'translate-x-[20vw] sm:translate-x-[14vw]';
          if (position === 2 || position === -images.length + 2)
            translateX = 'translate-x-[35vw] sm:translate-x-[26vw]';

          return (
            <img
              key={index}
              src={src}
              alt={`img-${index}`}
 className={`${commonClasses} ${sizeClass} ${translateX} ${zIndex} ${opacity} bottom-[7vh] sm:bottom-0`}

            />
          );
        })}
      </div>
    </div>
  );
};

export default CircularImageGallery;
