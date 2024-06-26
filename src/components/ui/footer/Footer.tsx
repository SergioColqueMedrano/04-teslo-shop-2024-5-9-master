import { titleFont } from "@/config/fonts"
import Link from "next/link"



export const Footer = () => {
  return (
    <div className='flex w-full justify-center text-xs mb-10'>
        <Link href='/gender/men'>
            <span className={`${ titleFont.className } antialiased font-bold`}>Juego</span>
            <span>| RTS</span>
            <span>©  { new Date().getFullYear() }</span>
        </Link>

        <Link
        href='/gender/men'
        className="mx-3"
        >
            Privacidad & Legal
        </Link>

        <Link
        href='/gender/men'
        className="mx-3"
        >
            Ubicaciones
        </Link>

    </div>
  )
}
