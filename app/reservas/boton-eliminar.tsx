"use client"; 
 
import { actualizarEstadoReserva } from "@/app/actions/reservas"; 
import { useState } from "react"; 
import { botonPeligro } from "@/app/lib/estilos";

export function BotonEliminarReserva({ id }: { id: number }) { 
  const [error, setError] = useState<string | null>(null); 
 
  async function manejarClick() { 
    //Aca se da un update a cancelada
    const resultado = await actualizarEstadoReserva(id, "cancelada"); 
    
    if (!resultado?.exito) { 
      setError(resultado?.mensaje ?? "Error al cancelar la reserva."); 
    } 
  } 
 
  return ( 
    <div className="text-right shrink-0 ml-4"> 
      <button 
        onClick={() => {
          if (confirm("¿Estás seguro de cancelar esta reserva?")) {
            manejarClick();
          }
        }} 
        className={botonPeligro}
      > 
        Cancelar 
      </button> 
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>} 
    </div> 
  ); 
}