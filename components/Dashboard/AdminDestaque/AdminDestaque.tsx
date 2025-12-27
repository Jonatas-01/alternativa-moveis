import { IoMdStar, IoIosAddCircle, IoIosSave } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

interface Category {
    id: string;
    name: string;
    color: string;
}

interface Product {
    id: string;
    name: string;
    photos: string[];
    category_id: string;
    categories: Category;
    brief_description: string;
    detailed_description: string;
    price: number;
    is_featured: boolean;
}

export default function AdminDestaque() {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [showSelectModal, setShowSelectModal] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const MAX_FEATURED = 5

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*, categories(id, name, color)')

        if (error) {
            console.error('Erro ao buscar produtos:', error.message)
            return []
        }

        return data || []
    }

    useEffect(() => {
        const loadProducts = async () => {
            const products = await fetchProducts()
            setAllProducts(products)
            setFeaturedProducts(products.filter((p: Product) => p.is_featured))
        }

        loadProducts()

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

        // Real-time subscription for products
        const channel = supabase
            .channel('featured-products')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
                loadProducts()
            })
            .subscribe()

        return () => {
            subscription.unsubscribe()
            supabase.removeChannel(channel)
        }
    }, [])

    const handleRemoveFeatured = (productId: string) => {
        setFeaturedProducts(featuredProducts.filter(p => p.id !== productId))
    }

    const handleAddFeatured = (product: Product) => {
        if (featuredProducts.length >= MAX_FEATURED) {
            setError(`Você pode ter no máximo ${MAX_FEATURED} produtos em destaque.`)
            return
        }

        if (featuredProducts.some(p => p.id === product.id)) {
            setError('Este produto já está em destaque.')
            return
        }

        setFeaturedProducts([...featuredProducts, product])
        setShowSelectModal(false)
        setError(null)
    }

    const handleSave = async () => {
        // Validate exactly 5 products
        if (featuredProducts.length !== MAX_FEATURED) {
            setError(`Você deve selecionar exatamente ${MAX_FEATURED} produtos em destaque.`)
            return
        }

        setSaving(true)
        setError(null)
        setSuccess(null)

        // Security: Verify authentication before proceeding
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            setError('Sessão expirada. Faça login novamente.')
            setSaving(false)
            return
        }

        try {
            const newFeaturedIds = featuredProducts.map(p => p.id)

            const { error: resetError } = await supabase
                .from('products')
                .update({ is_featured: false })
                .eq('is_featured', true)

            if (resetError) {
                throw new Error(resetError.message)
            }

            if (newFeaturedIds.length > 0) {
                const { error: updateError } = await supabase
                    .from('products')
                    .update({ is_featured: true })
                    .in('id', newFeaturedIds)

                if (updateError) {
                    throw new Error(updateError.message)
                }
            }

            setSuccess('Produtos em destaque atualizados com sucesso!')
            setTimeout(() => setSuccess(null), 3000)
        } catch (err) {
            console.error('Erro ao salvar:', err)
            setError(err instanceof Error ? err.message : 'Erro ao salvar alterações')
        } finally {
            setSaving(false)
        }
    }

    // Filter available products (not already featured)
    const availableProducts = allProducts.filter(
        p => !featuredProducts.some(fp => fp.id === p.id)
    )

    const filteredProducts = availableProducts.filter(
        p => p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="servico-card mt-12">
            <h4 className="font-semibold text-xl md:text-2xl flex items-center gap-2">
                <IoMdStar size={20} color="var(--gold-placeholder)" />
                Produtos em Destaque
            </h4>
            <p className="text-sm md:text-base mt-1">
                Gerencia a vitrine da página principal. Selecione até {MAX_FEATURED} produtos para exibir em destaque.
            </p>

            {error && (
                <div className="text-red-500 px-4 py-2 bg-red-50 border border-red-200 rounded-md mt-4">
                    {error}
                </div>
            )}

            {success && (
                <div className="text-green-600 px-4 py-2 bg-green-50 border border-green-200 rounded-md mt-4">
                    {success}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
                {featuredProducts.map((produto) => (
                    <div className="servico-card flex flex-col relative group" key={produto.id}>
                        <button
                            type="button"
                            onClick={() => handleRemoveFeatured(produto.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full z-10 cursor-pointer hover:bg-red-600 transition-colors"
                            title="Remover do destaque"
                        >
                            <RiDeleteBin6Line size={22} />
                        </button>
                        <div className="relative w-full h-32 flex-shrink-0">
                            <Image
                                src={produto.photos?.[0] || '/image/placeholder.jpg'}
                                alt={produto.name}
                                className="rounded-lg object-cover"
                                fill
                                sizes="(max-width: 640px) 100vw, 200px"
                            />
                        </div>
                        <div className="mt-3">
                            <span
                                className="text-xs px-2 py-0.5 rounded-full"
                                style={{ backgroundColor: produto.categories?.color + '20', color: produto.categories?.color }}
                            >
                                {produto.categories?.name}
                            </span>
                            <h4 className="font-semibold text-base line-clamp-1 mt-1">{produto.name}</h4>
                            <p className="text-sm text-gray-500 line-clamp-1">{produto.brief_description}</p>
                            <h4 className="font-semibold text-base text-[var(--primary)]">
                                R$ {produto.price.toFixed(2)}
                            </h4>
                        </div>
                    </div>
                ))}

                {/* Empty Slots */}
                {Array.from({ length: Math.max(0, MAX_FEATURED - featuredProducts.length) }).map((_, index) => (
                    <div
                        key={`slot-${index}`}
                        onClick={() => setShowSelectModal(true)}
                        className="py-8 flex justify-center items-center flex-col gap-2 text-gray-400 border-dashed border-2 border-gray-300 bg-gray-100 rounded-xl cursor-pointer hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                    >
                        <IoIosAddCircle size={30} />
                        <p className="font-medium">Slot Disponível</p>
                        <p className="text-sm">Clique para adicionar</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-end items-center mt-6 border-t border-gray-200 pt-4">
                <button
                    onClick={handleSave}
                    disabled={saving || !isAuthenticated || featuredProducts.length !== MAX_FEATURED}
                    className="botoes flex items-center gap-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    title={!isAuthenticated ? 'Você precisa estar logado para salvar' : featuredProducts.length !== MAX_FEATURED ? `Selecione exatamente ${MAX_FEATURED} produtos` : undefined}
                >
                    <IoIosSave size={20} />
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </div>

            {/* Product Selection Modal */}
            {showSelectModal && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-2xl shadow-xl max-h-[80vh] flex flex-col">
                        <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-200 flex-shrink-0">
                            <div>
                                <h2 className="text-xl font-semibold">Selecionar Produto</h2>
                                <p className="text-gray-500 text-sm">
                                    Escolha um produto para adicionar ao destaque ({featuredProducts.length}/{MAX_FEATURED})
                                </p>
                            </div>
                            <button
                                className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                                onClick={() => setShowSelectModal(false)}
                            >
                                <RxCross1 />
                            </button>
                        </div>

                        {/* Search */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar produtos..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2 pl-10"
                                />
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <IoMdStar size={18} />
                                </span>
                            </div>
                        </div>

                        {/* Product List */}
                        <div className="overflow-y-auto flex-grow p-6">
                            {filteredProducts.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">
                                    {availableProducts.length === 0
                                        ? 'Todos os produtos já estão em destaque.'
                                        : 'Nenhum produto encontrado.'}
                                </p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {filteredProducts.map((produto) => (
                                        <div
                                            key={produto.id}
                                            onClick={() => handleAddFeatured(produto)}
                                            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[var(--primary)] hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={produto.photos?.[0] || '/image/placeholder.jpg'}
                                                    alt={produto.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span
                                                    className="text-xs px-2 py-0.5 rounded-full"
                                                    style={{
                                                        backgroundColor: produto.categories?.color + '20',
                                                        color: produto.categories?.color
                                                    }}
                                                >
                                                    {produto.categories?.name}
                                                </span>
                                                <h4 className="font-semibold text-sm line-clamp-1 mt-1">{produto.name}</h4>
                                                <p className="text-sm text-[var(--primary)] font-medium">
                                                    R$ {produto.price.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-4 p-4 border-t border-gray-200">
                            <button
                                onClick={() => setShowSelectModal(false)}
                                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}