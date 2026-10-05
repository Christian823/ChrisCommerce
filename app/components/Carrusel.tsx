"use client";

import { useState } from "react";

const imagenes = [
  "/frutas.jpg",
  "/instrumentos.jpg",
  "/piezaspc.jpeg",
];

export default function Carrusel() {
  const [indice, setIndice] = useState(0);

  const siguiente = () => {
    setIndice((prev) => (prev + 1) % imagenes.length);
  };

  const anterior = () => {
    setIndice((prev) =>
      prev === 0 ? imagenes.length - 1 : prev - 1
    );
  };

  return (
    <section className="w-full flex justify-center mt-8">
      <div className="relative w-[70%] h-[400px] bg-slate-900 rounded-xl overflow-hidden">

        <img
          src={imagenes[indice]}
          alt="Imagen del carrusel"
          className="w-full h-full object-cover"
        />

        <button
          onClick={anterior}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white px-4 py-3 rounded-full"
        >
          ←
        </button>

        <button
          onClick={siguiente}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white px-4 py-3 rounded-full"
        >
          →
        </button>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {imagenes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndice(i)}
              className={`w-3 h-3 rounded-full ${
                i === indice ? "bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}