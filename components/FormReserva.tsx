"use client";
import { useActionState } from "react";
import { crearReserva } from "@/app/actions/reservas";
// Asegúrate de que este import coincida con el nombre de tu archivo del botón
import { BotonEnviar } from "./BotonEnviar"; 

export default function FormReserva({ servicios }: { servicios: any[] }) {
  const [estado, accion] = useActionState(crearReserva, { errores: {}, mensaje: "" });

  return (
    <form action={accion} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-slate-800">Agendar Cita</h2>
        <p className="text-sm text-gray-500 mt-1">Completa los datos para crear una nueva reserva.</p>
      </div>

      {/* Aquí se mostrará el error si la fecha choca con otra cita (Ejercicio 1) */}
      {estado.mensaje && (
        <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded text-sm font-medium">
          {estado.mensaje}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nombre del Cliente</label>
          <input 
            name="nombre" 
            type="text" 
            placeholder="Ej. Juan Pérez"
            className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-gray-50 focus:bg-white" 
          />
          {estado.errores?.nombre && <p className="text-xs text-red-500 mt-1.5 font-medium">{estado.errores.nombre}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Correo Electrónico</label>
          <input 
            name="correo" 
            type="email" 
            placeholder="ejemplo@correo.com"
            className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-gray-50 focus:bg-white" 
          />
          {estado.errores?.correo && <p className="text-xs text-red-500 mt-1.5 font-medium">{estado.errores.correo}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Fecha y Hora</label>
          <input 
            name="fecha" 
            type="datetime-local" 
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-gray-700 bg-gray-50 focus:bg-white" 
          />
          {estado.errores?.fecha && <p className="text-xs text-red-500 mt-1.5 font-medium">{estado.errores.fecha}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Servicio a Reservar</label>
          <select 
            name="servicioId" 
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-gray-50 focus:bg-white text-gray-700 cursor-pointer"
          >
            <option value="">-- Selecciona un servicio --</option>
            {servicios.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre} ({s.duracion} min)
              </option>
            ))}
          </select>
          {estado.errores?.servicioId && <p className="text-xs text-red-500 mt-1.5 font-medium">{estado.errores.servicioId}</p>}
        </div>

        <div className="pt-2">
          <BotonEnviar />
        </div>
      </div>
    </form>
  );
}