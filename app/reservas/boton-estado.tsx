"use client";
import { actualizarEstadoReserva } from "@/app/actions/reservas";


export function BotonEstado({ id, nuevoEstado, etiqueta, clase }: { 
  id: number, nuevoEstado: string, etiqueta: string, clase: string 
}) {
  return (
    <button 
      onClick={async () => {
        if (confirm(`¿Estás seguro de marcar esta reserva como ${nuevoEstado}?`)) {
          await actualizarEstadoReserva(id, nuevoEstado);
        }
      }}
      className={`${clase} text-xs font-semibold hover:underline bg-white px-2 py-1 rounded border shadow-sm transition-all`}
    >
      {etiqueta}
    </button>
  );
}
