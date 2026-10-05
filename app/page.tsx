import Navbar from "./components/navbar";
import Carrusel from "./components/Carrusel";

export default function Home() {
  return (
    <main className="w-full min-h-svh bg-slate-950 text-white">
      <Navbar />

      <Carrusel />

      <section className="text-center mt-10">
        <h1 className="text-4xl font-bold">
          Bienvenido a ChristianCommerce
        </h1>

        <p className="mt-4 text-slate-300">
          Encuentra productos de diferentes categorías
        </p>
      </section>
    </main>
  );
}
