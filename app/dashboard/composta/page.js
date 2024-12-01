"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [temperatura, setTemperatura] = useState(null);
  const [humedad, setHumedad] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/compostaje');
        console.log('Datos obtenidos:', response.data); // Imprime los datos en consola
        setTemperatura(response.data.temperatura);
        setHumedad(response.data.humedad);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pl-5">
      <div className="p-5 h-full">
        <h1 className="text-5xl font-bold mb-20 text-center lg:text-left">Composta</h1>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-col mb-10 items-center text-center">
            <h2 className="text-3xl font-semibold mb-5">Temperatura</h2>
            <Image src="/img/temperatura.png" width={256} height={256} />
          </div>
          <div className="radial-progress" style={{ "--value": temperatura || 0, "--size": "20rem", "--thickness": "2rem", "fontSize": "3rem" }} role="progressbar">
            {temperatura !== null ? `${temperatura}°C` : '-'}
          </div>
          <div className="flex flex-col mb-10 ml-10 lg:ml-0 items-center text-center">
            <h2 className="text-3xl font-semibold mb-5">Humedad</h2>
            <Image src="/img/humedad.png" width={256} height={256} />
          </div>
          <div className="radial-progress" style={{ "--value": humedad || 0, "--size": "20rem", "--thickness": "2rem", "fontSize": "3rem" }} role="progressbar">
            {humedad !== null ? `${humedad}%` : '-'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;