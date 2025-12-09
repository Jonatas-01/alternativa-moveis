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

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

const produtos = [
    {
        foto: "/image/cadeira.jpg",
        categoria: "Cadeiras",
        nome: "Cadeira de Escritório",
        descricao: "tubos metálicos de aço com acabamento em pintura preta brilhante",
        preco: 299.99
    },
    {
        foto: "/image/armario_grande.png",
        categoria: "Armários",
        nome: "Armário Grande",
        descricao: "armário espaçoso com acabamento em madeira de alta qualidade",
        preco: 499.99
    },
    {
        foto: "/image/gaveteira.png",
        categoria: "Armários",
        nome: "Gaveteira",
        descricao: "gaveteira prática com várias gavetas para organização",
        preco: 299.99
    },
    {
        foto: "/image/cadeira_escolar.png",
        categoria: "Cadeiras",
        nome: "Cadeira Escolar",
        descricao: "cadeira escolar resistente com assento e encosto ergonômicos",
        preco: 199.99
    }
]

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

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

    return (
        <section className="embla ">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {produtos.map((produto, index) => (
                        <div className="embla__slide" key={index}>
                            <ProdutoCard
                                foto={produto.foto}
                                categoria={produto.categoria}
                                nome={produto.nome}
                                descricao={produto.descricao}
                                preco={produto.preco}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>

                <div className="embla__dots">
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
