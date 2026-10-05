'use client';

import { useState } from 'react';
import Navbar from "../components/navbar";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMensaje('');

    const url = isRegistering
      ? '/api/auth/register'
      : '/api/auth/login';

    const body = isRegistering
      ? form
      : {
          email: form.email,
          password: form.password
        };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        setMensaje(data.message || 'Ocurrió un error');
        return;
      }

      if (isRegistering) {
        setMensaje('Registro exitoso. Ahora inicia sesión.');
        setIsRegistering(false);

        setForm({
          name: '',
          email: '',
          password: ''
        });

        return;
      }
      router.push("/admin");

      setMensaje('Login exitoso');

      console.log(data);

    } catch (error) {
  console.error("ERROR LOGIN:", error);
  setMensaje("No se pudo conectar con el servidor");
}
  };

  return (
    <>
    <div className='bg-slate-950'><Navbar /></div>
    <section className="min-h-svh bg-slate-950 text-white flex items-center justify-center"> 
      <form
        onSubmit={handleSubmit}
        className="w-[380px] bg-slate-900 p-8 rounded-xl"
      >
        <h1 className="text-2xl font-bold mb-6">
          {isRegistering
            ? 'Crear cuenta'
            : 'Iniciar sesión'}
        </h1>

        {isRegistering && (
          <input
            type="text"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
            className="w-full p-2 mb-4 bg-white text-black rounded"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
          className="w-full p-2 mb-4 bg-white text-black rounded"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
          className="w-full p-2 mb-4 bg-white text-black rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          {isRegistering
            ? 'Registrarse'
            : 'Entrar'}
        </button>

        <button
          type="button"
          onClick={() =>
            setIsRegistering(!isRegistering)
          }
          className="w-full mt-4 text-sm text-blue-400 hover:underline"
        >
          {isRegistering
            ? '¿Ya tienes cuenta? Inicia sesión'
            : '¿No tienes cuenta? Regístrate'}
        </button>

        {mensaje && (
          <p className="mt-4 text-center">
            {mensaje}
          </p>
        )}

      </form>

    </section>
    </>
  );
}