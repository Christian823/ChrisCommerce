type PropsDeLosproductosEspecificos = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetail({ params }: PropsDeLosproductosEspecificos) {
  const { id } = await params;

  return (
    <main>
      <h1>Producto ID: {id}</h1>
    </main>
  );
}