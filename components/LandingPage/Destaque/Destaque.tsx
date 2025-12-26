'use client'

import { BsArrowRight } from "react-icons/bs";
import EmblaCarousel from "@/components/ui/EmblaCarousel"
import { EmblaOptionsType } from 'embla-carousel'
import { supabase } from '@/lib/supabase-client'
import React, { useState } from 'react'
import Link from "next/link";

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }
const SLIDE_COUNT = 4
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

interface Product {
    id: string;
}

export default function Destaque() {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])

    const fetchFeaturedProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('is_featured', true)

        if (error) {
            console.error('Erro ao buscar produtos em destaque:', error.message)
            return []
        }

        return data || []
    }

    React.useEffect(() => {
        const loadFeaturedProducts = async () => {
            const products = await fetchFeaturedProducts()
            setFeaturedProducts(products)
        }

        loadFeaturedProducts()
    }, [])

    return (
        <div className="mt-14">
            {featuredProducts.length >= 4 && (
                <>
                    <div className="container mx-auto px-6">
                        <h1 className="secondary-title">Produtos em Destaque</h1>
                    </div>
                    <div className="mt-7">
                        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                    </div>
                </>
            )}
            <div className="flex justify-center mt-5">
                <Link href="/catalogo" className="flex items-center botoes gap-3">Ver Catálogo <BsArrowRight /></Link>
            </div>
        </div>
    )
}