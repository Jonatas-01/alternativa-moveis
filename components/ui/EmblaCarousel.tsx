'use client'

import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import ProdutoCard from '../Destaque/ProdutoCard'
import { supabase } from '@/lib/supabase-client'

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

interface Category {
    id: string;
    name: string;
    color: string;
}

interface Product {
    id: string;
    name: string;
    photos: string[];
    categories: Category;
    brief_description: string;
    detailed_description: string;
    price: number;
    is_featured: boolean;
}

const produtos = [
    // {
    //     foto: "/image/cadeira.jpg",
    //     categoria: "Cadeiras",
    //     nome: "Cadeira de Escritório",
    //     descricao: "tubos metálicos de aço com acabamento em pintura preta brilhante",
    //     preco: 299.99
    // },
    // {
    //     foto: "/image/armario_grande.png",
    //     categoria: "Armários",
    //     nome: "Armário Grande",
    //     descricao: "armário espaçoso com acabamento em madeira de alta qualidade",
    //     preco: 499.99
    // },
    // {
    //     foto: "/image/gaveteira.png",
    //     categoria: "Armários",
    //     nome: "Gaveteira",
    //     descricao: "gaveteira prática com várias gavetas para organização",
    //     preco: 299.99
    // },
    // {
    //     foto: "/image/cadeira.jpg",
    //     categoria: "Cadeiras",
    //     nome: "Cadeira de Escritório",
    //     descricao: "tubos metálicos de aço com acabamento em pintura preta brilhante",
    //     preco: 299.99
    // },
    // {
    //     foto: "/image/cadeira_escolar.png",
    //     categoria: "Cadeiras",
    //     nome: "Cadeira Escolar",
    //     descricao: "cadeira escolar resistente com assento e encosto ergonômicos",
    //     preco: 199.99
    // }
]

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])
    const [featuredProducts, setFeaturedProducts] = React.useState<Product[]>([])

    const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
        const autoplay = emblaApi?.plugins()?.autoplay
        if (!autoplay) return

        const resetOrStop =
            autoplay.options.stopOnInteraction === false
                ? autoplay.reset
                : autoplay.stop

        resetOrStop()
    }, [])

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
        emblaApi,
        onNavButtonClick
    )

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi, onNavButtonClick)

    const fetchFeaturedProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*, categories(id, name, color)')
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
        <section className="embla ">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {featuredProducts.map((produto, index) => (
                        <div className="embla__slide" key={index}>
                            <ProdutoCard
                                foto={produto.photos[0]}
                                categoria={produto.categories.name}
                                nome={produto.name}
                                descricao={produto.brief_description}
                                preco={produto.price}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons px-0 md:px-10">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>

                <div className="embla__dots px-0 md:px-10">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'embla__dot'.concat(
                                index === selectedIndex ? ' embla__dot--selected' : ''
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EmblaCarousel
