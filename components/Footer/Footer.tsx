'use client'

import { FaInstagram, FaWhatsapp, FaHome } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from 'next/link';
import { supabase } from "@/lib/supabase-client";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

export default function Footer() {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setSession(session)
        }

        checkAuth()

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <footer className="">
            <div className="pt-6 flex flex-wrap lg:grid grid-flow-col grid-cols-5 gap-6">
                <div className="col-span-3">
                    <h1 className="text-xl md:text-2xl">Alternativa <span className="gold-gradient-text">Móveis</span></h1>
                    <p>Sua parceria ideal para criar, manter e renovar espaços escolares empresas e instituições.</p>
                </div>
                <div className="space-y-1">
                    <h3>Link Rápidos</h3>
                    <p><Link href="/">Início</Link></p>
                    <p><Link href="/catalogo">Catálogo</Link></p>
                    <p><Link href="#servicos">Serviços</Link></p>
                    <p><Link href="/sobre-nos">Sobre Nós</Link></p>
                </div>
                <div className="space-y-1 overflow-hidden">
                    <h3>Contato</h3>
                    <p className="flex items-center gap-2"><FaHome className="lg:hidden" /> Av Alberto Miguel,859 St Campinas, Goiania - GO</p>
                    <p className="flex items-center gap-2"><FaPhoneAlt className="lg:hidden" /> (62) 3215-0996</p>
                    <p className="flex items-center text-sm sm:text-base gap-2 wrap-anywhere"> <MdEmail className="lg:hidden" /> leonardo.alternativamoveis@gmail.com</p>
                </div>
                <div className="space-y-1">
                    <h3>Siga-nos</h3>
                    <p><Link href="https://api.whatsapp.com/send?phone=556232150996&text=Ol%C3%A1%2C%20Estava%20olhando%20seu%20cat%C3%A1logo%20e%20me%20interessei%20por%20um%20produto%20.%20" target="_blank" className="flex items-center gap-2"><FaWhatsapp /> Whatsapp</Link></p>
                    <p><Link href="https://www.instagram.com/alternativamoveisgyn?igsh=MXB2OGd0NGd3djB3YQ==" target="_blank" className="flex items-center gap-2"> <FaInstagram /> Instagram</Link></p>
                    {!session && <p><Link href="/login">Login</Link></p>}
                </div>
            </div>

            <div className="mt-3 py-3 border-t border-[var(--paragraph)]">
                <p>© 2026 Alternativa Móveis. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}