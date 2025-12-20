import { supabase } from "@/lib/supabase-client";
import { useState, useEffect } from "react";

interface Products {
    id: string;
    name: string;
    photos: string[];
    category_id: string;
    brief_description: string;
    detailed_description: string;
    price: number;
}

export default function DeleteProdutoModal({ setShowDeleteProdutoModal, product }: { setShowDeleteProdutoModal: (value: boolean) => void, product: Products }) {
    const [loading, setLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Check authentication status
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setIsAuthenticated(!!session)
        }
        checkAuth()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleDelete = async () => {
        setLoading(true)
        setError(null)

        // Security: Verify authentication before proceeding
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            setError('Sessão expirada. Faça login novamente.')
            setLoading(false)
            return
        }

        // Delete images from Cloudinary
        if (product.photos && product.photos.length > 0) {
            try {
                await fetch('/api/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageUrls: product.photos })
                })
            } catch (error) {
                console.error('Erro ao deletar imagens do Cloudinary:', error)
            }
        }

        // Delete product from Supabase
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', product.id)

        if (error) {
            console.error('Erro ao deletar produto:', error.message)
            return
        }

        setShowDeleteProdutoModal(false)
        setLoading(false)
    }

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-lg shadow-xl max-h-[90vh] flex flex-col">
                <div className="p-6 flex-grow overflow-y-auto">
                    <h2 className="text-2xl font-semibold mb-4">Excluir Produto</h2>
                    <p>Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.</p>
                    {error && <p className="text-red-500 mt-4 p-3 bg-red-50 rounded-md">{error}</p>}
                </div>
                <div className="flex justify-end gap-4 p-4 border-t border-gray-200">
                    <button onClick={() => setShowDeleteProdutoModal(false)} className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer">Cancelar</button>
                    <button 
                        onClick={() => handleDelete()} 
                        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
                        disabled={loading || !isAuthenticated}
                        title={!isAuthenticated ? 'Você precisa estar logado para deletar' : undefined}
                    >
                        {loading ? 'Deletando...' : 'Deletar Produto'}
                    </button>
                </div>
            </div>

        </div>

    )
}