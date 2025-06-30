import { useState, useRef, useCallback, useEffect } from 'react';
import Navbar from '../../components/navbar';
import FooterGallery from '../../components/footer';

const CircularImageGallery = () => {
  const [rotation, setRotation] = useState(-90); // 👈 Coloca la imagen 0 arriba
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastAngleRef = useRef(0);
  const centerRef = useRef(null);

  const images = [
    {
      id: 1,
      src: 'https://picsum.photos/300/200?random=1',
      title: 'Bosque Privado',
      description: 'Recorrido dentro de nuestro bosque privado'
    },
    {
      id: 2,
      src: 'https://picsum.photos/300/200?random=2',
      title: 'Grupos Reducidos',
      description: 'Tours personalizados con grupos pequeños'
    },
    {
      id: 3,
      src: 'https://picsum.photos/300/200?random=3',
      title: 'Guías Especializados',
      description: 'Acompañamiento profesional durante todo el tour'
    },
    {
      id: 4,
      src: 'https://picsum.photos/300/200?random=4',
      title: 'Aventura Nocturna',
      description: 'Explora la naturaleza bajo las estrellas'
    },
    {
      id: 5,
      src: 'https://picsum.photos/300/200?random=5',
      title: 'Fauna Silvestre',
      description: 'Observa animales únicos en su hábitat natural'
    },
    {
      id: 6,
      src: 'https://picsum.photos/300/200?random=6',
      title: 'Senderos Naturales',
      description: 'Disfruta de caminos escondidos llenos de belleza'
    }
  ];

  const radius = 200;

  const getAngle = useCallback((clientX, clientY) => {
    if (!centerRef.current) return 0;
    const rect = centerRef.current.getBoundingClientRect();
    const centerXAbs = rect.left + rect.width / 2;
    const centerYAbs = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerYAbs, clientX - centerXAbs);
  }, []);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    lastAngleRef.current = getAngle(e.clientX, e.clientY);
  }, [getAngle]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const currentAngle = getAngle(e.clientX, e.clientY);
    const angleDiff = currentAngle - lastAngleRef.current;

    let normalizedDiff = angleDiff;
    if (Math.abs(angleDiff) > Math.PI) {
      normalizedDiff = angleDiff > 0 ? angleDiff - 2 * Math.PI : angleDiff + 2 * Math.PI;
    }

    setRotation(prev => prev + normalizedDiff * (180 / Math.PI));
    lastAngleRef.current = currentAngle;
  }, [isDragging, getAngle]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // ✅ Lógica corregida para imagen activa
  const calculateActiveIndex = useCallback(() => {
    const anglePerImage = 360 / images.length;

    for (let index = 0; index < images.length; index++) {
      const imageAngle = (index * anglePerImage + rotation) * (Math.PI / 180);
      const angleFromTop = Math.abs((imageAngle - Math.PI / 2 + 0.45 * Math.PI) % (2 * Math.PI));
      if (angleFromTop < (Math.PI / images.length)) {
        return index;
      }
    }
    return 0;
  }, [rotation, images.length]);

  useEffect(() => {
    const index = calculateActiveIndex();
    setActiveIndex(index);
  }, [rotation, calculateActiveIndex]);

  useEffect(() => {
    const index = calculateActiveIndex();
    setActiveIndex(index);
  }, []); // se ejecuta al cargar

  const activeImage = images[activeIndex] || images[0];

  return (
    <>
      <Navbar />
      <div className="relative flex flex-col md:flex-row items-start justify-center min-h-screen bg-black px-4 py-8">

        {/* Galería circular */}
        <div
          ref={centerRef}
          className="relative mt-28 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          style={{ userSelect: 'none' }}
        >
          {/* Imagen central */}
          <div
            className="absolute w-28 h-28 transition-transform duration-100 ease-out z-30"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              backgroundImage: `url('/images/Llanta.png')`,
              backgroundSize: 'cover'
            }}
          />

          {/* Tarjetas en círculo */}
          {images.map((image, index) => {
            const anglePerImage = 360 / images.length;
            const imageAngle = (index * anglePerImage + rotation) * (Math.PI / 180);

            const containerSize = 500;
            const centerPos = containerSize / 2;
            const x = centerPos + Math.cos(imageAngle - Math.PI / 2) * radius;
            const y = centerPos + Math.sin(imageAngle - Math.PI / 2) * radius;

            const angleFromTop = Math.abs((imageAngle - Math.PI / 2 + 0.45 * Math.PI) % (2 * Math.PI));
            const isActive = angleFromTop < (Math.PI / images.length);

            const scale = isActive ? 1.1 : 0.9;
            const opacity = isActive ? 1 : 0.6;
            const zIndex = isActive ? 20 : 10;

            return (
              <div
                key={image.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex
                }}
              >
                <div className="w-40 bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-300 text-center">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-24 object-cover"
                    draggable={false}
                  />
                  <div className="py-2 text-black font-semibold text-sm">
                    {image.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Texto flotante a la derecha */}
        <div className="absolute mt-20 left-1/2 md:left-[calc(50%+180px)] text-white max-w-xs px-4 text-left z-50">
          <p className="text-xl sm:text-2xl font-semibold leading-snug mb-2">
            {activeImage.description}
          </p>
          <p className="text-red-600 font-bold">SUPER QUADS</p>
        </div>
      </div>

      <FooterGallery />
    </>
  );
};

export default CircularImageGallery;










// import { useState, useRef, useCallback, useEffect } from 'react';
// import Navbar from '../../components/navbar';
// import FooterGallery from '../../components/footer';

// const CircularImageGallery = () => {
//   const [rotation, setRotation] = useState(-180 / 6 / 2); // Centra la imagen 0 arriba
//   const [isDragging, setIsDragging] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const lastAngleRef = useRef(0);
//   const centerRef = useRef(null);

//   const images = [
//     {
//       id: 1,
//       src: '/images/021.jpg',
//       title: 'Bosque Privado',
//       description: 'Recorrido dentro de nuestro bosque privado'
//     },
//     {
//       id: 2,
//       src: '/images/021.jpg',
//       title: 'Grupos Reducidos',
//       description: 'Tours personalizados con grupos pequeños'
//     },
//     {
//       id: 3,
//       src: '/images/021.jpg',
//       title: 'Guías Especializados',
//       description: 'Acompañamiento profesional durante todo el tour'
//     },
//     {
//       id: 4,
//       src: '/images/021.jpg',
//       title: 'Aventura Nocturna',
//       description: 'Explora la naturaleza bajo las estrellas'
//     },
//     {
//       id: 5,
//       src: 'images/021.jpg',
//       title: 'Fauna Silvestre',
//       description: 'Observa animales únicos en su hábitat natural'
//     },
//     {
//       id: 6,
//       src: '/images/021.jpg',
//       title: 'Senderos Naturales',
//       description: 'Disfruta de caminos escondidos llenos de belleza'
//     }
//   ];

//   const radius = 200;

//   const getAngle = useCallback((clientX, clientY) => {
//     if (!centerRef.current) return 0;
//     const rect = centerRef.current.getBoundingClientRect();
//     const centerXAbs = rect.left + rect.width / 2;
//     const centerYAbs = rect.top + rect.height / 2;
//     return Math.atan2(clientY - centerYAbs, clientX - centerXAbs);
//   }, []);

//   const handleMouseDown = useCallback((e) => {
//     e.preventDefault();
//     setIsDragging(true);
//     lastAngleRef.current = getAngle(e.clientX, e.clientY);
//   }, [getAngle]);

//   const handleMouseMove = useCallback((e) => {
//     if (!isDragging) return;
//     const currentAngle = getAngle(e.clientX, e.clientY);
//     const angleDiff = currentAngle - lastAngleRef.current;

//     let normalizedDiff = angleDiff;
//     if (Math.abs(angleDiff) > Math.PI) {
//       normalizedDiff = angleDiff > 0 ? angleDiff - 2 * Math.PI : angleDiff + 2 * Math.PI;
//     }

//     setRotation(prev => prev + normalizedDiff * (180 / Math.PI));
//     lastAngleRef.current = currentAngle;
//   }, [isDragging, getAngle]);

//   const handleMouseUp = useCallback(() => {
//     setIsDragging(false);
//   }, []);

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//       return () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         document.removeEventListener('mouseup', handleMouseUp);
//       };
//     }
//   }, [isDragging, handleMouseMove, handleMouseUp]);
//   const calculateActiveIndex = useCallback(() => {
//     const anglePerImage = 360 / images.length;
//     for (let index = 0; index < images.length; index++) {
//       const imageAngle = (index * anglePerImage + rotation) * (Math.PI / 180);
//       const angleFromTop = Math.abs((imageAngle - Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI));
//       if (angleFromTop < (Math.PI / images.length)) {
//         return index;
//       }
//     }
//     return 0;
//   }, [rotation, images.length]);

//   useEffect(() => {
//     setActiveIndex(calculateActiveIndex());
//   }, [rotation, calculateActiveIndex]);

//   useEffect(() => {
//     setActiveIndex(calculateActiveIndex());
//   }, []); // ejecuta al cargar

//   const activeImage = images[activeIndex] || images[0];

//   return (
//     <>
//       <Navbar />
//       <div className="relative flex flex-col md:flex-row items-start justify-center min-h-screen bg-black px-4 py-8">
//         {/* Galería circular */}
//         <div
//           ref={centerRef}
//           className="relative mt-28 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] cursor-grab active:cursor-grabbing select-none"
//           onMouseDown={handleMouseDown}
//           style={{ userSelect: 'none' }}
//         >
//           {/* Imagen central (rueda) */}
//           <div
//             className="absolute w-28 h-28 transition-transform duration-100 ease-out z-30"
//             style={{
//               left: '50%',
//               top: '50%',
//               transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
//               backgroundImage: `url('/images/Llanta.png')`,
//               backgroundSize: 'cover'
//             }}
//           />

//           {/* Tarjetas en círculo */}
//           {images.map((image, index) => {
//             const anglePerImage = 360 / images.length;
//             const imageAngle = (index * anglePerImage + rotation) * (Math.PI / 180);
//             const containerSize = 500;
//             const centerPos = containerSize / 2;
//             const x = centerPos + Math.cos(imageAngle - Math.PI / 2) * radius;
//             const y = centerPos + Math.sin(imageAngle - Math.PI / 2) * radius;

//             const angleFromTop = Math.abs((imageAngle - Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI));
//             const isActive = angleFromTop < (Math.PI / images.length);

//             const scale = isActive ? 1.1 : 0.9;
//             const opacity = isActive ? 1 : 0.6;
//             const zIndex = isActive ? 20 : 10;

//             return (
//               <div
//                 key={image.id}
//                 className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
//                 style={{
//                   left: `${x}px`,
//                   top: `${y}px`,
//                   transform: `translate(-50%, -50%) scale(${scale})`,
//                   opacity: opacity,
//                   zIndex: zIndex
//                 }}
//               >
//                 <div className="w-40 bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-300 text-center">
//                   <img
//                     src={image.src}
//                     alt={image.title}
//                     className="w-full h-24 object-cover"
//                     draggable={false}
//                   />
//                   <div className="py-2 text-black font-semibold text-sm">
//                     {image.title}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Texto dinámico a la derecha */}
//         <div className="absolute mt-20 left-1/2 md:left-[calc(50%+180px)] text-white max-w-xs px-4 text-left z-50">
//           <p className="text-xl sm:text-2xl font-semibold leading-snug mb-2">
//             {activeImage.description}
//           </p>
//           <p className="text-red-600 font-bold">SUPER QUADS</p>
//         </div>
//       </div>

//       <FooterGallery />
//     </>
//   );
// };

// export default CircularImageGallery;
