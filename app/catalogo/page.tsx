
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase-client'
import Image from 'next/image'
import { FiSearch } from 'react-icons/fi'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import Link from 'next/link'

interface Category {
    id: string
    name: string
    color: string
}

interface Product {
    id: string
    name: string
    photos: string[]
    category_id: string
    categories: Category
    brief_description: string
    price: number
}

const PRODUCTS_PER_PAGE = 9

export default function Catalogo() {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            const [productsRes, categoriesRes] = await Promise.all([
                supabase.from('products').select('*, categories(id, name, color)'),
                supabase.from('categories').select('*')
            ])

            if (productsRes.data) setProducts(productsRes.data)
            if (categoriesRes.data) setCategories(categoriesRes.data)

            setLoading(false)
        }

        fetchData()
    }, [])

    // Filter products based on search and category
    const filteredProducts = products.filter(product => {
        const matchesSearch = 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brief_description.toLowerCase().includes(searchQuery.toLowerCase())
        
        const matchesCategory = 
            selectedCategory === 'all' || product.category_id === selectedCategory

        return matchesSearch && matchesCategory
    })

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        setCurrentPage(1)
    }

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId)
        setCurrentPage(1)
    }

    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i)
        } else {
            pages.push(1)
            if (currentPage > 3) pages.push('...')
            
            const start = Math.max(2, currentPage - 1)
            const end = Math.min(totalPages - 1, currentPage + 1)
            
            for (let i = start; i <= end; i++) pages.push(i)
            
            if (currentPage < totalPages - 2) pages.push('...')
            pages.push(totalPages)
        }
        
        return pages
    }

    return (
        <div className="min-h-screen pb-16">
            <div className="text-center py-12">
                <h1 className="primary-title">Nosso Catálogo de Produtos</h1>
                <p className="text-gray-500 mt-2">Móveis de alta qualidade para sua Escola e Escritório.</p>
            </div>

            <div className="container mx-auto px-6">
                {/* Search Bar */}
                <div className="flex justify-center mb-6">
                    <div className="flex items-center bg-white rounded-full shadow-sm px-5 py-3 w-full max-w-md border border-gray-200">
                        <FiSearch className="text-gray-400 text-xl" />
                        <input
                            type="text"
                            placeholder="Buscar produtos..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="ml-3 flex-1 outline-none text-gray-700 bg-transparent"
                        />
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex justify-center flex-wrap gap-3 mb-10">
                    <button
                        onClick={() => handleCategoryChange('all')}
                        className={`px-5 py-2 rounded-full font-medium transition-all ${
                            selectedCategory === 'all'
                                ? 'bg-[var(--primary)] text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:border-[var(--primary)]'
                        }`}
                    >
                        Todos
                    </button>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryChange(category.id)}
                            className={`px-5 py-2 rounded-full font-medium transition-all ${
                                selectedCategory === category.id
                                    ? 'bg-[var(--primary)] text-white'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:border-[var(--primary)]'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-16">
                        <p className="text-gray-500">Carregando produtos...</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredProducts.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500">
                            {searchQuery ? 'Nenhum produto encontrado.' : 'Nenhum produto cadastrado.'}
                        </p>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && filteredProducts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {paginatedProducts.map(product => (
                            <Link
                                href={`/catalogo/${product.id}`}
                                key={product.id} 
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="relative aspect-square overflow-hidden">
                                    <Image
                                        src={product.photos[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-5">
                                    <span 
                                        className="text-sm font-medium"
                                        style={{ color: product.categories?.color }}
                                    >
                                        {product.categories?.name}
                                    </span>
                                    <h3 className="font-semibold text-lg text-gray-900 mt-1 line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                                        {product.brief_description}
                                    </p>
                                    <h4 className="font-bold text-lg mt-3">
                                        R$ {product.price.toFixed(2)}
                                    </h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <IoChevronBack size={20} />
                        </button>

                        {getPageNumbers().map((page, index) => (
                            typeof page === 'number' ? (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                                        currentPage === page
                                            ? 'bg-[var(--primary)] text-white'
                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    {page}
                                </button>
                            ) : (
                                <span key={index} className="px-2 text-gray-400">...</span>
                            )
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <IoChevronForward size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}