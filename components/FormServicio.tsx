"use client";
import { useActionState } from "react";
import { crearServicio } from "@/app/actions/servicios";
import { BotonEnviar } from "./BotonEnviar";

export default function FormServicio() {
  const [estado, accion] = useActionState(crearServicio, { errores: {}, mensaje: "" });

  return (
    <form action={accion} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Nuevo Servicio</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Nombre del Servicio</label>
        <input name="nombre" type="text" className="w-full p-2 border rounded-md" />
        {estado.errores?.nombre && <p className="text-red-500 text-xs mt-1">{estado.errores.nombre}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <textarea name="descripcion" className="w-full p-2 border rounded-md" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Duración (minutos)</label>
        <input name="duracion" type="number" className="w-full p-2 border rounded-md" />
        {estado.errores?.duracion && <p className="text-red-500 text-xs mt-1">{estado.errores.duracion}</p>}
      </div>

      <BotonEnviar />
    </form>
  );
}