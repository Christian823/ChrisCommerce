"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "../../types/product";

type ProductFormProps = {
  product?: Product | null;
  onFinishEdit?: () => void;
};

export default function ProductForm({
  product,
  onFinishEdit
}: ProductFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    Nombre_producto: "",
    Descripcion: "",
    Precio_de_venta: ""
  });

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (product) {
      setForm({
        Nombre_producto: product.Nombre_producto,
        Descripcion: product.Descripcion,
        Precio_de_venta: product.Precio_de_venta
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMensaje("");

    const isEditing = !!product;

    const url = isEditing
      ? `/api/admin/products/${product.id_producto}`
      : "/api/admin/products";

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        setMensaje(data.message || "Ocurrió un error");
        return;
      }

      setMensaje(
        isEditing
          ? "Producto actualizado correctamente"
          : "Producto creado correctamente"
      );

      setTimeout(() => {
        setMensaje("");
      }, 3000);

      setForm({
        Nombre_producto: "",
        Descripcion: "",
        Precio_de_venta: ""
      });

      if (isEditing && onFinishEdit) {
        onFinishEdit();
      }

      router.refresh();

    } catch (error) {
      console.error(error);
      setMensaje("No se pudo completar la operación");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 p-6 rounded-lg mb-8"
    >
      <h2 className="text-2xl font-bold mb-4">
        {product ? "Editar producto" : "Crear producto"}
      </h2>

      <input
        type="text"
        placeholder="Nombre"
        value={form.Nombre_producto}
        onChange={(e) =>
          setForm({
            ...form,
            Nombre_producto: e.target.value
          })
        }
        className="w-full p-2 mb-3 bg-white text-black rounded"
      />

      <input
        type="text"
        placeholder="Descripción"
        value={form.Descripcion}
        onChange={(e) =>
          setForm({
            ...form,
            Descripcion: e.target.value
          })
        }
        className="w-full p-2 mb-3 bg-white text-black rounded"
      />

      <input
        type="number"
        step="0.01"
        placeholder="Precio"
        value={form.Precio_de_venta}
        onChange={(e) =>
          setForm({
            ...form,
            Precio_de_venta: e.target.value
          })
        }
        className="w-full p-2 mb-3 bg-white text-black rounded"
      />

      <button
        type="submit"
        className="bg-green-600 px-4 py-2 rounded"
      >
        {product ? "Guardar cambios" : "Agregar producto"}
      </button>

      {product && (
        <button
          type="button"
          onClick={onFinishEdit}
          className="bg-slate-600 px-4 py-2 rounded ml-3"
        >
          Cancelar
        </button>
      )}

      {mensaje && (
        <p className="mt-4">
          {mensaje}
        </p>
      )}
    </form>
  );
}