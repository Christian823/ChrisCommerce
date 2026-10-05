import Link from "next/link";

type ProductCardProps = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
};

export default function ProductCard({
  nombre,
  descripcion,
  precio,
  id
}: ProductCardProps) {

  return (
    <article
      className="
        bg-slate-900
        border border-slate-800
        rounded-xl
        p-6
        shadow-lg
        hover:shadow-2xl
        hover:-translate-y-1
        transition-all
        duration-300
        flex
        flex-col
        justify-between
        min-h-[260px]
      "
    >

      <div>
        <h2 className="text-2xl font-bold text-white mb-3">
          {nombre}
        </h2>

        <p className="text-slate-400 mb-5">
          {descripcion}
        </p>

        <p className="text-3xl font-bold text-green-400">
          ${precio}
        </p>
      </div>

      <Link
        href={`/productos/${id}`}
        className="
          mt-6
          bg-blue-600
          hover:bg-blue-700
          text-white
          text-center
          py-3
          rounded-lg
          font-semibold
          transition
        "
      >
        Ver detalle
      </Link>

    </article>
  );
}