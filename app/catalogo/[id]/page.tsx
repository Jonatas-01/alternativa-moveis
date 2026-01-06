
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { FaCheck } from 'react-icons/fa6'
import { supabase } from '@/lib/supabase-client'
import ProductImageGallery from '@/components/ProductImageGallery/ProductImageGallery'

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
    detailed_description: string
    price: number
}


async function getProduct(id: string): Promise<Product | null> {
    const { data, error } = await supabase
        .from('products')
        .select('*, categories(id, name, color)')
        .eq('id', id)
        .single()

    if (error || !data) {
        return null
    }

    return data
}

async function getRelatedProducts(categoryId: string, currentProductId: string): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*, categories(id, name, color)')
        .eq('category_id', categoryId)
        .neq('id', currentProductId)
        .limit(3)

    if (error || !data) {
        return []
    }

    return data
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = await getProduct(id)

    if (!product) {
        return {
            title: 'Produto não encontrado',
        }
    }

    return {
        title: `${product.name} | Alternativa Móveis`,
        description: product.brief_description,
    }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = await getProduct(id)

    if (!product) {
        notFound()
    }

    const relatedProducts = await getRelatedProducts(product.category_id, product.id)

    return (
        <div className="min-h-screen pb-16">
            <div className="container mx-auto px-6 py-8">
                <nav className="text-sm mb-8">
                    <ol className="flex items-center gap-2 text-gray-500">
                        <li>
                            <Link href="/catalogo" className="hover:text-[var(--primary)] transition-colors">
                                Catálogo
                            </Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link href={`/catalogo?categoria=${product.category_id}`} className="hover:text-[var(--primary)] transition-colors">
                                {product.categories?.name}
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-[var(--primary)] font-medium">{product.name}</li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <div className="md:col-span-2">
                        <ProductImageGallery
                            photos={product.photos}
                            productName={product.name}
                        />
                    </div>

                    <div className="md:col-span-3">
                        <h1 className="text-3xl md:text-5xl font-bold mb-2">
                            {product.name}
                        </h1>

                        <p className="text-gray-600 mb-1 font-medium">
                            {product.brief_description}
                        </p>

                        <div className="my-3">
                            <h2 className="text-xl font-semibold mb-4">
                                Descrição Completa
                            </h2>
                            <p className="text-gray-600 whitespace-pre-line font-medium">
                                {product.detailed_description}
                            </p>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 bg-[var(--primary)] rounded-full flex items-center justify-center">
                                    <FaCheck className="text-white text-xs" />
                                </span>
                                <span className="text-gray-700">
                                    <strong>Categoria:</strong> {product.categories?.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 bg-[var(--primary)] rounded-full flex items-center justify-center">
                                    <FaCheck className="text-white text-xs" />
                                </span>
                                <span className="text-gray-700">
                                    <strong>Condição:</strong> Novo
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 bg-[var(--primary)] rounded-full flex items-center justify-center">
                                    <FaCheck className="text-white text-xs" />
                                </span>
                                <span className="text-gray-700">
                                    <strong>Disponibilidade:</strong> Em estoque
                                </span>
                            </div>
                        </div>

                        <h4 className="text-3xl font-bold mb-6 border-t border-gray-300 pt-2">
                            R$ {product.price.toFixed(2)}
                        </h4>

                        <a
                            href={`https://api.whatsapp.com/send?phone=556232150996&text=Olá! Estava olhando seu catálogo e me interessei pelo produto *${encodeURIComponent(product.name)}*.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#20BD5A] transition-colors"
                        >
                            <IoLogoWhatsapp size={24} />
                            Contate-nos pelo Whatsapp
                        </a>
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-8">
                            Você também pode gostar
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedProducts.map((relatedProduct) => (
                                <Link
                                    href={`/catalogo/${relatedProduct.id}`}
                                    key={relatedProduct.id}
                                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="relative aspect-square overflow-hidden">
                                        <Image
                                            src={relatedProduct.photos[0]}
                                            alt={relatedProduct.name}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <span
                                            className="text-sm font-medium"
                                            style={{ color: relatedProduct.categories?.color }}
                                        >
                                            {relatedProduct.categories?.name}
                                        </span>
                                        <h3 className="font-semibold text-lg text-gray-900 mt-1 line-clamp-1">
                                            {relatedProduct.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                                            {relatedProduct.brief_description}
                                        </p>
                                        <h4 className="font-bold text-lg mt-3">
                                            R$ {relatedProduct.price.toFixed(2)}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}