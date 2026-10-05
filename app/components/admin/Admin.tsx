"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "../../types/product";
import ProductForm from "./ProductForm";

type AdminProps = {
  products: Product[];
};

export default function Admin({ products }: AdminProps) {
  const router = useRouter();

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);
  const eliminarProducto = async (id: number) => {
    const response = await fetch(
      `/api/admin/products/${id}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      console.log("Error al eliminar");
      return;
    }

    router.refresh();
  };


  const logout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST"
    });

    if (!response.ok) {
      console.log("Error al cerrar sesión");
      return;
    }

    router.push("/login");
    router.refresh();
  };

  return (
    <main className="min-h-svh bg-slate-950 text-white p-8">

      <h1 className="text-3xl font-bold mb-8 flex items-center justify-center">
        Panel de Administración
      </h1>

      <ProductForm
        product={editingProduct}
        onFinishEdit={() => setEditingProduct(null)}
      />

      {products.length === 0 ? (
        <p>No hay productos registrados</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id_producto}
            className="bg-slate-900 p-5 mb-4 rounded-lg"
          >
            <h2 className="text-xl font-bold">
              {product.Nombre_producto}
            </h2>

            <p>{product.Descripcion}</p>

            <p>${product.Precio_de_venta}</p>

            <div className="flex gap-3 mt-4">

              <button
                onClick={() =>
                  setEditingProduct(product)
                }
                className="bg-yellow-600 px-4 py-2 rounded"
              >
                Editar
              </button>

              <button
                onClick={() =>
                  eliminarProducto(product.id_producto)
                }
                className="bg-red-600 px-4 py-2 rounded"
              >
                Eliminar
              </button>

            </div>
          </div>
        ))
      )}
      <div className="flex items-center justify-center">
      <button
        onClick={logout}
        className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded mt-8"
      >
        Cerrar sesión
      </button>
      </div>
    </main>
  );
}