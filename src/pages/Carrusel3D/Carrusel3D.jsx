import { useState, useRef, useCallback, useEffect } from 'react';
import Navbar from '../../components/navbar';
import GaleriaAventuras from '../../components/footer';

const CircularImageGallery = () => {

  const [rotation, setRotation] = useState(-90); // Ángulo inicial de rotación de la galería
  const [isDragging, setIsDragging] = useState(false); // Controla si se está arrastrando
  const [activeIndex, setActiveIndex] = useState(0); // Índice de la imagen activa
  const [radius, setRadius] = useState(120); // Radio del círculo donde orbitan las tarjetas
  const lastAngleRef = useRef(0); // Último ángulo detectado (para calcular diferencia)
  const centerRef = useRef(null); // Referencia al centro del contenedor


  const images = [
    { id: 1, src: 'https://picsum.photos/300/200?random=1', title: 'Bosque Privado', description: 'Recorrido dentro de nuestro bosque privado' },
    { id: 2, src: 'https://picsum.photos/300/200?random=2', title: 'Grupos Reducidos', description: 'Tours personalizados con grupos pequeños' },
    { id: 3, src: 'https://picsum.photos/300/200?random=3', title: 'Guías Especializados', description: 'Acompañamiento profesional durante todo el tour' },
    { id: 4, src: 'https://picsum.photos/300/200?random=4', title: 'Aventura Nocturna', description: 'Explora la naturaleza bajo las estrellas' },
    { id: 5, src: 'https://picsum.photos/300/200?random=5', title: 'Fauna Silvestre', description: 'Observa animales únicos en su hábitat natural' },
    { id: 6, src: 'https://picsum.photos/300/200?random=6', title: 'Senderos Naturales', description: 'Disfruta de caminos escondidos llenos de belleza' }
  ];

  //Ajuste dinámico del radio según tamaño de pantalla
  const getResponsiveRadius = () => {
    const width = window.innerWidth;
    if (width < 640) return 120;   // móvil
    if (width < 1024) return 180;  // tablet
    if (width < 1280) return 240;  // laptop
    return 300;                    // desktop grande
  };

  useEffect(() => {
    setRadius(getResponsiveRadius()); // Inicializa radio al montar
    const handleResize = () => setRadius(getResponsiveRadius()); // Responde al cambio de tamaño
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //Obtención del ángulo entre el cursor y el centro
  const getAngle = useCallback((clientX, clientY) => {
    if (!centerRef.current) return 0;
    const rect = centerRef.current.getBoundingClientRect();
    const centerXAbs = rect.left + rect.width / 2;
    const centerYAbs = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerYAbs, clientX - centerXAbs);
  }, []);

  //Eventos de arrastre del ratón
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    lastAngleRef.current = getAngle(e.clientX, e.clientY); // Guarda ángulo inicial
  }, [getAngle]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const currentAngle = getAngle(e.clientX, e.clientY);
    const angleDiff = currentAngle - lastAngleRef.current;

    let normalizedDiff = angleDiff;
    // Ajuste para rotación circular completa
    if (Math.abs(angleDiff) > Math.PI) {
      normalizedDiff = angleDiff > 0 ? angleDiff - 2 * Math.PI : angleDiff + 2 * Math.PI;
    }

    setRotation(prev => prev + normalizedDiff * (180 / Math.PI));
    lastAngleRef.current = currentAngle;
  }, [isDragging, getAngle]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Activar/desactivar los listeners globales al mover
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

  //Detectar la tarjeta que está en la parte superior
  const calculateActiveIndex = useCallback(() => {
    const anglePerImage = 360 / images.length;
    for (let index = 0; index < images.length; index++) {
      const imageAngle = (index * anglePerImage + rotation) * (Math.PI / 180);
      const angleFromTop = Math.abs((imageAngle - Math.PI / 2 + 0.45 * Math.PI) % (2 * Math.PI));
      if (angleFromTop < (Math.PI / images.length)) return index;
    }
    return 0;
  }, [rotation, images.length]);

  useEffect(() => {
    setActiveIndex(calculateActiveIndex()); // Recalcula al rotar
  }, [rotation, calculateActiveIndex]);

  const activeImage = images[activeIndex] || images[0];// Imagen que está arriba



  return (
    <>
      <Navbar />
      <div className="relative flex flex-col md:flex-row items-start justify-center h-auto bg-black px-4 py-14">

        {/* Texto dinámico */}
        <div className="w-full md:w-auto text-white px-4 z-50 mb-8 md:mb-0 text-center md:text-left 
          md:absolute md:mt-20 
          md:left-[calc(50%+200px)] 
          lg:left-[calc(50%+260px)] 
          xl:left-[calc(50%+300px)] 
          max-w-xl md:max-w-sm lg:max-w-xs">
          <p className="text-xl sm:text-2xl font-semibold leading-snug mb-2">
            {activeImage.description}
          </p>
          <p className="text-red-600 font-bold">SUPER QUADS</p>
        </div>

        {/* Galería circular */}
        <div
          ref={centerRef}
          className="relative mt-2 md:mt-28 lg:mt-24 xl:mt-20 
      w-[280px] sm:w-[400px] md:w-[550px] lg:w-[650px] xl:w-[750px] 
      h-[280px] sm:h-[400px] md:h-[550px] lg:h-[650px] xl:h-[750px] 
      cursor-grab active:cursor-grabbing select-none mx-auto"
          onMouseDown={handleMouseDown}
          style={{ userSelect: 'none' }}
        >

          <div
            className="absolute w-20 sm:w-24 md:w-32 lg:w-60 xl:w-72 h-20 sm:h-24 md:h-32 lg:h-60 xl:h-72 transition-transform duration-100 ease-out z-30"
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

            // Se calcula posición x, y de cada tarjeta según el ángulo
            const imageAngle = (index * anglePerImage + rotation) * (Math.PI / 180);
            const container = centerRef.current;
            const centerX = container?.offsetWidth / 2 || 0;
            const centerY = container?.offsetHeight / 2 || 0;
            const x = centerX + Math.cos(imageAngle - Math.PI / 2) * radius;
            const y = centerY + Math.sin(imageAngle - Math.PI / 2) * radius;

             // Determina cuál imagen está activa
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
                  opacity,
                  zIndex
                }}
              >

                <div className="w-32 sm:w-40 md:w-48 lg:w-72 xl:w-80 bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-300 text-center">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-20 sm:h-24 md:h-28 lg:h-36 xl:h-44 object-cover"
                    draggable={false}
                  />
                  <div className="py-2 text-black font-semibold text-sm lg:text-base xl:text-lg">
                    {image.title}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
      <div className=' -mt-[200px]  sm:-mt-[250px]  md:-mt-[350px] lg:-mt-[400px] xl:-mt-[450px] relative z-40'>
        <GaleriaAventuras />
      </div>
    </>
  );
};

export default CircularImageGallery;
