import Image from "next/image";

const CarouselText = () => {

  return (
    <section className="max-w-5xl  max-h-5xl mx-auto flex flex-col items-center justify-center gap-16 lg:gap-20 px-8 py-2 lg:py-5">
      <div className="carousel max-w-6xl rounded-md">
        <div id="slide1" className="carousel-item relative w-full h-full">
          <Image src="/img/composta_carrusel.webp" className="w-full" width={1200} height={1080} alt="Facil" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">❮</a> 
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 md:h-1/4 flex items-center justify-center  flex-col " style={{backgroundColor: 'rgba(15, 29, 4, 0.7)'}}>
            <h1 className="text-sm md:text-4xl font-bold text-white">Monitoreo en Tiempo Real</h1>
            <p className="mt-2 text-[2.5vw] md:mt-4 md:text-xl font-medium text-gray_200/90">
              Visualiza parámetros clave como temperatura, humedad y emisión de gases desde cualquier lugar.
            </p>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <Image src="/img/alertas_carrusel (1).webp" className="w-full" width={1200} height={1080} alt="Inventario" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">❮</a> 
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 md:h-1/4 flex items-center justify-center flex-col" style={{backgroundColor: 'rgba(15, 29, 4, 0.7)'}}>
            <h1 className="text-sm md:text-4xl font-bold text-white">Alertas Automáticas</h1>
            <p className="mt-2 text-[2.5vw] md:mt-4 md:text-xl font-medium text-gray_200/90">
              Recibe notificaciones cuando el proceso de compostaje necesite atención o ajustes.
            </p>
          </div>
        </div> 
        <div id="slide3" className="carousel-item relative w-full">
          <Image src="/img/clasifica_carrusel.webp" className="w-full" width={1200} height={1080} alt="Organiza" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">❮</a> 
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 md:h-1/4 flex items-center justify-center  flex-col " style={{backgroundColor: 'rgba(15, 29, 4, 0.7)'}}>
            <h1 className="text-sm md:text-4xl font-bold text-white">Gestión de Residuos</h1>
            <p className="mt-2 text-[2.5vw] md:mt-4 md:text-xl font-medium text-gray_200/90">
              Clasifica y organiza tus residuos en lotes para un compostaje más eficiente.
            </p>
          </div>
        </div> 
        <div id="slide4" className="carousel-item relative w-full">
          <Image src="/img/analisis_carrusel (1).webp" className="w-full" width={1200} height={1080} alt="Proveedores" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">❮</a> 
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 md:h-1/4 flex items-center justify-center  flex-col " style={{backgroundColor: 'rgba(15, 29, 4, 0.7)'}}>
            <h1 className="text-sm md:text-4xl font-bold text-white">Reportes Detallados</h1>
            <p className="mt-2 text-[2.5vw] md:mt-4 md:text-xl font-medium text-gray_200/90">
              Obtén análisis completos sobre el progreso del compostaje y optimiza tus resultados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselText;