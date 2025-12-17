'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdAdd } from "react-icons/io";
import AdminDestaque from "@/components/AdminDestaque/AdminDestaque";
import AdminProdutos from "@/components/AdminProdutos/AdminProdutos";
import { supabase } from "@/lib/supabase-client";

export default function Dashboard() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            
            if (!session) {
                router.push('/auth/login')
                return
            }
            
            setIsAuthenticated(true)
            setLoading(false)
        }

        checkAuth()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (!session) {
                router.push('/auth/login')
            }
        })

        return () => subscription.unsubscribe()
    }, [router])

    const logout = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto"></div>
                    <p className="mt-4 text-[var(--paragraph)]">Verificando autenticação...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="container mx-auto px-3 md:px-0 flex-grow">
                <div className="mt-12 md:flex justify-between items-center">
                    <div>
                        <h1 className="secondary-title">Gerenciamento de Produtos</h1>
                        <p className="mt-2 md:mt-0">Adicione, edite e remova produtos do seu catálogo.</p>
                    </div>
                    <div className="mt-3 md:mt-0">
                        <button className="botoes text-md sm:text-xl flex items-center gap-2 rounded-md"><IoMdAdd /> Novo Produto</button>
                    </div>
                </div>
                <AdminDestaque />
                <AdminProdutos />
                <div className="flex justify-end mb-6">
                    <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-200" onClick={logout}>Sair</button>
                </div>
            </div>

        </div>
    )
}