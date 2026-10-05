import ProductCard from "../components/ProductCard";
import Navbar from "../components/navbar";
import { getProducts } from "../lib/api";

export default async function ProductosPage() {
  const products = await getProducts();

  return (
    <main className="w-full min-h-svh bg-slate-950 text-white">
      <Navbar />

      <section className="max-w-7xl mx-auto px-8 py-10">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Productos Disponibles
          </h1>

          <p className="text-slate-400 mt-2">
            Explora nuestro catálogo de productos
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-slate-400 py-20">
            No hay productos disponibles
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id_producto}
                id={product.id_producto}
                nombre={product.Nombre_producto}
                descripcion={product.Descripcion}
                precio={product.Precio_de_venta}
              />
            ))}
          </div>
        )}

      </section>
    </main>
  );
}