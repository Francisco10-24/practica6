import { prisma } from "@/app/lib/prisma"; 
import Link from "next/link"; 
import { BotonEstado } from "./boton-estado"; 
import { tarjeta } from "@/app/lib/estilos"; 
import FormReserva from "@/components/FormReserva"; 
 
const etiquetaEstado: Record<string, string> = { 
  pendiente: "bg-yellow-50 text-yellow-700 border-yellow-200", 
  confirmada: "bg-green-50 text-green-700 border-green-200", 
  cancelada: "bg-red-50 text-red-700 border-red-200", 
}; 
 
export default async function PaginaReservas({ 
  searchParams 
}: { 
  searchParams: Promise<{ estado?: string }> 
}) { 
  const { estado } = await searchParams;

  const servicios = await prisma.servicio.findMany();

  const reservas = await prisma.reserva.findMany({ 
    where: estado ? { estado: estado } : {}, 
    orderBy: { fecha: "asc" }, 
    include: { servicio: true }, 
  }); 
 
  return ( 
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> 
      
      {/* Lado izquierdo del form */}
      <div className="md:col-span-1">
        <FormReserva servicios={servicios} />
      </div>

      {/*lado derecho de la opciones de reservas  */}
      <div className="md:col-span-2">
        <div className="flex items-center justify-between mb-4"> 
          <div>
            <h1 className="text-xl font-semibold">Reservas Registradas</h1>
            <div className="flex gap-2 mt-2">
              <Link href="/reservas" className="text-xs text-blue-600 hover:underline border px-2 py-1 rounded bg-white shadow-sm">Todas</Link>
              <Link href="/reservas?estado=pendiente" className="text-xs text-yellow-600 hover:underline border px-2 py-1 rounded bg-yellow-50 shadow-sm">Pendientes</Link>
              <Link href="/reservas?estado=confirmada" className="text-xs text-green-600 hover:underline border px-2 py-1 rounded bg-green-50 shadow-sm">Confirmadas</Link>
            </div>
          </div>
        </div> 
 
        {reservas.length === 0 ? ( 
          <p className="text-sm text-gray-500 mt-6 bg-gray-50 p-4 rounded border border-dashed">
            No hay reservas {estado ? `con estado ${estado}` : "registradas"}. Usa el formulario de la izquierda para crear una.
          </p> 
        ) : ( 
          <ul className="space-y-3 mt-4"> 
            {reservas.map((reserva) => ( 
              <li key={reserva.id} className={`${tarjeta} flex items-start justify-between`}> 
                <div> 
                  <p className="font-medium text-sm">{reserva.nombre}</p> 
                  <p className="text-xs text-gray-400 mt-0.5">{reserva.correo}</p> 
                  <p className="text-xs text-gray-500 mt-1"> 
                    {reserva.servicio.nombre} — {new Date(reserva.fecha).toLocaleString("es-SV")} 
                  </p> 
                  <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded border ${etiquetaEstado[reserva.estado] ?? etiquetaEstado.pendiente}`}> 
                    {reserva.estado} 
                  </span> 
                </div> 
                
                <div className="flex flex-col gap-2 ml-4 items-end">
                  {reserva.estado === "pendiente" && (
                    <>
                      <BotonEstado id={reserva.id} nuevoEstado="confirmada" etiqueta="Confirmar ✔" clase="text-green-600" />
                      <BotonEstado id={reserva.id} nuevoEstado="cancelada" etiqueta="Cancelar ✖" clase="text-red-600" />
                    </>
                  )}
                </div>
              </li> 
            ))} 
          </ul> 
        )} 
      </div>
    </div> 
  ); 
}