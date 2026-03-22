"use client";
import { eliminarServicio } from "@/app/actions/servicios";

export default function BotonEliminar({ id }: { id: number }) {
  return (
    <button
      onClick={async () => {
        if (confirm("¿Estás seguro de eliminar este servicio?")) {
          await eliminarServicio(id);
        }
      }}
      className="text-red-600 hover:text-red-800 font-medium"
    >
      Eliminar
    </button>
  );
}