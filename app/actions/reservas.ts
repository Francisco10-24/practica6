"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/app/lib/prisma";

const EsquemaReserva = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio."),
  correo: z.string().email("El correo no es válido."),
  fecha: z.string().min(1, "La fecha es obligatoria."),
  servicioId: z.coerce.number({ message: "Debe seleccionar un servicio." }),
});

export async function crearReserva(_estadoPrevio: any, formData: FormData) {
  const campos = EsquemaReserva.safeParse({
    nombre: formData.get("nombre"),
    correo: formData.get("correo"),
    fecha: formData.get("fecha"),
    servicioId: formData.get("servicioId"),
  });

  if (!campos.success) {
    return { errores: campos.error.flatten().fieldErrors, mensaje: "Error de validación." };
  }

 
  // Validación de disponibilidad 
  // No dejamos que se agenden dos citas que choquen en tiempo.
 
  const nuevoInicio = new Date(campos.data.fecha);
  const servicio = await prisma.servicio.findUnique({ where: { id: campos.data.servicioId } });
  
  if (!servicio) return { mensaje: "Servicio no encontrado." };

  // Calculamos a qué hora terminará esta nueva reserva (sumando los minutos)
  const nuevoFin = new Date(nuevoInicio.getTime() + servicio.duracion * 60000);

  
  const choque = await prisma.reserva.findFirst({
    where: {
      servicioId: campos.data.servicioId,
      estado: { not: "cancelada" }, 
      fecha: {
        lt: nuevoFin, // Que empiece antes de que la nuestra termine
        gt: new Date(nuevoInicio.getTime() - servicio.duracion * 60000) // Que no haya empezado hace tan poco que siga activa
      }
    }
  });

  if (choque) {
    return { mensaje: "Este horario ya está ocupado para este servicio." };
  }

  // Si pasa la validación, la guardamos
  await prisma.reserva.create({
    data: {
      nombre: campos.data.nombre,
      correo: campos.data.correo,
      fecha: nuevoInicio,
      servicioId: campos.data.servicioId,
      estado: "pendiente", 
    },
  });

  revalidatePath("/reservas");
  redirect("/reservas");
}



// Ejercicio 2 y 4:  En lugar de hacer un delete, hacemos un update del campo "estado".

export async function actualizarEstadoReserva(id: number, nuevoEstado: string) {
  try {
    await prisma.reserva.update({
      where: { id },
      data: { estado: nuevoEstado },
    });
    revalidatePath("/reservas");
    return { exito: true };
  } catch {
    return { exito: false, mensaje: "Error al actualizar estado." };
  }
}