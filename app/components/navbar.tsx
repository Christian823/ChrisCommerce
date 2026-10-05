import Link from "next/link";

function Navbar(){

const Inicio:string = "ChristianCommerce";
const Productos:string = "Productos Disponibles";
const IniciarSession:string = "Iniciar Session";
const Imagetitulo:string = "/neeeee.png";

return (
    <section className="w-full h-[10vh] bg-slate-900 flex mb-[20px]">
      <Link href="/">
        <div className="w-[200px] h-full ml-[30px] flex items-center justify-center">
          <img
            src={Imagetitulo}
            alt="Ecommerce"
            className="w-full h-[7vh] object-contain rounded-2xl"/>
          <div className="flex w-full h-full items-center">{Inicio}</div></div>
      </Link>
      <Link
        href="/productos"
        className="w-[200px] h-full ml-[200px] flex items-center justify-center"
      >
      {Productos}
      </Link>
      <Link
        href="/login"
        className="w-[200px] h-full ml-[200px] flex items-center justify-center"
      >
      {IniciarSession}
      </Link>
    </section>
  );

}

export default Navbar;