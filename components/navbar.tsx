"use client"; 
 
import Link from "next/link"; 
import { usePathname } from "next/navigation"; 
 
const enlaces = [ 
  { href: "/", etiqueta: "Inicio" }, 
  { href: "/servicios", etiqueta: "Servicios" }, 
  { href: "/reservas", etiqueta: "Reservas" }, 
]; 
 
export function Nav() { 
  const pathname = usePathname(); 
 
  return ( 
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <span className="font-bold text-xl">Panel de reservas</span> 
        <div className="flex gap-4"> 
          {enlaces.map(({ href, etiqueta }) => ( 
            <Link 
              key={href}
              href={href} 
              className={`hover:text-blue-600 ${pathname === href ? "font-bold text-blue-600" : "text-gray-600"}`}
            >
              {etiqueta} 
            </Link> 
          ))} 
        </div> 
      </div>
    </nav> 
  ); 
}