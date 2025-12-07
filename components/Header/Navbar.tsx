'use client'

import { IoLogoWhatsapp } from "react-icons/io";
import { MdMenu,MdOutlineClose } from "react-icons/md";
import Link from "next/link"
import { useState } from "react"

const Links = () => {
    return (
        <>
            <Link className="font-medium" href="/">Início</Link>
            <Link className="font-medium" href="/catalogo">Catálogo</Link>
            <Link className="font-medium" href="/sobre-nos">Sobre Nós</Link>
        </>
    )
}

const OrcamentoBtn = () => {
    return (
        <a className="flex items-center gap-2 text-sm orcamento-btn"><IoLogoWhatsapp className="text-lg text-green-500" />Solicitar Orçamento</a>
    )
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <nav className="w-1/2">
                <div className="hidden md:flex justify-end text-lg items-center gap-8">
                    <Links />
                    {/* Btn de contato */}
                    <OrcamentoBtn />
                </div>
                <div className="md:hidden flex justify-end">
                    <button
                        onClick={toggleMenu}
                        className="p-2 rounded-md hover:bg-[var(--secondary)] transition-colors duration-200"
                    >
                        {isOpen ? <MdOutlineClose className="main-color" /> : <MdMenu className="main-color" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`
                md:hidden overflow-hidden transition-all duration-300 ease-in-out basis-full
                ${isOpen
                    ? 'max-h-96 opacity-100 transform translate-y-0' 
                    : 'max-h-0 opacity-0 transform -translate-y-4'
                }
            `}>
                <div className="w-full bg-background-color-light flex flex-col items-center space-y-4 py-4 font-medium text-lg border-t border-gray-600">
                    <Links />
                    {/* Btn de contato */}
                    <OrcamentoBtn />
                </div>
            </div>
        </>
    )
}