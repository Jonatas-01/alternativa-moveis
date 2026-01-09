import { FiSearch } from 'react-icons/fi';
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import DeleteProdutoModal from './DeleteProdutoModal';
import EditProdutoModal from './EditProdutoModal';

interface Category {
    id: string;
    name: string;
    color: string;
}

interface Products {
    id: string;
    name: string;
    photos: string[];
    category_id: string;
    categories: Category;
    brief_description: string;
    detailed_description: string;
    price: number;
}

const PRODUCTS_PER_PAGE = 6

export default function AdminProdutos() {
    const [products, setProducts] = useState<Products[]>([])
    const [erros, setErros] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [productToDelete, setProductToDelete] = useState<Products | null>(null)
    const [productToEdit, setProductToEdit] = useState<Products | null>(null)
    const [currentPage, setCurrentPage] = useState(1)

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*, categories(id, name, color)')

        if (error) {
            setErros('Erro ao buscar produtos')
            return
        }

        return data
    }

    useEffect(() => {
        const loadProducts = async () => {
            const products = await fetchProducts()
            setProducts(products || [])
        }
        loadProducts()

        // Listen for real-time updates
        const channel = supabase
            .channel('products-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'products' },
                () => {
                    loadProducts()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    // Filter products based on search query
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brief_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categories?.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Pagination calculations
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
    const endIndex = startIndex + PRODUCTS_PER_PAGE
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        setCurrentPage(1)
    }

    return (
        <div className="bg-gray-100 rounded-[20px] my-12">
            <div className="flex flex-col md:flex-row md:justify-between items-center px-4 py-3">
                <div className="p-4">
                    <div className="flex items-center bg-white rounded-lg shadow-sm px-4 py-2">
                        <FiSearch className="text-gray-400 text-xl" />
                        <input
                            type="text"
                            placeholder="Buscar produtos..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="ml-2 flex-1 outline-none text-gray-700"
                        />
                    </div>
                </div>

                <div>
                    <p>Total: {filteredProducts.length} produtos</p>
                </div>
            </div>
            <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                    <div className="grid grid-cols-5 flex justify-between items-center px-4 py-3 border-b border-gray-200">
                        <h4 className='col-span-2 font-semibold'>PRODUTO</h4>
                        <h4 className='font-semibold text-center'>CATEGORIA</h4>
                        <h4 className='font-semibold text-center'>PREÇO</h4>
                        <h4 className='font-semibold text-center'>AÇÕES</h4>
                    </div>

                    {erros && <p className="text-sm mt-1" style={{ color: "red" }}>{erros}</p>}

                    {filteredProducts.length === 0 && !erros && (
                        <div className="text-center py-8 text-gray-500">
                            {searchQuery ? 'Nenhum produto encontrado.' : 'Nenhum produto cadastrado.'}
                        </div>
                    )}

                    {paginatedProducts.map((product, index) => (
                        <div key={index} className="grid grid-cols-5 items-center px-4 py-3 border-b border-gray-200 bg-white">
                            <div className='col-span-2 flex items-center gap-4'>
                                <div className="relative w-16 h-16 flex-shrink-0">
                                    <Image
                                        src={product.photos[0]}
                                        alt={product.name}
                                        fill
                                        className="rounded-lg object-cover"
                                    />
                                </div>
                                <div className='pr-20'>
                                    <h4 className="font-semibold text-lg line-clamp-1">{product.name}</h4>
                                    <p className="line-clamp-1">{product.brief_description}</p>
                                </div>
                            </div>
                            <div>
                                <p className={`text-center text-sm font-semibold rounded-full py-1 w-fit mx-auto px-3`} style={{ backgroundColor: product.categories?.color + '20', color: product.categories?.color }}>{product.categories.name}</p>
                            </div>
                            {product.price !== 0 ? (
                                <div>
                                    <p className="font-semibold text-center">R$ {product.price !== 0 ? product.price.toFixed(2) : ''}</p>
                                </div>
                            ) : (
                                <div>
                                    <p className='font-semibold text-center'>-</p>
                                </div>
                            )}
                            <div className="flex items-center gap-4 justify-center">
                                <button onClick={() => setProductToEdit(product)} className="text-blue-500 hover:cursor-pointer"><MdOutlineEdit color='blue' size={24} /></button>
                                <button onClick={() => setProductToDelete(product)} className="text-red-500 hover:cursor-pointer"><RiDeleteBin6Line color='red' size={24} /></button>
                            </div>
                        </div>

                    ))}
                </div>

                {productToEdit && (
                    <EditProdutoModal setShowEditProdutoModal={() => setProductToEdit(null)} product={productToEdit} />
                )}

                {productToDelete && (
                    <DeleteProdutoModal setShowDeleteProdutoModal={() => setProductToDelete(null)} product={productToDelete} />
                )}

                {/* Pagination */}
                <div className="flex justify-between items-center px-4 py-7">
                    <p className="text-sm text-gray-600">
                        Mostrando {filteredProducts.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, filteredProducts.length)} de {filteredProducts.length} produtos
                    </p>
                    {totalPages > 1 && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Anterior
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 rounded-lg border ${currentPage === page
                                        ? 'bg-[var(--primary)] text-white border-blue-500'
                                        : 'bg-white border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Próximo
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}