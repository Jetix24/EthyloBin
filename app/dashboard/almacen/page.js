"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [etileno, setEtileno] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.251.199:5000/gassensor');
        setEtileno(response.data.gas);
      } catch (error) {
        console.error("Error fetching gas", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pl-5">
      <div className="p-5 h-full">
        <h1 className="text-5xl font-bold mb-20 text-center lg:text-left">Almacen</h1>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-col mb-10 items-center text-center">
            <h2 className="text-3xl font-semibold mb-5">Etileno</h2>
            <Image src="/img/etileno.png" width={256} height={256} />
          </div>
          <div className="radial-progress mb-10" style={{ "--value": etileno || 0, "--size": "20rem", "--thickness": "2rem", "fontSize": "3rem" }} role="progressbar">
            {etileno !== null ? `${etileno} mg/m3` : '-'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;